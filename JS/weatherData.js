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
    try {
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
            document.querySelector(".weatherData_section").classList.add("hidden");
            document.querySelector(".errorMsg").classList.remove("hidden");
            if (error.code == error.PERMISSION_DENIED) {
                document.querySelector("#error").textContent = "Climora can't feel your weather without location access. Please enable it.";
            } else if (error.code == error.PERMISSION_UNAVAILABLE) {
                document.querySelector("#error").textContent = "Oops! Something went wrong while getting your location.";
            } else {
                document.querySelector("#error").textContent = "❌ Oops! Something went wrong while getting your location."
            }
        })

    } catch (error) {
        console.error(error);
        // let weather_section = document.querySelector("#weatherData_section")
        // weather_section.classList.add("hidden")
    }

}
userLocalWeather();

const searchInput = document.querySelector("#search_input");
// search Input ki value pr weather fetch hoga 
searchBtn.addEventListener('click', async e => {
    e.preventDefault();
    try {
        const CITYNAME_URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value.toLowerCase().trim()}&appid=${API_KEY}&units=metric`;

        let response = await fetch(CITYNAME_URL)
        const data = await response.json();
        console.log(data);

        document.querySelector(".weatherData_section").classList.remove("hidden");
        document.querySelector(".errorMsg").classList.add("hidden");

        tempHeading.textContent = Math.round(data.main.temp) + '\u00B0C';
        cityName.textContent = data.name;
        // weather_icon.src = data.weather[0].icon + ".png";
        cloudy.textContent = data.clouds.all + "%";
        humidity.textContent = data.main.humidity + "%";
        wind.textContent = data.wind.speed + "km/h";
        searchInput.value = "";
    } catch (err) {
        console.error(err)
        // console.error(err.message)
        if (err.status == "404") {
            document.querySelector(".weatherData_section").classList.add("hidden");
            document.querySelector(".errorMsg").classList.remove("hidden");
            document.getElementById("error").textContent = `City name is Invalid.`;
            searchInput.value = ""
        }
    }
});

// time and date updating function
function timeUpdate() {
    let currentTime = moment().format('h:mm:ss a, MMMM Do YYYY');
    let date = document.querySelector(".date");
    date.textContent = String(currentTime);
    setTimeout(timeUpdate, 1000);
}
timeUpdate()

const cities = document.querySelector("#featured_cities")

// cities.addEventListener("click", e => {
//     e.preventDefault()
//     console.log(e.target.value);
// })

cities.childNodes.forEach(city => {
    // if (elem.firstChild !== null) {
    // let data = elem.firstChild.nodeValue

    city.addEventListener("click", async e => {
        e.preventDefault()
        try {

            console.log(city);
            const CITYNAME_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent.toLowerCase()}&appid=${API_KEY}&units=metric`;

            let response = await fetch(CITYNAME_URL)
            let data = await response.json();
            // console.log(data);

            // active city styling change
            const cityLis = document.querySelectorAll(".featured_cities")
            cityLis.forEach(c => c.classList.remove("active-city"))
            city.classList.add("active-city")

            tempHeading.textContent = Math.round(data.main.temp) + '\u00B0C';
            cityName.textContent = data.name;
            // weather_icon.src = data.weather[0].icon + ".png";
            cloudy.textContent = data.clouds.all + "%";
            humidity.textContent = data.main.humidity + "%";
            wind.textContent = data.wind.speed + "km/h";

        } catch (error) {
            console.error(error)
        }
    })
    // }
});

// let featured_cities = [];
// for (let i = 0; i < cities.length; i++) {
//     featured_cities.push(cities[i]);

// }

// console.log(featured_cities);