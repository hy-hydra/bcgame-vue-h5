<!-- //微信聊天可视化组件
//依赖scrollLoader组件, 依赖指令v-emotion（实现请查看main.js）

//参数：
// width               组件宽度，默认450
// wrapBg              外层父元素背景颜色，默认#efefef
// maxHeight           展示窗口最高高度, 默认900
// contactAvatarUrl    好友头像url
// ownerAvatarUrl      微信主人头像url
// ownerNickname       微信主人昵称
// getUpperData        （必需）当滚动到上方时加载数据的方法，返回值要为Promise对象，resolve的结构同data
// getUnderData        （必需）当滚动到下方时加载数据的方法，返回值同上
// data                （必需）传入初始化数据， 结构如下：
[{
    direction: 2, //为2表示微信主人发出的消息，1表示联系人
    id: 1, //根据这个来排序消息
    type: 1, //1为文本，2为图片
    content: '为1你好!![呲牙]', //当type时这里是文本消息，当type2为2时这里要存放图片地址；后续会支持语音的显示
    ctime: new Date().toLocaleString() //显示当前消息的发送时间
},
{
    direction: 1,
    id: 2,
    type: 1,
    content: '你也好。[害羞]',
    ctime: new Date().toLocaleString()
}] -->
<template>
    <div class="wxchat-container" :style="{ backgroundColor: wrapBg }">
        <div class="window" id="window-view-container" :style="{ width: width + 'px' }">
            <!-- data is empty -->
            <div class="title">
                <!-- <p v-text="contactNickname"></p> -->
                <span class="title-letter">Chat</span>
                <van-icon name="cross" class="close" @click="close" />
            </div>
            <div class="loading" v-if="dataArray && dataArray.length == 0">
                <div
                    style="position: absolute; left: 50%; top:50%; transform: translate(-50%, -50%); text-align:center; font-size: 16px;">
                    <span>未查找到聊天记录</span>
                </div>
            </div>

            <!-- loading -->
            <div class="loading" v-if="dataArray.length == 0">
                <div style="position: absolute; bottom: -100px;width: 100%;text-align:center">
                    <div>加载中...</div>
                </div>
            </div>

            <!-- main -->
            <ScrollLoader :minHeight="minHeight" @scroll-to-top="refresh" @scroll-to-botton="infinite"
                class="container-main" v-if="dataArray && dataArray.length > 0"
                :style="{ maxHeight: maxHeight - 50 + 'px' }">
                <div class="message">
                    <ul>
                        <li v-for="(message, index) in dataArray" :key="message?.id" :class="message?.direction == 2 ? 'an-move-right' : 'an-move-left'
                            ">
                            <p class="time" :class="message?.direction == 2 ? ' self' : ''">
                                <span v-text="message?.ctime"></span>
                            </p>
                            <p class="time system" v-if="message?.type == 10000">
                                <span v-html="message?.content"></span>
                            </p>
                            <div :class="'main' + (message?.direction == 2 ? ' self' : '')" v-else>
                                <img class="avatar" width="45" height="45" :src="message?.direction == 2 ? ownerAvatarUrl : contactAvatarUrl
                                    " />
                                <!-- 文本 -->
                                <div class="text" v-emotion="message?.content" v-if="message?.type == 1"></div>

                                <!-- 图片 -->
                                <div class="text" v-else-if="message.type == 2">
                                    <img :src="message.content" class="image" alt="聊天图片" />
                                </div>

                                <!-- 其他 -->
                                <div class="text" v-else-if="message.type != 10000" v-text="'[暂未支持的消息类型:' +
                                    message.type +
                                    ']\n\r' +
                                    message.content
                                    "></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </ScrollLoader>
        </div>
        <div class="footer">
            <van-row style="background-color: var(--fog-13) !important; border-radius: 4px;">
                <van-col span="20">
                    <div :class="inputFocused ? 'input-focused' : ''"><van-field v-model="message" rows="1"
                            type="textarea" @focus="oninputBlurAndFocused" @blur="oninputBlurAndFocused"
                            placeholder="Your Message" label=""
                            style="--van-field-input-text-color: #9ca7b3;  margin: 0; padding: 0 10px; --van-field-text-area-min-height: 16px; color:#9ca7b3" />
                    </div>
                </van-col>
                <van-col span="4"
                    style="background-color: #3e9a12;display: flex;justify-content: center;align-items: center; border-radius: 4px">
                    <span id="sendBtn" @click="onSendMsg"><img width="24" height="24"
                            src="../../../assets/chat/send.png" alt="" /></span>
                </van-col>
            </van-row>
            <div class="chat-bar" style="">
                <span class="chat-room-selection" @click="onSelectRoom" ref="triggerClickRef1">
                    <span class=" text">{{ activeRoom?.label }}</span>
                    <div class="room-select-icon">
                        <svg class="h-12px w-12px fill-text-6" :class="visible && 'rotate-reverse-90'">
                            <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Arrow"></use>
                        </svg>
                    </div>
                </span>
                <div v-if="visible" :class="'chat-room-list ' + (visible ? 'visible' : '')" ref="triggerClickRef">
                    <div v-for="room in chatRoomList"
                        :class="'chat-room-item ' + (room.value === activeRoom.value ? 'active-room' : '')"
                        @click="handleSelectRoom(room.value)"><span class="room-name">{{ room.label
                            }}</span><span class="active"></span></div>
                </div>
                <span class="chat-bar-icon"><svg class="h-17.81px w-17.81px "
                        :class="'deposit' !== 'deposit' ? 'fill-[#ffffff]' : 'fill-text-6'">
                        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Rain"></use>
                    </svg></span>
                <span class="chat-bar-icon"><svg class="h-17.81px w-17.81px "
                        :class="'deposit' !== 'deposit' ? 'fill-[#ffffff]' : 'fill-text-6'">
                        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Command"></use>
                    </svg></span>
                <span class="chat-bar-icon"><svg class="h-17.81px w-17.81px "
                        :class="'deposit' !== 'deposit' ? 'fill-[#ffffff]' : 'fill-text-6'">
                        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_CoinDrop"></use>
                    </svg></span>
                <span class="chat-bar-icon"><img alt="rich" class="rich-img"
                        src="@/assets/chat/rich.8786d13b.png"></span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
