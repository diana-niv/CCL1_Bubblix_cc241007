import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";
import { Hint } from "./hint.js";

class GreenTable extends BaseGameObject {
    name = "GreenTable";
    


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
        this.loadImages(["./images/table2.png"]);
    }
}
export {GreenTable};