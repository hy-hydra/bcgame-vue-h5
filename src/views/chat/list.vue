<template>
    <div class="login-container">
      <!-- <div v-for="item in userList" class="login-items" :key="item.id" @click="toDetail(item)" v-if="!isDetail">
        {{ item.id }}
      </div> -->
      <!-- <button @click="send">发送</button> -->
      <div style="color: #fff;text-align: center;font-size: 14px;height: 60px;line-height: 60px;" v-if="!userList.length" >暂无数据</div>
      <div class="cell" v-if="userList.length">
        <!-- {{ userList }} -->
        <ul>
            <li v-for="(item,index) in userList" :key="index" @click="toDetail(item)">
                <!-- <div class="left">
                    <van-image
                    fit="cover"
                    class="avatar"
                    src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201606%2F07%2F20160607213049_SAfEL.thumb.700_0.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661607257&t=85d7505d9327024d5bfd5350cf0c1259"
                    />
                </div> -->
                
                <div class="right">
                    <div class="top">
                    <span>{{ item.name }} </span>
                    <span></span>
                    <span>{{ item.updatedTime }}</span>
                    </div>
                    <div class="bottom">{{ item.des }}</div>
                </div>
            </li>
        </ul>
      </div>
      <!-- <div class="access-layout__nav relative w-[100%]" v-if="isDetail" style="z-index: 1000; text-align: end;right: 12px;top: 10px">
        <van-icon name="cross" color="#333" @click="isDetail = false"/>
      </div> -->
      <!-- <div style="width: 100%;height: 100%;" v-if="isDetail">
        <Detail :detailData="detailData" @close="close"/>
      </div> -->
    </div>
  </template>
  
<script lang="ts">
import { defineComponent, ref  } from 'vue'
import Detail from './detail.vue'
// import { useLoginStore } from '@/stores/login'
import { chatRoomList } from '../../api/chat'
// import { createWebSocket } from "./composables/websocket";
import { useRouter } from "vue-router"

export default defineComponent({
    components: {Detail},
    setup() {
        const router = useRouter()
        const userList = ref([])
        const isDetail = ref(true)
        const detailData = ref()
        const toDetail = (data) => {
            isDetail.value = true
            detailData.value = data
            router.push({name: 'chat-detail', query: {detailData: JSON.stringify(detailData.value)}})
        }
        const getChatRoomList = async() => {
            let res  = await chatRoomList()  
            if(res.success) {
                userList.value = res.data.list
                userList.value.push({
                "id": 2,
                "name": "GPT4",
                "des": "Chat-Gpt4.5",
                "status": 2,
                "remark": "dev-test",
                "style": 4,
                "subStyle": 1,
                "createdId": 2,
                "createdAccount": "admin123",
                "createdTime": "2024-02-22 20:27:37",
                "updatedId": 2,
                "updatedAccount": "admin123",
                "updatedTime": "2024-02-22 20:30:16"
            })
            }
        }
        getChatRoomList()
        // createWebSocket()

        // const send = () => {
        //     sendSock({
        //         "service": 1,
        //         "msgId": 1000,
        //         "data": {
        //             "channelId": 1,
        //             "msgType": 1,
        //             "content": "text"
        //         }
        //     })
        // }
        const close = () => {
          isDetail.value = false
        }

        return {
            userList,
            isDetail,
            toDetail,
            detailData,
            close
            // send
        }
    },
})
</script>
  
<style lang="less" scoped>
// @import "../components/common";
.login-container {
    width: 100%;
    // height: 100%;
    position: relative;
    background-color: #31343c;
    .login-items {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid;
    }
}
.cell {
//   padding-top: 10px;
//   background: #fff;
  ul {
    li {
      display: flex;
      font-size: 1rem;
      padding: 10px 12px;
      border-bottom: 2px solid #eee;
      margin-bottom: 12px;
      .left {
        width: 92px;
        height: 92px;
        margin-right: 12px;
        ::v-deep .van-image{
          width: 100%;
          height: 100%;
        }
      }
      .right{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .top{
          display: flex;
          justify-content: space-between;
          margin-bottom: 2%;
          color: #fff;
          span{
            &:first-child{
              font-size: 1rem;
            }
          }
        }
        .bottom{
          display: flex;
          justify-content: start;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: calc(100vw - 150px);
          color: #999;
        }
      }
    }
  }
}
</style>
  