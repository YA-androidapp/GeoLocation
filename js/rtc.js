isEntered = false;
room = null;

markers = [];
userlocationsArray = [];

const MODE_LOCATION = 'location';

function rtc_init() {
    const peer = new Peer({
        key: 'f9613972-35ff-4555-a212-ef68d10cdf71', // The API key of Skyway (domain: ya-androidapp.github.io)
        debug: 3
    });

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

        var entered = '<p><i class="name">' + name.value + '</i> entered ' + roomName.value + '.</p>';
        appendHistory(entered);
        room.send(en(entered));
        isEntered = true;

        var send = document.getElementById('send');
        send.addEventListener('click', function () {
            send.disabled = true;
            var msg = document.getElementById('msg');
            var sent = '<p><i class="name">' + name.value + '</i> > <span class="message">' + msg.value +
                '</span></p>';
            room.send(en(sent));
            appendHistory(sent);
            send.disabled = false;
        });

        room.on('data', function (data) {
            var received = de(data.data);
            appendHistory(received);

            console.log(received);
            if (received.indexOf('<p class="' + MODE_LOCATION + '">') > -1) {
                console.log(received);
                // ユーザー・緯度・経度を抽出
                // 想定データ
                // received = '<p class="' + mode + '"><i class="name">name</i> @ <span class="lat">lat</span> , <span class="long">lo</span></p>'

                part1 = received.split('<i class="name">')[1]; // 'name</i> @ <span class="lat">lat</span> , <span class="long">lo</span></p>'
                console.log(part1);
                part2 = part1.split('</span></p>')[0]; // 'name</i> @ <span class="lat">lat</span> , <span class="long">lo
                console.log(part2);

                part3 = part2.split('</i> @ <span class="lat">');
                name = part3[0]; // 'name'
                console.log(name);
                part4 = part3[1]; // 'lat</span> , <span class="long">lo'
                console.log(part4);
                part5 = part4.split('</span> , <span class="long">');
                console.log(part5);
                lat = part5[0]; // lat
                console.log(lat);
                long = part5[1]; // long
                console.log(long);

                // ユーザーごとに最新の位置を得る
                var userlocation = {
                    'lat': lat,
                    'long': long
                };
                userlocationsArray[name] = userlocation;

                // 経緯度を地図上にプロット
                markers = [];

                i = 0;
                for (var key in userlocationsArray) {
                    var val = userlocationsArray[key];
                    var mpoint = [val.lat, val.long];
                    markers.push(
                        L.marker(mpoint, {
                            icon: L.divIcon({
                                className: 'icon' + i,
                                iconAnchor: [13, 13]
                            })
                        }).addTo(map)
                    );

                    i++;
                }
            }
        });

        enter.disabled = false;
    });
}

function sendLocation() {
    var name = document.getElementById('name').value;
    var la = document.getElementById("latitude").innerText;
    var lo = document.getElementById("longitude").innerText;
    if ((false == isNaN(la)) && (false == isNaN(lo))) {
        var sent = '<p class="' + MODE_LOCATION + '"><i class="name">' + name + '</i> @ <span class="lat">' + la + '</span> , <span class="long">' + lo + '</span></p>';
        if (null != room) {
            room.send(en(sent));
            appendHistory(sent);
        }
    }
}

function appendHistory(msg) {
    var history = document.getElementById('history');
    history.insertAdjacentHTML('afterbegin', msg);
}

var geo = document.getElementById('geo');
geo.addEventListener('click', function () {
    sendLocation();
});