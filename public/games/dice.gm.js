// import { CommonRecord } from "../common/CommonRecord";

const { utils, gsap, Container, ColorMatrixFilter, Assets, Texture, Sprite, Point, BitmapText, Graphics } = __PIXIV7__;

class Dice extends utils.EventEmitter {
    constructor({ app, game }){
        super();
        this.game = game;
        this.inited = false;// 游戏是否初始化标记，app.js中用
        this.app = app;
        this.container = new Container;

        /**概率条容器 */
        this.barContainer = new Container;
        /**设置容器 */
        this.settingContainer = new Container;
        /**方块区域 */
        this.blockContainer = new Container;
        /**左边文本容器 */
        this.leftTextContainer = new Container;
        /**右边文本容器 */
        this.rightTextContainer = new Container;
        /**详细概率等内容容器 */
        this.detailContainer = new Container;
        
        /**资源存储区 */
        this.images = {};
        /**记录开始位置 */
        this.startPos = 0;
        /**记录宽度 */
        this.barWidth = 0;
        /**点击位置 */
        this.clickPoint = new Point(0,0);
        /**移动类型 */
        this.moveType = "move";
        /**单位距离 */
        this.unitWidth = 0;
        /**左值 */
        this.leftVal = 0;
        /**右值 */
        this.rightVal = 0;
        /**in or out: 0-in, 1-out */
        // this.inOrOut = 0;
        /**是否正在游戏动画中 */
        this.isStart = false;
        /**0:Roll Inside || 1:Roll Outside */
        this.rollFlg = 0;
    }

    async init(){
        await this.loadRes();
    }

    resize(){
        /**游戏屏幕宽度 */
        this.width = this.app.screen.width;
        /**游戏屏幕高度 */
        this.height = this.app.screen.height;

        let scaleW = (this.width - 20) / this.container.width;
        let scaleH = (this.height - 40) / this.container.height;
        if(scaleW > scaleH){
            console.log("1111");
            this.container.width *= scaleH;
            this.container.height *= scaleH;
        }else {
            console.log("2222");
            this.container.width *= scaleW;
            this.container.height *= scaleW;
        }

        this.container.x = (this.width - this.container.width) / 2;
        this.container.y = 20;
    }

    reset(){}

    tick(d){}

    start(serverVal){
        if(this.isStart){
            return;
        }
        this.isStart = true;
        // let rand = Math.floor(Math.random() * 10000);// 0-9999随机数
        let rand = Number(serverVal);
        this.showRollResult(rand);
    }
   
