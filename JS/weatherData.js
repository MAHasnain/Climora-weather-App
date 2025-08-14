const searchBtn = document.querySelector("#search_btn");
const searchInput = document.querySelector("#search_input");
const API_KEY = "5a71abc40ef3888a3f7ff6996962655d"

searchBtn.addEventListener('click', async e => {
    e.preventDefault();
    const CITYNAME_URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${API_KEY}&units=metric`;

    let response = await fetch(CITYNAME_URL)
    const data = await response.json();
    console.log(data);

})