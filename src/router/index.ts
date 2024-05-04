// https://router.vuejs.org/zh/
import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// import { useLoginStore } from "../stores/login";
// import { storeToRefs } from "pinia";
import { webConfig } from "@/api/user";


// 导入路由组件
import homeLayout from "@/views/layout-home/index.vue";
import walletLayout from "@/views/layout-wallet/index.vue";
import accessLayout from "@/views/layout-access/index.vue";
import { DEFAULT_FAVICON, DEFAULT_TITLE } from "@/const";
import { useConfigStore } from "@/stores/config";
import { useLoginStore } from "@/stores/login";
import { storeToRefs } from "pinia";

// import mock from "@/views/mock/index.vue";
// import charts from "@/views/charts/index.vue";
// import unocss from "@/views/unocss/index.vue";

NProgress.configure({ showSpinner: true, parent: "#app" });

// 定义路由，每个路由都需要映射到一个组件
const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/",
    name: "home-layout",
    component: homeLayout,
    redirect: "/home",
    children: [
      {
        path: "/games/ox",
        name: "ox",
        component: () => import("@/views/games/ox.vue")
      },
      {
        path: "/games/fortune_mouse",
        name: "fortune_mouse",
        component: () => import("@/views/games/fortune_mouse.vue")
      },
      {
        path: "/games/phoenix_rises",
        name: "phoenix_rises",
        component: () => import("@/views/games/phoenix_rises.vue")
      },
      {
        path: "/games/fortune_rabbit",
        name: "fortune_rabbit",
        component: () => import("@/views/games/fortune_rabbit.vue")
      },
      {
        path: "/games/fortune_tiger",
        name: "fortune_tiger",
        component: () => import("@/views/games/fortune_tiger.vue")
      },
      {
        path: "/games/tree_of_tortune",
        name: "tree_of_tortune",
        component: () => import("@/views/games/tree_of_tortune.vue")
      },
      {
        path: "/games/santas_gift_rush",
        name: "santas_gift_rush",
        component: () => import("@/views/games/santas_gift_rush.vue")
      },
      {
        path: "/games/mr_hallow_win",
        name: "mr_hallow_win",
        component: () => import("@/views/games/mr_hallow_win.vue")
      },
      {
        path: "/games/ganesha_gold",
        name: "ganesha_gold",
        component: () => import("@/views/games/ganesha_gold.vue")
      },
      {
        path: "/games/crash",
        name: "crash",
        component: () => import("@/views/games/index.vue")
      },
      {
        path: "/games/classicdice",
        name: "classicdice",
        component: () => import("@/views/games/classicdice.vue")
      },
      {
        path: "/games/dice",
        name: "dice",
        component: () => import("@/views/games/dice.vue")
      },
      {
        path: "/games/hashdice",
        name: "hashdice",
        component: () => import("@/views/games/hashdice.vue")
      },
      {
        path: "/games/keno",
        name: "keno",
        component: () => import("@/views/games/keno.vue")
      },
      {
        path: "/games/limbo",
        name: "limbo",
        component: () => import("@/views/games/limbo.vue")
      },
      {
        path: "/games/plinko",
        name: "plinko",
        component: () => import("@/views/games/plinko.vue")
      },
      {
        path: "/games/wheel",
        name: "wheel",
        component: () => import("@/views/games/wheel.vue")
      },
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/index.vue")
      },
      {
        path: "/sweep",
        name: "sweep",
        component: () => import("@/views/sweep/index.vue")
      },
      {
        path: "/hilo",
        name: "hilo",
        component: () => import("@/views/hilo/index.vue")
      },
      {
        path: "/dice60",
        name: "dice60",
        component: () => import("@/views/dice60/index.vue")
      },
      {
        path: "/dice180",
        name: "dice180",
        component: () => import("@/views/dice180/index.vue")
      },
      {
        path: "/dice300",
        name: "dice300",
        component: () => import("@/views/dice300/index.vue")
      },
      {
        path: "/more",
        name: "more",
        component: () => import("@/views/more/index.vue")
      },
      {
        path: "/person",
        name: "person",
        component: () => import("@/views/account/index.vue"),
        meta: { requireAuth: true }
      },
      {
        path: "/global-setting",
        name: "global-setting",
        component: () => import("@/views/global-setting/index.vue")
      },
      {
        path: "/account",
        name: "account",
        component: () => import("@/views/person-center/index.vue"),
        meta: { requireAuth: true }
      },
      {
        path: "/bonus",
        name: "bonus",
        component: () => import("@/views/bonus/index.vue"),
        meta: { requireAuth: true }
      },
      {
        path: "/security",
        name: "security",
        component: () => import("@/views/security/index.vue")
      },
      // {
      //   path: "/chat",
      //   name: "chat",
      //   component: () => import("@/views/chat/list.vue")
      // },
      {
        path: "/promotions",
        name: "promotions",
        component: () => import("@/views/promotions/index.vue")
      },
      {
        path: "/promotions/detail",
        name: "promotions-detail",
        component: () => import("@/views/promotions/detail.vue")
      },
      {
        path: "/game-list/:group",
        name: "game-list",
        component: () => import("@/views/game-list/index.vue")
      }
    ]
  },
  {
    path: "/",
    name: "wallet-layout",
    component: walletLayout,
    children: [
      {
        path: "/deposit",
        name: "deposit",
        component: () => import("@/views/deposit/index.vue")
      },
      {
        path: "/withdraw",
        name: "withdraw",
        component: () => import("@/views/withdraw/index.vue")
      },
      {
        path: "/withdraw-method",
        name: "withdraw-method",
        component: () => import("@/views/withdraw-method/index.vue")
      }
    ]
  },
  {
    path: "/",
    name: "access-layout",
    component: accessLayout,
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("@/views/login/index.vue")
      },
      {
        path: "/forget",
        name: "forget",
        component: () => import("@/views/forget/index.vue")
      },
      {
        path: "/regist",
        name: "regist",
        component: () => import("@/views/regist/index.vue"),
        props: route => ({inviteCode: route.query.inviteCode })
      }
    ]
  },

  {
    path: "/bounce",
    name: "bounce",
    component: () => import("@/views/bounce/index.vue")
  },
  {
    path: "/2d-game",
    name: "2d-game",
    component: () => import("@/views/2d-game/index.vue")
  },
  {
    path: "/notification",
    name: "notification",
    component: () => import("@/views/notification/index.vue")
  },
  {
    path: "/vip-club",
    name: "vip-club",
    component: () => import("@/views/vip-club/index.vue"),
    meta: { requireAuth: true }
  },
  {
    path: "/location",
    name: "location",
    component: () => import("@/views/location/index.vue")
  },
  {
    path: "/my-profile",
    name: "my-profile",
    component: () => import("@/views/my-profile/index.vue")
  },
  {
    path: "/edit-avatar",
    name: "edit-avatar",
    component: () => import("@/views/my-profile/edit-avatar.vue")
  },
  {
    path: "/phone-validate",
    name: "phone-validate",
    component: () => import("@/views/phone-validate/index.vue")
  },
  {
    path: "/code-validate",
    name: "code-validate",
    component: () => import("@/views/code-validate/index.vue")
  },
  {
    path: "/wallet-password",
    name: "wallet-password",
    component: () => import("@/views/wallet-password/index.vue")
  },
  {
    path: "/set-password",
    name: "set-password",
    component: () => import("@/views/set-password/index.vue")
  },
  {
    path: "/user-detail",
    name: "user-detail",
    component: () => import("@/views/user-detail/index.vue")
  },
  {
    path: "/user-statics",
    name: "user-statics",
    component: () => import("@/views/user-detail/statics.vue")
  },
  {
    path: "/master-medals",
    name: "master-medals",
    component: () => import("@/views/master-medals/index.vue")
  },
  {
    path: "/sic-bo",
    name: "sic-bo",
    component: () => import("@/views/sic-bo/index.vue")
  },
  {
    path: "/pk10",
    name: "pk10",
    component: () => import("@/views/pk10/index.vue")
  },
  {
    path: "/color",
    name: "color",
    component: () => import("@/views/color/index.vue")
  },
  {
    path: "/chat",
    name: "chat",
    component: () => import("@/views/chat/detail.vue")
  },
  {
    path: "/ac-detail",
    name: "ac-detail",
    component: () => import("@/views/bonus/ac-detail.vue"),
    meta: { requireAuth: true }
  },
  {
    path: "/account-records",
    name: "account-records",
    component: () => import("@/views/account-trans-records/index.vue"),
    meta: { requireAuth: true }
  }
  // {
  //   path: "/chat/detail",
  //   name: "chat-detail",
  //   component: () => import("@/views/chat/detail.vue")
  // }
];

