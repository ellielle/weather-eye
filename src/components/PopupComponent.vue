<template>
<div class="container-popup">
  <slot></slot>
</div>
  
</template>

<script>
export default {
  name: "PopupComponent"
}
</script>

<style lang="scss" scoped>
.container-popup {
  background-color: var(--sub-background);
  border: var(--main-border);
  padding: 15px;
  width: fit-content;
}
</style>