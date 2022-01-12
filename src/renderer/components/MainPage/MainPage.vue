<template>
  <b-container id="main-page">
    <div class="h4 text-center mt-2">Tunnel Simulator</div>
    <b-button variant="success" @click="sendMsgModal=true">Send Tunnel Message >></b-button>

    <dashboard @showSnackbar="showSnackbar" class="mt-2"></dashboard>

    <b-modal v-model="sendMsgModal" title="Send tunnel message" ok-title="SEND" @ok="sendTunnelMessage">
      <b-form-group label="Tunnel Channel">
        <b-form-radio-group
            id="channel-group"
            v-model="tunnelChannel"
            :options="constant.tunnelChannels"
            name="channel-group"
        ></b-form-radio-group>
      </b-form-group>
      <b-form-group
          id="tunnel-msg-input"
          label="Message Body"
          label-for="msg-body">
        <b-form-input id="msg-body" v-model="tunnelMsg" trim></b-form-input>
      </b-form-group>
    </b-modal>

    <snackbar v-model="snackbarShow" :alert-message="alertMessage" :alertVariant="alertVariant"></snackbar>
  </b-container>
</template>

<script>
import Constant from '../../constant'
import Dashboard from "../Dashboard";
import Snackbar from "../Snackbar";

export default {
  name: 'MainPage',
  components: {Dashboard, Snackbar},
  data() {
    return {
      sendMsgModal: false,
      tunnelMsg: '',
      tunnelChannel: '',
      constant: Constant,

      snackbarShow: false,
      alertMessage: '',
      alertVariant: '',
    }
  },

  methods: {
    sendTunnelMessage() {
      console.log(this.tunnelChannel, this.tunnelMsg)
      if (!this.tunnelChannel || !this.tunnelMsg) {
        this.showSnackbar({
          alertMessage: 'Invalid request parameter!',
          alertVariant: 'danger'
        })
        return
      }
      this.$http
          .get(`http://${Constant.serverAddress}:${Constant.serverPort}/sendTunnelMessage/${this.tunnelChannel}/${this.tunnelMsg}`)
    },
    showSnackbar(data) {
      this.snackbarShow = true
      this.alertMessage = data.alertMessage
      this.alertVariant = data.alertVariant ? data.alertVariant : 'primary'
    },
  }

}
</script>

<style lang="css" scoped>
#main-page {
  overflow-x: hidden;
}
</style>
