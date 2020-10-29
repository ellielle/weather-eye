<template>
  <div class="container-current-weather">
    <h6>CURRENT WEATHER</h6>
    <div class="current-temp">
      {{ currentWeather.temp }}{{ this.getWeatherUnits.temp }}
    </div>
    <div class="humidity">{{ currentWeather.humidity }}%</div>
    <div class="feels-like">
      {{ currentWeather.feels_like }}{{ this.getWeatherUnits.temp }}
    </div>
    <div class="description">{{ currentWeather.description }}</div>
    <div class="wind">
      {{ currentWeather.wind }}{{ this.getWeatherUnits.wind }}
    </div>
    <div class="icon">
      <img :src="currentWeather.icon" alt="Weather Icon" />
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
    ...mapGetters(["getWeatherUnits", "getCurrentDateTime"]),
  },
};
</script>
<style lang="scss" scoped>
</style>