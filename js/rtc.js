isEntered = false;
room = null;

const MODE_LOCATION = 'location';

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

            if (received.indexOf('<p class="' + MODE_LOCATION + '">') > -1) {
                //TODO: ユーザー・緯度・経度を抽出
                // 想定データ
                // received = '<p class="' + mode + '"><i class="name">name</i> @ <span class="lat">lat</span> , <span class="long">lo</span></p>'

                part1 = received.split('<i class="name">')[1];

                //TODO: ユーザーごとに最新の位置を得る

                //TODO: 経緯度を地図上にプロット
            }
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
            appendHistory(sent, MODE_LOCATION);
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