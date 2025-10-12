const API_KEY = `560b67b7afd2844922d3b27552d2db52`;

// Create a variable to hold the Vanta.js effect instance
// This is important so we can destroy the old effect before creating a new one
let vantaEffect;

const searchTemperature = () => {
    const city = document.getElementById('city-name').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayTemperature(data));
}

const setInnerText = (id, text) => {
    document.getElementById(id).innerText = text;
}

// NEW FUNCTION: This function will change the background based on the weather condition
const setWeatherBackground = (weatherCondition) => {
    // First, destroy the previous effect if it exists
    if (vantaEffect) {
        vantaEffect.destroy();
    }

    // Use a switch statement to select the correct background
    switch (weatherCondition) {
        case 'Clouds':
            vantaEffect = VANTA.CLOUDS({
                el: "#webgl-background",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                skyColor: 0x68b8d7,
                cloudColor: 0xadc1c5,
                sunColor: 0xff9919,
                speed: 0.8
            });
            break;

        case 'Rain':
        case 'Drizzle':
        case 'Thunderstorm':
            vantaEffect = VANTA.RAIN({
                el: "#webgl-background",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                color: 0x3d4e52,
                shininess: 30.00,
                waveHeight: 15.00,
                waveSpeed: 0.50,
                zoom: 0.85
            });
            break;

        case 'Clear':
             vantaEffect = VANTA.WAVES({
                el: "#webgl-background",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                color: 0x005889,
                shininess: 35.00,
                waveHeight: 15.00,
                waveSpeed: 0.8,
                zoom: 0.8
            });
            break;

        case 'Mist':
        case 'Haze':
        case 'Fog':
        case 'Snow': // Vanta doesn't have a snow effect, so we use Fog as a fallback
             vantaEffect = VANTA.FOG({
                el: "#webgl-background",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                highlightColor: 0xb5c3c8,
                midtoneColor: 0x6a8189,
                lowlightColor: 0x4d6168,
                speed: 1.2
            });
            break;
        
        default:
            // Default to clouds for any other weather condition
             vantaEffect = VANTA.CLOUDS({
                el: "#webgl-background",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                skyColor: 0x68b8d7,
                cloudColor: 0xadc1c5
            });
            break;
    }
}


const displayTemperature = temperature => {
    // Check if the city was not found
    if (temperature.cod === '404') {
        alert("City not found. Please try again.");
        return; // Stop the function here
    }

    setInnerText('city', temperature.name);
    setInnerText('temp', temperature.main.temp);
    setInnerText('weather', temperature.weather[0].main);

    // weather icon settings 
    const url = `https://openweathermap.org/img/wn/${temperature.weather[0].icon}@2x.png`;
    const imgIcon = document.getElementById('image-icon');
    imgIcon.setAttribute('src', url);

    // *** THIS IS THE KEY ADDITION ***
    // Get the main weather condition text (e.g., "Clouds", "Rain", "Clear")
    const weatherCondition = temperature.weather[0].main;
    // Call our new function to update the background
    setWeatherBackground(weatherCondition);
}

// Set a default background when the page first loads
document.addEventListener('DOMContentLoaded', () => {
    setWeatherBackground('Clouds'); // Or any other default you like
});
