export default {
  setUserCoordinates({ commit }, coordinates) {
    commit("SET_USER_COORDINATES", coordinates);
  },
  setWeatherData({ commit }, weatherData) {
    commit("SET_WEATHER_DATA", weatherData);
  },
  setWeeklyForecast({ commit }, weeklyForecastData) {
    commit("SET_WEEKLY_FORECAST", null);
    commit("SET_WEEKLY_FORECAST", weeklyForecastData);
  },
  setDailyForecast({ commit }, dailyForecastData) {
    commit("SET_DAILY_FORECAST", {});
    commit("SET_DAILY_FORECAST", dailyForecastData);
  },
  setCurrentWeather({ commit }, currentWeatherData) {
    commit("SET_CURRENT_WEATHER", {});
    commit("SET_CURRENT_WEATHER", currentWeatherData);
  },
  setUserOptions({ commit, dispatch }, userOptions) {
    dispatch("setUserUnits", userOptions.units);
    commit("SET_USER_OPTIONS", userOptions);
  },
  setPreviousQuery({ commit }, previousQuery) {
    commit("SET_PREVIOUS_QUERY", previousQuery);
  },
  setUserUnits({ commit, state }, userUnits) {
    let newWeatherUnits =
      userUnits === "imperial"
        ? state.availableWeatherUnits.imperial
        : state.availableWeatherUnits.metric;    
    commit("SET_USER_UNITS", newWeatherUnits);
  },
  setCurrentDateTime({commit}, newDateTime) {    
    commit("SET_CURRENT_DATETIME", newDateTime);
  },
  setCurrentCity({commit}, currentCity) {
    commit("SET_CURRENT_CITY", currentCity);
  },
  setCurrentSearchCoordinates({commit}, currentCoordinates) {
    commit("SET_CURRENT_SEARCH_COORDS", currentCoordinates);
  }
};
