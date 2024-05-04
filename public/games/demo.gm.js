import { Container, Graphics, Sprite, Texture, Assets, BitmapText, EventEmitter, BlurFilter } from 'pixi.js';
import { gsap } from 'gsap';

class SlotColumnNew extends Container {

    constructor({ slot, size, count, names, rowid }) {
        super();
        this.items = [];
        this.rect = [];
        this.size = size || [100, 100];
        this.gap = 30;
        this.count = count || 3;
        this.slot = slot;
        this.rowid = rowid;

        //初始化的默认值
        this.def_items = names || [];

        this.animation = {
            delay: 1,
            duration: 1,
            ease: "line"
        };

        this.object = {
            position: 0,
            previousPosition: 0,
        };

        this.extra = 10;

        this.maskObj = new Graphics;

        this.callFun = null;// 回调方法
        this.callObj = null;// 回调类
        this.running = false;
        this.init();

        this.results = null;// 最后结果
        this.icons = null;
        this.iconTextures = null;
    }
    setSpinOver(callFun, callObj){
        this.callFun = callFun;
        this.callObj = callObj;
    }
    getRunningFlg(){
        return this.running;
    }
    spin(results, icons, iconTextures) {
        this.results = results;
        this.icons = icons;
        this.iconTextures = iconTextures;

        console.log("SlotColumn Spin-----");
        const { animation, object, extra } = this;
        const self = this;

        object.position = 0;
        object.previousPosition = 0;
        self.running = true;

        gsap.to(object, {
            ...animation,
            position: extra,
            onComplete: _ => {
                self.running = false;
                self.callFun.call(self.callObj);
                console.log("SlotColumn end=======pos:");
                for(let i in self.items){
                    console.log(self.items[i].y);
                }
            }
        });

    }
    update(d) {
        const {items,object,slot} = this;
        const cellH = this.size[1] / 2 + 20 - (this.size[1] + this.gap);
        const cellH2 = this.size[1] + this.gap;
        const position = object.position;
        const cellW = this.size[1] + this.gap;

        for (let i = 0,l=items.length;i<l;i++) {
            const s = items[i];
            const prevy = s.y;

            s.y =  cellH + ((position + i) % (items.length)) * cellH2;


            if (s.y < 0 && prevy > cellH) {
                if(i-1 >= 0 && this.rowid == 1){
                    // console.log("替换texture：",this.icons[this.results[i-1].icon], this.iconTextures);
                    s.texture = this.iconTextures[this.icons[this.results[i-1].icon]];
                    s.scale.x = s.scale.y = Math.min(cellW / s.texture.width, cellW / s.texture.height);
                }
                else if(i >= 0 && i != 2  && this.rowid == 0){
                    s.texture = this.iconTextures[this.icons[this.results[(i + 1) % 4].icon]];
                    s.scale.x = s.scale.y = Math.min(cellW / s.texture.width, cellW / s.texture.height);
                }
                else if(i >= 0 && i != 2 && this.rowid == 2){
                    s.texture = this.iconTextures[this.icons[this.results[(i-1 + 2) % 4].icon]];
                    s.scale.x = s.scale.y = Math.min(cellW / s.texture.width, cellW / s.texture.height);
                }
            }
        }
    }
    init() {

        const { def_items, count, slot } = this;

        console.log("Slot items:", def_items, count, slot);

        for (let i = 0, l = count+1; i < l; i++) {
            // const s = new Sprite(slot.getTexture(def_items[i]));
            const s = new Sprite(slot[def_items[i]] || slot["hongniu"]);
            s.anchor.set(.5, .5);
            this.items.push(s);
            this.addChild(s);
        }

        this.once("added",_=>{
            this.addChild(this.maskObj);
        });

        this.resize();
    }

    resize() {

        const cellW = this.size[1] + this.gap;
        this.children.forEach((s, i) => {
            if (i === 0) {
                // s.y = 0;
                s.y = this.size[1] / 2 + 20 + (i-1) * cellW;
            } else {
                s.y = (i - 1) * cellW + this.size[1] / 2 + 20;
            }

            if(s.texture){
                s.scale.x = s.scale.y = Math.min(cellW / s.texture.width, cellW / s.texture.height);

            }
        });
       
        let mask = this.maskObj;
        mask.clear();
        mask.beginFill(0xffffff);
        mask.drawRect(0, 0, cellW, cellW*this.count);
        mask.endFill();
        mask.x = -cellW/2;
        mask.y = 0;

        this.mask = this.maskObj;



    }
}

