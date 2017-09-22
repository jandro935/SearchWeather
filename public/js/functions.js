/**
 * Created by aose on 10/05/2017.
 */

// Global Vars
var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');

$(document).ready(function () {

    $('.result').hide();

    var options = {
        url: 'rs/city.list.json',
        getValue: 'name',
        list: {
            match: {
                enabled: true
            }
        }
    };

    $('#search').easyAutocomplete(options);
});

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
