export interface SignupRequest {
  firstName: string | undefined | null;
  lastName: string | undefined | null;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
