const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());

server.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to jsonwebtoken class, enjoy your stay and do not forget to learn',
  });
});

module.exports = server;
