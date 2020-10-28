<template>
  <div class="container-main">
    <div>
      Make note for: ZIP Code or City & Country code OR link to find open
      weather code via their search engine
    </div>
    <hr />
    <div id="search-bar">
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
      <button @click="testWeathertest">TEST WEATHER BUTTON</button>
      <button v-if="!isUserLocationSet">TODO NO LOCATION BUTTON</button>
    </div>
    <current-weather v-if="currentWeatherAvailable"></current-weather>
    <weekly-forecast v-if="weeklyForecastAvailable"></weekly-forecast>
    <daily-forecast v-if="dailyForecastAvailable"></daily-forecast>
    <!-- <div class="btn-unit-change btn-metric">
      Metric: °C, m/s
    </div>
    <div class="btn-unit-change btn-imperial">
      Imperial: °F, mph
    </div> -->
    <div class="btn-unit-change">
      <span class="btn-unit btn-metric" @click="changeUnits('metric')"
        >Metric: °C, m/s</span
      >
      <span class="btn-unit btn-imperial" @click="changeUnits('imperial')"
        >Imperial: °F, mph</span
      >
    </div>
    <!--    <ul class="weather" v-if="weatherChecked">-->
    <!--      <li v-for="data in weatherData">-->

    <!--      </li>-->
    <!--    </ul>-->
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
  // TODO unit toggle
  // TODO refresh weather button
  // TODO throw up error message if query comes back invalid
  // TODO store previous URL + interpolated values into previousQuery object in store
  // TODO run previousQuery when units are changed to update data

  // !
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
      this.searchType = args.type;
      this.setPreviousQuery(fullAPIURL);
      try {
        const response = await fetch(`${fullAPIURL}`, { mode: "cors" });
        const data = await response.json();
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
      this.parseDailyForecast();
      this.parseCurrentWeather();
      this.parseWeeklyForecast();
    },

    parseCurrentWeather() {
      // This method formats data for CurrentWeather component regardless of origin API call
      if (this.searchType === "coords") {
        this.setCurrentWeather({
          temp: this.getWeatherData.current.temp,
          humidity: this.getWeatherData.current.humidity,
          feels_like: this.getWeatherData.current.feels_like,
          description: this.getWeatherData.current.weather[0].description,
          wind: this.getWeatherData.current.wind_speed,
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
        });
      }
    },

    parseDailyForecast() {
      if (this.searchType === "coords") {
        this.setDailyForecast({
          temp_high: this.getWeatherData.daily[0].temp.max,
          temp_low: this.getWeatherData.daily[0].temp.min,
          coords: {
            lat: this.getWeatherData.lat,
            lon: this.getWeatherData.lon,
          },
          description: this.getWeatherData.daily[0].weather[0].description,
          wind: this.getWeatherData.daily[0].wind_speed,
        });
      } else if (
        this.searchType === "zip" ||
        this.searchType === "city&state"
      ) {
        this.setDailyForecast({
          temp_high: this.getWeatherData.main.temp_max,
          temp_low: this.getWeatherData.main.temp_min,
          coords: this.getWeatherData.coord,
          description: this.getWeatherData.weather[0].description,
          wind: this.getWeatherData.wind.speed,
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
        this.setUserOptions({ units: newUnit });
        localStorage.setItem("units", newUnit);
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
      }
    },

    setSelectedOption(userUnits) {
      const selectedButton = document.querySelector(`.btn-${userUnits}`);
      selectedButton.classList.add("selected");
    },

    // !remove
    testWeathertest() {
      this.getWeatherDataFromAPI();
    },
  },

  created() {
    this.getStoredUserOptions();
  },
  mounted() {
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

#search-bar {
  background-color: var(--main-background);
  width: 100%;
}

.btn-search {
  font-size: 1rem;
  height: 30px;
  width: 85px;
  border: 3px solid var(--sub-background);
  border-radius: 3px;
  color: white;
  background-color: var(--sub-background);
  margin-left: -15px;
  transition: all 0.5s;
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
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
  border: solid 1px white;
  border-radius: 10px;
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

.btn-metric {
  padding: 5px;
  margin-left: -5px;
  border-right: solid 1px white;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.btn-imperial {
  padding: 5px;
  margin-right: -5px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
