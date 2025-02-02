import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Bookcase extends BaseGameObject {
    name = "Bookcase";
    
    reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "Wizard") {
            // console.log(global.score);
            collidingObject.x = collidingObject.previousX;
            collidingObject.y = collidingObject.previousY;
            global.hintIsShown = true;
            global.playerIsFrozen = true;

            }
        }

    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/bookcase.png"]);
    }
}

export {Bookcase};