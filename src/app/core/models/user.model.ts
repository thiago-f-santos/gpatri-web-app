export interface User {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  cargo?: string;
  idCargo?: string;
}

export interface UserDto {
  nome: string;
  sobrenome: string;
  email: string;
  senha?: string;
}

export interface UserRoleDto {
  idCargo: string;
}