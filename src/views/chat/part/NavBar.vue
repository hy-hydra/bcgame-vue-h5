<template>
  <div>
    <van-nav-bar
      fixed
      z-index="99"
      :left-arrow="leftArrow"
      :title="title"
      :safe-area-inset-top="true"
      @click-left="onClickLeft"
      @click-right="onClickRight">
      <template #right v-if="rightBar">
        <van-row gutter="15" v-if="search">
          <van-col span="12">
            <van-icon @click="onClickSearch" name="search" class="nav-bar-icon" color="#333333"/>
          </van-col>
          <van-col span="12">
            <van-popover
              v-model="showPopover"
              theme="dark"
              trigger="click"
              :actions="actions"
              placement="bottom-end"
              @select="onSelectAction"
            >
              <template #reference>
                <van-icon name="add-o" class="nav-bar-icon nav-bar-icon-action" color="#333333"/>
              </template>
            </van-popover>
          </van-col>
        </van-row>
        <van-row v-if="!search">
          <van-icon name="ellipsis" />
        </van-row>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
  import { Toast } from "vant";
  export default {
    name: "NavBar",
    props: {
      title: {
        type: String,
        default: "标题"
      },
      rightBar: {
        type: Boolean,
        default: false
      },
      search: {
        type: Boolean,
        default: false
      },
      leftArrow: {
        type: Boolean,
        default: false
      },
      onClickLeft: {
        type: Function,
        default: function() {}
      },
      onClickRight: {
        type: Function,
        default: function() {}
      }
    },
    data () {
      return {
        showPopover: false,
        actions: [
          { name: 'createGroup', text: '发起群聊', icon: 'wechat' },
          { name: 'addFriend', text: '添加朋友', icon: 'friends' },
          { name: 'scan', text: '扫一扫', icon: 'scan' },
          { name: 'payQR', text: '收付款', icon: 'credit-pay' },
          { name: 'help', text: '帮助反馈', icon: 'envelop-o' },
        ],
      }
    },
    methods: {
      onClickSearch() {
        this.$router.push("/commonSearch");
      },
      onSelectAction(action) {
        Toast(action.text);
      },


    }
  }
</script>

<style scoped>
  /deep/.van-nav-bar {
    background-color: #EDEDED;
  }
  .nav-bar-icon {
    font-size: 22px;
  }
  .nav-bar-icon-action {
    padding-right: 16px;
  }
  /deep/.van-nav-bar .van-icon{
    color: #5a5a5a;
    font-size: 20px;
  }

</style>