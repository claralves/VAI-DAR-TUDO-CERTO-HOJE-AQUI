class Paciente {
    private nome: string;
    private diagnostico: string;
    private medicos: Map<string, Medico>;
    
    constructor(nome: string, diagnostico: string) {
        this.nome = nome;
        this.diagnostico = diagnostico;
        this.medicos = new Map<string, Medico>();
    }
    public getNome(): string {
        return this.nome;
    }
//seria para ativar o diagnostico?
    public getDiagnostico(): string {
        return this.diagnostico;
    }
//Para adicionar o paciente na lista do médico
    public addMedico(medico: Medico): void {
        let chave = medico.getNome(), especialidade = medico.getEspecialidade();
        
        //pra q que serve isso
        for (let value of this.medicos.values()) {
            if (value.getEspecialidade() == especialidade && value.getNome() != chave) {
                console.log(`Ja tem ${especialidade}`);
                return;
            }
        }
        //se ele já estiver matriculado
        //if (this.medicos.has(chave))
        //    return;
        //se ele não estiver matriculado
        this.medicos.set(chave, medico);
        //adiciona o paciente na lista do médico
        medico.addPaciente(this);
    }

    public removeMedico(key: string): void {
        //se ele existir, retorna o médico. Se ele n existir, retorna undefined
        let medico: undefined | Medico = this.medicos.get(key);
        //se ele existe
        if (medico !== undefined) {
            //removo o medico da lista do paciente 
            this.medicos.delete(key);
            //removo o paciente da lista
            medico.removePaciente(this.nome);
        }
    }

    public getMedico(): string[] {
        return [...this.medicos.keys()];
    }

    public toString(): string {
        let keys = this.medicos.keys();
        return this.nome + " [" + [...keys].join(", ") + "]";
    }
}

class Medico {
    private nome: string;
    private especialidade: string;
    private pacientes: Map<string, Paciente>;
    constructor(nome: string, especialidade: string) {
        this.nome = nome;
        this.especialidade = especialidade;
        this.pacientes = new Map<string, Paciente>();
    }
    public getNome(): string {
        return this.nome;
    }
    public getEspecialidade(): string {
        return this.especialidade;
    }

    public addPaciente(paciente: Paciente): void {
        let chave = paciente.getNome();
        if (this.pacientes.has(chave))
            return;
        this.pacientes.set(chave, paciente);
        paciente.addMedico(this);
    }

    public removePaciente(key: string): void {
        let paciente: undefined | Paciente = this.pacientes.get(key);
        if (paciente !== undefined) {
            this.pacientes.delete(key);
            paciente.removeMedico(this.nome);
        }
    }

    public getPaciente(): string[] {
        return [...this.pacientes.keys()];
    }

    public toString(): string {
        let keys = this.pacientes.keys();
        return this.nome + " [" + [...keys].join(", ") + "]";
    }
}

class Hospital {
    //O hospital tem todos os pacientes e alunos
    private pacientes: Map<string, Paciente>;
    private medicos: Map<string, Medico>;
    //o constructor inicializa os dois mapas
    constructor() {
        this.pacientes = new Map<string, Paciente>();
        this.medicos = new Map<string, Medico>();
    }

    public addPaciente(paciente: Paciente): void {
        let chave = paciente.getNome();
        //se o paciente já tiver internado
        if (this.pacientes.has(chave))
            //não faz nada    
            return
        //senão, o paciente é internado
        this.pacientes.set(chave, paciente);
    }

    public addMedico(medico: Medico): void {
        let chave = medico.getNome();
        //se o médico não for do hospital
        if (this.medicos.has(chave))
            //não faz nada
            return;
        //senão, o médico é "contratado"
        this.medicos.set(chave, medico);
    }

    //tranforma o nome do paciente em um objeto
    public getPaciente(nome: string): Paciente {
        let paciente = this.pacientes.get(nome);
        //se o paciente não estiver definido
        if (paciente === undefined)
            //dá erro
            throw new Error("Paciente não encontrado");
        //senão, retorna o paciente
        return paciente;
    }

    public getMedico(nome: string): Medico {
        let medico = this.medicos.get(nome);
        if (medico === undefined)
            throw new Error("Medico(a) não encontrado(a)")
        return medico;
    }

    public removerPaciente(nome: string): void {
        let paciente = this.getPaciente(nome);

        for (let medico of paciente.getMedico()) {
            paciente.removeMedico(medico);
        }
        this.pacientes.delete(nome);
    }

    public removerMedico(nome: string): void {
        let medico = this.getMedico(nome);

        for (let paciente of medico.getPaciente()) {
            medico.removePaciente(paciente);
        }
        this.medicos.delete(nome);    
    }

    public vincular(paciente: string, medico: string): void {
        this.getPaciente(paciente).addMedico(this.getMedico(medico));
    }

    public desvincular(paciente: string, medico: string): void {
        this.getPaciente(paciente).removeMedico(medico);
    }
    
    public toString(): string {
        //lista com o nome dos pacientes
        let pacientes = [...this.pacientes.values()].map(p => p.toString());
        let medicos = [...this.medicos.values()].map(m => m.toString());
        return "--Pacientes:\n" + pacientes.join("\n") + "\n--Medicos:\n" + medicos.join("\n");
    }
}

let hosp = new Hospital();

hosp.addMedico(new Medico("Carlos", "Psicologo"));
hosp.addPaciente(new Paciente("Maria", "Dor de cabeça"));

hosp.vincular("Maria", "Carlos");

console.log(hosp.toString());