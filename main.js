//Icons by https://ui8.net/hosein_bagheri/products/3d-weather-icons40
//Design by https://www.behance.net/gallery/139988031/Weather-Mobile-App-Design?tracking_source=search_projects_recommended%7Cweather%20app 

const key = "1A47MeDHVCWLUtpvohBw8KABLLR6IHA3";
const _id = "323729";


const getCurrent = async(id) => {
    const baseUrl = "https://dataservice.accuweather.com/currentconditions/v1/";
    const query = `${id}?apikey=${key}`;

    const res = await fetch(baseUrl + query);
    const data = await res.json();

    console.log(data);
    UpdateUI(data[0]);
    getDaily(id);
    return data[0];
}
const getDaily = async(id) => {
    const baseUrl = "https://dataservice.accuweather.com/forecasts/v1/daily/1day/";
    const query = `${id}?apikey=${key}`;

    const res = await fetch(baseUrl + query);
    const data = await res.json();

    console.log(data);
    document.getElementById("min-temp").innerHTML = Math.round((data.DailyForecasts[0].Temperature.Minimum.Value) / 32 * 5) + "&deg;";
    document.getElementById("max-temp").innerHTML = Math.round((data.DailyForecasts[0].Temperature.Maximum.Value) / 32 * 5) + "&deg;";
    getHourly(id);
    return data[0];
}


const getHourly = async(id) => {
    const baseUrl = "https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/";
    const query = `${id}?apikey=${key}&metric=true`;

    const res = await fetch(baseUrl + query);
    const data = await res.json();
    console.log(data);

    for(let i =0; i < data.length; i++){
        document.getElementById("t" + (i+1) + "-time").innerText = new Date(data[i].EpochDateTime * 1000).toLocaleString('en-gb', {
            hour: 'numeric', // numeric, 2-digit
            minute: 'numeric', // numeric, 2-digit
        });
        //set icon
        document.getElementById("t" + (i+1) + "-icon").src = "icons/" + data[i].WeatherIcon + ".webp";
        document.getElementById("t" + (i+1) + "-temp").innerHTML = Math.round (data[i].Temperature.Value) + "&deg;";
        document.getElementById("t" + (i+1) + "-perc").innerHTML = '<i class="fa-solid fa-droplet"></i> ' + data[i].PrecipitationProbability + '%';
    }
    //UpdateUI(data[0]);
    return data[0];
}

function UpdateUI(data){

    if(data.IsDayTime){
        document.body.style.backgroundImage=  "linear-gradient(140deg,#1404ba, #E3BEFE)"; 
    }else{
        document.body.style.backgroundImage=  "linear-gradient(140deg,#0C0214, #7744CA)"; 
    }

    document.getElementById("date").innerText = new Date(data.EpochTime * 1000).toLocaleString('en-gb', {
        weekday: 'short', // long, short, narrow
        day: 'numeric', // numeric, 2-digit
        month: 'long', // numeric, 2-digit, long, short, narrow
        hour: 'numeric', // numeric, 2-digit
        minute: 'numeric', // numeric, 2-digit
    });
    document.getElementById("cur-temp").innerHTML = Math.round (data.Temperature.Metric.Value) + "&deg;";
    document.getElementById("weatherdesc").innerText = data.WeatherText;
    document.getElementById("cur-icon").src = "icons/" + data.WeatherIcon + ".webp";
}


window.onload = getCurrent(_id);