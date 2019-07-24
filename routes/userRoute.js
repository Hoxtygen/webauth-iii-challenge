const express = require('express');
const dotenv = require('dotenv');
const Users = require('../Models/userModel.js');
const encrypt = require('../hash/phash.js');

const router = express.Router();
dotenv.config();

router.get('/users', encrypt.verifyLoggedIn, async (req, res) => {
  const { department } = req.decodedToken.payload;
  try {
    const allUsers = await Users.findByDept(department);
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error,
    });
  }
});

router.post('/register', async (req, res) => {
  let { email, password, department } = req.body;
  password = encrypt.encryptPassword(password);
  const newUserData = {
    email,
    password,
    department,
  };
  try {
    const [newUser] = await Users.addUser(newUserData);
    const user = await Users.findById(newUser);
    if (user) {
      const tokenData = {
        id: user.id,
        department: user.department,
        email: user.email,
      };
      const token = encrypt.createToken(tokenData);
      return res.status(201).json({
        token,
        user,
      });
    }
    return res.status(400).json({
      errorMessage: 'Bad request',
    });
  } catch (error) {
    return res.status(500).json({
      errorMessage: error,
    });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findByEmail(email);
    if (user && encrypt.comparePassword(password, user.password)) {
      const tokenData = {
        id: user.id,
        department: user.department,
        email: user.email,
      };
      const token = encrypt.createToken(tokenData);
      return res.status(200).json({
        message: `Welcome  to your homepage ${user.email}`,
        token,
        user,
      });
    }
    return res.status(400).json({
      errorMessage: 'The user with that email does not exist',
    });
  } catch (error) {
    return res.status(500).json({
      errorMessage: error,
    });
  }
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).json({
          errorMessage: 'Something went wrong with your request',
        });
      } else {
        res.status(200).json({
          message: 'You are now logged out',
        });
      }
    });
  } else {
    res.status(200).json({
      errorMessage: 'You were never here to begin with',
    });
  }
});


module.exports = router;
