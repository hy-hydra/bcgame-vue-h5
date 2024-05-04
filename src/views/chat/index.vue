<template>
    <div style="width: 100%;height: 100%;">
      <nav-bar :title="chatObj.title"
               left-arrow
               rightBar
               :onClickLeft="onClickLeft"
               :onClickRight="onClickRight"
      />
      <div class="content-body">
        <div class="msg-view-area" @click="onViewAreaClick">
            
        </div>
        <!--输入区-->
        <van-row :class="'msg-bar' + (offsetMsgArea?' active':'')">
          <van-col span="3">
            <van-icon class="msg-bar-icon" class-prefix="iconfont" name="yuyin"/>
          </van-col>
          <van-col span="15">
            <div contenteditable
                 v-html="message"
                 ref="msginput"
                 id="editArea"
                 class="msg-input"
                 @click="onMsgFocus"
                 @input="onMsgInput"
                 @keypress.enter="onMsgEnterInput"
            ></div>
          </van-col>
          <!--表情，键盘切换组件-->
          <van-col span="3">
            <van-icon
              class="msg-bar-icon"
              class-prefix="iconfont"
              name="biaoqing"
              @click="showTools(1)"
              v-show="!showKeyboard"
            />
            <van-icon class="msg-bar-icon" class-prefix="iconfont" name="jianpan" @click="showTools(0)" v-show="showKeyboard"/>
          </van-col>
          <!--发送，添加切换组件-->
          <van-col span="3">
            <van-button
              id="sendBtn"
              class="msg-bar-button"
              size="mini"
              type="primary"
              @click="onSendMsg"
              v-show="showSend">发送</van-button>
            <van-icon class="msg-bar-icon" name="add-o" @click="showTools(2)" v-show="!showSend"/>
          </van-col>
        </van-row>
        <transition name="van-slide-up">
          <div class="msg-bar-menu" v-show="showBottomBar == 1">
            <van-tabs>
              <van-tab title-style="max-width: 12.5%;min-width: 12.5%;padding:4px" v-for="(emoji,index) in emojiList">
                <template #title>
                  <van-image
                    class="emoji-tab"
                    :src="emoji.emojiDemo"
                  />
                </template>
                <div class="van-hairline--top emoji-area">
                  <van-grid square clickable :border="false" :column-num="(emoji.emojiName=='钉钉'?8:5)">
                    <van-grid-item v-for="(item,index) in emoji.itemList" @click="addEmoji(emoji.emojiPath,emoji.emojiName, item)">
                      <van-image :src="emoji.emojiPath + item.url" :alt="item.alt"/>
                    </van-grid-item>
                  </van-grid>
                </div>
  
              </van-tab>
            </van-tabs>
  
          </div>
        </transition>
  
        <transition name="van-slide-up">
          <div class="msg-bar-menu" v-show="showBottomBar == 2">
            <van-grid square :gutter="10">
              <van-grid-item v-for="value in 8" :key="value" icon="photo-o" text="文字" />
            </van-grid>
          </div>
        </transition>
      </div>
    </div>
  </template>
  
  <script>
    // import emojiData from "@/utils/emoji/emojiData.js"
    import {RangeUtil} from "@/utils/range.util.js"
    import NavBar from "./part/NavBar.vue"
    import EditArea from "./part/EditArea.vue"
    // import PageSkeleton from "@/components/PageSkeleton"
    export default {
      name: "ChatRoom",
      components: {
        NavBar,
        EditArea,
        // PageSkeleton
      },
      data () {
        return {
          chatObj: {},
          message: "",// 输入框中的展示数据
          realMsg: "",// 实际发送的消息数据
          offsetMsgArea: false, // 是否抬升输入框高度
          showSend: false,
          showKeyboard: false,
          showBottomBar: 0,
          emojiList:[]
      }
      },
      mounted() {
        this.chatObj = this.$route.params;
        this.onMsgFocus()
        this.fnInitEmojis()
      },
      methods: {
        /** 初始化表情插件 */
        fnInitEmojis() {
        //   this.emojiList = emojiData.imgArr
            this.emojiList = []
        },
        onClickLeft() {
          this.$router.push("/");
        },
        onClickRight() {
          this.$router.push("/");
        },
        onMsgInput(event) {
          let message = event.target.innerHTML
          if(message != '') {
            this.showSend = true;
          }else {
            this.showSend = false;
          }
        },
        /** 输入回车时的操作 */
        onMsgEnterInput(e) {
          e.preventDefault();
          RangeUtil.insertHtmlAtCaret('<br>')  // 在当前光标插入文本
        },
        /** 输入框聚焦 */
        onMsgFocus() {
          document.getElementById("editArea").focus()
          RangeUtil.saveRange()
          this.showBottomBar = 0
          this.offsetMsgArea = false
          this.showKeyboard = false
        },
        /** 发送信息 */
        onSendMsg() {
          this.showSend = false;
          this.realMsg = this.fnAnalysisHtmlToMsg(this.$refs.msginput)
        //   this.$toast(this.realMsg);
          this.$refs.msginput.innerHTML = "";
          this.realMsg = "";
          this.showTools(0)
        },
        /** 展示底部工具窗口 */
        showTools(type) {
          if(type != 0) {
            this.offsetMsgArea = true
            this.showKeyboard = true
          }else {
            this.showKeyboard = false
            this.offsetMsgArea = false
          }
          this.showBottomBar = type;
        },
        /** 点击表情添加到输入框 */
        addEmoji(path, emojiType, emoji) {
          // 非系统自带表情，直接发送
          if(emojiType != "钉钉") {
            // TODO 发送逻辑
            return
          }
          this.showSend = true;
          let emojiPath = path + emoji.url
          let imgStr = '<img style="width:.7rem;height:.7rem;margin: 0 2px" src="' + emojiPath + '" alt="' + emoji.alt + '">'
          RangeUtil.insertHtmlAtCaret(imgStr)
          let ele = document.getElementById('editArea');
          console.log(ele.scrollHeight)
          ele.scrollTop = ele.scrollHeight;
        },
        onViewAreaClick() {
          this.showBottomBar = 0
          this.offsetMsgArea = false
          this.showKeyboard = false
        },
        /** html文本转文字文本*/
        fnAnalysisHtmlToMsg(ele) {
          let html = ele.innerHTML
          ele.children.length && ele.children.forEach(item => {
            let emojiName = item.getAttribute("alt");
            let itemHtml = item.outerHTML;
            html = html.replace(itemHtml, emojiName);
          })
          return html
        }
      }
  
    }
  </script>
  
  <style scoped>
    .content-body {
      margin-top: 46px;
      height: 100%;
    }
    .msg-view-area {
      height: 100%;
    }
    .msg-bar {
      min-height: 48px;
      background-color: #F8F8F8;
      bottom: 0;
      position: fixed;
      left: 0;
      /* display: block; */
      box-sizing: content-box;
      width: 100%;
    }
    .active{
      bottom: 36%;
    }
    .msg-bar-menu {
      background-color: white;
      bottom: 0;
      position: fixed;
      left: 0;
      box-sizing: content-box;
      width: 100%;
      height: 36%;
    }
    .msg-input {
      line-height: 0.8rem;
      min-height: calc(100% - 12px);
      max-height: calc(100% - 12px);
      overflow-x: hidden; /*x轴禁止滚动*/
      overflow-y: auto;/*y轴滚动*/
      margin: 6px 0;
      padding: 2px;
      background-color: white;
      font-size: 16px;
    }
    .msg-input::-webkit-scrollbar {
      display: none;/*隐藏滚动条*/
    }
    .msg-bar-button {
      width: 42px;
      height: 30px;
      padding: 0 7px;
      font-size: 12px;
      margin-top: 10px;
      position: fixed;
      text-align: center;
      display: flex;
    }
    .msg-bar-icon {
      padding: 0 6px;
      text-align: center;
      font-size: 30px;
      line-height: 48px;
      color: #616161;
      position: fixed;
      display: flex;
      box-sizing: content-box;
    }
    .emoji-area {
      overflow-y: scroll;
      height: 100%;
    }
    .emoji-tab {
      width:30px;
      height:30px;
    }
    .emoji-img {
      width:.85333rem;
      height:.85333rem;
      margin: 0 2px
    }
    :deep(.van-tabs) {
      height: calc(100%-1.17333rem);
    }
    :deep(.van-tabs__line) {
      transform: translateX(0.66rem) translateX(-50%);
    }
    :deep(.van-tabs__content) {
      height:100%;
    }
    :deep(.van-tab__pane) {
      height: 100%;
    }
  </style>