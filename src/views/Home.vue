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
        @mouseover.self="showTooltip($event, 'Save as default location')"
        @mouseleave="removeTooltip"
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
        @mouseover.self="
          showTooltip($event, 'Get weather for default location')
        "
        @mouseleave="removeTooltip"
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
      <button
        class="btn-refresh"
        @click="refreshWeather"
        @mouseover="showTooltip($event, 'Refresh weather')"
        @mouseleave="removeTooltip"
      >
        <span>Refresh</span>
      </button>
    </div>
    <div v-if="storageAvailable">
      <div
        class="container-components"
        :style="
          weeklyForecastAvailable
            ? weatherStyles.weekly
            : weatherStyles.noWeekly
        "
      >
        <transition name="slide-in-left" mode="out-in">
          <current-weather
            class="current-weather"
            v-if="currentWeatherAvailable"
            :current-weather="getCurrentWeatherData"
          ></current-weather>
        </transition>
        <transition name="slide-in-left" mode="out-in">
          <daily-forecast
            class="daily-forecast"
            v-if="dailyForecastAvailable"
            :forecast="getDailyForecastData"
          ></daily-forecast>
        </transition>
        <transition name="slide-in-right" mode="out-in">
          <weekly-forecast
            class="weekly-forecast"
            v-if="weeklyForecastAvailable"
            :weekly-forecast="getWeeklyForecastData"
            :key="getWeeklyForecastData[0].temp_high"
          ></weekly-forecast>
        </transition>
        <transition name="fade" mode="out-in">
          <popup-component class="popup-component" v-if="popupMessage !== ''">
            {{ popupMessage }}
          </popup-component>
        </transition>
      </div>
    </div>
    <div v-else>
      <p class="no-storage">
        This website doesn't support your browser. You should feel bad.
      </p>
    </div>
    <transition name="fade" mode="in-out">
      <app-tooltip class="app-tooltip">
        {{ tooltipMessage }}
      </app-tooltip>
    </transition>
  </div>
</template>

<script>
import CurrentWeather from "./CurrentWeather";
import WeeklyForecast from "./WeeklyForecast";
import DailyForecast from "./DailyForecast";
import PopupComponent from "../components/PopupComponent";
import Tooltip from "../components/Tooltip";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Home",

  components: {
    CurrentWeather,
    WeeklyForecast,
    DailyForecast,
    PopupComponent,
    appTooltip: Tooltip,
  },

  data() {
    return {
      userInput: "",
      tooltipMessage: null,
      storageAvailable: false,
      geoDataAvailable: false,
      popupMessage: "",
      errorMessage: null,
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
      "getCurrentSearchCoordinates",
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
      "setCurrentSearchCoordinates",
    ]),

    async getWeatherDataFromAPI(args = { type: "coords" }) {
      let fullAPIURL = ``;
      switch (args.type) {
        case "refresh":
          fullAPIURL = `${this.getOpenWeatherAPIEndpoint}/onecall?lat=${this.getCurrentSearchCoordinates.lat}&lon=${this.getCurrentSearchCoordinates.lon}&appid=${process.env.VUE_APP_OPENWEATHER_API_KEY}&units=${this.getUserOptions.units}&exclude=minutely,hourly,alerts`;
          break;
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
        args.type !== "url" && args.type !== "refresh"
          ? args.type
          : this.getPreviousSearchType();
      this.setPreviousQuery(fullAPIURL);
      try {
        const response = await fetch(`${fullAPIURL}`, { mode: "cors" });
        const data = await response.json();
        this.setCurrentDateTime(this.getFormattedDateTime());
        this.setWeatherData(data);
        this.parseWeatherData();
        this.setErrorMessage(null);
      } catch (error) {
        this.setWeatherData({});
        this.setErrorMessage("Invalid Query.");
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
      } else {
        this.setErrorMessage(
          "Invalid Search. Please use ZIP code or the City + Country Code. (ex. New York, US)"
        );
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
      return `https://openweathermap.org/img/wn/${icon}@2x.png`;
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
        this.setCurrentSearchCoordinates({
          lat: this.getWeatherData.lat,
          lon: this.getWeatherData.lon,
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
        this.setCurrentSearchCoordinates({
          lat: this.getWeatherData.coord.lat,
          lon: this.getWeatherData.coord.lon,
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
      }
    },

    setErrorMessage(message) {
      this.errorMessage = message;
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
      if (
        this.getCurrentSearchCoordinates.lat !== null &&
        this.getCurrentSearchCoordinates.lon !== null
      ) {
        this.getWeatherDataFromAPI({ type: "refresh" });
      } else if (this.getPreviousQuery !== "") {
        this.getWeatherDataFromAPI({
          type: "url",
          data: this.getPreviousQuery,
        });
        this.showPopup("Weather Refreshed!");
      } else {
        this.showPopup("No Location to Refresh!");
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
        this.showPopup("Location Saved!");
      } catch (error) {
        // console.log(error);
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

    getWeatherForSavedLocation() {
      this.getWeatherDataFromAPI({ type: "coords" });
    },

    showPopup(message) {
      this.popupMessage = message;
      setTimeout(() => {
        this.popupMessage = "";
      }, 3000);
    },

    localStorageAvailable() {
      try {
        let test = "TESTING";
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch (error) {
        return false;
      }
    },

    showTooltip(event, tooltipMessage) {
      const tooltipWindow = document.querySelector(".app-tooltip");
      this.tooltipMessage = tooltipMessage;
      tooltipWindow.style.left = `${event.pageX + 10}px`;
      tooltipWindow.style.top = `${event.pageY + 20}px`;
    },

    removeTooltip() {
      const tooltipWindow = document.querySelector(".app-tooltip");
      this.tooltipMessage = null;
      tooltipWindow.style.left = "-300px";
      tooltipWindow.style.top = "-300px";
    },
  },

  mounted() {
    this.getStoredUserOptions();
    this.setSelectedOption(this.getUserOptions.units);
    this.getLocationWeather();
    this.focusSearchBar();
    this.storageAvailable = this.localStorageAvailable();
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
  padding-top: 30px;
}

.no-storage {
  color: orangered;
}

.app-tooltip {
  transition: opacity 0.3s ease;
}

// Component grid

.error-display {
  color: orangered;
}

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

.popup-component {
  position: absolute;
  bottom: 75px;
  right: 75px;
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

.search-bar a {
  width: fit-content;
  padding-top: 2px;
  align-self: center;
  margin-left: 5px;
}

.search-bar a img {
  grid-area: row / col / row / col;
  height: 24px;
  width: 24px;
  opacity: 65%;
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

// Vuejs animations
.slide-in-left-enter-active,
.slide-in-right-enter-active,
.slide-in-left-leave-active,
.slide-in-right-leave-active {
  transition: all 0.5s ease-in-out;
}

.fade-enter-active {
  transition: all 0.35s ease-in-out;
}

.fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-in-left-enter,
.slide-in-right-enter,
.fade-enter {
  opacity: 0;
}

.slide-in-left-enter-to,
.slide-in-right-enter-to,
.fade-enter-to {
  opacity: 1;
}

.slide-in-left-enter {
  transform: translateX(-200px);
}

.slide-in-left-enter-to {
  transform: translateX(0);
}

.slide-in-right-enter {
  transform: translateX(200px);
}

.slide-in-right-enter-to {
  transform: translateX(0);
}

.slide-in-left-leave-to {
  transform: translateX(-200px);
}

.slide-in-right-leave-to {
  transform: translateX(200px);
}

.fade-leave-to {
  opacity: 0;
}
</style>
