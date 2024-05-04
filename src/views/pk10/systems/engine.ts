import * as PIXI from 'pixi.js';
import { Sprite } from 'pixi.js';
//  TilingSprite
import * as TWEEN from '@tweenjs/tween.js';
import { manifest } from "./config";
import EventBus from "@/utils/eventbus"

export enum StateEnum {
    Init = '待机',
    Race = '比赛中',
    Ending = '结束中',
    End = '已完成'
}

let PixiApp: PIXI.Application;

//初始化汽车
const carSpacing = 10; // 汽车之间的间隔
const marginVertical = 50; // 赛道上下留出的背景高度

export default class PixiEngine {
    private tweens: TWEEN.Tween<any>[] = [];
    private cars: Sprite[] = [];
    private flames: Sprite[] = [];
    private finishLine: PIXI.Sprite;
    private beginLine: PIXI.TilingSprite;
    private isShip: Boolean;
    private backgroundContainer: PIXI.Container;
    public static  gameState: StateEnum = StateEnum.Init;


    constructor(width: number, height: number, isShip) {
        this.isShip = isShip
        this.init(width, height);

    }

    init = async (width: number, height: number) => {
        if (PixiApp) {
            PixiApp.destroy(true, { children: true, texture: true, baseTexture: true });
        }
        PixiApp = new PIXI.Application({ width, height, backgroundAlpha: 0 });

        // 更新动画
        PixiApp.ticker.add(() => {
            TWEEN.update();
        });
        EventBus.on("DESTROY", this.destroy)
        EventBus.on("START", this.startRace)
        EventBus.on("END", this.finishRace)
        EventBus.on("RESET", this.resetCars)

        await this.loadResource();
        this.initScene()
        // setTimeout(() => {
        //     this.startRace()
        // }, 1000)
        EventBus.fire("LOAD_FINISH")

    };
    finishRace = (data) => {
        PixiEngine.gameState = StateEnum.Ending
        this.endRace(data?.detail)
    }

    loadResource = async () => {
        await PIXI.Assets.init({ manifest });
        if (this.isShip) {
            await PIXI.Assets.loadBundle('ship');
        } else {
            await PIXI.Assets.loadBundle('pk10');
        }
    };

    initScene = () => {
        this.initBackgrounds()

        // 初始化终点线
        const finishLineTexture = PIXI.Texture.from('finishLine');
        this.finishLine = new PIXI.Sprite(finishLineTexture);
        this.finishLine.anchor.set(0.5);
        this.finishLine.scale.set(0.5); // 根据需要调整缩放
        this.finishLine.rotation = - Math.PI / 2
        this.finishLine.position.set(-this.finishLine.width, PixiApp.screen.height / 2); // 初始位置在屏幕外
        this.finishLine.visible = false; // 初始不可见
        PixiApp.stage.addChild(this.finishLine as any);

        const beginLineTexture = PIXI.Texture.from('beginLine');
        this.beginLine = new PIXI.TilingSprite(beginLineTexture, beginLineTexture.width / 2, PixiApp.screen.height - PIXI.Texture.from('topbg').height);
        this.beginLine.anchor.set(0.5);
        // this.beginLine.scale.set(0.5); // 根据需要调整缩放
        // this.beginLine.rotation =- Math.PI/2
        PixiApp.stage.addChild(this.beginLine as any);

        // this.background.anchor.set(0)

        const availableHeight = PixiApp.screen.height - marginVertical * 2; // 可用于赛道的高度
        const trackHeight = (availableHeight - carSpacing * (10 - 1)) / 10; // 每条赛道的高度
        for (let i = 0; i < 10; i++) {
            const car = new PIXI.Sprite(PIXI.Texture.from('car' + (i + 1)));
            const flame = new PIXI.Sprite(PIXI.Texture.from('flame'));
            // flame.anchor.set(0.5);
            // flame.scale.set(0.5);
            flame.position.set(car.width / 2, -car.height / 4);
            flame.visible = false;

            const style = new PIXI.TextStyle({
                fill: '#ffffff',
                fontWeight: 'bold',
                wordWrap: true,
                wordWrapWidth: 440,
            });

            const skewText = new PIXI.Text(i+1,style);
            skewText.x = -20
            skewText.y = -15
            car.addChild(flame)
            car.addChild(skewText)
            this.flames.push(flame);

            car.anchor.set(0.5);
            car.scale.set(0.5); // 缩放小车宽高为原来的一半

            // 计算每辆车的y位置，使得它们之间有间隔，并且赛道上下有背景
            const carPositionY = marginVertical + i * (trackHeight + carSpacing) + trackHeight / 2;
            car.position.set(PixiApp.screen.width - car.width, carPositionY); // 将汽车放在右侧起点
            this.cars.push(car);
            PixiApp.stage.addChild(car);
        }

        this.beginLine.position.set(PixiApp.screen.width - this.cars[0].width - beginLineTexture.width / 4, PixiApp.screen.height / 2);
    };

