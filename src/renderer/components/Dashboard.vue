<template>
  <b-container class="none-selection">
    <b-row class="info-content" align-v="center" align-h="center">
      <b-col class="d-flex flex-column align-items-center justify-content-center">
        <b-icon icon="thermometer-half" class="h1" variant=""></b-icon>
        <div class="">
          {{ currentTemperature }} ℃
          <b-icon v-show="!currentTemperature" id="privilege-warning"
                  icon="exclamation-triangle-fill" variant="warning"></b-icon>
          <b-tooltip target="privilege-warning" placement="bottom">
            如果未使用管理员模式运行，温度可能为0
          </b-tooltip>
        </div>
      </b-col>
      <b-col class="d-flex align-items-center justify-content-center">
        <radial-progress-bar :diameter="progressbarWidth" :completed-steps="cpuUsage" :total-steps="100"
                             :animateSpeed="animateSpeed"
                             :inner-stroke-width="innerStrokeWidth" :stroke-width="strokeWidth"
                             :start-color="cpuUsageColor" :stop-color="cpuUsageColor"
                             :innerStrokeColor="innerStrokeColor">
          <b-icon icon="cpu" class="h1"></b-icon>
          <div>{{ cpuUsage }} %</div>
        </radial-progress-bar>

      </b-col>

    </b-row>
    <b-row class="info-content" align-v="center" align-h="center">
      <b-col class="d-flex align-items-center justify-content-center">
        <radial-progress-bar :diameter="progressbarWidth" :completed-steps="memoryUsed" :total-steps="100"
                             :animateSpeed="animateSpeed"
                             :inner-stroke-width="innerStrokeWidth" :stroke-width="strokeWidth"
                             :start-color="cpuUsageColor" :stop-color="cpuUsageColor"
                             :innerStrokeColor="innerStrokeColor">
          <div>Memory<br/>{{ memoryUsed }}%</div>
        </radial-progress-bar>
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
import RadialProgressBar from 'vue-radial-progress'

export default {
  name: "Dashboard",
  components: {RadialProgressBar},
  data() {
    return {
      animateSpeed: 300,
      progressbarWidth: 180,
      strokeWidth: 10,
      innerStrokeWidth: 16,
      innerStrokeColor: '#d16bdf',
      cpuUsageColor: '#2589ef',

      systemInfoInterval: null,

      currentTemperature: 0,
      cpuUsage: 0,
      memoryUsed: 0,

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
  height: 50vh;
  text-align: center;
  color: #dedcdc;
}

</style>
