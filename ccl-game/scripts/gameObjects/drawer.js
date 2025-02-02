import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";
import { Hint } from "./hint.js";

class Drawer extends BaseGameObject {
    name = "Drawer"
    pointGotten = false;

    reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "Wizard") {
            
            collidingObject.x = collidingObject.previousX;
            collidingObject.y = collidingObject.previousY;
            global.hintIsShown = true;
            global.playerIsFrozen = true;

            }
        }

    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/drawer.png"]);
    }
}

export {Drawer};