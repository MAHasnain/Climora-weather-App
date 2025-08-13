const searchBtn = document.querySelector("#search_btn");
const searchInput = document.querySelector("#search_input");


searchBtn.addEventListener('click', async e => {
    e.preventDefault();

    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=5a71abc40ef3888a3f7ff6996962655d&units=metric`)
    const data = await response.json();
    console.log(data);

})