const db = require('../database/dbConfig');

async function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

async function addUser(userData) {
  return db('users')
    .insert(userData);
}

async function findByEmail(email) {
  return db('users').where({ email }).first();
}

async function findByDept(department) {
  return db('users').where({ department });
}

async function find() {
  return db('users').select();
}

async function restricted(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({
      errorMessage: 'Uh!, you are joking right?, Get yourself some cookies and come back later',
    });
  }
}

module.exports = {
  addUser,
  findByEmail,
  findByDept,
  findById,
  find,
  restricted,
};
