<template>
  <div class="container-daily-forecast">
    <p class="container-header">Forecast for {{}}</p>
    <img class="icon" :src="forecast.icon" alt="Weather Icon" />
    <div class="temp-high">
      High: {{ Math.round(Number(forecast.temp_high))
      }}{{ this.getWeatherUnits.temp }}
    </div>
    <div class="temp-low">
      Low: {{ Math.round(Number(forecast.temp_low))
      }}{{ this.getWeatherUnits.temp }}
    </div>
    <div class="humidity" v-if="forecast.humidity">{{ forecast.humidity }}</div>
    <div class="description">{{ capitalizeDescription }}.</div>
    <div class="wind">Wind: {{ forecast.wind }}{{ this.getWeatherUnits.wind }}</div>
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
    capitalizeDescription() {
      return (
        this.forecast.description.charAt(0).toUpperCase() +
        this.forecast.description.slice(1)
      );
    },
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
}

.icon {
  grid-area: row 2 / col / row 3 / col;
  justify-self: center;
  margin: -25px 0 0 -70px;
}

.temp-high,
.description {
  justify-self: right;
  margin-right: 3px;
}

.temp-low,
.wind {
  justify-self: left;
  margin-left: 3px;
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

.humidity {
  grid-area: row 3 / col / row 4 / col;
}
</style>