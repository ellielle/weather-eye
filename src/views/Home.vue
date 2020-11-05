<template>
  <div class="container-main">
    <div class="error-display" v-if="errorMessage">
      <p>{{ errorMessage }}</p>
    </div>
    <div class="search-bar">
      <svg
        class="get-location-image"
        xmlns="http://www.w3.org/2000/svg"
        height="29"
        viewBox="0 0 24 24"
        width="29"
        @click="saveCurrentLocation"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm-1.56 10H9v-1.44l3.35-3.34 1.43 1.43L10.44 12zm4.45-4.45l-.7.7-1.44-1.44.7-.7c.15-.15.39-.15.54 0l.9.9c.15.15.15.39 0 .54z"
        />
      </svg>
      <svg
        class="search-location-image"
        xmlns="http://www.w3.org/2000/svg"
        height="29"
        viewBox="0 0 24 24"
        width="29"
        @click="getWeatherForSavedLocation"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
        />
      </svg>
      <div class="container-btn-search">
        <input
          type="text"
          placeholder="ZIP Code or City & Country code"
          class="weather-input"
          v-model="userInput"
          aria-label="City Search"
          @keydown.enter="searchByInput"
        />
        <button class="btn-search" @click="searchByInput">
          <span>Search</span>
        </button>
      </div>
      <div class="btn-unit-change">
        <span class="btn-unit btn-metric" @click="changeUnits('metric')"
          >Metric: °C</span
        >
        <span class="btn-unit btn-imperial" @click="changeUnits('imperial')"
          >Imperial: °F</span
        >
      </div>
      <button class="btn-refresh" @click="refreshWeather">
        <span>Refresh</span>
      </button>
    </div>
    <button v-if="!isUserLocationSet">TODO NO LOCATION BUTTON</button>
    <div
      class="container-components"
      :style="
        weeklyForecastAvailable ? weatherStyles.weekly : weatherStyles.noWeekly
      "
    >
      <current-weather
        class="current-weather"
        v-if="currentWeatherAvailable"
        :current-weather="getCurrentWeatherData"
      ></current-weather>
      <daily-forecast
        class="daily-forecast"
        v-if="dailyForecastAvailable"
        :forecast="getDailyForecastData"
      ></daily-forecast>
      <weekly-forecast
        class="weekly-forecast"
        v-if="weeklyForecastAvailable"
        :weekly-forecast="getWeeklyForecastData"
        :key="getWeeklyForecastData[0].temp_high"
      ></weekly-forecast>
    </div>
  </div>
</template>

