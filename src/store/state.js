export default {
  openWeatherAPIEndpoint: "https://api.openweathermap.org/data/2.5",
  giphyAPIEndpoint: "https://api.giphy.com/v1",
  locationIQAPIEndpoint: "https://us1.locationiq.com/v1/reverse.php",
  previousQuery: "",
  userCoordinates: { lat: null, lon: null },
  userOptions: { units: null },
  weatherData: {},
  currentWeather: {},
  currentCity: null,
  currentDateTime: null,
  dailyForecast: {},
  weeklyForecast: [],
  availableWeatherUnits: {
    metric: {
      temp: "°C",
      wind: " m/s",
    },
    imperial: {
      temp: "°F",
      wind: " mph",
    },
  },
  userWeatherUnits: {
    temp: "°F",
    wind: " mph",
  }
};
