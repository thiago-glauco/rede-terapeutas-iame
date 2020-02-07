
export interface DatabaseUser {
  //user data to send to database at very first registration
  email: string;

  verified: boolean; //usuário confirmou o e-mail no link enviado

  name?: string;

  mobile?: string;

  uid: string;

  tel?: number;

  //image: string;
}