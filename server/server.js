const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const server = express();

const users = require('./routes/users')
const bills = require('./routes/bills')
const mongoose = require('./database/database');

const PORT = 5000;

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'))

server.set('secretKey', 'CourseProject');
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use('/users', users);
server.use('/api', validateUser, bills)
    
server.use((request, response) => {
  response.status(404).send('Nope, nothing here.')
})     

server.listen(PORT, function() {
  console.log(`Server is running on http://localhost:${PORT}`);
});

function validateUser(req, res, next) {
  jwt.verify(req.headers['authorization-token'], server.get('secretKey'), (err, decoded) => {
    if (err) {
      res.status(401).send({status: 'error', msg: 'Unauthorized user'})
    } else {
      req.body.userId = decoded.id
      next()
    }
  })
}