import {
  SET_USER_COORDINATES,
  SET_WEATHER_DATA,
  SET_DAILY_FORECAST,
  SET_WEEKLY_FORECAST,
  SET_CURRENT_WEATHER,
  SET_USER_OPTIONS,
  SET_PREVIOUS_QUERY,
  SET_USER_UNITS,
  SET_CURRENT_DATETIME,
} from "./mutation-types";

export default {
  [SET_USER_COORDINATES](state, coordinates) {
    state.userCoordinates.lat = coordinates.lat;
    state.userCoordinates.lon = coordinates.lon;
  },
  [SET_WEATHER_DATA](state, weatherData) {
    state.weatherData = weatherData;
  },
  [SET_WEEKLY_FORECAST](state, weeklyForecastData) {
    state.weeklyForecast = weeklyForecastData;
  },
  [SET_DAILY_FORECAST](state, dailyForecastData) {
    state.dailyForecast = dailyForecastData;
  },
  [SET_CURRENT_WEATHER](state, currentWeatherData) {
    state.currentWeather = currentWeatherData;
  },
  [SET_USER_OPTIONS](state, userOptions) {
    state.userOptions = userOptions;
  },
  [SET_PREVIOUS_QUERY](state, previousQuery) {
    state.previousQuery = previousQuery;
  },
  [SET_USER_UNITS](state, userUnits) {
    state.userWeatherUnits = userUnits;
  },
  [SET_CURRENT_DATETIME](state, newDateTime) {
    state.currentDateTime = newDateTime;
  },
};
