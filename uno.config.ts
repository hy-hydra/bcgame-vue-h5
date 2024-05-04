import { defineConfig, presetAttributify, presetUno, presetWind } from "unocss";
import presetRemToPx from "@unocss/preset-rem-to-px";

// 刚使用unocss的朋友，可以借助这个工具： https://to-unocss.netlify.app

function color(variable) {
  return val => {
    if (val.opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${val.opacityValue})`;
  };
}
export default defineConfig({
  theme: {
    colors: {
      fog: {
        1: "var(--fog-1)",
        2: "var(--fog-2)",
        3: "var(--fog-3)",
        4: "var(--fog-4)",
        5: "var(--fog-5)",
        6: "var(--fog-6)",
        7: "var(--fog-7)",
        8: "var(--fog-8)",
        9: "var(--fog-9)",
        10: "var(--fog-10)",
        11: "var(--fog-11)",
        12: "var(--fog-12)",
        13: "var(--fog-13)",
        14: "var(--fog-14)",
        15: "var(--fog-15)",
        16: "var(--fog-16)",
        17: "var(--fog-17)",
        18: "var(--fog-18)",
        19: "var(--fog-19)",
        20: "var(--fog-20)",
        21: "var(--fog-21)",
        22: "var(--fog-22)",
        23: "var(--fog-23)",
        24: "var(--fog-24)",
        25: "var(--fog-25)",
        26: "var(--fog-26)",
        27: "var(--fog-27)",
        28: "var(--fog-28)",
        29: "var(--fog-29)",
        30: "var(--fog-30)",
        31: "var(--fog-31)",

        32: "var(--fog-32)",
        33: "var(--fog-33)",
        34: "var(--fog-34)",
        35: "var(--fog-35)",
        36: "var(--fog-36)",
        37: "var(--fog-37)",
        38: "var(--fog-38)",
        39: "var(--fog-39)",
        40: "var(--fog-40)",
        41: "var(--fog-41)",
        42: "var(--fog-42)",
        43: "var(--fog-43)",
        44: "var(--fog-44)",
        45: "var(--fog-45)",
        46: "var(--fog-46)",
        47: "var(--fog-47)",
        48: "var(--fog-48)",
        49: "var(--fog-49)",
        50: "var(--fog-50)",
        51: "var(--fog-51)",
        52: "var(--fog-52)",
        53: "var(--fog-53)",
        54: "var(--fog-54)",
        55: "var(--fog-55)",
        56: "var(--fog-56)",
        57: "var(--fog-57)",
        58: "var(--fog-58)"
      },
      text: {
        1: "var(--text-1)",
        2: "var(--text-2)",
        3: "var(--text-3)",
        4: "var(--text-4)",
        5: "var(--text-5)",
        6: "var(--text-6)",
        7: "var(--text-7)",
        8: "var(--text-8)",
        9: "var(--text-9)",
        10: "var(--text-10)",
        11: "var(--text-11)",
        12: "var(--text-12)",
        13: "var(--text-13)",
        14: "var(--text-14)",
        15: "var(--text-15)",
        16: "var(--text-16)",
        17: "var(--text-17)",
        18: "var(--text-18)",
        19: "var(--text-19)",
        20: "var(--text-20)",
        21: "var(--text-21)",
        22: "var(--text-22)",
        23: "var(--text-23)",
        24: "var(--text-24)",
        25: "var(--text-25)"
      },
      shadow: {
        1: "var(--shadow-1)",
        2: "var(--shadow-2)"
      },
      border: {
        1: "var(--border-1)",
        2: "var(--border-2)",
        3: "var(--border-3)",
        4: "var(--border-4)",
        5: "var(--border-5)",
        6: "var(--border-6)",
        7: "var(--border-7)",
        8: "var(--border-8)",
        9: "var(--border-9)",
        10: "var(--border-10)",
        11: "var(--border-11)",
        12: "var(--border-12)",
        13: "var(--border-13)",
        14: "var(--border-14)",
        15: "var(--border-15)"
      }
    }
  },
  presets: [
    presetWind,
    presetAttributify,
    // 为什么要用到这个插件？
    // 模板使用 viewport 作为移动端适配方案，unocss 默认单位为 rem
    // 所以需要转成 px，然后由 postcss 把 px 转成 vw/vh，完成适配
    presetRemToPx({
      // 这里为什么要设置基础字体大小？看下面这篇文章
      // https://juejin.cn/post/7262975395620618298
      baseFontSize: 4
    })
  ]
});
