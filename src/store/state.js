export default {
  openWeatherAPIEndpoint: "https://api.openweathermap.org/data/2.5",
  giphyAPIEndpoint: "https://api.giphy.com/v1",
  previousQuery: "",
  userCoordinates: { lat: null, lon: null },
  userOptions: { units: null, cityName: null },
  weatherData: {},
  currentWeather: {},
  currentDateTime: "",
  dailyForecast: {},
  weeklyForecast: {},
  availableWeatherUnits: {
    metric: {
      temp: " °C",
      wind: " m/s",
    },
    imperial: {
      temp: " °F",
      wind: " mph",
    },
  },
  userWeatherUnits: {
    temp: " °F",
    wind: " mph",
  }
};
