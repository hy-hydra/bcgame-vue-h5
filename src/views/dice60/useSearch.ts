import { getLotteryEntry, getLotteryHistory, lottery, getRecord } from '@/api/dice60'
import { reactive, toRefs } from 'vue'
const data = reactive({
    entryData: [],
    historyData: []
})

export function useSearch() {
    const getLotteryEntrys = async () => {
        const res = await getLotteryEntry({
            "gameId":11
        })
        if(res.success) {
            data.entryData = res.data
        }
    }

    const getLotteryHistorys = async (params = {
        "page":1,
        "limit":10,
    }) => {
        const res = await getLotteryHistory({
            ...params,
            "gameId":11
        })
        if(res.success) {
            return res.data
        }
    }

    const saveLottery = async (params ) => {
        const res = await lottery(params)
        if(res.success) {
          return true
        } else {
          return false
        }
    }

    const getRecords = async (params = {
        "page":1,
        "limit":10,
    }) => {
        const res = await getRecord({
            ...params,
            "gameId":11
        })
        if(res.success) {
            return res.data.list
        }
    }

    return {
        getLotteryEntrys,
        getLotteryHistorys,
        ...toRefs(data),
        saveLottery,
        getRecords
    }
}