const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const encrypt = {
  encryptPassword(pwd) {
    return bcrypt.hashSync(pwd, bcrypt.genSaltSync(14));
  },
  comparePassword(encryptedPwd, pwd) {
    return bcrypt.compareSync(encryptedPwd, pwd);
  },
  createToken(payload) {
    const token = jwt.sign({
      payload,
    },
    process.env.JWT_SECRET, { expiresIn: '3d' });
    return token;
  },
  verifyLoggedIn(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({
        message: 'Access denied, you must be logged in to access this resource',
      });
    } else {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          res.status(401).json({
            errorMessage: 'Invalid token!',
          });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    }
  },
};

module.exports = encrypt;
