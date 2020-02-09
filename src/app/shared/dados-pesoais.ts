export interface DadosPessoais {
  nome: string;
  idade: string;
  rg: string;
  cpf: string;
}

export interface Endereco {
  rua: string;
  numero: string;
  complemento?: string;
  bairro?: string;
  cidade: string;
}

export interface DadosContato {
  cel: string;
  email: string;
}