    // 初始化背景并添加到舞台
    initBackgrounds = () => {
        this.backgroundContainer = new PIXI.Container();
        if (this.isShip) {
            const shipbg1 = new PIXI.Sprite(PIXI.Texture.from('shipbg1'));
            shipbg1.position.set(0, 0);
            shipbg1.width = PixiApp.screen.width
            shipbg1.height = PixiApp.screen.height

            // shipbg1.scale.set(0.5, 0.5);
            const shipbg2 = this.initializeBackground('shipbg2', PixiApp.screen.width, PixiApp.screen.height, 0, 0, 1, 1);
            this.backgroundContainer.addChild(shipbg1);
            this.backgroundContainer.addChild(shipbg2);
        }

        const bg1 = this.initializeBackground('topbg', PixiApp.screen.width * 2, PIXI.Texture.from('topbg').height, 0, 0, 0.5, 0.5);
        const bg2 = this.initializeBackground('bottombg', PixiApp.screen.width * 2, PIXI.Texture.from('bottombg').height, 0, PixiApp.screen.height - PIXI.Texture.from('bottombg').height / 2, 0.5, 0.5);
        // 将所有背景层添加到容器中
        this.backgroundContainer.addChild(bg1);
        this.backgroundContainer.addChild(bg2);

        // 最后，将背景容器添加到PixiJS的场景中
        PixiApp.stage.addChild(this.backgroundContainer);
    }
    // 创建一个函数来初始化背景
    initializeBackground = (textureName, width, height, posX, posY, scaleX, scaleY) => {
        const texture = PIXI.Texture.from(textureName);
        const tilingSprite = new PIXI.TilingSprite(texture, width, height);
        tilingSprite.position.set(posX, posY);
        tilingSprite.scale.set(scaleX, scaleY);
        return tilingSprite;
    };
    resetCars = () => {
        // 停止并清理所有的缓动动画
        this.tweens.forEach(tween => {
            tween.stop();
            TWEEN.remove(tween);
        });
        this.tweens = [];

        const availableHeight = PixiApp.screen.height - marginVertical * 2; // 可用于赛道的高度
        const trackHeight = (availableHeight - carSpacing * (10 - 1)) / 10; // 每条赛道的高度
        // 遍历所有的车辆，将它们重置到起点位置
        this.cars.forEach((car, index) => {
            const carPositionY = marginVertical + index * (trackHeight + carSpacing) + trackHeight / 2;
            car.position.set(PixiApp.screen.width - car.width, carPositionY); // 将汽车放在右侧起点
            // 隐藏火焰效果，如果有的话
            if (this.flames[index]) {
                this.flames[index].visible = false;
            }
        });
        this.finishLine.position.set(-this.finishLine.width, PixiApp.screen.height / 2); // 初始位置在屏幕外
        this.finishLine.visible = false; // 初始不可见
        this.beginLine.position.set(PixiApp.screen.width - this.cars[0].width - this.beginLine.width / 4, PixiApp.screen.height / 2);
        PixiEngine.gameState = StateEnum.Init
    };


    startRace = () => {
        PixiEngine.gameState = StateEnum.Race
        // 创建缓动动画，从左到右移动终点线
        new TWEEN.Tween(this.beginLine.position)
            .to({ x: PixiApp.screen.width + this.beginLine.width }, 400) // 假设动画持续时间为1000毫秒
            .easing(TWEEN.Easing.Quadratic.Out) // 设置缓动类型，例如二次方的缓出
            .onComplete(() => {
                // 动画完成后的回调函数（如果需要）
            })
            .start();


        // // 背景循环滚动
        PixiApp.ticker.add(this.bgMove);

        // 定义左右最大位置
        const maxLeftPosition = PixiApp.screen.width * 0.3; // 最左边界
        const maxRightPosition = PixiApp.screen.width * 0.9; // 最右边界

        const startCarAnimation = (car, index) => {
            let previousX = car.position.x; // 初始化前一个位置
            const flame = this.flames[index]; // 假设每辆车都有一个火焰效果对象

            // 定义动画的逻辑
            const animateCar = () => {
                const randomTargetX = maxLeftPosition + Math.random() * (maxRightPosition - maxLeftPosition);
                const randomDuration = 2000 + Math.random() * 3000; // 随机动画持续时间

                const tween = new TWEEN.Tween(car.position)
                    .to({ x: randomTargetX }, randomDuration)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .onStart(() => {
                        if (!this.isShip) {
                            flame.visible = true; // 默认显示火焰
                        }
                    })
                    .onUpdate(() => {
                        // 如果汽车向右移动（当前位置大于前一个位置），隐藏火焰
                        if (!this.isShip) {
                            flame.visible = car.position.x <= previousX;
                        }
                        previousX = car.position.x; // 更新前一个位置

                        // 确保不会超出左右最大位置
                        car.position.x = Math.max(maxLeftPosition, Math.min(car.position.x, maxRightPosition));
                    })
                    .onComplete(() => {
                        const tweenIndex = this.tweens.indexOf(tween);
                        if (tweenIndex > -1) {
                            this.tweens.splice(tweenIndex, 1);
                        }
                        startCarAnimation(car, index); // 动画完成后重新开始
                    })
                    .start();

                this.tweens.push(tween);
            };

            animateCar(); // 启动动画
        };

        // 对每辆车执行动画
        this.cars.forEach(startCarAnimation);
    };

