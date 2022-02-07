class Cliente {
    id: string;
    fone: string;

    constructor(id: string, fone: string) {
        this.id = id;
        this.fone = fone;
    }

    toString() {
        return `${this.id} : ${this.fone}`;
    }
}

class Sala {
    //nome da listinha: Mao<string(number ou sla oq), oq vc ta procurando;
    cadeiras: Map<number, Cliente | null> = new Map;

    constructor(lotacao: number) {
        for(let i = 0; i < lotacao; i++) {
            this.cadeiras.set(i, null);
        }
    }

    toString() {
        let sair = '[ '
        for(let cliente of this.cadeiras.values()) {
            if(cliente == null) {
                sair += '- ';
        
            } else {
                sair += cliente.id + ' ';
            }
        }
        return sair += ']';
    }

    reservar(id: string, fone: string, indice: number): boolean {
        let client = new Cliente(id, fone);

        if(this.cadeiras != null) {
            console.log("fail: cadeira ocupada");
            return false;
        }
        for(let i = 0; i < this.cadeiras.length; i++) {
            if(this.cadeiras[i] != null && this.cadeiras[i].id == id) {
                console.log("esse cliente ja esta na sala");
                return false;
            } 
        }
        this.cadeiras = client;
        return true;
    }

    cancelar(id: string): boolean {
        for(let i = 0; i < this.cadeiras.length; i++) {
            if(this.cadeiras[i] != null) {
                if(this.cadeiras[i].id == id) {
                    this.cadeiras[i] == null;
                    console.log("cancelar reserva");
                    return true;
                }
            }
        }
        console.log("o cliente nao esta aqui");
        return false;
    }
}