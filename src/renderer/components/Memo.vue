<template>
  <div @click.self="onClickMemo" class="memo border border-2 border-secondary d-flex align-items-center none-selection mb-3">
    <div class="h5 m-0 col-8" @click.self="onClickMemo">
      <input ref="titleInput" v-show="editingTitle" type="text" v-model="title" @blur="modifyTitle" @keydown.enter="enterTitle"/>
      <span v-show="!editingTitle" class="editable" @click="onClickTitle">{{title}}</span>
    </div>
    <div class="col-4 text-nowrap text-truncate" @click.self="onClickMemo">
      <input ref="contentInput" v-show="editingContent" type="text" v-model="content" @blur="modifyContent" @keydown.enter="enterContent" />
      <span v-show="!editingContent" class="editable" @click="onClickContent">{{content}}</span>
    </div>
    <div class="float-end remove cursor-pointer" @click="onClickRemove">
      <span class="material-icons">remove_circle_outline</span>
    </div>
  </div>
</template>

<script>
import {clipboard } from 'electron'

export default {
  name: 'Memo',
  props: {
    title: {type: String, required: true},
    content: {type: String, required: true},
    index: {type: Number, required: true}
  },
  data() {
    return {
      editingTitle: false,
      editingContent: false,
    }
  },
  methods: {
    onClickTitle() {
      this.editingTitle = true
      this.$nextTick(function () {
        let inputDom = this.$refs.titleInput
        inputDom.focus()
        inputDom.select()
      })
    },
    modifyTitle() {
      this.editingTitle = false
      this.modify()
    },
    onClickContent() {
      this.editingContent = true
      this.$nextTick(function () {
        let inputDom = this.$refs.contentInput
        inputDom.focus()
        inputDom.select()
      })
    },
    modifyContent() {
      this.editingContent = false
      this.modify()
    },
    enterTitle() {
      this.$refs.titleInput.blur()
    },
    enterContent() {
      this.$refs.contentInput.blur()
    },
    modify() {
      let memoList = this.$store.state.MemoList.dataList.slice()
      memoList.splice(this.index, 1, {
        title: this.title,
        content: this.content
      })
      this.$store.commit('setDataList', memoList)
    },
    onClickMemo() {
      console.log('hhhhhhhhh')
      clipboard.writeText(this.content)
      this.$emit('show-toast', 'Copied (๑>◡<๑) !')
    },
    onClickRemove() {
      let dataList = this.$store.state.MemoList.dataList.slice()
      dataList.splice(this.index, 1)
      this.$store.commit('setDataList', dataList)
    }
  }
}
</script>

<style scoped>
.memo {
  background-color: rgba(66, 91, 103, 0.5);
  color: whitesmoke;
  border-radius: 10px;
  padding: 1rem 2rem;
  cursor: default;
}

.editable:hover {
  background-color: rgba(224, 220, 220, 0.5);
  border: 1px solid #b9cfd9;
}

.remove:hover {
  color: #e35252;
}

</style>
