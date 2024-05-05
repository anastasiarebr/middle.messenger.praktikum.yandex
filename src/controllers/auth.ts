import { AuthAPI } from "../api/auth-api";
import { Indexed } from "../utils/helpers";
import store from '../utils/Store'
import { HTTP } from "../api/urls";
import { router } from "../utils/Router";
import { PATHS } from "../consts";

const auth = new AuthAPI()

export interface UserCreate {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

export class AuthController {
    public async getUser() {
        try {
            const resp = await auth.getUser() as XMLHttpRequest
            const user = resp.response

            if(resp.status === 401) {
                router.go(PATHS.login)
            }

            store.on('updated', () => {
                console.log('')
            })

            if(user) {
                const userObject = JSON.parse(user)
                store.set('currentUser', {
                    ...userObject,
                    avatar: userObject.avatar ? `${HTTP}/resources/${userObject.avatar}` : null
                })
            }
            return user
        } catch(e) {
            throw new Error(e as string)
        }
    }

    public async createUser(data: Indexed): Promise<XMLHttpRequest> {
        if(!data) {
            throw new Error('Нет данных')
        }

        try {
            const resp = await auth.signup(data)
            return resp as XMLHttpRequest
        } catch(e) {
            throw new Error(e as string)
        }
        
    }

    public async signinUser(data: Indexed): Promise<XMLHttpRequest> {
        if(!data) {
            throw new Error('Нет данных')
        }

        try {
            const resp = await auth.signin(data)
            return resp as XMLHttpRequest
        } catch(e) {
            throw new Error(e as string)
        }
    }

    public async logoutUser(): Promise<XMLHttpRequest> {
        try {
            const resp = await auth.logout()
            return resp as XMLHttpRequest
        } catch(e) {
            throw new Error(e as string)
        }
    }
} 

export const authController = new AuthController()
