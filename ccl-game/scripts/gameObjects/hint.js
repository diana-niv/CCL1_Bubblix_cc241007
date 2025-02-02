import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Hint extends BaseGameObject {
    active = true;
    isDrawn = true;
    hasBeenRevealed = false;
    constructor(x, y, width, height, text) {
        super(x, y, width, height, text);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text; 
        global.allGameObjects.push(this);
    }

    destroy() {
        const index = global.allGameObjects.indexOf(this);
        if (index > -1) {
            global.allGameObjects.splice(index, 1); 
        }
    }

    update = function() {
        if(global.hintIsShown) {
            global.ctx.fillStyle = "#ffffff";
            global.ctx.fillRect(this.x, this.y, this.width, this.height);
            global.ctx.font = "27px Jersey10-regular";

            this.drawWrappedText(this.text, this.x + 35, this.y + 35, this.width - 40, 30);

        }
        else this.destroy();
    }

    drawWrappedText = function(text, x, y, maxWidth, lineHeight) {
        let words = text.split(' ');
        let line = '';
        let lines = [];
        let testLine, testWidth;

        // Measure and wrap lines based on the hint box's max width
        for (let i = 0; i < words.length; i++) {
            testLine = line + words[i] + ' ';
            testWidth = global.ctx.measureText(testLine).width;
            if (testWidth > maxWidth && i > 0) {
                lines.push(line);  // Save the line if it's too long
                line = words[i] + ' ';  // Start a new line
            } else {
                line = testLine;
            }
        }
        lines.push(line);  // Add the last line

        // Draw each line of text within the hint box
        global.ctx.fillStyle = "#000000";  // Text color
        global.ctx.font = "27px 'Jersey 10'";  // Font settings
        global.ctx.textAlign = "left";  // Align text to the left

        for (let i = 0; i < lines.length; i++) {
            global.ctx.fillText(lines[i], x, y + (i * lineHeight));  // Draw each line with proper vertical spacing
        }
    }
}

export {Hint};