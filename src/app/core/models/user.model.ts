export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: string;
}

export type UserDto = Omit<User, 'id'>;