var uiconfig = {
  viewWidth:1080,
  viewHieght:1920,
  name:"slots.ox",
  direction:"v", // v | h
  config:{
    intervalTime: 133,// 单位：毫秒
    rollTime: 2666,// 单位：毫秒
    rollNum: [38, 21, 22], // 滚落个数
    size:[200, 200], // 滚动物品的尺寸
    count:[3,4,3],// 显示个数
    names:[
        ["bianpao","qianbao","hongbao"],
        ["bianpao","qianbao","hongbao","yuanbao"],//yuanbao
        ["bianpao","qianbao","hongbao"],
    ],// 每列的名字集合
    icons:{
        0:"bianpao",
        1:"juzi",
        2:"hongbao",
        3:"qianbao",
        4:"baoxiang",
        5:"yuanbao",
        6:"hongniu",
    },
    // 整体slotContainer的坐标
    reelPos:{
        x:230,
        y:270,
    },
    // 每一条slot的坐标
    slotColPos:[
        {
            x:0,
            y:130,
        },
        {
            x:310,
            y:0,
        },
        {
            x:640,
            y:130,
        }
    ]
  },

  assets:[
    {
        alias:"bg",
        src:"bg.jpg"
    },
    {
        alias: 'bianpao',
        src: 'zxc4.png',
    },{
        alias: 'qianbao',
        src: 'zxc5.png',
    },{
        alias: 'hongbao',
        src: 'zxc6.png',
    },{
        alias: 'yuanbao',
        src: 'zxc7.png',
    },{
        alias: 'baoxiang',
        src: 'zxc8.png',
    },{
        alias: 'juzi',
        src: 'zxc31.png',
    },{
        alias: 'hongniu',
        src: 'zxc32.png',
    },
    {
        alias: 'niu',
        src: 'zxc11.png',
    },
    {
        alias: 'gonggao',
        src: 'zxc9.png',
    },
    {
        alias: 'gonggaozi',
        src: 'zxc10.png',
    },
    {
        alias: 'bt',
        src: 'zxc29.png',
    },
    {
        alias: 'btbg',
        src: 'zxc30.png',
    },
    {
        alias: 'turbo',
        src: 'zxc16.png',
    },
    {
        alias: 'auto',
        src: 'zxc20.png',
    },
    {
        alias: 'jia',
        src: 'zxc19.png',
    },
    {
        alias: 'jian',
        src: 'zxc17.png',
    },
    {
        alias: 'numbg',
        src: 'zxc12.png',
    },
    {
        alias: 'walleticon',
        src: 'zxc13.png',
    },
    {
        alias: 'moneyicon',
        src: 'zxc14.png',
    },
    {
        alias: 'winicon',
        src: 'zxc15.png',
    }
  ],

public:"./slots/ox/",

objects:[

    {
        name:"bg",
        tex:"bg"
    },
    {
        name:"gonggao",
        tex:"gonggao",
        anchor:"cc",
        x:542,
        y:1246,
    },
    {
        name:"gonggaozi",
        tex:"gonggaozi",
        anchor:"cc",
        x:520,
        y:1246,

    },
    {
        name:"btbg",
        tex:"btbg",
        anchor:"cc",
        layout:"ct",
        x:544,
        y:1940,
    }, {
        name:"bt",
        tex:"bt",
        layout:"ct",
        anchor:"cc",
        x:544,
        y:1905,
        event:{
            tap:"spin"
        }
    },
    {
        name:"turbo",
        tex:"turbo",
        anchor:"cc",
        x:119,
        y:1874,
    },
    {
        name:"niu",
        tex:"niu",
        anchor:"cb",
        layout:"ct",
        x:119,
        y:1672,
    },
    {
        name:"jian",
        tex:"jian",
        anchor:"cc",
        x:286,
        y:1879,
        event:{
            tap:"decline"
        }
    },
    {
        name:"jia",
        tex:"jia",
        anchor:"cc",
        x:790,
        y:1879,
        event:{
            tap:"add"
        }
    },
    {
        name:"auto",
        tex:"auto",
        anchor:"cc",
        x:956,
        y:1874
    },
    {
        name:"walletbg",
        tex:"numbg",
        anchor:"cc",
        x:182,
        y:1710
    },
    {
        name:"walleticon",
        tex:"walleticon",
        anchor:"cc",
        x:44,
        y:1710
    },
    {
        name:"moneybg",
        tex:"numbg",
        anchor:"cc",
        x:540,
        y:1710
    },
    {
        name:"moneyicon",
        tex:"moneyicon",
        anchor:"cc",
        x:399,
        y:1710
    },
    {
        name:"winbg",
        tex:"numbg",
        anchor:"cc",
        x:896,
        y:1710
    },
    {
        name:"winicon",
        tex:"winicon",
        anchor:"cc",
        x:756,
        y:1710
    }
]
};

