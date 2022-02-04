class Bubble {
    x: number;
    y: number;
    letter: string;
    speed: number;

    //Tudo que for colocar aqui que não vá ir para o contructor já coloca um valor;
    static radius: number = 20; //Static faz com que seja algo da Classe e não do objeto
    alive: boolean = true //Para depois fazer a bola sumir;
    
    //O contructor serve para contruir a classe;
    constructor(x: number, y: number, letter: string, speed: number) {
        this.x = x;
        this.y = y;
        this.letter = letter;
        this.speed = speed;
    }

    update(): void {
        this.y += this.speed; //Faz a velocidade e o y estarem diretamente ligados;
    }

    //métodos?
    draw(): void {
        fill(255);
        stroke(255);
        circle(this.x, this.y, 2 * Bubble.radius);
        
        fill(0);
        stroke(0);
        textSize(15);
        text(this.letter, this.x - 5, this.y + 5);
    }
}

class Board {
    bubbles: Bubble[] = [];
    timeout: number = 20;
    timer: number = 0;
    hits = 0;
    mistakes = 0;

    constructor() {
        //this.bubbles = [new Bubble(100, 100, "a", 1)];
        //this.bubbles.push (new Bubble(200, 100, "b", 2));
        //this.bubbles.push (new Bubble(300, 100, "c", 3));
    }

    update(): void {
        this.checkBubbleTime();
        this.markOutsideBubbles();

        for (let bubble of this.bubbles)
            bubble.update();
        this.removeDeadBubbles();
    }

    removeDeadBubbles() : void {
        this.bubbles = this.bubbles.filter(b => b.alive);
    }

    removeByHit(code: number) : void {
        for (let bubble of this.bubbles)
            if(bubble.letter[0].toUpperCase().charCodeAt(0) == code) {//Considera o número da letra, ou seja, considera tanto letra maiúscula quanto minúscula;
               bubble.alive = false;
               this.hits++;
               break; //Garante que não pega várias letras ao mesmo tempo ao sumir logo com a primeira achada;
            }
            if(bubble.letter[0].toUpperCase().charCodeAt(0) != code) {
                this.mistakes++;
            }
    }
    
    checkBubbleTime() : void {
        this.timer -= 1;
        if(this.timer <= 0) {
            this.addBubble();
            this.timer = this.timeout;
        }
    }

    markOutsideBubbles() : void {
        for (let bubble of this.bubbles){
            if (bubble.y + 2 * Bubble.radius >= height){
                bubble.alive = false;
                this.mistakes++;
            }
        }
    }

    addBubble() :void {
        let x = random(0, width - 2 * Bubble.radius); // Bolha não nascer de fora do x, para não ficar sumida;
        let y = -2 * Bubble.radius; //Bolha nascer de fora do y, para descer entrando no quadro;

        let letter = random(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]);
        let speed = 2;

        //Para mudar a velocidade da bolha de acordo com a pontuação;
        if(this.hits > 5){ 
            speed = 3;
        } 

        if(this.hits > 10){ 
            speed = 4;
        }

        if(this.hits > 15){ 
            speed = 5;
        }

        if(this.hits > 20){ 
            speed = 6;
        }

        let bubble = new Bubble(x, y, letter, speed);
        this.bubbles.push(bubble); //Coloca a bolha dentro do vetor;

    }

    draw(): void {
        stroke("white");
        fill("white");
        textSize(30);
        text("pontos: " + this.hits, 30, 30);
        text("perdeu: " + this.mistakes, 650, 30);

        for (let bubble of this.bubbles)
            bubble.draw();
    }
}

class Game {
    board: Board;
    activeState: () => void; //Função que não recebe nada e não retorna nada;

    constructor() {
        this.board = new Board();

        this.activeState = this.gamePlay; //Função ativa começa sendo gamePlay;
    }
    gamePlay() : void {
        this.board.update(); // Update do Jogo;
        background(0, 100, 100);
        this.board.draw(); //Atualização do Jogo;

        //Para aparecer a tela de Game Over, fazer uma variável para contar os erros, ao fazer 5 erros:
        if (this.board.mistakes >= 5) {
            this.activeState = this.gameOver;
        }
    }

    gameOver() : void {
        background(255, 0, 0);
        fill(0);
        textSize(100);

        text("Game Over", 150, 230);

        textSize(50);

        text("sua pontuação foi : " + this.board.hits, 170, 310);
    }
}

let game: Game;

function setup() {
    createCanvas(800, 600);
    frameRate(30); //Quadros por segundo;

    game = new Game();
}

function keyPressed() {
    game.board.removeByHit(keyCode);
}

function draw() {
    game.activeState();
}