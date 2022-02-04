var Bubble = (function () {
    function Bubble(x, y, letter, speed) {
        this.alive = true;
        this.x = x;
        this.y = y;
        this.letter = letter;
        this.speed = speed;
    }
    Bubble.prototype.update = function () {
        this.y += this.speed;
    };
    Bubble.prototype.draw = function () {
        fill(255);
        stroke(255);
        circle(this.x, this.y, 2 * Bubble.radius);
        fill(0);
        stroke(0);
        textSize(15);
        text(this.letter, this.x - 5, this.y + 5);
    };
    Bubble.radius = 20;
    return Bubble;
}());
var Board = (function () {
    function Board() {
        this.bubbles = [];
        this.timeout = 20;
        this.timer = 0;
        this.hits = 0;
        this.mistakes = 0;
    }
    Board.prototype.update = function () {
        this.checkBubbleTime();
        this.markOutsideBubbles();
        for (var _i = 0, _a = this.bubbles; _i < _a.length; _i++) {
            var bubble = _a[_i];
            bubble.update();
        }
        this.removeDeadBubbles();
    };
    Board.prototype.removeDeadBubbles = function () {
        this.bubbles = this.bubbles.filter(function (b) { return b.alive; });
    };
    Board.prototype.removeByHit = function (code) {
        for (var _i = 0, _a = this.bubbles; _i < _a.length; _i++) {
            var bubble = _a[_i];
            if (bubble.letter[0].toUpperCase().charCodeAt(0) == code) {
                bubble.alive = false;
                this.hits++;
                break;
            }
        }
        if (bubble.letter[0].toUpperCase().charCodeAt(0) != code) {
            this.mistakes++;
        }
    };
    Board.prototype.checkBubbleTime = function () {
        this.timer -= 1;
        if (this.timer <= 0) {
            this.addBubble();
            this.timer = this.timeout;
        }
    };
    Board.prototype.markOutsideBubbles = function () {
        for (var _i = 0, _a = this.bubbles; _i < _a.length; _i++) {
            var bubble = _a[_i];
            if (bubble.y + 2 * Bubble.radius >= height) {
                bubble.alive = false;
                this.mistakes++;
            }
        }
    };
    Board.prototype.addBubble = function () {
        var x = random(0, width - 2 * Bubble.radius);
        var y = -2 * Bubble.radius;
        var letter = random(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]);
        var speed = 2;
        if (this.hits > 5) {
            speed = 3;
        }
        if (this.hits > 10) {
            speed = 4;
        }
        if (this.hits > 15) {
            speed = 5;
        }
        if (this.hits > 20) {
            speed = 6;
        }
        var bubble = new Bubble(x, y, letter, speed);
        this.bubbles.push(bubble);
    };
    Board.prototype.draw = function () {
        stroke("white");
        fill("white");
        textSize(30);
        text("pontos: " + this.hits, 30, 30);
        text("perdeu: " + this.mistakes, 650, 30);
        for (var _i = 0, _a = this.bubbles; _i < _a.length; _i++) {
            var bubble = _a[_i];
            bubble.draw();
        }
    };
    return Board;
}());
var Game = (function () {
    function Game() {
        this.board = new Board();
        this.activeState = this.gamePlay;
    }
    Game.prototype.gamePlay = function () {
        this.board.update();
        background(0, 100, 100);
        this.board.draw();
        if (this.board.mistakes >= 5) {
            this.activeState = this.gameOver;
        }
    };
    Game.prototype.gameOver = function () {
        background(255, 0, 0);
        fill(0);
        textSize(100);
        text("Game Over", 150, 230);
        textSize(50);
        text("sua pontuação foi : " + this.board.hits, 170, 310);
    };
    return Game;
}());
var game;
function setup() {
    createCanvas(800, 600);
    frameRate(30);
    game = new Game();
}
function keyPressed() {
    game.board.removeByHit(keyCode);
}
function draw() {
    game.activeState();
}
//# sourceMappingURL=build.js.map