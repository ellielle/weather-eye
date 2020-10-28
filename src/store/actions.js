export default {
  setUserCoordinates({ commit }, coordinates) {
    commit("SET_USER_COORDINATES", coordinates);
  },
  setWeatherData({ commit }, weatherData) {
    commit("SET_WEATHER_DATA", weatherData);
  },
  setWeeklyForecast({commit}, weeklyForecastData) {
    commit("SET_WEEKLY_FORECAST", weeklyForecastData);
  },
  setDailyForecast({commit}, dailyForecastData) {
    commit("SET_DAILY_FORECAST", dailyForecastData);
  },
  setCurrentWeather({commit}, currentWeatherData) {
    commit("SET_CURRENT_WEATHER", currentWeatherData);
  },
  setUserOptions({commit}, userOptions) {
    commit("SET_USER_OPTIONS", userOptions);
  },
  setPreviousQuery({commit}, previousQuery) {
    commit("SET_PREVIOUS_QUERY", previousQuery);
  }
};
