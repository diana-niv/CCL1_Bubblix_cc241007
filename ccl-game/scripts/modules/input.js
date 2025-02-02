import { global } from "./global.js";
import { Hint } from "../gameObjects/hint.js";

function move(event) {

    if(!global.playerIsFrozen) {
        switch(event.key) {
            case "d":
                if (global.playerObject.xVelocity == 0) {
                    global.playerObject.switchCurrentSprites(0, 4);
                    global.playerObject.xVelocity = 290;
                    global.playerObject.yVelocity = 0;
                }
                break;
            case "a":
                if (global.playerObject.xVelocity == 0) {
                    global.playerObject.switchCurrentSprites(5, 9);
                    global.playerObject.xVelocity = -290;
                    global.playerObject.yVelocity = 0;
                }
                break;
           case "w":
            if (global.playerObject.yVelocity == 0) {
                global.playerObject.switchCurrentSprites(10, 13);
                global.playerObject.xVelocity = 0;
                global.playerObject.yVelocity = -290;
            }
                break;
            case "s":
                if (global.playerObject.yVelocity == 0) {
                    global.playerObject.switchCurrentSprites(0, 4);
                    global.playerObject.xVelocity = 0;
                    global.playerObject.yVelocity = 290;
                }
                break;
        }
    }
}

function stop() {

    global.playerObject.xVelocity = 0;
    global.playerObject.yVelocity = 0;
    global.playerObject.switchCurrentSprites(0, 0);
}

document.addEventListener("keypress", move);

document.addEventListener("keyup", stop);

document.addEventListener('keydown', function (event) {
    if (event.key === 'e' || event.key === 'E') {
        global.hintIsShown = false;
        global.playerIsFrozen = false;
    }
    
    if (event.key === 'q' || event.key === 'Q') {
        new Hint(global.currentHint.x, global.currentHint.y, global.currentHint.width, global.currentHint.height, global.currentHint.text);
        global.hintIsShown = true;
        global.playerIsFrozen = true;
    } 
});

