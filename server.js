// dependencies externs
const express = require('express');
const path = require('path'); // para trabalhar com dietórios

// app
const app = express();
const http = require('http').createServer(app);

app.use(express.static('public'));
app.set('view engine', 'ejs');

const io = require('socket.io')(http);

io.on('connection', socket=>{
    let user = true;

    socket.on('sendMessage', (msg)=>{
        socket.broadcast.emit('sendToAll', msg, user);
    })
})

app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/chat', (req, res)=>{
    res.render('pages/app')
})

const PORT = process.env.PORT || 3000;

http.listen(PORT, ()=>{ console.log(`Server in on port ${PORT}`) });
