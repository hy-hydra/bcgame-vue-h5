<template>
    <div class=" p-4 bg-[##24262c] text-white min-h-screen">
        <div class="flex justify-between h-44px border-b-1px border-b-solid border-b-[#40424b] items-center">
            <div class="ml-10px"  @click="clickBack">
                <img class="w-18px h-18px"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAACE4AAAhOAFFljFgAAAE9GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4wLWMwMDAgNzkuMTcxYzI3ZmFiLCAyMDIyLzA4LzE2LTIyOjM1OjQxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMTEtMjhUMTU6NDk6NTYrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTExLTMwVDIwOjMyOjI1KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTExLTMwVDIwOjMyOjI1KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpmOTA3YmJlOC1mYzg5LTQ2YWEtOWE2NC0wY2FjZDM3ZGRjMDMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ZjkwN2JiZTgtZmM4OS00NmFhLTlhNjQtMGNhY2QzN2RkYzAzIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZjkwN2JiZTgtZmM4OS00NmFhLTlhNjQtMGNhY2QzN2RkYzAzIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpmOTA3YmJlOC1mYzg5LTQ2YWEtOWE2NC0wY2FjZDM3ZGRjMDMiIHN0RXZ0OndoZW49IjIwMjMtMTEtMjhUMTU6NDk6NTYrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNC4wIChNYWNpbnRvc2gpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pma4gDkAAAHkSURBVGiB7duxVcMwEMbxf3gMkBFuBTYIk+CSCiagYgMqyozABjDKsYE3CIXjhyCxbNlS7Lv4a5znItLvxZatk7I5HA5cU27m7sCls4K9ZwV7z9WBb9sPj08vJb5/C1TH4x7QEo0MyfvbKxCAC0SAz+MR4AG4A+qCbfam1CUt/MW256pC7Q1OCbBwil1McoOFbqwCH5nbS05OsBDH3jPjoNUmF1gwgIU8YMEIFqaDBUNYmAYWjGFhPFgwiIVxYMEoFtLBgmEspIEF41gYDhYcYGEYWHCChX6w4AgLcbDgDAvdYMEhFs6DBadYOC3xCPHJ+xcLqFokpKaZg2t7IgQL/ZWKKnePLpBnglpaeEnvWGhZZmKE4IcKwdsLd2SWhOA9hgejSJSglhbewzXNCBy7j/fAd4leFUpN0+e6PfF/lFbi6B3GH0vnnsNKN0pYcM15SLretBSn6Ni7tOIQ3TdbUpyhh8yHFUfooRUPxQk6paalOECnVi0V4+gxdWnFMHrsyoNiFD1lbUkxiJ66eqgYQ+dYH1YMoXPtAFCMoHPu8VD60duM7Y1K7l08ShxdZW4vOSX2aSnd6LpAe0kptRNPOUUrTV171pTca6k06B2/m0vrgu0Nymb9k4fzrGDvWcHec3XgH1Xxjg+bBn60AAAAAElFTkSuQmCC"
                    alt="">
            </div>

            <div class="flex">
                <div class="text-12px font-700 lh-32px">
                    <span>{{ userBalance?.balance }}</span>
                    <span class="text-[#3dc119] mr-10px">{{ DEFAULT_CURRENCY_UNIT }}</span>
                    <span class="user-info-btn ">{{ $t("color.Deposit") }}</span>
                </div>
                <div class="ml-10px items-center flex">
                    <img class="w-15px h-15px" data-v-176e9d8c=""
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE9GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4wLWMwMDAgNzkuMTcxYzI3ZmFiLCAyMDIyLzA4LzE2LTIyOjM1OjQxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMTEtMDdUMTc6NTg6MzArMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTExLTMwVDIwOjMyOjA0KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTExLTMwVDIwOjMyOjA0KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozYTViMjQ3ZS05NzE1LTQ5MDMtOTgxYS00OWUwY2ZlYzFkM2IiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M2E1YjI0N2UtOTcxNS00OTAzLTk4MWEtNDllMGNmZWMxZDNiIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6M2E1YjI0N2UtOTcxNS00OTAzLTk4MWEtNDllMGNmZWMxZDNiIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDozYTViMjQ3ZS05NzE1LTQ5MDMtOTgxYS00OWUwY2ZlYzFkM2IiIHN0RXZ0OndoZW49IjIwMjMtMTEtMDdUMTc6NTg6MzArMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNC4wIChNYWNpbnRvc2gpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhVgdT4AAAFrSURBVEiJ5Zc/TsMwFIe/IBaGEnoCfAGUiIG1SFyAGwAbE+ICCCTmDmVibE8AF2DoykRPQCsGRgIdOobBKbhuXP9JoUH8lkS2877o+ZfnlyjPc1ah9enN6dmFy/oWsGGYewUGtgC3N9ez4EICONLGesAQOATuLHE3gXGxNlHGM6CjLlTBDeAJiLVgEXAFPFug7wUU4ByZHVUnQFoG3iuBAhwDbWQaU2DLAB4V16QEOh0/AB50sGnvtoEXZDZcVAadY+h7bFJsCeittWUG+xNgW6pHSIe+ecZtAl3KzeoEHgL3nlD12cQ0aQO3kG7OPKEC+TUY5eJq41tXUW3NBbLGZp5xBfM13wvcR7o6RIIFRccGToHLAGhzEdQFHCNPpqWr1ubqB8QVVPyOO4SZqwF8VAHvI9sY31qd2hbYwAn2PitI/+88rgV48gu8L4YKfuS7Rf0JDQoGMOvqMbAD7GJudUM1QStE0ap+2j4BWmM4+8bJ5yQAAAAASUVORK5CYII="
                        alt="">
                </div>
                <div class="ml-10px mr-10px items-center flex">
                    <img class="w-15px h-15px" data-v-176e9d8c=""
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE9GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4wLWMwMDAgNzkuMTcxYzI3ZmFiLCAyMDIyLzA4LzE2LTIyOjM1OjQxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMTEtMDdUMTc6NTg6MzArMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTExLTMwVDIwOjMyOjE4KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTExLTMwVDIwOjMyOjE4KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1NWJiZjE0MC0zNzE2LTQ0Y2UtYjg0MS00MjhiZTdmY2VlYTAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTViYmYxNDAtMzcxNi00NGNlLWI4NDEtNDI4YmU3ZmNlZWEwIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NTViYmYxNDAtMzcxNi00NGNlLWI4NDEtNDI4YmU3ZmNlZWEwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NWJiZjE0MC0zNzE2LTQ0Y2UtYjg0MS00MjhiZTdmY2VlYTAiIHN0RXZ0OndoZW49IjIwMjMtMTEtMDdUMTc6NTg6MzArMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNC4wIChNYWNpbnRvc2gpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvVLWksAAADcSURBVEiJ7dc/SgNREAfgL5LaXMRiK6uAWNppL6QVhdzASgLWQoKtN3BPECQXsPAiJgdYi2xQNn/IbHZJ4fuVM8t88HaX4XWKonCMnBxFRTfy8N3wEU4xQlaWZ3jG/PXlqR24RD/+oNDHFS4w33dQ9KhvK+gqGW4ig6Lw+Y7eZZtwY4nC7zV7jcD5hnoehaNfNVxj4PedTvEWHVIHVkJh7FA4Q69S+8Znm/A9xlt6D5jsO6jJ/3hX72C4sSQ4wQlOcIJbgxc1e2uJrsWx5T4+q9S/bF+XG9P5d3enH9d+INx/yr/mAAAAAElFTkSuQmCC"
                        alt="">
                </div>
            </div>
        </div>

        <div class="flex justify-between items-center px-12px pt-0 pb-10px">
            <div class="flex items-center">
                <img alt="" class="w-50px h-50px mr-5px bg-red"
                    :src="gameStore?.fileConfig?.domainConfPrefix + gameicon">
                <div>
                    <div class="text-12px font-700 mb-5px">{{ $t("color.sapre") }}</div>
                    <div class="text-11px text-[#98a7b5]">{{ issue }} {{ $t("color.period") }}</div>
                </div>
            </div>
            <div>
                <BcCountDown v-if="countSeconds" :countSeconds="countSeconds" @end="endTime" />
            </div>
        </div>

        <Pick />

    </div>
