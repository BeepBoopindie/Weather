//Icons by https://ui8.net/hosein_bagheri/products/3d-weather-icons40
//Design by https://www.behance.net/gallery/139988031/Weather-Mobile-App-Design?tracking_source=search_projects_recommended%7Cweather%20app 
//google api key AIzaSyCmFOpufylZd55_74qd4YruSQ5037u9BUM
const key = "50745880bac2336ee9d7bb568346f4db";
const _lat = "51.3903102";
const _long = "1.3958178";

const getweather = async(lat,long) => {
    const baseUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=";
    const query = `${lat}&lon=${long}&exclude=minutely,alerts&appid=${key}&units=metric`;

    const res = await fetch(baseUrl + query);
    const data = await res.json();
    console.log(data);
    UpdateUI(data);
    //UpdateUI(data[0]);
    return data;
}

function UpdateUI(data){

    let d = new Date(data.current.dt * 1000);
    console.log(d.getHours());
    if(d.getHours() > 6 && d.getHours() < 19){
        document.body.style.backgroundImage=  "linear-gradient(140deg,#1404ba, #E3BEFE)"; 
    }else{
        document.body.style.backgroundImage=  "linear-gradient(140deg,#0C0214, #7744CA)"; 
    }

    document.getElementById("date").innerText = d.toLocaleString('en-gb', {
        weekday: 'short', // long, short, narrow
        day: 'numeric', // numeric, 2-digit
        month: 'long', // numeric, 2-digit, long, short, narrow
        hour: 'numeric', // numeric, 2-digit
        minute: 'numeric', // numeric, 2-digit
    });
    document.getElementById("cur-temp").innerHTML = Math.round (data.current.temp) + "&deg;";
    document.getElementById("min-temp").innerHTML = Math.round((data.daily[0].temp.min)) + "&deg;";
    document.getElementById("max-temp").innerHTML = Math.round((data.daily[0].temp.max)) + "&deg;";
    document.getElementById("weatherdesc").innerText = data.current.weather[0].description;
    document.getElementById("cur-icon").src = "icons/" + data.current.weather[0].icon + ".webp";

    //Hourly UI

    for(let i =0; i < 12; i++){
        document.getElementById("t" + (i+1) + "-time").innerText = new Date(data.hourly[i].dt * 1000).toLocaleString('en-gb', {
            hour: 'numeric', // numeric, 2-digit
            minute: 'numeric', // numeric, 2-digit
        });
        //set icon
        document.getElementById("t" + (i+1) + "-icon").src = "icons/" + data.hourly[i].weather[0].icon + ".webp";
        document.getElementById("t" + (i+1) + "-temp").innerHTML = Math.round (data.hourly[i].temp) + "&deg;";
        document.getElementById("t" + (i+1) + "-perc").innerHTML = '<i class="fa-solid fa-droplet"></i> ' + Math.round(data.hourly[i].pop * 100) + '%';
    }

    //Extra info UI
    document.getElementById("windspeed").innerHTML = Math.round (data.current.wind_speed) + "mph";
    document.getElementById("humidity").innerHTML = Math.round (data.current.humidity) + "%";
    document.getElementById("uv").innerHTML = Math.round (data.current.uvi) + "";
    document.getElementById("pressure").innerHTML = Math.round (data.current.pressure) + "";

    //Weekly information


    for(let i =0; i < 7; i++){
        //set icon
        document.getElementById((i) + "-low").innerHTML = Math.round (data.daily[i].temp.min) + "&deg;";
        document.getElementById((i) + "-high").innerHTML = Math.round (data.daily[i].temp.max) + "&deg;";

        document.getElementById("d" + (i) + "-perc").innerHTML = '<i class="fa-solid fa-droplet"></i> ' + Math.round(data.daily[i].pop* 100) + "%";
        document.getElementById("d" + (i) + "-icon").src = "icons/" + data.daily[i].weather[0].icon + ".webp";
        document.getElementById("d" + (i) + "-day").innerText = new Date(data.daily[i].dt * 1000).toLocaleString('en-gb', {
            weekday: 'short', // numeric, 2-digit
        });
    }

    getMap();
}

function setSunset (){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(50, 100);
    ctx.bezierCurveTo (150, 0, 250, 100, 250, 100);
    ctx.lineCap = 'round';

    
    ctx.stroke();
}

function getMap(){
   
    document.getElementById("map").src='https://maps.googleapis.com/maps/api/staticmap?center=' + _lat +',' + _long + '&zoom=12&size=400x200&key=AIzaSyCmFOpufylZd55_74qd4YruSQ5037u9BUM';
        
}

function search_Location(){

}

function save_Location(){

}


window.onload = getweather(_lat,_long);