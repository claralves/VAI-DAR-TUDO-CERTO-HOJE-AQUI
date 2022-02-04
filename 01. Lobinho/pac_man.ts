class Entity {
    x: number; //atributos
    y: number;
    step: number;
    image: p5.Image;
                //parametros
    constructor(x: number, y: number, step: number, image: p5.Image) {
        this.x = x;
        this.y = y;
        this.step = step;
        this.image = image;
    }
    //metodos
    draw(): void {
        image(this.image, this.x * this.step, this.y * this.step, this.step, this.step);
    }
}

class Board {
    nl: number; //atributos
    nc: number;
    step: number;
    background: p5.Image;

    constructor(nc: number, nl: number, step: number, background: p5.Image) {
        this.nc = nc
        this.nl = nl
        this.step = step
        this.background = background;
    }

    draw(): void {
        image(this.background, 0, 0, this.nc * this.step, this.nl * this.step);
        for (let x = 0; x < this.nc; x++) {
            for (let y = 0; y < this.nl; y++) {
                noFill();
                stroke(0);
                strokeWeight(2);
                rect(x * this.step, y * this.step, this.step, this.step);
            }
        }
    }
}

let wolf_img: p5.Image;
let pac_esq: p5.Image;
let pac_cima: p5.Image;
let pac_baixo: p5.Image;

let rabbit_img: p5.Image;
let ghost_esq: p5.Image;
let ghost_dir: p5.Image;
let ghost_cima: p5.Image;
let ghost_baixo: p5.Image;

let board_img: p5.Image;

let wolf: Entity;
let rabbit: Entity;
let board: Board;

let c: number = 0;

let vx: number;
let vy: number;

function loadImg(path: string): p5.Image {
    return loadImage(
        path,
        () => console.log("Loading " + path + " ok"),
        () => console.log("Loading " + path + " error")
    );
}

function preload() {
    wolf_img = loadImg('../sketch/pac_man.png');
    pac_esq = loadImg('../sketch/pac_man esq.png');
    pac_cima = loadImg('../sketch/pac_man cima.png');
    pac_baixo = loadImg('../sketch/pac_man baixo.png');

    rabbit_img = loadImg('../sketch/ghost direita.png');
    ghost_esq = loadImg('../sketch/ghost esquerda.png');
    ghost_dir = loadImg('../sketch/ghost direita.png');
    ghost_cima = loadImg('../sketch/ghost cima.png');
    ghost_baixo = loadImg('../sketch/ghost baixo.png');

    board_img = loadImg('../sketch/fundo.jpg');
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        wolf.x--;
        wolf.image = pac_esq;
    } else if (keyCode === RIGHT_ARROW) {
        wolf.x++;
        wolf.image = wolf_img;
    } else if (keyCode === UP_ARROW) {
        wolf.y--;
        wolf.image = pac_cima;
    } else if (keyCode === DOWN_ARROW) {
        wolf.y++;
        wolf.image = pac_baixo;
    }

    if (keyCode === "A".charCodeAt(0)) {
        rabbit.x--;
        rabbit.image = ghost_esq;
    } else if (keyCode === "D".charCodeAt(0)) {
        rabbit.x++;
        rabbit.image = ghost_dir;
    } else if (keyCode === "W".charCodeAt(0)) {
        rabbit.y--;
        rabbit.image = ghost_cima;
    } else if (keyCode === "S".charCodeAt(0)) {
        rabbit.y++;
        rabbit.image = ghost_baixo;
    }
}

function deslocar(){
    if(wolf.x == board.nc){
        wolf.x = 0;
      }
      if(wolf.x == -1){
        wolf.x = board.nc - 1;
      }
      if(wolf.y == board.nl){
        wolf.y = 0;
      }
      if(wolf.y == -1){
        wolf.y = board.nl - 1;
      }
}

function preso(){
    if(rabbit.x == board.nc){
        rabbit.x = board.nc - 1;
      }
      if(rabbit.x == -1){
        rabbit.x = 0;
      }
      if(rabbit.y == board.nl){
        rabbit.y = board.nl - 1;
      }
      if(rabbit.y == -1){
        rabbit.y = 0;
      }
} 

function setup() {
    let size = 100;
    wolf = new Entity(6, 6, size, wolf_img);
    rabbit = new Entity(10, 6, size, rabbit_img);
    board = new Board(16, 12, size, board_img);
    createCanvas(board.nc * size, board.nl * size);
}

function ghost_mover(){
    rabbit.x = parseInt(random(0, board.nc));
    rabbit.y = parseInt(random(0, board.nl));
}

function contagem(){
    if(wolf.x == rabbit.x && wolf.y == rabbit.y){
        ghost_mover();
        c = c +  1;
        //console.log("c");
    }
}

function draw() {
    contagem();
    preso();
    deslocar();
    board.draw();
    wolf.draw();
    rabbit.draw();

    fill(400);
    textSize(100);
    text(c, 30, 80);
}