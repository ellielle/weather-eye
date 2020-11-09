<template>
  <div class="container-weekly-forecast-tabs">
    <div
      class="container content-hidden"
      @click="toggleDataVisibility"
      :style="collapsed ? borderStyles.collapsed : borderStyles.open"
    >
      <img
        class="icon"
        :src="forecastedDay.icon"
        alt="Weather Icon"
        crossorigin="anonymous"
      />
      <div class="day-of-week">{{ dayOfWeek }}</div>
      <div class="temp-high">
        {{ Math.round(Number(forecastedDay.temp_high))
        }}{{ this.getWeatherUnits.temp }}
      </div>
    </div>
    <transition name="open" mode="out-in">
      <div class="container content-shown" v-if="!collapsed">
        <div class="dropdown-temp">High / Low:</div>
        <div class="dropdown-temp-high">
          {{ Math.round(Number(forecastedDay.temp_high))
          }}{{ this.getWeatherUnits.temp }}
        </div>
        <div class="dropdown-temp-low">
          {{ Math.round(Number(forecastedDay.temp_low))
          }}{{ this.getWeatherUnits.temp }}
        </div>
        <div class="humidity">Humidity: {{ forecastedDay.humidity }}%</div>
        <div class="description">{{ forecastedDay.description }}.</div>
        <div class="wind">
          Wind: {{ forecastedDay.wind }}{{ this.getWeatherUnits.wind }}
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "WeeklyForecastTabs",

  props: {
    forecastedDay: {
      type: Object,
      required: true,
    },
    dayOfWeek: {
      type: String,
      reuqired: true,
    },
  },

  data() {
    return {
      collapsed: true,
      borderStyles: {
        collapsed: "border-width: 1px",
        open: "border-width: 1px 1px 0 1px",
      },
    };
  },

  computed: {
    ...mapGetters(["getWeatherUnits"]),
  },

  methods: {
    toggleDataVisibility() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>
<style lang="scss" scoped>
.container-weekly-forecast-tabs {
  display: grid;
  justify-items: center;
}

.container.content-shown,
.container.content-hidden {
  display: grid;
  align-items: center;
  width: 70%;
  border-style: solid;
  border-color: var(--main-background);
}

.container.content-hidden {
  grid: [row] 1fr / repeat(3, [col] 1fr);
  cursor: pointer;
  border-width: 1px;
  -moz-user-select: none;
  -webkit-user-select: none;
}

.container.content-shown {
  border-width: 0 1px;
  font-size: 14px;
}

.icon {
  grid-column: col / col 2;
  justify-self: end;
}

.day-of-week {
  grid-column: col 2 / col 3;
}

.temp-high {
  grid-column: col 3 / col 4;
  justify-self: center;
}

.container.content-shown {
  grid: repeat(2, [row] 1fr) / repeat(3, [col] 1fr);
  row-gap: 20px;
  padding: 30px 0;
}

.dropdown-temp {
  justify-self: end;
}

.dropdown-temp-high {
  justify-self: center;
}

.dropdown-temp-low {
  justify-self: center;
}

.humidity {
  justify-self: end;
}

.description {
  justify-self: center;
}

.wind {
  justify-self: start;
}

.open-enter, .open-leave-to {
  opacity: 0;
}

.open-enter-to {
  opacity: 1;
}

.open-enter-active, .open-leave-active {
  transition: all 0.3s ease-in-out;
}
</style>