// import { Engine, Render, Body, World, Events, Bodies, Composite, Runner } from 'matter-js'
// import { utils, Texture, Container, Assets, Sprite, BitmapText, Graphics } from "pixi.js";

const { utils: utils$1, gsap: gsap$1, Container: Container$1, ColorMatrixFilter: ColorMatrixFilter$1, Assets: Assets$1, Texture: Texture$1, Sprite: Sprite$1, Point: Point$1, BitmapText: BitmapText$1, Graphics: Graphics$1, Engine, Render, Body, World, Events, Bodies, Composite, Runner } = __PIXIV7__;


class PlinkoPhysicsCtrl {
    static plinkoData = [
        [
            {
                val:-4,
                payout:{
                    low:5.6,
                    medium:13,
                    high:29
                },
                chance:0.3906
            },
            {
                val:-3,
                payout:{
                    low:2.1,
                    medium:3.0,
                    high:4.0
                },
                chance:3.1250
            },
            {
                val:-2,
                payout:{
                    low:1.1,
                    medium:1.3,
                    high:1.5
                },
                chance:10.9375
            },
            {
                val:-1,
                payout:{
                    low:1.0,
                    medium:0.7,
                    high:0.3
                },
                chance:21.8750
            },
            {
                val:0,
                payout:{
                    low:0.5,
                    medium:0.4,
                    high:0.2
                },
                chance:27.3438
            },
            {
                val:1,
                payout:{
                    low:1.0,
                    medium:0.7,
                    high:0.3
                },
                chance:21.8750
            },
            {
                val:2,
                payout:{
                    low:1.1,
                    medium:1.3,
                    high:1.5
                },
                chance:10.9375
            },
            {
                val:3,
                payout:{
                    low:2.1,
                    medium:3.0,
                    high:4.0
                },
                chance:3.1250
            },
            {
                val:4,
                payout:{
                    low:5.6,
                    medium:13,
                    high:29
                },
                chance:0.3906
            }
        ],
        [
            {
                val:-5,
                payout:{
                    low:5.6,
                    medium:18,
                    high:43
                },
                chance:0.1953
            },
            {
                val:-4,
                payout:{
                    low:2.0,
                    medium:4.0,
                    high:7.0
                },
                chance:1.7578
            },
            {
                val:-3,
                payout:{
                    low:1.6,
                    medium:1.7,
                    high:2.0
                },
                chance:7.0313
            },
            {
                val:-2,
                payout:{
                    low:1.0,
                    medium:0.9,
                    high:0.6
                },
                chance:16.4063
            },
            {
                val:-1,
                payout:{
                    low:0.7,
                    medium:0.5,
                    high:0.2
                },
                chance:24.6094
            },
            {
                val:1,
                payout:{
                    low:0.7,
                    medium:0.5,
                    high:0.2
                },
                chance:24.6094
            },
            {
                val:2,
                payout:{
                    low:1.0,
                    medium:0.9,
                    high:0.6
                },
                chance:16.4063
            },
            {
                val:3,
                payout:{
                    low:1.6,
                    medium:1.7,
                    high:2.0
                },
                chance:7.0313
            },
            {
                val:4,
                payout:{
                    low:2.0,
                    medium:4.0,
                    high:7.0
                },
                chance:1.7578
            },
            {
                val:5,
                payout:{
                    low:5.6,
                    medium:18,
                    high:43
                },
                chance:0.1953
            }
        ],
        [
            {
                val:-5,
                payout:{
                    low:8.9,
                    medium:22,
                    high:76
                },
                chance:0.0977
            },
            {
                val:-4,
                payout:{
                    low:3.0,
                    medium:5.0,
                    high:10
                },
                chance:0.9766
            },
            {
                val:-3,
                payout:{
                    low:1.4,
                    medium:2.0,
                    high:3.0
                },
                chance:4.3945
            },
            {
                val:-2,
                payout:{
                    low:1.1,
                    medium:1.4,
                    high:0.9
                },
                chance:11.7188
            },
            {
                val:-1,
                payout:{
                    low:1.0,
                    medium:0.6,
                    high:0.3
                },
                chance:20.5078
            },
            {
                val:0,
                payout:{
                    low:0.5,
                    medium:0.4,
                    high:0.2
                },
                chance:24.6094
            },
            {
                val:1,
                payout:{
                    low:1.0,
                    medium:0.6,
                    high:0.3
                },
                chance:20.5078
            },
            {
                val:2,
                payout:{
                    low:1.1,
                    medium:1.4,
                    high:0.9
                },
                chance:11.7188
            },
            {
                val:3,
                payout:{
                    low:1.4,
                    medium:2.0,
                    high:3.0
                },
                chance:4.3945
            },
            {
                val:4,
                payout:{
                    low:3.0,
                    medium:5.0,
                    high:10
                },
                chance:0.9766
            },
            {
                val:5,
                payout:{
                    low:8.9,
                    medium:22,
                    high:76
                },
                chance:0.0977
            }
        ],
        [
            {
                val:-6,
                payout:{
                    low:8.4,
                    medium:24,
                    high:120
                },
                chance:0.0488
            },
            {
                val:-5,
                payout:{
                    low:3.0,
                    medium:6.0,
                    high:14
                },
                chance:0.5371
            },
            {
                val:-4,
                payout:{
                    low:1.9,
                    medium:3.0,
                    high:5.2
                },
                chance:2.6855
            },
            {
                val:-3,
                payout:{
                    low:1.3,
                    medium:1.8,
                    high:1.4
                },
                chance:8.0566
            },
            {
                val:-2,
                payout:{
                    low:1.0,
                    medium:0.7,
                    high:0.4
                },
                chance:16.1133
            },
            {
                val:-1,
                payout:{
                    low:0.7,
                    medium:0.5,
                    high:0.2
                },
                chance:22.5586
            },
            {
                val:1,
                payout:{
                    low:0.7,
                    medium:0.5,
                    high:0.2
                },
                chance:22.5586
            },
            {
                val:2,
                payout:{
                    low:1.0,
                    medium:0.7,
                    high:0.4
                },
                chance:16.1133
            },
            {
                val:3,
                payout:{
                    low:1.3,
                    medium:1.8,
                    high:1.4
                },
                chance:8.0566
            },
            {
                val:4,
                payout:{
                    low:1.9,
                    medium:3.0,
                    high:5.2
                },
                chance:2.6855
            },
            {
                val:5,
                payout:{
                    low:3.0,
                    medium:6.0,
                    high:14
                },
                chance:0.5371
            },
            {
                val:6,
                payout:{
                    low:8.4,
                    medium:24,
                    high:120
                },
                chance:0.0488
            }
        ],
        [
            {
                val:-6,
                payout:{
                    low:10,
                    medium:33,
                    high:170
                },
                chance:0.0244
            },
            {
                val:-5,
                payout:{
                    low:3.0,
                    medium:11,
                    high:24
                },
                chance:0.2930
            },
            {
                val:-4,
                payout:{
                    low:1.6,
                    medium:4.0,
                    high:8.1
                },
                chance:1.6113
            },
            {
                val:-3,
                payout:{
                    low:1.4,
                    medium:2.0,
                    high:2.0
                },
                chance:5.3711
            },
            {
                val:-2,
                payout:{
                    low:1.1,
                    medium:1.1,
                    high:0.7
                },
                chance:12.0850
            },
            {
                val:-1,
                payout:{
                    low:1.0,
                    medium:0.6,
                    high:0.2
                },
                chance:19.3359
            },
            {
                val:0,
                payout:{
                    low:0.5,
                    medium:0.3,
                    high:0.2
                },
                chance:22.5586
            },
            {
                val:1,
                payout:{
                    low:1.0,
                    medium:0.6,
                    high:0.2
                },
                chance:19.3359
            },
            {
                val:2,
                payout:{
                    low:1.1,
                    medium:1.1,
                    high:0.7
                },
                chance:12.0850
            },
            {
                val:3,
                payout:{
                    low:1.4,
                    medium:2.0,
                    high:2.0
                },
                chance:5.3711
            },
            {
                val:4,
                payout:{
                    low:1.6,
                    medium:4.0,
                    high:8.1
                },
                chance:1.6113
            },
            {
                val:5,
                payout:{
                    low:3.0,
                    medium:11,
                    high:24
                },
                chance:0.2930
            },
            {
                val:6,
                payout:{
                    low:10,
                    medium:33,
                    high:170
                },
                chance:0.0244
            }
        ],
        [
            {
                val:-7,
                payout:{
                    low:8.1,
                    medium:43,
                    high:260
                },
                chance:0.0122
            },
            {
                val:-6,
                payout:{
                    low:4.0,
                    medium:13,
                    high:37
                },
                chance:0.1587
            },
            {
                val:-5,
                payout:{
                    low:3.0,
                    medium:6.0,
                    high:11
                },
                chance:0.9521
            },
            {
                val:-4,
                payout:{
                    low:1.9,
                    medium:3.0,
                    high:4.0
                },
                chance:3.4912
            },
            {
                val:-3,
                payout:{
                    low:1.2,
                    medium:1.3,
                    high:1.0
                },
                chance:8.7280
            },
            {
                val:-2,
                payout:{
                    low:0.9,
                    medium:0.7,
                    high:0.2
                },
                chance:15.7104
            },
            {
                val:-1,
                payout:{
                    low:0.7,
                    medium:0.4,
                    high:0.2
                },
                chance:20.9473
            },
            {
                val:1,
                payout:{
                    low:0.7,
                    medium:0.4,
                    high:0.2
                },
                chance:20.9473
            },
            {
                val:2,
                payout:{
                    low:0.9,
                    medium:0.7,
                    high:0.2
                },
                chance:15.7104
            },
            {
                val:3,
                payout:{
                    low:1.2,
                    medium:1.3,
                    high:1.0
                },
                chance:8.7280
            },
            {
                val:4,
                payout:{
                    low:1.9,
                    medium:3.0,
                    high:4.0
                },
                chance:3.4912
            },
            {
                val:5,
                payout:{
                    low:3.0,
                    medium:6.0,
                    high:11
                },
                chance:0.9521
            },
            {
                val:6,
                payout:{
                    low:4.0,
                    medium:13,
                    high:37
                },
                chance:0.1587
            },
            {
                val:7,
                payout:{
                    low:8.1,
                    medium:43,
                    high:260
                },
                chance:0.0122
            }
        ],
        [
            {
                val:-7,
                payout:{
                    low:7.1,
                    medium:58,
                    high:420
                },
                chance:0.0061
            },
            {
                val:-6,
                payout:{
                    low:4.0,
                    medium:15,
                    high:56
                },
                chance:0.0854
            },
            {
                val:-5,
                payout:{
                    low:1.9,
                    medium:7.0,
                    high:18
                },
                chance:0.5554
            },
            {
                val:-4,
                payout:{
                    low:1.4,
                    medium:4.0,
                    high:5.0
                },
                chance:2.2217
            },
            {
                val:-3,
                payout:{
                    low:1.3,
                    medium:1.9,
                    high:1.9
                },
                chance:6.1096
            },
            {
                val:-2,
                payout:{
                    low:1.1,
                    medium:1.0,
                    high:0.3
                },
                chance:12.2192
            },
            {
                val:-1,
                payout:{
                    low:1.0,
                    medium:0.5,
                    high:0.2
                },
                chance:18.3289
            },
            {
                val:0,
                payout:{
                    low:0.5,
                    medium:0.2,
                    high:0.2
                },
                chance:20.9473
            },
            {
                val:1,
                payout:{
                    low:1.0,
                    medium:0.5,
                    high:0.2
                },
                chance:18.3289
            },
            {
                val:2,
                payout:{
                    low:1.1,
                    medium:1.0,
                    high:0.3
                },
                chance:12.2192
            },
            {
                val:3,
                payout:{
                    low:1.3,
                    medium:1.9,
                    high:1.9
                },
                chance:6.1096
            },
            {
                val:4,
                payout:{
                    low:1.4,
                    medium:4.0,
                    high:5.0
                },
                chance:2.2217
            },
            {
                val:5,
                payout:{
                    low:1.9,
                    medium:7.0,
                    high:18
                },
                chance:0.5554
            },
            {
                val:6,
                payout:{
                    low:4.0,
                    medium:15,
                    high:56
                },
                chance:0.0854
            },
            {
                val:7,
                payout:{
                    low:7.1,
                    medium:58,
                    high:420
                },
                chance:0.0061
            }
        ],
        [
            {
                val:-8,
                payout:{
                    low:15,
                    medium:88,
                    high:620
                },
                chance:0.0031
            },
            {
                val:-7,
                payout:{
                    low:8.0,
                    medium:18,
                    high:83
                },
                chance:0.0458
            },
            {
                val:-6,
                payout:{
                    low:3.0,
                    medium:11,
                    high:27
                },
                chance:0.3204
            },
            {
                val:-5,
                payout:{
                    low:2.0,
                    medium:5.0,
                    high:8.0
                },
                chance:1.3885
            },
            {
                val:-4,
                payout:{
                    low:1.5,
                    medium:3.0,
                    high:3.0
                },
                chance:4.1656
            },
            {
                val:-3,
                payout:{
                    low:1.1,
                    medium:1.3,
                    high:0.5
                },
                chance:9.1644
            },
            {
                val:-2,
                payout:{
                    low:1.0,
                    medium:0.5,
                    high:0.2
                },
                chance:15.2740
            },
            {
                val:-1,
                payout:{
                    low:0.7,
                    medium:0.3,
                    high:0.2
                },
                chance:19.6381
            },
            {
                val:1,
                payout:{
                    low:0.7,
                    medium:0.3,
                    high:0.2
                },
                chance:19.6381
            },
            {
                val:2,
                payout:{
                    low:1.0,
                    medium:0.5,
                    high:0.2
                },
                chance:15.2740
            },
            {
                val:3,
                payout:{
                    low:1.1,
                    medium:1.3,
                    high:0.5
                },
                chance:9.1644
            },
            {
                val:4,
                payout:{
                    low:1.5,
                    medium:3.0,
                    high:3.0
                },
                chance:4.1656
            },
            {
                val:5,
                payout:{
                    low:2.0,
                    medium:5.0,
                    high:8.0
                },
                chance:1.3885
            },
            {
                val:6,
                payout:{
                    low:3.0,
                    medium:11,
                    high:27
                },
                chance:0.3204
            },
            {
                val:7,
                payout:{
                    low:8.0,
                    medium:18,
                    high:83
                },
                chance:0.0458
            },
            {
                val:8,
                payout:{
                    low:15,
                    medium:88,
                    high:620
                },
                chance:0.0031
            }
        ],
        [
            {
                val:-8,
                payout:{
                    low:16,
                    medium:110,
                    high:1000
                },
                chance:0.0015
            },
            {
                val:-7,
                payout:{
                    low:9.0,
                    medium:41,
                    high:130
                },
                chance:0.0244
            },
            {
                val:-6,
                payout:{
                    low:2.0,
                    medium:10,
                    high:26
                },
                chance:0.1831
            },
            {
                val:-5,
                payout:{
                    low:1.4,
                    medium:5.0,
                    high:9.0
                },
                chance:0.8545
            },
            {
                val:-4,
                payout:{
                    low:1.4,
                    medium:3.0,
                    high:4.0
                },
                chance:2.7771
            },
            {
                val:-3,
                payout:{
                    low:1.2,
                    medium:1.5,
                    high:2.0
                },
                chance:6.6650
            },
            {
                val:-2,
                payout:{
                    low:1.1,
                    medium:1.0,
                    high:0.2
                },
                chance:12.2192
            },
            {
                val:-1,
                payout:{
                    low:1.0,
                    medium:0.5,
                    high:0.2
                },
                chance:17.4561
            },
            {
                val:0,
                payout:{
                    low:0.5,
                    medium:0.3,
                    high:0.2
                },
                chance:19.6381
            },
            {
                val:1,
                payout:{
                    low:1.0,
                    medium:0.5,
                    high:0.2
                },
                chance:17.4561
            },
            {
                val:2,
                payout:{
                    low:1.1,
                    medium:1.0,
                    high:0.2
                },
                chance:12.2192
            },
            {
                val:3,
                payout:{
                    low:1.2,
                    medium:1.5,
                    high:2.0
                },
                chance:6.6650
            },
            {
                val:4,
                payout:{
                    low:1.4,
                    medium:3.0,
                    high:4.0
                },
                chance:2.7771
            },
            {
                val:5,
                payout:{
                    low:1.4,
                    medium:5.0,
                    high:9.0
                },
                chance:0.8545
            },
            {
                val:6,
                payout:{
                    low:2.0,
                    medium:10,
                    high:26
                },
                chance:0.1831
            },
            {
                val:7,
                payout:{
                    low:9.0,
                    medium:41,
                    high:130
                },
                chance:0.0244
            },
            {
                val:8,
                payout:{
                    low:16,
                    medium:110,
                    high:1000
                },
                chance:0.0015
            }
        ]
    ];
    constructor({ app }) {

        this.useRender = false;
        this.app = app;

        this.container = new Container$1;
        this.reelNum = 3;// 起步个数，顶部三个
        this.xw = 3;
        //
        this.rows = 10;
        // this.startPosition = { x: 195, y: 60 };
        this.startPosition = { x: 0, y: 10 };
        this.width = 100;

        //弹力
        this.restitution = .75;

        this.mass = .2;

        this.startY = 60;
        //点的大小。
        this.psize = 5;
        //滑动小球的大小。
        this.bsize = 10;
        this.ball = null;
        //不动的那些点。
        this.points = [];
        this.ground = null;
        this.wallL = null;// 左边墙
        this.wallR = null;// 右边墙

        this.gapX = 30;
        this.gapY = 30;
        //添加到世界的物体。
        this.worlds = [];
        this.engine = Engine.create();

        this.bells = [];
        this.onBall = null;

        this.dot = null;

        //球的池子，重复利用
        this.pool = [];


        //弹跳的小球
        this.balls = [];

        /**碰撞点的池子 */
        this.reelPool = [];
        
        // this.groundGraphic = new Graphics;

        this.whGraphics = new Graphics$1;

        /**图片缓存区 */
        this.images = {};

        /**底部payoutUI缓存区：总共17个 */
        this.payoutUIs = [];
        /**底部payout容器 */
        this.payoutContainer = new Container$1;
        
        this.floorResults = [
            [-4, -3, -2, -1, 0, 1, 2, 3, 4],// 8
            [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5],// 9
            [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5],// 10
            [-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6],// 11
            [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6],// 12
            [-7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7],// 13
            [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7],// 14
            [-8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8],// 15
            [-8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8],// 16
        ];
        this.riskStr = "low";

    }

