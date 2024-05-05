import { HTTPTransport } from '../utils/HTTPTransport';
import { BaseAPI } from './base-api';
import { HTTP } from './urls'
import { Indexed } from '../utils/helpers';

const userAPIInstance = new HTTPTransport();

export class UserAPI extends BaseAPI {
    async changeUserProfile(data: Indexed) {
        return userAPIInstance.put(`${HTTP}/user/profile`, {
            data,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(resp => resp);
    }

    async changeUserAvatar(data: FormData) {
        return userAPIInstance.put(`${HTTP}/user/profile/avatar`, {
            data,
        }).then(resp => resp);
    }

    async changeUserPassword(data: Indexed) {
        return userAPIInstance.put(`${HTTP}/user/password`, {
            data,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(resp => resp);
    }
}