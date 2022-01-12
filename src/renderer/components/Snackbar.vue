<template>
  <transition enter-active-class="animate__backInUp" leave-active-class="animate__backOutDown"
    @after-enter="afterEnter">
    <div v-if="value"
         class="alert-container position-absolute mb-2 d-flex justify-content-center animate__animated animate__fast">
      <div class="alert-content shadow">
        <b-alert class="m-0" show :variant="alertVariant">
          {{alertMessage}}
        </b-alert>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Snackbar',
  props: {
    value: Boolean,
    alertVariant: {
      validator: (value) => ['primary', 'success', 'warning', 'danger'].indexOf(value) !== -1,
      default: 'primary'
    },
    alertMessage: {type: String, required: true},
    during: {type: Number, default: 2000}
  },
  data() {
    return {
    }
  },
  watch: {

  },
  methods: {
    afterEnter() {
      setTimeout(() => {
        this.$emit('input', false)
      }, this.during)
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.alert-content {
  min-width: 30%
}
.alert-container {
  width: 100%;
  bottom: 0;
  text-align: center;
}
</style>