    //初始化对象。传入点图片
    init(dotTexture) {

        this.dot = dotTexture;


        const { container, bsize } = this;

        // 顶部可下落的圆点
        this.pixiBall = new Sprite$1(this.dot);
        this.pixiBall.anchor.set(0.5);
        this.pixiBall.y = 10;
        container.addChild(this.pixiBall);

        // 这个圆点的物理刚体
        this.ball = Bodies.circle(0, 0, bsize,
            {
                isSensor:true,
                isStatic: true, render: {
                    fillStyle: '#ffffff'
                }
            });

        World.add(this.engine.world, this.ball);

        // 碰撞监听，pairs就是两个碰撞物体
        Events.on(this.engine, 'collisionStart', (event) => {

            const pair = event.pairs[0];
            if (!pair) return;

            if (pair.bodyA === this.ground) {
                console.log("和地平线碰撞====================");
                this.checkBall(pair.bodyB);
            }
        });

        var runner = Runner.create();
        Runner.run(runner, this.engine);

        this.initGround();
    }
    /**初始化底部的payoutUI */
    initPayoutUI(images){
        this.images = images;

        let i = 0;
        for(i = 0;i < 17;i++){
            let tempContainer = new Container$1;
            let tempSprite = new Sprite$1(this.images["res0"]);
            tempSprite.anchor.set(0.5);
            tempSprite.scale.x = 0.6;
            tempSprite.scale.y = 0.6;
            tempContainer.addChild(tempSprite);

            let tempPayoutText = new BitmapText$1(
                "1.01x", {
                align: "center",
                fontName: "lan",
                fontSize: 10,
                tint: 0xffffff
            });
            tempPayoutText.anchor.set(0.5);
            tempContainer.addChild(tempPayoutText);

            let payoutObj = {
                cnt: tempContainer,
                sprite: tempSprite,
                text: tempPayoutText
            };

            this.payoutUIs.push(payoutObj);
        }
    }

    initGround(){
        // this.groundGraphic.clear();
        // this.groundGraphic.beginFill(0x00ef98, 1);
        // this.groundGraphic.drawRect(- 20, 0, 40, 2);
        // this.groundGraphic.endFill();
        // this.container.addChild(this.groundGraphic);
        console.log("地平线");
    }
    /**移除所有圆点以及物理世界的刚体 */
    removeAllReel(){
        for(let i = 0;i < this.reelPool.length;i++){
            if(this.reelPool[i].parent){
                this.container.removeChild(this.reelPool[i]);
            }
        }
        this.reelPool = [];
        this.points = [];
        Composite.remove(this.engine.world, this.worlds);
        this.worlds = [];
    }
    /**根据传入的层数显示圆点 */
    showRows(rows){
        this.removeAllReel();
        this.rows = rows;
        
        let xs = this.reelNum;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0, k = xs; j < k; j++) {
                let c = Bodies.circle(0, 0, this.psize,
                    {
                        isStatic: true, render: {
                            fillStyle: '#ffffff'
                        }
                    });

                let s = new Sprite$1(this.dot);

                s.anchor.set(.5,.5);

                this.container.addChild(s);
                this.reelPool.push(s);

                this.points.push({
                    circle: c,
                    sprite: s
                });
                this.worlds.push(c);
            }
            xs++;
        }
        
        Composite.add(this.engine.world, this.worlds);

        this.resize();

        this.showPayoutUI();

        this.container.scale.x = Math.pow(0.92, rows - 8);
        this.container.scale.y = Math.pow(0.92, rows - 8);
    }

    resize() {

        this.width = this.app.screen.width;
        this.height = this.app.screen.height;

        const { width, mass, reelNum, worlds, gapX, gapY, startY,
            rows, points, bsize, startPosition, psize, restitution } = this;
        let xs = reelNum;
        let cw = gapX + psize, 
            ch = gapY + psize;
        // let w2 = width / 2;
        let w2 = 0;
        let idx = 0;

        if (this.ground) {
            console.log("移除地面");
            World.remove(this.engine.world, this.ground);
            this.ground = null;
        }
        // const gw = width * 2;
        const gw = (cw * 12 - gapX) * 2;
        const gy = rows * ch + startY;

        for (let i = 0; i < rows; i++) {

            let y = startY + ch * i;
            let offx = w2 - (cw * xs - gapX) / 2;

            for (let j = 0, k = xs; j < k; j++) {

                let x = offx + j * cw;
                let c = points[idx++];
                if (!c) continue;
                Body.set(c.circle, {
                    position: { x, y },
                    circleRadius: psize
                });

                c.sprite.width =
                c.sprite.height = psize*2;

                c.sprite.x = x;
                c.sprite.y = y;

                worlds.push(c);
            }

            xs++;
        }
        this.xw = xs;



        this.pixiBall.width =
        this.pixiBall.height = bsize/2;

        this.pixiBall.position.set(startPosition.x, startPosition.y);

        Body.set(this.ball, {
            isStatic: true,
            // restitution,
            // mass,
            position: startPosition,
            circleRadius: bsize
        });
        if (this.useRender && !this.render) {
            this.initRender();
            this.render.texture.update();

            console.log("initRender", this.render);
        }

        this.adaptGround(gw, gy);

    }

    adaptGround(gw, gy){

        // this.container.width + 40
        this.ground = Bodies.rectangle(0, gy, gw * 2, 2, {
            render: {
                fillStyle: '#ffffff'
            }, isStatic: true
        });
        
        // console.log("地平线参数：", this.ground.position.x, this.ground.position.y, this.ground.width);

        // this.groundGraphic.x = 0;
        // this.groundGraphic.y = gy;
        // this.groundGraphic.width = gw;
        
        World.add(this.engine.world, this.ground);
    }
    /**显示底部的payout数字 */
    showPayoutUI(){
        let num = this.rows + 1;
        console.log("111==========================");
        this.payoutContainer.removeChildren();
        let spaceX = this.gapX + this.psize;
        let ch = this.gapY + this.psize;

        let startPos = (num%2 == 1)?0:(spaceX / 2);

        // let colorId = Math.floor(num / 12);

        let i = 0;
        for(i = 0;i < num;i++){
            let payoutObj = this.payoutUIs[i];
            if(payoutObj){// cnt sprite text
                let index = this.floorResults[this.rows - 8][i];
                if(startPos != 0 && index > 0){
                    index -= 1;
                }
                let colorId = Math.abs(this.floorResults[this.rows - 8][i]);
                if(startPos != 0){
                    colorId -= 1;
                }
                if(colorId > 5){
                    colorId = 5;
                }
                console.log("颜色方块：", colorId);
                payoutObj.cnt.x = startPos + index * spaceX;
                payoutObj.sprite.texture = this.images["res" + colorId];
                payoutObj.text.text = PlinkoPhysicsCtrl.plinkoData[this.rows - 8][i]["payout"][this.riskStr] + "x";//"1.01" + "x";
                console.log("111");
                this.payoutContainer.addChild(payoutObj.cnt);
            }
        }

        this.payoutContainer.y = this.rows * ch + this.startY;
        console.log("111");
        this.container.addChild(this.payoutContainer);
    }

    //落地之后
    checkBall(ball) {

        const { width, xw, gapX, psize } = this;

        const cell = gapX + psize;
        const ballX = ball.position.x;
        const num = (this.rows%2) == 0?Math.round(ballX / cell) : (ballX / Math.abs(ballX)) * Math.ceil(Math.abs(ballX) / cell);
        // const num = 1
        World.remove(this.engine.world, ball);

        if (typeof this.onBall === 'function') {

            for(let i in this.balls){
                let o = this.balls[i];

                if( o.ball === ball ){
                    o.sprite.visible = false;
                    this.balls.splice(i,1);
                    break;
                }

            }
            

            this.onBall({
                no: num,
                id: ball.id
            });
        }

    }


    start(ops = {}) {
        const { mass, restitution, bsize, startPosition } = this;

        let { x, y } = ops;
        x = x || startPosition.x;
        y = y || startPosition.y;

        console.log("下落坐标：", x, y);
        const ball = Bodies.circle(x, y, bsize, {
            mass,
            // isStatic:true,
            restitution,
            circleRadius: bsize,
            render: {
                fillStyle: '#' + (Math.random() * 0xffffff | 0).toString(16)
            }
        });
        World.add(this.engine.world, ball);
        // this.bells.push(ball);

        let pixiBall = this.getBall();

        this.balls.push({
            ball,
            sprite: pixiBall
        });
        console.log("开始下落：",ball);
        return ball;
        // console.log(this.ball)
    }


    getBall() {

        let ball = null;
        for (let b in this.pool) {
            let v = this.pool[b];

            // console.log(b);
            if (!v.visible) {
                // b.visible = true;
                ball = v;
               
                break;
            }
        }

        if (!ball) {
            ball = new Sprite$1(this.dot);
            ball.anchor.set(.5,.5);
            this.container.addChild(ball);

            this.pool.push(ball);
        }

        ball.width = 
        ball.height = this.bsize*2;
        ball.visible = true;

        return ball;

    }
    initRender() {

        const c = document.createElement("canvas");

        c.width = this.width;
        c.height = this.height;
        let render = Render.create({
            canvas: c,
            engine: this.engine, // 绑定引擎
            options: {

                wireframes: false,
                width: this.width,
                height: this.height,
            }
        });

        Render.run(render);
        var runner = Runner.create();
        Runner.run(runner, this.engine);

        let t = Texture$1.from(c);
        let ren = this.render = new Sprite$1(t);
        ren.tint = 0xff0000;
        this.container.addChild(ren);
        console.log("ren:",ren);

    }

    reset() {

    }
    mount() {
        this.app.ticker.add(this.tick, this);
    }
    unmount() {
        this.app.ticker.remove(this.tick, this);
    }
    destroy() {

    }
    tick(d) {

        if (this.useRender) {
            this.render.texture.update();
        }



        this.balls.forEach(({ ball, sprite }) => {

            sprite.x = ball.position.x;
            sprite.y = ball.position.y;

        });

    }

    getUI(){
        return this.container;
    }

    showWH(){
        this.whGraphics.clear();
        this.whGraphics.beginFill(0x0f0f0f, 1);
        this.whGraphics.drawRect(0, 0, this.container.width, this.container.height);
        this.whGraphics.endFill();
        this.whGraphics.x = - this.container.width / 2;
        this.container.addChildAt(this.whGraphics,0);
    }
    changeRisk(riskStr){
        this.riskStr = riskStr;
        this.showPayoutUI();
    }
}

// import { utils, Container, Assets, Sprite, BitmapText, Graphics } from "pixi.js";
const { utils, gsap, Container, ColorMatrixFilter, Assets, Texture, Sprite, Point, BitmapText, Graphics } = __PIXIV7__;

