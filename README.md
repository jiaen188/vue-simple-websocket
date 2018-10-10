# vue-simple-websocket

> 在vue中使用 websocket 通信的简单封装

## 使用
1. 在main.js中注入 eventBus事件总线
2. 复制 websocket.js 代码
3. 在vue组件中mounted生命周期中，订阅接口，以及接收推送，在适当时候（如beforeDestroyed）取消订阅

## 示例
```
import wsSend from './websocket.js'

export default {
  name: 'App',
  inject: ['eventBus'],
  mounted () {
    this.subscribeApi()
    this.eventBus.$on('employee.consumer.NationalityList', res => {
      console.log('监听到推送信息', res)
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
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
