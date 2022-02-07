class Grafite {
    calibre: number;
    dureza: string;
    tamanho: number;

    constructor(calibre: number, dureza: string, tamanho: number) {
        this.calibre = calibre;
        this.dureza = dureza;
        this.tamanho = tamanho;
    }

    gastoPorFolha(): number {
        if (this.dureza === 'HB')
            return 1;
        if (this.dureza === '2B')
            return 2;
        if (this.dureza === '4B')
            return 4;
        if (this.dureza === '6B')
            return 6;
        return 0;
    }

    toString() : string { //transformar numa string;
        return "Grafite: " + this.calibre + ":" +this.dureza + ":" + this.tamanho;
    }
}

class Lapiseira {
    calibre: number;
    max: number;
    private grafite: Grafite[] = [] //Pode ter grafite OU pode não ter(null);
    //Não é um objeto grafite e sim um atributo que pode armazenar o objeto grafite;
    //Private impede o acesso externo ao grafite, só pode ser mexido com a função setGrafite;

    constructor(calibre: number, max: number) {
        this.calibre = calibre;
        this.max = 3;
        //this.grafite = null; //Faz com que a lapiseira começe sem grafite; 
    }

    setGrafite(grafite: Grafite): boolean { //Para colocar o grafite dentro da lapiseira;
        if (this.grafite.length >= this.max) {
            console.log("A lapiseira já possui um grafite");
            return false;
        }
        if (grafite.calibre != this.calibre) {
            console.log("O grafite não é compatível com a lapiseira");
            return false;
        }

        this.grafite.push(grafite); //Faz com que o objeto grafite seja referência p/ a lapiseira, podendo contar como colocado na lapiseira;
        return true;
    }

    removerGrafite(): Grafite | null { //pode ou n ter e blablabla
        if (this.grafite == null) {
            console.log("A lapiseira não possui grafite");
            return null;
        }

        let grafite = this.grafite.shift();
        if (grafite == undefined) {
            return null;
        }
        return grafite;
    }

    escrever(folhas: number): boolean {
        if (this.grafite == null) {
            console.log("A lapiseira não possui um grafite");
            return false;
        }

        let gasto = this.grafite[0].gastoPorFolha() * folhas;
        //verificar se tem grafite suficiente
        if (gasto <= this.grafite[0].tamanho) {
            console.log("Escrita concluída");
            this.grafite[0].tamanho -= gasto;

            if (this.grafite[0].tamanho == 0) {
                this.removerGrafite();
                console.log("Grafite removido");
                return true;
            }

        } else {
            let realizado = this.grafite[0].tamanho/this.grafite[0].gastoPorFolha();
            console.log("Escrita parcial: " + realizado + " folhas");
            this.grafite[0].tamanho = 0; //Zera o tamanho do grafite já que gastou tudo;

        }
        
        //se o tamanho do grafite é zero é pq o grafite acabou;
        if (this.grafite[0].tamanho == 0) {
            this.removerGrafite();
            console.log("Grafite removido");
            return true;
        }
        return true;
    }
}

let Pentel = new Lapiseira(0.7, 3);

Pentel.setGrafite(new Grafite(0.7, "HB", 70));
console.log(Pentel);

console.log("      =========      ")
Pentel.escrever(20);
console.log(Pentel);

console.log("      =========      ")
Pentel.removerGrafite()
console.log(Pentel);