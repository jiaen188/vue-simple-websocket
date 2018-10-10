<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>{{time}}s后开始订阅接口</div>
    <div v-show="list.length">接收到后端推送接口</div>
    <div v-show="list.length">
      <h2>后端推送的内容</h2>
      <div v-for="(arr, index) in list" :key="index">
        <span v-for="(item, index) in arr" :key="index">{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import ws from './websocket.js'

export default {
  name: 'App',
  inject: ['eventBus'],
  data () {
    return {
      time: 5,
      list: []
    }
  },
  mounted () {
    let timer = setInterval(() => {
      if (this.time === 0) {
        this.subscribeApi()
        clearInterval(timer)
        return
      }
      this.time -= 1
    }, 1000)
    this.eventBus.$on('employee.consumer.NationalityList', res => {
      console.log('监听到推送信息', res)
      this.list = res.data.nationalityChoices
    })
  },
  methods: {
    subscribeApi () {
      console.log('订阅接口 employee.consumer.NationalityList')
      const param = {}
      ws.wsSend('employee.consumer.NationalityList', param)
    }
  },
  beforeDestroy () {
    this.eventBus.$off('employee.consumer.NationalityList')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
