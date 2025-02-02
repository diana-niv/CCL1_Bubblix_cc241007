import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";
import { Hint } from "./hint.js";

class Wizard extends BaseGameObject {
    name = "Wizard";
    xVelocity = 0;
    yVelocity = 0;

    update = function() {
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
        this.screenWrap();
    }

    
    screenWrap = function () {
        let canvasBounds = global.getCanvasBounds();
        let wizardBounds = this.getBoxBounds();
    
        /*
         * : The collisions for horizontal (x) and vertical (y) directions 
         * are handled independently. This ensures that corner cases (where both x and y bounds are exceeded) are resolved smoothly.
         */
        // Horizontal collision
        if (wizardBounds.right >= canvasBounds.right) {
            this.x = canvasBounds.right - this.width;
            this.xVelocity = 0;
        } else if (wizardBounds.left <= canvasBounds.left) {
            this.x = canvasBounds.left;
            this.xVelocity = 0;
        }
    
        // Vertical collision
        if (wizardBounds.top <= canvasBounds.top) {
            this.y = canvasBounds.top;
            this.yVelocity = 0;
        } else if (wizardBounds.bottom >= canvasBounds.bottom) {
            this.y = canvasBounds.bottom - this.height;
            this.yVelocity = 0;
        }
    };


    reactToCollision = function (collidingObject)   {
        let hintObj = global.ingrArr.find(item => item.name === collidingObject.name);

        if (hintObj && !hintObj.collected) {
            global.currentHint = {
                x: 540,
                y: 460,
                width: 850,
                height: 500,
                text: hintObj.hint,
                objectName: collidingObject.name
            };
            
            new Hint(global.currentHint.x, global.currentHint.y, global.currentHint.width, global.currentHint.height, global.currentHint.text);
            global.hintIsShown = true;
            global.playerIsFrozen = true;
            
            const handleKeyPress = function(event) {
                if (event.key === 'c' || event.key === 'C') {
                    const currentHintObj = global.ingrArr.find(item => item.name === collidingObject.name);
                    
                    if (currentHintObj && !currentHintObj.collected) {
                        currentHintObj.collected = true;
                        global.score++;
                        const ingrDisplay = document.querySelector('#collectedDisplay');
                        global.displayCollectedIngr(global.score, ingrDisplay);
                        console.log("Collected:", currentHintObj.name, "Score:", global.score);
                        global.hintIsShown = false;
                        global.currentHint = null;

                        if (global.score >= global.maxScore) {
                            global.gameOver = true;
                        }
                        document.removeEventListener('keydown', handleKeyPress);
                    }
                }
            };
            
            document.addEventListener('keydown', handleKeyPress);
        }
    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet("./images/sprite_wizard.png", 14, 1);
    }
}

export {Wizard};