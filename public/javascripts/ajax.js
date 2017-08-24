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
        bicycling: form.elements.velo.checked,
        driving: form.elements.voiture.checked,
        transit: form.elements.tec.checked,
        walking: form.elements.marche.checked,
    };

    let travel = `bicycling=${datas.bicycling}-driving=${datas.driving}-transit=${datas.transit}-walking=${datas.walking}`;
    console.log(travel);
    ajax(
        "GET",
        `http://localhost:3000/api/${datas.start}/${datas.end}/${travel}`,
        (response) => {
            let json = JSON.parse(response);
            displayDatas(json);

            var map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 48.8534 , lng: 2.3488},
                zoom: 6
            });
            //var infoWindow = new google.maps.InfoWindow({map: map, content : json[0].legs[0].distance.text, position : Paris});
            var bounds = new google.maps.LatLngBounds();

            var path = google.maps.geometry.encoding.decodePath(json[0].overview_polyline.points);
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

            new google.maps.Marker({
                position: {lat: json[0].legs[0].end_location.lat, lng: json[0].legs[0].end_location.lng},
                map: map,
                title: json[0].legs[0].end_address
            })
            var infoWindow = new google.maps.InfoWindow({map: map, content : json[0].legs[0].distance.text + ", " + json[0].legs[0].duration.text, position : {lat: json[0].legs[0].end_location.lat, lng: json[0].legs[0].end_location.lng}});
            new google.maps.Marker({
                position: {lat: json[0].legs[0].start_location.lat, lng: json[0].legs[0].start_location.lng},
                map: map,
                title: json[0].legs[0].start_address

            })
        },
        null,
        false,
    );
});

function displayDatas(json) {
    let route = json[0].legs[0];
    let arrSteps = route.steps;
    let div = document.querySelector("#trajet");
    let title = document.querySelector("#trajet h2:first-child");

    title.textContent = `${route.start_address} - ${route.end_address} / ${route.distance.text} - ${route.duration.text}`;

    arrSteps.forEach((step) => {
        let p = document.createElement('p');
        p.innerHTML = `${step.distance.text} - ${step.duration.text} - ${step.html_instructions}`;
        div.appendChild(p);
    });
}