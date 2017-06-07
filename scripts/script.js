$(document).ready(function() {
    $('#city-form').submit(function(e) {
        e.preventDefault();
        $.ajax(config.apiUrl+'/data/2.5/weather?q='+ $('#town').val()+'&appId='+config.apiKey,{
            method: 'GET',
            success: function(response) {
                populate(response);
            },
            error: function(err) {
                console.error('ERROR !!!', error);
            }
        });

        $.ajax(config.apiUrl+'/data/2.5/forecast/daily?q='+ $('#town').val()+'&cnt=7&appId='+config.apiKey, {
            method: 'GET',
            success: function(resp) {
                weekly(resp);
            },
            error: function(err) {
                console.error('ERROR !!!', err);
            }
        });
    });
});

function populate(json){

    var h2 = document.getElementById('city-name');
    h2.innerText = json.name;

    var p1 = document.getElementById('temp');
    p1.innerText = 'Température actuelle : '+Math.round((json.main.temp-273.15)*100)/100+"°C";

    var img = document.getElementById('icon');

    img.src= "http://openweathermap.org/img/w/"+json.weather[0].icon+".png";

    var dat = document.getElementById('date');
    var dt = new Date(json.dt*1000);
    dat.innerText = 'heure de mesure : '+dt.getHours()+'h'+dt.getMinutes()+'min';

    var sunR = document.getElementById('sunrise');
    var sr = new Date(json.sys.sunrise*1000);
    sunR.innerText = 'lever du Soleil : '+sr.getHours()+'h'+sr.getMinutes()+'min';
    console.log(sr.getDay());

    var sunS = document.getElementById('sunset');
    var ss = new Date(json.sys.sunset*1000);
    sunS.innerText = 'coucher du Soleil : '+ss.getHours()+'h'+ss.getMinutes()+'min';

    var humi = document.getElementById('humidity');
    humi.innerText = 'taux d\'humidité : '+json.main.humidity+'%';

    var pres = document.getElementById('pressure');
    pres.innerText = 'pression atmosphérique : '+json.main.pressure+'hPa';

    var wind = document.getElementById('wspeed');
    wind.innerText = 'vitesse du vent : '+json.wind.speed+'km/h';

}

function weekly(resp) {


    var week = [
        'dimanche',
        'lundi',
        'mardi',
        'mercredi',
        'jeudi',
        'vendredi',
        'samedi'
    ];

    var today = new Date();
    var now = today.getDay();

    for (var i = 1; i < 7; i++) {
        var span = document.getElementById('today'+i);
        span.innerText = week[(now+i)%week.length];
        var image = document.getElementById('day' + i);
        image.src = "http://openweathermap.org/img/w/" + resp.list[i].weather[0].icon + ".png";
    }
}