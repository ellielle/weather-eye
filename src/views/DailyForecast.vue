<template>
  <div class="container-daily-forecast">
    <p class="container-header">Daily Forecast</p>
    <img class="icon" :src="forecast.icon" alt="Weather Icon" crossorigin="anonymous"/>
    <div class="temp-high">
      High: {{ Math.round(Number(forecast.temp_high))
      }}{{ this.getWeatherUnits.temp }}
    </div>
    <div class="temp-low">
      Low: {{ Math.round(Number(forecast.temp_low))
      }}{{ this.getWeatherUnits.temp }}
    </div>
    <div class="description">{{ this.forecast.description }}.</div>
    <div class="wind">
      Wind: {{ forecast.wind }}{{ this.getWeatherUnits.wind }}
    </div>
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
.container-daily-forecast {
  display: grid;
  grid: repeat(3, [row] minmax(40px, 1fr)) / repeat(2, [col] 1fr);
}

.container-header {
  color: orangered;
  grid-area: row / col / row / col 3;
  font-size: 15px;
}

.icon {
  grid-area: row / col / row / col 2;
  justify-self: center;
  margin-right: -45%;
}

.temp-high,
.description,
.temp-low,
.wind {
  align-self: center;
}

.temp-high,
.description {
  justify-self: right;
  margin-right: 2%;
}

.temp-low,
.wind {
  justify-self: left;
  margin-left: 2%;
}

.temp-high {
  grid-area: row 2 / col / row 3 / col 2;
}

.temp-low {
  grid-area: row 2 / col 2 / row 3 / col 3;
}

.description {
  grid-area: row 3 / col / row 4 / col 2;
}

.wind {
  grid-area: row 3 / col 2 / row 4 / col 3;
}
</style>