class Plinko extends utils.EventEmitter{
    static plinkoData = [
        [
            {
                val:-4,
                payout:{
                    low:5.6,
                    medium:13,
                    high:29
                },
                chance:0.3906
            },
            {
                val:-3,
                payout:{
                    low:2.1,
                    medium:3.0,
                    high:4.0
                },
                chance:3.1250
            },
            {
                val:-2,
                payout:{
                    low:1.1,
                    medium:1.3,
                    high:1.5
                },
                chance:10.9375
            },
            {
                val:-1,
                payout:{
                    low:1.0,
                    medium:0.7,
                    high:0.3
                },
                chance:21.8750
            },
            {
                val:0,
                payout:{
                    low:0.5,
                    medium:0.4,
                    high:0.2
                },
                chance:27.3438
            },
            {
                val:1,
                payout:{
                    low:1.0,
                    medium:0.7,
                    high:0.3
                },
                chance:21.8750
            },
            {
                val:2,
                payout:{
                    low:1.1,
                    medium:1.3,
                    high:1.5
                },
                chance:10.9375
            },
            {
                val:3,
                payout:{
                    low:2.1,
                    medium:3.0,
                    high:4.0
                },
                chance:3.1250
            },
            {
                val:4,
                payout:{
                    low:5.6,
                    medium:13,
                    high:29
                },
                chance:0.3906
            }
        ],
        [
            {
                val:-5,
                payout:{
                    low:5.6,
                    medium:18,
                    high:43
                },
                chance:0.1953
            },
            {
                val:-4,
                payout:{
                    low:2.0,
                    medium:4.0,
                    high:7.0
                },
                chance:1.7578
            },
            {
                val:-3,
                payout:{
                    low:1.6,
                    medium:1.7,
                    high:2.0
                },
                chance:7.0313
            },
            {
                val:-2,
                payout:{
                    low:1.0,
                    medium:0.9,
                    high:0.6
                },
                chance:16.4063
            },
            {
                val:-1,
                payout:{
                    low:0.7,
                    medium:0.5,
                    high:0.2
                },
                chance:24.6094
            },
            {
                val:1,
                payout:{
                    low:0.7,
                    medium:0.5,
                    high:0.2
                },
                chance:24.6094
            },
            {
                val:2,
                payout:{
                    low:1.0,
                    medium:0.9,
                    high:0.6
                },
                chance:16.4063
            },
            {
                val:3,
                payout:{
                    low:1.6,
                    medium:1.7,
                    high:2.0
                },
                chance:7.0313
            },
            {
                val:4,
                payout:{
                    low:2.0,
                    medium:4.0,
                    high:7.0
                },
                chance:1.7578
            },
            {
                val:5,
                payout:{
                    low:5.6,
                    medium:18,
                    high:43
                },
                chance:0.1953
            }
        ],
        [
            {
                val:-5,
                payout:{
                    low:8.9,
                    medium:22,
                    high:76
                },
                chance:0.0977
            },
            {
                val:-4,
                payout:{
                    low:3.0,
                    medium:5.0,
                    high:10
                },
                chance:0.9766
            },
            {
                val:-3,
                payout:{
                    low:1.4,
                    medium:2.0,
                    high:3.0
                },
                chance:4.3945
            },
            {
                val:-2,
                payout:{
                    low:1.1,
                    medium:1.4,
                    high:0.9
                },
                chance:11.7188
            },
            {
                val:-1,
                payout:{
                    low:1.0,
                    medium:0.6,
                    high:0.3
                },
                chance:20.5078
            },
            {
                val:0,
                payout:{
                    low:0.5,
                    medium:0.4,
                    high:0.2
                },
                chance:24.6094
            },
            {
                val:1,
                payout:{
                    low:1.0,
                    medium:0.6,
                    high:0.3
                },
                chance:20.5078
            },
            {
                val:2,
                payout:{
                    low:1.1,
                    medium:1.4,
                    high:0.9
                },
                chance:11.7188
            },
            {
                val:3,
                payout:{
                    low:1.4,
                    medium:2.0,
                    high:3.0
                },
                chance:4.3945
            },
            {
                val:4,
                payout:{
                    low:3.0,
                    medium:5.0,
                    high:10
                },
                chance:0.9766
            },
            {
                val:5,
                payout:{
                    low:8.9,
                    medium:22,
                    high:76
                },
                chance:0.0977
            }
        ],
        [
            {
                val:-6,
                payout:{
                    low:8.4,
                    medium:24,
                    high:120
                },
                chance:0.0488
            },
            {
                val:-5,
                payout:{
                    low:3.0,
                    medium:6.0,
                    high:14
                },
                chance:0.5371
            },
            {
                val:-4,
                payout:{
                    low:1.9,
                    medium:3.0,
                    high:5.2
                },
                chance:2.6855
            },
            {
                val:-3,
                payout:{
                    low:1.3,
                    medium:1.8,
                    high:1.4
                },
                chance:8.0566
            },
            {
                val:-2,
                payout:{
                    low:1.0,
                    medium:0.7,
                    high:0.4
                },
                chance:16.1133
            },
            {
                val:-1,
                payout:{
                    low:0.7,
                    medium:0.5,
                    high:0.2
                },
                chance:22.5586
            },
            {
                val:1,
                payout:{
                    low:0.7,
                    medium:0.5,
                    high:0.2
                },
                chance:22.5586
            },
            {
                val:2,
                payout:{
                    low:1.0,
                    medium:0.7,
                    high:0.4
                },
                chance:16.1133
            },
            {
                val:3,
                payout:{
                    low:1.3,
                    medium:1.8,
                    high:1.4
                },
                chance:8.0566
            },
            {
                val:4,
                payout:{
                    low:1.9,
                    medium:3.0,
                    high:5.2
                },
                chance:2.6855
            },
            {
                val:5,
                payout:{
                    low:3.0,
                    medium:6.0,
                    high:14
                },
                chance:0.5371
            },
            {
                val:6,
                payout:{
                    low:8.4,
                    medium:24,
                    high:120
                },
                chance:0.0488
            }
        ],
        [
            {
                val:-6,
                payout:{
                    low:10,
                    medium:33,
                    high:170
                },
                chance:0.0244
            },
            {
                val:-5,
                payout:{
                    low:3.0,
                    medium:11,
                    high:24
                },
                chance:0.2930
            },
            {
                val:-4,
                payout:{
                    low:1.6,
                    medium:4.0,
                    high:8.1
                },
                chance:1.6113
            },
            {
                val:-3,
                payout:{
                    low:1.4,
                    medium:2.0,
                    high:2.0
                },
                chance:5.3711
            },
            {
                val:-2,
                payout:{
                    low:1.1,
                    medium:1.1,
                    high:0.7
                },
                chance:12.0850
            },
            {
                val:-1,
                payout:{
                    low:1.0,
                    medium:0.6,
                    high:0.2
                },
                chance:19.3359
            },
            {
                val:0,
                payout:{
                    low:0.5,
                    medium:0.3,
                    high:0.2
                },
                chance:22.5586
            },
            {
                val:1,
                payout:{
                    low:1.0,
                    medium:0.6,
                    high:0.2
                },
                chance:19.3359
            },
            {
                val:2,
                payout:{
                    low:1.1,
                    medium:1.1,
                    high:0.7
                },
                chance:12.0850
            },
            {
                val:3,
                payout:{
                    low:1.4,
                    medium:2.0,
                    high:2.0
                },
                chance:5.3711
            },
            {
                val:4,
                payout:{
                    low:1.6,
                    medium:4.0,
                    high:8.1
                },
                chance:1.6113
            },
            {
                val:5,
                payout:{
                    low:3.0,
                    medium:11,
                    high:24
                },
                chance:0.2930
            },
            {
                val:6,
                payout:{
                    low:10,
                    medium:33,
                    high:170
                },
                chance:0.0244
            }
        ],
        [
            {
                val:-7,
                payout:{
                    low:8.1,
                    medium:43,
                    high:260
                },
                chance:0.0122
            },
            {
                val:-6,
                payout:{
                    low:4.0,
                    medium:13,
                    high:37
                },
                chance:0.1587
            },
            {
                val:-5,
                payout:{
                    low:3.0,
                    medium:6.0,
                    high:11
                },
                chance:0.9521
            },
            {
                val:-4,
                payout:{
                    low:1.9,
                    medium:3.0,
                    high:4.0
                },
                chance:3.4912
            },
            {
                val:-3,
                payout:{
                    low:1.2,
                    medium:1.3,
                    high:1.0
                },
                chance:8.7280
            },
            {
                val:-2,
                payout:{
                    low:0.9,
                    medium:0.7,
                    high:0.2
                },
                chance:15.7104
            },
            {
                val:-1,
                payout:{
                    low:0.7,
                    medium:0.4,
                    high:0.2
                },
                chance:20.9473
            },
            {
                val:1,
                payout:{
                    low:0.7,
                    medium:0.4,
                    high:0.2
                },
                chance:20.9473
            },
            {
                val:2,
                payout:{
                    low:0.9,
                    medium:0.7,
                    high:0.2
                },
                chance:15.7104
            },
            {
                val:3,
                payout:{
                    low:1.2,
                    medium:1.3,
                    high:1.0
                },
                chance:8.7280
            },
            {
                val:4,
                payout:{
                    low:1.9,
                    medium:3.0,
                    high:4.0
                },
                chance:3.4912
            },
            {
                val:5,
                payout:{
                    low:3.0,
                    medium:6.0,
                    high:11
                },
                chance:0.9521
            },
            {
                val:6,
                payout:{
                    low:4.0,
                    medium:13,
                    high:37
                },
                chance:0.1587
            },
            {
                val:7,
                payout:{
                    low:8.1,
                    medium:43,
                    high:260
                },
                chance:0.0122
            }
        ],
        [
            {
                val:-7,
                payout:{
                    low:7.1,
                    medium:58,
                    high:420
                },
                chance:0.0061
            },
            {
                val:-6,
                payout:{
                    low:4.0,
                    medium:15,
                    high:56
                },
                chance:0.0854
            },
            {
                val:-5,
                payout:{
                    low:1.9,
                    medium:7.0,
                    high:18
                },
                chance:0.5554
            },
            {
                val:-4,
                payout:{
                    low:1.4,
                    medium:4.0,
                    high:5.0
                },
                chance:2.2217
            },
            {
                val:-3,
                payout:{
                    low:1.3,
                    medium:1.9,
                    high:1.9
                },
                chance:6.1096
            },
            {
                val:-2,
                payout:{
                    low:1.1,
                    medium:1.0,
                    high:0.3
                },
                chance:12.2192
            },
            {
                val:-1,
                payout:{
                    low:1.0,
                    medium:0.5,
                    high:0.2
                },
                chance:18.3289
            },
            {
                val:0,
                payout:{
                    low:0.5,
                    medium:0.2,
                    high:0.2
                },
                chance:20.9473
            },
            {
                val:1,
                payout:{
                    low:1.0,
                    medium:0.5,
                    high:0.2
                },
                chance:18.3289
            },
            {
                val:2,
                payout:{
                    low:1.1,
                    medium:1.0,
                    high:0.3
                },
                chance:12.2192
            },
            {
                val:3,
                payout:{
                    low:1.3,
                    medium:1.9,
                    high:1.9
                },
                chance:6.1096
            },
            {
                val:4,
                payout:{
                    low:1.4,
                    medium:4.0,
                    high:5.0
                },
                chance:2.2217
            },
            {
                val:5,
                payout:{
                    low:1.9,
                    medium:7.0,
                    high:18
                },
                chance:0.5554
            },
            {
                val:6,
                payout:{
                    low:4.0,
                    medium:15,
                    high:56
                },
                chance:0.0854
            },
            {
                val:7,
                payout:{
                    low:7.1,
                    medium:58,
                    high:420
                },
                chance:0.0061
            }
        ],
        [
            {
                val:-8,
                payout:{
                    low:15,
                    medium:88,
                    high:620
                },
                chance:0.0031
            },
            {
                val:-7,
                payout:{
                    low:8.0,
                    medium:18,
                    high:83
                },
                chance:0.0458
            },
            {
                val:-6,
                payout:{
                    low:3.0,
                    medium:11,
                    high:27
                },
                chance:0.3204
            },
            {
                val:-5,
                payout:{
                    low:2.0,
                    medium:5.0,
                    high:8.0
                },
                chance:1.3885
            },
            {
                val:-4,
                payout:{
                    low:1.5,
                    medium:3.0,
                    high:3.0
                },
                chance:4.1656
            },
            {
                val:-3,
                payout:{
                    low:1.1,
                    medium:1.3,
                    high:0.5
                },
                chance:9.1644
            },
            {
                val:-2,
                payout:{
                    low:1.0,
                    medium:0.5,
                    high:0.2
                },
                chance:15.2740
            },
            {
                val:-1,
                payout:{
                    low:0.7,
                    medium:0.3,
                    high:0.2
                },
                chance:19.6381
            },
            {
                val:1,
                payout:{
                    low:0.7,
                    medium:0.3,
                    high:0.2
                },
                chance:19.6381
            },
            {
                val:2,
                payout:{
                    low:1.0,
                    medium:0.5,
                    high:0.2
                },
                chance:15.2740
            },
            {
                val:3,
                payout:{
                    low:1.1,
                    medium:1.3,
                    high:0.5
                },
                chance:9.1644
            },
            {
                val:4,
                payout:{
                    low:1.5,
                    medium:3.0,
                    high:3.0
                },
                chance:4.1656
            },
            {
                val:5,
                payout:{
                    low:2.0,
                    medium:5.0,
                    high:8.0
                },
                chance:1.3885
            },
            {
                val:6,
                payout:{
                    low:3.0,
                    medium:11,
                    high:27
                },
                chance:0.3204
            },
            {
                val:7,
                payout:{
                    low:8.0,
                    medium:18,
                    high:83
                },
                chance:0.0458
            },
            {
                val:8,
                payout:{
                    low:15,
                    medium:88,
                    high:620
                },
                chance:0.0031
            }
        ],
        [
            {
                val:-8,
                payout:{
                    low:16,
                    medium:110,
                    high:1000
                },
                chance:0.0015
            },
            {
                val:-7,
                payout:{
                    low:9.0,
                    medium:41,
                    high:130
                },
                chance:0.0244
            },
            {
                val:-6,
                payout:{
                    low:2.0,
                    medium:10,
                    high:26
                },
                chance:0.1831
            },
            {
                val:-5,
                payout:{
                    low:1.4,
                    medium:5.0,
                    high:9.0
                },
                chance:0.8545
            },
            {
                val:-4,
                payout:{
                    low:1.4,
                    medium:3.0,
                    high:4.0
                },
                chance:2.7771
            },
            {
                val:-3,
                payout:{
                    low:1.2,
                    medium:1.5,
                    high:2.0
                },
                chance:6.6650
            },
            {
                val:-2,
                payout:{
                    low:1.1,
                    medium:1.0,
                    high:0.2
                },
                chance:12.2192
            },
            {
                val:-1,
                payout:{
                    low:1.0,
                    medium:0.5,
                    high:0.2
                },
                chance:17.4561
            },
            {
                val:0,
                payout:{
                    low:0.5,
                    medium:0.3,
                    high:0.2
                },
                chance:19.6381
            },
            {
                val:1,
                payout:{
                    low:1.0,
                    medium:0.5,
                    high:0.2
                },
                chance:17.4561
            },
            {
                val:2,
                payout:{
                    low:1.1,
                    medium:1.0,
                    high:0.2
                },
                chance:12.2192
            },
            {
                val:3,
                payout:{
                    low:1.2,
                    medium:1.5,
                    high:2.0
                },
                chance:6.6650
            },
            {
                val:4,
                payout:{
                    low:1.4,
                    medium:3.0,
                    high:4.0
                },
                chance:2.7771
            },
            {
                val:5,
                payout:{
                    low:1.4,
                    medium:5.0,
                    high:9.0
                },
                chance:0.8545
            },
            {
                val:6,
                payout:{
                    low:2.0,
                    medium:10,
                    high:26
                },
                chance:0.1831
            },
            {
                val:7,
                payout:{
                    low:9.0,
                    medium:41,
                    high:130
                },
                chance:0.0244
            },
            {
                val:8,
                payout:{
                    low:16,
                    medium:110,
                    high:1000
                },
                chance:0.0015
            }
        ]
    ];
    static posRecord = {
        8:{
            0:[
                {x: -1.88, y: 20.63},{x: -0.72, y: 0.84},{x: 3.98, y: 1.38},{x: 4.34, y: 17.88},
                {x: 0.54, y: 21.62},{x: 1.38, y: 16.94},{x: 9.72, y: 21.89},{x: -4.98, y: 15.64},
                {x: 4.22, y: 21.9},{x: -3.72, y: 17.26},{x: -2.06, y: 19.54},{x: 2.01, y: 11.75},
                {x: -0.2, y: 20.02},{x: -3.65, y: 8.93},{x: -1.75, y: 20.9},{x: 6.27, y: 14.95},
                {x: 1.96, y: 11.66},{x: 7.66, y: 21.98},{x: 6.07, y: 14.33},{x: 1.62, y: 16.25},
                {x: 8.89, y: 5.15},{x: 5.82, y: 13.13},{x: 7.48, y: 8.56},{x: -3.99, y: 18.79},
                {x: 2.13, y: 15.97},{x: 3.02, y: 14.98},{x: -1.08, y: 5.44},{x: 4.03, y: 16.19},
                {x: -3.95, y: 5.62},{x: 9.48, y: 7.99},{x: 6.38, y: 3.7},{x: 6.28, y: 2.28},
                {x: 1.84, y: 14.92},{x: -1.51, y: 5.27},{x: 3.93, y: 14.44},{x: 0.96, y: 9.65},
                {x: 1.28, y: 8.35},{x: 8.01, y: 9.04},{x: 1.33, y: 9.54},{x: -2.02, y: 0.91},
                {x: -3.28, y: 0.03},{x: 11.76, y: 20.18},{x: -4.81, y: 21.04},{x: -0.98, y: 16.04},
                {x: -4.19, y: 21.96},{x: 9, y: 10.12},{x: 8.24, y: 17.62},{x: -0.42, y: 18.22},
                {x: -4.05, y: 9.34},{x: 11.4, y: 7.38},{x: -4.7, y: 21.3},{x: -4.31, y: 20.77},
                {x: 5.93, y: 0.22},{x: -2.53, y: 15.9},{x: -0.55, y: 6.03},{x: 6.47, y: 3.56},
                {x: 6.88, y: 20.47},{x: 8.18, y: 7.28},{x: -4.83, y: 20.78},{x: -1.2, y: 11.23},
                {x: 4, y: 8.91},{x: -2.47, y: 6.99},{x: -2.41, y: 9.53},{x: 1.14, y: 20.84},
                {x: 0.93, y: 9.03},{x: 0.26, y: 10.62},{x: 9.13, y: 9.84},{x: 11.08, y: 16.2},
                {x: 0.19, y: 11.36},{x: 7.61, y: 17.52},{x: -2.22, y: 2.72}
            ],
            1:[
                {x: 0.71, y: 7.4},{x: 9.81, y: 3.95},{x: 9.72, y: 15.56},{x: 1.32, y: 18.95},
                {x: 6.96, y: 20.6},{x: 1.57, y: 1.73},{x: 8.06, y: 0.39},{x: -2.03, y: 12.93},
                {x: 9.3, y: 1.98},{x: 4.65, y: 20.15},{x: 9.06, y: 12.87},{x: -2.46, y: 2.91},
                {x: -0.1, y: 21.94},{x: -0.94, y: 18.28},{x: 7.67, y: 17.84},{x: 5.34, y: 21.86},
                {x: -4.57, y: 17.44},{x: -0.78, y: 20.86},{x: -0.82, y: 6.9},{x: -1.33, y: 20.34},
                {x: 9.16, y: 2.06},{x: -2.42, y: 3.41},{x: -2.27, y: 0.22},{x: 6.48, y: 11.6},
                {x: 9.6, y: 11.08},{x: 7.93, y: 17.87},{x: 2.38, y: 6.89},{x: 4.15, y: 15.95},
                {x: 4.09, y: 19.91},{x: -0.34, y: 7.74},{x: 9.4, y: 5.66},{x: 2.1, y: 21.98},
                {x: 0.63, y: 9.98},{x: 3, y: 21.66},{x: -0.35, y: 7.27},{x: 6.2, y: 9.69},
                {x: 0.77, y: 7.33},{x: -3.26, y: 17.65},{x: -3.15, y: 4.13},{x: 0.48, y: 17.91},
                {x: -2.65, y: 2.3},{x: 6.76, y: 3.5},{x: 9.08, y: 17.17},{x: -1.62, y: 18.72},
                {x: 4.85, y: 19.97},{x: 5.1, y: 17.05},{x: 6.99, y: 9.67},{x: -3.23, y: 4.72},
                {x: 10.33, y: 15.31},{x: -3.93, y: 1.19},{x: 9.45, y: 9.8},{x: -1.05, y: 12.9},
                {x: -2.27, y: 1.79},{x: 4.63, y: 16.11},{x: -0.29, y: 21.48},{x: 11.91, y: 16.67}
            ],
            2:[
                {x: -0.3, y: 18.22},{x: 3.53, y: 12.28},{x: 11.63, y: 17.62},{x: 6.5, y: 0.14},
                {x: -2.65, y: 19.8},{x: 3.41, y: 12.96},{x: 0.09, y: 17.05},{x: -3.7, y: 7.63},
                {x: 11.37, y: 7.98},{x: 7.69, y: 17.91},{x: 6, y: 17.64},{x: 11.46, y: 19.28},
                {x: 11.63, y: 10.13},{x: 8.06, y: 21.28},{x: 7.37, y: 13.25},{x: -4.72, y: 20.87},
                {x: -1.21, y: 12.6},{x: 1.84, y: 19.66},{x: -2.81, y: 16.03},{x: -3.3, y: 11.93},
                {x: -1.42, y: 19.85},{x: 11.9, y: 0.43},{x: -1.17, y: 1.24},{x: 9.1, y: 10.28},
                {x: -4.17, y: 10.61},{x: -2.04, y: 13.23},{x: -3.77, y: 13.69},{x: 1.51, y: 9.39},
                {x: 6.73, y: 7.6},{x: 9.04, y: 1.21},{x: -3.19, y: 2.44},{x: 5.34, y: 0.53},
                {x: 1.15, y: 9.04},{x: 8.8, y: 21},{x: -1.21, y: 20.89},{x: 9.27, y: 16.48},
                {x: -4.93, y: 10.92},{x: 9.12, y: 1.69},{x: 8.63, y: 11.01},{x: -2.64, y: 0.62},
                {x: 0.94, y: 11.16},{x: 5.04, y: 19.61},{x: 11.93, y: 14.65},{x: 9.36, y: 14.37},
                {x: 8.57, y: 3.5},{x: -3.28, y: 19.57},{x: 0.76, y: 16.73},{x: 7.62, y: 16.19},
                {x: 10.95, y: 1.85},{x: -0.15, y: 11.2},{x: 5.76, y: 12.09},{x: -3.79, y: 17.31},
                {x: 8.26, y: 18.04},{x: -1.26, y: 0.9},{x: 9.74, y: 9.62},{x: 3.55, y: 11.2},
                {x: 0.34, y: 9.93},{x: -2.03, y: 16.92},{x: 11.92, y: 2.16}
            ],
            3:[
                {x: 10.53, y: 15.2},{x: 3.05, y: 15.75},{x: 9.97, y: 18.24},{x: 8.53, y: 13.51},
                {x: 4.9, y: 20.46},{x: -1.37, y: 4.18},{x: 9.8, y: 12.92},{x: 9.03, y: 8.33},
                {x: 7.28, y: 2.31},{x: 9.44, y: 7.25},{x: -2.94, y: 20.54},{x: 1.74, y: 6.92},
                {x: -1.06, y: 16.42},{x: 9.01, y: 8.97},{x: 2.48, y: 11.22},{x: 10.49, y: 12.28},
                {x: 11.82, y: 18.36},{x: -2.37, y: 2.43},{x: 5.38, y: 9.32},{x: 7.71, y: 1.74},
                {x: 9.39, y: 3.1},{x: 9.26, y: 12.93},{x: 0.83, y: 3.99},{x: -3.1, y: 12.56},
                {x: 3.33, y: 19.77},{x: 9.14, y: 10.68},{x: -2.05, y: 17.65},{x: -2.62, y: 9.37},
                {x: 11.96, y: 8.55}
            ],
            4:[
                {x: -0, y: 16.77},{x: 4.77, y: 20.13},{x: 2.18, y: 15.2},{x: -2.32, y: 16.35},
                {x: -0.99, y: 1.17},{x: 2.77, y: 12.35},{x: 9.52, y: 18.67},{x: -0.52, y: 7.95},
                {x: 8.93, y: 3.12},{x: 1.61, y: 13.14},{x: -2, y: 14.03},{x: 10.66, y: 13.74},
                {x: -0.34, y: 17.19},{x: 11.51, y: 14.21},{x: 7.96, y: 7.93},{x: 4.09, y: 17.73},
                {x: 10.45, y: 3.25},{x: 3.34, y: 16.18},{x: 0.14, y: 1.3},{x: 2.77, y: 16.28},
                {x: -1.66, y: 13.89},{x: 10.66, y: 5.49},{x: 2.13, y: 7.76},{x: -2.33, y: 1.57}
            ],
            "-1":[
                {x: 11.15, y: 15.83},{x: -0.59, y: 20.2},{x: 3.61, y: 16.74},{x: 1.97, y: 18.14},
                {x: 0.34, y: 18.15},{x: 7.26, y: 14.68},{x: 6.51, y: 19.94},{x: 2.14, y: 20.68},
                {x: 4.38, y: 20.01},{x: 0.12, y: 9.53},{x: -0.51, y: 3.66},{x: 7.43, y: 4},
                {x: 6.51, y: 19.06},{x: 4.98, y: 10.61},{x: 10.33, y: 8.85},{x: -0.89, y: 4.53},
                {x: 11.68, y: 15.42},{x: 5.66, y: 12.14},{x: 4.84, y: 6.15},{x: 7.8, y: 9.46},
                {x: 1.79, y: 10.77},{x: -4.04, y: 4.6},{x: -4.41, y: 17.93},{x: 6.5, y: 5.63},
                {x: 0.23, y: 17.94},{x: -0.92, y: 8.5},{x: 7.16, y: 19.06},{x: -1.75, y: 5.22},
                {x: 1.56, y: 13.66},{x: 5.61, y: 18.94},{x: -4, y: 9.72},{x: 8.59, y: 21.11},
                {x: 4.83, y: 10.78},{x: 5.76, y: 13.04},{x: 4.26, y: 19.78},{x: 2.37, y: 14.35},
                {x: -2.33, y: 18.94},{x: -1.39, y: 11.78},{x: -2.55, y: 8.08},{x: -3.43, y: 20.29},
                {x: 6.51, y: 20.17},{x: 6.14, y: 16.92},{x: 6.63, y: 10.19},{x: 4.76, y: 19.8},
                {x: -0.8, y: 17.27},{x: 4.75, y: 11.24},{x: 6.02, y: 12.25},{x: 5.36, y: 15.7},
                {x: -4.86, y: 18.03},{x: -1.34, y: 20.33},{x: -4.99, y: 18.35},{x: 1.35, y: 18.59},
                {x: 8.33, y: 2.96},{x: -4.23, y: 12.94},{x: 11.9, y: 20.66},{x: 0.61, y: 12.3},
                {x: 7.31, y: 19.03},{x: -3.24, y: 19.99},{x: 7.06, y: 7.14}
            ],
            "-2":[
                {x: 10.91, y: 15.1},{x: 1.93, y: 21.01},{x: 5.61, y: 6.12},{x: -1.98, y: 1.02},
                {x: -2.56, y: 5.33},{x: 0.29, y: 13.25},{x: 11.98, y: 15.23},{x: 5.74, y: 4.92},
                {x: -1.14, y: 3.41},{x: -0.22, y: 7.62},{x: 8.6, y: 0.63},{x: 7.84, y: 20.65},
                {x: -3.75, y: 18.15},{x: -4.45, y: 4.53},{x: 3.2, y: 16.84},{x: 9.4, y: 8.42},
                {x: -2.18, y: 21.19},{x: -1.86, y: 17.22},{x: 7.76, y: 20.93},{x: -1.62, y: 14.68},
                {x: 5.15, y: 10.72},{x: 10.59, y: 4.09},{x: 4.26, y: 19.94},{x: 2.04, y: 11.1},
                {x: 5.03, y: 1.56},{x: -2.34, y: 16.36},{x: 6.62, y: 17.48},{x: 9.91, y: 10.16},
                {x: -0.57, y: 12.9},{x: 9.42, y: 5.46},{x: -1.97, y: 18.77},{x: -1.98, y: 1.02},
                {x: 9.62, y: 16.72},{x: 1.14, y: 14.22},{x: 2.38, y: 17.32},{x: 10.65, y: 1.88},
                {x: -3.79, y: 15.67},{x: -0.51, y: 16.9},{x: -0.62, y: 1.68},{x: 7.44, y: 2.21},
                {x: 4.82, y: 20.31},{x: 9.63, y: 11.56},{x: 1.38, y: 19.77},{x: 3.7, y: 17.75},
                {x: 6.2, y: 9.22},{x: 5.08, y: 6.16},{x: 6.76, y: 4.73},{x: -0.69, y: 17.05},
                {x: 6.95, y: 14.48},{x: 7.55, y: 2.1},{x: -3.1, y: 3.62}
            ],
            "-3":[
                {x: 0.26, y: 11.04},{x: 5.03, y: 6.83},{x: 5.31, y: 5.65},{x: 5.64, y: 9.76},
                {x: -1.53, y: 13.06},{x: 6.27, y: 11.76},{x: 8.14, y: 2.57},{x: 3.57, y: 21.82},
                {x: -0.14, y: 0.65},{x: 7.01, y: 10.23},{x: 10.03, y: 21.46},{x: 8.31, y: 1.08},
                {x: 8.85, y: 21.77},{x: 7.32, y: 8.56},{x: -0.08, y: 17.68},{x: -2.41, y: 16.65},
                {x: 4.27, y: 11.08},{x: -2.32, y: 7.5},{x: 8.82, y: 4.84},{x: 7.38, y: 15.64},
                {x: 9.37, y: 11.82},{x: 8.35, y: 18.92},{x: 8.06, y: 15.08},{x: 6.24, y: 20.73},
                {x: -1.11, y: 3.33},{x: 1.06, y: 3},{x: 4.19, y: 5.9},{x: -1.1, y: 6.54},
                {x: -2.79, y: 12.45},{x: 8.06, y: 19.61},{x: 9.98, y: 20.58},{x: 5.68, y: 10.14},
                {x: -0.88, y: 3.14},{x: 2.36, y: 15.5},{x: 6.76, y: 3.3},{x: 8.53, y: 11.9}
            ],
            "-4":[
                {x: 1.89, y: 12.54},{x: 10.05, y: 16.56},{x: 5.29, y: 6.39},{x: 10.18, y: 20.89},
                {x: -3.83, y: 0.66},{x: -3.76, y: 19.77},{x: 9.43, y: 0.44},{x: 9.83, y: 12.94},
                {x: 3.77, y: 20.76},{x: -3.91, y: 14.08},{x: 4.81, y: 7.04},{x: 9.06, y: 16.36},
                {x: -2.36, y: 10.64},{x: 10.04, y: 1.37},{x: 8.37, y: 15.65},{x: -3.7, y: 11.54},
                {x: -3.47, y: 21.19},{x: 4.28, y: 8},{x: 5.17, y: 19.2},{x: 6.67, y: 3.28},
                {x: 4.86, y: 20.88},{x: 4.58, y: 14.73},{x: 7.21, y: 21.04},{x: 6.55, y: 15.91},
                {x: 11.36, y: 14.67},{x: 9.99, y: 0.1},{x: -2.73, y: 1.8},{x: -2.92, y: 5.23}
            ],
        },
        9:{
            1:[
                {x: -3.34, y: 1.8},{x: -2.59, y: 8.33},{x: 5.43, y: 10.93},{x: 2.6, y: 19.87},
                {x: 9.42, y: 21.25},{x: 11, y: 4.1},{x: 9.84, y: 11.63},{x: -1.62, y: 15.02},
                {x: 10.94, y: 8.82},{x: -1.06, y: 12.99},{x: -1.59, y: 20.45},{x: -1.75, y: 2.79},
                {x: 9.6, y: 9.99},{x: 9.02, y: 21.75},{x: -4.52, y: 19.5},{x: 9.69, y: 18.67},
                {x: -1.77, y: 8.59},{x: 0.02, y: 8.53},{x: 7.91, y: 17.3},{x: 8.06, y: 11.73},
                {x: 0.22, y: 1.19},{x: 7.7, y: 16.08},{x: 6.06, y: 19.85},{x: 8.95, y: 21.48},
                {x: 1.2, y: 21.35},{x: -0.35, y: 0.87},{x: 10.74, y: 4.47},{x: -4.11, y: 9.83},
                {x: 0.94, y: 17.06},{x: 1.34, y: 7.6}
            ],
            2:[
                {x: 0.32, y: 10.27},{x: 4.59, y: 10.09},{x: -2.11, y: 19.03},{x: 2.26, y: 21.8},
                {x: 11.11, y: 12.69},{x: -3.9, y: 18.76},{x: 9.24, y: 19.73},{x: 11.43, y: 7.52},
                {x: 9.28, y: 6.75},{x: -1.78, y: 12.74},{x: -2.52, y: 14.39},{x: 8.68, y: 21.12},
                {x: 8.92, y: 15.54},{x: -2.03, y: 14.61},{x: 4.36, y: 15.03},{x: 10.47, y: 8.29},
                {x: -0.89, y: 8.61},{x: 11.51, y: 18.7},{x: 0.41, y: 7.95},{x: 2.96, y: 19.96},
                {x: 8.59, y: 1.33},{x: 5.9, y: 15.3},{x: 9.52, y: 14.29},{x: 11.39, y: 15.24},
                {x: -1.54, y: 19.96},{x: 9.29, y: 6.91},{x: 11.5, y: 6.13},{x: 6.2, y: 8.89},
                {x: 0.87, y: 14.96},{x: 11.5, y: 6.42},{x: 1.08, y: 21.58}
            ],
            3:[
                {x: -2.84, y: 19.74},{x: 9.33, y: 16.39},{x: 4.34, y: 16.65},{x: -3.18, y: 17.88},
                {x: 9.2, y: 21.49},{x: -1.63, y: 14.55},{x: 8.36, y: 3.67},{x: -2.71, y: 20.64},
                {x: 3.76, y: 15.8},{x: 5.65, y: 9.07},{x: 0.72, y: 16.05},{x: 3.04, y: 21.93},
                {x: 9.86, y: 5.67},{x: 0.37, y: 17.13},{x: 1.33, y: 15.8},{x: 7.45, y: 16.76},
                {x: 7.96, y: 0.01},{x: -3.61, y: 17.47},{x: -3.05, y: 14.41},{x: -4.35, y: 19.18},
                {x: -1.44, y: 16.7},{x: 7.56, y: 16.8},{x: 1.04, y: 4.68},{x: 11, y: 15.36},
                {x: 5.45, y: 1.6},{x: -4.58, y: 3.53},{x: 11.89, y: 15.89}
            ],
            4:[
                {x: -3.49, y: 5.46},{x: 10.16, y: 1.84},{x: 8.01, y: 9.63},{x: 7.58, y: 3.11},
                {x: 3.15, y: 11.14},{x: 7.85, y: 9},{x: 9.97, y: 18.52},{x: 10.38, y: 9.82},
                {x: 5.89, y: 9.89},{x: 4.15, y: 20.59},{x: 0.51, y: 19.6},{x: -2.79, y: 2.04},
                {x: 10.85, y: 18.31}
            ],
            5:[
                {x: 6.18, y: 3.58},{x: 4.53, y: 16.49},{x: 2.88, y: 14.22},{x: 10.06, y: 14.35},
                {x: 1.35, y: 20.89},{x: -4.62, y: 16.46},{x: 9.92, y: 13.73},{x: 7.46, y: 11.65},
                {x: 11.21, y: 18.61},{x: 10.08, y: 12.17},{x: 11.49, y: 20.78},{x: 11.48, y: 1.49},
                {x: -4.29, y: 2.19},{x: -1.01, y: 8.05},{x: -5, y: 18.15},{x: -3.02, y: 8.52},
                {x: 4.63, y: 16.15}
            ],
            "-1":[
                {x: -4.06, y: 16.44},{x: -2.71, y: 20.51},{x: 10.87, y: 6.14},{x: 11.93, y: 9.03},
                {x: -3.61, y: 16.32},{x: -3.73, y: 11.82},{x: -2.86, y: 0.18},{x: 5.75, y: 5.5},
                {x: 6.85, y: 12.96},{x: 8.04, y: 2.42},{x: 6.08, y: 18.99},{x: -4.3, y: 2.46},
                {x: 4.18, y: 6.13},{x: 6.46, y: 12.8},{x: 2.83, y: 19.27},{x: 7.61, y: 13.96},
                {x: -3.02, y: 3.33},{x: 10.27, y: 19.99},{x: -2.53, y: 0.05},{x: -2.02, y: 6.44},
                {x: 4.6, y: 16.81},{x: 3.17, y: 18.55},{x: 2.47, y: 21.02},{x: 11.25, y: 19.82},
                {x: 11.98, y: 9.27},{x: 1.31, y: 13.78},{x: 8.98, y: 17.32},{x: 3.92, y: 15.81},
                {x: 4.17, y: 20.42},{x: 9.17, y: 2.02},{x: 4.93, y: 2.23},{x: -0.81, y: 4.55},
                {x: -1.94, y: 20.69},{x: 0.69, y: 10.08},{x: 0.56, y: 6.77}
            ],
            "-2":[
                {x: 4.76, y: 9.74},{x: -0.89, y: 8.94},{x: -1.49, y: 7.44},{x: 2.15, y: 9.51},
                {x: 8.83, y: 6.88},{x: -2.77, y: 10.56},{x: -2.68, y: 7.35},{x: -2.2, y: 20.04},
                {x: -4.14, y: 12.83},{x: 9.97, y: 16.12},{x: 7.82, y: 1.65},{x: 6.06, y: 10.25},
                {x: 2.71, y: 16.16},{x: 6.43, y: 4.56},{x: 1.05, y: 0.27},{x: 7.48, y: 1.88},
                {x: 11.25, y: 21.1},{x: 1.27, y: 10.12},{x: -3.1, y: 19.54},{x: -3.65, y: 1.79},
                {x: -4.79, y: 10.67},{x: 7.44, y: 17.52},{x: 9.94, y: 1.85},{x: -3.2, y: 13.03},
                {x: -0.02, y: 20.38},{x: -3.29, y: 18.7},{x: 2.91, y: 18.25},{x: -4.54, y: 8.53},
                {x: 1.25, y: 7.62},{x: 8.84, y: 1.91}
            ],
            "-3":[
                {x: -3.66, y: 16.79},{x: -0.77, y: 7.72},{x: -2.95, y: 9.26},{x: 0.19, y: 13.17},
                {x: 4.35, y: 15.17},{x: 1.29, y: 10.13},{x: 1.9, y: 15.55},{x: -4.29, y: 9.43},
                {x: -1.88, y: 11.38},{x: 2.61, y: 18.11},{x: -0.44, y: 13.25},{x: 11.81, y: 21.99},
                {x: 2.6, y: 19.48},{x: 10.57, y: 2.99},{x: 5.36, y: 19.96},{x: 4.82, y: 20.38},
                {x: 4.46, y: 1.38},{x: 6.38, y: 14},{x: 4.47, y: 11.95},{x: -1.43, y: 5.27},
                {x: 3.39, y: 18.73},{x: -0.3, y: 1.17},{x: -4.51, y: 4.11}
            ],
            "-4":[
                {x: -1.26, y: 6.46},{x: 0.51, y: 3.67},{x: 8.34, y: 10.38},{x: 6.89, y: 14.4},
                {x: 11.43, y: 20.01},{x: 4.55, y: 10.43},{x: -2.16, y: 12.83},{x: -4.96, y: 12.98},
                {x: -0.26, y: 19.32},{x: -4.99, y: 14.82},{x: 4.46, y: 20.08},{x: 4.37, y: 5.74},
                {x: 3.92, y: 18.91},{x: 10.78, y: 21.34},{x: 7.54, y: 9.45}
            ],
            "-5":[
                {x: 9.9, y: 14.33},{x: 1.02, y: 13.83},{x: -2.77, y: 1.59},{x: -3.43, y: 19.08},
                {x: -4.39, y: 10.09},{x: 6.09, y: 11.65},{x: 6.2, y: 5.96},{x: 1.96, y: 21.55}
            ],
        },
        10:{
            0:[
                {x: 0.23, y: 17.93},{x: 11.87, y: 17.33},{x: -4.93, y: 6.42},{x: 5.17, y: 5.93},
                {x: 8.5, y: 2.16},{x: 5.07, y: 0.78},{x: 0.11, y: 4.07},{x: 8.1, y: 21.77},
                {x: -1.06, y: 1.76},{x: -2.35, y: 5.62},{x: -4.44, y: 18.37},{x: 8.67, y: 3.84},
                {x: 7.7, y: 14.38},{x: 7.79, y: 19.78},{x: 6.3, y: 17.37},{x: -1.71, y: 18.2},
                {x: 6.73, y: 19.19},{x: 0.79, y: 2.92},{x: -1.78, y: 15.28},{x: 1.56, y: 3.27},
                {x: 8.12, y: 18.29},{x: -4.85, y: 18.28},{x: 3.96, y: 6.25},{x: -1.82, y: 10.95},
                {x: -0.55, y: 5.8}
            ],
            1:[
                {x: 5.1, y: 16.97},{x: 8.97, y: 15.99},{x: 3.62, y: 16.42},{x: 11.69, y: 19.01},
                {x: -3.09, y: 14.56},{x: -0.76, y: 19.1},{x: 5.55, y: 0.47},{x: -4.41, y: 6.31},
                {x: 7.91, y: 15.21},{x: 10.05, y: 5.12},{x: 5.92, y: 10.27},{x: 9.7, y: 16.87},
                {x: 1.49, y: 18.9},{x: 5.18, y: 4.95},{x: 0.31, y: 9.98},{x: 0.9, y: 18.27},
                {x: -4.3, y: 14.42},{x: -1.22, y: 19.17},{x: 8.82, y: 9.92},{x: 6.65, y: 13.98},
                {x: 0.43, y: 7.02}
            ],
            2:[
                {x: 3.45, y: 12.82},{x: 0.16, y: 10.72},{x: 3.6, y: 19.85},{x: -0.38, y: 8.11},
                {x: 7.28, y: 9.95},{x: 4.39, y: 18.09},{x: 9.19, y: 12.69},{x: -2.25, y: 14.75},
                {x: -3.04, y: 11.24},{x: 11.39, y: 5.15},{x: 11.32, y: 17.84},{x: 0.09, y: 2.31},
                {x: -4.43, y: 15.98},{x: -0.3, y: 3.83},{x: 7.58, y: 7.58},{x: 5.47, y: 8.95},
                {x: -4.57, y: 3.41},{x: -2.53, y: 19.86}
            ],
            3:[
                {x: 0.58, y: 7.9},{x: 3.26, y: 17},{x: 9.02, y: 8.76},{x: -2.1, y: 10.42},
                {x: -2.13, y: 19.99},{x: -0.84, y: 3.41},{x: 11.02, y: 4.01},{x: 8.88, y: 12.87},
                {x: 9.34, y: 7.05},{x: -4.78, y: 18.23},{x: 10.09, y: 10.59},{x: 2.05, y: 14.7},
                {x: 0.59, y: 8.73},{x: 11.5, y: 11.28},{x: 5.97, y: 5.2},{x: -3.46, y: 12.84},
                {x: 5.28, y: 15.85}
            ],
            4:[
                {x: -1.02, y: 8.85},{x: 4.58, y: 13.02},{x: -0.82, y: 7.24},{x: 8.36, y: 20.86},
                {x: 2.58, y: 12.34},{x: -1.91, y: 21.24},{x: 9.35, y: 7.15},{x: -2.29, y: 17.7}
            ],
            5:[
                {x: 8.41, y: 14.69},{x: 10.08, y: 13.29},{x: 11.66, y: 2.35},{x: 4.41, y: 15.76},
                {x: 10.26, y: 14.08}
            ],
            "-1":[
                {x: 9.75, y: 4.75},{x: 7.05, y: 13.03},{x: 9.24, y: 5.94},{x: 7.19, y: 3.03},
                {x: 6.86, y: 19.62},{x: 8.64, y: 13.84},{x: 10.45, y: 8.71},{x: -0.04, y: 13.54},
                {x: -3.03, y: 9.56},{x: 8.41, y: 19.12},{x: 9.2, y: 7.2},{x: 8.51, y: 7.67},
                {x: 9.79, y: 16.74},{x: -4.12, y: 8.11},{x: 5.88, y: 11.43},{x: -3.4, y: 20.38},
                {x: 1.13, y: 15.05},{x: 5.42, y: 11.23},{x: 1.81, y: 13.09},{x: -4.18, y: 5.42},
                {x: 0.02, y: 16.22},{x: 10.87, y: 17.14},{x: -4.13, y: 11.45},{x: 10.35, y: 19.96},
                {x: 6.5, y: 19.82},{x: -3.57, y: 17.49},{x: -1.24, y: 17.17},{x: 3.51, y: 17.16},
                {x: 6.04, y: 20.34},{x: 7.08, y: 8.53},{x: 3.87, y: 2.12},{x: 5.14, y: 21.69},
                {x: 7.19, y: 20.99},{x: 9.45, y: 9.61},{x: 4.33, y: 21.77},{x: 6.54, y: 12.22}
            ],
            "-2":[
                {x: 9.64, y: 16.81},{x: -0.84, y: 17.49},{x: -3.51, y: 14.21},{x: -4.15, y: 15.94},
                {x: 11.43, y: 15.84},{x: 11.04, y: 20.66},{x: 4.87, y: 10},{x: 9.69, y: 17.25},
                {x: 5.47, y: 12.58},{x: -1.58, y: 8.14},{x: 8.85, y: 20.05},{x: -2.98, y: 5.63},
                {x: -1.73, y: 16.54},{x: 11.93, y: 16.28},{x: 8.98, y: 10.77},{x: 9.6, y: 15.75},
                {x: 6.99, y: 11.07},{x: -0.19, y: 14.52},{x: -3.09, y: 6.97},{x: 10.33, y: 3.33},
                {x: -4.86, y: 8.89},{x: -0.87, y: 7.44},{x: 8.42, y: 12.26},{x: -0.87, y: 8.77}
            ],
            "-3":[
                {x: -1.79, y: 4.87},{x: 1.2, y: 12.86},{x: -4.1, y: 14.05},{x: -3.23, y: 4.8},
                {x: -1.19, y: 16.38},{x: 2.18, y: 21.35},{x: 10.58, y: 13.29},{x: 2.51, y: 20.33},
                {x: 6.35, y: 10.33},{x: 5.52, y: 16.69},{x: 8.83, y: 20.33},{x: 7.48, y: 13.16},
                {x: 6.62, y: 2.34},{x: 6.84, y: 9.96},{x: 0.61, y: 20.94},{x: 11.12, y: 20.93},
                {x: -2.82, y: 8.71},{x: -0.93, y: 7.42},{x: -4.74, y: 16.62},{x: 7.29, y: 8.05},
                {x: -2.13, y: 8.55},{x: 1.03, y: 7.36},{x: 9.41, y: 16.88}
            ],
            "-4":[
                {x: 10.34, y: 3.28},{x: 8.95, y: 9.45},{x: -2.22, y: 8.69},{x: -3.07, y: 15.22},
                {x: 9.98, y: 4.71},{x: 3.27, y: 18.54},{x: -4.89, y: 20},{x: 10.88, y: 3.33},
                {x: -3.27, y: 13.37},{x: -4.89, y: 7.97},{x: -3.01, y: 2.39}
            ],
            "-5":[
                {x: 6.47, y: 18.76},{x: -4.67, y: 12.34},{x: -3.47, y: 15.93}
            ],
        },
        11:{
            1:[
                {x: 10.415, y: 12.995},{x: 7.448, y: 2.655},{x: 9.078, y: 15.625},{x: 7.272, y: 9.585},
                {x: 7.808, y: 7.542},{x: 6.561, y: 19.027},{x: -3.597, y: 4.134},{x: 1.048, y: 12.944},
                {x: 2.918, y: 11.744},{x: -2.845, y: 6.073},{x: -4.129, y: 7.907},{x: 6.659, y: 18.754},
                {x: 1.626, y: 13.481},{x: -1.133, y: 10.829},{x: -2.426, y: 5.011},{x: -2.108, y: 18.36},
                {x: -0.77, y: 18.013},{x: -0.781, y: 19.87},{x: 10.933, y: 6.581},{x: 10.615, y: 14.374},
                {x: 0.012, y: 18.639},{x: 9.894, y: 2.877},{x: 10.504, y: 8.487},{x: 5.734, y: 19.455},
                {x: -1.173, y: 1.936},{x: 11.827, y: 0.158},{x: -4.195, y: 15.682},{x: 7.732, y: 18.627}
            ],
            2:[
                {x: -0.831, y: 1.374},{x: -3.412, y: 13.384},{x: -4.895, y: 20.3},{x: 4.955, y: 1.239},
                {x: 11.137, y: 8.803},{x: 0.516, y: 3.199},{x: -4.941, y: 14.687},{x: 7.538, y: 18.083},
                {x: 8.066, y: 19.253},{x: 5.656, y: 4.559},{x: -3.092, y: 17.045},{x: 1.168, y: 14.365},
                {x: 8.341, y: 16.873},{x: -3.993, y: 3.562},{x: 8.256, y: 17.16},{x: 8.673, y: 6.358},
                {x: 7.436, y: 4.04},{x: -2.419, y: 9.884},{x: 8.298, y: 4.036},{x: 4.366, y: 12.961},
                {x: -4.241, y: 14.256},{x: 1.962, y: 10.739},{x: 11.014, y: 18.794},{x: 3.535, y: 7.756},
                {x: 5.368, y: 13.178},{x: 7.342, y: 7.56},{x: -4.28, y: 13.501},{x: -1.756, y: 0.118},
                {x: 10.714, y: 11.949},{x: 8.896, y: 9.961},{x: 9.096, y: 10.352}
            ],
            3:[
                {x: -1.292, y: 14.995},{x: -3.396, y: 8.765},{x: -0.853, y: 2.782},{x: -0.215, y: 18.422},
                {x: -1.996, y: 14.73},{x: 2.937, y: 13.937},{x: 0.114, y: 8.417},{x: 9.694, y: 6.807},
                {x: -2.132, y: 20.19},{x: 8.248, y: 9.413},{x: 10.053, y: 18.876},{x: 8.188, y: 2.539},
                {x: 9.375, y: 5.015},{x: 2.114, y: 19.326},{x: 7.886, y: 4.32},{x: 8.378, y: 10.934}
            ],
            4:[
                {x: 10.904, y: 0.273},{x: 8.788, y: 10.457},{x: -2.077, y: 16.761},{x: 0.189, y: 14.402},
                {x: -0.458, y: 21.983},{x: 10.711, y: 7.591},{x: 11.74, y: 13.677},{x: 8.519, y: 14.429},
                {x: -3.428, y: 7.244},{x: -0.204, y: 3.312},{x: 0.559, y: 10.845},{x: -1.4, y: 12.206},
                {x: -1.238, y: 15.316},{x: 9.806, y: 9.994}
            ],
            5:[
                {x: 6.019, y: 0.992},{x: 2.819, y: 19.465},{x: 1.793, y: 21.78},{x: 10.194, y: 12.207},
                {x: 4.128, y: 6.365},{x: -1.788, y: 12.519},{x: -3.049, y: 7.775},{x: 0.333, y: 7.75}
            ],
            6:[
                {x: 7.32, y: 19.931},{x: 9.311, y: 20.523},{x: -4.343, y: 20.999}
            ],
            "-1":[
                {x: 1.956, y: 5.774},{x: -1.212, y: 21.587},{x: 7.299, y: 2.536},{x: -4.437, y: 16.041},
                {x: -3.143, y: 9.667},{x: 11.817, y: 16.465},{x: 0.813, y: 3.812},{x: 8.469, y: 18.019},
                {x: 4.813, y: 0.296},{x: -3.584, y: 6.943},{x: 3.535, y: 21.222},{x: 4.577, y: 17.809},
                {x: 3.802, y: 20.757},{x: 10.548, y: 10.906},{x: 7.593, y: 9.232},{x: 4.537, y: 18.879},
                {x: 9.426, y: 10.964},{x: 7.355, y: 10.651},{x: 5.935, y: 13.705},{x: -3.529, y: 5.518}
            ],
            "-2":[
                {x: 5.149, y: 10.129},{x: -2.095, y: 11.944},{x: -1.833, y: 18.945},{x: 11.088, y: 14.583},
                {x: 6.112, y: 12.947},{x: -2.782, y: 17.275},{x: -0.481, y: 13.678},{x: -3.644, y: 13.309},
                {x: 6.015, y: 20.191},{x: 6.713, y: 8.034},{x: 8.133, y: 3.44},{x: 2.444, y: 20.785},
                {x: 10.99, y: 14.875},{x: 9.768, y: 15.502},{x: 1.14, y: 10.446},{x: 5.908, y: 0.594},
                {x: -0.852, y: 18.504},{x: 5.589, y: 16.646}
            ],
            "-3":[
                {x: 0.967, y: 3.29},{x: -4.788, y: 4.119},{x: 1.134, y: 9.37},{x: 10.886, y: 20.194},
                {x: -2.485, y: 15.786},{x: 11.262, y: 21.265},{x: 11.742, y: 4.448},{x: -1.353, y: 19.99},
                {x: -3.241, y: 17.95},{x: 10.425, y: 21.011},{x: -4.255, y: 14.642},{x: 5.379, y: 11.539}
            ],
            "-4":[
                {x: 9.924, y: 4.519},{x: 4.749, y: 14.339},{x: 2.268, y: 13.636},{x: -2.579, y: 11.683},
                {x: 9.599, y: 21.424},{x: 0.682, y: 7.896},{x: -0.466, y: 16.006},{x: 9.176, y: 17.175},
                {x: -4.049, y: 3.262},{x: 1.077, y: 11.466},{x: -4.834, y: 14.738},{x: 8.269, y: 7.159},
                {x: -2.276, y: 9.118},{x: 9.18, y: 19.534},{x: 5.868, y: 20.775}
            ],
            "-5":[
                {x: -0.002, y: 10.467},{x: 9.369, y: 16.153},{x: -4.894, y: 18.348},{x: 1.222, y: 18.447}
            ],
            "-6":[
                {x: 5.876, y: 14.298},{x: -0.72, y: 21.581},{x: 5.419, y: 10.049},{x: -4.601, y: 10.392},
                {x: 1.358, y: 11.731},{x: -4.794, y: 18.632}
            ],
        },
        12:{
            0:[
                {x: 3.286, y: 12.771},{x: 4.223, y: 6.132},{x: -2.856, y: 15.413},{x: 9.944, y: 3.576},
                {x: 11.077, y: 17.219},{x: 4.217, y: 19.044},{x: 1.352, y: 9.026},{x: -3.35, y: 8.991},
                {x: 9.821, y: 20.56},{x: -0.297, y: 8.902},{x: 8.742, y: 12.66},{x: -4.389, y: 3.198},
                {x: -1.669, y: 11.063},{x: -2.53, y: 8.834},{x: -1.537, y: 19.285},{x: -2.025, y: 20.489},
                {x: 7.528, y: 3.398},{x: -0.499, y: 14.879},{x: 3.155, y: 16.283},{x: 1.374, y: 11.627},
                {x: 11.337, y: 7.133},{x: 11.917, y: 15.11},{x: 4.818, y: 15.815},{x: -3.049, y: 11.367},
                {x: 7.133, y: 15.981},{x: -1.267, y: 16.824},{x: 7.06, y: 4.478},{x: 3.318, y: 20.727},
                {x: 3.152, y: 6.277},{x: -2.997, y: 8.529},{x: -2.004, y: 2.147},{x: -3.433, y: 12.382},
                {x: -1.04, y: 7.722},{x: -0.897, y: 13.384},{x: 5.992, y: 19.268},{x: -4.933, y: 11.73},
                {x: -0.105, y: 6.531},{x: 11.399, y: 7.254},{x: -0.85, y: 14.449},{x: -2.253, y: 6.213},
                {x: -1.495, y: 16.925},{x: -4.305, y: 20.251},{x: 6.74, y: 18.725},{x: 9.641, y: 9.11},
                {x: -2.425, y: 10.413},{x: 6.62, y: 7.357},{x: -2.505, y: 14.326},{x: -4.736, y: 16.276},
                {x: 10.065, y: 2.828},{x: -2.345, y: 7.821},{x: 11.255, y: 8.337},{x: -1.72, y: 13.827},
                {x: 1.22, y: 17.077},{x: 9.985, y: 12.343},{x: 7.148, y: 19.705},{x: -4.072, y: 6.981},
                {x: 4.02, y: 21.57},{x: -0.51, y: 18.05},{x: 10.636, y: 17.078}
            ],
            1:[
                {x: 1.074, y: 7.412},{x: 1.077, y: 13.801},{x: 0.1, y: 19.418},{x: 11.954, y: 10.037},
                {x: -1.527, y: 16.664},{x: -2.8, y: 11.678},{x: 0.446, y: 15.5},{x: -4.809, y: 18.608},
                {x: -4.081, y: 18.653},{x: -1.185, y: 10.354},{x: 11.728, y: 12.386},{x: -1.54, y: 15.793},
                {x: 6.95, y: 18.502},{x: -2.987, y: 7.104},{x: 8.35, y: 6.253},{x: 1.488, y: 11.446},
                {x: 6.063, y: 9.893},{x: 4.415, y: 16.863},{x: 7.763, y: 16.547},{x: 1.574, y: 17.509},
                {x: 9.669, y: 8.484},{x: 9.654, y: 21.346},{x: -1.114, y: 13.904},{x: 11.428, y: 7.903},
                {x: 11.587, y: 2.114},{x: -0.372, y: 18.663},{x: 9.973, y: 15.402},{x: -4.113, y: 11.48},
                {x: 5.042, y: 1.916},{x: -2.571, y: 21.651},{x: 1.092, y: 2.925},{x: 10.648, y: 1.395},
                {x: 1.551, y: 14.981},{x: -3.347, y: 15.544},{x: -4.407, y: 16.923},{x: 9.107, y: 3.255},
                {x: 6.026, y: 18.635},{x: 6.313, y: 8.384},{x: 0.113, y: 12.921},{x: -2.746, y: 6.147},
                {x: 8.302, y: 9.013},{x: -2.316, y: 14.329},{x: 6.484, y: 4.897},{x: 8.626, y: 16.203},
                {x: 4.792, y: 20.902},{x: 11.202, y: 0.659},{x: -1.912, y: 17.351},{x: 1.949, y: 20.583},
                {x: -3.219, y: 4.939},{x: 2.328, y: 19.074},{x: -2.694, y: 19.29},{x: 0.384, y: 17.227}
            ],
            2:[
                {x: -3.397, y: 21.647},{x: -2.578, y: 14.785},{x: 11.382, y: 2.588},{x: 8.58, y: 16.69},
                {x: 11.86, y: 18.693},{x: 9.055, y: 14.007},{x: -2.118, y: 21.84},{x: 0.572, y: 6.908},
                {x: 1.546, y: 21.329},{x: -1.041, y: 6.442},{x: 0.341, y: 7.949},{x: 0.8, y: 7.2},
                {x: 11.315, y: 10.132},{x: 10.075, y: 21.69},{x: -4.298, y: 13.578},{x: -2.014, y: 11.666},
                {x: 1.352, y: 8.811},{x: -3.081, y: 13.971},{x: 10.175, y: 10.384},{x: 0.14, y: 20.386},
                {x: 0.621, y: 4.464},{x: -4.319, y: 17.679},{x: 7.642, y: 12.385},{x: 11.613, y: 15.188},
                {x: -1.888, y: 20.303},{x: 8.867, y: 21.242},{x: 0.273, y: 18.118},{x: -0.267, y: 10.878},
                {x: 11.658, y: 1.29},{x: -2.612, y: 0.74},{x: 10.729, y: 10.207},{x: 9.621, y: 1.035},
                {x: -3.948, y: 17.505},{x: -1.096, y: 3.146},{x: 9.617, y: 4.269},{x: 7.842, y: 11.255},
                {x: 10.53, y: 17.87},{x: 3.79, y: 11.552}
            ],
            3:[
                {x: 9.384, y: 13.958},{x: 0.76, y: 16.065},{x: 11.787, y: 18.214},{x: -0.35, y: 6.792},
                {x: 11.007, y: 1.625},{x: -3.568, y: 15.988},{x: -0.076, y: 0.982},{x: -0.257, y: 10.917},
                {x: 1.227, y: 13.08},{x: 9.647, y: 6.547},{x: 4.821, y: 0.596},{x: -0.573, y: 13.792},
                {x: -1.064, y: 17.22},{x: -0.815, y: 15.668},{x: -0.812, y: 11.908},{x: 9.488, y: 14.331},
                {x: 9.655, y: 8.233},{x: 4.522, y: 0.65},{x: 2.489, y: 16.768},{x: -0.422, y: 12.107},
                {x: 1.008, y: 7.529},{x: 10.407, y: 4.083},{x: 0.133, y: 10.278}
            ],
            4:[
                {x: 10.457, y: 0.956},{x: 11.965, y: 11.733},{x: 6.502, y: 2.599},{x: 10.86, y: 10.231},
                {x: -4.143, y: 3.401},{x: 10.678, y: 12.392},{x: -2.024, y: 9.952},{x: 5.679, y: 12.391},
                {x: 4.477, y: 3.735},{x: 4.351, y: 13.001},{x: 5.278, y: 5.815},{x: 10.328, y: 1.559},
                {x: 7.931, y: 17.757},{x: 7.106, y: 3.431},{x: 4.737, y: 14.376},{x: 9.491, y: 17.027},
                {x: 6.243, y: 2.134},{x: -0.14, y: 14.304},{x: 11.889, y: 0.378},{x: -1.007, y: 14.949}
            ],
            5:[
                {x: 6.842, y: 15.897},{x: 6.861, y: 0.082},{x: -2.551, y: 12.197},{x: -4.215, y: 6.938},
                {x: 0.033, y: 6.813},{x: 11.574, y: 7.145},{x: -1.248, y: 15.815},{x: 10.368, y: 9.301},
                {x: -2.172, y: 7.016},{x: 11.529, y: 12.374},{x: 9.114, y: 6.29},{x: 0.713, y: 14.344}
            ],
            6:[
                {x: -4.059, y: 14.889},{x: 11.941, y: 4.93},{x: 7.355, y: 3.739}
            ],
            "-1":[
                {x: 9.827, y: 21.346},{x: 11.079, y: 9.837},{x: -2.348, y: 12.719},{x: 9.03, y: 5.274},
                {x: -4.616, y: 18.979},{x: -2.943, y: 0.721},{x: 0.734, y: 10.731},{x: 1.998, y: 16.057},
                {x: 10.441, y: 21.265},{x: 4.572, y: 21.585},{x: 5.881, y: 13.767},{x: 2.884, y: 18.15},
                {x: 4.264, y: 20.685},{x: 1.439, y: 19.129},{x: 9.286, y: 15.148},{x: -4.552, y: 4.655},
                {x: 7.27, y: 14.706},{x: 11.641, y: 2.734},{x: -2.354, y: 15.235},{x: -3.183, y: 4.666},
                {x: 8.742, y: 0.358},{x: -2.356, y: 5.695},{x: 11.361, y: 5.028},{x: 9.046, y: 4.27},
                {x: -3.687, y: 10.838},{x: 5.957, y: 9.158},{x: -0.41, y: 18.991},{x: -3.467, y: 13.077},
                {x: 7.356, y: 2.929},{x: 8.504, y: 13.943},{x: 10.481, y: 19.127},{x: 6.048, y: 13.169},
                {x: -4.426, y: 19.925},{x: 9.001, y: 8.863},{x: -0.493, y: 12.684},{x: -1.731, y: 6.258},
                {x: -4.25, y: 4.905},{x: 2.071, y: 8.901},{x: 1.798, y: 11.936},{x: 4.862, y: 19.44},
                {x: 2.666, y: 20.205},{x: 1.434, y: 7.302}
            ],
            "-2":[
                {x: 5.775, y: 2.233},{x: 1.926, y: 17.496},{x: -1.125, y: 2.627},{x: -4.998, y: 11.702},
                {x: -4.635, y: 12.706},{x: -4.647, y: 8.005},{x: 5.322, y: 19.708},{x: -3.843, y: 19.61},
                {x: 7.247, y: 5.233},{x: -4.745, y: 17.614},{x: -1.974, y: 11.621},{x: 5.394, y: 0.639},
                {x: 1.566, y: 11.108},{x: 10.236, y: 12.009},{x: 11.991, y: 10.302},{x: -1.756, y: 15.945},
                {x: 11.507, y: 15.316},{x: 7.753, y: 15.132},{x: 11.967, y: 4.014},{x: -2.434, y: 16.177},
                {x: 7.427, y: 10.707},{x: 7.013, y: 14.621},{x: 1.203, y: 2.392},{x: 11.133, y: 20.052},
                {x: 7.674, y: 9.212},{x: 6.361, y: 9.389},{x: 9.218, y: 13.321},{x: 8.856, y: 2.267},
                {x: 3.379, y: 15.807}
            ],
            "-3":[
                {x: 6.481, y: 10.821},{x: -4.674, y: 2.611},{x: -3.146, y: 10.851},{x: -3.199, y: 16.312},
                {x: 6.198, y: 5.468},{x: 6.85, y: 0.235},{x: 2.662, y: 11.356},{x: 0.818, y: 5.476},
                {x: 8.146, y: 0.617},{x: 8.321, y: 13.211},{x: 1.957, y: 6.065},{x: 6.436, y: 17.487},
                {x: -0.374, y: 3.958},{x: -0.091, y: 4.944},{x: -1.433, y: 5.773},{x: 4.749, y: 21.216},
                {x: 3.069, y: 16.273},{x: 9.441, y: 20.908},{x: 7.445, y: 1.525},{x: 3.593, y: 21.446},
                {x: 9.547, y: 5.512}
            ],
            "-4":[
                {x: -4.858, y: 6.499},{x: 6.675, y: 7.914},{x: -3.055, y: 6.503},{x: 5.357, y: 19.089},
                {x: 1.193, y: 17.766},{x: 11.139, y: 5.41},{x: 6.921, y: 20.754},{x: 11.256, y: 10.976},
                {x: 6.535, y: 18.484},{x: 7.177, y: 14.637},{x: 9.069, y: 4.613},{x: 11.086, y: 17.713},
                {x: 6.807, y: 16.331},{x: -2.774, y: 12.568},{x: 8.198, y: 14.648},{x: 7.311, y: 8.018},
                {x: 11.061, y: 15.047},{x: -0.486, y: 17.565},{x: -3.315, y: 8.187},{x: -3.899, y: 6.671},
                {x: -2.781, y: 5.022},{x: 9.401, y: 12.255},{x: 9.839, y: 10.198}
            ],
            "-5":[
                {x: -3.963, y: 1.107},{x: 2.168, y: 10.691},{x: 2.917, y: 20.652},{x: -3.635, y: 17.484},
                {x: -2.522, y: 7.852},{x: 5.747, y: 14.463},{x: 5.673, y: 2.97},{x: -0.303, y: 1.874},
                {x: 2.969, y: 18.396},{x: -3.794, y: 11.542},{x: -2.38, y: 10.803},{x: 5.715, y: 20.793},
                {x: 7.247, y: 15.04}
            ],
            "-6":[
                {x: -4.468, y: 6.054},{x: 6.052, y: 12.178},{x: -0.6, y: 11.583},{x: -4.22, y: 11.706}
            ],
        },
        13:{
            1:[
                {x: 6.668, y: 20.054},{x: -0.672, y: 17.038},{x: 9.101, y: 6.819},{x: 10.87, y: 0.575},{x: -2.98, y: 15.106},{x: 0.403, y: 14.08},{x: -2.245, y: 6.34},{x: 8.758, y: 16.576},{x: -1.6, y: 13.619},{x: 3.912, y: 16.961},{x: -4.332, y: 2.408},{x: 5.195, y: 1.382},{x: -3.523, y: 4.77},{x: -4.611, y: 6.235},{x: -1.469, y: 3.309},{x: 0.707, y: 16.502},{x: 6.99, y: 0.052},{x: -4.033, y: 10.607},{x: 0.696, y: 1.938},{x: -0.753, y: 5.654},{x: 2.181, y: 10.683},{x: 11.16, y: 20.96},{x: 10.47, y: 20.135},{x: 1.769, y: 14.182},{x: 5.552, y: 1.202},{x: 1.575, y: 12.286},{x: 2.128, y: 20.197},{x: -0.491, y: 12.821},{x: 3.709, y: 21.652},{x: 5.237, y: 0.59},{x: -2.935, y: 12.562},{x: 2.193, y: 20.283},{x: -2.354, y: 6.334},{x: 5.049, y: 17.881},{x: -0.541, y: 11.838},{x: 0.665, y: 17.241},{x: -1.775, y: 7.57},{x: -4.611, y: 15.129},{x: -2.471, y: 4.53},{x: 11.97, y: 0.007},{x: -2.338, y: 15.76},{x: 11.627, y: 3.047},{x: -4.603, y: 15.324}
            ],
            2:[
                {x: 10.841, y: 18.256},{x: 7.113, y: 16.175},{x: 2.88, y: 12.32},{x: 10.852, y: 11.209},{x: 0.507, y: 17.027},{x: 0.074, y: 17.065},{x: 7.323, y: 19.04},{x: 7.288, y: 4.781},{x: -1.601, y: 10.097},{x: -1.541, y: 3.792},{x: 3.277, y: 16.904},{x: 10.973, y: 1.326},{x: -3.4, y: 15.27},{x: 6.617, y: 0.858},{x: 1.309, y: 21.414},{x: -0.202, y: 11.806},{x: 3.176, y: 21.707},{x: 6.207, y: 1.992},{x: 9.222, y: 12.213},{x: 0.796, y: 10.37},{x: 5.164, y: 15.619},{x: -4.835, y: 9.207},{x: 5.347, y: 21.983}
            ],
            3:[
                {x: -2.908, y: 20.597},{x: -0.261, y: 7.67},{x: -4.406, y: 1.982},{x: -2.369, y: 9.366},{x: -3.724, y: 18.441},{x: 8.992, y: 7.278},{x: -1.384, y: 1.34},{x: 1.726, y: 17.598},{x: 7.383, y: 15.934},{x: 7.695, y: 3.553},{x: -4.505, y: 4.599},{x: 11.939, y: 1.23},{x: 10.015, y: 18.081},{x: 11.648, y: 0.65},{x: 11.724, y: 7.156},{x: 8.502, y: 13.849},{x: 11.788, y: 9.078},{x: 7.984, y: 11.615},{x: -2.066, y: 2.786},{x: 5.661, y: 14.226}
            ],
            4:[
                {x: 4.527, y: 5.626},{x: -0.247, y: 1.932},{x: -1.521, y: 2.698},{x: -0.412, y: 11.578},{x: 10.829, y: 10.201},{x: 2.99, y: 21.588},{x: 10.667, y: 3.23},{x: 1.531, y: 12.377},{x: 5.926, y: 14.965},{x: -3.787, y: 16.221},{x: 5.441, y: 11.154},{x: 1.515, y: 14.477},{x: -4.299, y: 4.03},{x: 5.895, y: 8.725},{x: 0.853, y: 16.606},{x: 1.66, y: 18.905},{x: -2.498, y: 8.785},{x: 11.194, y: 12.386},{x: -1.495, y: 14.061},{x: 9.955, y: 7.766},{x: -4.035, y: 13.561},{x: -4.301, y: 9.139},{x: -0.073, y: 14.645},{x: 11.34, y: 11.833},{x: 7.003, y: 11.903},{x: -2.924, y: 9.337},{x: 11.05, y: 0.19},{x: 8.905, y: 6.676},{x: -1.997, y: 5.955},{x: 3.23, y: 18.631}
            ],
            5:[
                {x: 3.789, y: 11.537},{x: 6.716, y: 5.294},{x: -0.242, y: 13.648},{x: -2.676, y: 16.826},{x: 7.82, y: 10.245},{x: -3.96, y: 4.006},{x: 8.823, y: 17.69},{x: 10.955, y: 10.106},{x: 10.433, y: 2.924},{x: 7.679, y: 12.771},{x: 11.84, y: 8.197},{x: -0.056, y: 3.925},{x: 2.627, y: 19.974},{x: -0.449, y: 12.105},{x: -4.379, y: 12.072},{x: -1.69, y: 14.729},{x: -2.018, y: 7.458}
            ],
            6:[
                {x: 10.331, y: 21.578},{x: -4.527, y: 14.651},{x: 6.908, y: 16.81},{x: -4.176, y: 7.095},{x: -4.653, y: 10.135},{x: 9.4, y: 7.057},{x: 8.937, y: 0.058},{x: 0.676, y: 8.255},{x: 6.815, y: 15.685},{x: 1.143, y: 12.47}
            ],
            7:[
                {x: 9.105, y: 8.087},{x: -1.05, y: 13.767},{x: 9.421, y: 0.76},{x: -0.439, y: 19.593},{x: 9.522, y: 8.207},{x: 1.339, y: 21.509},{x: 6.203, y: 1.088},{x: 11.313, y: 11.559},{x: 8.104, y: 12.267}
            ],
            "-1":[
                {x: 4.899, y: 18.077},{x: 5.567, y: 5.171},{x: 6.295, y: 10.387},{x: -1.663, y: 19.305},{x: 7.776, y: 8.452},{x: 11.444, y: 11.626},{x: 0.135, y: 3.163},{x: 11.896, y: 15.279},{x: 7.894, y: 17.999},{x: -2.627, y: 10.93},{x: -1.29, y: 18.691},{x: 4.376, y: 6.799},{x: 10.437, y: 8.995},{x: 0.167, y: 19.831},{x: 3.415, y: 13.439},{x: 5.94, y: 14.96},{x: 9.07, y: 13.5},{x: 10.525, y: 5.162},{x: -0.254, y: 11.829},{x: 8.797, y: 5.816},{x: 8.2, y: 14.28},{x: 8.612, y: 7.6},{x: 8.546, y: 17.64},{x: 2.538, y: 20.314},{x: 7.664, y: 19.995},{x: 8.122, y: 21.684},{x: 3.215, y: 20.982}
            ],
            "-2":[
                {x: 6.063, y: 15.282},{x: -1.659, y: 20.04},{x: 3.697, y: 20.262},{x: 9.17, y: 0.483},{x: 0.332, y: 21.403},{x: -0.672, y: 12.166},{x: 7.485, y: 10.773},{x: 7.981, y: 11.211},{x: 8.414, y: 20.891},{x: 11.768, y: 3.575},{x: 2.818, y: 9.098},{x: 5.674, y: 11.215},{x: 11.566, y: 8.965},{x: 2.241, y: 12.622},{x: 8.534, y: 12.982},{x: 7.791, y: 11.776},{x: -0.347, y: 18.609},{x: 1.149, y: 2.555},{x: 7.607, y: 15.338},{x: 4.815, y: 20.704},{x: 1.938, y: 16.145},{x: 2.134, y: 2.615},{x: -0.251, y: 15.109},{x: 7.041, y: 21.648},{x: 7.398, y: 8.32},{x: 9.455, y: 2.3},{x: 6.747, y: 17.002},{x: 6.189, y: 11.506},{x: -0.69, y: 10.724},{x: -2.186, y: 10.721},{x: 9.313, y: 9.759},{x: 11.12, y: 9.135},{x: -2.661, y: 0.489},{x: 1.42, y: 7.375},{x: -2.944, y: 6.216},{x: -1.891, y: 12.823},{x: 2.113, y: 11.231},{x: 6.239, y: 10.708},{x: -0.602, y: 12.357},{x: -1.124, y: 9.037},{x: -4.491, y: 16.234}
            ],
            "-3":[
                {x: 0.133, y: 5.571},{x: -3.814, y: 11.035},{x: 7.442, y: 2.836},{x: -0.52, y: 19.855},{x: 4.64, y: 17.058},{x: 1.065, y: 12.813},{x: -1.175, y: 9.307},{x: -2.935, y: 14.308},{x: -3.419, y: 0.439},{x: 9.828, y: 19.918},{x: -3.612, y: 7.595},{x: -1.187, y: 8.292},{x: 6.497, y: 9.5},{x: -1.469, y: 16.865},{x: -2.098, y: 9.7},{x: 2.251, y: 10.118},{x: 7.082, y: 19.27},{x: 5.961, y: 5.382},{x: -4.408, y: 17.392},{x: 7.698, y: 9.859},{x: -0.509, y: 4.61},{x: 10.673, y: 5.623},{x: 5.088, y: 6.007},{x: -0.906, y: 5.525},{x: 0.826, y: 6.271},{x: 7.093, y: 11.019},{x: 0.203, y: 17.707},{x: 1.263, y: 13.382}
            ],
            "-4":[
                {x: 9.603, y: 5.67},{x: -3.527, y: 21.441},{x: 3.268, y: 15.307},{x: 8.593, y: 19.424},{x: 8.228, y: 17.187},{x: 4.425, y: 14.632},{x: 11.923, y: 13.114},{x: -3.886, y: 11.816},{x: -0.596, y: 0.945},{x: -2.386, y: 7.929},{x: -4.675, y: 16.305},{x: -4.304, y: 3.743},{x: 6.719, y: 13.299},{x: 6.313, y: 5.944},{x: 8.804, y: 7.607},{x: 0.66, y: 4.504}
            ],
            "-5":[
                {x: -1.042, y: 1.823},{x: -1.973, y: 3.667},{x: 10.669, y: 4.175},{x: 0.124, y: 6.07},{x: 8.693, y: 15.204},{x: 8.792, y: 13.738},{x: 6.013, y: 17.643},{x: 1.464, y: 13.328},{x: 8.776, y: 20.942},{x: 8.289, y: 12.345},{x: 2.56, y: 12.546},{x: -4.386, y: 10.731},{x: 3.32, y: 20.068},{x: -1.27, y: 7.69},{x: 5.354, y: 9.988}
            ],
            "-6":[
                {x: 2.19, y: 8.139},{x: 0.385, y: 16.815},{x: 1.784, y: 9.524},{x: -3.001, y: 6.045},{x: 1.836, y: 11.978},{x: -1.949, y: 7.414},{x: -2.76, y: 12.453}
            ],
            "-7":[
                {x: 6.968, y: 9.02},{x: 11.639, y: 21.872},{x: 5.129, y: 17.104}
            ],
        },
        14:{
            0:[
                {x: 8.489, y: 17.721},{x: 5.197, y: 9.439},{x: 8.687, y: 17.848},{x: 8.271, y: 7.971},{x: -3.684, y: 1.558},{x: -1.18, y: 4.164},{x: -2.738, y: 15.617},{x: 7.997, y: 10.46},{x: 11.557, y: 5.496},{x: -0.645, y: 18.451},{x: 5.66, y: 21.326},{x: -1.049, y: 13.268},{x: 11.929, y: 12.058},{x: -1.267, y: 21.358},{x: -3.461, y: 20.702},{x: 5.873, y: 18.768},{x: -3.502, y: 19.92},{x: 3.813, y: 12.39},{x: 7.933, y: 2.939},{x: 9.51, y: 13.229},{x: 6.857, y: 1.535},{x: -2.928, y: 17.295},{x: 11.38, y: 13.796},{x: -1.023, y: 6.196},{x: -1.885, y: 0.747},{x: 4.478, y: 1.414}
            ],
            1:[
                {x: 2.133, y: 10.383},{x: 6.016, y: 9.452},{x: 3.403, y: 16.527},{x: -1.321, y: 16.288},{x: 6.298, y: 14.662},{x: 11.411, y: 8.302},{x: 6.192, y: 0.222},{x: 11.103, y: 0.795},{x: 11.597, y: 13.23},{x: -0.262, y: 13.151},{x: 6.165, y: 15.737},{x: 9.9, y: 6.436},{x: -4.576, y: 20.96},{x: 10.296, y: 9.018},{x: -1.425, y: 21.019},{x: 4.57, y: 12.934},{x: 0.332, y: 10.377},{x: 9.047, y: 19.011},{x: 8.659, y: 8.667},{x: 6.429, y: 12.407},{x: 9.411, y: 18.014},{x: 7.994, y: 17.447},{x: 0.266, y: 8.383},{x: 6.586, y: 8.611},{x: 0.772, y: 16.291},{x: 6.849, y: 8.434},{x: -4.644, y: 18.129},{x: -1.71, y: 7.666},{x: -2.459, y: 10.466}
            ],
            2:[
                {x: 2.19, y: 10.494},{x: 3.437, y: 18.567},{x: 7.585, y: 20.408},{x: 5.521, y: 17.187},{x: 1.705, y: 21.648},{x: 5.822, y: 18.634},{x: 1.592, y: 15.073},{x: 7.797, y: 17.754},{x: 1.445, y: 7.277},{x: 11.761, y: 14.655},{x: 2.672, y: 9.069},{x: -2.911, y: 18.572},{x: 11.883, y: 7.606},{x: 9.987, y: 2.139},{x: 1.145, y: 16.603},{x: 6.611, y: 18.497},{x: -0.184, y: 2.286},{x: 2.535, y: 12.449},{x: -3.062, y: 9.47},{x: 8.538, y: 3.852},{x: -0.22, y: 7.199},{x: -4.243, y: 19.19},{x: 7.026, y: 19.139},{x: -2.632, y: 8.705},{x: 1.103, y: 9.697},{x: 3.836, y: 20.227},{x: 9.242, y: 15.534},{x: 6.521, y: 21.654},{x: 8.663, y: 7.831},{x: 3.735, y: 9.371},{x: 9.647, y: 6.626},{x: -3.851, y: 13.068},{x: 8.373, y: 21.376},{x: -3.531, y: 10.084}
            ],
            3:[
                {x: 2.044, y: 13.224},{x: 6.423, y: 13.33},{x: 5.86, y: 12.907},{x: -2.296, y: 21.987},{x: 2.121, y: 16.228},{x: 5.927, y: 5.659},{x: 11.446, y: 17.758},{x: 0.808, y: 15.76},{x: -1.454, y: 8.688},{x: 0.008, y: 16.007},{x: 10.148, y: 2.952},{x: 11.29, y: 12.697},{x: 11.133, y: 8.787},{x: -4.146, y: 21.494},{x: 0.588, y: 19.118},{x: -2.121, y: 15.47},{x: 11.915, y: 2.297}
            ],
            4:[
                {x: -4.82, y: 3.068},{x: 9.501, y: 4.044},{x: -0.901, y: 9.121},{x: -0.454, y: 6.794},{x: 0.116, y: 16.124},{x: 11.811, y: 7.419},{x: -4.607, y: 19.28},{x: 11.951, y: 1.321},{x: -2.095, y: 15.902},{x: -1.464, y: 8.574},{x: 11.905, y: 1.664},{x: 1.73, y: 21.42},{x: -1.832, y: 11.814},{x: 7.24, y: 10.239}
            ],
            5:[
                {x: 2.532, y: 17.24},{x: 7.962, y: 16.761},{x: 0.798, y: 19.983},{x: -3.151, y: 7.773},{x: 6.855, y: 16.692},{x: 8.85, y: 2.734},{x: 2.492, y: 15.906},{x: 11.499, y: 1.703},{x: 10.23, y: 5.633},{x: 10.188, y: 14.043}
            ],
            6:[
                {x: -1.051, y: 12.717},{x: -0.868, y: 8.846},{x: -2.833, y: 20.674},{x: -1.058, y: 13.923},{x: 2.184, y: 2.633}
            ],
            7:[
                {x: 2.692, y: 7.306},{x: 8.865, y: 11.513},{x: 0.06, y: 2.815},{x: -0.194, y: 4.045},{x: -0.544, y: 21.581},{x: -2.297, y: 21.359}
            ],
            "-1":[
                {x: -4.66, y: 12.386},{x: 11.819, y: 14.062},{x: -0.46, y: 7.955},{x: 3.946, y: 1.473},{x: 4.904, y: 15.069},{x: 6.695, y: 4.17},{x: 10.01, y: 15.588},{x: 6.849, y: 20.646},{x: 11.902, y: 4.862},{x: -0.603, y: 10.992},{x: 6.242, y: 8.606},{x: 2.302, y: 17.438},{x: 11.132, y: 10.755},{x: 7.738, y: 14.247},{x: 5.192, y: 20.579},{x: 10.367, y: 1.596},{x: 2.183, y: 4.875},{x: 3.182, y: 15.566},{x: 6.968, y: 18.898},{x: 1.319, y: 15.033},{x: 6.42, y: 11.79},{x: -2.706, y: 5.803}
            ],
            "-2":[
                {x: -1.977, y: 17.235},{x: 4.913, y: 10.868},{x: -1.613, y: 20.014},{x: 9.838, y: 5.631},{x: -1.593, y: 12.395},{x: 4.619, y: 1.108},{x: 7.475, y: 9.298},{x: 9.519, y: 6.566},{x: -2.455, y: 2.201},{x: -2.022, y: 19.927},{x: -4.176, y: 7.229},{x: 7.722, y: 20.38},{x: -4.803, y: 0.037},{x: -2.034, y: 3.578},{x: 4.169, y: 15.782},{x: 10.93, y: 19.144},{x: 1.934, y: 13.936},{x: 9.761, y: 4.829},{x: 10.69, y: 19.897},{x: -1.645, y: 0.004},{x: -2.363, y: 18.235},{x: 6.961, y: 12.014},{x: -3.182, y: 21.361},{x: -3.959, y: 18.549}
            ],
            "-3":[
                {x: 11.751, y: 6.824},{x: 6.988, y: 16.038},{x: 5.946, y: 13.345},{x: 9.135, y: 16.079},{x: 8.577, y: 19.939},{x: 1.295, y: 19.15},{x: 5.195, y: 18.356},{x: 0.517, y: 15.84},{x: 11.047, y: 19.858},{x: 1.389, y: 18.497},{x: 9.812, y: 18.918},{x: 1.484, y: 2.506},{x: 11.379, y: 8.183},{x: -3.585, y: 11.595},{x: -0.611, y: 12.146},{x: 2.736, y: 11.562},{x: 6.637, y: 3.773},{x: 5.696, y: 5.369},{x: -4, y: 14.417},{x: -1.414, y: 12.035},{x: 6.324, y: 19.376},{x: -4.964, y: 13.032},{x: 9.807, y: 13.258},{x: 2.034, y: 9.954}
            ],
            "-4":[
                {x: 4.262, y: 1.489},{x: 9.478, y: 9.881},{x: 7.475, y: 8.248},{x: -3.448, y: 15.634},{x: 7.704, y: 13.543},{x: -0.196, y: 17.131},{x: 11.557, y: 6.021},{x: 8.468, y: 15.299},{x: 6.664, y: 9.783},{x: 1.383, y: 3.778},{x: 11.143, y: 17.398},{x: -3.037, y: 18.61},{x: 9.769, y: 12.562},{x: -0.639, y: 16.682},{x: 5.808, y: 0.955}
            ],
            "-5":[
                {x: 8.577, y: 17.312},{x: 4.456, y: 18.054},{x: 4.183, y: 21.222},{x: -2.429, y: 10.477},{x: -1.041, y: 20.849},{x: 0.95, y: 20.102},{x: -4.71, y: 21.938},{x: -1.862, y: 6.531},{x: 7.432, y: 6.646},{x: 7.175, y: 20.822},{x: 2.298, y: 13.868}
            ],
            "-6":[
                {x: -4.499, y: 14.676},{x: -4.087, y: 8.67},{x: -2.44, y: 13.286}
            ],
            "-7":[
                {x: -1.444, y: 18.218},{x: 9.271, y: 8.214},{x: -3.3, y: 19.045},{x: 5.332, y: 6.404},{x: -3.409, y: 7.421}
            ],
        },
        15:{
            1:[
                {x: 8.958, y: 15.245},{x: 6.692, y: 15.814},{x: -0.538, y: 14.326},{x: -2.171, y: 6.149},{x: 4.111, y: 17.251},{x: 3.37, y: 7.041},{x: 10.285, y: 0.335},{x: 11.039, y: 9.663},{x: 9.848, y: 2.529},{x: 1.76, y: 6.851},{x: 11.251, y: 3.565},{x: 8.307, y: 9.281},{x: -0.459, y: 5.05},{x: -1.037, y: 15.254},{x: -4.98, y: 20.264},{x: 6.597, y: 17.406},{x: 0.472, y: 4.593},{x: -2.694, y: 14.134},{x: -2.33, y: 19.353},{x: 6.912, y: 9.067},{x: 8.815, y: 2.993},{x: 0.441, y: 12.141},{x: -2.107, y: 13.138},{x: -2.735, y: 19.072}
            ],
            2:[
                {x: -1.023, y: 20.735},{x: 2.777, y: 21.01},{x: 5.388, y: 4.421},{x: -4.53, y: 17.38},{x: 8.327, y: 21.126},{x: 2.051, y: 16.966},{x: 5.405, y: 9.958},{x: 9.683, y: 14.937},{x: 4.124, y: 17.536},{x: 5.457, y: 9.844},{x: 5.837, y: 10.214},{x: 3.978, y: 19.022},{x: 11.901, y: 18.772},{x: -0.754, y: 17.941},{x: 8.17, y: 1.105},{x: 10.94, y: 8.065},{x: 2.592, y: 14.241},{x: 8.607, y: 21.473},{x: -4.162, y: 1.641},{x: -1.179, y: 1.403},{x: 0.814, y: 20.097},{x: -4.109, y: 21.477}
            ],
            3:[
                {x: 4.591, y: 15.909},{x: 1.365, y: 16.266},{x: -1.108, y: 7.565},{x: -0.182, y: 20.865},{x: 4.809, y: 11.377},{x: 0.252, y: 20.903},{x: 7.529, y: 6.893},{x: 9.231, y: 19.993},{x: -4.443, y: 19.99},{x: -2.126, y: 7.212},{x: -3.951, y: 21.138},{x: 3.882, y: 13.625},{x: -0.906, y: 20.323},{x: 1.223, y: 21.978},{x: 3.589, y: 15.851},{x: -1.039, y: 17.402},{x: -1.348, y: 1.261},{x: 9.994, y: 13.011},{x: 0.902, y: 18.392},{x: 7.984, y: 19.067},{x: -1.744, y: 14.031}
            ],
            4:[
                {x: 9.513, y: 5.345},{x: -3.009, y: 20.229},{x: 6.245, y: 9.097},{x: 6.07, y: 14.887},{x: -0.906, y: 20.313},{x: 10.1, y: 8.854},{x: 1.798, y: 1.627},{x: 11.387, y: 3.862},{x: 5.247, y: 18.292},{x: 4.423, y: 21.38},{x: 8.523, y: 16.061},{x: -4.92, y: 18.423},{x: 2.56, y: 16.639},{x: 0.104, y: 5.826}
            ],
            5:[
                {x: 6.905, y: 20.442},{x: 0.532, y: 18.942},{x: -1.294, y: 13.766},{x: 9.053, y: 13.36},{x: 9.227, y: 18.628},{x: -0.035, y: 1.619},{x: 8.98, y: 21.589},{x: -2.718, y: 10.601},{x: 11.629, y: 5.464},{x: 5.946, y: 15.621},{x: 9.043, y: 20.022},{x: 0.024, y: 13.591},{x: 5.066, y: 6.811},{x: 7.981, y: 13.744}
            ],
            6:[
                {x: -4.895, y: 8.771},{x: -2.925, y: 6.78},{x: 11.122, y: 20.58},{x: -3.327, y: 6.828}
            ],
            7:[
                {x: -1.481, y: 12.958},{x: 5.821, y: 15.206},{x: 8.461, y: 1.475},{x: 0.814, y: 16.23},{x: 8.989, y: 9.123},{x: 10.19, y: 14.743}
            ],
            8:[
                {x: -1.3, y: 20.001},{x: 5.312, y: 11.369}
            ],
            "-1":[
                {x: 9.581, y: 15.64},{x: 8.221, y: 17.72},{x: 11.712, y: 12.957},{x: -3.453, y: 5.981},{x: 8.025, y: 13.092},{x: -3.659, y: 12.989},{x: 0.87, y: 6.063},{x: 10.74, y: 20.256},{x: -2.951, y: 12.866},{x: 3.681, y: 12.112},{x: 2.207, y: 9.611},{x: -3.508, y: 21.248},{x: -3.436, y: 21.447},{x: 1.325, y: 14.352},{x: -0.918, y: 3.541},{x: 4.701, y: 20.859},{x: -2.988, y: 21.508},{x: 6.39, y: 4.422}
            ],
            "-2":[
                {x: 2.278, y: 17.768},{x: 0.662, y: 14.847},{x: 1.411, y: 3.667},{x: 11.116, y: 15.436},{x: 2.648, y: 20.513},{x: 4.869, y: 5.241},{x: 11.873, y: 20.101},{x: 1.949, y: 19.986},{x: 6.2, y: 19.698},{x: 1.142, y: 9.048},{x: -3.838, y: 10.418},{x: 11.896, y: 3.635},{x: 3.489, y: 12.759},{x: 0.601, y: 11.819},{x: -3.647, y: 10.42},{x: -2.06, y: 6.956},{x: -0.256, y: 4.55}
            ],
            "-3":[
                {x: 6.04, y: 13.313},{x: -3.025, y: 15.633},{x: 9.638, y: 16.217},{x: -3.271, y: 2.189},{x: 5.009, y: 10.543},{x: -1.274, y: 20.927},{x: 5.603, y: 13.384},{x: -2.432, y: 0.626},{x: 10.787, y: 20.122},{x: 0.173, y: 3.431},{x: 11.024, y: 11.631},{x: 0.362, y: 8.799},{x: 0.508, y: 3.174},{x: -2.737, y: 14.619},{x: 5.941, y: 12.005},{x: 1.32, y: 19.649},{x: 1.73, y: 13.931},{x: 9.076, y: 14.324},{x: 1.825, y: 9.919},{x: 10.761, y: 19.154},{x: -4.43, y: 5.077}
            ],
            "-4":[
                {x: 7.426, y: 11.03},{x: 5.91, y: 14.409},{x: -4.284, y: 1.448},{x: 2.141, y: 5.739},{x: 11.271, y: 1.359},{x: 8.862, y: 15.057},{x: -3.812, y: 4.733},{x: 10.143, y: 20.031},{x: 8.379, y: 16.708},{x: 5.273, y: 13.993},{x: -4.478, y: 16.039},{x: -1.973, y: 9.658},{x: 8.503, y: 13.964},{x: -2.289, y: 21.706},{x: -1.311, y: 8.876},{x: -0.131, y: 8.924},{x: 10.97, y: 13.139}
            ],
            "-5":[
                {x: 6.616, y: 11.319},{x: 0.408, y: 17.271},{x: -4.371, y: 15.321},{x: 8.644, y: 9.324},{x: -2.68, y: 21.363},{x: 11.285, y: 20.416},{x: 2.872, y: 11.166},{x: 11.278, y: 18.334},{x: 8.901, y: 8.072},{x: 1.746, y: 7.451},{x: -0.816, y: 11.465},{x: 6.575, y: 17.384}
            ],
            "-6":[
                {x: 1.908, y: 17.735},{x: 0.653, y: 20.314},{x: 8.425, y: 18.036},{x: 10.928, y: 13.737},{x: 5.101, y: 14.677}
            ],
            "-7":[
                {x: 2.469, y: 20.425},{x: 11.206, y: 11.019},{x: 4.85, y: 19.319}
            ],
            "-8":[
                {x: 5.127, y: 21.828},{x: 5.211, y: 11.242}
            ],
        },
        16:{
            0:[
                {x: 4.041, y: 20.535},{x: 9.899, y: 0.302},{x: 10.129, y: 9.194},{x: -2.41, y: 8.583},{x: 10.44, y: 7.699},{x: 2.809, y: 3.009},{x: 2.72, y: 15.936},{x: 9.884, y: 9.094},{x: -2.769, y: 21.216},{x: 2.763, y: 16.532},{x: 11.605, y: 1.473},{x: 6.957, y: 16.306},{x: 8.359, y: 16.04},{x: 11.634, y: 1.61},{x: -1.767, y: 9.768},{x: 1.342, y: 9.972},{x: 9.975, y: 14.29},{x: 4.067, y: 18.112},{x: 0.256, y: 21.844},{x: 3.734, y: 21.985},{x: 10.103, y: 4.625},{x: -3.745, y: 10.047},{x: 11.608, y: 13.589},{x: 9.972, y: 20.652},{x: -0.263, y: 15.361},{x: -1.684, y: 21.676},{x: -0.432, y: 8.329},{x: 2.132, y: 15.68},{x: 1.278, y: 7.926},{x: 10.35, y: 21.715},{x: -1.749, y: 8.311},{x: 0.297, y: 7.071},{x: -4.812, y: 10.979},{x: 7.973, y: 17.742},{x: 8.36, y: 9.406},{x: 7.965, y: 9.033},{x: 7.163, y: 19.477},{x: 4.575, y: 6.543},{x: -0.28, y: 1.111}
            ],
            1:[
                {x: -0.367, y: 11.6},{x: 3.754, y: 20.867},{x: -3.798, y: 4.798},{x: -2.614, y: 21.038},{x: 3.743, y: 15.291},{x: 8.19, y: 12.11},{x: 4.544, y: 1.043},{x: 8.146, y: 8.904},{x: -4.119, y: 10.537},{x: -2.685, y: 7.72},{x: -4.422, y: 8.371},{x: 10.316, y: 3.501},{x: -4.755, y: 9.39},{x: -1.245, y: 19.52},{x: -2.971, y: 20.564},{x: 2.21, y: 20.474},{x: 0.235, y: 5.319},{x: 0.405, y: 18.714},{x: 5.745, y: 13.579},{x: -4.743, y: 15.525},{x: 11.459, y: 5.864},{x: 8.623, y: 19.813},{x: -3.054, y: 8.26},{x: -3.815, y: 1.554},{x: 11.627, y: 6.254},{x: 9.294, y: 6.258},{x: 10.038, y: 19.91},{x: 4.268, y: 18.139},{x: 9.386, y: 11.164},{x: -3.566, y: 7.778},{x: 5.697, y: 15.208},{x: 8.245, y: 9.327}
            ],
            2:[
                {x: -1.156, y: 13.875},{x: 2.094, y: 13.392},{x: 6.651, y: 7.457},{x: 5.715, y: 17.228},{x: -3.795, y: 21.521},{x: -2.702, y: 15.189},{x: -2.347, y: 13.685},{x: 6.75, y: 12.652},{x: 1.3, y: 13.679},{x: -4.839, y: 7.201},{x: 5.581, y: 12.292},{x: 6.961, y: 12.295},{x: 10.41, y: 13.086},{x: 11.186, y: 19.679},{x: 8.418, y: 14.44},{x: -2.593, y: 21.949},{x: 10.841, y: 16.237},{x: 10.066, y: 8.476},{x: 3.464, y: 14.788},{x: 7.783, y: 7.939},{x: 6.814, y: 8.969},{x: -0.981, y: 12.805},{x: -4.28, y: 15.412},{x: 6.795, y: 7.392},{x: -3.975, y: 15.731},{x: 10.389, y: 4.626},{x: 8.913, y: 14.812},{x: 11.025, y: 8.91},{x: -2.011, y: 14.588},{x: 10.614, y: 9.475},{x: 7.269, y: 1.281}
            ],
            3:[
                {x: 8.877, y: 2.998},{x: -4.116, y: 5.672},{x: 6.734, y: 10.189},{x: 8.844, y: 8.519},{x: 8.936, y: 13.285},{x: -2.266, y: 1.419},{x: 6.546, y: 11.801},{x: -1.301, y: 14.777},{x: 3.919, y: 4.827},{x: -0.668, y: 16.623},{x: -3.995, y: 20.22},{x: -3.442, y: 16.558},{x: 6.042, y: 17.281},{x: 8.08, y: 4.534},{x: -4.588, y: 16.681},{x: 9.176, y: 17.009},{x: 6.78, y: 8.143},{x: -0.973, y: 5.022},{x: 8.373, y: 17.898},{x: 11.06, y: 18.007},{x: 6.229, y: 18.349},{x: 2.934, y: 15.767},{x: 11.256, y: 3.71},{x: 6.646, y: 14.645},{x: 10.213, y: 18.599},{x: 2.573, y: 19.846},{x: 8.48, y: 20.424},{x: 8.45, y: 11.649},{x: 0.146, y: 2.666}
            ],
            4:[
                {x: 8.396, y: 15.613},{x: 6.044, y: 10.994},{x: -0.623, y: 9.7},{x: 2.555, y: 19.123},{x: 11.653, y: 4.849},{x: 8.458, y: 16.761},{x: 5.114, y: 19.591},{x: 3.895, y: 20.104},{x: -0.613, y: 2.583},{x: 11.387, y: 10.591},{x: 2.136, y: 19.374},{x: 10.701, y: 15.542},{x: 11.154, y: 0.063},{x: 8.741, y: 3.709},{x: -1.659, y: 21.447},{x: 3.41, y: 13.093},{x: -2.558, y: 16.055},{x: 3.079, y: 13.091},{x: 5.969, y: 14.196},{x: 4.803, y: 17.833},{x: 1.037, y: 9.469},{x: 6.775, y: 3.153}
            ],
            5:[
                {x: 3.482, y: 21.981},{x: -4.929, y: 15.859},{x: -2.287, y: 12.278},{x: 5.813, y: 10.511},{x: 9.258, y: 8.99},{x: -0.306, y: 17.772},{x: 1.197, y: 9.69},{x: 1.755, y: 11.748},{x: 8.729, y: 14.972},{x: 6.035, y: 4.004},{x: 4.269, y: 21.615},{x: 9.744, y: 11.448},{x: 5.785, y: 4.437}
            ],
            6:[
                {x: 0.795, y: 11.377},{x: 1.957, y: 2.511},{x: 3.553, y: 15.069},{x: 5.837, y: 9.134},{x: -1.527, y: 3.947},{x: 10.156, y: 9.515},{x: 11.685, y: 6.419},{x: -2.031, y: 17.817},{x: 7.278, y: 9.473},{x: 1.025, y: 18.443},{x: 6.285, y: 5.551},{x: 8.845, y: 3.098},{x: 8.046, y: 19.596},{x: -4.91, y: 16.915},{x: -2.995, y: 19.99},{x: 3.897, y: 8.543},{x: 10.865, y: 0.78}
            ],
            7:[
                {x: -3.281, y: 12.286},{x: 6.937, y: 3.405},{x: 7.025, y: 8.122},{x: 8.851, y: 21.915},{x: -0.901, y: 9.078},{x: -1.852, y: 21.224},{x: 0.098, y: 10.21}
            ],
            8:[
                {x: -1.604, y: 8.613},{x: 5.222, y: 21.828}
            ],
            "-1":[
                {x: 3.137, y: 19.756},{x: -4.258, y: 1.927},{x: 6.358, y: 13.871},{x: 8.672, y: 16.549},{x: -3.842, y: 15.463},{x: 9.166, y: 20.028},{x: -2.3, y: 13.579},{x: -0.742, y: 1.889},{x: 5.066, y: 6.546},{x: 11.559, y: 18.988},{x: 7.398, y: 16.895},{x: 6.799, y: 7.265},{x: 3.591, y: 15.993},{x: -1.752, y: 21.072},{x: 1.036, y: 9.118},{x: 0.294, y: 4.538},{x: 1.702, y: 12.239},{x: 11.43, y: 5.31},{x: -2.56, y: 8.971},{x: 11.733, y: 14.431},{x: -2.868, y: 19.079},{x: 7.078, y: 16.956},{x: 11.613, y: 10.621},{x: 1.732, y: 15.485},{x: 7.02, y: 3.922},{x: 6.898, y: 13.696},{x: -1.011, y: 2.774},{x: -0.201, y: 1.621},{x: -1.555, y: 15.347},{x: -3.427, y: 14.371},{x: 4.421, y: 10.68},{x: 0.348, y: 10.224},{x: -1.734, y: 8.542},{x: 0.924, y: 11.612},{x: -3.678, y: 7.823},{x: 0.437, y: 14.451},{x: 1.915, y: 16.91},{x: -3.397, y: 3.651},{x: -1.661, y: 9.013},{x: -3.386, y: 13.64},{x: 11.537, y: 1.602},{x: 0.929, y: 3.406}
            ],
            "-2":[
                {x: -1.382, y: 15.825},{x: -2.21, y: 10.564},{x: -3.821, y: 6.085},{x: 11.389, y: 19.554},{x: 2.625, y: 19.578},{x: 0.013, y: 13.643},{x: -1.031, y: 3.291},{x: 3.023, y: 4.649},{x: -3.179, y: 2.467},{x: -2.61, y: 11.626},{x: 9.512, y: 11.484},{x: -4.265, y: 13.81},{x: -2.617, y: 1.438},{x: 7.046, y: 13.058},{x: 9.805, y: 12.244},{x: 11.426, y: 19.884},{x: 4.798, y: 14.916},{x: 10.166, y: 11.491},{x: 0.233, y: 20.932},{x: 2.6, y: 20.365},{x: -0.545, y: 21.325},{x: 3.957, y: 20.834},{x: 4.865, y: 11.069},{x: 3.076, y: 6.393}
            ],
            "-3":[
                {x: 1.153, y: 10.687},{x: -2.02, y: 1.238},{x: 4.315, y: 15.966},{x: 11.347, y: 3.467},{x: -0.82, y: 12.983},{x: 1.863, y: 16.046},{x: 1.2, y: 10.546},{x: -4.199, y: 21.74},{x: -0.454, y: 11.533},{x: 11.399, y: 21.111},{x: 8.715, y: 16.954},{x: 8.745, y: 19.89},{x: -0.475, y: 1.977},{x: 5.15, y: 18.422},{x: -2.223, y: 12.225},{x: 9.442, y: 2.302},{x: 2.924, y: 13.903},{x: 3.318, y: 18.058},{x: 11.363, y: 15.574},{x: -0.977, y: 16.001},{x: 1.917, y: 16.822},{x: 7.907, y: 4.236},{x: 8.859, y: 21.334},{x: 6.755, y: 2.122}
            ],
            "-4":[
                {x: 3.507, y: 8.946},{x: -3.259, y: 7.617},{x: -1.814, y: 2.932},{x: -4.32, y: 7.091},{x: 4.944, y: 10.261},{x: 7.215, y: 17.75},{x: 4.603, y: 17.688},{x: 5.206, y: 10.239},{x: -0.999, y: 20.691},{x: 3.863, y: 16.214},{x: -2.516, y: 18.168},{x: 9.112, y: 7.36},{x: 5.702, y: 18.838},{x: 0.458, y: 4.931},{x: -4.223, y: 0.755},{x: -4.445, y: 12.36},{x: -3.57, y: 14.033},{x: 6.079, y: 18.924},{x: 6.714, y: 2.309},{x: 6.237, y: 3.118},{x: -3.006, y: 8.832},{x: -3.203, y: 2.095}
            ],
            "-5":[
                {x: -0.733, y: 7.697},{x: -4.922, y: 13.383},{x: -1.32, y: 17.795},{x: -0.933, y: 13.826},{x: 10.273, y: 9.197},{x: 4.646, y: 16.822},{x: 0.439, y: 13.084},{x: -3.335, y: 13.63},{x: 0.783, y: 18.059},{x: -1.21, y: 12.075},{x: 9.906, y: 8.815}
            ],
            "-6":[
                {x: 11.39, y: 7.319},{x: 0.112, y: 19.76},{x: -1.678, y: 15.131},{x: -4.374, y: 19.239},{x: 10.385, y: 0.605},{x: 2.361, y: 12.028},{x: 0.668, y: 20.435},{x: -0.193, y: 4.274},{x: -4.418, y: 12.253},{x: -1.764, y: 21.822},{x: 0.412, y: 11.639},{x: 0.559, y: 20.366}
            ],
            "-7":[
                {x: 3.843, y: 19.221},{x: -1.724, y: 7.003},{x: 5.559, y: 12.775}
            ],
            "-8":[
                {x: 7.274, y: 14.319}
            ],
        }
    }
    constructor({app, game}){
        super();
        this.game = game;
        this.inited = false;// 游戏是否初始化标记，app.js中用

        this.pp = new PlinkoPhysicsCtrl({app});

        console.log("pp",this.pp);

        this.config = {
            left: 40,
            right: 20,
            top: 60,
            bottom: 40,

            countdown: 3,

            speed: 0.02,
            speedScale: 0.02,

            accSpeed: 0.0005,
            accScale: 0.0001,

            //bv的缩放比例
            bvScale: 0.3,

            // 曲线总进度 0 - 1
            bv: 0,

            // 曲线加速度
            bva: 0.0005,

            startColor: 0x3BC117,
            startLineWidth: 4,
            startArcSize: 35,

            startSize: 16,

            rulerColor: 0x777777,
            rulerWidth: 1,
            rulerFSize: 10,

            gmFSize: 42,
            gmTextColor: 0xffffff,

            gmvalue: 1,

            gmLineWidth: 6,

            //抖动计数
            dou: 10,

            douWidth: 2,
            pointSize: 6,

            bgColor: 0x17191b
        };

        this.game = game;
        this.startAngle = 0;
        this.endAngle = -0.0001;
        //游戏运行时间
        this.gmvalue = 1;

        /**游戏画面容器 */
        this.container = new Container;
        // if(added)app.stage.addChild(this.container);
        this.gameContainer = new Container;
        /**图片缓存区 */
        this.images = {};

        /**控制类 */
        this.app = app;
        /**游戏层数：8-16层 */
        this.floors = 8;
        /**正负步子：1表示掉向右边，-1表示掉向左边 */
        this.steps = [];
        /**8-16层每一层的结果数组 */
        this.floorResults = [
            [-4, -3, -2, -1, 0, 1, 2, 3, 4],// 8
            [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5],// 9
            [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5],// 10
            [-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6],// 11
            [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6],// 12
            [-7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7],// 13
            [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7],// 14
            [-8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8],// 15
            [-8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8],// 16
        ];
        /**运动箭头：直的 */
        this.moveLine1 = new Graphics;
        /**运动箭头：斜的 */
        this.moveLine2 = new Graphics;
        /**运动标记 */
        this.startFlag = false;
        /**运动时间 */
        this.startTime = 0;
        /**最终结果 */
        this.payout = 0;
        /**risk */
        this.riskStr = "low";
        /**返利文本缓存区 */
        this.payoutTextObj = {};
        
        this.addMap = new Map;
        this.datas = {};

        this.payoutResult = 0;
        this.backFun = null;
    }

