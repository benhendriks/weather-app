window.addEventListener("load", () => {
  let long;
  let lat;
  const temperatureDescription = document.querySelector(`.temperature-description`);
  const temperatureDegree = document.querySelector(`.temperature-degree`);
  const locationTimezone = document.querySelector(`.location-timezone`);
  const temperatureSection = document.querySelector(`.temperature-section`);
  const temperatureSpan = document.querySelector(`.temperature-section span`);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
    long = position.coords.lonitude;
    lat = position.coords.latitude;

    const api = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={c86d69b9a28eb6e27e8c1d1f8f31612d}`;

     fetch(api)
        .then(response => {
          return response.json()
        })
        .then(data => {
          const { temperature, summary, icon } = data.currently;
          //Set DOM Elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          temperatureDegree.textContent = temperature;
          locationTimezone = data.timezone;
            //Formula for Celsius
            let celsius = (temperature - 32) * (5 / 9);
            //Set Icon
            setIcons(icon, document.querySelector(".icon"));

            //Cahneg temperature to Celsius/Farenheit
            temperatureSection.addEventListener(`click`, () => {
              if(temperatureSpan.textContent === "F"){
                temperatureSpan.textContent = "C";
                temperatureDegree.textContent = Math.floor(celsius);
              }else{
                temperatureSpan.textContent = "F";
                temperatureDegree.textContent = temperature;
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
