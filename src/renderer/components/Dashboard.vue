<template>
  <b-container class="none-selection">
    <b-row class="info-content border border-dark" align-v="center" align-h="center">
      <b-col class="">
        <div>
          <b-icon icon="cpu" class="h1"></b-icon>
          <b-icon icon="thermometer-half" class="h1"></b-icon>
        </div>
        <div class="">{{ currentTemperature }} ℃</div>

      </b-col>
      <b-col>
        <b-icon icon="cpu" class="h1"></b-icon>
        <div>CPU: {{ cpuUsage }}%</div>
      </b-col>

    </b-row>
    <b-row class="info-content" align-v="center" align-h="center">
      <b-col>
        <div>Memory Usage: {{ memoryUsed }}%</div>
      </b-col>
      <b-col>
        <div class="digital-font h3">{{ currentTime }}</div>
        <div class="digital-font h4">{{ currentDayOfWeek }}</div>
      </b-col>


    </b-row>
  </b-container>
</template>

<script>
import Constant from '../constant'
import moment from 'moment'
import sys from 'systeminformation'
import Toolbar from "./Toolbar";

export default {
  name: "Dashboard",
  components: {Toolbar},
  data() {
    return {
      currentTemperature: 0,
      systemInfoInterval: null,

      memoryUsed: 0,
      cpuUsage: 0,

      currentTime: '',
      currentDayOfWeek: ''

    }
  },

  created() {
  },

  mounted() {
    let vm = this
    this.systemInfoInterval = setInterval(() => {

      sys.currentLoad()
        .then(data => {
        vm.cpuUsage = Math.floor(data.currentLoad)
      })

      sys.cpuTemperature()
        .then(data => {
          let tempArray = data.cores.filter(item => !isNaN(item))
          vm.currentTemperature = tempArray.reduce((n1, n2) => n1 + n2) / tempArray.length
        })
        .catch(error => {})

      sys.mem()
        .then(data => {
          vm.memoryUsed = Math.floor(data.used / data.total * 100)
      })

      let currentMoment = new moment()
      vm.currentTime = currentMoment.format('HH:mm')
      vm.currentDayOfWeek = currentMoment.format('ddd')

    }, 1000)

  },

  beforeDestroy() {
    if (this.systemInfoInterval) {
      clearInterval(this.systemInfoInterval)
    }
  }

}
</script>

<style scoped>
.info-content {
  background-color: rgba(97, 141, 162, 0.91);
  height: 50vh;
  text-align: center;
}

</style>