    async init(){
        // 
        await this.loadPic();
        await Assets.load('./lan.fnt');
    }
    resize() {
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

        this.container.x = 10;
        this.container.y = 20;

        console.log("resize");
    }

    reset() {
        this.startFlag = false;
        console.log("reset");
        this.startTime = 0;
        this.moveLine1.alpha = 0;
        this.moveLine2.alpha = 0;
    }

    start(serverVal) {
        this.reset();
        this.startFlag = true;
        
        // let segmentX = [-5,12];
        // let segmentY = [0,22];
        this.payoutResult = Number(serverVal);
        let resIds = [];
        for(let key in Plinko.plinkoData[this.floors - 8]){
            if(Plinko.plinkoData[this.floors - 8][key]['payout'][this.riskStr] == this.payoutResult){
                resIds.push(Plinko.plinkoData[this.floors - 8][key]['val']);
            }
        }

        let posAry = [];
        for(let i in resIds){
            posAry = posAry.concat(Plinko.posRecord[this.floors][posAry[i]]);
        }
        let tempIndex = Math.floor(Math.random() * posAry.length);
        let tempPos = posAry[tempIndex];


        // let randomPos = this.floorResults[this.floors - 8][Math.floor(Math.random() * this.floorResults[this.floors - 8].length)];
        // // randomPos = 0;
        // let posAry = Plinko.posRecord[this.floors][randomPos];
        // let tempIndex = Math.floor(Math.random() * posAry.length);
        // let tempPos = posAry[tempIndex];

        // for(let i in Plinko.plinkoData[this.floors - 8]){
        //     if(Plinko.plinkoData[this.floors - 8][i].val == randomPos){
        //         this.payoutResult = Plinko.plinkoData[this.floors - 8][i]["payout"][this.riskStr];
        //         break;
        //     }
        // }
        console.log("payout:", this.payoutResult);
        // tempPos = posAry[0];
        console.log("下落起始点：", tempPos, "  下落点：", "weizhi", "  下标：", tempIndex);
        this.pp.start(tempPos);
        
        // // 保留两位小数，方便记录
        // let x = Math.round(((segmentX[1] - segmentX[0])*Math.random() + segmentX[0]) * 1000) / 1000;
        // let y = Math.round(((segmentY[1] - segmentY[0])*Math.random() + segmentY[0]) * 1000) / 1000;

        // let ball = this.pp.start({x,y});
        // this.addMap.set(ball.id,{
        //     x,y
        // });
    }

