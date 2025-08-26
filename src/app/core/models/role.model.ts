export interface Role {
  id: string;
  nome: string;
  permissoes: string[];
}

export type RoleDto = Omit<Role, 'id'>;