const { execFileSync } = require('node:child_process');
const name = 'jenkins-cicd-demo';
const image = `${name}:${process.env.BUILD_NUMBER || 'local'}`;
const docker = (...args) => execFileSync('docker', args, { stdio: 'inherit' });
async function deploy() {
  docker('build', '-t', image, '.');
  const existing = execFileSync('docker', ['ps', '-aq', '--filter', `name=^/${name}$`], { encoding: 'utf8' }).trim();
  if (existing) docker('rm', '-f', name);
  docker('run', '-d', '--name', name, '--restart', 'unless-stopped', '-p', '3000:3000', image);
  for (let attempt = 0; attempt < 30; attempt++) {
    try {
      const response = await fetch('http://127.0.0.1:3000/health', { signal: AbortSignal.timeout(2000) });
      if (response.ok && (await response.json()).status === 'ok') {
        console.log('Deployment verified: http://localhost:3000');
        return;
      }
    } catch { /* Wait for startup. */ }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  docker('logs', name);
  throw new Error('Deployment health check failed');
}
deploy().catch(error => { console.error(error.message); process.exitCode = 1; });