    setFallOverBack(func){
        this.backFun = func;
    }

    tick(d) {
        // if (this.startFlag) {
        //     this.startTime += d;
        //     this.startFallAni();
        // }
    }

    mount() {
        this.resize();

        this.pp.init(this.images["dot"]);
        this.pp.initPayoutUI(this.images);
        
        this.pp.onBall=ops=>{
            // if(!this.startFlag){
            //     console.log("结束下落")
            //     return;
            // }
            const {id,no} = ops;
            console.log(`id:${id},no:${no}`);
            this.startFlag = false;
            this.backFun(this.payoutResult);
            let ball =  this.addMap.get(id);

            let arr = this.datas[no] = this.datas[no] || [];

            arr.push(ball);
            // this.start();
        };
        this.container.addChild(this.pp.getUI());

        console.log("显示UI");
        // this.showUI();

        this.pp.getUI().x = this.width / 2;
        this.pp.showRows(this.floors);

        this.app.ticker.add(this.tick, this);
        this.pp.mount();

        // console.log("下落结果合集：", this.datas);
    }
    unmount() {
        this.app.ticker.remove(this.tick, this);
        this.pp.unmount();
    }
    destroy() {
        this.unmount();
        this.container.destroy();
        this.container = null;
        this.app = null;
    }

