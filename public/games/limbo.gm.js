// import { Tween } from "jquery";
// import { utils, Sprite, Container, Assets, BitmapText, Graphics } from "pixi.js";

const { utils, gsap, Container, ColorMatrixFilter, Assets, Texture, Sprite, Point, BitmapText, Graphics } = __PIXIV7__;
// import { CommonRecord } from "../common/CommonRecord";

// TODO: 记录打开页，底部参数改动相关按钮，自动游戏功能，获胜概率如何计算

class Limbo extends utils.EventEmitter{
    constructor({app, game}){
        super();
        console.log("limbo");
        this.game = game;

        /**游戏画面容器 */
        this.container = new Container;
        // if(added)app.stage.addChild(this.container);
        this.rocketContainer = new Container;
        this.uiContainer = new Container;
        /**图片纹理资源缓存区 */
        this.images = {};
        /**顶部游戏记录缓存区 */
        this.records = {
            num: 0,
        };
        /**控制类 */
        this.app = app;
        /**总计时 */
        this.gameTime = 0;
        /**是否计时标志 */
        this.timingFlag = false;
        /**是否爆炸标志 */
        this.bombing = false;
        /**爆炸临时计时 */
        this.bombTime = 0;
        // /**是否要移动记录条标志 */
        // this.moveRecordFlag = false;
        /**是否正在上升：是的话不能点击Bet */
        this.isLifting = false;
        /**上升时间记录 */
        this.liftTime = 0;
        /**本次押注的时间 */
        this.payout = 1.01;// 最低值：1.01
        /**爆炸时间 */
        this.bombResult = 0;
        /**流星计时 */
        this.lxTime = 0;
    }
    /**游戏初始化 */
    async init(){
        console.log("init");
        await this.loadPic();
        await Assets.load('./lan.fnt');
    }
    
    resize(){
        console.log("resize");
        /**游戏屏幕宽度 */
        this.width = this.app.screen.width;
        /**游戏屏幕高度 */
        this.height = this.app.screen.height;
    }

    reset(){
        console.log("reset");
    }

    start(serverVal){
        console.log("start");
        if(this.isLifting || this.bombing){
            return;
        }
        this.isLifting = true;
        // this.bombResult = this.takeShot();
        this.bombResult = serverVal;
    }

    tick(d){
        // console.log("计时时间：", d);// 浮点数：围绕在1左右，大小相差极小
        if(this.timingFlag){
            this.gameTime += d;
            this.startBurnFrameAni();
            this.lxTime += d;
            this.startLiuXingAni();
        }
        if(this.bombing){
            this.bombTime += d;
            this.startBombFrameAni();
        }
        if(this.isLifting){
            this.startUp(d);
        }
    }
   
    mount(){
        console.log("mount");
        this.resize();
        this.app.ticker.add(this.tick,this);

        this.showPic();
        // 测试环境才打开
        // this.showUI();
        this.timingFlag = true;
    }
    unmount(){
        this.app.ticker.remove(this.tick,this);
    }
    destroy(){
        this.unmount();
        this.container.destroy();
        this.container = null;
        this.app = null;
    }

