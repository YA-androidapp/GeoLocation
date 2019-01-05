map = null;

function map_init() {
    map = L.map('map', {
        zoomControl: true
    });
    var mpoint = [35.531388046719215, 139.69683229923248];
    map.setView(mpoint, 18);
    L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    }).addTo(map);

    // var myIcon1 = L.divIcon({
    //     className: 'icon1',
    //     iconAnchor: [13, 13]
    // });
    // L.marker(mpoint, {
    //     icon: myIcon1
    // }).addTo(map);
}