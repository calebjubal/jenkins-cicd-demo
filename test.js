const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const app = require('./app');
let server, url;
before(async () => {
  server = await new Promise(resolve => {
    const s = app.listen(0, '127.0.0.1', () => resolve(s));
  });
  url = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise(resolve => server.close(resolve)));
test('home returns greeting', async () => {
  const response = await fetch(url);
  assert.equal(response.status, 200);
  assert.equal(await response.text(), 'Hello CI/CD');
});
test('health reports readiness', async () => {
  const response = await fetch(`${url}/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok' });
});
test('unknown route returns 404', async () => {
  assert.equal((await fetch(`${url}/missing`)).status, 404);
});
