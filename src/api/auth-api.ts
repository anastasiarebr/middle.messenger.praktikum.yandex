import { HTTPTransport } from '../utils/HTTPTransport';
import { BaseAPI } from './base-api';
import { HTTP } from './urls'
import { Indexed } from '../utils/helpers';

const authAPIInstance = new HTTPTransport();

export class AuthAPI extends BaseAPI {
    async signup(data: Indexed) {
        return authAPIInstance.post(`${HTTP}/auth/signup`, {
            data,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(resp => resp);
    }

    async signin(data: Indexed) {
        return authAPIInstance.post(`${HTTP}/auth/signin`, {
            data,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    async getUser() {
        return authAPIInstance.get(`${HTTP}/auth/user`, {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        );
    }

    async logout() {
        return authAPIInstance.post(`${HTTP}/auth/logout`, {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        );
    }
}