import { Permission } from "../../shared/enums/permissions";

export interface Role {
  id: string;
  nome: string;
  permissoes: Permission[];
}

export type RoleDto = Omit<Role, 'id'>;