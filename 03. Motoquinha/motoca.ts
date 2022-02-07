class Pessoa {
    age: number;
    name: string;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    toString() {
        return `pessoa:  ${this.name}-${this.age}`;
    }
}

class Moto {
    pessoa: Pessoa | null
    power: number;
    time: number;

    constructor(person: Pessoa | null, time: number, power: number) {
        this.pessoa = null;
        this.power = power;
        this.time = time;
    }

    //iniciar(): void {
    //    this.pessoa = null;
    //    this.power = 1;
    //    this.time = 0;
    //}

    potencia(power: number) {

    }

    buy(time: number) {
        this.time += time;
    }

    //o trequinho chato
    drive(time: number): boolean | void {
        if(this.pessoa == null) {
            console.log("fail: moto vazia. Ou é um espirito?");
            return false;
        }
        if(this.time <= 0) {
            console.log("fail: tempo zerado");
        }

    }

    enter(pessoa: Pessoa): boolean {
        if(this.pessoa != null) {
            console.log("fail: moto ocupada");
            return false;
        }
        this.pessoa = pessoa;

        return true;
    }

    //pq n tá funcionando???
    honk(power: number) {
        if(this.pessoa != null) {
            let pem: string = "";
            for(let i=0; i<=power; i++){
            pem = "e".repeat(i);
            //pem +="e"; 
            }
            return "P" + pem + "m";
        }
        if(this.pessoa == null) {
            console.log("fail: moto vazia. Ou é um espirito?");
        }
    }

    leave(): Pessoa | null {
        return this.pessoa = null;
    }

    toString(): string {
        //o $ serve para colocar variaveis dentro do texto
        return `potência: ${this.power}, minutos: ${this.time}, pessoa : ${this.pessoa}`;
    }
}

let danram = new Pessoa("Heitor", 19);
let buz = new Pessoa("Clara", 19);
let vrau = new Moto(null, 0, 1);

//console.log("essa negoçu vai dar certo");

console.log(vrau.toString());

vrau.honk(5);
console.log(vrau.toString());

vrau.enter(danram);
console.log(vrau.toString());

vrau.honk(5);
//console.log(vrau.toString());

vrau.enter(danram);
console.log(vrau.toString());

vrau.leave();

//vrau.leave();
vrau.buy(30);
console.log(vrau.toString());

vrau.enter(buz);
console.log(vrau.toString());

//let danram = new Moto();
//danram.potencia(5);
//console.log(danram.toString());

//danram.enter(new Pessoa("Sena", 25));
//console.log(danram.toString())