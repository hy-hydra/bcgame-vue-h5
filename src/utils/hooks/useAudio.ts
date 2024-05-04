export default (src: string) => {
  const __init = {
    src: new Audio(src),
    playing: false
  };

  const signPlay = () => {
    __init.src.play();
  };
  const singlePlay = () => {
    if (!__init.playing) {
      __init.src.play();
      __init.playing = true;
    }
  };
  const loopPlay = () => {
    __init.src.loop = true;
    singlePlay();
  };
  const stop = () => {
    __init.src.pause();
    __init.playing = false;
  };
  const pause = () => {
    stop();
    __init.src.currentTime = 0;
  };

  const __switchState = () => {
    if (document.visibilityState === "hidden") {
      stop();
    } else {
      singlePlay();
    }
  };

  const addSwitchState = () => {
    document.addEventListener("visibilitychange", __switchState);
  };

  const removeSwitchState = () => {
    pause();
    document.removeEventListener("visibilitychange", __switchState);
  };

  return {
    signPlay,
    singlePlay,
    loopPlay,
    pause,
    stop,
    addSwitchState,
    removeSwitchState
  };
};
