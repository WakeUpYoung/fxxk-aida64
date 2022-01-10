<template>
  <div class="toast">
    {{info}}
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    info: {type: String},
    show: {type: Boolean, default: false}
  }
}
</script>

<style scoped>
.toast {
  width: 100vw;
  background-color: aquamarine;
  color: whitesmoke;
}
</style>
