import { UserAPI } from '../api/user-api';
import { Indexed } from "../utils/helpers";

const user = new UserAPI()

export interface User extends Indexed {
    id: string,
    first_name: string,
    second_name: string,
    display_name: string,
    phone: string,
    login: string,
    avatar: string,
    email: string
}

export interface UserCreate {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

export class UserController {
    public async changeUserProfile(data: Indexed): Promise<string> {
        try {
            const resp = await user.changeUserProfile(data)
            return resp as string
        } catch(e) {
            throw new Error(e as string)
        }
    }

    public async changeUserAvatar(data: FormData): Promise<string> {
        try {
            const resp = await user.changeUserAvatar(data)
            return resp as string
        } catch(e) {
            throw new Error(e as string)
        }
    }

    public async changeUserPassword(data: Indexed): Promise<string> {
        try {
            const resp = await user.changeUserPassword(data)
            return resp as string
        } catch(e) {
            throw new Error(e as string)
        }
    } 
} 

export const userController = new UserController()
