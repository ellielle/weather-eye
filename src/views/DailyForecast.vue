<template>
  <div>
    <h6>DAILY FORECAST</h6>
    <div class="temp-high">{{forecast.temp_high}}{{this.getWeatherUnits.temp}}</div>
    <div class="temp-low">{{forecast.temp_low}}{{this.getWeatherUnits.temp}}</div>
    <div class="humidity">{{forecast.humidity}}% VALUE IS SET TO NULL</div>
    <div class="coordinates">{{forecast.coords}}</div>
    <div class="description">{{forecast.description}}</div>
    <div class="wind">{{forecast.wind}}{{this.getWeatherUnits.wind}}</div>
    <img :src="forecast.icon" alt="Weather Icon">
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "DailyForecast",

  props: {
    forecast: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters(["getWeatherUnits"]),
  },
};
</script>
<style lang="scss" scoped>
</style>