<template>
  <div>
    <h6>CURRENT WEATHER</h6>
    <div class="current-temp">{{ currentWeather.temp }}{{this.tempUnit}}</div>
    <div class="humidity">{{ currentWeather.humidity }}%</div>
    <div class="feels-like">{{ currentWeather.feels_like }}{{this.tempUnit}}</div>
    <div class="description">{{ currentWeather.description }}</div>
    <div class="wind">{{ currentWeather.wind }}{{this.windUnit}}</div>
    <div class="icon">
      <img :src="currentWeather.icon" alt="Weather Icon" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "CurrentWeather",

  data() {
    return {
      tempUnit: "",
      windUnit: "",
      units: {
        metric: {
          temp: " °C",
          wind: " m/s",
        },
        imperial: {
          temp: " °F",
          wind: " mph",
        }
      }
    };
  },

  props: {
    currentWeather: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters(["getUserOptions"]),
  },

  created() {
    if (this.getUserOptions.units === "imperial") {
      this.tempUnit = this.units.imperial.temp;
      this.windUnit = this.units.imperial.wind;
    } else if (this.getUserOptions.units === "metric") {
      this.tempUnit = this.units.metric.temp;
      this.windUnit = this.units.metric.wind;
    }
  },
};
</script>
<style lang="scss" scoped>
</style>