import ScrollLoader from "./scrollLoader.vue";
// import { sendSock } from '../composables/websocket';
import { useRouter } from "vue-router";
import { useSearch } from "../composables/useSearch";
import { onClickOutside } from "@vueuse/core";

import { isEmpty } from 'lodash-es'

import { useChatRoomList } from '@/utils/hooks/useChatRoomList'
/**
 * 转换成图片表情
 */
function toEmotion(text, isNoGif = true) {
    var list = [
        "微笑",
        "撇嘴",
        "色",
        "发呆",
        "得意",
        "流泪",
        "害羞",
        "闭嘴",
        "睡",
        "大哭",
        "尴尬",
        "发怒",
        "调皮",
        "呲牙",
        "惊讶",
        "难过",
        "酷",
        "冷汗",
        "抓狂",
        "吐",
        "偷笑",
        "愉快",
        "白眼",
        "傲慢",
        "饥饿",
        "困",
        "惊恐",
        "流汗",
        "憨笑",
        "大兵",
        "奋斗",
        "咒骂",
        "疑问",
        "嘘",
        "晕",
        "折磨",
        "衰",
        "骷髅",
        "敲打",
        "再见",
        "擦汗",
        "抠鼻",
        "鼓掌",
        "糗大了",
        "坏笑",
        "左哼哼",
        "右哼哼",
        "哈欠",
        "鄙视",
        "委屈",
        "快哭了",
        "阴险",
        "亲亲",
        "吓",
        "可怜",
        "菜刀",
        "西瓜",
        "啤酒",
        "篮球",
        "乒乓",
        "咖啡",
        "饭",
        "猪头",
        "玫瑰",
        "凋谢",
        "示爱",
        "爱心",
        "心碎",
        "蛋糕",
        "闪电",
        "炸弹",
        "刀",
        "足球",
        "瓢虫",
        "便便",
        "月亮",
        "太阳",
        "礼物",
        "拥抱",
        "强",
        "弱",
        "握手",
        "胜利",
        "抱拳",
        "勾引",
        "拳头",
        "差劲",
        "爱你",
        "NO",
        "OK",
        "爱情",
        "飞吻",
        "跳跳",
        "发抖",
        "怄火",
        "转圈",
        "磕头",
        "回头",
        "跳绳",
        "挥手",
        "激动",
        "街舞",
        "献吻",
        "左太极",
        "右太极",
        "嘿哈",
        "捂脸",
        "奸笑",
        "机智",
        "皱眉",
        "耶",
        "红包",
        "鸡"
    ];

    if (!text) {
        return text;
    }

    text = text.replace(/\[[\u4E00-\u9FA5]{1,3}\]/gi, function (word) {
        var newWord = word.replace(/\[|\]/gi, "");
        var index = list.indexOf(newWord);
        var backgroundPositionX = -index * 24;
        var imgHTML = "";
        if (index < 0) {
            return word;
        }

        if (isNoGif) {
            if (index > 104) {
                return word;
            }
            imgHTML = `<i class="static-emotion" style="background:url(https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/default218877.gif) ${backgroundPositionX}px 0;"></i>`;
        } else {
            var path =
                index > 104
                    ? "/img"
                    : "https://res.wx.qq.com/mpres/htmledition/images/icon";
            imgHTML = `<img class="static-emotion-gif" style="vertical-align: middle" src="${path}/emotion/${index}.gif">`;
        }
        return imgHTML;
    });
    return text;
}
export default defineComponent({
    components: {
        ScrollLoader
    },
    props: {
        data: {
            type: Array,
            required: true
        },

        width: {
            type: Number,
            default: 450
        },

        wrapBg: {
            type: String,
            default: "#efefef"
        },

        maxHeight: {
            type: Number,
            default: 700
        },

        contactAvatarUrl: {
            type: String
        },

        ownerAvatarUrl: {
            type: String
        },

        getUpperData: {
            type: Function,
            required: true
        },

        getUnderData: {
            type: Function,
            required: true
        },
    },
    directives: {
        emotion: {
            mounted(el, binding, vnode) {
                el.innerHTML = toEmotion(binding.value);
            }
        }
    },
    setup(props, context) {
        const { start, allData, init } = useSearch();
        const { chatRoomList } = useChatRoomList()
        const router = useRouter();
        const visible = ref(false);
        const activeRoom = ref<{ value: number, label: string, style: number }>();
        const triggerClickRef = ref(null);
        const triggerClickRef1 = ref(null);
        const inputFocused = ref(false);
        const data = reactive({
            isUpperLaoding: false,
            isUnderLaoding: false,

            isRefreshedAll: false,
            isLoadedAll: false,

            minHeight: 700,
            maxHeight: null,
            dataArray: [],
            message: ""
        });

        // const initData = () => {
        //     data.dataArray = data.dataArray.concat(props.data);
        // };
        // initData();
        //向上拉刷新
        const refresh = done => {
            if (data.isUpperLaoding) {
                return;
            }

            if (data.isRefreshedAll) {
                done(true);
                data.isUpperLaoding = false;
                return;
            }

            try {
                props.getUpperData().then(function (res) {
                    if (res.length == 0) {
                        data.isRefreshedAll = true;
                        done(true);
                    } else {
                        data.dataArray = res.reverse().concat(data.dataArray); //倒序合并
                        done();
                    }
                });
            } catch (error) {
                console.error(
                    'wxChat: props "getUpperData" must return a promise object!'
                );
            }
            data.isUpperLaoding = false;
        };

        //向下拉加载
        const infinite = done => {
            // if (data.isUnderLaoding) {
            //     return;
            // }
            // if (data.isLoadedAll) {
            //     done(true);
            //     data.isUnderLaoding = false;
            //     return;
            // }

            // try {
            //     props.getUnderData().then(function (res) {
            //         if (res == 0) {
            //             data.isLoadedAll = true;
            //             done(true);
            //         } else {
            //             done();
            //             data.dataArray = data.dataArray.concat(res); //直接合并
            //         }
            //     });
            // } catch (error) {
            //     console.error(
            //         'wxChat: props "getUnderData" must return a promise object!'
            //     );
            // }
            // data.isUnderLaoding = false;
        };
        const onSendMsg = () => {
            start({
                service: 1,
                msgId: 1000,
                data: {
                    channelId: 1,
                    msgType: 1,
                    content: data.message
                }
            });
        };
        const resCallback = dataw => {
            data.dataArray = data.dataArray.concat({
                direction: 1,
                id: 2,
                type: dataw.msgType,
                content: dataw.content,
                ctime: new Date().toLocaleString()
            }); //直接合并
            data.message = "";
            allData.value.clear()
        };

        const close = () => {
            // context.emit('close')
            router.go(-1);
        };


        const onSelectRoom = () => {
            visible.value = !visible.value
        }

        const oninputBlurAndFocused = () => {
            inputFocused.value = !inputFocused.value
        }

        const handleSelectRoom = (value: number) => {
            activeRoom.value = { ...chatRoomList.find(item => item.value === value) };
            visible.value = false

        }

        onClickOutside(triggerClickRef, () => {
            setTimeout(() => {
                if (visible.value) {
                    visible.value = false;
                }
            }, 0);
        }, { ignore: [triggerClickRef1] });


        watch(
            () => allData.value,
            newVal => {
                let msg1000s = newVal.get(1700) && newVal.get(1700).data;
                if (msg1000s) {
                    resCallback(msg1000s);
                }
            },
            { deep: true, immediate: true }
        );

        const initHistory = () => {
            data.dataArray = [];
        }

        watch(() => activeRoom.value, (newVal) => {
            if (isEmpty(activeRoom)) return
            initHistory()
            init({
                "service": newVal.value,
                "msgId": 1001,
                "data": {
                    "style": newVal.style,
                    "topic": '1'
                }
            })

        })

        onMounted(() => {
            activeRoom.value = { ...chatRoomList[0] }
            initHistory()
            data.minHeight =
                document.getElementById("window-view-container").offsetHeight;
            data.maxHeight =
                document.getElementById("window-view-container").offsetHeight;
        });

        return {
            ...toRefs(data),
            // initData,
            infinite,
            onSendMsg,
            refresh,
            close,
            visible,
            onSelectRoom,
            activeRoom,
            handleSelectRoom,
            triggerClickRef,
            triggerClickRef1,
            inputFocused,
            oninputBlurAndFocused,
            chatRoomList,
        };
    }
});
</script>

