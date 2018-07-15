var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.get('/homa-mundo', function(req, res){
    res.status(200).send('Hola mundo desde aqui');
});

var messages = [{
    id: 1,
    text: 'Bienvenido al chat privado',
    nickname: 'bot - victor'
}]

app.use(express.static('public'));
server.listen(6677, function(){
    console.log('Servidor esta funcionando http://localhost:6677');
});
// CONEXION A SOCKET 
io.on('connection', function(socket){
    console.log("El nodo con ip:" + socket.handshake.address + "Se ha conectado");
    socket.emit('messages', messages);

    socket.on('add-message', function(data){
        console.log("REGISTRANDO NUEVO CHAT", data);
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});
