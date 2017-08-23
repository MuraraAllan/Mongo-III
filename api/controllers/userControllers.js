const mongoose = require('mongoose');
const User = mongoose.model('User');

const STATUS_USER_ERROR = 422;
const STATUS_OK = 200;

const checkUserError = (err, res) => {
  if (typeof err === 'string') {
    res.status(STATUS_USER_ERROR);
    res.json(err);
    return;
  }
  res.status(STATUS_USER_ERROR);
  res.json({ error: err.message });
};

const createUser = (req, res) => {
  const newUser = new User({
    name: req.body.username,
    password: req.body.password
  });
  newUser.save((err, user) => {
    if (err) {
      checkUserError(err, res);
      return;
    }
    res.status(STATUS_OK);
    res.json(user);
  });
};

const loginUser = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ name: username })
  .exec((err, user) => {
    if (err) {
      checkUserError(err, res);
      return;
    }
    if (user.password === password) {
      res.status(STATUS_OK);
      res.json(user);
      return;
    }
    checkUserError('Wrong Password', res);
  });
};

module.exports = {
  createUser,
  loginUser,
};
