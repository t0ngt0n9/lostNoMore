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

    let travel = `velo=${datas.bicycling}-voiture=${datas.driving}-tdc=${datas.transit}-marche=${datas.walking}`;
    //console.log(travel);

    ajax(
        "GET",
        `http://localhost:3000/api/${datas.start}/${datas.end}/${travel}`,
        (response) => {
            response = JSON.parse(response);
            let div = document.createElement('div');
            let main = document.querySelector('main');
            div.textContent = response;
            main.appendChild(div);
        },
        null,
        false
    );
});