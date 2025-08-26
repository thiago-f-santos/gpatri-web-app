export interface LoginRequest {
  email: string;
  senha?: string;
}

export interface LoginResponse {
  username: string;
  token: string;
  permissoes: string[];
}