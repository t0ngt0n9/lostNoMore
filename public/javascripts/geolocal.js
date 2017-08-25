var options = {
  enableHighAccuracy: true,
  timeout: 5000000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  document.getElementById('latlng').innerHTML = crd.latitude + ',' + crd.longitude; // Nécéssaire pour le reverse géolocal

  console.log('Votre position actuelle est :');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`Marge d'erreur plus ou moins ${crd.accuracy} mètres.`);
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: crd.latitude, lng: crd.longitude}
  }
  );
  var geocoder = new google.maps.Geocoder();
  var infowindow = new google.maps.InfoWindow;
  geocodeLatLng(geocoder, map, infowindow);
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

document.getElementById('oui').addEventListener('click', function() {
  navigator.geolocation.getCurrentPosition(success, error, options);
});

function geocodeLatLng(geocoder, map, infowindow) {
  var input = document.getElementById('latlng').innerHTML;
  var latlngStr = input.split(',', 2);
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[1]) {
        map.setZoom(16);
        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        });
        infowindow.setContent(results[1].formatted_address);
        document.getElementById('start').value = results[1].formatted_address;
        infowindow.open(map, marker);
      } else {
        window.alert('Aucun résultat');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}
