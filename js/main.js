window.onload = function () {
    form_init();
    rtc_init();
    map_init();
    geoFindMe();

    latlng_init();
}

function form_init() {
    var random = 1000 + Math.floor(Math.random() * 1000);
    var roomName = document.getElementById('roomName');
    roomName.value = random;

    var random = Math.floor(Math.random() * 100);
    var name = document.getElementById('name');
    name.value = random;
}

function latlng_init() {
    document.getElementById('latitude').addEventListener('click', function clickEvent(ev) {
        move_to_current_place();
    });
    document.getElementById('longitude').addEventListener('click', function clickEvent(ev) {
        move_to_current_place();
    });
}

function move_to_current_place() {
    var latitude = document.getElementById("latitude").innerText;
    var longitude = document.getElementById("longitude").innerText;
    if (map && (false == isNaN(latitude)) && (false == isNaN(longitude))) {
        mpoint = [latitude, longitude];
        map.setView(mpoint, 18);
    }
}