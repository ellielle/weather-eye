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
    <current-weather></current-weather>
    <weekly-forecast></weekly-forecast>

    <!--    <ul class="weather" v-if="weatherChecked">-->
    <!--      <li v-for="data in weatherData">-->

    <!--      </li>-->
    <!--    </ul>-->
  </div>
</template>

<script>
import CurrentWeather from "../components/CurrentWeather";
import WeeklyForecast from "../components/WeeklyForecast";
import DailyForecast from "../components/DailyForecast";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Home",

  components: {
    CurrentWeather,
    WeeklyForecast,
    DailyForecast
  },

  // TODO unit toggle
  // TODO refresh weather button
  // TODO throw up error message if query comes back invalid

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
    ]),
    currentWeatherData() {},
    isUserLocationSet() {
      return (
        this.getUserCoordinates.lat !== null &&
        this.getUserCoordinates.lon !== null
      );
    },
  },

  watch: {
    getWeatherData() {
      // TODO watching for changes in gotten data, trigger parsing of data here
      this.parseWeatherData();
    },
  },

  methods: {
    ...mapActions(["setUserCoordinates", "setWeatherData", "setDailyForecast"]),

    async getWeatherDataFromAPI(args = { type: "coords" }) {
      let fullAPIURL = ``;
      // ! args is a reminder to build this method to work for both lat/lon and city / zip search
      if (args.type === "coords") {
        fullAPIURL = `${this.getOpenWeatherAPIEndpoint}/onecall?lat=${this.getUserCoordinates.lat}&lon=${this.getUserCoordinates.lon}&appid=${process.env.VUE_APP_OPENWEATHER_API_KEY}&units=${this.getUserOptions.units}`;
      } else if (args.type === "zip") {
        fullAPIURL = `${this.getOpenWeatherAPIEndpoint}/weather?zip=${args.data}&appid=${process.env.VUE_APP_OPENWEATHER_API_KEY}&cnt=7&units=${this.getUserOptions.units}`;
      } else if (args.type === "city&state") {
        fullAPIURL = `${this.getOpenWeatherAPIEndpoint}/weather?q=${args.data}&appid=${process.env.VUE_APP_OPENWEATHER_API_KEY}&cnt=7&units=${this.getUserOptions.units}`;
      }
      this.searchType = args.type;
      try {
        const response = await fetch(`${fullAPIURL}`, { mode: "cors" });
        const data = await response.json();
        this.setWeatherData(data);
        this.parseWeatherData();
      } catch (error) {
        this.setWeatherData({});
        this.setErrorMessage(error);
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
      this.parseCurrentWeatherComponentData();
    },

    parseCurrentWeatherComponentData() {
      // This method formats data for CurrentWeather component regardless of origin API call
    },

    parseDailyForecast() {
      if (this.searchType === "coords") {
        this.setDailyForecast({
          type: "coords",
          data: {
            forecast: this.getWeatherData.daily[0],
            coords: {
              lat: this.getWeatherData.lat,
              lon: this.getWeatherData.lon,
            },
            description: this.getWeatherData.daily[0].weather[0].description,
            wind: this.getWeatherData.current.wind_speed
          },
        });
      } else if (
        this.searchType === "zip" ||
        this.searchType === "city&state"
      ) {
        this.setDailyForecast({
          type: "normal",
          data: {
            forecast: this.getWeatherData.main,
            coords: this.getWeatherData.coord,
            description: this.getWeatherData.weather[0].description,
            wind: this.getWeatherData.wind.speed
          },
        });
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

    // !remove
    testWeathertest() {
      this.getWeatherDataFromAPI();
    },
  },

  created() {
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
</style>