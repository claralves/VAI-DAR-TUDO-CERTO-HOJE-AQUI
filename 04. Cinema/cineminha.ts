class Cliente {
    id : string;
    fone : string;

    constructor(id : string, fone : string) {
        this.id = id;
        this.fone = fone;        
    }

    toString(): string {
        return "nome" + this.id + ":" + "telefone" + this.fone;
    }
}

class Cinema {
    capacidade: number;
    cadeiras: Array < Cliente | null>;

    constructor(capacidade: number) {
        this.capacidade = capacidade;
        this.cadeiras = []; //vetor;
        for(let i = 0; i < capacidade; i++) {
            this.cadeiras.push(null);
        }
    }

    reservar(id: string, fone: string, indice: number): boolean {
        let cliente:Cliente = new Cliente(id, fone);

        //se o indice for diferente de nulo é pq ja tem alguem ne dahnn
        if (this.cadeiras[indice] != null) {
            console.log("Cadeira ja esta ocupada")
            return false;
        }
        for (let i = 0; this.cadeiras.length; i++) {
            // se a posição for diferente de nula e o nome for igual, significa que a pessoa ja está no cinema
            if (this.cadeiras[i] != null && this.cadeiras[i].id == id) {
                console.log("Esse cliente ja esta na sala");
                return false;
            }
        }
        //se tudo der certo amém
        this.cadeiras[indice] = cliente;
        return true;
    }

    cancelar(id:string) {
        for (let i = 0; i < this.cadeiras.length; i++) {
            //se a posição for diferente de nula
            if (this.cadeiras[i] != null) {
                if (this.cadeiras[i].id == id) {
                    this.cadeiras[i] = null;
                    console.log("Cliente cancelou a compra");
                    return true;
                }
            }
        }
        console.log("O cliente nao esta na sala");
        return false;
    }

    toString(): string {
        let sair = '[ ';
        for (let i = 0; i < this.cadeiras.length; i++) {
            if (this.cadeiras[i] == null) {
                sair += '- '
            } else {
                sair += this.cadeiras[i].id + ' ';
            }
        }
        return sair += '] ';
    }
}

let sessao = new Cinema(0);
//console.log("Resultado " + sessao + "\n");

sessao = new Cinema(5);
console.log("Resultado " + sessao + "\n");