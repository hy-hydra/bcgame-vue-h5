import { defineStore } from "pinia";
import { getFingerprint } from "@/utils/index";

export const useRegister = defineStore({
  id: "userRegister",

  state: () => ({
    device: ""
  }),
  actions: {
    async getDeviceId() {
       await getFingerprint();
    },
    setDeviceId(deviceId:any){
        this.device =deviceId
    }
  },
  persist: true
});