<script>
import CurrentWeather from "./CurrentWeather";
import WeeklyForecast from "./WeeklyForecast";
import DailyForecast from "./DailyForecast";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Home",

  components: {
    CurrentWeather,
    WeeklyForecast,
    DailyForecast,
  },

  // TODO ? refactor refresh to force a position-based query?

  // TODO change location icon to get location button, a different button icon for its current functionality
  // ! have tooltip popup on location data save

  // TODO throw up error message if query comes back invalid

  // TODO animations / transitions (current and daily should slide in from left, weekly from right)
  // TODO animation for location button

  // TODO add page blocking access if localStorage isn't available
  // ? have a landing page letting user know why is blank?

  // ! tooltip popover thing saying nothing to refresh in refreshWeather()

  data() {
    return {
      userInput: "",
      geoDataAvailable: false,
      errorMessage: "",
      searchType: "",
      weatherStyles: {
        weekly:
          "grid-template-columns: repeat(2, 1fr) repeat(2, [col] minmax(100px, 3fr)) repeat(2, 1fr);",
        noWeekly:
          "grid-template-columns: repeat(2, 1fr) [col] minmax(100px, 3fr) repeat(2, 1fr);",
      },
    };
  },

  computed: {
    ...mapGetters([
      "getOpenWeatherAPIEndpoint",
      "getGiphyAPIEndpoint",
      "getUserCoordinates",
      "getWeatherData",
      "getUserOptions",
      "getCurrentWeatherData",
      "getDailyForecastData",
      "getWeeklyForecastData",
      "getPreviousQuery",
      "getCurrentCity",
    ]),
    currentWeatherAvailable() {
      return Object.keys(this.getCurrentWeatherData).length > 0;
    },
    dailyForecastAvailable() {
      return Object.keys(this.getDailyForecastData).length > 0;
    },
    weeklyForecastAvailable() {
      return this.getWeeklyForecastData.length > 0;
    },
    isUserLocationSet() {
      return (
        this.getUserCoordinates.lat !== null &&
        this.getUserCoordinates.lon !== null
      );
    },
  },

  watch: {
    getWeatherData() {
      this.parseWeatherData();
    },
    getUserOptions() {
      try {
        if (!!this.getPreviousQuery) {
          let query = this.getPreviousQuery;
          query =
            this.getUserOptions.units === "imperial"
              ? query.replace("metric", "imperial")
              : query.replace("imperial", "metric");
          this.setPreviousQuery(query);
          this.getWeatherDataFromAPI({
            type: "url",
            data: query,
          });
        }
      } catch (error) {}
    },
  },

  methods: {
    ...mapActions([
      "setUserCoordinates",
      "setWeatherData",
      "setDailyForecast",
      "setCurrentWeather",
      "setWeeklyForecast",
      "setUserOptions",
      "setPreviousQuery",
      "setCurrentDateTime",
      "setCurrentCity",
    ]),

    async getWeatherDataFromAPI(args = { type: "coords" }) {
      let fullAPIURL = ``;
      switch (args.type) {
        case "coords":
          fullAPIURL = `${this.getOpenWeatherAPIEndpoint}/onecall?lat=${this.getUserCoordinates.lat}&lon=${this.getUserCoordinates.lon}&appid=${process.env.VUE_APP_OPENWEATHER_API_KEY}&units=${this.getUserOptions.units}&exclude=minutely,hourly,alerts`;
          break;
        case "zip":
          fullAPIURL = `${this.getOpenWeatherAPIEndpoint}/weather?zip=${args.data}&appid=${process.env.VUE_APP_OPENWEATHER_API_KEY}&cnt=7&units=${this.getUserOptions.units}`;
          break;
        case "city&state":
          fullAPIURL = `${this.getOpenWeatherAPIEndpoint}/weather?q=${args.data}&appid=${process.env.VUE_APP_OPENWEATHER_API_KEY}&cnt=7&units=${this.getUserOptions.units}`;
          break;
        case "url":
          fullAPIURL = args.data;
          break;
      }
      // Ensures a type was sent, otherwise it falls back to the previous query's type
      this.searchType =
        args.type !== "url" ? args.type : this.getPreviousSearchType();
      this.setPreviousQuery(fullAPIURL);
      try {
        console.log(fullAPIURL);
        const response = await fetch(`${fullAPIURL}`, { mode: "cors" });
        const data = await response.json();
        this.setCurrentDateTime(this.getFormattedDateTime());
        this.setWeatherData(data);
        this.parseWeatherData();
      } catch (error) {
        this.setWeatherData({});
        this.setErrorMessage(error);
        this.setPreviousQuery("");
      }
      this.searchType = "";
    },

    getGeoLocationData() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((geoData) => {
          const userLat = geoData.coords.latitude;
          const userLon = geoData.coords.longitude;
          this.setUserCoordinates({
            lat: userLat,
            lon: userLon,
          });
        });
        return true;
      } else {
        return false;
      }
    },

    isLocationSavedInStorage: function () {
      return !!localStorage.getItem("coords");
    },

    searchByInput() {
      this.userInput = this.userInput.replace(/[\s]?[,][\s]+/, ",");
      this.setWeeklyForecast([]);
      if (this.userInput.match(/\d{5}/)) {
        this.getWeatherDataFromAPI({ type: "zip", data: this.userInput });
      } else if (
        this.userInput.match(
          /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*(?:[,])+(?:\s)*(?:[a-zA-Z]){2}$/
        ) ||
        this.userInput.match(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)
      ) {
        // Matches "City Name, State Code"
        this.getWeatherDataFromAPI({
          type: "city&state",
          data: this.userInput,
        });
      }
    },

    parseWeatherData() {
      if (this.searchType === "url") {
        this.searchType = this.getPreviousSearchType();
      }
      this.parseDailyForecast();
      this.parseCurrentWeather();
      this.parseWeeklyForecast();
    },

    getPreviousSearchType() {
      const previousQuery = this.getPreviousQuery;
      if (previousQuery.match(/onecall?/)) {
        return "coords";
      } else if (previousQuery.match(/weather?zip/)) {
        return "zip";
      } else if (previousQuery.match(/weather?q/)) {
        return "city&state";
      }
    },

    getIconURL(icon) {
      return `http://openweathermap.org/img/wn/${icon}@2x.png`;
    },

    parseCurrentWeather() {
      // The following 3 parse methods format data regardless of origin API call
      if (this.searchType === "coords") {
        this.setCurrentWeather({
          temp: this.getWeatherData.current.temp,
          humidity: this.getWeatherData.current.humidity,
          feels_like: this.getWeatherData.current.feels_like,
          description: this.capitalizeDescription(
            this.getWeatherData.current.weather[0].description
          ),
          wind: this.getWeatherData.current.wind_speed,
          icon: this.getIconURL(this.getWeatherData.current.weather[0].icon),
          coords: {
            lat: this.getWeatherData.lat,
            lon: this.getWeatherData.lon,
          },
        });
      } else if (
        this.searchType === "zip" ||
        this.searchType === "city&state"
      ) {
        this.setCurrentWeather({
          temp: this.getWeatherData.main.temp,
          humidity: this.getWeatherData.main.humidity,
          feels_like: this.getWeatherData.main.feels_like,
          description: this.capitalizeDescription(
            this.getWeatherData.weather[0].description
          ),
          wind: this.getWeatherData.wind.speed,
          icon: this.getIconURL(this.getWeatherData.weather[0].icon),
          coords: this.getWeatherData.coord,
        });
      }
    },

    parseDailyForecast() {
      if (this.searchType === "coords") {
        this.setDailyForecast({
          temp_high: this.getWeatherData.daily[0].temp.max,
          temp_low: this.getWeatherData.daily[0].temp.min,
          humidity: this.getWeatherData.daily[0].humidity,
          description: this.capitalizeDescription(
            this.getWeatherData.daily[0].weather[0].description
          ),
          wind: this.getWeatherData.daily[0].wind_speed,
          icon: this.getIconURL(this.getWeatherData.current.weather[0].icon),
        });
      } else if (
        this.searchType === "zip" ||
        this.searchType === "city&state"
      ) {
        this.setDailyForecast({
          temp_high: this.getWeatherData.main.temp_max,
          temp_low: this.getWeatherData.main.temp_min,
          humidity: null,
          description: this.capitalizeDescription(
            this.getWeatherData.weather[0].description
          ),
          wind: this.getWeatherData.wind.speed,
          icon: this.getIconURL(this.getWeatherData.weather[0].icon),
        });
      }
    },

    parseWeeklyForecast() {
      let weeklyForecast = [];
      if (this.searchType === "coords") {
        this.getWeatherData.daily.forEach((forecast) => {
          weeklyForecast.push({
            temp_high: forecast.temp.max,
            temp_low: forecast.temp.min,
            humidity: forecast.humidity,
            description: this.capitalizeDescription(
              forecast.weather[0].description
            ),
            wind: forecast.wind_speed,
            icon: this.getIconURL(forecast.weather[0].icon),
          });
        });
      }
      if (weeklyForecast.length > 0) {
        // Remove current day's data
        weeklyForecast.shift();
        this.setWeeklyForecast(weeklyForecast);
        console.log(weeklyForecast.length);
      }
    },

    setErrorMessage(message) {
      // TODO
      // ! remove logs
      console.log("set error message");
      if (!!message) {
        console.log(message);
      }
    },

    changeUnits(newUnit) {
      let unitChanged = false;
      const metricButton = document.querySelector(".btn-metric");
      const imperialButton = document.querySelector(".btn-imperial");
      if (newUnit === "metric" && this.getUserOptions.units === "imperial") {
        if (imperialButton.classList.contains("selected")) {
          imperialButton.classList.remove("selected");
        }
        metricButton.classList.add("selected");
        unitChanged = true;
      } else if (
        newUnit === "imperial" &&
        this.getUserOptions.units === "metric"
      ) {
        if (metricButton.classList.contains("selected")) {
          metricButton.classList.remove("selected");
        }
        imperialButton.classList.add("selected");
        unitChanged = true;
      }
      if (unitChanged) {
        this.setUserOptions({ units: newUnit });
        localStorage.setItem("units", newUnit);
        this.refreshWeatherNewUnits();
      }
    },

    getStoredUserOptions() {
      if (!this.isLocationSavedInStorage()) {
        if (!this.getGeoLocationData()) {
          this.geoDataAvailable = false;
        }
      } else {
        const coordinates = JSON.parse(localStorage.getItem("coords"));
        this.setUserCoordinates({ lat: coordinates.lat, lon: coordinates.lon });
        this.geoDataAvailable = true;
      }
      if (!localStorage.getItem("units")) {
        localStorage.setItem("units", "imperial");
        this.setUserOptions({ units: "imperial" });
      } else {
        this.setUserOptions({
          units: localStorage.getItem("units"),
        });
      }
    },

    setSelectedOption(userUnits) {
      const selectedButton = document.querySelector(`.btn-${userUnits}`);
      selectedButton.classList.add("selected");
    },

    getFormattedDateTime() {
      const baseDateTime = new Date(Date.now());
      let baseHours = baseDateTime.getHours();
      const baseMinutes = String(baseDateTime.getMinutes()).padStart(2, "0");
      const baseDay = baseDateTime.getDate();
      let isMorning = true;
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const baseMonth = months[baseDateTime.getMonth()];
      if (baseHours > 12) {
        baseHours -= 12;
        isMorning = false;
      } else if (baseHours === 0) {
        baseHours = 12;
      }
      return `${baseHours}:${baseMinutes}${
        isMorning ? "am" : "pm"
      }, ${baseMonth} ${baseDay}`;
    },

    refreshWeather() {
      if (this.getPreviousQuery !== "") {
        this.getWeatherDataFromAPI({
          type: "url",
          data: this.getPreviousQuery,
        });
      } else {
        console.log("error: no query saved");
      }
    },

    refreshWeatherNewUnits() {
      if (this.getPreviousQuery !== "") {
        let editedQuery = this.getPreviousQuery.includes("imperial")
          ? this.getPreviousQuery.replace("imperial", "metric")
          : this.getPreviousQuery.replace("metric", "imperial");
        this.getWeatherDataFromAPI({
          type: "url",
          data: editedQuery,
        });
      } else {
        console.log("error: no query saved");
      }
    },

    focusSearchBar() {
      document.querySelector(".weather-input").focus();
    },

    saveUserLocation(userLat, userLon) {
      try {
        localStorage.setItem(
          "coords",
          JSON.stringify({
            lat: userLat,
            lon: userLon,
          })
        );
        localStorage.setItem("city", JSON.stringify(this.getCurrentCity));
      } catch (error) {
        console.log(error);
      }
    },

    saveCurrentLocation() {
      let newLat;
      let newLon;
      if (this.getWeatherData.coord) {
        newLat = this.getWeatherData.coord.lat;
        newLon = this.getWeatherData.coord.lon;
        this.setUserCoordinates({
          lat: newLat,
          lon: newLon,
        });
        this.saveUserLocation(newLat, newLon);
      } else if (this.getWeatherData.lat && this.getWeatherData.lon) {
        newLat = this.getWeatherData.lat;
        newLon = this.getWeatherData.lon;
        this.setUserCoordinates({
          lat: newLat,
          lon: newLon,
        });
        this.saveUserLocation(newLat, newLon);
      }
    },

    getLocationWeather() {
      if (
        this.getUserCoordinates.lat !== null &&
        this.getUserCoordinates.lon !== null
      ) {
        this.getWeatherDataFromAPI({
          type: "coords",
        });
        this.geoDataAvailable = true;
      }
    },

    capitalizeDescription(description) {
      return description.charAt(0).toUpperCase() + description.slice(1);
    },

    getWeatherForSavedLocation() {},
  },

  mounted() {
    this.getStoredUserOptions();
    this.setSelectedOption(this.getUserOptions.units);
    this.getLocationWeather();
    this.focusSearchBar();
  },
};
</script>

