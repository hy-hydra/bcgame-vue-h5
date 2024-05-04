/**
 * 文件内容：赢家相关接口数据类型
 * 创建者：dy_au
 * 创建日子：2024.04.26
 * 最后编辑：dy_au
 * 最后编辑日子：
 */

declare namespace BannerTypeAPITypes {
  // 游戏信息
  type TGame = {
    gameId?: number; // 游戏id
    icon?: string; // 游戏图标
    name?: string; // 游戏名
    sort?: number; // 游戏排序
    link?: string; // 跳转链接
    jumpLink?: boolean; // 是否跳转
  };

  // 赢奖跑马灯
  type TGameWinMarquee = {
    uid?: number; // 用户id
    name?: string; // 赢家昵称
    avatar?: string; // 赢家头像
    winRate?: number; // 赢率
    winAmount?: number; // 赢取金额
    winId?: string; // id
    currency?: number; // 货币单位
    payOut?: number; //支出信息
    betId?: string; // 押注id
    game?: TGame; // 游戏信息
    totalWin?: number; //总赢钱
  };
}
