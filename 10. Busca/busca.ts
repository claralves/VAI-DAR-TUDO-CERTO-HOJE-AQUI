class Agenda {
    contato: Array<Contato>;

    constructor(contato = []) {
        this.contato = contato;
    }

    findByName(name: string): number {
        //boiei legal nisso aqui mas eu meio q entendi
        let testar = this.contato.findIndex(elemento => elemento.getName() == name);
        return testar;
    }

    addContact(contato: Contato) {
        let procurar: number =this.findByName(contato.getName());

        //se der certo achar:
        if(procurar != -1) {
            this.contato[procurar].setFones(contato.getFones());
        } else {
            //se n achar o ctt, adiciona ele:
            this.contato.push(contato);
        }
    }

    //entendi isso aqui direito n:
    findContact(name: string): string {
        //mancho, q viagem é essa mds
        let test = this.contato.find(elemento => elemento.getName() == name);
        let strings = test.toString();

        return strings;
    }

    rmContact(name: string): boolean {
        for(let i = 0; i < this.contato.length; i++) {
            if(this.contato[i].getName() == name) {
                this.contato.splice(i, 1);
                console.log("contato apagado");
                return true;
            }
        }
        console.log("contato nao encontrado");
        return false;
    }

    //oq seria esse pattern?
    search(pattern: string): Array<string> {
        let aray: Array<string> = [];

        for(let i = 0; i < this.contato.length; i++) {
            if(this.contato[i].toString().includes(pattern)){
                //adiciona
                aray.push(this.contato[i].toString());
            }
        } return aray;
    }

    toString(): string {
        let sair: string = "";
        
        for(let i = 0; i < this.contato.length; i++) {
            sair += this.contato[i].toString();
            sair += "\n";
        }
        return sair;
    }

    getContacts(): Array<Contato> {
        this.contato;
        return;
    }
}

class Fone {
    private id: string;
    private number: string;

    constructor(id:string, number: string) {
        this.id = id;
        this.number = number;
    }

    public static validate(Fone: string): boolean {
        let validos = "0123456789()-."

        for (let i = 0; i < Fone.length; i++) {
            if (validos.indexOf(Fone[i]) == -1) {
                console.log("invalido")
                return false
            } else {
                console.log("valido");
                return true;
            }
        }
    }

    //pq esse boolean NAO TA FUNCIONANDO???
    public isValid(): boolean {
        if(Fone.validate(this.number)) {
            return true;
        } else {
            return false;
        }
    }

    public getId(): string {
        return this.id;
    }

    public getNumber(): string {
        return this.number;
    }

    public setId(id: string) {
        this.id = id;
    }

    public setNumber(number: string) {
        this.number = number;
    }

    toString(): string {
        let sair=`${this.id} : ${this.number}`;
        return sair;
    }
}

class Contato {
    protected prefix: string = "-";
    private name: string | null
    private fones: Array<Fone> ;

    constructor(name: string | null, fones: Array<Fone>) {
        //se n tiver nome, continua tendo fone
        if(name == null) {
            this.name = "";
            this.fones = fones;
        } else {
            this.name = name;
            this.fones = fones;
        }
    }

    addFone(fone: Fone):boolean {
        if(fone.isValid()) {
            this.fones.push(fone);
            console.log("fone adicionado");
            return true;
        }
        return false;
    }

    rmFone(index: number): boolean {
        //se tiver abaixo de zero ou além do numero de posições, não tem como alcançar, sera se sequer existe?
        if(index < 0 || index > this.fones.length) {
            return false;
        } else {
            for(let i = 0; i < this.fones.length; i++) {
                if(i == index) {
                    //removendo
                    this.fones.splice(index, 1);
                    console.log("fone removido");
                    return true;
                }
            }
        }
        console.log("fone nao existe");
        return false;
    }

    getFones(): Array<Fone> {
        return this.fones;
    }

    getName() {
        return this.name;
    }

    setFones(fones: Array<Fone>) {
        //vetor;
        this.fones = [];

        for(let i = 0; i < fones.length; i++) {
            this.addFone(fones[i]);
            return this.fones;
        }
    }

    setName(name: string) {
        this.name = name;

        console.log("nome alterado");
        return this.name;
    }

    toString(): string {
        let sair = `${this.prefix} ${this.name} `;
        for (let i=0;i<this.fones.length;i++){
            sair+=`[ ${i}: ${this.fones[i]} ] `;
        }
        return sair;
    }
}

let test = new Fone ("Oi", "+55(85)9.9123-2105");
let sena = new Contato ("Sena", [test]);

let test2 = new Fone ("Casa", "+55(85)9.4655-0298")
sena.addFone(test2);
console.log(sena.toString());