    async loadPic() {
        let dotImg = await Assets.load('/plinko/dot.png');
        this.images["dot"] = dotImg;
        let i = 0;
        for (i = 0; i < 6; i++) {
            let resImg = await Assets.load('/plinko/res' + i + '.png');
            this.images["res" + i] = resImg;
        }
    }
    showUI(){
        // this.records = new CommonRecord(this.container,this.app);
        this.recordBtn = new Graphics;
        this.recordBtn.clear();
        this.recordBtn.beginFill(0x00ef98, 1);
        this.recordBtn.drawRoundedRect(40, this.height - 400, 80, 80, 5);
        this.recordBtn.endFill();
        this.recordBtn.eventMode = 'static';
        this.recordBtn.cursor = 'pointer';
        this.recordBtn.on('pointerdown', this.onClickRecordBtn.bind(this));
        this.container.addChild(this.recordBtn);

        this.startBtn = new Graphics;
        this.startBtn.clear();
        this.startBtn.beginFill(0x00ef98, 1);
        this.startBtn.drawRoundedRect(40, this.height - 100, this.width - 80, 80, 5);
        this.startBtn.endFill();
        this.startBtn.eventMode = 'static';
        this.startBtn.cursor = 'pointer';
        this.startBtn.on('pointerdown', this.onClickStartBtn.bind(this));
        this.container.addChild(this.startBtn);

        this.startText = new BitmapText(
            'START', {
            align: "center",
            fontName: "lan",
            fontSize: 24,
            tint: 0x000000
        });
        this.startText.anchor.set(0.5);
        this.startText.x = this.width / 2;
        this.startText.y = this.height - 100 + 40;
        this.container.addChild(this.startText);

        this.showRowBtns();
    }
    showGameUI(floors) {
        this.pp.showRows(floors);
    }

