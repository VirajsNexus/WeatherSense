const API_KEY = `560b67b7afd2844922d3b27552d2db52`;

let vantaEffect;

const searchTemperature = (event) => {
    if (event) {
        event.preventDefault();
    }
    const city = document.getElementById('city-name').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    
    fetch(url)
        .then(res => res.json())
        .then(data => displayTemperature(data));
}

const setInnerText = (id, text) => {
    document.getElementById(id).innerText = text;
}

const setWeatherBackground = (weatherCondition) => {
    if (vantaEffect) {
        vantaEffect.destroy();
    }

    switch (weatherCondition) {
        case 'Clear':
            // Sunny background
            vantaEffect = VANTA.GLOBE({
                el: "#webgl-background",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                backgroundColor: 0x1c3f6e, // Deep blue sky
                color: 0xffd200 // Bright sun yellow
            });
            break;

        case 'Snow':
            // Cold / Snowy background (ice crystal effect)
            vantaEffect = VANTA.GLOBE({
                el: "#webgl-background",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                color1: 0xadd8e6, // Light blue
                color2: 0xf0ffff, // Azure white
                size: 2.5,
                speed: 1.5
            });
            break;

        case 'Clouds':
            // Cloudy background
            vantaEffect = VANTA.GLOBE({
                el: "#webgl-background",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                skyColor: 0x68b8d7,
                cloudColor: 0xadc1c5,
                cloudShadowColor: 0x3d5d7d,
                sunColor: 0xff9919,
                speed: 1.0
            });
            break;
            
        case 'Rain':
        case 'Drizzle':
        case 'Thunderstorm':
            // Raining background
            vantaEffect = VANTA.GLOBE({
                el: "#webgl-background",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                color: 0x3d4e52,
                shininess: 30.00,
                waveHeight: 15.00,
                waveSpeed: 0.50,
                zoom: 0.85
            });
            break;

        case 'Mist':
        case 'Haze':
        case 'Fog':
        default:
            // Default "Earth-like" background for everything else
            vantaEffect = VANTA.GLOBE({
                el: "#webgl-background",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                color: 0x3d70a1,
                backgroundColor: 0x222222,
                size: 0.8,
            });
            break;
    }
}

const displayTemperature = temperature => {
    if (temperature.cod === '404') {
        alert("City not found. Please try again.");
        return;
    }

    setInnerText('city', temperature.name);
    setInnerText('temp', temperature.main.temp);
    setInnerText('weather', temperature.weather[0].main);

    const url = `https://openweathermap.org/img/wn/${temperature.weather[0].icon}@2x.png`;
    const imgIcon = document.getElementById('image-icon');
    imgIcon.setAttribute('src', url);

    const weatherCondition = temperature.weather[0].main;
    setWeatherBackground(weatherCondition);
}

document.addEventListener('DOMContentLoaded', () => {
    // Set the initial "Earth-like" background
    setWeatherBackground('Default'); // Triggers the default case

    const searchButton = document.querySelector('.btn-danger');
    searchButton.addEventListener('click', searchTemperature);

    // Also allow searching by pressing Enter in the input field
    const cityInput = document.getElementById('city-name');
    cityInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            searchTemperature(e);
        }
    });
});

