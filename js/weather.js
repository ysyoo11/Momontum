const weather = document.querySelector(".js-weather");
const weatherDetail = document.querySelector(".js-weather-detail");

const API_KEY = "bcab2e2fc0a3674681dca542627dbb28";
const COORDS = "coords";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = Math.round(json.main.temp);
      const place = json.name;
      const iconURL = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
      const icon = new Image(50, 50);
      icon.src = iconURL;
      weather.innerText = `${temperature}℃, ${place}`;
      weatherDetail.appendChild(icon);
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}
// same as
// latitude = latitude,
// longitude = longitude

function handleGeoError() {
  console.log("Can't access your location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
