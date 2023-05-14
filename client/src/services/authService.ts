import $api from "./http";
import { AxiosResponse } from 'axios';
import type { IAuthResponse } from "./types";

export default class AuthService {
  static async login(username: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/login', { username, password });
  };

  static async registration(username:string, email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/registration', { username, password, email });
  };

  static async logout(): Promise<void> {
    return $api.post('/logout');
  };
};