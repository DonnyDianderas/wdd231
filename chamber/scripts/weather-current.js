// select HTML elements in the document
const myTown = document.querySelector('#town');
const currentTemp = document.querySelector('#temperature');
const weatherIcon = document.querySelector('#graphic');
const captionDesc = document.querySelector('#description');

// create requied variables for the URL
const lat = "-12.083666275359947";
const lon = "-77.05169648082068";
const appi_key = "29f50498de5930012963454a6d5e4469";

// Construct a full path
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appi_key}&units=metric`;

async function apiFetchCurrentWeather() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); //testing only
            displayResultsCurrent(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResultsCurrent(data) {
    myTown.innerHTML = data.name
    currentTemp.innerHTML = `${data.main.temp}&deg;C`; 
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
}

apiFetchCurrentWeather();
