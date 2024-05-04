// import { utils, Container, Assets, Sprite, BitmapText, Graphics } from "pixi.js";
// import { CommonRecord } from "../common/CommonRecord";
const { utils, gsap, Container, ColorMatrixFilter, Assets, Texture, Sprite, Point, BitmapText, Graphics } = __PIXIV7__;

class HashDice extends utils.EventEmitter{
    constructor({app, game}){
        super();
        this.game = game;
        this.inited = false;// 游戏是否初始化标记，app.js中用
        
        /**游戏画面容器 */
        this.container = new Container;
        /**数字转盘容器 */
        this.numContainer = new Container;
        /**选择按钮容器 */
        this.btnContainer = new Container;
        
        /**图片缓存区 */
        this.images = {};

        /**控制类 */
        this.app = app;
        /**游戏数字存储区 */
        this.numsObj = {};
        /**旋转计时 */
        this.rotateTime1 = 0;
        /**旋转标志 */
        this.rotateFlag1 = false;
        /**开始停下标志 */
        this.stopFlag1 = false;
        this.stopNum1 = -1;
        /**旋转计时 */
        this.rotateTime2 = 0;
        /**旋转标志 */
        this.rotateFlag2 = false;
        /**开始停下标志 */
        this.stopFlag2 = false;
        this.stopNum2 = -1;
        /**旋转计时 */
        this.rotateTime3 = 0;
        /**旋转标志 */
        this.rotateFlag3 = false;
        /**开始停下标志 */
        this.stopFlag3 = false;
        this.stopNum3 = -1;
        /**旋转计时 */
        this.rotateTime4 = 0;
        /**旋转标志 */
        this.rotateFlag4 = false;
        /**开始停下标志 */
        this.stopFlag4 = false;
        this.stopNum4 = -1;
        /**旋转计时 */
        this.rotateTime5 = 0;
        /**旋转标志 */
        this.rotateFlag5 = false;
        /**开始停下标志 */
        this.stopFlag5 = false;
        this.stopNum5 = -1;

        this.chooseId = -1;
        /**计时器 */
        this.timer = 0;

        /**红点坐标记录 */
        this.reddotPosX = [107,130,155,178,452,476,500,523];
    }

    async init(){
        //
        await this.loadPic();
        await Assets.load('./lan.fnt');
    }
    resize(){
        /**游戏屏幕宽度 */
        this.width = this.app.screen.width;
        /**游戏屏幕高度 */
        this.height = this.app.screen.height;

        let scaleW = (this.width - 20) / this.container.width;
        let scaleH = (this.height - 40) / this.container.height;
        if(scaleW > scaleH){
            this.container.width *= scaleH;
            this.container.height *= scaleH;
        }else {
            this.container.width *= scaleW;
            this.container.height *= scaleW;
        }

        this.container.x = (this.width - this.container.width) / 2;
        this.container.y = 20;
    }

    reset(){
        this.rotateTime1 = 0;
        this.rotateFlag1 = false;
        this.stopFlag1 = false;
        this.stopNum1 = -1;

        this.rotateTime2 = 0;
        this.rotateFlag2 = false;
        this.stopFlag2 = false;
        this.stopNum2 = -1;

        this.rotateTime3 = 0;
        this.rotateFlag3 = false;
        this.stopFlag3 = false;
        this.stopNum3 = -1;

        this.rotateTime4 = 0;
        this.rotateFlag4 = false;
        this.stopFlag4 = false;
        this.stopNum4 = -1;

        this.rotateTime5 = 0;
        this.rotateFlag5 = false;
        this.stopFlag5 = false;
        this.stopNum5 = -1;
        
        for(let i = 0;i < 5;i++){
            this.numsObj[i].curShowNum = 0;
            this.numsObj[i].dTime = 0;
            for(let j = 0;j < 10;j++){
                this.numsObj[i][j].obj.x = i * 90;
                this.numsObj[i][j].obj.y = (((9 - j) + 5)%10) * 104;
                this.numsObj[i][j].originY = (((9 - j) + 5)%10) * 104;
            }
        }
    }

