import { Block } from '../../modules/Block';

import template from './chat-list.hbs?raw';
import { Input } from '../../components/input/index';
import { RouterLink } from '../../components/router-link';
import { ChatListItem } from './item/index'
import { Button } from '../button';
import { Dialog } from '../dialog';
import { Title } from '../title';
import { chatController, IChats } from '../../controllers/chat';
import store, { StoreEvents } from '../../utils/Store';
import { User } from '../../controllers/types';

export interface ChatListProps extends CompileOptions {
    profileLink: RouterLink,
    searchInput: Input,
    chats: Array<IChats>,
    currentUser: User
}

let newChatTitle = ''

const dialog = new Dialog({
  title: new Title({
    text: 'Введите название чата'
  }),
  input: new Input({
    id: 'title',
    label: 'Название',
    name: 'title',
    type: 'text',
    value: newChatTitle,
    onUpdate: (value) => {      
      const inputWrapper = document.querySelector<HTMLDivElement>('#title');

      const labelElement = inputWrapper?.getElementsByTagName('label')[0];

      newChatTitle = value

      const hasLabelFilled = labelElement?.classList.contains('filled');

      if (newChatTitle === '') {
        labelElement?.classList.remove('filled');
      } else if (!hasLabelFilled) {
        labelElement?.classList.add('filled');
      }
    }
  }),
  button: new Button({
    value: 'Добавить',
    onClick: async () => {
      if(newChatTitle !== '') {
        await chatController.createChat({
          title: newChatTitle
        })
      }
      
    }
  }),
  onClose: () => {
    newChatTitle = ''
  }
})

export default class ChatList extends Block {
  constructor(props: ChatListProps) {
    super('div', {
      ...props,
      chatsItems: props.chats.length > 0 ? props.chats.map((chat: IChats) => {
        return new ChatListItem({
          ...chat,
          userId: props.currentUser.id,
        })
      }) : [],
      addButtton: new Button({
        value: 'Добавить чат',
        onClick: () => {
          dialog.setProps({
            isShow: true
          })
        }
      }),
      dialog,
    });

    store.on(StoreEvents.Updated, () => {
      const chats = store.getState().chats as IChats[]
      const currentUser = store.getState().currentUser as User

      this.setProps({
        chatsItems: chats?.length > 0 ? chats?.map((chat: IChats) => {
          return new ChatListItem({
            ...chat,
            userId: currentUser?.id,
          })
        }) : [],
        currentUser
      })

      this.lists = {
       ...this.lists,
       chatsItems: chats?.length > 0 ? chats?.map((chat: IChats) => {
          return new ChatListItem({
            ...chat,
            userId: currentUser?.id,
          })
        }) : [],
      }
    })
  }

  render() {
    return this.compile(template, this.props);
  }
}
