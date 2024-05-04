class AudioManager {
    sounds
    constructor() {
        this.sounds = {};
    }

    preloadSound(name, src) {
        this.sounds[name] = new Audio(src);
        this.sounds[name].preload = 'auto';
        this.sounds[name].volume = 0.5;
    }

    playSound(name) {
        if (this.sounds[name]?.paused) {
            this.sounds[name].play();
        } else {
            let newSound = new Audio(this.sounds[name].src);
            newSound.play();
        }
    }

    playOnceSound(name) {
        this.sounds[name].currentTime = 0;
        this.sounds[name].play();
    }

    loopSound(name) {
        this.sounds[name].loop = true;
        this.sounds[name].play();
    }

    stopSound(name) {
        this.sounds[name].pause();
        this.sounds[name].currentTime = 0;
    }
}

export default new AudioManager();