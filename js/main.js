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

    var name = document.getElementById('name');
    name.addEventListener('change', function () {
        if (('localStorage' in window) && (window.localStorage !== null)) {
            localStorage.setItem('name', document.getElementById('name').value);
            console.log('save name: ' + document.getElementById('name').value);
        }
    }, false);
    loadedName = localStorage.getItem('name');
    if (loadedName && loadedName.length > 0) {
        name.value = loadedName;
    } else {
        var random = Math.floor(Math.random() * 100); // 0～99
        name.value = random;
    }
}