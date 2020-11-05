<template>
  <div class="container-weekly-forecast">
    <p class="weekly-forecast-text">Weekly Forecast</p>
    <div>
      <div v-for="(day, index) in weeklyForecast" :key="day.dt">
        <weekly-forecast-tabs :forecastedDay="day" :dayOfWeek="days[index]"></weekly-forecast-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import WeeklyForecastTabs from "../components/WeeklyForecastTabs";
import { mapGetters } from "vuex";
export default {
  name: "WeeklyForecast",

  components: {
    WeeklyForecastTabs
  },

  props: {
    weeklyForecast: {
      type: Array,
      required: true,
    },
  },

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
p {
  margin: inherit 0 0 0;
}

.weekly-forecast-text {
  color: orangered;
  font-size: 15px;
}
</style>