</template>

<script setup lang="ts">
import BcCountDown from "@/components/bc-count-down/index.vue";
import Pick from "./components/pick.vue"
import { gameLotteryEntry } from "@/api/game"
import { gameInfoStore } from '@/stores/gameStore';
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { DEFAULT_CURRENCY_UNIT } from "@/const";

const userStore = useUserStore();
const { userBalance } = storeToRefs(userStore);

const gameStore = gameInfoStore();
const router = useRouter();
const issue = ref('')
const gameicon = ref('')

const clickBack = () => {
  router.go(-1);
}

const countSeconds = ref(100000);

const endTime = () => {
  getGameInfo()
}

const getGameInfo = async () => {
    let res = await gameLotteryEntry({ gameId: gameStore.id });
    gameStore.updateGameItem(res?.data?.lottery || {});
    gameicon.value =  res?.data?.lottery?.icon
    if (res?.data?.lottery?.interval == 0) {
        setTimeout(() => {
        getGameInfo()
        }, 1000)
        return
    }

    countSeconds.value = 0;
    await nextTick()
    countSeconds.value = res?.data?.lottery?.interval * 1000;

    let issuestr = res?.data?.lottery?.issue
    issue.value =  `${issuestr.substring(4, 6)}/${issuestr.substring(6, 8)}-${issuestr.substring(8)}`
}

onMounted(() => {
  getGameInfo();
})

</script>

<style scoped></style>