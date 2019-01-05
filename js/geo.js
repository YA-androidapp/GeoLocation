function geoFindMe() {

    if (!navigator.geolocation) {
        document.getElementById("map").innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    function geo_success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        document.getElementById("latitude").innerText = latitude;
        document.getElementById("longitude").innerText = longitude;
        if (map && (false == isNaN(latitude)) && (false == isNaN(longitude))) {
            mpoint = [latitude, longitude];
            map.setView(mpoint, 18);

            sendLocation();
        }
    }

    function geo_error(error) {
        output.innerHTML = 'ERROR(' + error.code + '): ' + error.message;
    }

    // とりあえず低精度で速やかに測位
    navigator.geolocation.getCurrentPosition(geo_success, geo_error);

    // GPS等による高精度測位を非同期的に継続
    var geo_options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
    };
    var watchID = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
    // navigator.geolocation.clearWatch(watchID);
}