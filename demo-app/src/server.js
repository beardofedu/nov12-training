// ⚠️ INTENTIONALLY INSECURE — training material for CodeQL and the Security tab.
// Each "DEMO" comment marks a finding the presenter will show. Do not deploy.

const express = require('express');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const _ = require('lodash');
const db = require('./db');
const { applyDiscount } = require('./utils/pricing');

const app = express();
app.use(express.json());

// CodeQL: SQL query uses a parameterized value.
app.get('/users', (req, res) => {
  const name = req.query.name;
  const sql = 'SELECT * FROM users WHERE name = ?';
  db.all(sql, [name], (err, rows) => {
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
  exec(`ping -c 1 ${req.query.host}`, (err, stdout) => {
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

app.listen(3000, () => console.log('Demo app listening on :3000'));
