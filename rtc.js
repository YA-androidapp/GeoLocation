const peer = new Peer({
    key: 'f9613972-35ff-4555-a212-ef68d10cdf71', // The API key of Skyway (domain: ya-androidapp.github.io)
    debug: 3
});

let room = null;
peer.on('open', id => {
    appendHistory('Successfully connected to signaling server.');
});

var enter = document.getElementById('enter');
enter.addEventListener('click', function () {
    enter.disabled = true;
    var name = document.getElementById('name');
    var roomName = document.getElementById('roomName');
    room = peer.joinRoom(roomName.value, {
        mode: 'sfu'
    });

    var entered = '<i class="name">' + name.value + '</i> entered ' + roomName.value + '.';
    appendHistory(entered);
    room.send(en(entered));

    var send = document.getElementById('send');
    send.addEventListener('click', function () {
        send.disabled = true;
        var msg = document.getElementById('msg');
        var sent = '<i class="name">' + name.value + '</i> > <span class="message">' + msg.value +
            '</span>';
        room.send(en(sent));
        appendHistory(sent);
        send.disabled = false;
    });

    room.on('data', function (data) {
        var received = de(data.data);
        appendHistory(received);
    });

    enter.disabled = false;
});

function appendHistory(msg) {
    var history = document.getElementById('history');
    history.insertAdjacentHTML('afterbegin', '<p>' + msg + '</p>');
}

window.onload = function () {
    var random = 1000 + Math.floor(Math.random() * 1000);
    var roomName = document.getElementById('roomName');
    roomName.value = random;

    var random = Math.floor(Math.random() * 100);
    var name = document.getElementById('name');
    name.value = random;

    geoFindMe();
}