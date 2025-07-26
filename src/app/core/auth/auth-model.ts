export interface SignupRequest {
  firstName: string | undefined | null;
  lastName: string | undefined | null;
  email: string;
  password: string;
}