    /**展示游戏图片 */
    showPic(){
        this.bg = new Sprite(this.images["bg"]);
        let scale = this.width / this.bg.width;
        this.bg.width *= scale;
        this.bg.height *= scale;
        this.bg.x = 0;
        this.bg.y = 0;
        this.container.addChild(this.bg);

        this.lx = new Sprite(this.images["liuxing"]);
        this.lx.width *= scale;
        this.lx.height *= scale;
        this.lx.x = 280;// 160
        this.lx.y = 30;// 60
        this.lx.alpha = 0;

        this.lxContainer = new Container;
        this.container.addChild(this.lxContainer);
        this.lxContainer.addChild(this.lx);
        //
        this.rocket = new Sprite(this.images["rocket"]);
        this.rocket.anchor.set(0.5);
        this.rocket.x = 0;
        this.rocket.y = 0;
        this.rocketContainer.addChild(this.rocket);

        this.burn = new Sprite(this.images["burn1"]);
        this.burn.anchor.set(0.5);
        this.burn.x = this.rocket.x;
        this.burn.y = this.rocket.y + this.rocket.height / 2 + this.burn.height / 2 - 40;// 与飞机间隔-40
        this.rocketContainer.addChild(this.burn);

        this.rocketContainer.x = this.width / 2;
        this.rocketContainer.width *= scale * 0.8;
        this.rocketContainer.height *= scale * 0.8;
        this.rocketContainer.y = this.bg.height - this.rocketContainer.height + 20;
        this.container.addChild(this.rocketContainer);
        
        this.bomb = new Sprite(this.images["bomb1"]);
        this.bomb.anchor.set(0.5);
        this.container.addChild(this.bomb);
        this.bomb.visible = false;
        
        this.resultText = new BitmapText(
            '1.01x', {
            align: "center",
            fontName: "lan",
            fontSize: 48,
            tint: 0xffffff
        });
        this.resultText.anchor.set(0.5);
        this.resultText.x = this.width / 2;
        this.resultText.y = 40;// 与顶部的记录内容相隔100
        this.container.addChild(this.resultText);
    }
    /**显示UI操作界面 */
    showUI(){
        this.uiContainer.x = 0;
        this.uiContainer.y = 0;
        this.uiContainer.width = this.width;
        this.uiContainer.height = this.height;
        this.container.addChild(this.uiContainer);

        // this.recordContainer = new CommonRecord(this.uiContainer, this.app);
        // this.recordContainer = new Container;
        // this.recordContainer.x = 0;
        // this.recordContainer.y = 0;
        // this.uiContainer.addChild(this.recordContainer);

        this.botBg = new Graphics;
        this.botBg.clear();
        this.botBg.beginFill(0x030303, 1);
        let botY = this.burn.y + this.burn.height;
        this.botBg.drawRect(0, botY, this.width, this.height - botY);
        this.botBg.endFill();
        this.uiContainer.addChild(this.botBg);
        // this.botBg.eventMode = 'static';
        // this.botBg.cursor = 'pointer';
        // this.botBg.on('pointerdown', this.onClickCall.bind(this));
        
        this.yazhuDetailText = new BitmapText(
            'Amount(>=100)', {
            align: "center",
            fontName: "lan",
            fontSize: 16,
            tint: 0xffffff
        });
        this.yazhuDetailText.x = 10;
        this.yazhuDetailText.y = botY + 20;
        this.uiContainer.addChild(this.yazhuDetailText);

        this.inputRectOne = new Graphics;
        this.inputRectOne.clear();
        this.inputRectOne.beginFill(0x3f3f3f, 1);
        this.inputRectOne.drawRoundedRect(10, botY + 20 + this.yazhuDetailText.height + 10, this.width / 2 - 20, 40, 4);
        this.inputRectOne.endFill();
        this.uiContainer.addChild(this.inputRectOne);
        
        this.yazhuText = new BitmapText(
            '100', {
            align: "center",
            fontName: "lan",
            fontSize: 24,
            tint: 0xffffff
        });
        this.yazhuText.x = 40;
        this.yazhuText.y = botY + 20 + this.yazhuDetailText.height + 10 + 4;
        this.uiContainer.addChild(this.yazhuText);

        this.payoutDetailText = new BitmapText(
            'Payout', {
            align: "center",
            fontName: "lan",
            fontSize: 16,
            tint: 0xffffff
        });
        this.payoutDetailText.x = this.width / 2 + 10;
        this.payoutDetailText.y = botY + 20;
        this.uiContainer.addChild(this.payoutDetailText);
        
        this.inputRectTwo = new Graphics;
        this.inputRectTwo.clear();
        this.inputRectTwo.beginFill(0x3f3f3f, 1);
        this.inputRectTwo.drawRoundedRect(this.width / 2 + 10, botY + 20 + this.yazhuDetailText.height + 10, this.width / 2 - 20, 40, 4);
        this.inputRectTwo.endFill();
        this.uiContainer.addChild(this.inputRectTwo);
        
        this.payoutText = new BitmapText(
            this.payout + 'x', {
            align: "center",
            fontName: "lan",
            fontSize: 24,
            tint: 0xffffff
        });
        this.payoutText.x = this.width / 2 + 40;
        this.payoutText.y = botY + 20 + this.yazhuDetailText.height + 10 + 4;
        this.uiContainer.addChild(this.payoutText);

        this.winChanceDetailText = new BitmapText(
            'Win Chance', {
            align: "center",
            fontName: "lan",
            fontSize: 16,
            tint: 0xffffff
        });
        this.winChanceDetailText.x = this.width / 2 + 10;
        this.winChanceDetailText.y = botY + 20 + this.yazhuDetailText.height + 10 + 40 + 20;
        this.uiContainer.addChild(this.winChanceDetailText);
        
        this.chanceRect = new Graphics;
        this.chanceRect.clear();
        this.chanceRect.beginFill(0x3f3f3f, 1);
        this.chanceRect.drawRoundedRect(this.width / 2 + 10, botY + 20 + this.yazhuDetailText.height + 10 + 40 + 20 + this.winChanceDetailText.height + 10, this.width / 2 - 20, 40, 4);
        this.chanceRect.endFill();
        this.uiContainer.addChild(this.chanceRect);

        this.winChanceText = new BitmapText(
            '98.0184%', {
            align: "center",
            fontName: "lan",
            fontSize: 24,
            tint: 0xffffff
        });
        this.winChanceText.x = this.width / 2 + 40;
        this.winChanceText.y = botY + 20 + this.yazhuDetailText.height + 10 + 40 + 20 + this.winChanceDetailText.height + 10 + 4;
        this.uiContainer.addChild(this.winChanceText);
        
        this.betBtn = new Graphics;
        this.betBtn.clear();
        this.betBtn.beginFill(0x00ef23, 1);
        this.betBtn.drawRoundedRect(10, this.height - 60 - 80, this.width - 20, 40, 4);
        this.betBtn.endFill();
        this.uiContainer.addChild(this.betBtn);
        this.betBtn.eventMode = 'static';
        this.betBtn.cursor = 'pointer';
        this.betBtn.on('pointerdown', this.onClickBet.bind(this));
        
        this.betText = new BitmapText(
            'Bet', {
            align: "center",
            fontName: "lan",
            fontSize: 24,
            tint: 0xbf0303
        });
        this.betText.anchor.set(0.5);
        this.betText.x = this.width / 2;
        this.betText.y = this.height - 60 + 20 - 80;
        this.uiContainer.addChild(this.betText);
    }
    /**播放燃烧帧动画 */
    startBurnFrameAni(){
        let id = (Math.round(this.gameTime) % 13) + 1;
        if(id > 0 && id < 14){
            this.burn.texture = this.images["burn" + id];
        }
    }
    /**开始流星动画 */
    startLiuXingAni(){
        // 44x53
        if(this.lxTime >= 6 && this.lxTime < 140){
            let tempAlpha = (this.lxTime - 6) * 0.01;
            if(tempAlpha > 1){
                tempAlpha = 1;
            }
            this.lx.alpha = tempAlpha;
            this.lx.x = 160 + (this.lxTime - 6) * 1;
            this.lx.y = 20 + (this.lxTime - 6) * 1 * 53 / 44;
        }else if(this.lxTime >= 140 && this.lxTime < 360){
            let tempAlpha = (this.lxTime - 140) * 0.01;
            if(tempAlpha > 1){
                tempAlpha = 1;
            }
            this.lx.alpha = (1 - tempAlpha);
            if(tempAlpha > 0){
                this.lx.x = 160 + (this.lxTime - 6) * 1;
                this.lx.y = 20 + (this.lxTime - 6) * 1 * 53 / 44;
            }
        }else if(this.lxTime >= 360 && this.lxTime < 450){
            let tempAlpha = (this.lxTime - 360) * 0.01;
            if(tempAlpha > 1){
                tempAlpha = 1;
            }
            this.lx.alpha = tempAlpha;
            this.lx.x = 260 + (this.lxTime - 360) * 1;
            this.lx.y = 10 + (this.lxTime - 360) * 1 * 53 / 44;
        }else if(this.lxTime >= 450 && this.lxTime < 700){
            let tempAlpha = (this.lxTime - 450) * 0.01;
            if(tempAlpha > 1){
                tempAlpha = 1;
            }
            this.lx.alpha = (1 - tempAlpha);
            if(tempAlpha > 0){
                this.lx.x = 260 + (this.lxTime - 360) * 1;
                this.lx.y = 10 + (this.lxTime - 360) * 1 * 53 / 44;
            }
        }else if(this.lxTime >= 1060){
            this.lxTime = 0;
        }
    }
    /**开始上升 */
    startUp(d){
        if(this.isLifting){
            this.liftTime += d;
            let tempY = this.rocketContainer.y - (4 /200) * this.liftTime * this.liftTime;
            if(tempY <= 60){// 从240的位置上升到60
                this.rocketContainer.y = 60;
                this.isLifting = false;
                this.liftTime = 0;
                this.readyForBombing();
            }else {
                this.rocketContainer.y = tempY;
            }
        }
    }
    /**准备开始爆炸 */
    readyForBombing(){
        this.bomb.x = this.rocketContainer.x;
        this.bomb.y = this.rocketContainer.y;
        this.bomb.visible = true;
        this.bombing = true;
    }
    /**播放爆炸帧动画 */
    startBombFrameAni(){
        let id = (Math.round(this.bombTime) % 14) + 1;
        if(id > 0 && id < 15){
            this.bomb.texture = this.images["bomb" + id];// Math.floor(id / 2)
            this.rocketContainer.alpha = 1- id * (1/14);
            if(id == 14){
                this.rocketContainer.alpha = 0;
            }
        }
        if(id == 14){
            this.bombTime = 0;
            this.bomb.visible = false;
            this.backToReady();
            this.bombing = false;
        }
    }
    /**计算一次结果 */
    takeShot(){
        const random = Math.floor(Math.random() * 0xfffffffffffff);// 取2^52范围内的一个随机值，即16^13，即一个13位的十六进制数
        const bOne = (random/0xfffffffffffff).toFixed(15);//将随机值分配给0~1，除以13 fs的最大值，保留15位小数
        const resFloat = (99 / (1 - bOne)).toFixed(15);// 使HouseEdge为1%。进一步计算99/（1-X），其中X是在步骤2中计算的随机值。
        return parseFloat(((Math.round(resFloat) < 100?100:Math.round(resFloat)) / 100).toFixed(2));//所有小于100的值都将设置为100。换句话说，出现100的概率为1%。把这个数字四舍五入，除以100得到最终结果。
    }
    /**加载图片资源 */
    async loadPic(){
        let i;
        for(i = 1;i < 15;i++){
            let tempBombImg = await Assets.load('/limbo/bomb/bomb' + i + '.png');
            this.images["bomb" + i] = tempBombImg;
        }
        for(i = 1;i < 14;i++){
            let tempBurnImg = await Assets.load('/limbo/burn/burn' + i + '.png');
            this.images["burn" + i] = tempBurnImg;
        }
        let rocketImg = await Assets.load('/limbo/limbo_rocket.png');
        this.images["rocket"] = rocketImg;
        let bgImg = await Assets.load('/limbo/bg.png');
        this.images["bg"] = bgImg;
        let liuxingImg = await Assets.load('/limbo/liuxing.png');
        this.images["liuxing"] = liuxingImg;
    }

    /**爆炸结束后回归正常位置 */
    backToReady(){
        this.bomb.visible = false;
        this.rocketContainer.y = this.bg.height - this.rocketContainer.height + 20;
        this.rocketContainer.alpha = 1;
        this.resultText.text = this.bombResult + "x";
        // this.recordContainer.addOneRecord("tempid" + this.records.num, this.bombResult, this.payout, this.bombResult > this.payout);
    }
    /**点击开始上升 */
    onClickBet(){
        // this.start();
        // console.log("click bet:", this.bombResult);
    }
    /**外部接口：设置赔率 */
    setPayout(payout){
        this.resultText.text = payout + "x";
    }

}

// export { Limbo }

window.__GLSDK_SETUP__&&window.__GLSDK_SETUP__({name:"limbo",version:"1.0.0"}, Limbo);
