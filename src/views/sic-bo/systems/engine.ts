import * as PIXI from 'pixi.js';
import { Sprite } from 'pixi.js';
import * as TWEEN from '@tweenjs/tween.js';
import { manifest } from "./config";
import EventBus from "@/utils/eventbus"

interface Reel {
    tickerFunction?: () => void;
    container: PIXI.Container;
    symbols: Sprite[];
    position: number;
    previousPosition: number;
}

let PixiApp: PIXI.Application;
const reels: Reel[] = [];
let timeouts = [];
const symbolHeight = 90; // 每个符号的高度是80
export default class PixiEngine {
    private tweens: TWEEN.Tween<any>[] = [];
    private isStart = false
    constructor(width: number, height: number) {
        this.init(width, height);
    }

    init = async (width: number, height: number) => {
        if (PixiApp) {
            PixiApp.destroy(true, { children: true, texture: true, baseTexture: true });
        }

        const screenScaleRito = window.innerWidth / 750;
        PixiApp = new PIXI.Application({ width, height, backgroundAlpha: 0,resolution: screenScaleRito * 2, });

        // 确保CSS尺寸是基于视口单位的，这样画布的视觉大小不会改变
        // PixiApp.view.style.width = `${width}px`;
        // PixiApp.view.style.height = `${height}px`;


        // 更新动画
        PixiApp.ticker.add(() => {
            TWEEN.update();
        });

        await this.loadResource();
        this.initSlotMachine([0, 2, 3]);

        EventBus.on("START", this.startGame)
        EventBus.on("STOP", this.stopGame)
        EventBus.on("DESTROY", this.destroy)

        EventBus.fire("LOAD_FINISH")
    };

    loadResource = async () => {
        await PIXI.Assets.init({ manifest });
        await PIXI.Assets.loadBundle('screen');
    };

    initSlotMachine(defaultPositions: number[]) {
        const sets = 3; // 列数
        for (let i = 0; i < defaultPositions.length; i++) {
            const reel = {
                container: new PIXI.Container(),
                symbols: [],
                position: 0,
                previousPosition: 0,
            };
            reel.container.x = i * (100);
            reel.container.y = - 5 * 80 + -20;
            PixiApp.stage.addChild(reel.container);

            for (let j = 0; j < 6 * sets; j++) {
                const symbolIndex = (j % 6) + 1; // 1-6
                const symbol = new PIXI.Sprite(PIXI.Texture.from('img' + symbolIndex));
                symbol.y = (j - sets) * symbolHeight;
                symbol.width = 80;
                symbol.height = 80;
                reel.symbols.push(symbol);
                reel.container.addChild(symbol);
            }

            const initialPosition = defaultPositions[i] - 6;
            reel.position = -initialPosition * symbolHeight;
            reel.previousPosition = reel.position;

            reel.symbols.forEach((symbol, index) => {
                symbol.y = ((reel.position + index * symbolHeight) % (reel.symbols.length * symbolHeight)) - symbolHeight;
            });

            reels.push(reel);
        }
    }


    start = () => {
        if(reels.length == 0) {return}
        if(this.isStart) { return}
        this.isStart = true
        // 开始老虎机动画，一个接一个地启动
        reels.forEach((reel, index) => {
            // 设置每个轮子的基本滚动速度
            const speed = 15; // 可以根据需要调整这个速度
            if (reel.tickerFunction) {
                PixiApp.ticker.remove(reel.tickerFunction);
                reel.tickerFunction = null;
            }
            // 创建一个动画函数，它会在每个ticker回调时被调用
            const animateReel = () => {
                // 更新轮子的位置
                reel.position += speed;
                reel.position %= reel.symbols.length * symbolHeight; // 确保位置是循环的

                // 更新每个符号的位置
                reel.symbols.forEach((symbol, i) => {
                    symbol.y = ((reel.position + i * symbolHeight) % (reel.symbols.length * symbolHeight)) - symbolHeight;
                });
            };

            // 使用setTimeout来延迟每个轮子动画的开始时间
            const timeout = setTimeout(() => {
                // 将动画函数添加到Pixi的ticker中
                PixiApp.ticker.add(animateReel);

                // 保存ticker引用，以便稍后可以移除
                reel.tickerFunction = animateReel;
            }, index * 1000); // 每个轮子之间间隔1秒

            timeouts.push(timeout);
        });
    }

