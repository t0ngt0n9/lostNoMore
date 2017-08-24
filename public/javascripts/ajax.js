function ajax(method, url, callback, data, isJson) {
    let req = new XMLHttpRequest();

    req.open(method, url);

    req.addEventListener("load", () => {
        if (req.status >= 200 && req.status < 400)
            callback(req.responseText);
        else
            console.error(`${req.status} - ${req.statusText} from ${url}`);
    });

    req.addEventListener("error", () => {
        console.error(`Network error ${url}`);
    });

    if (isJson) {
        req.setRequestHeader("Content-Type", "application/json");
        data = JSON.stringify(data);
    }

    req.send(data);
}

let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let datas = {
        start:  form.elements.adrd.value,
        end: form.elements.adra.value,
        choice: form.elements.select1.value,
        velo: form.elements.velo.checked
    };

    ajax(
        "GET",
        `http://localhost:3000/api/${datas.start}/${datas.end}`,
        (response) => {
            let json = JSON.parse(response);
            var map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 48.8534 , lng: 2.3488},
                zoom: 6
            });
            var infoWindow = new google.maps.InfoWindow({map: map});
            var bounds = new google.maps.LatLngBounds();

            var path = google.maps.geometry.encoding.decodePath(json.routes[0].overview_polyline.points);
            for (var i = 0; i < path.length; i++) {
                bounds.extend(path[i]);
            }

            var polyline = new google.maps.Polyline({
                path: path,
                strokeColor: '#FF0000 ',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000 ',
                fillOpacity: 0.35,
                map: map
            });
            polyline.setMap(map);
            map.fitBounds(bounds);
        },
        null,
        false
    );
});

