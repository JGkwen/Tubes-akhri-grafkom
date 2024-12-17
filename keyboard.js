export default class KeyboardHelper {
    constructor(scene) {
        this.keys = {}
        document.body.addEventListener('keydown', (ev)=> this.keydown(ev));
        document.body.addEventListener('keyup', (ev)=> this.keyup(ev));
    }
    keydown(ev) {
        this.keys[ev.key] = true;
    }
    keyup(ev) {
        this.keys[ev.key] = false;
    }
}