window.onload = function () {
    form_init();
    rtc_init();
    map_init();
    geoFindMe();
}

function form_init() {
    var random = 1000 + Math.floor(Math.random() * 1000);
    var roomName = document.getElementById('roomName');
    roomName.value = random;

    var random = Math.floor(Math.random() * 100);
    var name = document.getElementById('name');
    name.value = random;
}