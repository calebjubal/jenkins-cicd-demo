const express = require('express');
const app = express();
app.get('/', (_req, res) => res.type('text').send('Hello CI/CD'));
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
if (require.main === module) {
  const server = app.listen(process.env.PORT || 3000, '0.0.0.0', () => console.log('Hello CI/CD started'));
  process.on('SIGTERM', () => server.close());
}
module.exports = app;
