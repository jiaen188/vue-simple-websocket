<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import wsSend from './websocket.js'

export default {
  name: 'App',
  inject: ['eventBus'],
  mounted () {
    this.subscribeApi()
    this.eventBus.$on('employee.consumer.NationalityList', res => {
      console.log('监听到推送信息', res)
      alert('接收到后端推送接口')
    })
  },
  methods: {
    subscribeApi () {
      const param = {}
      wsSend('employee.consumer.NationalityList', param)
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
