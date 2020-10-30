<template>
  <div class="container-main">
    <div class="error-display">
      Make note for: ZIP Code or City & Country code OR link to find open
      weather code via their search engine
    </div>
    <div class="search-bar">
      <div class="container-btn-search">
        <input
          type="text"
          placeholder="ZIP Code or City & Country code"
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
    <div class="container-components">
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
      <!-- <weekly-forecast
      class="weekly-forecast"
      v-if="weeklyForecastAvailable"
      :weekly-forecast="getWeeklyForecastData"
    ></weekly-forecast> -->
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

  // TODO use parsed data and build out components now
  // TODO refresh weather button
  // TODO throw up error message if query comes back invalid
  // TODO animations / transitions (current and daily should slide in from left, weekly from right)
  // TODO get and set current location
  // ? TODO ? weather doesn't change metric properly when using zip/city&state and toggle

  data() {
    return {
      userInput: "",
      geoDataAvailable: false,
      errorMessage: "",
      searchType: "",
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
    ]),
    currentWeatherAvailable() {
      return Object.keys(this.getCurrentWeatherData).length > 0;
    },
    dailyForecastAvailable() {
      return Object.keys(this.getDailyForecastData).length > 0;
    },
    weeklyForecastAvailable() {
      return Object.keys(this.getWeeklyForecastData).length > 0;
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
      this.searchType =
        args.type !== "url" ? args.type : this.getPreviousSearchType();
      this.setPreviousQuery(fullAPIURL);
      try {
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

      // !remove
      console.log(this.getWeatherData);
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
          localStorage.setItem(
            "coords",
            JSON.stringify({
              lat: userLat,
              lon: userLon,
            })
          );
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
      if (this.userInput.match(/\d{5}/)) {
        this.getWeatherDataFromAPI({ type: "zip", data: this.userInput });

        // TODO come back here after refactoring the auto coordinates and state
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
        this.getPreviousSearchType();
      }
      this.parseDailyForecast();
      this.parseCurrentWeather();
      this.parseWeeklyForecast();
    },

    getPreviousSearchType() {
      const previousQuery = this.getPreviousQuery;
      console.log(this.getPreviousQuery);
      if (previousQuery.match(/onecall?/)) {
        console.log("onecall");
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
          description: this.getWeatherData.current.weather[0].description,
          wind: this.getWeatherData.current.wind_speed,
          icon: this.getIconURL(this.getWeatherData.current.weather[0].icon),
        });
      } else if (
        this.searchType === "zip" ||
        this.searchType === "city&state"
      ) {
        this.setCurrentWeather({
          temp: this.getWeatherData.main.temp,
          humidity: this.getWeatherData.main.humidity,
          feels_like: this.getWeatherData.main.feels_like,
          description: this.getWeatherData.weather[0].description,
          wind: this.getWeatherData.wind.speed,
          icon: this.getIconURL(this.getWeatherData.weather[0].icon),
        });
        if (!!this.getWeatherData.name) {
          this.setCurrentCity(
            `${this.getWeatherData.name}, ${this.getWeatherData.sys.country}`
          );
        }
      }
    },

    parseDailyForecast() {
      if (this.searchType === "coords") {
        this.setDailyForecast({
          temp_high: this.getWeatherData.daily[0].temp.max,
          temp_low: this.getWeatherData.daily[0].temp.min,
          humidity: this.getWeatherData.daily[0].humidity,
          coords: {
            lat: this.getWeatherData.lat,
            lon: this.getWeatherData.lon,
          },
          description: this.getWeatherData.daily[0].weather[0].description,
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
          coords: this.getWeatherData.coord,
          description: this.getWeatherData.weather[0].description,
          wind: this.getWeatherData.wind.speed,
          icon: this.getIconURL(this.getWeatherData.weather[0].icon),
        });
      }
    },

    parseWeeklyForecast() {
      const weeklyForecast = [];
      if (this.searchType === "coords") {
        this.getWeatherData.daily.forEach((forecast) => {
          weeklyForecast.push({
            temp_high: forecast.temp.max,
            temp_low: forecast.temp.min,
            humidity: forecast.humidity,
            description: forecast.weather[0].description,
            wind: forecast.wind_speed,
            icon: this.getIconURL(forecast.weather[0].icon),
          });
        });
      }
      if (weeklyForecast.length > 0) {
        this.setWeeklyForecast(weeklyForecast);
      }
    },

    saveUserLocation() {
      // TODO save user coords if they want to save the location as their main
      if (this.getWeatherData.coord) {
        this.setUserCoordinates({
          lat: this.getWeatherData.coord.lat,
          lon: this.getWeatherData.lon,
        });
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
        const currentCity = this.getUserOptions.cityName;
        this.setUserOptions({ units: newUnit, cityName: currentCity });
        localStorage.setItem("units", newUnit);
      }
    },

    getStoredUserOptions() {
      const currentCity = this.getUserOptions.cityName || null;
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
        this.setUserOptions({ units: "imperial", cityName: currentCity });
      } else {
        this.setUserOptions({
          units: localStorage.getItem("units"),
          cityName: currentCity,
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
      const baseMinutes = baseDateTime.getMinutes();
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
      }
      return `${baseHours}:${baseMinutes}${
        isMorning ? "am" : "pm"
      }, ${baseMonth} ${baseDay}`;
    },

    refreshWeather() {},
  },

  mounted() {
    this.getStoredUserOptions();
    this.setSelectedOption(this.getUserOptions.units);
  },
};
</script>

<style lang="scss" scoped>
input[type="text"] {
  font-size: 1rem;
  height: 20px;
  width: 300px;
  border: 3px solid white;
  border-radius: 3px;
}

.container-main {
  color: var(--text-color-primary);
}

.container-components {
  padding-top: 5px;
  display: grid;
  grid: 1fr 1fr / 1fr 1fr 2fr 2fr 1fr;
  grid-gap: 5px;
  // TODO will need to be dynamic grid to account for components not being rendered if no data for them
  // ! text-align: center in #app may need to be removed and formatted around
}

.search-bar {
  background-color: var(--sub-background);
  border: var(--main-border);
  width: var(--screen-width);
  display: grid;
  grid: 1fr / 1fr 1fr 2fr 1fr 1fr;
}

.container-btn-search {
  grid-area: 1 / 3 / 1 / 4;
}

.current-weather,
.daily-forecast,
.weekly-forecast {
  padding: 15px 0 0 0;
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
  grid-area: 1 / 4 / 3 / 5;
}

.btn-refresh,
.btn-search {
  font-size: 1rem;
  height: 30px;
  width: 85px;
  border: 1px solid var(--main-background);
  color: white;
  background-color: var(--sub-background);
  transition: all 0.5s;
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
  }
}

.btn-refresh {
  grid-area: 1 / 5 / 1 / 6;
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
  margin-left: -15px;
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
  grid-area: 1 / 4 / 1 / 5;
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
  transition: all 0.3s;
  &:hover {
    color: white;
  }
}

.btn-metric {
  padding: 6px;
  margin-left: -5px;
}

.btn-imperial {
  padding: 6px;
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
