import {
  SET_USER_COORDINATES,
  SET_WEATHER_DATA,
  SET_DAILY_FORECAST,
  SET_WEEKLY_FORECAST,
} from "./mutation-types";

// TODO remove log statements

export default {
  [SET_USER_COORDINATES](state, coordinates) {
    state.userCoordinates.lat = coordinates.lat;
    state.userCoordinates.lon = coordinates.lon;
    console.log(state.userCoordinates);
  },
  [SET_WEATHER_DATA](state, weatherData) {
    state.weatherData = weatherData;
    console.log(state.weatherData);
  },
  [SET_WEEKLY_FORECAST](state, weeklyForecastData) {
    state.weeklyForecast = weeklyForecastData;
    console.log(state.weeklyForecast);
  },
  [SET_DAILY_FORECAST](state, dailyForecastData) {
    state.dailyForecast = dailyForecastData;
    console.log(state.dailyForecast);
  },
};
