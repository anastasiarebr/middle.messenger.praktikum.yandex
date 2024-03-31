import { chatsList } from '../../chats.ts';

import Messages from '../../components/messages/Messages';
import ChatList from '../../components/chat-list/ChatList';
import Input from '../../components/input/Input';
import Link from '../../components/link/Link';
import Button from '../../components/button/Button';
import { emptyValidator } from '../../helpers.ts';
import { render } from '../../utils/renderDOM';
import { user } from '../../user.ts';

const search = '';
const message = '';

const chatList = new ChatList({
  profileLink: new Link({
    url: '/src/pages/Profile/',
    text: 'Профиль',
  }),
  chats: chatsList,
  searchInput: new Input({
    id: 'search',
    name: 'search',
    label: 'Поиск',
    type: 'text',
    value: search,
  }),
});

const messages = new Messages({
  logo: user.avatar,
  name: user.display_name,
  fileButton: new Button({
    value: '',
    onClick: () => {
      console.log('onClick');
    },
  }),
  messageInput: new Input({
    id: 'messageInput',
    name: 'message',
    label: 'Сообщение',
    type: 'text',
    value: message,
    error: 'Пустое сообщение',
    validator: emptyValidator,
  }),
  sendButton: new Button({
    value: 'Отправить',
    onClick: () => {
      console.log({
        message,
      });
    },
  }),
});

render('#chatList', chatList);
render('#messages', messages);
