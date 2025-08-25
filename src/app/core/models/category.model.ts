export interface Category {
  id: string;
  name: string;
  parentCategoryName?: string;
  parentId?: string;
}

export type CategoryDto = Omit<Category, 'id'>;