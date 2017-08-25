function displayDatas(route) {
    let div = document.querySelector("#trajet");

    let legs = route.legs[0];
    let ol = document.createElement("ol");
    ol.textContent = `${legs.start_address} - ${legs.end_address} / ${legs.distance.text} - ${legs.duration.text}`;
    div.appendChild(ol);

    let steps = legs.steps;
    steps.forEach((step) => {
        let li = document.createElement("li");
        li.innerHTML = `${step.distance.text} - ${step.duration.text} - ${step.html_instructions}`;
        ol.appendChild(li);
    });
}

function drawRoute(route) {
    var legs = route.legs[0];
    var bounds = new google.maps.LatLngBounds();
    var map = new google.maps.Map(document.getElementById('map'),
        {
            center: {
                lat: 48.8534,
                lng: 2.3488
            },
            zoom: 6
        }
    );

    new google.maps.Marker({
        position: {
            lat: legs.start_location.lat,
            lng: legs.start_location.lng
        },
        map: map,
        title: legs.start_address
    });

    new google.maps.Marker(
        {
            position: {
                lat: legs.end_location.lat,
                lng: legs.end_location.lng
            },
            map: map,
            title: legs.end_address
        }
    );

    new google.maps.InfoWindow(
        {
            map: map,
            content: legs.distance.text + ", " + legs.duration.text,
            position: {
                lat: legs.end_location.lat,
                lng: legs.end_location.lng
            }
        }
    );

    var path = google.maps.geometry.encoding.decodePath(route.overview_polyline.points);

    for (var i = 0; i < path.length; i++)
        bounds.extend(path[i]);

    var polyline = new google.maps.Polyline(
        {
            path: path,
            strokeColor: 'red',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: 'red',
            fillOpacity: 0.35,
            map: map
        }
    );

    polyline.setMap(map);
    map.fitBounds(bounds);
}

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

let inputChecked = document.getElementById('checkvoiture');
inputChecked.addEventListener('change', (e) => {
    if (e.target.checked) {
        document.getElementById('checkferroviaire').disabled = true;
        document.getElementById('checkvelo').disabled = true;
        document.getElementById('checkmarche').disabled = true;
    } else {
        document.getElementById('checkferroviaire').disabled = false;
        document.getElementById('checkvelo').disabled = false;
        document.getElementById('checkmarche').disabled = false;
    }
});

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

    ajax(
        "GET",
        `http://localhost:3000/api/${datas.start}/${datas.end}/${travel}`,
        (response) => {
            let json = JSON.parse(response);

            document.querySelector("#trajet").innerHTML = "";

            json.forEach((route) => {
                displayDatas(route);
                drawRoute(route);
            });
        },
        null,
        false,
    );
});