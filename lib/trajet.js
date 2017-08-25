parseModesUrl = (url) => {
    let arrModes = url.split("-");
    let modes = {};

    arrModes.forEach((mode) => {
        let arr = mode.split('=');
        modes[arr[0]] = arr[1];
    });

    return modes;
};

module.exports = {
    getModesTravel: (stringModeUrl) => {
        let modes = parseModesUrl(stringModeUrl);
        let arrModes = [];

        for (let elem in modes) {
            if (modes[elem] === 'true')
                arrModes.push(elem);
        }

        return arrModes;
    },

    setGoogleApiUrl: (start, end, tabModes) => {
        let key = 'AIzaSyCCQF0GSVvpSYo5A1p_7EHx-w-WsmhNMSs';
        let arrGAU = [];

        if (tabModes.length === 0) {
            arrGAU.push("https://maps.googleapis.com/maps/api/directions/json?" +
                        "origin=" + start +
                        "&destination=" + end +
                        "&language=fr" +
                        "&alternatives=true" +
                        "&key=" + key
            );
        } else {
            tabModes.forEach((mode) => {
                arrGAU.push("https://maps.googleapis.com/maps/api/directions/json?" +
                    "origin=" + start +
                    "&destination=" + end +
                    "&mode=" + mode +
                    "&language=fr" +
                    "&alternatives=true" +
                    "&key=" + key
                );
            });
        }

        return arrGAU;
    },

    getTrajet: (json) => {
        if (json.hasOwnProperty('routes')) {
            if (json['routes'].length !== 0) {
                console.log(json['routes'].length);
                return json['routes'];
            }
        }

        return null;
    }
};