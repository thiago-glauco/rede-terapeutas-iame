import {User} from "./user";

export class LoginFormUser implements User {
  email: string;

  password: string;

  confirmPassword?: string;

  verified: boolean;

  validado?: boolean;

  ultimo_acesso?: string ;

  provedor?: string;

  category?: string;

  dadosPessoais: {
    nome: string;
    idade: string;
    rg: string;
    cpf: string;
  }

  //image: string;
}