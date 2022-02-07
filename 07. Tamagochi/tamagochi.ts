//Tive ajuda da emeli

class Tamagochi {
    private alive: boolean = true;
    private nome: string;
    private idade: number;

    private energia: number;
    private limpo: number;
    private saciado: number;
    private diamantes: number;

    private maxEnergia: number;
    private maxLimpo: number;
    private maxSaciado: number;

    constructor(nome: string, energia: number, saciado: number, limpo: number){

        this.nome = nome;
        this.energia = energia;
        this.saciado = saciado;
        this.limpo = limpo;
        this.idade = 0;
        this.maxEnergia = energia;
        this.maxLimpo = limpo;
        this.maxSaciado = saciado;
        this.diamantes = 0;
    }

    public setNome(nome: string) {
        if (nome.length == 0) {
            this.nome = "Tamagochi";
        }else {
            this.nome = nome;
        }
    }

    public getNome(): string {
        return this.nome;
    }

    public setEnergizado(valor: number): void{
        if(valor <= 0){
            this.energia = 0;
            console.log("Fail: pet está morto");
            this.alive = false;
        }
        else if(valor > this.maxEnergia)
            this.energia = this.maxEnergia;
        else
            this.energia = valor;
    }

    public setEnergia(): number{
        return this.energia;
    }
    
    public setSaciedade(): number{
        return this.saciado;
    }

    public setLimpeza(): number{
        return this.limpo;
    }

    public getEnergia(): number{
        return this.energia;
    }

    public getMaxEnergia(): number{
        return this.maxEnergia;
    }

    public getSaciedade(): number{
        return this.saciado;
    }

    public getSaciedadeMax(): number{
        return this.maxSaciado;
    }

    public getLimpeza(): number{
        return this.limpo;
    }

    public getLimpezaMax(): number{
        return this.maxLimpo;
    }

    public comendo(){
        this.idade =+ 1;

        if (this.saciado == this.maxSaciado) {
            this.saciado =+ 4;
        }
        if (this.energia > 0) {
            this.energia =- 1;
        }
        if (this.limpo > 0) {
            this.limpo =- 2;
        }
        this.morto();
    }

    public dormindo(){
        this.idade =+ 1;

        if (this.energia = (this.maxEnergia - 5)){
            this.energia = this.maxEnergia
        }
        console.log("Pet está sem sono")
    }

    public jogando(){
        this.idade =+ 1;
        this.diamantes =+ 1;

        if (this.energia > 1) {
            this.energia =- 2;
        }
        if(this.saciado > 1) {
            this.saciado =- 1;
        }
        if (this.limpo > 3) {
            this.limpo =-3;
        }
        this.morto();
    }

    public banho(){
        this.idade =+ 2;

        if (this.energia > 3) {
            this.energia =- 3;
        }
        if(this.saciado > 1) {
            this.saciado =- 1;
        }
        if (this.limpo > 0) {
            this.limpo = this.maxLimpo;
        }
        this.morto();
    }

    public morto(){
        if (this.energia <= 0 || this.saciado <= 0 || this.limpo <= 0){
            console.log("Pet morreu");
        }
        if (this.energia < 0) {
            this.energia = 0;
        }
        if(this.saciado < 0) {
            this.saciado = 0;
        }
        if (this.limpo < 0) {
            this.limpo = 0;
        }
    }

    public toString(): string {
        return `E:${this.energia}/${this.maxEnergia}, S:${this.saciado}/${this.maxSaciado}, L:${this.limpo}/${this.maxLimpo}, D:${this.diamantes}, I:${this.idade}`;
    }
}

let tati = new Tamagochi("tati", 10, 5, 15)
tati.jogando();
tati.comendo();
tati.dormindo();
tati.jogando();
tati.banho();
tati.jogando();

console.log("" + tati);