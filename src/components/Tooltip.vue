<template>
  <div class="tooltip">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Tooltip",
};
</script>

<style lang="scss" scoped>
.tooltip {
  position: absolute;
  left: -300px;
  top: -300px;
  font-size: 16px;
  transition: opacity 0.3s ease-in-out;
    background-image: var(--background-crosshatch);;
  border: var(--main-border);
  padding: 15px;
  width: fit-content;
}
</style>