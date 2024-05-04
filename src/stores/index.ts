import { defineStore } from "pinia";
import type { ConfigProviderTheme } from 'vant'

import { useConfigStore } from "./config";
import { useLoadStore } from "./loading";
import { useLoginStore } from "./login";
import { useSocketStore } from "./socketStore";
import { useUserStore } from "./user";
import { gameInfoStore } from "./gameStore";
import { promotionStore } from "./promotionStore";
import { sdkStore } from "./sdkStore";
import { useRegister } from "./userRegister.pinia";
import { chatRoomListStore } from "./chatRoomStore";

const useThemeStore = defineStore({
  id: "theme",
  persist: true,
  state: () => ({
    theme: "dark" as ConfigProviderTheme
  }),
  actions: {
    setTheme(theme: ConfigProviderTheme) {
      this.theme = theme;
    }
  }
});

export {
  gameInfoStore,
  promotionStore,
  sdkStore,
  useRegister,
  useConfigStore,
  useLoadStore,
  useLoginStore,
  useSocketStore,
  useUserStore,
  useThemeStore,
  chatRoomListStore
}