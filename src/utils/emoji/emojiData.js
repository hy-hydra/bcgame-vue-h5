//模拟数据
var emojiData = {
    "imgArr": [
      {
        // 钉钉表情
        emojiName: "钉钉",
        emojiDemo:"./static/img/dingding/emotion_001.png",
        emojiSort: 0,
        minEmoji: true,
        emojiPath: "./static/img/dingding/",
        itemList: [
          {
            url: 'emotion_001.png',
            alt: '[微笑]'
          },
          {
            url: 'emotion_002.png',
            alt: '[憨笑]'
          },
          {
            url: 'emotion_003.png',
            alt: '[色]'
          },
          {
            url: 'emotion_004.png',
            alt: '[发呆]'
          },
          {
            url: 'emotion_005.png',
            alt: '[老板]'
          },
          {
            url: 'emotion_006.png',
            alt: '[流泪]'
          },
          {
            url: 'emotion_007.png',
            alt: '[害羞]'
          },
          {
            url: 'emotion_008.png',
            alt: '[闭嘴]'
          },
          {
            url: 'emotion_009.png',
            alt: '[睡]'
          },
          {
            url: 'emotion_010.png',
            alt: '[大哭]'
          },
          {
            url: 'emotion_011.png',
            alt: '[尴尬]'
          },
          {
            url: 'emotion_012.png',
            alt: '[愤怒]'
          },
          {
            url: 'emotion_013.png',
            alt: '[调皮]'
          },
          {
            url: 'emotion_014.png',
            alt: '[大笑]'
          },
          {
            url: 'emotion_015.png',
            alt: '[惊讶]'
          },
          {
            url: 'emotion_016.png',
            alt: '[流汗]'
          },
          {
            url: 'emotion_017.png',
            alt: '[广播]'
          },
          {
            url: 'emotion_018.png',
            alt: '[自信]'
          },
          {
            url: 'emotion_019.png',
            alt: '[你强]'
          },
          {
            url: 'emotion_020.png',
            alt: '[怒吼]'
          },
          {
            url: 'emotion_021.png',
            alt: '[惊愕]'
          },
          {
            url: 'emotion_022.png',
            alt: '[胜利]'
          },
          {
            url: 'emotion_023.png',
            alt: '[OK]'
          },
          {
            url: 'emotion_024.png',
            alt: '[鼓掌]'
          },
          {
            url: 'emotion_025.png',
            alt: '[握手]'
          },
          {
            url: 'emotion_026.png',
            alt: '[偷笑]'
          },
          {
            url: 'emotion_027.png',
            alt: '[无聊]'
          },
          {
            url: 'emotion_028.png',
            alt: '[加油]'
          },
          {
            url: 'emotion_029.png',
            alt: '[快哭了]'
          },
          {
            url: 'emotion_030.png',
            alt: '[吐]'
          },
          {
            url: 'emotion_031.png',
            alt: '[晕]'
          },
          {
            url: 'emotion_032.png',
            alt: '[摸头]'
          },
          {
            url: 'emotion_033.png',
            alt: '[疑惑]'
          },
          {
            url: 'emotion_034.png',
            alt: '[飞吻]'
          },
          {
            url: 'emotion_035.png',
            alt: '[唱歌]'
          },
          {
            url: 'emotion_036.png',
            alt: '[傻笑]'
          },
          {
            url: 'emotion_037.png',
            alt: '[鄙视]'
          },
          {
            url: 'emotion_038.png',
            alt: '[嘘]'
          },
          {
            url: 'emotion_039.png',
            alt: '[烦躁]'
          },
          {
            url: 'emotion_040.png',
            alt: '[思考]'
          },
          {
            url: 'emotion_041.png',
            alt: '[亲吻]'
          },
          {
            url: 'emotion_042.png',
            alt: '[无奈]'
          },
          {
            url: 'emotion_043.png',
            alt: '[感冒]'
          },
          {
            url: 'emotion_044.png',
            alt: '[对不起]'
          },
          {
            url: 'emotion_045.png',
            alt: '[再见]'
          },
          {
            url: 'emotion_046.png',
            alt: '[投降]'
          },
          {
            url: 'emotion_047.png',
            alt: '[哼]'
          },
          {
            url: 'emotion_048.png',
            alt: '[欠扁]'
          },
          {
            url: 'emotion_049.png',
            alt: '[拜托]'
          },
          {
            url: 'emotion_050.png',
            alt: '[可怜]'
          },
          {
            url: 'emotion_051.png',
            alt: '[舒服]'
          },
          {
            url: 'emotion_052.png',
            alt: '[爱意]'
          },
          {
            url: 'emotion_053.png',
            alt: '[挑衅]'
          },
          {
            url: 'emotion_054.png',
            alt: '[财迷]'
          },
          {
            url: 'emotion_055.png',
            alt: '[迷惑]'
          },
          {
            url: 'emotion_056.png',
            alt: '[委屈]'
          },
          {
            url: 'emotion_057.png',
            alt: '[灵感]'
          },
          {
            url: 'emotion_058.png',
            alt: '[天使]'
          },
          {
            url: 'emotion_059.png',
            alt: '[鬼脸]'
          },
          {
            url: 'emotion_060.png',
            alt: '[凄凉]'
          },
          {
            url: 'emotion_061.png',
            alt: '[郁闷]'
          },
          {
            url: 'emotion_062.png',
            alt: '[发烧]'
          },
          {
            url: 'emotion_063.png',
            alt: '[坏笑]'
          },
          {
            url: 'emotion_064.png',
            alt: '[算账]'
          },
          {
            url: 'emotion_065.png',
            alt: '[流鼻血]'
          },
          {
            url: 'emotion_066.png',
            alt: '[哭了]'
          },
          {
            url: 'emotion_067.png',
            alt: '[苦恼]'
          },
          {
            url: 'emotion_068.png',
            alt: '[发现]'
          },
          {
            url: 'emotion_069.png',
            alt: '[干活]'
          },
          {
            url: 'emotion_070.png',
            alt: '[忍耐]'
          },
          {
            url: 'emotion_071.png',
            alt: '[大兵]'
          },
          {
            url: 'emotion_072.png',
            alt: '[二哈]'
          },
          {
            url: 'emotion_073.png',
            alt: '[猫咪]'
          },
          {
            url: 'emotion_074.png',
            alt: '[秋犬]'
          },
          {
            url: 'emotion_075.png',
            alt: '[财神]'
          },
          {
            url: 'emotion_076.png',
            alt: '[女孩]'
          },
          {
            url: 'emotion_077.png',
            alt: '[男孩]'
          },
          {
            url: 'emotion_078.png',
            alt: '[特警]'
          },
          {
            url: 'emotion_079.png',
            alt: '[小偷]'
          },
          {
            url: 'emotion_080.png',
            alt: '[炸弹]'
          },
          {
            url: 'emotion_081.png',
            alt: '[红包]'
          },
          {
            url: 'emotion_082.png',
            alt: '[支付宝]'
          },
          {
            url: 'emotion_083.png',
            alt: '[元宝]'
          },
          {
            url: 'emotion_084.png',
            alt: '[购物]'
          },
          {
            url: 'emotion_085.png',
            alt: '[招财]'
          },
          {
            url: 'emotion_086.png',
            alt: '[礼物]'
          },
          {
            url: 'emotion_087.png',
            alt: '[爱心]'
          },
          {
            url: 'emotion_088.png',
            alt: '[心碎]'
          },
          {
            url: 'emotion_089.png',
            alt: '[红唇]'
          },
          {
            url: 'emotion_090.png',
            alt: '[玫瑰]'
          },
          {
            url: 'emotion_091.png',
            alt: '[枯萎]'
          },
          {
            url: 'emotion_092.png',
            alt: '[飞机]'
          },
          {
            url: 'emotion_093.png',
            alt: '[红酒]'
          },
          {
            url: 'emotion_094.png',
            alt: '[点赞]'
          },
          {
            url: 'emotion_095.png',
            alt: '[佩服]'
          },
          {
            url: 'emotion_096.png',
            alt: '[手机]'
          },
          {
            url: 'emotion_097.png',
            alt: '[邮件]'
          },
          {
            url: 'emotion_098.png',
            alt: '[晚上]'
          },
          {
            url: 'emotion_099.png',
            alt: '[闹钟]'
          },
          {
            url: 'emotion_100.png',
            alt: '[沙漏]'
          },
          {
            url: 'emotion_101.png',
            alt: '[骷髅]'
          },
          {
            url: 'emotion_102.png',
            alt: '[抱抱]'
          },
          {
            url: 'emotion_103.png',
            alt: '[蛋糕]'
          },
          {
            url: 'emotion_104.png',
            alt: '[打招呼]'
          },
          {
            url: 'emotion_105.png',
            alt: '[送花]'
          },
          {
            url: 'emotion_106.png',
            alt: '[满分]'
          },
          {
            url: 'emotion_107.png',
            alt: '[对了]'
          },
          {
            url: 'emotion_108.png',
            alt: '[黑人问号]'
          },
          {
            url: 'emotion_109.png',
            alt: '[惊喜]'
          },
          {
            url: 'emotion_110.png',
            alt: '[呲牙]'
          },
          {
            url: 'emotion_111.png',
            alt: '[笑哭]'
          },
          {
            url: 'emotion_112.png',
            alt: '[滑稽]'
          },
          {
            url: 'emotion_113.png',
            alt: '[捂脸哭]'
          },
          {
            url: 'emotion_114.png',
            alt: '[抠鼻]'
          },
          {
            url: 'emotion_115.png',
            alt: '[流鼻血]'
          },
          {
            url: 'emotion_116.png',
            alt: '[敲打]'
          },
          {
            url: 'emotion_117.png',
            alt: '[耶]'
          },
          {
            url: 'emotion_118.png',
            alt: '[可爱]'
          },
          {
            url: 'emotion_119.png',
            alt: '[好棒]'
          },
          {
            url: 'emotion_120.png',
            alt: '[白眼]'
          },
           {
            url: 'emotion_121.png',
            alt: '[明白]'
          },
          {
            url: 'emotion_122.png',
            alt: '[回头]'
          },
          {
            url: 'emotion_123.png',
            alt: '[冷汗]'
          },
          {
            url: 'emotion_124.png',
            alt: '[一团糟]'
          },
          {
            url: 'emotion_125.png',
            alt: '[不看]'
          },
          {
            url: 'emotion_126.png',
            alt: '[吃瓜]'
          },
          {
            url: 'emotion_127.png',
            alt: '[偷看]'
          },
          {
            url: 'emotion_128.png',
            alt: '[彩虹]'
          },
          {
            url: 'emotion_129.png',
            alt: '[一团乱麻]'
          },
          {
            url: 'emotion_130.png',
            alt: '[工作]'
          },
          {
            url: 'emotion_131.png',
            alt: '[服了]'
          },
          {
            url: 'emotion_132.png',
            alt: '[跪了]'
          },
          {
            url: 'emotion_133.png',
            alt: '[很无奈]'
          },
          {
            url: 'emotion_134.png',
            alt: '[要抱抱]'
          },
          {
            url: 'emotion_135.png',
            alt: '[绩效]'
          },
          {
            url: 'emotion_136.png',
            alt: '[钉钉]'
          },
          {
            url: 'emotion_137.png',
            alt: '[思索]'
          },
          {
            url: 'emotion_138.png',
            alt: '[要发烧]'
          },
          {
            url: 'emotion_139.png',
            alt: '[左拳]'
          },
          {
            url: 'emotion_140.png',
            alt: '[右拳]'
          },
        ]
      },
      {
        // 微信表情
        emojiName: "微信",
        emojiDemo: "./static/img/dingding/emotion_002.png",
        emojiSort: 0,
        minEmoji: true,
        emojiPath: "./static/img/dingding/",
        itemList: [
          {
          url: 'emotion_001.png',
          alt: '[微笑]'
          },
          {
            url: 'emotion_002.png',
            alt: '[憨笑]'
          },
          {
            url: 'emotion_003.png',
            alt: '[色]'
          },
          {
            url: 'emotion_004.png',
            alt: '[发呆]'
          },
          {
            url: 'emotion_005.png',
            alt: '[老板]'
          },
          {
            url: 'emotion_006.png',
            alt: '[流泪]'
          },]
      },
      {
        // QQ表情
        emojiName: "QQ",
        emojiDemo: "./static/img/dingding/emotion_003.png",
        emojiSort: 0,
        minEmoji: true,
        emojiPath: "./static/img/dingding/",
        itemList: []
      },
      {
        // QQ表情
        emojiName: "QQ",
        emojiDemo: "./static/img/dingding/emotion_003.png",
        emojiSort: 0,
        minEmoji: true,
        emojiPath: "./static/img/dingding/",
        itemList: []
      },
      {
        // QQ表情
        emojiName: "QQ",
        emojiDemo: "./static/img/dingding/emotion_003.png",
        emojiSort: 0,
        minEmoji: true,
        emojiPath: "./static/img/dingding/",
        itemList: []
      },
      {
        // QQ表情
        emojiName: "QQ",
        emojiDemo: "./static/img/dingding/emotion_003.png",
        emojiSort: 0,
        minEmoji: true,
        emojiPath: "./static/img/dingding/",
        itemList: []
      },
      {
        // QQ表情
        emojiName: "QQ",
        emojiDemo: "./static/img/dingding/emotion_003.png",
        emojiSort: 0,
        minEmoji: true,
        emojiPath: "./static/img/dingding/",
        itemList: []
      },
      {
        // QQ表情
        emojiName: "QQ",
        emojiDemo: "./static/img/dingding/emotion_003.png",
        emojiSort: 0,
        minEmoji: true,
        emojiPath: "./static/img/dingding/",
        itemList: []
      },
      {
        // QQ表情
        emojiName: "QQ",
        emojiDemo: "./static/img/dingding/emotion_003.png",
        emojiSort: 0,
        minEmoji: true,
        emojiPath: "./static/img/dingding/",
        itemList: []
      },
      {
        // QQ表情
        emojiName: "QQ",
        emojiDemo: "./static/img/dingding/emotion_003.png",
        emojiSort: 0,
        minEmoji: true,
        emojiPath: "./static/img/dingding/",
        itemList: []
      },
      {
        // QQ表情
        emojiName: "QQ",
        emojiDemo: "./static/img/dingding/emotion_003.png",
        emojiSort: 0,
        minEmoji: true,
        emojiPath: "./static/img/dingding/",
        itemList: []
      },
    ]
  }
  
  // export与export default均可用于导出常量、函数、文件、模块等
  // 在一个文件或模块中，export、import可以有多个，export default仅有一个
  // 通过export方式导出，在导入时要加{ }，export default则不需要
  // export能直接导出变量表达式，export default不行。
  
  export default emojiData;
  
