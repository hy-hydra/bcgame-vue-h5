<template>
    <div class="main-view__lottery-item mt-24px">
        <LotteryTitle :title="item?.name">
            <svg class="icon">
                <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Slots"></use>
            </svg>
        </LotteryTitle>
        <div class="flex w-100vw overflow-x-auto" v-if="item.tagGameSetList?.length > 1">
            <div :class="selectIndex == index ? 'px-5px font-bold color-#fff py-10px text-12px' : 'px-5px py-10px text-12px'"
                v-for="(tagItem, index) in item.tagGameSetList" @click="() => { clickSelect(index) }">
                <svg :class="selectIndex == index ? 'select-icon s1ff97qc w-5px' : 'list-icon s1ff97qc w-5px'">
                    <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_HotGame"></use>
                </svg>
                {{ tagItem?.tag }}
            </div>
        </div>
        <van-swipe :loop="false" :width="114" :height="138" :show-indicators="false">
            <van-swipe-item v-for="gameItem in selectGameList">
                <div class="lottery-item__img-wrapper" @click="() => { clickItem(gameItem) }">
                    <img onerror="this.onerror=null;this.src='https://bc.imgix.net/game/image/8cfca271-4759-45b4-a578-4052d04cc5a5.png?auto=format&dpr=2&w=200';"
                        :src="gameStore?.fileConfig?.domainConfPrefix + gameItem?.icon" />
                    <p>
                        <span class="text-text-3">{{ gameItem.name }}</span>
                    </p>
                </div>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script setup lang="ts">
import LotteryTitle from "./lottery-title.vue";
import { gamesMapping } from "@/utils/game-map";
import { gameInfoStore } from '@/stores/gameStore';
import { GAME_CONFIG } from "@/config/index"
import { useRegister } from "@/stores/userRegister.pinia";
import { useLoginStore } from "@/stores/login";
import { objectToQueryString } from "@/utils/index"

const { access_token } = useLoginStore();
const StoreRegister = useRegister();
const user_device = StoreRegister.device;
const gameStore = gameInfoStore();
const selectIndex = ref(0);
const selectGameList = ref<any[]>([])
const router = useRouter();

const clickSelect = (index) => {
    selectIndex.value = index;
    selectGameList.value = props.item?.tagGameSetList[index]?.list
}

const clickItem = (item) => {
    let query = {...GAME_CONFIG,device:user_device,token:access_token,id: item?.gameId}
    if(item?.jumpLink){
        window.location.href = `${item?.link}?${objectToQueryString(query)}`
        return
    }
    gameStore.updateGameId(item?.gameId);
    router.push({
        name: gamesMapping[item?.gameId].router,
        query
    })
}

const props = defineProps<{
    item: any;
}>();

onMounted(() => {
    selectGameList.value = props.item?.tagGameSetList[0]?.list
})
</script>

<style lang="less" scoped>
.select-icon {
    height: 10px;
    width: 10px;
    fill: #ffffff;
}

.main-view {
    &__banner {
        padding: 4px 0 4px 4px;

        &-img-wrapper {
            border-radius: 4px;
            height: 100%;
            padding-right: 12px;

            >img {
                border-radius: 4px;
                width: 100%;
                height: 100%;
            }
        }
    }

    &__btns {
        display: flex;
        padding: 0 14px;
        justify-content: space-between;
    }

    &__btn {
        width: 100px;
        height: 38px;

        >img {
            height: 100%;
            width: 100%;
        }
    }

    &__lottery {
        &-item {
            padding: 0 4px;

            .lottery-item__img-wrapper {
                height: 100%;
                padding-right: 4px;
                font-size: 0;

                >img {
                    height: 108px;
                    width: 108px;
                    border-top-left-radius: 4px;
                    border-top-right-radius: 4px;
                }

                >p {
                    padding: 7px;
                    width: 108px;
                    border-bottom-left-radius: 4px;
                    border-bottom-right-radius: 4px;
                    background-color: var(--fog-21);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0;

                    >span {
                        font-size: 12px;
                    }
                }
            }
        }
    }

    &__table {
        &-header {
            padding: 15px 29px;
            color: white;
            display: flex;
            justify-content: space-between;
            font-size: 12px;
        }

        &-body {
            .row {
                display: flex;
                color: white;
                justify-content: space-between;
                height: 44px;
                margin: 0 14px;
                border-radius: 8px;
                align-items: center;
                padding: 0 18px;
                margin-bottom: 6px;
                font-size: 12px;
            }
        }
    }
}
</style>