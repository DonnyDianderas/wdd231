
const today = document.querySelector('#today');
const tomorrow = document.querySelector('#tomorrow');
const next = document.querySelector('#next');


const latitude = "-12.083666275359947";
const longitude = "-77.05169648082068";
const appid = "29f50498de5930012963454a6d5e4469";

// URL API Forecast
const myUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${appid}&units=metric`;

async function apiFetch() {
    try {
        const response = await fetch(myUrl);
        if (!response.ok) throw new Error(await response.text());

        const forecast = await response.json();
        console.log(forecast); // Testing only in console

        displayResultsForecast(forecast);
    } catch (error) {
        console.log("Error al obtener datos:", error);
    }
}

function displayResultsForecast(forecast) {
    // get current date
    const todayDate = new Date();
    const tomorrowDate = new Date(todayDate);
    tomorrowDate.setDate(todayDate.getDate() + 1);
    const nextDate = new Date(todayDate);
    nextDate.setDate(todayDate.getDate() + 2);

    // Format dates in "YYYY-MM-DD""
    const todayStr = todayDate.toISOString().split("T")[0];
    const tomorrowStr = tomorrowDate.toISOString().split("T")[0];
    const nextStr = nextDate.toISOString().split("T")[0];

    // Get the names of the days 
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayName = dayNames[todayDate.getDay()];
    const tomorrowName = dayNames[tomorrowDate.getDay()];
    const nextName = dayNames[nextDate.getDay()];

    // Filter forecasts for the next 12:00 PM
    const dailyForecasts = forecast.list.filter(entry => entry.dt_txt.includes("12:00:00"));

    let weatherData = {
        [todayStr]: { element: today, label: todayName },
        [tomorrowStr]: { element: tomorrow, label: tomorrowName },
        [nextStr]: { element: next, label: nextName }
    };

    dailyForecasts.forEach(entry => {
        let forecastDate = entry.dt_txt.split(" ")[0];

        if (weatherData[forecastDate]) {
            let temp = entry.main.temp.toFixed(1);
            weatherData[forecastDate].element.textContent = `${weatherData[forecastDate].label}: ${temp}°C`;
        }
    });
}

apiFetch();

