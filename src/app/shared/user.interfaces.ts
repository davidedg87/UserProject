export interface Indirizzo {
  via: string;
  citta: string;
  numero: string;
}


export interface User {
  name: string;
  username: string;
  email: string;
  telefono: string;
  indirizzo : Indirizzo;
}
