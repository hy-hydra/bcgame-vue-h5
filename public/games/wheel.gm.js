// import { utils, Container, ColorMatrixFilter, Assets, Texture, Sprite, Point, BitmapText, Graphics } from 'pixi.js';
// import {gsap} from 'gsap';
const { utils: utils$1, gsap: gsap$1, Container: Container$1, ColorMatrixFilter: ColorMatrixFilter$1, Assets: Assets$1, Texture: Texture$1, Sprite: Sprite$1, Point: Point$1, BitmapText: BitmapText$1, Graphics: Graphics$1 } = __PIXIV7__;

class RateUI extends utils$1.EventEmitter {
    constructor(){
        super();

        this.container = new Container$1;
        /**可伸缩的容器 */
        this.drawContainer = new Container$1;
    }

    init(color){
        this.bg = new Graphics$1;
        this.bg.clear();
        this.bg.beginFill(0x3f3f3f, 1);
        this.bg.drawRoundedRect(0, 0, 40, 40, 6);// x、y、宽、高、圆角半径
        this.bg.endFill();
        this.drawContainer.addChild(this.bg);
        
        this.colorRect = new Graphics$1;
        this.colorRect.clear();
        this.colorRect.beginFill(color, 1);
        this.colorRect.drawRect(0, 0, 40, 6);// x、y、宽、高
        this.colorRect.endFill();
        this.colorRect.y = 34;
        this.drawContainer.addChild(this.colorRect);

        this.container.addChild(this.drawContainer);

        this.payoutText = new BitmapText$1(
            '0.00x', {
            align: "center",
            fontName: "lan",
            fontSize: 18,
            tint: 0xffffff
        });
        this.payoutText.anchor.set(0.5);
        this.container.addChild(this.payoutText);

        this.fixPos();
    }

    changePayout(payout){
        this.payoutText.text = payout + "x";
    }

    changeSize(width){
        this.bg.clear();
        this.bg.beginFill(0x3f3f3f, 1);
        this.bg.drawRoundedRect(0, 0, width, 40, 6);// x、y、宽、高、圆角半径
        this.bg.endFill();
        this.drawContainer.addChildAt(this.bg, 0);

        this.colorRect.width = width;
        this.fixPos();
    }

    fixPos(){
        this.payoutText.x = this.drawContainer.width / 2;
        this.payoutText.y = this.drawContainer.height / 2 - 2;
    }

    getUI(){
        return this.container;
    }
}

// import { CommonRecord } from "../common/CommonRecord";
// import { CommonValue } from "../common/CommonValue";
// import { utils, Container, ColorMatrixFilter, Assets, Texture, Point, BitmapText, Graphics } from 'pixi.js';

// import { utils, Container, ColorMatrixFilter, Assets, Texture, Sprite, Point, BitmapText, Graphics } from 'pixi.js';
const { utils, gsap, Container, ColorMatrixFilter, Assets, Texture, Sprite, Point, BitmapText, Graphics } = __PIXIV7__;

class Wheel extends utils.EventEmitter {
    