    showPayOut(){
        let resAry = Plinko.plinkoData[this.floors - 8];
        let i = 0;
        for(i = 0;i < resAry.length;i++){
            this.payoutTextObj[resAry[i].val].text = resAry[i].payout[this.riskStr] + "x";
        }
    }
    scaleGameUI(){
        let scaleW = (this.width - 20) / this.gameContainer.width;
        let scaleH = this.height / this.gameContainer.height;
        if(scaleW > scaleH){
            this.gameContainer.width *= scaleH;
            this.gameContainer.height *= scaleH;
        }else {
            this.gameContainer.width *= scaleW;
            this.gameContainer.height *= scaleW;
        }

        this.gameContainer.x = this.width / 2;
        this.gameContainer.y = 20;
    }
    /**显示行数改变按钮 */
    showRowBtns() {
        let i = 0;

        this.riskDetailText = new BitmapText(
            'Risk(' + this.riskStr + ")", {
            align: "center",
            fontName: "lan",
            fontSize: 24,
            tint: 0xffffff
        });
        // this.riskDetailText.anchor.set(0.5);
        this.riskDetailText.x = 10;
        this.riskDetailText.y = this.height - 280;
        this.container.addChild(this.riskDetailText);

        for (i = 0; i < 3; i++) {
            let keyStr = "low";
            if (i == 0) {
                keyStr = "low";
            } else if (i == 1) {
                keyStr = "medium";
            } else if (i == 2) {
                keyStr = "high";
            }
            let riskBtn = new Graphics;
            riskBtn.clear();
            riskBtn.beginFill(0x00ef98, 1);
            riskBtn.drawRoundedRect(10 + i * 130, this.height - 240, 120, 40, 5);
            riskBtn.endFill();
            riskBtn.eventMode = 'static';
            riskBtn.cursor = 'pointer';
            riskBtn.on('pointerdown', this.onClickRiskBtn.bind(this, keyStr));
            this.container.addChild(riskBtn);

            let riskText = new BitmapText(
                keyStr, {
                align: "center",
                fontName: "lan",
                fontSize: 24,
                tint: 0x000000
            });
            riskText.anchor.set(0.5);
            riskText.x = 10 + i * 130 + 60;
            riskText.y = this.height - 240 + 20;
            this.container.addChild(riskText);
        }

        this.rowDetailText = new BitmapText(
            'Row(' + this.floors + ")", {
            align: "center",
            fontName: "lan",
            fontSize: 24,
            tint: 0xffffff
        });
        // this.rowDetailText.anchor.set(0.5);
        this.rowDetailText.x = 10;
        this.rowDetailText.y = this.height - 200;
        this.container.addChild(this.rowDetailText);

        for (i = 0; i < 9; i++) {
            let rowBtn = new Graphics;
            rowBtn.clear();
            rowBtn.beginFill(0x00ef98, 1);
            rowBtn.drawRoundedRect(10 + i * 50, this.height - 160, 40, 40, 5);
            rowBtn.endFill();
            rowBtn.eventMode = 'static';
            rowBtn.cursor = 'pointer';
            rowBtn.on('pointerdown', this.onClickRowBtn.bind(this, i));
            this.container.addChild(rowBtn);

            let rowText = new BitmapText(
                '' + (i + 8), {
                align: "center",
                fontName: "lan",
                fontSize: 24,
                tint: 0x000000
            });
            rowText.anchor.set(0.5);
            rowText.x = 10 + i * 50 + 20;
            rowText.y = this.height - 160 + 20;
            this.container.addChild(rowText);
        }
    }

