const searchBtn = document.querySelector("#search_btn");
const API_KEY = "5a71abc40ef3888a3f7ff6996962655d"
const cloudy = document.querySelector("#cloudy")
const humidity = document.querySelector("#humidity")
const wind = document.querySelector("#wind");
const tempHeading = document.querySelector(".temp");
const cityName = document.querySelector("#cityName_heading");
const weather_icon = document.querySelector("#weather_icon");
// Initial state 

function userLocalWeather() {
    navigator.geolocation.getCurrentPosition(async (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`

        let response = await fetch(API_URL);
        let data = await response.json()
        console.log(data);

        tempHeading.textContent = Math.round(data.main.temp) + '\u00B0C';
        cityName.textContent = data.name;
        // weather_icon.src = data.weather[0].icon + ".png";
        cloudy.textContent = data.clouds.all + "%";
        humidity.textContent = data.main.humidity + "%";
        wind.textContent = data.wind.speed + "km/h";

    }, (error) => {
        console.error(error);
        document.querySelector(".weatherData_section").classList.add("hidden")
        if (error.code == 1) {
            
            // alert("Error: Access is denied!");
        } else if (error.code == 2) {
            document.querySelector(".details").classList.add("hidden")
            // alert("Position is unavailable!");
        }
    })
}
userLocalWeather();

// search Input ki value pr weather fetch hoga 
searchBtn.addEventListener('click', async e => {
    e.preventDefault();
    const searchInput = document.querySelector("#search_input");

    const CITYNAME_URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value.toLowerCase()}&appid=${API_KEY}&units=metric`;

    let response = await fetch(CITYNAME_URL)
    const data = await response.json();
    console.log(data);

    tempHeading.textContent = Math.round(data.main.temp) + '\u00B0C';
    cityName.textContent = data.name;
    // weather_icon.src = data.weather[0].icon + ".png";
    cloudy.textContent = data.clouds.all + "%";
    humidity.textContent = data.main.humidity + "%";
    wind.textContent = data.wind.speed + "km/h";
    searchInput.value = ""
});
// time and date updating function
function timeUpdate() {
    let currentTime = moment().format('h:mm:ss a, MMMM Do YYYY');
    let date = document.querySelector(".date");
    date.textContent = String(currentTime);
    setTimeout(timeUpdate, 1000);
}
timeUpdate()

// const cities = document.querySelector(".featured_cities").childNodes[0]
// console.log(cities);

let featured_cities = [];