    start(serverVal){
        //
        if(this.rotateFlag1 || this.rotateFlag2 || this.rotateFlag3 || this.rotateFlag4 || this.rotateFlag5){
            console.log("还未完成旋转");
            return;
        }
        let serverNum = Number(serverVal);
        this.stopNum1 = Math.floor(serverNum / 10000);
        this.stopNum2 = Math.floor((serverNum % 10000) / 1000);
        this.stopNum3 = Math.floor((serverNum % 1000) / 100);
        this.stopNum4 = Math.floor((serverNum % 100) / 10);
        this.stopNum5 = Math.floor((serverNum % 10) / 1);
        this.rotateTime1 = 0;
        this.rotateTime2 = 0;
        this.rotateTime3 = 0;
        this.rotateTime4 = 0;
        this.rotateTime5 = 0;
        this.rotateFlag5 = true;
        this.stopFlag5 = false;
        let that = this;
        setTimeout(()=>{
            that.rotateFlag4 = true;
            that.stopFlag4 = false;
            setTimeout(()=>{
                that.rotateFlag3 = true;
                that.stopFlag3 = false;
                setTimeout(()=>{
                    that.rotateFlag2 = true;
                    that.stopFlag2 = false;
                    setTimeout(()=>{
                        that.rotateFlag1 = true;
                        that.stopFlag1 = false;
                    }, 200);
                }, 200);
            }, 200);
        }, 200);
    }

    tick(d){
        // 大概每60分之1秒执行一次
        if(this.rotateFlag1){
            if(this.stopFlag1){
                this.stopAni(d, 0, this.stopNum1);
            }else {
                this.startAni(d, 0);
            }
        }
        if(this.rotateFlag2){
            if(this.stopFlag2){
                this.stopAni(d, 1, this.stopNum2);
            }else {
                this.startAni(d, 1);
            }
        }
        if(this.rotateFlag3){
            if(this.stopFlag3){
                this.stopAni(d, 2, this.stopNum3);
            }else {
                this.startAni(d, 2);
            }
        }
        if(this.rotateFlag4){
            if(this.stopFlag4){
                this.stopAni(d, 3, this.stopNum4);
            }else {
                this.startAni(d, 3);
            }
        }
        if(this.rotateFlag5){
            if(this.stopFlag5){
                this.stopAni(d, 4, this.stopNum5);
            }else {
                this.startAni(d, 4);
            }
        }

        this.changeReddot();
    }
   
