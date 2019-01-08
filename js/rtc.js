isEntered = false;
room = null;

function rtc_init() {
    const peer = new Peer({
        key: 'f9613972-35ff-4555-a212-ef68d10cdf71', // The API key of Skyway (domain: ya-androidapp.github.io)
        debug: 3
    });

    peer.on('open', id => {
        appendHistory('Successfully connected to signaling server.', '');
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
        appendHistory(entered, '');
        room.send(en(entered));
        isEntered = true;

        var send = document.getElementById('send');
        send.addEventListener('click', function () {
            send.disabled = true;
            var msg = document.getElementById('msg');
            var sent = '<i class="name">' + name.value + '</i> > <span class="message">' + msg.value +
                '</span>';
            room.send(en(sent));
            appendHistory(sent, '');
            send.disabled = false;
        });

        room.on('data', function (data) {
            var received = de(data.data);
            appendHistory(received, '');
        });

        enter.disabled = false;
    });
}

function sendLocation() {
    var la = document.getElementById("latitude").innerText;
    var lo = document.getElementById("longitude").innerText;
    if ((false == isNaN(la)) && (false == isNaN(lo))) {
        var sent = '<i class="name">' + name.value + '</i> @ <span class="lat">' + la + '</span> , <span class="long">' + lo + '</span>';
        if (null != room) {
            room.send(en(sent));
            appendHistory(sent, 'location');
        }
    }
}

function appendHistory(msg, mode) {
    var history = document.getElementById('history');
    if ('' == mode) {
        history.insertAdjacentHTML('afterbegin', '<p>' + msg + '</p>');
    } else {
        history.insertAdjacentHTML('afterbegin', '<p class="' + mode + '">' + msg + '</p>');
    }
}