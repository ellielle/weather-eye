<template>
  <div class="container-current-weather">
    <p class="date-time">{{ getCurrentDateTime }}</p>
    <p class="city-name">{{ getCityOrCoords }}</p>
    <img class="icon" :src="currentWeather.icon" alt="Weather Icon" />
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
    },
  },
};
</script>
<style lang="scss" scoped>
p {
  margin: 0;
}

.container-current-weather {
  display: grid;
  grid: 1fr 1fr 2fr 1fr 1fr / 1fr;
}

.date-time {
  color: orangered;
  grid-area: 1 / 1 / 1 / 1;
}

.city-name {
  font-size: 25px;
  font-weight: 500;
  grid-area: 2 / 1 / 2 / 1;
}

.icon {
  grid-area: 3 / 1 / 3 / 1;
}

.current-temp {
  grid-area: 3 / 1 / 3 / 1;
}

.feels-like {
  
  grid-area: 4 / 1 / 4 / 1;
}

.description {
  grid-area: 4 / 1 / 4 / 1;
}

.himidity {
  grid-area: 5 / 1 / 5 / 1;
}

.wind {
  grid-area: 5 / 1 / 5 / 1;
}
</style>