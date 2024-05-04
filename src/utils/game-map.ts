interface GameInfo {
  router: string;
}

// 映射对象
export const gamesMapping: Record<number, GameInfo> = {
  1:{ router: "color" },
  2: { router: "color" },
  3:{ router: "color" },
  4: { router: "color" },
  6:{ router: "pk10" },
  5: { router: "pk10" },
  7: { router: "2d-game" },
  8: { router: "2d-game" },
  9: { router: "2d-game" },
  10: { router: "2d-game" },
  11: { router: "dice60" },
  12: { router: "dice180" },
  13: { router: "dice300" },
  14: { router: "sic-bo" },
  15: { router: "sic-bo" },
  16: { router: "sic-bo" },
  10001: { router: "sweep" },
  10002: { router: "hilo" },
  10006: { router: "crash" },
  10010: { router: "wheel" },
  10008: { router: "limbo"},
  10009: { router: "plinko"},
  10007:{ router: "keno"},
  10004:{ router: "classicdice"},
  10011:{ router: "dice"},
  10005:{ router: "hashdice"},
  12004:{ router: "ox"},
  12005:{ router: "fortune_mouse"},


  
};