import axios, { AxiosInstance } from 'axios';
import { BNET_URL } from '../../shared/config';
class Http {
  private static _instance = new Http();

  private httpInstance: AxiosInstance;

  private authorization: string;

  private battlenetNamespace: string;

  constructor() {
    this.httpInstance = axios.create({
      baseURL: BNET_URL,
      withCredentials: true,
    });

    this.authorization = '';
    this.battlenetNamespace = '';

    this.httpInstance.interceptors.request.use((config) => {
      if (this.authorization) {
        config.headers!['Authorization'] = this.authorization;
      }

      if (this.battlenetNamespace) {
        config.headers!['Battlenet-Namespace'] = this.battlenetNamespace;
      }

      config.headers!['locale'] = 'ko_KR';

      return config;
    });

    this.httpInstance.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err?.response?.data?.errorMessage) {
          err.message = err?.response?.data?.errorMessage || err.message;
        }
        return Promise.reject(err);
      },
    );
  }

  static get instance() {
    return this._instance;
  }

  setAuthorization(authorization: string) {
    this.authorization = authorization;
  }

  setBattlenetNamespace(namespace: string) {
    this.battlenetNamespace = namespace;
  }

  async get<T>(url: string, config?: { params?: any; headers?: any }): Promise<T> {
    const res = await this.httpInstance.get<T>(url, config);
    return res?.data;
  }
}

const http = Http.instance;

export { http };