<style lang="scss" scoped>
// Base Style
input[type="text"] {
  font-size: 1rem;
  background-color: var(--main-background);
  height: 20px;
  width: 300px;
  border: 3px solid var(--main-background);
  color: var(--text-color-primary);
  border-radius: 3px;
  &:focus {
    outline: none;
  }
}

.container-main {
  color: var(--text-color-primary);
}

// Component grid

.container-components {
  padding-top: 5px;
  display: grid;
  grid-template-rows: fit-content repeat(3, minmax(100px, 1fr));
  grid-template-columns: 1fr 1fr repeat(2, minmax(100px, 3fr)) 1fr 1fr;
  grid-gap: 5px;
}

.current-weather,
.daily-forecast,
.weekly-forecast {
  background-color: var(--sub-background);
  border: var(--main-border);
}

.current-weather {
  grid-area: 1 / 3 / 1 / 4;
}

.daily-forecast {
  grid-area: 2 / 3 / 2 / 4;
}

.weekly-forecast {
  grid-area: 1 / 4 / 4 / 5;
}

// Search Bar

.get-location-image,
.search-location-image {
  cursor: pointer;
  width: 29px;
  height: 29px;
  fill: var(--text-color-primary);
  transition: fill 0.15s ease-in;
  &:hover {
    fill: orangered;
  }
}

