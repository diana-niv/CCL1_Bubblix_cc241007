const global = {};

global.canvas = document.querySelector("#canvas");
global.ctx = canvas.getContext("2d");
global.prevTotalRunningTime = 0;
global.deltaTime = 0;
global.allGameObjects = [];
global.playerObject = {};
global.backgroundShift = 0;
global.backgroundMaxShift = -600;
global.leftMoveTrigger;
global.rightMoveTrigger;
global.topMoveTrigger;
global.bottomMoveTrigger;
global.hintIsShown = false;
global.currentHint;
global.score = 0;
global.maxScore = 5;
global.gameOver = false;
global.playerIsFrozen = false;
global.ingrArr;
global.pointGotten = false;

global.getCanvasBounds = function () {
    let bounds =  {
        "left": 0,
        "right": this.canvas.width,
        "top": 0, 
        "bottom": this.canvas.height
    }

    return bounds;
}

global.displayCollectedIngr = function(score, display) {
    score = global.score;
    display.textContent = "Collected ingredients: " + score + "/" + global.maxScore;
}


global.checkCollisionWithAnyOther = function (givenObject) {
    for (let i = 0; i < global.allGameObjects.length; i++) {
        let otherObject = global.allGameObjects[i];
        if (otherObject.active == true) {
            let collisionHappened = this.detectBoxCollision(givenObject, otherObject);
            if (collisionHappened) {
                givenObject.reactToCollision(otherObject);
                otherObject.reactToCollision(givenObject);
            }
        }
    }
}

global.detectBoxCollision = function (gameObject1, gameObject2) {
    let box1 = gameObject1.getBoxBounds();
    let box2 = gameObject2.getBoxBounds();
    if (gameObject1 != gameObject2) {
        if (box1.top <= box2.bottom && 
            box1.left <= box2.right && 
            box1.bottom >= box2.top &&
            box1.right >= box2.left)
        {
            return true;
        }
    }
    return false;

    
}

global.ingrArr = [
    {name: "Start", hint: "Shadowleaf: To begin this spell, you need the shade, a drop of dark that’s softly laid. It grows in shadows, cold as night, a deadly bloom, both black and bright. Seek where secrets quietly rest, in drawers of wood, beneath the chest. (Press 'E' in order to close the hint and press 'C' if you want to collect the ingredient)", collected: true},

    {name: "Drawer", hint: "Good job! You found Shaowleaf! Ghostfeather: The next you seek comes from the sky, but not by day when light is high. A feathered friend with cries so low, plucked from the wing of a phantom crow. Look to the place where potions gleam, in twilight's purple, as in a dream.(Press 'E' in order to close the hint and press 'C' if you want to collect Shadowlief)", collected: false},

    {name: "PurpleTable", hint: "Good job! You found Ghostfeather! Snakesbite: To silence words with deadly grace, you’ll need the bite that leaves no trace. A serpent’s fang, with venom strong, to twist the tongue and still the song. Where nature’s green light softly glows, there the poison’s secret flows. (Press 'E' in order to close the hint and press 'C' if you want to collect Ghostfeather)", collected: false},

    {name: "GreenTable", hint: "Good job! You found Snakesbite! Whisperroot: One more piece to seal the spell, a root that knows the silence well. It grows where ancient pages lie, and wisdom whispers from the sky. Seek the shelf where knowledge hides, between the books, the answer bides. (Press 'E' in order to close the hint and press 'C' if you want to collect Snakesbite)", collected: false},

    {name: "Bookcase", hint: "Good job! You found Whisperroot! Grave Dust: The final touch for whispers lost, is dust reclaimed at heavy cost. From tombs long buried, stone and gloom, the powder of forgotten doom. Seek where flames and magic blend, in the cauldron’s depths, your quest will end. (Press 'E' in order to close the hint and press 'C' if you want to collect Whisperroot)", collected: false},

    {name: "Cauldron", hint: "Good job! Grave Dust is hidden here. (Press 'C' if you want to collect the ingredient)", collected: false}
]

export { global }