import { global } from "./global.js";
import { Wizard } from "../gameObjects/wizard.js";
import {Bookcase} from "../gameObjects/bookcase.js";
import { Carpet } from "../gameObjects/carpet.js";
import { GreenTable } from "../gameObjects/table-green.js";
import { PurpleTable } from "../gameObjects/table-purple.js";
import { Drawer } from "../gameObjects/drawer.js";
import { MoveTriggerHorizontal } from "../gameObjects/moveTriggerHorizontal.js";
import { Hint } from "../gameObjects/hint.js";
import { Cauldron } from "../gameObjects/cauldron.js";


document.fonts.ready.then(function () {
        console.log('Font is ready to use!');
        // Now the font is fully loaded and ready to use in the game
    });

    function startTimer(duration, display) {
        let timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
     
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
     
            display.textContent = "Time left: " + minutes + ":" + seconds;
     
           
            if (--timer < 0) {
                timer = 0;
                window.location.href = "lose.html";
            }
        }, 1000);
    }

    

function gameLoop(totalRunningTime) { 
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Completely clear the canvas for the next graphical output 
    
    for (var i = 0; i < global.allGameObjects.length; i++) { //loop in the (game)loop -> the gameloop is continous anyways.. and on every cylce we do now loop through all objects to execute several operations (functions) on each of them: update, draw, collision detection, ...
        if (global.allGameObjects[i].active == true && !global.allGameObjects[i].isDrawn) {
            global.allGameObjects[i].storePositionOfPreviousFrame();
            global.allGameObjects[i].update();
            global.checkCollisionWithAnyOther(global.allGameObjects[i]);
            
            global.allGameObjects[i].draw();
        }
        else if(global.allGameObjects[i].isDrawn) {
            global.allGameObjects[i].update();
        }
    }

    if (global.gameOver) {
        window.location.href = "win.html";
        return;
    }

    
    requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
}

function setupGame() {

    new PurpleTable(750+800+100, 1788/6-412/3+25, 693/3, 412/3);
    new GreenTable(70+5, 70, 691/3, 414/3);
    new Drawer(245+150+100, 70+10, 753/6, 756/6);
    new Carpet(70, 300-30, 1293/2.5, 960/2.5);
    new Bookcase(600+800+10, 15+10, 879/6, 1788/6);
    new Cauldron(540+350, 300, 308/1.2, 417/1.2);

    global.hintIsShown = true;
    new Hint(540-200, 460, 850, 500, "Shadowleaf: To begin this spell, you need the shade, a drop of dark that’s softly laid. It grows in shadows, cold as night, a deadly bloom, both black and bright. Seek where secrets quietly rest, in drawers of wood, beneath the chest. (Press 'E' in order to close the hint and press 'C' if you want to collect the ingredient)");

    global.leftMoveTrigger = new MoveTriggerHorizontal(100, 100, 20, 900, 100);
    global.rightMoveTrigger = new MoveTriggerHorizontal(1500, 100, 20, 900, -100);
    global.playerObject = new Wizard(240, 300, (6144/10)/4.5, 688/4.5);
                
                const timerDisplay = document.querySelector('#timerDisplay');
                startTimer(180, timerDisplay);
                
    const instructionsContainer = document.querySelector('#instructionsContainer');
    
    instructionsContainer.addEventListener('click', () => {
        instructionsContainer.classList.add('hidden');
    });

    instructionsButton.addEventListener('click', () => {
        instructionsContainer.classList.remove('hidden');
    });
}



setupGame();
requestAnimationFrame(gameLoop);



