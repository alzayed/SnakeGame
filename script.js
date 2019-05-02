const GAMEBOARD_X = 0;
const GAMEBOARD_Y = 0;
const GAMEBOARD_WIDTH = 800;
const GAMEBOARD_HEIGHT = 500;
const DASHBOARD_X = GAMEBOARD_X + GAMEBOARD_WIDTH;
const DASHBOARD_Y = GAMEBOARD_Y + GAMEBOARD_WIDTH;
const DASHBOARD_WIDTH = 200;
const DASHBOARD_HEIGHT = 800;
const GAMEBOARD_BG_COLOR = 'cadetblue';
const DASHBOARD_BG_COLOR = 'green';
const CANVAS = document.getElementById("canvas");
const CTX = CANVAS.getContext("2d");
const SCALE = 20;
const ROWS = GAMEBOARD_HEIGHT / SCALE;
const COLUMNS = GAMEBOARD_WIDTH / SCALE;
const SNAKE = new Snake();
const LEVELS = {
    timer: [300, 200, 150, 100, 50],
    foods: [1, 3, 5, 7, 10]
};
const position = {
    x: undefined,
    y: undefined
}

let direction;
let prevDirection;
let foodsInCurrentLevel = [];
let isCrash = false;
let isAllLevelsFinished = false;
let currentLevel = 0;
let myInterval;

function start() {
    canvasSetup();
    createFoods(LEVELS.foods[currentLevel]);
    myInterval = setInterval(running, LEVELS.timer[currentLevel]);
};

function running() {
    CTX.clearRect(0, 0, canvas.width, canvas.height);
    isCrash = SNAKE.update();
    drawFoods();

    // Crash
    if(isCrash) {
        gameOver();
    }

    if(foodsInCurrentLevel.length === 0 && currentLevel === LEVELS.timer.length - 1) {
        win();
    } else if(foodsInCurrentLevel.length === 0) {
        goToNextLevel();
    }
}

function goToNextLevel() {
    currentLevel += 1;
    createFoods(LEVELS.foods[currentLevel]);
    clearInterval(myInterval);
    myInterval = setInterval(running, LEVELS.timer[currentLevel]);
}

function win() {
    CTX.fillStyle = "rgba(0,0,0,0.5)";
    CTX.fillRect(0, 0, GAMEBOARD_WIDTH, GAMEBOARD_HEIGHT);
    CTX.font = "70px Arial";
    CTX.fillStyle = "white";
    CTX.textBaseline = 'middle';
    CTX.textAlign = "center";
    CTX.fillText("You Won", GAMEBOARD_WIDTH/2, GAMEBOARD_HEIGHT/2);
    end();
}

function gameOver() {
    CTX.fillStyle = "rgba(0,0,0,0.2)";
    CTX.fillRect(0, 0, GAMEBOARD_WIDTH, GAMEBOARD_HEIGHT);
    CTX.font = "70px Arial";
    CTX.fillStyle = "black";
    CTX.textBaseline = 'middle';
    CTX.textAlign = "center";
    CTX.fillText("Game Over", GAMEBOARD_WIDTH/2, GAMEBOARD_HEIGHT/2);
    end();
}

function createFoods(numberOfFood) {
    for(let i = 0; i < numberOfFood; i++) {
        randomPosition();
        foodsInCurrentLevel.forEach(function(f) {
            if(f.x === position.x && f.y === position.y) {
                i -= i;
                randomPosition();
            }
        });
        foodsInCurrentLevel.push(new Food(position.x,position.y));
    }
}

function drawFoods() {
    foodsInCurrentLevel.forEach(function(f) {
        f.draw();
    });
}

function randomPosition() {
    position.x = Math.ceil(Math.random() * COLUMNS) * SCALE - SCALE;
    position.y = Math.ceil(Math.random() * ROWS) * SCALE - SCALE;
}

function canvasSetup() {
    canvas.width = GAMEBOARD_WIDTH;
    canvas.height = GAMEBOARD_HEIGHT;
    canvas.style.backgroundColor = GAMEBOARD_BG_COLOR;
    canvas.style.backgroundColor = GAMEBOARD_BG_COLOR;
}

function end() {
    clearInterval(myInterval);
}

start();