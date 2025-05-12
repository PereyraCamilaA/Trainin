export class Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  contraseña: string;
  esPremium: boolean;

  constructor(id: number, nombre: string, apellido: string, email: string, contraseña: string, esPremium: boolean) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.contraseña = contraseña;
    this.esPremium = esPremium;
  }
}