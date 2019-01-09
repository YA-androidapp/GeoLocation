window.onload = function () {
    form_init();
    rtc_init();
    map_init();
    geoFindMe();
}

function form_init() {
    var random = 1000 + Math.floor(Math.random() * 1000); // 1000～1999
    var roomName = document.getElementById('roomName');
    roomName.value = '1'; // random;

    var random = Math.floor(Math.random() * 100);
    var name = document.getElementById('name');
    name.value = random;
}