// 创建路由实例并传递 `routes` 配置
const router = createRouter({
  // eslint-disable-next-line node/prefer-global/process
  history: createWebHistory(process.env.VUE_APP_PUBLIC_PATH),
  routes
});
let configFetched = false;

router.beforeEach(async (_to, _from, next) => {
  const configStore = useConfigStore();
  const loginStore = useLoginStore()
  const {access_token} = storeToRefs(loginStore)
  const isAuthenticated = !!access_token.value

  if (!configFetched) {
    const metaRes = await webConfig()

    if (metaRes.success) {
      const { title, icon, name, customerList, informationList } = metaRes.data;
      nextTick(() => {
        document.title = title || DEFAULT_TITLE;
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = icon || DEFAULT_FAVICON;
        document.getElementsByTagName('head')[0].appendChild(link)

        configStore.setMetaData({title, icon, name})
      });

      if (!!customerList.length) {
        configStore.setCustomerList(customerList);
      }
      if(!!informationList.length) {
        configStore.setInformationList(informationList);
      }
    }

  configFetched = true;
  }

  // 进入要token的路由，如果没有token则重定向到登录页面
  if (_to.matched.some(record => record.meta.requireAuth) && !isAuthenticated) {
    next({name: 'login'})
  }

  next();
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});

// 导出路由实例，并在 `main.ts` 挂载
export default router;