<style scoped lang="less">
.wxchat-container {
    width: 100%;
    // height: 100%;
    height: 100vh;
    z-index: 100;
    position: fixed;
    left: 0;
    top: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.shadow {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.2;
}

.window {
    /*max-width: 450px;*/
    min-width: 300px;
    background: #1d1e22;
    margin: 0 auto;
    overflow: hidden;
    padding: 0;
    // height: 100%;
    flex: 1;
    position: relative;
    z-index: 101;
}

button {
    border: 0;
    background: none;
    border-radius: 0;
    text-align: center;
}

button {
    outline: none;
}

.w100 {
    width: 100%;
}

.mt5 {
    margin-top: 5px;
}

.mt10 {
    margin-top: 10px;
}

.mt20 {
    margin-top: 20px;
}

.mb10 {
    margin-bottom: 10px;
}

.mb20 {
    margin-bottom: 20px;
}

.fs0 {
    font-size: 0;
}

.title {
    background: #171719;
    text-align: center;
    color: #fff;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    position: relative;
    display: flex;
    justify-content: space-between;

    .title-letter {
        font-weight: 600;
        margin-left: 20px;
    }
}

.loading,
.no-more {
    text-align: center;
    color: #b0b0b0;
    line-height: 100px;
}

.no-more {
    line-height: 60px;
}

.pull-right {
    float: right;
}

.link-line {
    text-decoration: underline;
}

.message {
    /*height: 100%;*/
    padding: 10px 15px;
    /*overflow-y: scroll;*/
    background-color: #1d1e22;
}

.main {
    text-align: start;
}

.message li {
    margin-bottom: 15px;
    left: 0;
    position: relative;
    display: block;
}

.message .time {
    margin: 10px 0 0 50px;
    text-align: start;
}

.message .time.self {
    margin: 10px 50px 0 0;
}

.message .text {
    display: inline-block;
    position: relative;
    padding: 0 10px;
    max-width: calc(100% - 75px);
    min-height: 35px;
    line-height: 2.1;
    font-size: 15px;
    padding: 6px 10px;
    text-align: left;
    word-break: break-all;
    background-color: #25262a;
    color: #9ca7b3;
    border-radius: 4px;
    box-shadow: 0px 1px 7px -5px #000;
}

.message .avatar {
    float: left;
    margin: 0 10px 0 0;
    border-radius: 3px;
    background: #fff;
    border-radius: 100%;
}

.message .time>span {
    display: inline-block;
    padding: 0 5px;
    font-size: 12px;
    color: #484f57;
    border-radius: 2px;
    // background-color: #DADADA;
}

.message .system>span {
    padding: 4px 9px;
    text-align: left;
}

.message .text:before {
    content: " ";
    position: absolute;
    top: 9px;
    right: 100%;
    border: 6px solid transparent;
    border-right-color: #25262a;
}

.message .self {
    text-align: right;
}

.message .self .avatar {
    float: right;
    margin: 0 0 0 10px;
    border-radius: 100%;
}

.message .self .text {
    background-color: #25262a;
}

.message .self .text:before {
    right: inherit;
    left: 100%;
    border-right-color: transparent;
    border-left-color: #25262a;
}

.message .image {
    max-width: 200px;
}

img.static-emotion-gif,
img.static-emotion {
    vertical-align: middle !important;
}

.an-move-left {
    left: 0;
    animation: moveLeft 0.7s ease;
    -webkit-animation: moveLeft 0.7s ease;
}

.an-move-right {
    left: 0;
    animation: moveRight 0.7s ease;
    -webkit-animation: moveRight 0.7s ease;
}

.bgnone {
    background: none;
}

.footer {
    // background: #171719;
    background: #212127;
    text-align: center;
    color: #fff;
    width: 100%;
    height: 103.5px;
    // line-height: 50px;
    // font-size: 14px;
    position: relative;
    padding: 10px 8.5px 13.5px 8.5px;

    .chat-bar {
        margin-top: 11px;
        height: 27px;
        display: flex;
        justify-content: space-between;

        .chat-bar-icon {
            width: 21.81px;
            display: flex;
            justify-content: center;
            align-items: center;

            .rich-img {
                font-size: 0;
                width: 75%;
                height: auto;
                cursor: pointer;
            }
        }

        .chat-room-selection {
            width: 117px;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #282a30;
            border-radius: 4px;
            color: #9ca7b3;
            padding: 0 18px;

            .text {
                font-size: 14px
            }

            .room-select-icon {
                transition: all 0.5s;

                .rotate-reverse-90 {
                    transform: rotate(-90deg);
                    transition: transform .5s
                }

                >svg {
                    transition: all 0.5s;
                }
            }
        }



        .chat-room-list {
            width: 117px;
            // max-height: 245px;
            max-height: 237px;
            display: flex;
            flex-direction: column;
            background-color: #17181b;
            overflow-y: scroll;
            padding: 5px 5px;
            position: fixed;
            left: 8.5px;
            bottom: 44px;
            z-index: 1000;
            opacity: 0;
            box-shadow: 0 0 8px #00000024;
            border-radius: 4px;
            transition: all 0.5s;

            .chat-room-item {
                min-height: 29px;
                border-radius: 3px;
                margin: 2px 0;
                padding: 0 9px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;

                .room-name {
                    font-size: 13px;
                    color: rgb(153 164 176 / 60%);
                }
            }

            .active-room {
                border: solid #3bc11766 1px;

                .active {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background-color: #3bc117;
                    box-shadow: 0 0 0 4px #3bc11726;
                }
            }
        }

        .visible {
            opacity: 1;
        }
    }
}

.input-focused {
    .van-field {
        border: 1px solid #3e9a12;
    }
}

:deep(.van-field) {
    background: transparent;
    border: 1px solid #212127;
    width: calc(100% - 2px);
    height: 43px;

    //   .van-cell__value {
    //     height: 100%;

    .van-field__body {
        height: 100%;
        color: #9ca7b3 !important;
    }

    //     .van-field__control {
    //       // height: 100%;
    //     }
    //   }
}

@keyframes moveRight {
    0% {
        left: -20px;
        opacity: 0;
    }

    100% {
        left: 0;
        opacity: 1;
    }
}

@-webkit-keyframes moveRight {
    0% {
        left: -20px;
        opacity: 0;
    }

    100% {
        left: 0px;
        opacity: 1;
    }
}

@keyframes moveLeft {
    0% {
        left: 20px;
        opacity: 0;
    }

    100% {
        left: 0px;
        opacity: 1;
    }
}

@-webkit-keyframes moveLeft {
    0% {
        left: 20px;
        opacity: 0;
    }

    100% {
        left: 0px;
        opacity: 1;
    }
}

@media (max-width: 367px) {
    .fzDInfo {
        width: 82%;
    }
}

#sendBtn {
    /* background: skyblue; */
    display: inline-block;
    width: 90%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.close {
    position: absolute;
    top: 16px;
    right: 16px;
}
</style>