    bgMove = () => {
        this.backgroundContainer.children.forEach(child => {
            if (child instanceof PIXI.TilingSprite) {
                child.tilePosition.x += 18; // 对每个 TilingSprite 子元素调整 tilePosition.x
            }
        });
    }

    // 控制每辆车前后到达的顺序
    endRace = (finishOrder: number[]) => {
        // 停止背景滚动
        PixiApp.ticker.remove(this.bgMove);

        // 停止所有缓动动画
        this.tweens.forEach(tween => {
            tween.stop();
            TWEEN.remove(tween);
        });
        this.tweens = [];

        // 计算终点位置
        const finishLineX = - this.cars[0].width;
        //  - this.cars[0].width;


        this.finishLine.visible = true;

        // 创建缓动动画，从左到右移动终点线
        new TWEEN.Tween(this.finishLine.position)
            .to({ x: 15 }, 500) // 假设动画持续时间为1000毫秒
            .easing(TWEEN.Easing.Quadratic.Out) // 设置缓动类型，例如二次方的缓出
            .onComplete(() => {
                // 动画完成后的回调函数（如果需要）
            })
            .start();

        // 确定汽车冲出屏幕的目标位置
        PixiApp.screen.width + Math.max(...this.cars.map(car => car.width));


        // 创建新的缓动动画，根据传入的顺序数组来设置每辆车到达终点的时间
        finishOrder.forEach((lane, order) => {
            const car = this.cars[lane - 1];
            const flame = this.flames[lane - 1];
            const duration = 300 + order * 100; // 根据顺序增加时间，确保按照指定顺序到达
            const tween = new TWEEN.Tween(car.position)
                .to({ x: finishLineX }, duration + 300)
                .easing(TWEEN.Easing.Linear.None)
                .onComplete(() => {
                    flame.visible = false;

                    // 添加继续前进的动画
                    // const continueMovingTween = new TWEEN.Tween(car.position)
                    //     .to({ x: - this.cars[0].width}, 500) // 继续前进100像素, 持续时间1000毫秒
                    //     .start();

                    // this.tweens.push(continueMovingTween);


                    if (order === finishOrder.length - 1) {
                        // 最后一辆车到达终点后，重置所有车辆到起点
                        this.finishLine.visible = false
                        PixiEngine.gameState = StateEnum.End
                        EventBus.fire("LAST_OVER")
                    }
                })
                .start();

            this.tweens.push(tween);
        });
    };

    destroy = () => {
        PixiEngine.gameState = StateEnum.Init
        // 停止并移除所有缓动动画
        this.tweens.forEach(tween => {
            tween.stop();
            TWEEN.remove(tween);
        });
        this.tweens = []; // 清空缓动动画数组

        // 移除事件监听器
        EventBus.off("DESTROY", this.destroy);
        EventBus.off("START", this.startRace);
        EventBus.off("END", this.finishRace);
        EventBus.off("RESET", this.resetCars);
        PixiApp.ticker.remove(this.bgMove);

        // 清理所有的精灵和容器
        this.cars.forEach(car => {
            if (car.parent) {
                car.parent.removeChild(car); // 从其父容器中移除该车
            }
            car.destroy({ children: true, texture: false, baseTexture: false }); // 销毁车辆及其子对象，但保留纹理和基础纹理
        });
        this.cars = [];

        // if(this.flames?.length){
        //     this.flames.forEach(flame => {
        //         if (flame.parent) {
        //             flame.parent.removeChild(flame);
        //         }
        //         flame.destroy();
        //     });
        //     this.flames = [];
        // }

        if (this.finishLine.parent) {
            this.finishLine.parent.removeChild(this.finishLine);
        }
        this.finishLine.destroy();

        if (this.beginLine.parent) {
            this.beginLine.parent.removeChild(this.beginLine);
        }
        this.beginLine.destroy();

        if (this.backgroundContainer.parent) {
            this.backgroundContainer.parent.removeChild(this.backgroundContainer);
        }
        this.backgroundContainer.destroy({ children: true });
        PIXI.Assets.reset();
        // 销毁PIXI应用程序
        if (PixiApp) {
            PixiApp.destroy(true, {
                children: true, // 同时销毁子元素
                texture: true, // 销毁纹理
                baseTexture: true, // 销毁基础纹理
            });
            PixiApp = null; // 清除对应用程序的引用
        }
    }

    getCanvas() {
        return PixiApp.view;
    }
}