const anchorMap = {
    c:.5,
    l:0,
    t:0,
    b:1,
    r:1
};

const BASE = {
    x:0,
    y:0,
    anchor:"lt",
    layout:"lt",
};


class UIClass {
    constructor({config,container}){

        this.config = config;
        this.container = container || new Container;
        this.assets = null;
        this.objects = {};
        this.methods = {};

    }
    async init(){

        await this.load();
        this.parse();
    }

    resize(width){
        let scale = width/this.config.viewWidth;
        this.container.scale.set(scale,scale);
    }

    getObject(name){
        return this.objects[name];
    }

    parse(){

        const {assets,container,config} = this;
        const {objects,viewWidth,viewHieght} = config;
        const selfobjs = this.objects;
        objects.forEach( (o,i)=>{

            let c = Object.assign({},BASE,o);
            const tex = assets[o.tex];

            if(!tex){
                console.warn(`${c.name},缺少材质：${c.tex}`);
            }
            let s = new Sprite(tex||Texture.WHITE);

            let lx = c.layout[0];

            switch(lx){
                case "l": s.x = c.x;break;
                case "c": s.x = viewWidth>>1;break;
                case "r": s.x = viewWidth-c.x;break;
            }

            let ly = c.layout[1];

            switch(ly){
                case "t": s.y = c.y;break;
                case "c": s.y = viewHieght>>1;break;
                case "b": s.y = viewHieght-c.y;break;
            }
            
            if(typeof o.anchor ==='string'){
                let ax = anchorMap[c.anchor[0]];
                let ay = anchorMap[c.anchor[1]];
                s.anchor.set(ax,ay);
            }
            
            if(c.event){
                s.eventMode = 'static';
                for(let k in c.event){
                    s.on(k,this.evenHandle.bind(this, s, c.event[k]));
                }

            }

            selfobjs[o.name] = s;
            container.addChild(s);
        });
    }
    
    evenHandle(object,name,e){
        if(this.methods[name]){
            this.methods[name](object,e);
        }
    }

    async load(){
        const { assets, name } = this.config;
        Assets.resolver.basePath = this.config.public;        
        Assets.addBundle(name,assets);
        this.assets = await Assets.loadBundle(name);
    }
    
}

