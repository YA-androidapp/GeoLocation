window.onload = function () {
    form_init();
    rtc_init();
    map_init();
    geoFindMe();

    latlng_init();
}

function getUrlParameter(name) {
    var regex = new RegExp('[\\?&]' + (name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')) + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? null : JSON.parse(decodeURIComponent( results[1].replace(/\+/g, ' ') ));
}

function form_init() {
    var roomNameValue = getUrlParameter("roomName");
    var roomName = document.getElementById('roomName');
    if(null != roomNameValue && "" == roomNameValue){
        roomName.value = sanitaize.encalphanum(roomNameValue);
    } else {
        var random = 1000 + Math.floor(Math.random() * 1000); // 1000～1999を生成
        roomName.value = random;
    }

    var name = document.getElementById('name');
    name.addEventListener('change', function () {
        if (('localStorage' in window) && (window.localStorage !== null)) {
            localStorage.setItem('name', document.getElementById('name').value);
            // console.log('save name: ' + document.getElementById('name').value);
        }
    }, false);
    loadedName = localStorage.getItem('name');
    if (loadedName && loadedName.length > 0) {
        name.value = sanitaize.encode(loadedName);
    } else {
        var random = Math.floor(Math.random() * 100); // 0～99を生成
        name.value = 'User' + random;
    }

    var copyUrl = document.getElementById('copyUrl');
    copyUrl.addEventListener('click', function () {
        var copyTarget = document.getElementById("shareUrl");
        copyTarget.select();
        document.execCommand("Copy");
    }, false);
}

sanitaize = {
    encode: function (str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    },

    decode: function (str) {
        return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, '\'').replace(/&amp;/g, '&');
    },

    encalphanum: function (str) {
        return str.replace(/[^0-9a-zA-Z-]/g, '');
    },

    encllnum: function (str) {
        return str.replace(/[^-0-9.]/g, '');
    }
};

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