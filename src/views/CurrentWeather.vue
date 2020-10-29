<template>
  <div class="container-current-weather">
    <p class="date-time">{{getCurrentDateTime}}</p>
    <p class="city-name">{{ getCityOrCoords }}</p>
    <img :src="currentWeather.icon" alt="Weather Icon" />
    <p class="current-temp">
      {{ Math.round(Number(currentWeather.temp))
      }}{{ this.getWeatherUnits.temp }}
    </p>
    <div class="humidity">{{ currentWeather.humidity }}%</div>
    <div class="feels-like">
      {{ Math.round(Number(currentWeather.feels_like))
      }}{{ this.getWeatherUnits.temp }}
    </div>
    <div class="description">{{ currentWeather.description }}</div>
    <div class="wind">
      {{ currentWeather.wind }}{{ this.getWeatherUnits.wind }}
    </div>
    <div class="icon">
      
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "CurrentWeather",

  props: {
    currentWeather: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters(["getWeatherUnits", "getCurrentDateTime", "getCurrentCity"]),
    getCityOrCoords() {
      return this.getCurrentCity || "Current Weather:";
    }
  },
};
</script>
<style lang="scss" scoped>
</style>