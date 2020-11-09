export default {
  getOpenWeatherAPIEndpoint(state) {
    return state.openWeatherAPIEndpoint;
  },
  getGiphyAPIEndpoint(state) {
    return state.giphyAPIEndpoint;
  },
  getLocationIQAPIEndpoint(state) {
    return state.locationIQAPIEndpoint;
  },
  getUserCoordinates(state) {
    return state.userCoordinates;
  },
  getWeatherData(state) {
    return state.weatherData;
  },
  getCurrentWeatherData(state) {
    return state.currentWeather;
  },
  getDailyForecastData(state) {
    return state.dailyForecast;
  },
  getWeeklyForecastData(state) {
    return state.weeklyForecast;
  },
  getUserOptions(state) {
    return state.userOptions;
  },
  getPreviousQuery(state) {
    return state.previousQuery;
  },
  getAvailableWeatherUnits(state) {
    return state.availableWeatherUnits;
  },
  getWeatherUnits(state) {
    return state.userWeatherUnits;
  },
  getCurrentDateTime(state) {
    return state.currentDateTime;
  },
  getCurrentCity(state) {
    return state.currentCity;
  },
  getCurrentSearchCoordinates(state) {
    return state.currentSearchCoordinates;
  }
};
