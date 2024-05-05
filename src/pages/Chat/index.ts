import { Messages } from '../../components/messages/index.ts';
import { ChatList } from '../../components/chat-list/index.ts';
import { Input } from '../../components/input/index.ts';
import { RouterLink } from '../../components/router-link/index.ts';
import { Button } from '../../components/button/index.ts';
import { emptyValidator } from '../../helpers.ts';
import { user } from '../../user.ts';
import Chat from './Chat.ts'
import { PATHS } from '../../consts.ts';
import './style.scss'
import { chatController, IChats } from '../../controllers/chat';
import { authController } from '../../controllers/auth.ts';
import { router } from '../../utils/Router.ts';

const search = '';
let message = '';

let currentUser: string = ''
let chats: IChats[] = []

const requests = async () => {
  try {
    currentUser = await authController.getUser()
    if(!currentUser) {
      router.go('/')
      return
    }
    chats = await chatController.getChats()
  } catch (error) {
    console.error(error)
  }
}

await requests()

const chatList = new ChatList({
  profileLink: new RouterLink({
    pathname: PATHS.profile,
    text: 'Профиль',
  }),
  chats: chats,
  searchInput: new Input({
    id: 'search',
    name: 'search',
    label: 'Поиск',
    type: 'text',
    value: search,
  }),
  currentUser: currentUser ? JSON.parse(currentUser) : undefined
});

const messages = new Messages({
  isEmpty: true,
  logo: user.avatar,
  name: user.display_name,
  messageInput: new Input({
    id: 'messageInput',
    name: 'messageInput',
    label: 'Сообщение',
    type: 'text',
    value: message,
    error: 'Пустое сообщение',
    validator: emptyValidator,
    onUpdate: (value) => {
      const inputWrapper = document.querySelector<HTMLDivElement>('#messageInput');

      const labelElement = inputWrapper?.getElementsByTagName('label')[0];

      message = value
      
      const hasLabelFilled = labelElement?.classList.contains('filled');

      if (message === '') {
        labelElement?.classList.remove('filled');
      } else if (!hasLabelFilled) {
        labelElement?.classList.add('filled');
      }

      
    }
  }),
  sendButton: new Button({
    value: 'Отправить',
    onClick: async () => {
      if(message === '') {
        return
      }
      await chatController.sendMessage(message)

      const inputWrapper = document.querySelector<HTMLDivElement>('#messageInput');
      const labelElement = inputWrapper?.getElementsByTagName('label')[0];
      const input = inputWrapper?.querySelector('input')

      if(input) {
        input.value = ''
        labelElement?.classList.remove('filled');
      }
    },
  }),
});


export const chat = new Chat({
  chatList,
  messages,
})
