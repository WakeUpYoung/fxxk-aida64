<template>
  <div class="background">
    <div class="container pt-3 w-100 overflow-auto memo-container">
      <div v-if="memoList.length <= 0" class="text-white">
        List is empty
      </div>
      <div v-else class="">
        <div v-for="(data, index) of memoList">
          <Memo @show-toast="showToast" :title="data.title" :content="data.content" :index="index"></Memo>
        </div>
      </div>
    </div>

    <button id="add-btn" type="button" class="btn btn-lg rounded-circle" @click="onClickAdd">
      <span class="material-icons" style="font-size: 2rem">add</span>
    </button>

    <div class="fixed-bottom w-100 d-flex justify-content-center align-items-center">
      <transition name="toast">
          <span v-show="toastShow" class="text-white mb-4 toast-content">{{toastMsg}}</span>
      </transition>
    </div>

  </div>
</template>

<script>
import Memo from "../Memo";

export default {
  name: 'MainPage',
  components: {Memo},
  computed: {
    memoList: vm => vm.$store.state.MemoList.dataList
  },
  data() {
    return {
      toastShow: false,
      toastMsg: ''
    }
  },
  methods: {
    onClickAdd() {
      let dataList = this.memoList.slice()
      dataList.push({title: 'New Title', content: 'New content'})
      this.$store.commit('setDataList', dataList)
    },
    showToast(msgStr) {
      this.toastShow = true
      this.toastMsg = msgStr
    }
  },
  watch: {
    toastShow: function(newVal, oldVal) {
      let vm = this
      if (newVal) {
        setTimeout(function () {
          vm.toastShow = false
        }, 800)
      }
    }
  }
}
</script>

<style lang="css" scoped>
.background {
  background-image: url("https://bing.ioliu.cn/v1/rand?h=700&w=1080");
}
.memo-container {
  height: 90vh;
}
#add-btn {
  position: fixed;
  right:2rem;
  bottom:2.5rem;
  z-index:1030;
  background-color: #425B67;
  color: whitesmoke;
  box-shadow: 0.5rem 0.5rem 1rem rgba(66, 91, 103, 0.5) !important;
}
.toast-content {
  background-color: #1BBC9B;
  padding: 1rem 3rem;
  border-radius: 20px;
  box-shadow: 1rem .5rem 50px #12836e;
}

::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background-color: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #1f5c5d;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #2c8486;
}

.toast-enter-active {
  animation: bounce-in .5s;
}
.toast-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

</style>
