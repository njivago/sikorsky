import axios from 'axios';
import { makeAutoObservable } from "mobx";
import AuthService from "./authService";
import { IAuthResponse, IUser } from "./types";
import { API_URL } from "./http";
import socket from '@services/socket';

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isProcessing = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setProcessing(bool: boolean) {
        this.isProcessing = bool;
    }

    async login(username: string, password: string) {
        try {
            const response = await AuthService.login(username, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            console.log(response.data.user);
            
        } catch (e) {
            throw new Error(e.response?.data?.message);
        }
    }

    async registration(username: string, email: string, password: string) {
        try {
            const response = await AuthService.registration(username, password, email);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            console.log(response.data.user);
        } catch (e) {
            throw new Error(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            this.setAuth(false);
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setUser({} as IUser);
        } catch (e) {
            throw new Error(e.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setProcessing(true);

        try {
            const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            throw new Error(e.response?.data?.message);
        } finally {
            this.setProcessing(false);
        }
    }
}