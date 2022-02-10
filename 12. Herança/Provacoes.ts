class Aluno {
    private vivo: boolean = true;
    private curso: string;
    protected sanidade: number;
    protected ansiedade: number;

    constructor(curso: string, sanidade: number, ansiedade: number) {
        this.curso = curso;
        this.sanidade = sanidade;
        this.ansiedade = ansiedade;
    }

    public naoDepressivo(): boolean {
        return this.vivo;
    }

    public depressivo() {
        if(this.sanidade == 0) {
            this.vivo = false;
            console.log("O aluno está com depressão");
        }
        if(this.ansiedade == 3) {
            this.vivo = false;
            console.log("O aluno está com ansiedade");
        } else {
            this.vivo = true;
        }
    }

    public getCurso(): string {
        return this.curso;
    }

    public toString() {
        return this.curso + " sanidade" + ":" + this.sanidade + " ansiedade" + ":" + this.ansiedade + " está" + ":" + (this.vivo ? "vivo" : "morto");
    }

    public atividades(): void {
        this.sanidade -= 1;
        this.ansiedade += 1;
    }
}

class Designer extends Aluno {
    protected nome: string;

    public constructor(nome: string, sanidade: number, ansiedade: number) {
        super("DD", sanidade, ansiedade);
        this.nome = nome;
    }

    public trabalhoFinal(): void {
        if(this.naoDepressivo()) {
            this.sanidade -= 1;
            this.ansiedade += 1;
            this.depressivo();
            console.log("O aluno ta quase desistindo hein...manera ai");
        } else {
            super.depressivo();
            console.log("O aluno trancou a faculdade");
        }
    }

    public toString(): string {
        return this.nome + ":" + super.toString();
    }
}

class Provacoes extends Designer {
    constructor(nome: string, sanidade: number, ansiedade: number) {
        super(nome, sanidade, ansiedade);
    }

    public apresentacaoFinal() {
        if(this.naoDepressivo()) {
            this.sanidade -= 2;
            this.ansiedade += 2;
            console.log("O aluno ja nao aguenta mais, programação é uma provação");
        } else {
            super.depressivo();
            console.log("Aluno trancou a faculdade");
        }
    }

    public toString(): string {
        return super.toString();
    }
}

let esperancosa = new Designer("Clara", 3, 0);
console.log(esperancosa.toString());

console.log("-----------------------------------");

esperancosa.atividades();
console.log(esperancosa.toString());

console.log("-----------------------------------");

esperancosa.trabalhoFinal();
console.log(esperancosa.toString());

console.log("-----------------------------------");

esperancosa.trabalhoFinal();
console.log(esperancosa.toString());

console.log("-----------------------------------");

esperancosa.trabalhoFinal();
console.log(esperancosa.toString());

//console.log("-----------------------------------");

//esperancosa.Atividades();
//console.log(esperancosa.toString());