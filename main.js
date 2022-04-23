//Icons by https://ui8.net/hosein_bagheri/products/3d-weather-icons40
//Design by https://www.behance.net/gallery/139988031/Weather-Mobile-App-Design?tracking_source=search_projects_recommended%7Cweather%20app 

const key = "50745880bac2336ee9d7bb568346f4db";
const _lat = "51.3813";
const _long = "1.3862";

const getCurrent = async(lat,long) => {
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather?lat=";
    const query = `${lat}&lon=${long}&appid=${key}&units=metric`;

    const res = await fetch(baseUrl + query);
    const data = await res.json();

    console.log(data);
    UpdateUI(data);
    getHourly(lat,long);
    return data;
}


const getHourly = async(lat,long) => {
    const baseUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=";
    const query = `${lat}&lon=${long}&exclude=current,minutely,daily,alerts&appid=${key}&units=metric`;

    const res = await fetch(baseUrl + query);
    const data = await res.json();
    console.log(data);

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
    //UpdateUI(data[0]);
    return data;
}

function UpdateUI(data){

    let d = new Date(data.dt * 1000);
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
    document.getElementById("cur-temp").innerHTML = Math.round (data.main.temp) + "&deg;";
    document.getElementById("min-temp").innerHTML = Math.round((data.main.temp_min)) + "&deg;";
    document.getElementById("max-temp").innerHTML = Math.round((data.main.temp_max)) + "&deg;";
    document.getElementById("weatherdesc").innerText = data.weather[0].description;
    document.getElementById("cur-icon").src = "icons/" + data.weather[0].icon + ".webp";
}


window.onload = getCurrent(_lat,_long);