<template>
    <div>
      <van-row :class="'msg-bar' + (msgActive?' active':'')">
        <!-- <van-col span="3">
          <van-icon class="msg-bar-icon" class-prefix="iconfont" name="yuyin"/>
        </van-col> -->
        <van-col span="15">111
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
        <!-- <van-col span="3">
          <van-icon
            class="msg-bar-icon"
            class-prefix="iconfont"
            name="biaoqing"
            @click="showTools(1)"
          />
        </van-col> -->
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
      <div class="msg-bar-menu" v-show="showBottomBar == 1">
        <van-grid square :border="false" :column-num="7">
          <van-grid-item>
            <van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
          </van-grid-item>
          <van-grid-item>
            <van-image src="https://img01.yzcdn.cn/vant/apple-2.jpg" />
          </van-grid-item>
          <van-grid-item>
            <van-image src="https://img01.yzcdn.cn/vant/apple-3.jpg" />
          </van-grid-item>
          <van-grid-item>
            <van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
          </van-grid-item>
          <van-grid-item>
            <van-image src="https://img01.yzcdn.cn/vant/apple-2.jpg" />
          </van-grid-item>
          <van-grid-item>
            <van-image src="https://img01.yzcdn.cn/vant/apple-3.jpg" />
          </van-grid-item>
          <van-grid-item>
            <van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
          </van-grid-item>
          <van-grid-item>
            <van-image src="https://img01.yzcdn.cn/vant/apple-2.jpg" />
          </van-grid-item>
          <van-grid-item>
            <van-image src="https://img01.yzcdn.cn/vant/apple-3.jpg" />
          </van-grid-item>
        </van-grid>
      </div>
  
      <div class="msg-bar-menu" v-show="showBottomBar == 2">
        <van-grid square :gutter="10">
          <van-grid-item v-for="value in 8" :key="value" icon="photo-o" text="文字" />
        </van-grid>
      </div>
    </div>
  </template>
  
  <script>
    import emojiData from "@/utils/emoji/emojiData.js"
    import {RangeUtil} from "@/utils/range.util.js"
    export default {
      name: "EditArea",
      props: {
        message: {
          type: String,
          default: ""
        },
      },
      data () {
        return {
          msgActive: false,
          showSend: false,
          showBottomBar: 0,
        }
      },
      methods: {
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
          RangeUtil.insertHtmlAtCaret('<br/>')  // 在当前光标插入文本
        },
        /** 输入框聚焦 */
        onMsgFocus() {
          document.getElementById("editArea").focus()
          RangeUtil.saveRange()
          this.showBottomBar = 0
          this.msgActive = false
        },
        /** 发送信息 */
        onSendMsg() {
          this.showSend = false;
          console.log(this.$refs.msginput.innerHTML)
          this.$toast(this.$refs.msginput.innerHTML);
          this.$refs.msginput.innerHTML = "";
        },
        /** 展示底部工具窗口 */
        showTools(type) {
          this.msgActive = true
          this.showBottomBar = type;
        },
        addEmoji() {
          this.showSend = true;
          let rand = Math.random();
          let num = 0 + Math.round(rand * 19);
          let emoji = emojiData.imgArr[0].emojiList[0][num];
          let emojiPath = emojiData.imgArr[0].emojiPath + emoji.url
          let imgStr = '<img style="width:20px;height:20px;margin: 0 2px" src="' + emojiPath + '">'
          RangeUtil.insertHtmlAtCaret(imgStr)
          let ele = document.getElementById('editArea');
          console.log(ele.scrollHeight)
          ele.scrollTop = ele.scrollHeight;
        }
      }
    }
  </script>
  
  <style scoped>
    .msg-bar {
      min-height: 48px;
      background-color: #F8F8F8;
      bottom: 0;
      position: fixed;
      left: 0;
      display: block;
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
      line-height: 32px;
      min-height: 100%;
      max-height: 100%;
      overflow: paged-y-controls;
      margin: 6px 0;
      padding: 2px;
      background-color: white;
      font-size: 16px;
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
    .emoji-img {
      width:24px;
      height:24px;
      margin-right: 2px;
    }
  </style>