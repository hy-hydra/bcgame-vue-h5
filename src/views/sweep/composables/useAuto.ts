import { toRefs } from "vue"

const data = {
    img1: new URL("../../../assets/sweep/block.png", import.meta.url).href,
    img2: new URL("../../../assets/sweep/purple.png", import.meta.url).href,
    chooseSet: new Set([12]),
    chooseArr: []
}
export function useAuto() {
    const chooseBlock = (index) => {
        const x = index % 5;
        const y = (index / 5) >> 0;
        if(data.chooseSet.size && !data.chooseSet.has(index)){
            data.chooseSet.add(index)
        } else if(data.chooseSet.size && data.chooseSet.has(index)) {
            data.chooseSet.delete(index)
        }
        data.chooseArr = Array.from(data.chooseSet)
    }
    
    return {
        ...toRefs(data),
        chooseBlock
    }
}