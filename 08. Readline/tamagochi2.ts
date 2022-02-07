const readline = require('readline-sync');
let input = (): string => readline.question();
let write = (x : any) => process.stdout.write("" + x);

class Tamagochi {
    
    private nome: string;
    private energia: number;
    private saciedade: number;
    private limpeza: number;
    private energiaMax: number;
    private saciedadeMax: number;
    private limpezaMax: number;
    private diamantes: number;
    private idade: number;
    private isAlive: boolean = true; 

    constructor(nome: string, energia: number, saciedade: number, limpeza: number){
    
    this.nome = nome;
    this.energia = energia;
    this.saciedade = saciedade;
    this.limpeza = limpeza;
    this.energiaMax = energia;
    this.saciedadeMax = saciedade;
    this.limpezaMax = limpeza;
    this.diamantes = 0;
    this.idade = 0;

    }

    public setNome(nome: string) {
        if (nome.length == 0) {
            this.nome = "tama-tama";
        } else {
            this.nome = nome;
        }
    }

    public getNome(): string {
        return this.nome;
    }

    /* Cada operação causa aumento e reduções nos atributos.
    Nenhum atributo pode passar do máximo ou ir abaixo de 0. */

    public comendo(){
    /* altera em -1 a energia, +4 a saciedade, -2 a limpeza, +0 diamantes,  +1 a idade */
    this.idade =+ 1;

    if (!this.isAlive){
        write("pet incapaz de comer, pois IS DEAD\n")
            return;
    }

    if (this.energia > 0) {
       this.setEnergia(this.getEnergia() - 1);
    } 

    if (this.saciedade == this.saciedadeMax) {
        this.setSaciedade(this.getSaciedade() + 4);
    } 
    
    if (this.limpeza > 0) {
        this.setLimpeza(this.getLimpeza() - 2);
    } 
}

   public dormindo(){
    /* aumenta energia até o máximo e idade aumenta do número de turnos que o pet dormiu.
# Os outros atributos permanecem inalterados. */
/* Para dormir, precisa ter perdido pelo menos 5 unidades de energia (error: sem sono) */
    this.idade =+ 1;

    if (this.energia = (this.energiaMax - 5)){
        this.energia = this.energiaMax
    }
    console.log("Pet sem sono")

}

    public jogando(){
    /* altera em -2 energia, -1 saciedade, -3 limpeza, +1 diamante, +1 idade. */
    this.idade =+ 1;
    this.diamantes =+ 1;

    if (this.energia > 1) {
        this.setEnergia(this.getEnergia() - 2); 
    } 

    if (this.saciedade > 1) {
        this.setSaciedade(this.getSaciedade() - 4);
    } 
    
    if (this.limpeza > 3) {
        this.setLimpeza(this.getLimpeza() - 3);
    } 
}

    public banho(){
    /* alteram em -3 energia, -1 na saciedade, MAX na limpeza, +0 diamantes, +2 na idade. */
    this.idade =+ 2;

    if (this.energia > 3) {
        this.setEnergia(this.getEnergia() - 3); 
    } 

    if (this.saciedade > 1) {
        this.setSaciedade(this.getSaciedade() - 1);
    } 
    
    if (this.limpeza > 0){
        this.limpeza = this.limpezaMax
    }

}

   /* public morrendo(){
     Se algum atributo chegar a 0, o pet morre e nenhuma ação pode ser feita a não ser mostrar os dados.
    if (this.energia <= 0 || this.saciedade <= 0 || this.limpeza <= 0){
        console.log("pet está morto");
    }
    if (this.energia < 0){
        this.energia = 0;
    }
    if (this.saciedade < 0){
        this.saciedade = 0;
    }
    if (this.limpeza < 0){
        this.limpeza = 0;
    }
    
} */ 
public setLimpeza(limpeza: number){
    if (this.limpeza < 0){
        this.limpeza = 0;
        this.isAlive = false;
        write("pet morreu\n")
    } else if (limpeza > this.limpezaMax) {
        this.limpeza = this.limpezaMax;
        if (this.isAlive){
            write("pet com energia máxima")
        }
    } else {
        this.limpeza = limpeza;
    }
}
public getLimpeza(){
    return this.limpeza;
}

public setEnergia(energia: number){
    if (this.energia < 0){
        this.energia = 0;
        this.isAlive = false;
        write("pet morreu\n")
    } else if (energia > this.energiaMax) {
        this.energia = this.energiaMax;
        if (this.isAlive){
            write("pet com energia máxima")
        }
    } else {
        this.energia = energia;
    }
}
public getEnergia(){
    return this.energia;
}
public setSaciedade(saciedade: number){
    if (this.saciedade < 1){
        this.saciedade = 0;
        this.isAlive = false;
        write("pet morreu\n")
    } else if (saciedade > this.saciedadeMax){
        this.saciedade = this.saciedadeMax;
        this.isAlive = false;
        write("pet morreu\n");
    } else {
        this.saciedade = saciedade;
    }
}
public getSaciedade(){
    return this.saciedade;
}

    public toString(): string {
        if(this.isAlive){
            return `E:${this.energia}/${this.energiaMax}, S:${this.saciedade}/${this.saciedadeMax}, L:${this.limpeza}/${this.limpezaMax}, D:${this.diamantes}, I:${this.idade}`;
    } else {
        return "pet morreu, F."
    }
}

}

class Tama {
    nascer(): Tamagochi {
        write("Digite o nome do seu Tamagochi: ");
        let nome = input();
        write("Digite o max de saciedade: ");
        let saciedade = +input();
        write("Digite o max de Energia: ");
        let energia = +input();
        write("Digite o max de Limpeza: ");
        let limpeza = +input();
        let tama = new Tamagochi(nome, energia , saciedade, limpeza);
        return tama
    }
    mostrar_help() {
        write("Comandos:\n");
        write("  init <nome> <saciedade> <energia> <limpeza>: cria um novo pet\n");
        write("  show: mostra o pet\n");
        write("  play: faz o pet brincar\n");
        write("  eat: faz o pet comer\n");
        write("  end: sai do programa\n");
    }

    shell() {
        let pet = new Tamagochi("", 0, 0, 0,);
        this.mostrar_help();
        while (true) {
            write("$ ");
            let line = input();
            let words = line.split(" ");
            if (words[0] == "end") {
                break;
            } else if (words[0] == "help") {
                this.mostrar_help();
            } else if (words[0] == "show") {
                write("" + pet + "\n");
            } else if (words[0] == "eat") {
                pet.comendo();
            } else if (words[0] == "play") {
                pet.jogando();
            } else if (words[0] == "init") {
                let nome = words[1];
                let sacMax = +words[2];
                let enerMax = +words[3];
                let limpMax = +words[4];
                pet = new Tamagochi(nome, sacMax, enerMax, limpMax);
            } else {
                console.log("Comando inválido");
            }
        }
    }
}

let tama = new Tama ();
tama.shell();