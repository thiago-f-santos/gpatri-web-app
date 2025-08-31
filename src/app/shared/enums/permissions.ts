export const ALL_PERMISSIONS = [
  'USUARIO_CADASTRAR', 'USUARIO_EDITAR', 'USUARIO_EXCLUIR', 'USUARIO_LISTAR',
  'CARGO_CADASTRAR', 'CARGO_EDITAR', 'CARGO_EXCLUIR', 'CARGO_LISTAR', 'CARGO_ATRIBUIR',
  'EMPRESTIMO_SOLICITAR', 'EMPRESTIMO_EDITAR', 'EMPRESTIMO_EXCLUIR', 'EMPRESTIMO_LISTAR',
  'EMPRESTIMO_LIBERAR', 'EMPRESTIMO_LISTAR_TODOS', 'EMPRESTIMO_EDITAR_TODOS', 'EMPRESTIMO_EXCLUIR_TODOS',
  'ITEM_PATRIMONIO_CADASTRAR', 'ITEM_PATRIMONIO_EDITAR', 'ITEM_PATRIMONIO_EXCLUIR', 'ITEM_PATRIMONIO_LISTAR',
  'PATRIMONIO_CADASTRAR', 'PATRIMONIO_EDITAR', 'PATRIMONIO_EXCLUIR', 'PATRIMONIO_LISTAR',
  'CATEGORIA_CADASTRAR', 'CATEGORIA_EDITAR', 'CATEGORIA_EXCLUIR', 'CATEGORIA_LISTAR',
] as const;

export type Permission = typeof ALL_PERMISSIONS[number];

export const PERMISSION_GROUPS = [
  { 
    name: 'Usuários', 
    permissions: ALL_PERMISSIONS.filter(p => p.startsWith('USUARIO_')) 
  },
  { 
    name: 'Cargos', 
    permissions: ALL_PERMISSIONS.filter(p => p.startsWith('CARGO_')) 
  },
  { 
    name: 'Empréstimos', 
    permissions: ALL_PERMISSIONS.filter(p => p.startsWith('EMPRESTIMO_')) 
  },
  { 
    name: 'Itens de Patrimônio', 
    permissions: ALL_PERMISSIONS.filter(p => p.startsWith('ITEM_PATRIMONIO_')) 
  },
  { 
    name: 'Patrimônio', 
    permissions: ALL_PERMISSIONS.filter(p => p.startsWith('PATRIMONIO_')) 
  },
  { 
    name: 'Categorias', 
    permissions: ALL_PERMISSIONS.filter(p => p.startsWith('CATEGORIA_')) 
  }
];