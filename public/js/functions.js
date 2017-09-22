/**
 * Created by aose on 10/05/2017.
 */

// Global Vars
var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');

$(document).ready(function () {

    $('.result').hide();

    // var options = {
    //     url: 'rs/city.list.json',
    //     getValue: 'name',
    //     list: {
    //         match: {
    //             enabled: true
    //         }
    //     }
    // };
    //
    // $('#search').easyAutocomplete(options);
});




// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
        {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
        }
    }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}




$('#weather-search-form').submit(function (e) {

    e.preventDefault();
    var apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
    var apiId = '2052c5e95a66cca875c0162b197d0614';
    var weatherValue = $('#weather').val();
    var weatherValueString = weatherValue.split(' ').join('+');

    $.ajax({
        // url: apiUrl+'?q='+weatherValue+',es&appid='+apiId+'&units=metric',
        url: apiUrl+'?q='+weatherValueString+'&appid='+apiId+'&units=metric',
        type: 'POST',
        data: {_token: CSRF_TOKEN},
        success: function (data) {

            console.log(data);

            var icon = '';
            $.each(data.weather, function (a, b) {
               icon = b.icon;
            });
            var iconWeather = 'http://openweathermap.org/img/w/'+icon+'.png';
            console.log(iconWeather);

            $('.result').show();
            $('.location').html(data.name);
            $('.temp').html(data.main.temp);
            $('.icon').attr('src', iconWeather);
        }
    });

    console.log(weatherValueString);
    return false;
});
