<template>
  <div class="container-weekly-forecast">
    <h6>WEEKLY FORECAST</h6>
    <div>
      <div v-for="day in weeklyForecast" :key="day.dt">
        <img
          class="icon"
          :src="day.icon"
          alt="Weather Icon"
          crossorigin="anonymous"
        />
        <div class="temp-high">{{ Math.round(Number(day.temp_high)) }}</div>
        <div class="temp-low">{{ Math.round(Number(day.temp_low)) }}</div>
        <div class="humidity">{{ day.humidity }}</div>
        <div class="description">{{ day.description }}</div>
        <div class="wind">{{ day.wind }}</div>
      </div>
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

  // ! TODO set up collapsable tabs for each day, collapsed text should be weekday, high(?) and icon

  data() {
    return {
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    };
  },

  computed: {
    ...mapGetters(["getWeatherUnits"]),
  },

  methods: {
    setupCurrentWeek() {
      const today = new Date().getDay();
      let newWeek = this.days.splice(today + 1);
      // Use a Set to remove duplicate items upon concatination
      this.days = [...new Set(newWeek.concat(...this.days))];
    },
  },

  mounted() {
    this.setupCurrentWeek();
  }
};
</script>
<style lang="scss" scoped>
</style>