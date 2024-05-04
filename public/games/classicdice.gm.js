// import { CommonRecord } from "../common/CommonRecord";

const { utils, gsap, Container, ColorMatrixFilter, Assets, Texture, Sprite, Point, BitmapText, Graphics } = __PIXIV7__;

class ClassicDice extends utils.EventEmitter {
    constructor({ app, game }){
        super();
        this.game = game;
        this.inited = false;// 游戏是否初始化标记，app.js中用
        this.app = app;
        this.container = new Container;
        /**概率条容器 */
        this.barContainer = new Container;
        /**方块区域 */
        this.blockContainer = new Container;
        /**右边文本容器 */
        this.rightTextContainer = new Container;
        /**详细概率等内容容器 */
        this.detailContainer = new Container;
        
        /**资源存储区 */
        this.images = {};
        /**记录宽度 */
        this.barWidth = 0;
        /**单位距离 */
        this.unitWidth = 0;
        /**右值 */
        this.rightVal = 0;
        /**是否正在游戏动画中 */
        this.isStart = false;
        /**0:Roll Under || 1:Roll Over */
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

    tick(d){}

    reset(){}

    start(serverVal){
        if(this.isStart){
            return;
        }
        this.isStart = true;
        // let rand = Math.floor(Math.random() * 10001) / 100;// 0-100随机数，保留两位小数
        let rand = Number(serverVal);
        var audio = new Audio('/public/audio/classicdice/move.mp3');
        audio.play();
        console.log('服务端数据：', serverVal, rand);
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

        this.initBarCnt();
        this.initFiveText();
        this.initDetailUI();
        // 甲方环境需要注释
        // this.initStartBtn();
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

        this.unitWidth = 400 / 100;
        console.log("单位距离：", this.unitWidth);
        // 橙色条
        this.orangeBar = new Graphics;
        this.orangeBar.clear();
        this.orangeBar.beginFill(0xEC9D44, 1);
        this.orangeBar.drawRoundedRect(20, 21, 400, 18, 9);
        this.orangeBar.endFill();
        this.barContainer.addChild(this.orangeBar);
        // 绿色条
        this.greenBar = new Graphics;//#34EF34
        this.greenBar.clear();
        this.greenBar.beginFill(0x34EF34, 1);
        this.greenBar.drawRoundedRect(20, 21, 400, 18, 9);
        this.greenBar.endFill();
        this.barContainer.addChild(this.greenBar);
        // 遮罩
        this.mask = new Graphics;//#34EF34
        this.mask.clear();
        this.mask.beginFill(0xffffff, 1);
        this.mask.drawRect(0, 0, 400, 20);
        this.mask.endFill();
        this.barContainer.addChild(this.mask);

        this.mask.y = 20;
        this.mask.x = 20;
        this.greenBar.mask = this.mask;
        // 落点标记：白色条
        this.resultFlag = new Graphics;//#34EF34
        this.resultFlag.clear();
        this.resultFlag.beginFill(0xefefef, 1);
        this.resultFlag.drawRect(0, 21, 4, 18);
        this.resultFlag.endFill();
        this.resultFlag.x = 50 * this.unitWidth + 20 - 2;
        this.barContainer.addChild(this.resultFlag);
        // 整体移动按钮
        this.moveBtn = new Sprite(this.images["moveBtn"]);
        this.moveBtn.alpha = 0.7;
        this.moveBtn.anchor.set(0.5);
        this.moveBtn.y = 30;
        this.moveBtn.eventMode = 'static';
        this.moveBtn.cursor = 'pointer';
        this.moveBtn.on("pointerdown", this.onDragStart.bind(this)).on("pointerup", this.onDragEnd.bind(this)).on("pointerupoutside", this.onDragEnd.bind(this));
        this.barContainer.addChild(this.moveBtn);
        // 显示barUI
        this.barContainer.x = 0;
        this.container.addChild(this.barContainer);
        // 初始化方块UI
        this.initBlockUI();
    }
    /**显示底部五个分界点的值：固定UI，不用管 */
    initFiveText(){
        for(let i = 0;i < 5;i++){
            let text = i * 25;
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
    /**初始化方块UI */
    initBlockUI(){
        // 胜利背景图
        this.shineBg = new Sprite(this.images["shineBg"]);
        this.shineBg.anchor.set(0.5);
        // this.shineBg.visible = false;
        this.blockContainer.addChild(this.shineBg);
        // 方块骰子
        this.block = new Sprite(this.images["blockImg"]);
        this.block.anchor.set(0.5);
        this.blockContainer.addChild(this.block);
        // 结果文本
        this.resultText = new BitmapText(
            '50.00', {
            align: "center",
            fontName: "lan",
            fontSize: 24,
            tint: 0x000000
        });
        this.resultText.anchor.set(0.5);
        this.blockContainer.addChild(this.resultText);

        this.blockContainer.x = this.greenBar.width / 2 + 20;
        this.blockContainer.y = this.blockContainer.height / 2 + 10;
        this.container.addChild(this.blockContainer);

        this.barContainer.y = this.blockContainer.y + this.blockContainer.height / 2 + 40;

        this.initTextCnt();
    }
    /**初始化文本区域 */
    initTextCnt(){
        const rightTextBg = new Graphics;
        rightTextBg.clear();
        rightTextBg.beginFill(0xefffef, 1);
        rightTextBg.drawRoundedRect(0, 0, 60, 24, 6);// x、y、宽、高、圆角半径
        rightTextBg.endFill();
        this.rightTextContainer.addChild(rightTextBg);

        this.rightText = new BitmapText(
            '50', {
            align: "center",
            fontName: "lan",
            fontSize: 20,
            tint: 0x000000
        });
        this.rightText.anchor.set(0.5);
        this.rightText.x = 30;
        this.rightText.y = 12;
        this.rightTextContainer.addChild(this.rightText);

        this.rightTextContainer.x = this.moveBtn.x - this.rightTextContainer.width / 2;
        this.rightTextContainer.y = this.barContainer.y - 30;
        this.container.addChild(this.rightTextContainer);

        this.hideTextCnt();
    }
    /**初始化payout、滚动区域、概率这些UI */
    initDetailUI(){
        this.rollFlg = 0;
        const detailBg = new Graphics;
        detailBg.clear();
        detailBg.beginFill(0x303030, 1);
        detailBg.drawRoundedRect(0, 0, this.barContainer.width - 20, 100, 6);// x、y、宽、高、圆角半径
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
        payoutBg.drawRoundedRect(0, 0, (detailBg.width - 50) / 3, 50, 6);// x、y、宽、高、圆角半径
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
        
        this.rollTipText = new BitmapText(
            'Roll Under', {
            align: "center",
            fontName: "lan",
            fontSize: 16,
            tint: 0x7f7f7f
        });
        this.rollTipText.x = detailBg.x + (detailBg.width - 50) / 3 + 15 + 10;// 左右两边间距15， 中间间距10
        this.rollTipText.y = detailBg.y + 6;
        this.detailContainer.addChild(this.rollTipText);

        const rollBg = new Graphics;
        rollBg.clear();
        rollBg.beginFill(0x000000, 1);
        rollBg.drawRoundedRect(0, 0, (detailBg.width - 50) / 3, 50, 6);// x、y、宽、高、圆角半径
        rollBg.endFill();
        rollBg.x = detailBg.x + (detailBg.width - 50) / 3 + 15 + 10;
        rollBg.y = detailBg.y + 35;
        this.detailContainer.addChild(rollBg);
        
        this.rollText = new BitmapText(
            '50', {
            align: "center",
            fontName: "lan",
            fontSize: 14,
            tint: 0xffffff
        });
        this.rollText.x = rollBg.x + 10;
        this.rollText.y = rollBg.y + (rollBg.height - this.rollText.height) / 2 - 4;
        this.detailContainer.addChild(this.rollText);

        this.exchangeBtn = new Sprite(this.images["exchangeBtn"]);
        this.exchangeBtn.anchor.set(0.5);
        this.exchangeBtn.width *= 2;
        this.exchangeBtn.height *= 2;
        this.exchangeBtn.x = rollBg.x + rollBg.width - this.exchangeBtn.width / 2 - 6;
        this.exchangeBtn.y = rollBg.y + rollBg.height / 2;
        this.detailContainer.addChild(this.exchangeBtn);
        this.exchangeBtn.eventMode = 'static';
        this.exchangeBtn.cursor = 'pointer';
        this.exchangeBtn.on("pointerdown", ()=>{
            this.exchangeLowAndHigh();
        });
        
        const chanceTipText = new BitmapText(
            'Win Chance', {
            align: "center",
            fontName: "lan",
            fontSize: 16,
            tint: 0x7f7f7f
        });
        chanceTipText.x = detailBg.x + 2 * (detailBg.width - 50) / 3 + 15 + 20;// 左右两边间距15， 中间间距10
        chanceTipText.y = detailBg.y + 6;
        this.detailContainer.addChild(chanceTipText);

        const chanceBg = new Graphics;
        chanceBg.clear();
        chanceBg.beginFill(0x000000, 1);
        chanceBg.drawRoundedRect(0, 0, (detailBg.width - 50) / 3, 50, 6);// x、y、宽、高、圆角半径
        chanceBg.endFill();
        chanceBg.x = detailBg.x + 2 * (detailBg.width - 50) / 3 + 15 + 20;
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

        this.detailContainer.x = 10;
        this.detailContainer.y = this.barContainer.y + this.barContainer.height + 40;
        this.container.addChild(this.detailContainer);

        this.changeMaskAndBtns(50 * this.unitWidth);
    }
    /**初始化开始按钮 */
    initStartBtn(){
        const startBtn = new Graphics;
        startBtn.clear();
        startBtn.beginFill(0x5EE63A, 1);
        startBtn.drawRoundedRect(0, 0, this.barContainer.width - 20, 60, 6);// x、y、宽、高、圆角半径
        startBtn.endFill();
        startBtn.x = 10;
        startBtn.y = this.detailContainer.y + this.detailContainer.height + 10;
        this.container.addChild(startBtn);
        startBtn.eventMode = 'static';
        startBtn.cursor = 'pointer';
        startBtn.on("pointerdown", ()=>{
            this.start();
        });

        const startText = new BitmapText(
            'Roll Now', {
            align: "center",
            fontName: "lan",
            fontSize: 20,
            tint: 0x000000
        });
        startText.anchor.set(0.5);
        startText.x = startBtn.x + startBtn.width / 2;
        startText.y = startBtn.y + 30;
        this.container.addChild(startText);
    }
    hideTextCnt(){
        this.rightTextContainer.visible = false;
    }
    /**显示文本区域 */
    showTextArea(){
        var audio = new Audio('/public/audio/classicdice/range.mp3');
        audio.play();
        this.rightText.text = "" + this.rightVal;

        this.rightTextContainer.x = this.moveBtn.x - this.rightTextContainer.width / 2;
        this.rightTextContainer.visible = true;
    }
    /**显示骰子结果 */
    showRollResult(result){
        if(result < 0 || result > 100){
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
        tl.to(this.blockContainer,{duration: 0.5, x:30 + result * this.unitWidth});
        tl.to(this.block,{duration: 0.5, width: 1.2 * originWidth, height: 1.2 * originHeight});
        tl.to(this.block,{duration: 0.5, width: originWidth, height: originHeight});

        gsap.to(this.resultFlag, {duration: 0.5, x:30 + result * this.unitWidth - 2});
        this.resultText.text = result + "";
        if((result <= this.rightVal && this.rollFlg == 0) || (result >= this.rightVal && this.rollFlg == 1)){
            this.shineBg.visible = true;
            this.resultText.tint = 0x34EF34;
            // payout = 1.3;
        }else {
            this.shineBg.visible = false;
            this.resultText.tint = 0xEC9D44;
        }
        // this.recordUI.addOneRecord("temp00", payout, result,result <= this.rightVal)
    }
    /**改变概率条位置 */
    changeMaskAndBtns(width){
        // 先记录
        this.barWidth = width;
        // 再改变UI显示
        this.mask.width = width;

        this.moveBtn.x = this.mask.x + this.mask.width;
        this.rightVal = Math.floor(this.mask.width / this.unitWidth);

        this.rightText.text = "" + this.rightVal;
        this.rollText.text = "" + this.rightVal;

        this.chanceText.text = (this.rollFlg == 0?this.rightVal : (100 - this.rightVal)) + "%";
    }
    /**交换高低：待改善 */
    exchangeLowAndHigh(){
        if(this.isStart){
            return;
        }
        if(this.rollFlg == 0){
            this.greenBar.mask = null;
            this.orangeBar.mask = this.mask;
            this.barContainer.addChildAt(this.greenBar,2);
            this.rollFlg = 1;
            let rollNum = 100 - this.rightVal;
            this.changeMaskAndBtns(rollNum * this.unitWidth);
        }else {
            this.orangeBar.mask = null;
            this.greenBar.mask = this.mask;
            this.barContainer.addChildAt(this.orangeBar,2);
            this.rollFlg = 0;
            let rollNum = 100 - this.rightVal;
            this.changeMaskAndBtns(rollNum * this.unitWidth);
        }
    }
    /**监听事件：开始拖拽 */
    onDragStart(evt){
        if(this.isStart){
            return;
        }
        this.app.stage.eventMode = "static";
        this.app.stage.addEventListener("pointermove", this.onMove.bind(this));
    }
    /**监听事件：结束拖拽 */
    onDragEnd(evt){
        this.app.stage.eventMode = "auto";
        this.app.stage.removeEventListener("pointermove", this.onMove.bind(this));

        this.hideTextCnt();
    }
    /**监听事件：move */
    onMove(evt){
        if(this.isStart){
            return;
        }
        let newWidth = this.barWidth;
        newWidth = Math.max(2, Math.min(Math.round((this.barContainer.toLocal(evt.global).x - 20) / this.unitWidth), 98)) * this.unitWidth;
        this.changeMaskAndBtns(newWidth);
        this.showTextArea();
    }
}

// export {ClassicDice}

window.__GLSDK_SETUP__&&window.__GLSDK_SETUP__({name:"classicdice",version:"1.0.0"}, ClassicDice);