    /**轮盘数据：第一层是分割数（0-10，1-20，2-30，3-40，4-50）；第二层是难易（0-Low, 1-Medium, 2-High）；第三层是颜色（0-白色，1-蓝色，2-绿色，3-橘色，4-紫色，5-红色） */
    static wheelData = {
        0:{
            0:{
                0:{
                    "payout":0,
                    "ids":[0,5]
                },
                1:{
                    "payout":1.2,
                    "ids":[1,2,3,4,6,7,8]
                },
                2:{
                    "payout":1.5,
                    "ids":[9]
                }
            },
            1:{
                0:{
                    "payout":0,
                    "ids":[1,3,5,7,9]
                },
                1:{
                    "payout":1.5,
                    "ids":[2,6]
                },
                2:{
                    "payout":1.9,
                    "ids":[8]
                },
                3:{
                    "payout":2,
                    "ids":[4]
                },
                4:{
                    "payout":3,
                    "ids":[0]
                }
            },
            2:{
                0:{
                    "payout":0,
                    "ids":[1,2,3,4,5,6,7,8,9]
                },
                1:{
                    "payout":9.9,
                    "ids":[0]
                }
            }
        },
        1:{
            0:{
                0:{
                    "payout":0,
                    "ids":[0,5,10,15]
                },
                1:{
                    "payout":1.2,
                    "ids":[1,2,3,4,6,7,8,11,12,13,14,16,17,18]
                },
                2:{
                    "payout":1.5,
                    "ids":[9,19]
                }
            },
            1:{
                0:{
                    "payout":0,
                    "ids":[0,2,4,6,8,10,12,14,16,18]
                },
                1:{
                    "payout":1.5,
                    "ids":[2,6,11,19]
                },
                2:{
                    "payout":1.8,
                    "ids":[7]
                },
                3:{
                    "payout":2,
                    "ids":[1,3,5,13,15,17]
                },
                4:{
                    "payout":3,
                    "ids":[9]
                }
            },
            2:{
                0:{
                    "payout":0,
                    "ids":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
                },
                5:{
                    "payout":19.8,
                    "ids":[0]
                }
            }
        },
        2:{
            0:{
                0:{
                    "payout":0,
                    "ids":[0,5,10,15,20,25]
                },
                1:{
                    "payout":1.2,
                    "ids":[1,2,3,4,6,7,8,11,12,13,14,16,17,18,21,22,23,24,26,27,28]
                },
                2:{
                    "payout":1.5,
                    "ids":[9,19,29]
                }
            },
            1:{
                0:{
                    "payout":0,
                    "ids":[0,2,4,6,8,10,12,14,16,18,20,22,24,26,28]
                },
                1:{
                    "payout":1.5,
                    "ids":[3,13,17,23,27,29]
                },
                2:{
                    "payout":1.7,
                    "ids":[7]
                },
                3:{
                    "payout":2.0,
                    "ids":[1,9,11,19,21,25]
                },
                4:{
                    "payout":3.0,
                    "ids":[15]
                },
                5:{
                    "payout":4.0,
                    "ids":[5]
                }
            },
            2:{
                0:{
                    "payout":0,
                    "ids":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
                },
                5:{
                    "payout":29.7,
                    "ids":[0]
                }
            }
        },
        3:{
            0:{
                0:{
                    "payout":0,
                    "ids":[0,5,10,15,20,25,30,35]
                },
                1:{
                    "payout":1.2,
                    "ids":[1,2,3,4,6,7,8,11,12,13,14,16,17,18,21,22,23,24,26,27,28,31,32,33,34,36,37,38]
                },
                2:{
                    "payout":1.5,
                    "ids":[9,19,29,39]
                }
            },
            1:{
                0:{
                    "payout":0,
                    "ids":[0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38]
                },
                1:{
                    "payout":1.5,
                    "ids":[1,5,9,19,23,27,29,33]
                },
                2:{
                    "payout":1.6,
                    "ids":[13]
                },
                3:{
                    "payout":2.0,
                    "ids":[3,11,15,17,25,35,39]
                },
                4:{
                    "payout":3.0,
                    "ids":[7,21,31,37]
                }
            },
            2:{
                0:{
                    "payout":0,
                    "ids":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39]
                },
                5:{
                    "payout":39.6,
                    "ids":[0]
                }
            }
        },
        4:{
            0:{
                0:{
                    "payout":0,
                    "ids":[0,5,10,15,20,25,30,35,40,45]
                },
                1:{
                    "payout":1.2,
                    "ids":[1,2,3,4,6,7,8,11,12,13,14,16,17,18,21,22,23,24,26,27,28,31,32,33,34,36,37,38,41,42,43,44,46,47,48]
                },
                2:{
                    "payout":1.5,
                    "ids":[9,19,29,39,49]
                }
            },
            1:{
                0:{
                    "payout":0,
                    "ids":[0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48]
                },
                1:{
                    "payout":1.5,
                    "ids":[1,5,9,11,15,19,25,29,33,37,39,43,47]
                },
                2:{
                    "payout":2.0,
                    "ids":[3,13,21,23,27,35,45,49]
                },
                3:{
                    "payout":3.0,
                    "ids":[17,31,41]
                },
                4:{
                    "payout":5.0,
                    "ids":[7]
                }
            },
            2:{
                0:{
                    "payout":0,
                    "ids":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49]
                },
                5:{
                    "payout":49.5,
                    "ids":[0]
                }
            }
        },
    }
    constructor({ app, game }){
        super();
        this.game = game;
        this.inited = false;// 游戏是否初始化标记，app.js中用
        this.app = app;
        this.container = new Container;

        /**转盘容器 */
        this.wheelContainer = new Container;
        /**设置等按钮容器 */
        this.setContainer = new Container;
        
        /**资源存储区 */
        this.images = {};

        this.masks = [];

        /**是否正在游戏动画中 */
        this.isStart = false;
        /**难易程度：0-low, 1-medium, 2-high */
        this.segment = 0;
        /**rowid:0,1,2,3,4 */
        this.rowId = 0;
        /**rowBtns:10,20,30,40,50 */
        this.rowBtns = [];
        /**wheels */
        this.wheels = {};
        /**wheels' mask */
        this.wheelMasks = {};
        /**RateUI */
        this.rateUI = {};
        /**上一次的旋转角度 */
        this.lastRadius = 0;
        /**圆圈中间结果BG */
        this.resultCenterBg = null;
        /**圆圈中间结果文本 */
        this.resultText = null;
        /**颜色值 */
        this.colors = [0xF6FBFF,   0x6DBFFF,  0x3BC117,  0xF9AD17,   0x935ADF,   0xFF4D4F];
    }

    async init(){
        await this.loadRes();
    }

    resize(){
        /**游戏屏幕宽度 */
        this.width = this.app.screen.width;
        /**游戏屏幕高度 */
        this.height = this.app.screen.height;

        // this.container.x = (this.width - this.container.width) / 2;
        this.container.x = 0;
        this.container.y = 20;
    }

    tick(d){}

    reset(){}

    start(serverVal){
        if(this.isStart){
            return;
        }
        this.isStart = true;
        this.startRotate(Number(serverVal));
    }
   
    mount(){
        this.resize();
        this.showUI();

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

    startRotate(serverVal){
        let rows = (this.rowId + 1) * 10;
        // let unitRadius = 360 / rows;
        // let resultId = Math.floor(Math.random() * rows);
        let resultId = serverVal;
        // if(!resultId){
        //     resultId = Math.floor(Math.random() * rows);
        // }
        // let finalRadius = (0.5 + resultId) * unitRadius;

        // 顺逆时针旋转所对应的角度加减情况不同，谨慎！！！！
        let tl = gsap.timeline({
            repeat: 0,
            onComplete:()=>{
                // console.log("动画完成");
                this.isStart = false;
                this.wheelContainer.rotation = (rows - resultId - 0.5) * Math.PI * 2 / rows;//finalRadius * Math.PI / 180
                // this.lastRadius = finalRadius * Math.PI / 180;

                for(let i in Wheel.wheelData[this.rowId][this.segment]){
                    if(Wheel.wheelData[this.rowId][this.segment][i]["ids"].indexOf(resultId) != -1){
                        let payout = Wheel.wheelData[this.rowId][this.segment][i]["payout"];
                        console.log("结果颜色是：", i, resultId, this.rowId, payout);
                        this.resultText.text = payout + "x";
                        this.resultText.tint = this.colors[i];
                        // this.recordUI.addOneRecord("",payout, payout, payout >= 1);
                        break;
                    }
                }
            }
        });
        // let lastRadius = this.wheelContainer.rotation;
        tl.to(this.wheelContainer,{duration: 3, rotation:(Math.PI * 2 * 6 + (rows - resultId - 0.5) * Math.PI * 2 / rows)});//+ finalRadius * Math.PI / 180
        // tl.to(this.wheelContainer,{duration: 0.5, width: 1.2 * originWidth, height: 1.2 * originHeight});
    }

    async loadRes(){
        await Assets.load('./lan.fnt');
        for(let i = 0;i < 6;i++){
            let tempWheelImg = await Assets.load('/wheel/wheel' + i + '.png');
            this.images["wheel" + i] = tempWheelImg;
        }
        let pinImg = await Assets.load('/wheel/pin.png');
        this.images["pin"] = pinImg;
    }

    showUI(){
        // this.recordUI = new CommonRecord(this.container, this.app);
        
        for(let i = 0;i < 6;i++){
            let tempRateUI = new RateUI();
            tempRateUI.init(this.colors[i]);
            this.rateUI[i] = tempRateUI;
        }

        this.initWheelCnt();
        // this.showSettingUI();
    }
    /**初始化轮盘 */
    initWheelCnt(){
        let i = 0;
        for(i = 0;i < 6;i++){
            let tempWheel = new Sprite(this.images["wheel" + (5-i)]);
            tempWheel.anchor.set(0.5);
            this.wheelContainer.addChild(tempWheel);
            this.testImg = tempWheel;
            tempWheel.visible = false;
            this.wheels[(5-i)] = tempWheel;

            let tempMask = new Graphics();
            this.wheelMasks[i] = tempMask;
        }

        this.resultCenterBg = new Graphics;
        this.resultCenterBg.clear();
        this.resultCenterBg.lineStyle(5, 0x000000, 1);
        this.resultCenterBg.beginFill(0x353535, 1);
        this.resultCenterBg.drawCircle(0, 0, 60);// x、y、宽、高、圆角半径
        this.resultCenterBg.endFill();
        this.resultText = new BitmapText(
            '', {
            align: "center",
            fontName: "lan",
            fontSize: 32,
            tint: 0xffffff
        });
        this.resultText.anchor.set(0.5);

        this.shader = new Graphics;
        this.shader.clear();
        this.shader.beginFill(0x000000, 0.4);
        this.shader.drawCircle(0, 0, 220);// x、y、宽、高、圆角半径
        this.shader.endFill();

        this.initWheelMasks();

        let pinImg = new Sprite(this.images["pin"]);
        // pinImg.anchor.set(0.5);
        pinImg.x = (this.width - pinImg.width) / 2;
        pinImg.y = 0;

        let scale = (this.width - 120) / this.width;
        console.log("轮盘缩放幅度：", scale);
        this.wheelContainer.width *= scale;
        this.wheelContainer.height *= scale;
        this.wheelContainer.y = this.wheelContainer.height / 2 + 10;
        this.wheelContainer.x = this.width / 2;
        this.container.addChild(this.wheelContainer);

        this.resultCenterBg.x = this.wheelContainer.x;
        this.resultCenterBg.y = this.wheelContainer.y;
        this.container.addChild(this.resultCenterBg);
        this.resultText.x = this.resultCenterBg.x;
        this.resultText.y = this.resultCenterBg.y;
        this.container.addChild(this.resultText);

        this.container.addChild(pinImg);

        this.showRateUI();
    }
    /**隐藏各种颜色的轮圈 */
    hideAllWheels(){
        for(let i in this.wheels){
            this.wheels[i].visible = false;
        }
    }
    /**初始化轮圈的遮罩 */
    initWheelMasks(){
        this.hideAllWheels();
        let rows = (this.rowId + 1) * 10;
        let jiaodu = Math.PI * 2 / rows;
        let wheelData = Wheel.wheelData[this.rowId][this.segment];
        let key,i = 0;
        for(key in wheelData){
            let tempMask = this.wheelMasks[key];
            tempMask.clear();
            tempMask.beginFill(0xffffff, 1);
            for(i = 0;i < wheelData[key]["ids"].length;i++){
                tempMask.moveTo(0, 0);
                tempMask.arc(0, 0, 240, - Math.PI / 2 + wheelData[key]["ids"][i] * jiaodu, - Math.PI / 2 + wheelData[key]["ids"][i] * jiaodu + jiaodu, false);
            }
            tempMask.closePath();
            this.wheelContainer.addChild(tempMask);
            this.wheels[key].mask = tempMask;
            this.wheels[key].visible = true;
        }

        for(let i = 0;i < rows;i++){
            let tempMask = new Graphics();
            tempMask.clear();
            tempMask.beginFill((0x232323 + 0x606060 * (i % 2)), 1);
            tempMask.moveTo(0, 0);
            tempMask.arc(0, 0, 210, 0 - Math.PI / 2, 0 - Math.PI / 2 + jiaodu, false);
            tempMask.closePath();
            tempMask.rotation = jiaodu * i;
            this.wheelContainer.addChild(tempMask);

            this.masks.push(tempMask);
        }
        this.wheelContainer.rotation = 0;

        this.wheelContainer.addChild(this.shader);
    }
    /**隐藏概率相关UI */
    hideRateUI(){
        for(let i in this.rateUI){
            this.container.removeChild(this.rateUI[i].getUI());
        }
    }
    /**显示概率返还UI */
    showRateUI(){
        this.hideRateUI();
        let key,i = 0;
        let wheelData = Wheel.wheelData[this.rowId][this.segment];
        let kinds = 0;
        for(key in wheelData){
            kinds ++;
        }
        let rWidth = (this.width - 40 - (kinds - 1) * 6) / kinds;
        for(key in wheelData){
            this.rateUI[key].changePayout(wheelData[key]["payout"]);
            this.rateUI[key].changeSize(rWidth);
            this.rateUI[key].getUI().x = 20 + i * 6 + i * rWidth;
            this.rateUI[key].getUI().y = this.wheelContainer.height + 20;
            i++;
            this.container.addChild(this.rateUI[key].getUI());
        }
    }

    /**外部接口：改变分割数 */
    changeRows(rowId){
        this.rowId = rowId;
        this.initWheelMasks();
        this.showRateUI();
    }
    /**外部接口：改变难易程度 */
    changeSegment(segment){
        this.segment = segment;
        this.initWheelMasks();
        this.showRateUI();
    }

    showSettingUI(){
        const tipText = new BitmapText(
            'Segment', {
            align: "center",
            fontName: "lan",
            fontSize: 18,
            tint: 0xffffff
        });
        // this.tipText.anchor.set(0.5);
        tipText.x = 10;
        this.setContainer.addChild(tipText);

        const modeSelBg = new Graphics;
        modeSelBg.clear();
        modeSelBg.beginFill(0x303030, 1);
        modeSelBg.drawRoundedRect(0, 0, this.width - 20, 40, 6);// x、y、宽、高、圆角半径
        modeSelBg.endFill();
        modeSelBg.x = 10;// 左边间距10
        modeSelBg.y = 40;
        this.setContainer.addChild(modeSelBg);

        const lowBtn = new Graphics;
        lowBtn.clear();
        lowBtn.beginFill(0x707070, 1);
        lowBtn.drawRoundedRect(0, 0, (this.width - 24)/3, 38, 6);// x、y、宽、高、圆角半径
        lowBtn.endFill();
        lowBtn.x = 12;
        lowBtn.y = 41;
        this.setContainer.addChild(lowBtn);
        const lowText = new BitmapText(
            'Low', {
            align: "center",
            fontName: "lan",
            fontSize: 18,
            tint: 0xffffff
        });
        lowText.anchor.set(0.5);
        lowText.x = lowBtn.x + lowBtn.width / 2;
        lowText.y = lowBtn.y + lowBtn.height / 2;
        this.setContainer.addChild(lowText);

        const mediumBtn = new Graphics;
        mediumBtn.clear();
        mediumBtn.beginFill(0x707070, 1);
        mediumBtn.drawRoundedRect(0, 0, (this.width - 24)/3, 38, 6);// x、y、宽、高、圆角半径
        mediumBtn.endFill();
        mediumBtn.x = 12 + (this.width - 24)/3;
        mediumBtn.y = 41;
        this.setContainer.addChild(mediumBtn);
        const mediumText = new BitmapText(
            'Medium', {
            align: "center",
            fontName: "lan",
            fontSize: 18,
            tint: 0xffffff
        });
        mediumText.anchor.set(0.5);
        mediumText.x = mediumBtn.x + mediumBtn.width / 2;
        mediumText.y = mediumBtn.y + mediumBtn.height / 2;
        this.setContainer.addChild(mediumText);

        const highBtn = new Graphics;
        highBtn.clear();
        highBtn.beginFill(0x707070, 1);
        highBtn.drawRoundedRect(0, 0, (this.width - 24)/3, 38, 6);// x、y、宽、高、圆角半径
        highBtn.endFill();
        highBtn.x = 12 + (this.width - 24) * 2/3;
        highBtn.y = 41;
        this.setContainer.addChild(highBtn);
        const highText = new BitmapText(
            'High', {
            align: "center",
            fontName: "lan",
            fontSize: 18,
            tint: 0xffffff
        });
        highText.anchor.set(0.5);
        highText.x = highBtn.x + highBtn.width / 2;
        highText.y = highBtn.y + highBtn.height / 2;
        this.setContainer.addChild(highText);

        this.segment = 0;
        lowBtn.alpha = 1;
        mediumBtn.alpha = 0.1;
        highBtn.alpha = 0.1;
        lowText.tint = 0xffffff;
        mediumText.tint = 0x7f7f7f;
        highText.tint = 0x7f7f7f;
        
        lowBtn.eventMode = 'static';
        lowBtn.cursor = 'pointer';
        lowBtn.on("pointerdown", ()=>{
            if(this.segment == 0){
                return;
            }
            lowBtn.alpha = 1;
            mediumBtn.alpha = 0.1;
            highBtn.alpha = 0.1;
            lowText.tint = 0xffffff;
            mediumText.tint = 0x7f7f7f;
            highText.tint = 0x7f7f7f;
            this.segment = 0;

            this.initWheelMasks();
            this.showRateUI();
        });

        mediumBtn.eventMode = 'static';
        mediumBtn.cursor = 'pointer';
        mediumBtn.on("pointerdown", ()=>{
            if(this.segment == 1){
                return;
            }
            lowBtn.alpha = 0.1;
            mediumBtn.alpha = 1;
            highBtn.alpha = 0.1;
            lowText.tint = 0x7f7f7f;
            mediumText.tint = 0xffffff;
            highText.tint = 0x7f7f7f;
            this.segment = 1;

            this.initWheelMasks();
            this.showRateUI();
        });

        highBtn.eventMode = 'static';
        highBtn.cursor = 'pointer';
        highBtn.on("pointerdown", ()=>{
            if(this.segment == 2){
                return;
            }
            lowBtn.alpha = 0.1;
            mediumBtn.alpha = 0.1;
            highBtn.alpha = 1;
            lowText.tint = 0x7f7f7f;
            mediumText.tint = 0x7f7f7f;
            highText.tint = 0xffffff;
            this.segment = 2;

            this.initWheelMasks();
            this.showRateUI();
        });

        const rowTipText = new BitmapText(
            'Row', {
            align: "center",
            fontName: "lan",
            fontSize: 18,
            tint: 0xffffff
        });
        // this.rowTipText.anchor.set(0.5);
        rowTipText.x = 10;
        rowTipText.y = 90;
        this.setContainer.addChild(rowTipText);

        for(let i = 0;i < 5;i++){
            this.addRowBtn(i);
        }

        this.clearRowBtns();
        this.rowId = 0;
        this.rowBtns[this.rowId].alpha = 1;

        const startBtn = new Graphics;
        startBtn.clear();
        startBtn.beginFill(0x5EE63A, 1);
        startBtn.drawRoundedRect(0, 0, this.width - 20, 40, 6);// x、y、宽、高、圆角半径
        startBtn.endFill();
        startBtn.x = 10;
        startBtn.y = 190;
        this.setContainer.addChild(startBtn);
        const startText = new BitmapText(
            'START', {
            align: "center",
            fontName: "lan",
            fontSize: 18,
            tint: 0x000000
        });
        startText.anchor.set(0.5);
        startText.x = startBtn.x + startBtn.width / 2;
        startText.y = startBtn.y + startBtn.height / 2;
        this.setContainer.addChild(startText);
        startBtn.eventMode = 'static';
        startBtn.cursor = 'pointer';
        startBtn.on("pointerdown", ()=>{
            this.start();
        });

        this.setContainer.y = this.height - this.setContainer.height - 20;
        this.container.addChild(this.setContainer);

        this.showRateUI();
    }

    addRowBtn(index){
        const rowBtnNorBg = new Graphics;
        rowBtnNorBg.clear();
        rowBtnNorBg.beginFill(0x303030, 1);
        rowBtnNorBg.drawRoundedRect(0, 0, 40, 40, 6);// x、y、宽、高、圆角半径
        rowBtnNorBg.endFill();
        rowBtnNorBg.x = index * 50 + 10;// 左边间距10，相隔10
        rowBtnNorBg.y = 130;
        this.setContainer.addChild(rowBtnNorBg);

        const rowBtnBg = new Graphics;
        rowBtnBg.clear();
        rowBtnBg.beginFill(0xefffef, 1);
        rowBtnBg.drawRoundedRect(0, 0, 40, 40, 6);// x、y、宽、高、圆角半径
        rowBtnBg.endFill();
        rowBtnBg.x = rowBtnNorBg.x;// 左边间距10，相隔10
        rowBtnBg.y = rowBtnNorBg.y;
        this.setContainer.addChild(rowBtnBg);
        this.rowBtns.push(rowBtnBg);
        rowBtnBg.eventMode = 'static';
        rowBtnBg.cursor = 'pointer';
        rowBtnBg.on("pointerdown", ()=>{
            if(this.rowId == index){
                return;
            }
            this.clearRowBtns();
            rowBtnBg.alpha = 1;
            this.rowId = index;

            this.initWheelMasks();
            this.showRateUI();
        });

        const leftText = new BitmapText(
            '' + (index + 1) * 10, {
            align: "center",
            fontName: "lan",
            fontSize: 16,
            tint: 0x000000
        });
        leftText.anchor.set(0.5);
        leftText.x = rowBtnBg.x + 20;
        leftText.y = rowBtnBg.y + 20;
        this.setContainer.addChild(leftText);
    }

    clearRowBtns(){
        for(let i = 0;i < 5;i++){
            this.rowBtns[i].alpha = 0.1;
        }
    }

    getSettingData(){
        return {
            style: this.segment + 1,
            row:this.rowId,
        }
    }
}

// export {Wheel}

window.__GLSDK_SETUP__&&window.__GLSDK_SETUP__({name:"wheel",version:"1.0.0"}, Wheel);
