export const API_URL = 'http://localhost:5000';

export const getApiUrl = (path: string) => `${API_URL}${path}`;

export interface Response<T> {
  data: T;
  message: string;
}