    solveWay(){
        let serverResult;
        let i = 0;
        let j = 0;
        let randNum = Math.random() * 100;
        for(i = 0;i < Plinko.plinkoData[this.floors - 8].length;i++){
            let down = 0;
            let up = 0;
            for(j = 0;j < i;j++){
                down += Plinko.plinkoData[this.floors - 8][j].chance;
            }
            up = down + Plinko.plinkoData[this.floors - 8][i].chance;
            if(randNum > down && randNum <= up){
                serverResult = Plinko.plinkoData[this.floors - 8][i].val;
                this.payout = Plinko.plinkoData[this.floors - 8][i].payout[this.riskStr];
                break;
            }
        }
        // let serverResult = this.floorResults[this.floors - 8][Math.floor(Math.random() * this.floorResults[this.floors - 8].length)];
        let positiveSteps = 0;
        if (this.floors % 2 == 0) {
            positiveSteps = (serverResult * 2 + this.floors) / 2;
        } else {
            positiveSteps = (this.floors + serverResult * 2 + (serverResult < 0 ? 1 : -1)) / 2;
        }
        this.steps = [];// 清空所有步子
        let tempSteps = [];
        for (i = 0; i < positiveSteps; i++) {// 存放正数步子
            tempSteps.push(1);
        }
        for (i = 0; i < (this.floors - positiveSteps); i++) {// 存放负数步子
            tempSteps.push(-1);
        }
        for (i = 0; i < this.floors; i++) {// 乱序
            this.steps.push(tempSteps.splice(Math.floor(Math.random() * tempSteps.length), 1)[0]);
        }
        console.log("最终的步子：", this.steps, "；最终结果：", serverResult, positiveSteps);

        this.startTime = 0;
        this.startFlag = true;
    }

    startFallAni() {
        let i = Math.floor(this.startTime / 80);
        if (i >= this.steps.length) {
            this.startFlag = false;
            console.log("startFallAni");
            // this.records.addOneRecord("tempId" + Date.now, this.payout, this.payout, this.payout >= 1);
            return;
        }
        let pos = this.steps[i];
        let locX = 4;
        let j = 0;
        for (j = 0; j < i; j++) {
            locX += this.steps[j] * 30;
        }

        this.moveLine1.y = (i - 1) * 52;
        this.moveLine1.x = locX;
        this.moveLine1.alpha = 1;

        this.moveLine2.y = this.moveLine1.y + 30;
        this.moveLine2.x = locX;
        this.moveLine2.rotation = - pos * 45;
        this.moveLine2.alpha = 1;
    }
    onClickStartBtn() {
        if (this.startFlag) {
            console.error("正在游戏中。。。");
            return;
        }
        this.start();

        // // 3秒后再滚下一个，这样就可以多个同时滚动 /// 从12行开始用到了多个球，球之间碰撞可能会产生有误的结果，需要排查
        // setTimeout(()=>{
        //     this.start();
        // }, 3000);
        // // 5秒后再增加一个
        // setTimeout(()=>{
        //     this.start();
        // }, 5000);
        // // 7秒后再增加一个
        // setTimeout(()=>{
        //     this.start();
        // }, 7000);
        // // 9秒后再增加一个
        // setTimeout(()=>{
        //     this.start();
        // }, 9000);
    }
    
    onClickRecordBtn() {
        if (this.startFlag) {
            // console.error("正在游戏中。。。");
            // return;
            this.startFlag = false;
        }
        console.log("当前小球落点记录：", this.datas);
    }

    onClickRowBtn(id, e) {
        if (this.startFlag) {
            console.error("正在游戏中。。。");
            return;
        }
        this.floors = (id + 8);
        this.showGameUI(this.floors);
        this.rowDetailText.text = "Row(" + this.floors + ")";
    }
    onClickRiskBtn(keyStr, e) {
        if (this.startFlag) {
            console.error("正在游戏中。。。");
            return;
        }
        this.riskStr = keyStr;
        // this.riskDetailText.text = "Risk(" + this.riskStr + ")";
        // this.showPayOut();
        this.pp.changeRisk(keyStr);
    }

    changeRisk(riskStr){
        if(this.startFlag){
            console.error("正在游戏中。。。");
            return;
        }
        this.riskStr = riskStr;
        this.pp.changeRisk(riskStr);
    }
    changeRow(rowId){
        if(this.startFlag){
            console.error("正在游戏中。。。");
            return;
        }
        this.floors = rowId;
        this.showGameUI(this.floors);
    }

    getSettings(){
        let style = 0;
        if(this.riskStr == 'low'){
            style = 1;
        }else if(this.riskStr == 'medium'){
            style = 2;
        }else if(this.riskStr == 'high'){
            style = 3;
        }
        return {
            style: style,
            layer:this.floors,
        }
    }
}

// export { Plinko }

window.__GLSDK_SETUP__ && window.__GLSDK_SETUP__({ name: "plinko", version: "1.0.0" }, Plinko);
