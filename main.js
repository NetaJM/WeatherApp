'use strict'

// API taken from - https://openweathermap.org/current

const weather = {
    apiKey: '822fbfeb39cbef5b8c2cfe78f277bcea',
    fetchWeather: async function (city) {
        // fetch is asyncronous, wait for it to get the response
        const response = await fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apiKey
        )
        if (!response.ok) {
            alert("Not found")
            throw new error('Not found');
        }

        const responseData = await response.json();

        this.displayWeather(responseData)
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector('.city').innerText = "Weather in " + name;
        document.querySelector('.icon').src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('.description').innerText = description;
        document.querySelector('.temp').innerText = temp + "°C";
        document.querySelector('.humidity').innerText =
            "Humidity: " + humidity + "%";
        document.querySelector('.wind').innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector('.weather').classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector('.search-bar').value);
    }
};

document.querySelector('.search button').addEventListener('click', function () {
    weather.search();
});

document.querySelector('.search-bar').addEventListener('keyup', function (event) {
    if (event.key === 'enter') {
        weather.search
    }
});


weather.fetchWeather('Belgrade')