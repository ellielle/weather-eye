<template>
  <div class="container-weekly-forecast">
    <h6>WEEKLY FORECAST</h6>
    <div>
      <ul v-for="day in weeklyForecast" :key="day.dt">
        <li>{{ Math.round(Number(day.temp_high)) }}</li>
        <li>{{ Math.round(Number(day.temp_low)) }}</li>
        <li>{{ day.humidity }}</li>
        <li>{{ day.description }}</li>
        <li>{{ day.wind }}</li>
        <img :src="day.icon" alt="Weather Icon" crossorigin="anonymous" />
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "WeeklyForecast",

  props: {
    weeklyForecast: {
      type: Array,
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