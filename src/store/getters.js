export default {
  getOpenWeatherAPIEndpoint(state) {
    return state.openWeatherAPIEndpoint;
  },
  getGiphyAPIEndpoint(state) {
    return state.giphyAPIEndpoint;
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
  getWeeklyForecastData(state){
    return state.weeklyForecast;
  },
  getUserOptions(state) {
    return state.userOptions;
  },
};