    mount(){
        this.showUI();
        // 根据环境决定是否显示开始按钮：测试环境显示，甲方环境不显示
        // this.initStartBtn();
        //重新规划位置
        this.resize();

        this.app.ticker.add(this.tick,this);
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
    /////////////////////////////////// 
    /**下载图片 */
    async loadPic(){
        let machineImg = await Assets.load('/hashdice/machine.png');
        this.images["machine"] = machineImg;
        let reddotImg = await Assets.load('/hashdice/reddot.png');
        this.images["reddot"] = reddotImg;
    }
    /**展示UI */
    showUI(){
        // this.recordUI = new CommonRecord(this.container,this.app);
        
        this.machine = new Sprite(this.images["machine"]);
        this.container.addChild(this.machine);
        
        this.maskImg = new Graphics;
        this.maskImg.clear();
        this.maskImg.beginFill(0xffffff, 0.7);
        this.maskImg.drawRect(this.machine.width / 2 - 233, this.machine.height / 2 - 120, 448, 148);//与机器的图片坐标绑定在一起：78, 344, 314, 104
        this.maskImg.endFill();
        this.container.addChild(this.maskImg);

        this.initRedDot();
        this.initNumContainer();
        this.initBtnContainer();
    }
    /**初始化转盘数字容器 */
    initNumContainer(){
        for(let i = 0;i < 5;i++){
            this.numsObj[i] = {
                curShowNum:0,
                dTime:0
            };
            for(let j = 0;j < 10;j++){
                let numText = new BitmapText(
                    '' + j, {
                    align: "center",
                    fontName: "lan",
                    fontSize: 48,
                    tint: 0xffffff
                });
                numText.x = i * 90;
                numText.y = (((9 - j) + 5)%10) * 104;
                this.numContainer.addChild(numText);
                this.numsObj[i][j] = {
                    obj:numText,
                    originY:numText.y
                };
            }
        }
        this.numContainer.x = this.machine.width / 2 - 233 + 30;
        this.numContainer.y = this.machine.height / 2 - 120 + 40 - 104 * 4;
        this.container.addChild(this.numContainer);
        this.numContainer.mask = this.maskImg;
    }
    /**初始化按钮容器 */
    initBtnContainer(){
        this.downBtn = new Graphics;
        this.downBtn.clear();
        this.downBtn.beginFill(0xffffff, 1);
        this.downBtn.drawRoundedRect(0, 0, this.machine.width / 2 - 80, 60, 5);
        this.downBtn.endFill();
        this.downBtn.tint = 0x707070;// 0x303030  0x707070  0x00efef
        this.btnContainer.addChild(this.downBtn);
        this.downBtn.eventMode = 'static';
        this.downBtn.cursor = 'pointer';
        this.downBtn.on('pointerdown', this.onClickDownBtn.bind(this));

        this.downText = new BitmapText(
            '>49999', {
            align: "center",
            fontName: "lan",
            fontSize: 24,
            tint: 0xffffff
        });
        this.downText.anchor.set(0.5);
        this.downText.x = this.machine.width / 4 - 40;
        this.downText.y = 30;
        this.btnContainer.addChild(this.downText);

        this.upBtn = new Graphics;
        this.upBtn.clear();
        this.upBtn.beginFill(0xffffff, 1);
        this.upBtn.drawRoundedRect(this.machine.width / 2 - 20, 0, this.machine.width / 2 - 80, 60, 5);
        this.upBtn.endFill();
        this.upBtn.tint = 0x707070;
        this.btnContainer.addChild(this.upBtn);
        this.upBtn.eventMode = 'static';
        this.upBtn.cursor = 'pointer';
        this.upBtn.on('pointerdown', this.onClickUpBtn.bind(this));
        
        this.upText = new BitmapText(
            '<50000', {
            align: "center",
            fontName: "lan",
            fontSize: 24,
            tint: 0xffffff
        });
        this.upText.anchor.set(0.5);
        this.upText.x = 3 * this.machine.width / 4 - 60;
        this.upText.y = 30;
        this.btnContainer.addChild(this.upText);

        this.onClickDownBtn();

        this.btnContainer.x = 45;
        this.btnContainer.y = this.machine.height - 90;
        this.container.addChild(this.btnContainer);
    }
    /**初始化开始按钮 */
    initStartBtn(){
        this.startBtn = new Graphics;
        this.startBtn.clear();
        this.startBtn.beginFill(0x5EE63A, 1);//0x5EE63A  0xab34f6
        this.startBtn.drawRoundedRect(0, this.machine.height + 120, this.machine.width, 80, 5);
        this.startBtn.endFill();
        this.container.addChild(this.startBtn);
        this.startBtn.eventMode = 'static';
        this.startBtn.cursor = 'pointer';
        this.startBtn.on('pointerdown', this.onClickStartBtn.bind(this));
        
        this.startText = new BitmapText(
            'START', {
            align: "center",
            fontName: "lan",
            fontSize: 24,
            tint: 0x000000
        });
        this.startText.anchor.set(0.5);
        this.startText.x = this.machine.width / 2;
        this.startText.y = this.machine.height + 120 + 40;
        this.container.addChild(this.startText);
    }
    /**顶部红点 */
    initRedDot(){
        this.reddot1 = new Sprite(this.images["reddot"]);
        this.reddot1.anchor.set(0.5);
        this.reddot1.width *= 0.7;
        this.reddot1.height *= 0.7;
        this.reddot1.x = this.reddotPosX[0];
        this.reddot1.y = 28;
        this.container.addChild(this.reddot1);
        
        this.reddot2 = new Sprite(this.images["reddot"]);
        this.reddot2.anchor.set(0.5);
        this.reddot2.width *= 0.7;
        this.reddot2.height *= 0.7;
        this.reddot2.x = this.reddotPosX[2];
        this.reddot2.y = 28;
        this.container.addChild(this.reddot2);

        this.reddot3 = new Sprite(this.images["reddot"]);
        this.reddot3.anchor.set(0.5);
        this.reddot3.width *= 0.7;
        this.reddot3.height *= 0.7;
        this.reddot3.x = this.reddotPosX[4];
        this.reddot3.y = 28;
        this.container.addChild(this.reddot3);
        
        this.reddot4 = new Sprite(this.images["reddot"]);
        this.reddot4.anchor.set(0.5);
        this.reddot4.width *= 0.7;
        this.reddot4.height *= 0.7;
        this.reddot4.x = this.reddotPosX[6];
        this.reddot4.y = 28;
        this.container.addChild(this.reddot4);
    }
    /**红点显示切换 */
    changeReddot(){
        this.timer++;
        if(this.timer == 60){
            this.reddot1.x = this.reddotPosX[0];
            this.reddot2.x = this.reddotPosX[2];
            this.reddot3.x = this.reddotPosX[4];
            this.reddot4.x = this.reddotPosX[6];
        }else if(this.timer == 120){
            this.reddot1.x = this.reddotPosX[1];
            this.reddot2.x = this.reddotPosX[3];
            this.reddot3.x = this.reddotPosX[5];
            this.reddot4.x = this.reddotPosX[7];
            this.timer = 0;
        }
    }
    /**点击 >49999 */
    onClickDownBtn(){
        if(this.rotateFlag1 || this.rotateFlag2 || this.rotateFlag3 || this.rotateFlag4 || this.rotateFlag5){
            console.log("还未完成旋转");
            return;
        }
        console.log("点击下限");
        this.chooseId = 1;

        this.downBtn.tint = 0x707070;
        this.upBtn.tint = 0x303030;

        this.downText.tint = 0xffffff;
        this.upText.tint = 0x7f7f7f;
    }
    /**点击 <50000 */
    onClickUpBtn(){
        if(this.rotateFlag1 || this.rotateFlag2 || this.rotateFlag3 || this.rotateFlag4 || this.rotateFlag5){
            console.log("还未完成旋转");
            return;
        }
        console.log("点击上限");
        this.chooseId = 0;
        
        this.downBtn.tint = 0x303030;
        this.upBtn.tint = 0x707070;

        this.downText.tint = 0x7f7f7f;
        this.upText.tint = 0xffffff;
    }
    /**点击开始 */
    onClickStartBtn(){
        console.log("点击开始");
        this.start();
    }
    /**开始动画 */
    startAni(d, i){
        this["rotateTime" + (i + 1)] += d;
        let a = 1/14;// 加速度
        let maxV = 10;// 最高速度
        let distance = 0;// 直线移动距离
        if(a * this["rotateTime" + (i + 1)] > maxV){
            let aTime = maxV / a;
            let vTime = this["rotateTime" + (i + 1)] - aTime;
            distance = 0.5 * a * aTime * aTime + maxV * vTime;
            // console.log("加速完成：",this.rotateTime);
            // setTimeout(()=>{
            //     console.log("加速完成：", this.rotateTime);
            // }, 1000)
            if(vTime > 30){
                this.numsObj[i].dTime = 0;
                this["stopFlag" + (i + 1)] = true;
                // this["stopNum" + (i + 1)] = Math.floor(Math.random() * 10);
                console.log("开始停下！", i, this["stopNum" + (i + 1)]);
            }
        }else {
            distance = 0.5 * a * this["rotateTime" + (i + 1)] * this["rotateTime" + (i + 1)];
        }
        for(let j = 0;j < 10;j++){
            let moveY = (this.numsObj[i][j].originY + distance)%1040;
            this.numsObj[i][j].obj.y = moveY;
        }
    }
    /**结束动画 */
    stopAni(d, i, j){
        // 第i列的数字停在第j个数字上，d是时间
        let a2 = 1/30;// 减速快一些
        let maxV = 10;
        let a2Time = maxV / a2;// 加减速时间
        let aDistance = 0.5 * a2 * a2Time * a2Time;
        let endY = 4 * 104;
        let aBeginY = endY - aDistance;
        if(aBeginY < 0){
            aBeginY += 1040;
        }
        let a = 1/40;
        let aTime = maxV / a;
        let curDis = 0.5 * a * aTime * aTime + maxV * (this["rotateTime" + (i + 1)] - aTime);
        let thisMoveDis = d * maxV;
        let vTime = 0;
        if(this.numsObj[i].dTime == 0){
            if((curDis + this.numsObj[i][j].originY) % 1040 > aBeginY && ((curDis + this.numsObj[i][j].originY) % 1040 + aBeginY) < thisMoveDis){
                // 可以开始减速
                // this.numsObj[i].isDecline = true;
                vTime = ((curDis + this.numsObj[i][j].originY) % 1040 + aBeginY) / maxV;
                this.numsObj[i].dTime = d - vTime;
                console.log("进入减速区：", d - vTime);
            }else if((curDis + this.numsObj[i][j].originY) % 1040 <= aBeginY && (aBeginY - (curDis + this.numsObj[i][j].originY) % 1040) < thisMoveDis){
                // 可以开始减速
                // this.numsObj[i].isDecline = true;
                vTime = ((aBeginY - (curDis + this.numsObj[i][j].originY))) / maxV;
                this.numsObj[i].dTime = d - vTime;
                console.log("进入减速区：", d - vTime);
            }else {
                this["rotateTime" + (i + 1)] += d;
                // let moveY = (this.numsObj[i][j].originY + curDis + thisMoveDis)%1040;
                for(let m = 0;m < 10;m++){
                    this.numsObj[i][m].obj.y = (this.numsObj[i][m].originY + curDis + thisMoveDis)%1040;
                }
            }
        }else {
            if(this.numsObj[i].dTime > 0 && this.numsObj[i].dTime < a2Time){
                this.numsObj[i].dTime += d;
                if(this.numsObj[i].dTime > a2Time){
                    this["rotateTime" + (i + 1)] += d - (this.numsObj[i].dTime - a2Time);
                    this.numsObj[i].dTime = a2Time;
                    // 最后一次旋转
                    this["rotateFlag" + (i + 1)] = false;
                    this["stopFlag" + (i + 1)] = false;
                    console.log("停止旋转！", i, j);
                    this.numsObj[i].curShowNum = j;
                }else {
                    this["rotateTime" + (i + 1)] += d;
                }
                let dTime = this.numsObj[i].dTime;
                let distance = 0.5 * a * aTime * aTime + maxV * (this["rotateTime" + (i + 1)] - aTime - dTime) + (maxV * dTime - 0.5 * a2 * dTime * dTime);
                for(let m = 0;m < 10;m++){
                    let finalY = (this.numsObj[i][m].originY + distance)%1040;
                    if(this["rotateFlag" + (i + 1)] == false){
                        this.numsObj[i][m].obj.y = Math.round(finalY / 104) * 104;
                        this.numsObj[i][m].originY = Math.round(finalY / 104) * 104;
                    }else {
                        this.numsObj[i][m].obj.y = finalY;
                    }
                }
            }
        }
        if(!(this.rotateFlag1 || this.rotateFlag2 || this.rotateFlag3 || this.rotateFlag4 || this.rotateFlag5)){
            let value = this.numsObj[0].curShowNum * 10000 + this.numsObj[1].curShowNum * 1000 +
                        this.numsObj[2].curShowNum * 100 + this.numsObj[3].curShowNum * 10 + this.numsObj[4].curShowNum;
            let isWin = false;
            if(this.chooseId == 0){
                if(value < 50000){
                    isWin = true;
                }
            }else if(this.chooseId == 1){
                if(value > 49999){
                    isWin = true;
                }
            }
            console.log("shifou shengli:", isWin);
            // this.recordUI.addOneRecord("", value, this.chooseId, isWin);
        }
    }

}

// export { HashDice }

window.__GLSDK_SETUP__&&window.__GLSDK_SETUP__({name:"hashdice",version:"1.0.0"}, HashDice);
