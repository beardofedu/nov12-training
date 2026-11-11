const sqlite3 = require('sqlite3');

// DEMO (CodeQL): hard-coded credential — js/hardcoded-credentials
// This is a fake placeholder value, not a real secret.
const DB_PASSWORD = 'training-demo-password';

const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)');
  db.run("INSERT INTO users (name, email) VALUES ('mona', 'mona@example.com')");
});

function connectAdmin(user) {
  return { user, password: DB_PASSWORD };
}

module.exports = db;
module.exports.connectAdmin = connectAdmin;