.get-location-image {
  grid-area: row / col 2 / row / col 2;
  justify-self: end;
  margin-right: 30px;
}

.search-location-image {
  grid-area: row / col 2 / row / col 3;
  justify-self: end;
}

.search-bar {
  background-color: var(--sub-background);
  border: var(--main-border);
  width: var(--screen-width);
  display: grid;
  grid: [row] 1fr / repeat(2, [col] 1fr) [col] 2fr repeat(2, [col] 1fr);
}

.container-btn-search {
  grid-column: col 3 / col 4;
  align-self: center;
}

.btn-refresh,
.btn-search {
  font-size: 1rem;
  height: 28px;
  width: 85px;
  border: 1px solid var(--main-background);
  color: var(--text-color-primary);
  background-color: var(--sub-background);
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
  }
}

.btn-refresh {
  align-self: center;
  grid-column: col 5 / col 6;
  span {
    display: inline-block;
    position: relative;
    transition: 0.5s;
  }
  &:hover {
    animation: rainbow 2s infinite;
  }
}

.btn-search {
  border-bottom-left-radius: 3px;
  border-top-left-radius: 3px;
  margin-left: -15px;
  transition: color 0.1s;
  &:hover {
    color: white;
  }
  &:hover span {
    padding-right: 10px;
  }
  span {
    display: inline-block;
    position: relative;
    transition: 0.5s;
  }
  span:after {
    content: "\00bb";
    position: absolute;
    opacity: 0;
    top: 0;
    right: -20px;
    transition: 0.5s;
  }
  &:hover span:after {
    opacity: 1;
    right: 0;
  }
}

.btn-unit-change {
  grid-column: col 4 / col 5;
  border: solid 1px var(--main-background);
  width: fit-content;
  padding: 5px;
  background-color: var(--sub-background);
  .selected {
    background-color: var(--main-background);
  }
}

.btn-unit {
  padding: 0 5px;
  &:hover {
    cursor: pointer;
  }
  .selected {
    background-color: white;
  }
}

.btn-metric,
.btn-imperial {
  padding: 6px;
  transition: all 0.3s;
  &:hover {
    color: orangered;
  }
}

.btn-metric {
  margin-left: -5px;
}

.btn-imperial {
  margin-right: -5px;
}

@keyframes rainbow {
  0% {
    color: white;
  }
  10% {
    color: yellow;
  }
  20% {
    color: orange;
  }
  30% {
    color: orangered;
  }
  40% {
    color: red;
  }
  45% {
    color: maroon;
  }
  50% {
    color: purple;
  }
  55% {
    color: blue;
  }
  70% {
    color: cyan;
  }
  80% {
    color: green;
  }
  90% {
    color: greenyellow;
  }
  100% {
    color: white;
  }
}
</style>
