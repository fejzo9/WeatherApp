const apiKey = "20712e5c91db9ed66f4a5b6acc50aa20";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather (city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    var weatherCondition = data.weather[0].main;

    const picture = document.querySelector(".weather-icon");

    switch (weatherCondition){
        case 'Clear':
            picture.src = "images/clear.png";
            break;
        case 'Clouds':
            picture.src = "images/clouds.png";
            break;
         case 'Drizzle':
            picture.src = "images/drizzle.png";
            break;
        case 'Mist':
            picture.src = "images/mist.png";
            break;
        case 'Rain':
            picture.src = "images/rain.png";
            break;
        case 'Snow':
            picture.src = "images/snow.png";
            break;
    }

    if(data.main.temp<0){
        picture.src = "images/snow.png";
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    let country = data.sys.country;
    const countryIcon = document.querySelector(".country-icon");
    console.log(country);
    countryIcon.src = "images/zastave/" + country.toLowerCase() + ".png";
}

searchBtn.addEventListener("click", ()=> {
    checkWeather(searchBox.value);
});
