import { defineStore } from "pinia";
import { createApp } from 'glsdk';
// import { setupSlots } from './lib/main.js';
// import io from "@/views/games/service/ws";

const appid = "vVOATLFurchc", token = "GTdBwtadddMERzt5ownHxt7GLeJ-k42lXupwzcgXVEk=";


let app = null;

export const sdkStore = defineStore({
  id: "sdkStore",
  persist: true,
  state: () => ({
    activeGame: "crash",
    list: []
  }),
  actions: {

    async mountSlots(ops: any){
      // const { container } = ops;
      // return await setupSlots(container);
      const { container, name } = ops;
      if(!app)  app = await createApp({ 
        appid, 
        token,
        assetsPath: "https://hkgm.oss-accelerate.aliyuncs.com/assets",
            // assetsPath: window.location.origin,
            gamePath: "https://hkgm.oss-accelerate.aliyuncs.com/games",
      });

      return await app.mount({ container, name, viewType:'view' });

    },

    async mountGame(ops: any) {

      // if(!app)  app = await createApp({appid, token });
      app = await createApp({appid, token });
      const { container, name } = ops;

      const game = await app.mount({ container, name, viewType:'view' });
      // window.game = game;
      console.log(`window-game:${name}`,game);
      return game

    },

    async unmountGame(name){
      if(app) await app.unmount(name)
    },
  }
});
