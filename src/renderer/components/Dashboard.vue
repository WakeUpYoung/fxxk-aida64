<template>
  <b-container class="pl-2 pr-2" fluid="true">
    <div class="mb-2">
      <span class="font-weight-bold">TUNNEL</span>
      <b-input-group size="sm" class="mt-2 w-75">
        <b-input-group-prepend>
          <b-button @click="initWebsocket" variant="primary">Connect</b-button>
          <b-button @click="closeWebSocket" variant="danger">Disconnect</b-button>
          <b-button @click="clearLog" variant="warning">Clear Log</b-button>
        </b-input-group-prepend>
        <b-form-input debounce="500" placeholder="search" type="search" v-model="searchText"></b-form-input>
      </b-input-group>
    </div>

    <div id="dashboard-id" class="log-area">
      <div class="pt-1 pb-1" v-for="(logVO, index) in logVOList" v-show="searchingForShow(logVO)">
        <span class="mr-2 text-secondary">{{index + 1}}</span>
        <span class="time mr-1">{{ logVO.dateTime }}</span>
        <span :class="levelColor(logVO.level)">{{ logVO.level }}</span>&nbsp;:&nbsp;
        <span>{{ logVO.log }}</span>
      </div>
    </div>
  </b-container>
</template>

<script>
import Constant from '../constant'
export default {
  name: "Dashboard",
  data() {
    return {
      interval: null,
      poolInterval: null,
      socket: null,
      logVOList: [],
      heartbeatRate: 10000,
      maxLength: 5000,
      bufferList: [],
      searchText: '',
    }
  },

  methods: {
    searchingForShow(logVO) {
      if (this.searchText) {
        return logVO.log.indexOf(this.searchText) !== -1
      }
      return true
    },

    testWs() {
    },

    levelColor(level) {
      if (level === 'INFO') {
        return 'text-success'
      } else if (level === 'WARN') {
        return 'text-warning'
      } else if (level === 'ERROR') {
        return 'text-danger'
      } else {
        return ''
      }
    },
    // for testing
    addLog() {
      let vm = this
      let dashboard = document.getElementById('dashboard-id')
      for (let i = 0; i < 30; i++) {
        this.bufferList.push({
          log: 'aaa',
          dateTime: '000',
          level: 'WARN'
        })
      }
    },
    // web socket
    initWebsocket() {
      let vm = this
      this.closeWebSocket()
      this.socket = new WebSocket(`ws://${Constant.wsAddress}:${Constant.wsPort}/`)
      this.socket.onopen = (e) => {
        console.log('Websocket connected')
        this.$emit('showSnackbar', {alertMessage: 'Websocket connected', alertVariant: 'success'})
        this.interval = setInterval(() => {
          this.socket.send(Constant.heartBeat)
        }, this.heartbeatRate)
      }
      this.socket.onmessage = (e) => {
        console.log('received ', e.data)
        let data = e.data;
        if (data === Constant.heartBeat) {
          return
        }
        let jsonObj = JSON.parse(data)
        if (jsonObj) {
          if (jsonObj.log) {
            vm.bufferList.push(jsonObj)
          }
        }
      } // on message

      this.socket.onclose = (e) => {
        console.log('Socket closed')
        this.$emit('showSnackbar', {alertMessage: 'Websocket disconnected!', alertVariant: 'danger'})
        if (this.interval) {
          clearInterval(this.interval)
        }
      }
      this.socket.onerror = (e) => {
        console.error('error occurs:', e)
      }
    },

    closeWebSocket() {
      if (this.socket) {
        this.socket.close()
      }
    },
    clearLog() {
      this.logVOList = []
    },
    scrollBottom(el) {
      el.scrollTo({
        top: el.scrollHeight,
        left: 0,
        behavior: "smooth"
      })
    }
  },

  created() {
    this.initWebsocket()
  },

  mounted() {
    let vm = this
    setInterval(function () {
      let dashboard = document.getElementById('dashboard-id')
      if (vm.bufferList.length > 0) {
        if (vm.bufferList.length < 5000) {
          vm.logVOList.push(...vm.bufferList)
        } else {
          vm.logVOList = vm.bufferList.slice(-3000)
        }

        vm.scrollBottom(dashboard)
        vm.bufferList = []
      }
    }, 1000)
  },

  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval)
    }
    if (this.poolInterval) {
      clearInterval(this.poolInterval)
    }
  }
}
</script>

<style scoped>
.log-area {
  max-height: 60vh;
  width: 100%;
  overflow-y: auto;
  padding: .2rem .5rem;
}
.time {
  color: #8D5ED4;
}
</style>
