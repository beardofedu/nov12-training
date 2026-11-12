const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const app = require('../src/server');

test('rejects ping hosts containing shell metacharacters', async () => {
  const server = app.listen(0);
  const { port } = server.address();

  try {
    const response = await new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${port}/ping?host=localhost%3Bwhoami`, resolve)
        .on('error', reject);
    });

    assert.equal(response.statusCode, 400);
    response.resume();
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
