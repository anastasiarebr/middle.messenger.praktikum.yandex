import { HTTPTransport } from '../utils/HTTPTransport';
import { WSTransport } from '../utils/WSTransport'
import { BaseAPI } from './base-api';
import { HTTP, WS } from './urls'

const chatAPIInstance = new HTTPTransport();
let chatAPIInstanceWS: WSTransport | null = null

export class ChatAPI extends BaseAPI {
    async getChats() {
        return chatAPIInstance.get(`${HTTP}/chats`, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(resp => resp);
    }

    async getChat(userId: string, chatId: string, token: string) {
        const url = `${WS}/${userId}/${chatId}/${token}`
        chatAPIInstanceWS = new WSTransport(url)
        return chatAPIInstanceWS.connect()
    }

    async sendMessage(content: string, type: string) {
        if(!chatAPIInstanceWS) {
            return
        }

        return chatAPIInstanceWS.send({
            content,
            type
        })
    }

    async on(event: string, data: (data: unknown) => void) {
        return chatAPIInstanceWS?.on(event, data)
    }

    async createChat(data: {
        title: string
    }) {
        return chatAPIInstance.post(`${HTTP}/chats`, {
            data,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(resp => resp);
    }

    async getChatToken(id: string) {
        return chatAPIInstance.post(`${HTTP}/chats/token/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(resp => resp);
    }

    async addUsersToChat(data: {
        users: number[],
        chatId: number
    }) {
        return chatAPIInstance.put(`${HTTP}/chats/users`, {
            data,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(resp => resp);
    }

    async deleteUsersFromChat(data: {
        users: number[],
        chatId: number
    }) {
        return chatAPIInstance.delete(`${HTTP}/chats/users`, {
            data,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(resp => resp);
    }
}
