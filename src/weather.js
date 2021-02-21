const weather= document.querySelector(".js-weather");

const API_KEY = '30185d52b652568e52c00a1a13ede32f';
const COORDS = 'coords';

function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(response){
            return response.json()
        })
        .then(function(json){
            const temperature = json.main.temp;
            const place = json.name;
            const feelLike = json.main.feels_like;
            const weatherStuts = json.weather[0].description;
            const tempMax = json.main.temp_max;
            const tempMin = json.main.temp_min;
            weather.innerText = 
            `${place}
             ${weatherStuts}
             ${temperature}℃
             최고:${tempMax}℃  최저:${tempMin}℃  체감:${feelLike}℃`;
        });      
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log('Can not access geo location')
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();