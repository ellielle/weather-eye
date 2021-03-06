<template>
  <div class="container-current-weather">
    <p class="date-time">{{ getCurrentDateTime }}</p>
    <p class="city-name">{{ getCityOrCoords }}</p>
    <img class="icon" :src="currentWeather.icon" alt="Weather Icon" crossorigin="anonymous" />
    <p class="current-temp">
      {{ Math.round(Number(currentWeather.temp))
      }}{{ this.getWeatherUnits.temp }}
    </p>
    <div class="humidity">Humidity: {{ currentWeather.humidity }}%</div>
    <div class="feels-like">
      Feels like {{ Math.round(Number(currentWeather.feels_like))
      }}{{ this.getWeatherUnits.temp }}.
    </div>
    <div class="description">{{ currentWeather.description }}.</div>
    <div class="wind">
      Wind: {{ currentWeather.wind }}{{ this.getWeatherUnits.wind }}
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CurrentWeather",

  props: {
    currentWeather: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters([
      "getWeatherUnits",
      "getCurrentDateTime",
      "getCurrentCity",
      "getUserCoordinates",
      "getLocationIQAPIEndpoint",
    ]),
    getCityOrCoords() {
      return this.getCurrentCity || this.loadCityFromStorage();
    },
  },

  watch: {
    currentWeather: "getCityWithCoords"
  },

  methods: {
    ...mapActions(["setCurrentCity"]),
    async getCityWithCoords() {
      if (
        this.currentWeather.coords.lat !== null &&
        this.currentWeather.coords.lon !== null
      ) {
        try {
          const fullAPIURL = `${this.getLocationIQAPIEndpoint}?key=${process.env.VUE_APP_LOCATION_IQ_API_KEY}&lat=${this.currentWeather.coords.lat}&lon=${this.currentWeather.coords.lon}&format=json`;
          const response = await fetch(`${fullAPIURL}`, { mode: "cors" });
          const data = await response.json();
          if (data.address.state) {}
          this.setCurrentCity(`${data.address.city}, ${data.address.state}`)
        } catch (error) {
          this.setCurrentCity(null);
        }
      }
    },

    loadCityFromStorage() {
      return JSON.parse(localStorage.getItem("city"));
    }
  },
};
</script>
<style lang="scss" scoped>
p {
  margin: 0;
}

.container-current-weather {
  display: grid;
  grid: repeat(5, [row] minmax(50px, 1fr)) / repeat(2, [col] 1fr);
}

.date-time {
  color: orangered;
  grid-area: row / col / row / col 3;
  align-self: end;
  font-size: 15px;
}

.city-name {
  font-size: 25px;
  font-weight: 500;
  grid-area: row 2 / col / row 3 / col 3;
}

.icon,
.current-temp,
.feels-like,
.humidity,
.description,
.wind {
  align-self: center;
}

.icon {
  grid-area: row 3 / col / row 4 / col;
  justify-self: right;
}

.current-temp {
  grid-area: row 3 / col 2 / row 4 / col 3;
  justify-self: start;
}

.feels-like,
.humidity {
  justify-self: right;
  margin-right: 2%;
}

.description,
.wind {
  justify-self: left;
  margin-left: 2%;
}

.feels-like {
  grid-area: row 4 / col / row 5 / col 2;
}

.description {
  grid-area: row 4 / col 2 / row 5 / col 3;
}

.humidity {
  grid-area: row 5 / col / row 6 / col;
}

.wind {
  grid-area: row 5 / col 2 / row 6 / col 3;
}
</style>