    stopGame = (data)=>{
        this.isStart = false
        this.stop(data?.detail)
    }

    startGame = ()=>{
        this.start()
    }

    stop(resultIndex: number[]) {
        const extraRounds = 2; // 额外转的圈数
        const baseDelay = 500; // 基础延迟时间
        const additionalDelayPerReel = 1000; // 每个轮子的额外延迟时间

    
        reels.forEach((reel, index) => {
            setTimeout(() => {
                if (reel.tickerFunction) {
                    PixiApp.ticker.remove(reel.tickerFunction);
                    reel.tickerFunction = null;
                }
                // 确定目标symbol的索引，并计算它在轮子中的绝对位置
                // debugger
                let targetSymbolIndex = resultIndex[index] - 1;
  
                const fullCircle = reel.symbols.length * symbolHeight; // 一个完整轮回的距离，除以3是因为实际上每组symbols被复制了3次
                let targetPosition = targetSymbolIndex * symbolHeight + symbolHeight * 2; // 目标位置加上顶部额外的2个symbol的高度，以使目标symbol居中
    
                // 调整目标位置，考虑额外的圈数和当前位置
                targetPosition += extraRounds * fullCircle; // 添加额外圈数
                let offset = reel.position % fullCircle; // 当前位置在一个完整轮回中的偏移
                targetPosition -= offset; // 调整目标位置，考虑当前偏移

                if(targetSymbolIndex < 3){
                    let target = 6-resultIndex[index]
                    targetPosition += Math.abs(resultIndex[index] - target) * symbolHeight
                }else if (targetSymbolIndex <5) {
                    let target = 6-resultIndex[index]
                    targetPosition -= Math.abs(resultIndex[index] - target) * symbolHeight
                }
    
                // 创建Tween动画，平滑地移动到目标位置
                const tween = new TWEEN.Tween(reel)
                    .to({ position: reel.position + targetPosition }, 3000 + index * additionalDelayPerReel)
                    .easing(TWEEN.Easing.Cubic.Out)
                    .onUpdate(() => {
                        // 更新每个symbol的位置
                        reel.position %= (reel.symbols.length * symbolHeight); // 保持position的值在合理范围
                        reel.symbols.forEach((symbol, i) => {
                            symbol.y = ((reel.position + i * symbolHeight) % (reel.symbols.length * symbolHeight)) - symbolHeight;
                        });
                    })
                    .start();
    
                this.tweens.push(tween);
            }, baseDelay + index * additionalDelayPerReel);
        });
    }
    



    destroy = () => {
        EventBus.off("START", this.startGame)
        EventBus.off("STOP", this.stopGame)
        EventBus.off("DESTROY", this.destroy)

        timeouts.forEach(clearTimeout);
        timeouts = [];
        // 停止并移除所有缓动动画
        this.tweens.forEach(tween => {
            tween.stop();
            TWEEN.remove(tween);
        });
        this.tweens = []; // 清空缓动动画数组
        // 销毁所有轮子及其符号
        reels.forEach(reel => {
            // 如果有活跃的ticker函数，移除它
            if (reel.tickerFunction) {
                PixiApp.ticker.remove(reel.tickerFunction);
            }

            // 销毁轮子中的所有符号
            reel.symbols.forEach(symbol => {
                symbol.destroy();
            });

            // 销毁容器本身
            reel.container.destroy();
        });

        // 清空轮子数组
        reels.length = 0;
        PIXI.Assets.reset();

        // 如果需要，销毁PIXI应用程序
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