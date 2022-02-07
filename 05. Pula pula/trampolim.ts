class Criança{
    nome: string;
    idade: number;

    constructor(nome: string, idade: number){
        this.nome = nome;
        this.idade = idade;
    }

    public toString() {
        return `${this.nome}: ${this.idade}`;
    }
}

class PulaPula{
    pula: Array<Criança | null>;
    fila: Array<Criança>;

    constructor(){
        this.pula = [];
        this.fila = [];

    }
        //coloca a criança  na fila 
        EntrarNaFila(criança: Criança): void {
            this.fila.push(criança);
        }

        //pega a primeira pessoa da fila de espera
        EntrarNoPula(): boolean {
            this.pula[0] = this.fila[0];
            this.fila.shift();
            return true;
        }

        removerDoPula(): boolean {
            this.fila.push(this.pula[0]); //ultimo da fila de espera  
            this.pula.shift();
            return true;
        }

        
    toString() {
        return `${this.pula}: ${this.fila}`;
    }

}

let pular = new PulaPula();
console.log("" + pular);
pular.EntrarNaFila(new Criança("Emeli", 5));
pular.EntrarNaFila(new Criança("Clara", 6));
console.log(pular);
pular.EntrarNoPula();
console.log(pular);
pular.removerDoPula();
console.log(pular);
pular.EntrarNoPula();
console.log(pular);