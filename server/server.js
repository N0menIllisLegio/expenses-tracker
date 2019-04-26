const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const server = express();
const http = require('http').Server(server);
const io = require('socket.io')(http);

const users = require('./routes/users')
const bills = require('./controllers/bills')
const mongoose = require('./database/database');

const PORT = 5000;

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'))

server.set('secretKey', 'CourseProject');
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use('/users', users)

io.use((socket, next) => {
    jwt.verify(socket.handshake.query.token, app.get('secretKey'), (err, decoded) => {
        if (err) {
            next(new Error('Authentication error'))
        } else {
            socket.handshake.query.userId = decoded.id
            next()
        }
    })
})

io.on('connection', (client) => {

    client.on('get bills', () => {
        bills.getBills(client.handshake.query.userId).then((user) => {
            client.emit('bills', user.bills || [])
        })
    })
    
    client.on('create bill', (card) => {
        card.userId = client.handshake.query.userId

        bills.createBill(card).then(() => {
            bills.getBills(card.userId).then((user) => {
                client.emit('bills', user.bills || [])
            })
        })
    })
    
    client.on('update bill', (args) => {
        bills.updateBill(args.id, args.newStatus).then(() => {
                bills.getBills(client.handshake.query.userId).then((user) => {
                client.emit('bills', user.bills || [])
            })
        })
    })
    
    client.on('delete bill', (id) => {
        let userId = client.handshake.query.userId

        bills.removeBill(id, userId).then(() => {
                todos.getBills(userId).then((user) => {
                client.emit('bills', user.bills || [])
            })
        })
    })
});

server.use((request, response) => {
    response.status(404).send('Nope, nothing here.')
})     

http.listen(PORT, function() {
    console.log(`Server is running on http://localhost:${PORT}`);
});