    mount(){
        this.showUI();

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

    async loadRes(){
        await Assets.load('./lan.fnt');
        let blockImg = await Assets.load('/dice/block.png');
        this.images["blockImg"] = blockImg;
        let shineBg = await Assets.load('/dice/shineBg.png');
        this.images["shineBg"] = shineBg;
        let changeBtn = await Assets.load('/dice/changeBtn.png');
        this.images["changeBtn"] = changeBtn;
        let exchangeBtn = await Assets.load('/dice/exchangeBtn.png');
        this.images["exchangeBtn"] = exchangeBtn;
        let moveBtn = await Assets.load('/dice/moveBtn.png');
        this.images["moveBtn"] = moveBtn;
    }

    showUI(){
        // this.recordUI = new CommonRecord(this.container,this.app);

        this.initSettingUI();

        this.initBarCnt();
        this.initTextCnt();
        // 初始化方块UI
        this.initBlockUI();
        this.initFiveText();
        this.initDetailUI();
        this.rollFlg = 1;
        this.exchangeInOrOut();
        this.changeMaskAndBtns(2500 * this.unitWidth + 20, 4999 * this.unitWidth);
        // //测试环境开启
        // this.initStartBtn();
    }
    /**初始化顶部设置UI */
    initSettingUI(){
        this.showRollInOrOutUI();
        this.showLowAndHighUI();

        this.container.addChild(this.settingContainer);
    }
    /**顶部设置UI中的滚动区域 */
    showRollInOrOutUI(){
        const inOrOutBg = new Graphics;
        inOrOutBg.clear();
        inOrOutBg.beginFill(0x303030, 1);
        inOrOutBg.drawRoundedRect(0, 0, 200, 60, 6);// x、y、宽、高、圆角半径
        inOrOutBg.endFill();
        inOrOutBg.x = 0;
        inOrOutBg.y = 0;
        this.settingContainer.addChild(inOrOutBg);

        this.inBtn = new Graphics;
        this.inBtn.clear();
        this.inBtn.beginFill(0x707070, 1);
        this.inBtn.drawRoundedRect(0, 0, 98, 56, 6);// x、y、宽、高、圆角半径
        this.inBtn.endFill();
        this.inBtn.x = inOrOutBg.x + 2;
        this.inBtn.y = inOrOutBg.y + 2;
        this.inBtn.eventMode = 'static';
        this.inBtn.cursor = 'pointer';
        this.inBtn.on("pointerdown", ()=>{
            if(this.rollFlg == 1){
                this.exchangeInOrOut();
            }
        });
        this.settingContainer.addChild(this.inBtn);

        this.inText = new BitmapText(
            'Roll Inside', {
            align: "center",
            fontName: "lan",
            fontSize: 12,
            tint: 0xffffff
        });
        this.inText.anchor.set(0.5);
        this.inText.x = this.inBtn.x + this.inBtn.width / 2;
        this.inText.y = this.inBtn.y + this.inBtn.height / 2;
        this.settingContainer.addChild(this.inText);

        this.outBtn = new Graphics;
        this.outBtn.clear();
        this.outBtn.beginFill(0x707070, 1);
        this.outBtn.drawRoundedRect(0, 0, 98, 56, 6);// x、y、宽、高、圆角半径
        this.outBtn.endFill();
        this.outBtn.x = this.inBtn.x + this.inBtn.width;
        this.outBtn.y = this.inBtn.y;
        this.outBtn.eventMode = 'static';
        this.outBtn.cursor = 'pointer';
        this.outBtn.on("pointerdown", ()=>{
            if(this.rollFlg == 0){
                this.exchangeInOrOut();
            }
        });
        this.settingContainer.addChild(this.outBtn);

        this.outText = new BitmapText(
            'Roll Outside', {
            align: "center",
            fontName: "lan",
            fontSize: 12,
            tint: 0xffffff
        });
        this.outText.anchor.set(0.5);
        this.outText.x = this.outBtn.x + this.outBtn.width / 2;
        this.outText.y = this.outBtn.y + this.outBtn.height / 2;
        this.settingContainer.addChild(this.outText);
    }
    /**顶部设置UI中的高低位置 */
    showLowAndHighUI(){
        const lowAndHighBg = new Graphics;
        lowAndHighBg.clear();
        lowAndHighBg.beginFill(0x303030, 1);
        lowAndHighBg.drawRoundedRect(0, 0, 200, 60, 6);// x、y、宽、高、圆角半径
        lowAndHighBg.endFill();
        lowAndHighBg.x = 240;
        lowAndHighBg.y = 0;
        this.settingContainer.addChild(lowAndHighBg);
        
        let lowTipText = new BitmapText(
            'Low', {
            align: "center",
            fontName: "lan",
            fontSize: 12,
            tint: 0x7f7f7f
        });
        lowTipText.anchor.set(0.5);
        lowTipText.x = lowAndHighBg.x + lowAndHighBg.width / 4 - 10;
        lowTipText.y = lowAndHighBg.y + lowAndHighBg.height / 2 - 15;
        this.settingContainer.addChild(lowTipText);

        this.lowText = new BitmapText(
            '' + this.leftVal, {
            align: "center",
            fontName: "lan",
            fontSize: 16,
            tint: 0xffffff
        });
        this.lowText.anchor.set(0.5);
        this.lowText.x = lowTipText.x;
        this.lowText.y = lowAndHighBg.y + lowAndHighBg.height / 2 + 8;
        this.settingContainer.addChild(this.lowText);
        
        let highTipText = new BitmapText(
            'High', {
            align: "center",
            fontName: "lan",
            fontSize: 12,
            tint: 0x7f7f7f
        });
        highTipText.anchor.set(0.5);
        highTipText.x = lowAndHighBg.x + 3 * lowAndHighBg.width / 4 + 10;
        highTipText.y = lowTipText.y;
        this.settingContainer.addChild(highTipText);

        this.highText = new BitmapText(
            '' + this.rightVal, {
            align: "center",
            fontName: "lan",
            fontSize: 16,
            tint: 0xffffff
        });
        this.highText.anchor.set(0.5);
        this.highText.x = highTipText.x;
        this.highText.y = lowAndHighBg.y + lowAndHighBg.height / 2 + 8;
        this.settingContainer.addChild(this.highText);

        this.exchangeBtn = new Sprite(this.images["exchangeBtn"]);
        this.exchangeBtn.anchor.set(0.5);
        let exScale = 40 / this.exchangeBtn.width;
        this.exchangeBtn.width *= exScale;
        this.exchangeBtn.height *= exScale;
        this.exchangeBtn.x = lowAndHighBg.x + lowAndHighBg.width / 2;
        this.exchangeBtn.y = lowAndHighBg.y + lowAndHighBg.height / 2;
        this.settingContainer.addChild(this.exchangeBtn);
        this.exchangeBtn.eventMode = 'static';
        this.exchangeBtn.cursor = 'pointer';
        this.exchangeBtn.on("pointerdown", ()=>{
            this.exchangeLowAndHigh();
        });
    }
    /**初始化概率条UI */
    initBarCnt(){
        // 灰黑色底部背景
        let barBg = new Graphics;
        barBg.clear();
        barBg.beginFill(0x4E504E, 1);
        barBg.drawRoundedRect(0, 0, 440, 60, 6);// x、y、宽、高、圆角半径
        barBg.endFill();
        this.barContainer.addChild(barBg);
        // 黑色凹槽区域
        let blackArea = new Graphics;
        blackArea.clear();
        blackArea.beginFill(0x0C0C0C, 1);
        blackArea.drawRoundedRect(10, 15, 420, 30, 4);// x、y、宽、高、圆角半径
        blackArea.endFill();
        this.barContainer.addChild(blackArea);

        this.unitWidth = 400 / 10000;
        console.log("单位距离（使得宽度刚好能整除9999）：", this.unitWidth);// 使得宽度刚好能整除9999
        // 橙色条
        this.orangeBar = new Graphics;
        this.orangeBar.clear();
        this.orangeBar.beginFill(0xEC9D44, 1);
        this.orangeBar.drawRoundedRect(20, 21, 400 - this.unitWidth, 18, 9);
        this.orangeBar.endFill();
        this.barContainer.addChild(this.orangeBar);
        // 绿色条
        this.greenBar = new Graphics;//#34EF34
        this.greenBar.clear();
        this.greenBar.beginFill(0x34EF34, 1);
        this.greenBar.drawRoundedRect(20, 21, 400 - this.unitWidth, 18, 9);
        this.greenBar.endFill();
        this.barContainer.addChild(this.greenBar);
        // 遮罩
        this.mask = new Graphics;//#34EF34
        this.mask.clear();
        this.mask.beginFill(0xffffff, 1);
        this.mask.drawRect(0, 0, 400 - this.unitWidth, 20);
        this.mask.endFill();
        this.barContainer.addChild(this.mask);

        this.mask.y = 20;
        this.greenBar.mask = this.mask;
        // 落点标记：白色条
        this.resultFlag = new Graphics;//#34EF34
        this.resultFlag.clear();
        this.resultFlag.beginFill(0xefefef, 1);
        this.resultFlag.drawRect(0, 21, 4, 18);
        this.resultFlag.endFill();
        this.resultFlag.x = 5000 * this.unitWidth + 20 - 2;
        this.barContainer.addChild(this.resultFlag);
        // 整体移动按钮
        this.moveBtn = new Sprite(this.images["moveBtn"]);
        this.moveBtn.alpha = 0.7;
        this.moveBtn.anchor.set(0.5);
        this.moveBtn.y = 30;
        this.moveBtn.eventMode = 'static';
        this.moveBtn.cursor = 'pointer';
        this.moveBtn.on("pointerdown", this.onDragStart.bind(this, "move")).on("pointerup", this.onDragEnd.bind(this, "move")).on("pointerupoutside", this.onDragEnd.bind(this, "move"));
        this.barContainer.addChild(this.moveBtn);
        // 左端变化按钮
        this.leftChangeBtn = new Sprite(this.images["changeBtn"]);
        this.leftChangeBtn.alpha = 0.4;
        this.leftChangeBtn.anchor.set(0.5);
        this.leftChangeBtn.y = 30;
        this.leftChangeBtn.eventMode = 'static';
        this.leftChangeBtn.cursor = 'pointer';
        this.leftChangeBtn.on("pointerdown", this.onDragStart.bind(this, "left")).on("pointerup", this.onDragEnd.bind(this, "left")).on("pointerupoutside", this.onDragEnd.bind(this, "left"));
        this.barContainer.addChild(this.leftChangeBtn);
        // 右端变化按钮
        this.rightChangeBtn = new Sprite(this.images["changeBtn"]);
        this.rightChangeBtn.alpha = 0.4;
        this.rightChangeBtn.rotation = Math.PI;
        this.rightChangeBtn.anchor.set(0.5);
        this.rightChangeBtn.y = 30;
        this.rightChangeBtn.eventMode = 'static';
        this.rightChangeBtn.cursor = 'pointer';
        this.rightChangeBtn.on("pointerdown", this.onDragStart.bind(this, "right")).on("pointerup", this.onDragEnd.bind(this, "right")).on("pointerupoutside", this.onDragEnd.bind(this, "right"));
        this.barContainer.addChild(this.rightChangeBtn);

        // 显示barUI
        this.barContainer.x = 0;
        this.barContainer.y = 340;
        this.container.addChild(this.barContainer);
    }
    /**初始化文本区域 */
    initTextCnt(){
        const leftTextBg = new Graphics;
        leftTextBg.clear();
        leftTextBg.beginFill(0xefffef, 1);
        leftTextBg.drawRoundedRect(0, 0, 60, 24, 6);// x、y、宽、高、圆角半径
        leftTextBg.endFill();
        leftTextBg.x = -30;
        leftTextBg.y = -12;
        this.leftTextContainer.addChild(leftTextBg);

        this.leftText = new BitmapText(
            '' + this.leftVal, {
            align: "center",
            fontName: "lan",
            fontSize: 20,
            tint: 0x000000
        });
        this.leftText.anchor.set(0.5);
        this.leftTextContainer.addChild(this.leftText);

        this.leftTextContainer.x = this.leftChangeBtn.x;
        this.container.addChild(this.leftTextContainer);

        const rightTextBg = new Graphics;
        rightTextBg.clear();
        rightTextBg.beginFill(0xefffef, 1);
        rightTextBg.drawRoundedRect(0, 0, 60, 24, 6);// x、y、宽、高、圆角半径
        rightTextBg.endFill();
        rightTextBg.x = -30;
        rightTextBg.y = -12;
        this.rightTextContainer.addChild(rightTextBg);

        this.rightText = new BitmapText(
            '' + this.rightVal, {
            align: "center",
            fontName: "lan",
            fontSize: 20,
            tint: 0x000000
        });
        this.rightText.anchor.set(0.5);
        this.rightTextContainer.addChild(this.rightText);

        this.rightTextContainer.x = this.rightChangeBtn.x;
        this.container.addChild(this.rightTextContainer);

        this.hideTextCnt();
    }
    /**初始化方块UI */
    initBlockUI(){
        // 胜利背景图
        this.shineBg = new Sprite(this.images["shineBg"]);
        this.shineBg.anchor.set(0.5);
        this.blockContainer.addChild(this.shineBg);
        // 方块骰子
        this.block = new Sprite(this.images["blockImg"]);
        this.block.anchor.set(0.5);
        this.blockContainer.addChild(this.block);
        // 结果文本
        this.resultText = new BitmapText(
            '5000', {
            align: "center",
            fontName: "lan",
            fontSize: 24,
            tint: 0x000000
        });
        this.resultText.anchor.set(0.5);
        this.blockContainer.addChild(this.resultText);

        this.blockContainer.x = 20 + 5000 * this.unitWidth;
        this.blockContainer.y = this.settingContainer.y + this.settingContainer.height + this.blockContainer.height / 2 + 20;
        this.container.addChild(this.blockContainer);

        this.barContainer.y = this.blockContainer.y + this.blockContainer.height / 2 + this.leftTextContainer.height + 20 + 0;
        this.rightTextContainer.y = this.barContainer.y - this.rightTextContainer.height / 2 - 10;
        this.leftTextContainer.y = this.barContainer.y - this.leftTextContainer.height / 2 - 10;
    }
    /**显示底部五个分界点的值：固定UI，不用管 */
    initFiveText(){
        for(let i = 0;i < 5;i++){
            let text = i * 2500;
            if(text == 10000){
                text = 9999;
            }
            let tempText = new BitmapText(
                '' + text, {
                align: "center",
                fontName: "lan",
                fontSize: 16,
                tint: 0xffffff
            });
            tempText.anchor.set(0.5);
            tempText.x = this.unitWidth * text + 20;
            console.log("text x:", tempText.x);
            tempText.y = this.barContainer.y + this.barContainer.height + 10;
            this.container.addChild(tempText);
        }
    }
    /**初始化概率、payout的详情UI */
    initDetailUI(){
        const detailBg = new Graphics;
        detailBg.clear();
        detailBg.beginFill(0x303030, 1);
        detailBg.drawRoundedRect(0, 0, 440, 100, 6);// x、y、宽、高、圆角半径
        detailBg.endFill();
        this.detailContainer.addChild(detailBg);

        const payoutTipText = new BitmapText(
            'Payout', {
            align: "center",
            fontName: "lan",
            fontSize: 16,
            tint: 0x7f7f7f
        });
        payoutTipText.x = detailBg.x + 15;
        payoutTipText.y = detailBg.y + 6;
        this.detailContainer.addChild(payoutTipText);

        const payoutBg = new Graphics;
        payoutBg.clear();
        payoutBg.beginFill(0x000000, 1);
        payoutBg.drawRoundedRect(0, 0, (detailBg.width - 40) / 2, 50, 6);// x、y、宽、高、圆角半径
        payoutBg.endFill();
        payoutBg.x = detailBg.x + 15;
        payoutBg.y = detailBg.y + 35;
        this.detailContainer.addChild(payoutBg);
        
        this.payoutText = new BitmapText(
            '1.98x', {
            align: "center",
            fontName: "lan",
            fontSize: 14,
            tint: 0xffffff
        });
        this.payoutText.x = payoutBg.x + 10;
        this.payoutText.y = payoutBg.y + (payoutBg.height - this.payoutText.height) / 2 - 4;
        this.detailContainer.addChild(this.payoutText);

        const chanceTipText = new BitmapText(
            'Win Chance', {
            align: "center",
            fontName: "lan",
            fontSize: 16,
            tint: 0x7f7f7f
        });
        chanceTipText.x = detailBg.x + (detailBg.width - 40) / 2 + 15 + 10;// 左右两边间距15， 中间间距10
        chanceTipText.y = detailBg.y + 6;
        this.detailContainer.addChild(chanceTipText);

        const chanceBg = new Graphics;
        chanceBg.clear();
        chanceBg.beginFill(0x000000, 1);
        chanceBg.drawRoundedRect(0, 0, (detailBg.width - 40) / 2, 50, 6);// x、y、宽、高、圆角半径
        chanceBg.endFill();
        chanceBg.x = detailBg.x + (detailBg.width - 40) / 2 + 15 + 10;
        chanceBg.y = detailBg.y + 35;
        this.detailContainer.addChild(chanceBg);
        
        this.chanceText = new BitmapText(
            '50%', {
            align: "center",
            fontName: "lan",
            fontSize: 14,
            tint: 0xffffff
        });
        this.chanceText.x = chanceBg.x + 10;
        this.chanceText.y = chanceBg.y + (chanceBg.height - this.chanceText.height) / 2 - 4;
        this.detailContainer.addChild(this.chanceText);
        
        this.detailContainer.y = this.barContainer.y + this.barContainer.height + 40;
        this.container.addChild(this.detailContainer);
    }
    /**初始化开始按钮 */
    initStartBtn(){
        const startBtn = new Graphics;
        startBtn.clear();
        startBtn.beginFill(0x5EE63A, 1);
        startBtn.drawRoundedRect(0, 0, 440, 60, 6);// x、y、宽、高、圆角半径
        startBtn.endFill();
        startBtn.y = this.detailContainer.y + this.detailContainer.height + 10;
        this.container.addChild(startBtn);
        startBtn.eventMode = 'static';
        startBtn.cursor = 'pointer';
        startBtn.on("pointerdown", ()=>{
            this.start();
        });

        let lowText = new BitmapText(
            'Roll Now', {
            align: "center",
            fontName: "lan",
            fontSize: 20,
            tint: 0x000000
        });
        lowText.anchor.set(0.5);
        lowText.x = startBtn.width / 2;
        lowText.y = startBtn.y + 30;
        this.container.addChild(lowText);
    }
    onDragStart(type, evt){
        if(this.isStart){
            return;
        }
        console.log(type);
        // 层级管理
        if(type == "move"){
            this.barContainer.addChild(this.moveBtn);
        }else if(type == "left"){
            this.barContainer.addChild(this.leftChangeBtn);
        }else if(type == "right"){
            this.barContainer.addChild(this.rightChangeBtn);
        }
        this.moveType = type;
        this.app.stage.eventMode = "static";
        this.app.stage.addEventListener("pointermove", this.onMove.bind(this));
    }
    onDragEnd(type, evt){
        this.app.stage.eventMode = "auto";
        this.app.stage.removeEventListener("pointermove", this.onMove.bind(this));

        this.hideTextCnt();
    }
    /**监听事件：move */
    onMove(evt){
        if(this.isStart){
            return;
        }
        let newStartPos = this.startPos;
        let newWidth = this.barWidth;
        if(this.moveType == "move"){
            const leftPos = 20 + this.mask.width / 2;
            const rightPos = 20 + this.unitWidth * 9999 - this.mask.width / 2;
            newStartPos = Math.max(leftPos, Math.min(this.container.toLocal(evt.global).x, rightPos)) - this.mask.width / 2;
        }else if(this.moveType == "left"){
            const rightPos = this.startPos + this.mask.width;
            let keepWidth = 0;// 保留200的区域
            if(20 + this.unitWidth * 9999 - rightPos < 200 * this.unitWidth){
                keepWidth = 200 * this.unitWidth - (20 + this.unitWidth * 9999 - rightPos);
            }
            const leftPos = 20 + keepWidth;
            newStartPos = Math.max(leftPos, Math.min(this.container.toLocal(evt.global).x, rightPos));
            newWidth = rightPos - newStartPos;
        }else if(this.moveType == "right"){
            const leftPos = this.startPos;
            let keepWidth = 0;// 保留200的区域
            if(leftPos - 20 < 200 * this.unitWidth){
                keepWidth = 200 * this.unitWidth - leftPos + 20;
            }
            const rightPos = 20 + this.unitWidth * 9999 - keepWidth;
            newWidth = Math.max(leftPos, Math.min(this.container.toLocal(evt.global).x, rightPos)) - leftPos;
        }
        this.changeMaskAndBtns(newStartPos,newWidth);
        if(this.moveType == "move"){
            this.showTextArea(true, true);
        }else if(this.moveType == "left"){
            this.showTextArea(true, false);
        }else if(this.moveType == "right"){
            this.showTextArea(false, true);
        }
    }
    /**显示骰子结果 */
    showRollResult(result){
        if(result < 0 || result > 9999){
            return;
        }
        let tl = gsap.timeline({
            repeat: 0,
            onComplete:()=>{
                console.log("动画完成");
                this.isStart = false;
            }
        });
        let originWidth = this.block.width;
        let originHeight = this.block.height;
        tl.to(this.blockContainer,{duration: 0.5, x:20 + result * this.unitWidth});
        tl.to(this.block,{duration: 0.5, width: 1.2 * originWidth, height: 1.2 * originHeight});
        tl.to(this.block,{duration: 0.5, width: originWidth, height: originHeight});

        gsap.to(this.resultFlag, {duration: 0.5, x:20 + result * this.unitWidth - 2});
        this.resultText.text = result + "";
        if((result >= this.leftVal && result <= this.rightVal && this.rollFlg == 0) || ((result < this.leftVal || result > this.rightVal) && this.rollFlg == 1)){
            this.shineBg.visible = true;
            this.resultText.tint = 0x34EF34;
        }else {
            this.shineBg.visible = false;
            this.resultText.tint = 0xEC9D44;
        }
    }
    /**隐藏bar上的数字提示文本 */
    hideTextCnt(){
        this.leftTextContainer.visible = false;
        this.rightTextContainer.visible = false;
    }
    /**改变概率条位置 */
    changeMaskAndBtns(startPos, width){
        // 先记录
        this.startPos = startPos;
        this.barWidth = width;
        // 再改变UI显示
        this.mask.width = width;
        this.mask.x = startPos;

        this.moveBtn.x = this.mask.x + this.mask.width / 2;
        // console.log("按钮坐标：", this.moveBtn.x);
        this.leftChangeBtn.x = this.mask.x;
        this.rightChangeBtn.x = this.mask.x + this.mask.width;

        // console.log("exchange startPos:", (this.startPos - 20), this.unitWidth);
        this.leftVal = Math.floor((this.startPos - 20) / this.unitWidth);
        this.rightVal = Math.floor((this.startPos - 20 + this.mask.width) / this.unitWidth);

        this.lowText.text = "" + this.leftVal;
        this.highText.text = "" + this.rightVal;

        this.refreshChanceText();
    }
    /**显示文本区域 */
    showTextArea(left, right){
        if(left){
            this.leftText.text = "" + this.leftVal;

            this.leftTextContainer.x = this.leftChangeBtn.x;
            this.leftTextContainer.visible = true;
        }
        if(right){
            this.rightText.text = "" + this.rightVal;

            this.rightTextContainer.x = this.rightChangeBtn.x;
            this.rightTextContainer.visible = true;
        }
    }
    /**交换高低：待改善 */
    exchangeLowAndHigh(){
        if(this.isStart){
            return;
        }
        let low = 9999 - this.rightVal;

        // console.log("exchange startPos:", low * this.unitWidth + 20);
        this.changeMaskAndBtns(low * this.unitWidth + 20, this.barWidth);
    }
    /**交换内外 */
    exchangeInOrOut(){
        if(this.isStart){
            return;
        }
        if(this.rollFlg == 0){
            this.greenBar.mask = null;
            this.orangeBar.mask = this.mask;
            this.barContainer.addChildAt(this.greenBar,2);
            this.inBtn.alpha = 0.1;
            this.inText.tint = 0x7f7f7f;

            this.outBtn.alpha = 1;
            this.outText.tint = 0xffffff;
            this.rollFlg = 1;
        }else {
            this.orangeBar.mask = null;
            this.greenBar.mask = this.mask;
            this.barContainer.addChildAt(this.orangeBar,2);
            this.inBtn.alpha = 1;
            this.inText.tint = 0xffffff;

            this.outBtn.alpha = 0.1;
            this.outText.tint = 0x7f7f7f;
            this.rollFlg = 0;
        }
        this.refreshChanceText();
    }
    /**更新概率文本 */
    refreshChanceText(){
        if(this.rollFlg == 0){
            this.chanceText.text = ((this.rightVal - this.leftVal + 1) / 100).toFixed(2) + "%";
        }else if(this.rollFlg == 1){
            this.chanceText.text = ((10000 - (this.rightVal - this.leftVal + 1)) / 100).toFixed(2) + "%";
        }
    }

}

// export {Dice}

window.__GLSDK_SETUP__&&window.__GLSDK_SETUP__({name:"dice",version:"1.0.0"}, Dice);