const setup = app =>{

    const container = new Container;
    let ui = new UIClass({config:uiconfig,container});
    const moneyText = new BitmapText();
    const betText = new BitmapText();
    const winText = new BitmapText();
    const agent = new EventEmitter;

    agent.on("start", (...args)=>{
        console.log("监听开始事件。。。", args);
        // ctrl.startPlay();
        // ctrl.wins = 100;
    });

    agent.on("startSpin", (...args)=>{
        console.log("服务端发来信息，开始旋转：", ...args);
        // ctrl.startPlay();
        // ctrl.wins = args.data;
    });

    const methods = {
        spin(object,e){
            // startPlay();
            console.log('点击开始：', object, e);
            // ctrl.startPlay();
            agent.emit("start");
            ctrl.wins = Math.floor(Math.random() * 2 * 100);
            // gsap.to(object, {
            //     yoyo:false,
            //     repeat:2,
            //     pixi: { scaleX: 2, scaleY: 2,  rotation: 60 },
            //     duration: 1,
            //     onComplete(){
            //         object.scale.x = 1;
            //         object.scale.y = 1;
            //     }
            //   });

        },
        decline(object,e){
            // 减少押注金额
            console.log("click decline");
        },
        add(object,e){
            // 增加押注金额
            console.log("click add");
        }
    };

    ui.methods = methods;

    const ctrl = {
      
        container,
        //实际应用的尺寸

        width:info.viewWidth,
        height:info.viewHeight,
        moneyText,
        betText,
        winText,
        wins: 0,
        agent,

        // getAgent(){
        //     return agent
        // },

        slotTextures:[],
        // Build the reels
        reels : [],
        reelContainer: Container,
        
        async init(){


            this.width = app.pixi.screen.width;

            await ui.init();
            ui.resize(this.width);
            new Sprite(ui.assets['bg']);
            // container.addChild(s);
            ui.parse();

            this.reelContainer = new Container;
            this.slotTextures = [
                // Texture.from("./slots/ox/zxc4.png"),
                // Texture.from("./slots/ox/zxc5.png"),
                // Texture.from("./slots/ox/zxc6.png"),
                // Texture.from("./slots/ox/zxc7.png"),
                // Texture.from("./slots/ox/zxc8.png"),
                ui.assets['bianpao'],
                ui.assets['qianbao'],
                ui.assets['hongbao'],
                ui.assets['yuanbao'],
                ui.assets['baoxiang'],
            ];
        },
        start(){

        },
        update( d ){

            ui.objects.bt.rotation += 0.03;

            // this.reelUpdate();
            // this.tweenUpdate();
            // console.log(this.running);
            if(this.running){
                for(let i = 0;i < this.reels.length;i++){
                    this.reels[i].update(d);
                }
            }

        },
        reset(){},
        //需要实现布局方法，如果尺寸有变动。
        layout(){


        },
        async mount(){

            console.log("mount");
            console.log("展示Reel结束");
            // this.container.addChild(new Sprite(this.slotTextures[0]));
            // this.container.addChild(new Sprite(ui.assets["niu"]));

            // this.showSlots();

            this.listReels();

            this.showWinText();
        },
        unmount(){
            console.log("unmount");
            
        },
        destroy(){
            console.log("destroy");

        },

        showWinText(){
            this.moneyText = new BitmapText(
                '$12000', {
                align: "center",
                fontName: "lan",
                fontSize: 32,
                tint: 0xa8ccf0
            });
            this.moneyText.anchor.set(0.5);
            this.moneyText.x = 182 + 20;
            this.moneyText.y = 1710;
            this.container.addChild(this.moneyText);

            this.betText = new BitmapText(
                '$100', {
                align: "center",
                fontName: "lan",
                fontSize: 32,
                tint: 0xa8ccf0
            });
            this.betText.anchor.set(0.5);
            this.betText.x = 540 + 20;
            this.betText.y = 1710;
            this.container.addChild(this.betText);

            this.winText = new BitmapText(
                '$120', {
                align: "center",
                fontName: "lan",
                fontSize: 32,
                tint: 0xa8ccf0
            });
            this.winText.anchor.set(0.5);
            this.winText.x = 896 + 20;
            this.winText.y = 1710;
            this.container.addChild(this.winText);
        },

        listReels(){
            // Build the reels
            // const reels = [];
            // const reelContainer = new Container();

            for (let i = 0; i < 3; i++)
            {
                let slot = {};
                for(let k = 0;k < uiconfig.config.names[i].length;k++){
                    slot[uiconfig.config.names[i][k]] = ui.assets[uiconfig.config.names[i][k]];
                }
                // slot["yuanbao"] = ui.assets["yuanbao"];
                slot["hongniu"] = ui.assets["hongniu"];
                console.log("纹理数据：", slot);
                // const rc = new Container();
                const rc = new SlotColumnNew({slot: slot, size:uiconfig.config.size, count:uiconfig.config.count[i], names:uiconfig.config.names[i], rowid:i});

                rc.setSpinOver(this.reelsComplete,this);
                // rc.x = i * REEL_WIDTH;
                rc.x = uiconfig.config.slotColPos[i].x;//i==0?0:(i==1?310:640);
                rc.y = uiconfig.config.slotColPos[i].y;//i==1?0:130;
                this.reelContainer.addChild(rc);

                ({
                    container: rc,
                    symbols: [],
                    position: 0,
                    previousPosition: 0,
                    blur: new BlurFilter(),
                });
                this.reels.push(rc);

                // const reelMask = new Graphics().rect(i==0?-110:(i==1?200:530), i==1?0:130, 220, i==1?900:680).fill({ color: 0x0, alpha: 0.2 });
                // this.reelContainer.addChild(reelMask);

                // rc.mask = reelMask;

                // reel.blur.blurX = 0;
                // reel.blur.blurY = 0;
                // rc.filters = [reel.blur];

                // // Build the symbols
                // for (let j = 0; j < (i==1?6:5); j++)
                // {
                //     const symbol = new Sprite(this.slotTextures[Math.floor(Math.random() * this.slotTextures.length)]);
                //     // Scale the symbol to fit symbol area.

                //     symbol.y = j * SYMBOL_SIZE;
                //     symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
                //     symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);
                //     reel.symbols.push(symbol);
                //     rc.addChild(symbol);
                // }
                // this.reels.push(reel);

                // const reelMask = new Graphics().rect(i==0?0:(i==1?330:640), i==1?0:130, 210, i==1?880:660).fill({ color: 0x0, alpha: 0.1 });
                // this.reelContainer.addChild(reelMask);
                // rc.mask = reelMask;
            }
            this.reelContainer.x = uiconfig.config.reelPos.x;
            this.reelContainer.y = uiconfig.config.reelPos.y;
            container.addChild(this.reelContainer);
        },
        running : false,

        // Function to start playing.
        startPlay()
        {
            const self = this;
            if (self.running){ return console.log("结束。。。"); }

            self.running = true;

            let results = [
                [{x: 0, icon: 0, y: 0},{x: 0, icon: 4, y: 1},{x: 0, icon: 0, y: 2}],
                [{x: 1, icon: 0, y: 0},{x: 1, icon: 5, y: 1},{x: 1, icon: 0, y: 2},{x: 1, icon: 1, y: 3}],
                [{x: 2, icon: 2, y: 0},{x: 2, icon: 0, y: 1},{x: 2, icon: 3, y: 2}]
            ];
            let slots = {};
            for(let k in uiconfig.config.icons){
                slots[uiconfig.config.icons[k]] = ui.assets[uiconfig.config.icons[k]];
            }

            for (let i = 0; i < self.reels.length; i++)
            {
                setTimeout(()=>{
                    self.reels[i].spin(results[i], uiconfig.config.icons, slots);
                }, i * uiconfig.config.intervalTime + 10);
                
                // const r = this.reels[i];
                // const extra = Math.floor(Math.random() * 3);
                // const target = r.position + 10 + i * 5 + extra;
                // const time = 2500 + i * 600 + extra * 600;

                // this.tweenTo(r, 'position', target, time, this.backout(0.5), null, i === this.reels.length - 1 ? this.reelsComplete.bind(this) : null);
            }
        },
        // Reels done handler.
        reelsComplete()
        {
            let runningFlg = false;
            for(let i in this.reels){
                if(this.reels[i].getRunningFlg()){
                    runningFlg = true;
                    break;
                }
            }
            this.running = runningFlg;
            console.log("结束slots", this.running);
            if(!this.running){
                this.winText.text = "$" + this.wins;
            }
        },
        reelUpdate(){
            const SYMBOL_SIZE = 220;
            // Update the slots.
            for (let i = 0; i < this.reels.length; i++)
            {
                const r = this.reels[i];
                // Update blur filter y amount based on speed.
                // This would be better if calculated with time in mind also. Now blur depends on frame rate.

                r.blur.blurY = (r.position - r.previousPosition) * 8;
                r.previousPosition = r.position;

                // Update symbol positions on reel.
                for (let j = 0; j < r.symbols.length; j++)
                {
                    const s = r.symbols[j];
                    const prevy = s.y;

                    s.y = ((r.position + j) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;
                    if (s.y < 0 && prevy > SYMBOL_SIZE)
                    {
                        // Detect going over and swap a texture.
                        // This should in proper product be determined from some logical reel.
                        s.texture = this.slotTextures[Math.floor(Math.random() * this.slotTextures.length)];
                        s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height);
                        s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
                    }
                }
            }
        },
        // Very simple tweening utility function. This should be replaced with a proper tweening library in a real product.
        tweening : [],

        tweenTo(object, property, target, time, easing, onchange, oncomplete)
        {
            const tween = {
                object,
                property,
                propertyBeginValue: object[property],
                target,
                easing,
                time,
                change: onchange,
                complete: oncomplete,
                start: Date.now(),
            };

            this.tweening.push(tween);

            return tween;
        },
        tweenUpdate(){
            const now = Date.now();
            const remove = [];

            for (let i = 0; i < this.tweening.length; i++)
            {
                const t = this.tweening[i];
                const phase = Math.min(1, (now - t.start) / t.time);

                t.object[t.property] = this.lerp(t.propertyBeginValue, t.target, t.easing(phase));
                if (t.change) t.change(t);
                if (phase === 1)
                {
                    t.object[t.property] = t.target;
                    if (t.complete) t.complete(t);
                    remove.push(t);
                }
            }
            for (let i = 0; i < remove.length; i++)
            {
                this.tweening.splice(this.tweening.indexOf(remove[i]), 1);
            }
        },
        // Basic lerp funtion.
        lerp(a1, a2, t)
        {
            return a1 * (1 - t) + a2 * t;
        },

        // Backout function from tweenjs.
        // https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
        backout(amount)
        {
            return (t) => --t * t * ((amount + 1) * t + amount) + 1;
        }
    };

    return ctrl;
};


const info = {
    name:"slots",
    version:"2.0.1.0",
    //该游戏的窗口尺寸
    viewWidth:640,
    viewHeight:480,
};

export { info, setup };
