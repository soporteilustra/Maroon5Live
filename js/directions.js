var directionDisplay;
var directionsService = new google.maps.DirectionsService();

function initialize() {
    var latlng = new google.maps.LatLng(-12.0672898, -77.0337289);
    var rendererOptions = {
        draggable: true
    };
    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
    var myOptions = {
        zoom: 16,
        scrollwheel: false,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("directionsPanel"));
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: "Estadio Nacional, Lima"
    });
}

function calcRoute() {
    var travelMode = $('input[name="travelMode"]:checked').val();
    var start = $("#routeStart").val();
    var via = $("#routeVia").val();
    if (travelMode == 'TRANSIT') {
        via = '';
    }
    var end = ("-12.0672898,-77.0337289");
    var waypoints = [];
    if (via != '') {
        waypoints.push({
            location: via,
            stopover: true
        });
    }
    var request = {
        origin: start,
        destination: end,
        waypoints: waypoints,
        unitSystem: google.maps.UnitSystem.METRIC,
        travelMode: google.maps.DirectionsTravelMode[travelMode]
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            $('#directionsPanel').empty();
            directionsDisplay.setDirections(response);
        } else {
            if (status == 'ZERO_RESULTS') {
                alert('No pudimos encontrar rutas entre origen y destino.');
            } else if (status == 'UNKNOWN_ERROR') {
                alert('No pudimos procesar su petición. Inténtelo nuevamente.');
            } else if (status == 'REQUEST_DENIED') {
                alert('Tu navegador no puede usar el servicio de navegación.');
            } else if (status == 'OVER_QUERY_LIMIT') {
                alert('Tiempo límite de petición vencido.');
            } else if (status == 'NOT_FOUND') {
                alert('No pudimos encontrar uno de los destinos.');
            } else if (status == 'INVALID_REQUEST') {
                alert('La dirección ingresas es incorrecta');
            } else {
                alert("Hubo un error inesperado. Estado de petición: nn" + status);
            }
        }
    });
}
