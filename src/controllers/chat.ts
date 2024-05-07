import { ChatAPI } from '../api/chat-api';
import store from '../utils/Store'
import { router } from '../utils/Router';
import { PATHS } from '../consts';

const chat = new ChatAPI()

export interface IChats {
    id: string,
    title: string,
    avatar: string,
    unread_count: string,
    created_by: string,
    last_message: {
      user: {
        first_name: string,
        second_name: string,
        avatar: string,
        email: string,
        login: string,
        phone: string
      },
      time: string,
      content: string
    }
  }

export class ChatController {
    public async getChats(): Promise<IChats[]> {
        try {
            const resp = await chat.getChats() as XMLHttpRequest
            let chats = [] as IChats[]

            if(resp.status === 401) {
                router.go(PATHS.login)
            }

            if(resp?.response) {
                chats =  JSON.parse(resp?.response)
            }

            return chats || []
            
        } catch(e) {
            console.error(e)
            throw new Error('Error')
        }
    }

    public async createChat(data: { title: string }): Promise<void> {
        try {
            await chat.createChat(data)
            
        } catch(e) {
            console.error(e)
        }
    }

    public async openChat(userId: string, chatId: string, token: string) {
        try {
            await chat.getChat(userId, chatId, token)
            chat
            
        } catch (e) {
            throw new Error('error')
        }
    }

    public async getOldMessages(content: number = 0) {
        chat.sendMessage(content.toString(), 'get old');
    
        chat.on('message', (data: unknown) => {
          if (Array.isArray(data)) {
            store.set('messages', data);
          } else {
            this.getOldMessages();
          }
        });
      }

    public async sendMessage(message: string) {
        try {
            await chat.sendMessage(message, 'message')
        } catch (e) {
            throw new Error('error')
        }
    }

    public async getChatToken(chatId: string): Promise<string> {
        try {
            const res = await chat.getChatToken(chatId) as XMLHttpRequest
            return JSON.parse(res?.response).token || ''
        } catch (e) {
            throw new Error('error')
        }
    }

    public async addUsersToChat(data: {
        users: number[],
        chatId: number,
    }): Promise<void> {
        try {
            await chat.addUsersToChat(data) as XMLHttpRequest
        } catch (e) {
            throw new Error('error')
        }
    }

    public async deleteUserFromChat(data: {
        users: number[],
        chatId: number,
    }): Promise<void> {
        try {
            await chat.deleteUsersFromChat(data) as XMLHttpRequest
        } catch (e) {
            throw new Error('error')
        }
    }
} 

export const chatController = new ChatController()
