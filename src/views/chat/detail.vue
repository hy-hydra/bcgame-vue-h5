<!-- //主文件，对wxChat的用法做示例 -->

<template>
  <wxChat :data="wxChatData" :showShade="false" :getUpperData="getUpperData" :getUnderData="getUnderData"
    :ownerAvatarUrl="ownerAvatarUrl" :contactAvatarUrl="contactAvatarUrl" :width="width" @close="close">
  </wxChat>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, } from 'vue'
import wxChat from './components/wxChat.vue'


export default defineComponent({
  components: { wxChat },
  props: {
  },
  setup(props, context) {
    const data = reactive({
      upperTimes: 0,
      underTimes: 0,
      upperId: 0,
      underId: 6,
      width: window.screen.width,
      ownerAvatarUrl: new URL('../../assets/chat/avatar1.png', import.meta.url).href,
      contactAvatarUrl: new URL('../../assets/chat/avatar2.png', import.meta.url).href,
      wxChatData: []
      // wxChatData: [{
      //   direction: 2,
      //   id: 1,
      //   type: 1,
      //   content: '你好!![呲牙]',
      //   ctime: new Date().toLocaleString()
      // },
      // {
      //   direction: 1,
      //   id: 2,
      //   type: 1,
      //   content: '你也好。[害羞]',
      //   ctime: new Date().toLocaleString()
      // },
      // {
      //   direction: 2,
      //   id: 3,
      //   type: 1,
      //   content: '这是我的简历头像：',
      //   ctime: new Date().toLocaleString()
      // },
      // {
      //   direction: 2,
      //   id: 4,
      //   type: 2,
      //   content: new URL('../../assets/chat/wyz.jpg', import.meta.url).href,
      //   ctime: new Date().toLocaleString()
      // },
      // {
      //   direction: 1,
      //   id: 5,
      //   type: 1,
      //   content: '你开心就好。[微笑]',
      //   ctime: new Date().toLocaleString()
      // }]
    })

    const initWidth = () => {
      var ua = navigator.userAgent;
      var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
        isAndroid = ua.match(/(Android)\s+([\d.]+)/),
        isMobile = isIphone || isAndroid;
      //非移动端设置400px宽度，移动端是100%
      if (!isMobile) {
        data.width = 400
      }
    }
    initWidth();

    //向上滚动加载数据
    const getUpperData = () => {
      // 这里为模拟异步加载数据
      // 实际上你可能要这么写:
      // return axios.get('xxx').then(function(result){
      //     return result;  //result的格式需要类似下面resolve里面的数组
      // })
      return new Promise(function (resolve) {
        setTimeout(function () {
          //模拟加载完毕
          if (data.upperTimes > 3) {
            return resolve([]);
          }

          //加载数据
          resolve([{
            direction: 2,
            id: data.upperId - 1,
            type: 1,
            content: '向上滚动加载第 ' + data.upperTimes + ' 条！',
            ctime: new Date().toLocaleString()
          },
          {
            direction: 1,
            id: data.upperId - 2,
            type: 1,
            content: '向上滚动加载第 ' + data.upperTimes + ' 条！',
            ctime: new Date().toLocaleString()
          }]

          )
        }, 1000);
        data.upperId = data.upperId + 2;
        data.upperTimes++;
      })
    }

    const getUnderData = () => {
      //意义同getUpperData()
      return new Promise(function (resolve) {
        setTimeout(function () {
          //模拟加载完毕
          if (data.underTimes > 3) {
            return resolve([]);
          }

          //加载数据
          resolve(
            [{
              direction: 1,
              id: data.underId + 1,
              type: 1,
              content: '向下滚动加载第 ' + data.underTimes + ' 条！',
              ctime: new Date().toLocaleString()
            },
            {
              direction: 2,
              id: data.underId + 2,
              type: 1,
              content: '向下滚动加载第 ' + data.underTimes + ' 条！',
              ctime: new Date().toLocaleString()
            }]
          )
        }, 1000);

        data.underId = data.underId + 2;
        data.underTimes++;
      })
    }

    return {
      ...toRefs(data),
      initWidth,
      getUnderData,
      getUpperData,
      close,
    }
  },
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
}
</style>
