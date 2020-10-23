<template>
  <div class="current-weather-container">{{currentWeatherData}}</div>
</template>

<script>
export default {
  name: "CurrentWeather",
  props: {
    currentWeatherData: {
      required: true,
      type: Object
    },
  },
};
</script>

<style lang="scss" scoped>
.current-weather-container {
  color: white;
}
</style>