function getTileImage(lat, lon, zoom) {
    const xTile = parseInt(Math.floor((lon + 180) / 360 * (1 << zoom)));
    const yTile = parseInt(Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) /
        Math.PI) / 2 * (1 << zoom)));
    return "https://cyberjapandata.gsi.go.jp/xyz/pale/" + zoom + "/" + xTile + "/" + yTile + ".png";
}

function geoFindMe() {
    var output = document.getElementById("out");

    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    function geo_success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

        var img = new Image();
        img.src = getTileImage(latitude, longitude, 16);

        output.appendChild(img);
    }

    function geo_error(error) {
        output.innerHTML = 'ERROR(' + error.code + '): ' + error.message;
    }

    output.innerHTML = "<p>Locating…</p>";

    // とりあえず低精度で速やかに測位
    navigator.geolocation.getCurrentPosition(geo_success, geo_error);

    // GPS等による高精度測位を非同期的に継続
    var geo_options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
    };
    var watchID = navigator.geolocation.watchPosition(geo_success, geo_error);
    // navigator.geolocation.clearWatch(watchID);
}