import {
  SET_USER_COORDINATES,
  SET_WEATHER_DATA,
  SET_DAILY_FORECAST,
  SET_WEEKLY_FORECAST,
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
    // Type determines how API returns data.
    // Data contains forecast object, description string, wind speed, and geo coord object
    state.dailyForecast = dailyForecastData;
  },
};
