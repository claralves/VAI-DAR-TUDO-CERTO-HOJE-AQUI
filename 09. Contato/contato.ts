class Fone {
    private id: string;
    private telefone: string;

    constructor(id: string, telefone: string) {
        this.id = id;
        this.telefone = telefone;
    }

    public getId() {
        return this.id;
    }

    public getTelefone() {
        return this.telefone;
    }

    public setId(valor: string) {
        this.id = valor;
    }

    public setTelefone(valor: string) {
        this.telefone = valor;
    }

    //pra ver se é valido
    public isValid(): boolean {
        if (Fone.validate(this.telefone)) {
            return true;
        }
        return false;
    }

    //o static n permite alterações
    public static validate(Fone:string): boolean {
        //botando os possíveis números
        let valendo = "0123456789()-."
        
        for (let i = 0; i < Fone.length; i++) {
            //se o número for negativo?
            //o indexOf serve pra dar como invalidao
            //retorna -1 pq tem alguma anomalia, se n tivesse retornaria 1
            if (valendo.indexOf(Fone[i]) == -1) {
                console.log("numero invalido");
                return false;
            }
        }
        return true;
    }

    toString(): string {
        return `${this.id} : ${this.telefone}`;
    }
}

class Contato {
    private nome: string;
    private fones: Array<Fone>

    constructor(nome: string, fones: Array<Fone>) {
        this.nome = nome;
        this.fones = Array<Fone>();

        for (let fone of fones) {
            this.addFone(fone);
        }
    }

    public getNome(): string {
        return this.nome;
    }

    public getFones() {
        return this.fones;
    }

    public setName(nome: string) {
        this.nome = nome;
    }

    //public setFones(fones: Array<Fone>) {
    //    this.fones = Array<Fone>();
    //}

    public addFone(fone: Fone) {
        //confere se é valido antes de adicionar
        if (fone.isValid()) {
            this.fones.push(fone);
        } else {
            //caso n seja valido:
            console.log("fail: nao foi possivel adicionar o telefone");
        }
    }

    public rmFones(index: number) {
        if (index < this.fones.length) {
            this.fones.splice(index, 1);
        } else {
            console.log("indice inexistente");
        }
    }

    public toString(): string {
        return `${this.nome}- ${this.fones.join(",")}`;
    }
}

let cell = [new Fone("Casa", "55(85)998765432")];
//console.log(cell.toString());
let clara = new Contato("Clara", cell);
console.log(clara.toString());