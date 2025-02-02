import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Carpet extends BaseGameObject {
    name = "Carpet";

    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/carpet.png"]);
    }
}

export {Carpet};