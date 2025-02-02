import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Cauldron extends BaseGameObject {
    name = "Cauldron";
    

    reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "Wizard") {
        
            collidingObject.x = collidingObject.previousX;
            collidingObject.y = collidingObject.previousY;
            global.hintIsShown = true;
            }
        }

    

    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet("./images/cauldron-animation.png", 5, 1);
        this.animationData.timePerSprite = 0.79999999;
        this.switchCurrentSprites(0, 4);
    }
}

export {Cauldron};