import { Block } from '../../modules/Block';

import template from './index.hbs?raw';

import Messages from '../../components/messages/Messages';
import ChatList from '../../components/chat-list/ChatList';

export interface ChatProps extends CompileOptions {
    chatList: ChatList,
    messages: Messages
}

export default class Login extends Block {
  constructor(props: ChatProps) {
    super('div', {
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
