// ⚠️ INTENTIONALLY INSECURE — training material for CodeQL and the Security tab.
// Each "DEMO" comment marks a finding the presenter will show. Do not deploy.

const express = require('express');
const path = require('path');
const fs = require('fs');
const { execFile } = require('child_process');
const _ = require('lodash');
const db = require('./db');
const { applyDiscount } = require('./utils/pricing');

const app = express();
app.use(express.json());

// DEMO (CodeQL): SQL injection — js/sql-injection
app.get('/users', (req, res) => {
  const name = req.query.name;
  const sql = `SELECT * FROM users WHERE name = '${name}'`;
  db.all(sql, (err, rows) => {
    if (err) return res.status(500).send('error');
    res.json(rows);
  });
});

// DEMO (CodeQL): reflected cross-site scripting — js/reflected-xss
app.get('/greet', (req, res) => {
  res.send(`<h1>Hello, ${req.query.name}!</h1>`);
});

// DEMO (CodeQL): path traversal — js/path-injection
app.get('/reports', (req, res) => {
  const file = path.join(__dirname, '..', 'reports', req.query.file);
  res.send(fs.readFileSync(file, 'utf8'));
});

// DEMO (CodeQL): command injection — js/command-line-injection
app.get('/ping', (req, res) => {
  const host = req.query.host;
  if (typeof host !== 'string' || (!/^[a-zA-Z0-9.-]+$/.test(host) && require('net').isIP(host) === 0)) {
    return res.status(400).send('invalid host');
  }

  execFile('ping', ['-c', '1', host], (err, stdout) => {
    res.type('text/plain').send(stdout);
  });
});

// DEMO (Dependabot): lodash 4.17.15 has known prototype-pollution advisories
app.post('/settings', (req, res) => {
  const settings = _.merge({}, req.body);
  res.json(settings);
});

app.get('/price', (req, res) => {
  res.json({ total: applyDiscount(Number(req.query.total), req.query.code) });
});

if (require.main === module) {
  app.listen(3000, () => console.log('Demo app listening on :3000'));
}

module.exports = app;
