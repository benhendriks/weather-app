window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(`.temperature-description`);
  let temperatureDegree = document.querySelector(`.temperature-degree`);
  let locationTimezone = document.querySelector(`.location-timezone`);
  let temperatureSection = document.querySelector(`.temperature`);
  let temperatureSpan = document.querySelector(`.temperature span`);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
    long = position.coords.longitude;
    lat = position.coords.latitude;

    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=c86d69b9a28eb6e27e8c1d1f8f31612d&units=imperial`;

     fetch(api)
        .then(response => {
          return response.json()
        })
        .then(data => {
          const { temp, description, icon } = data.main;
          //Set DOM Elements from the API
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = data.weather[0].description;
          temperatureDegree.textContent = temp;
          locationTimezone = data.sys.country;
            //Formula for Celsius
            let celsius = (temp - 32) * (5 / 9);
            //Set Icon
            setIcons(icon, document.querySelector(".icon"));

            //Cahneg temperature to Celsius/Farenheit
            temperatureSection.addEventListener(`click`, () => {
              if(temperatureSpan.textContent === "F"){
                temperatureSpan.textContent = "C";
                temperatureDegree.textContent = Math.floor(celsius);
              }else{
                temperatureSpan.textContent = "F";
                temperatureDegree.textContent = temp;
              }
            });
        });
    });
  }

  function setIcons(icon, iconID){
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
