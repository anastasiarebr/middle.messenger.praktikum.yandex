import { Block } from '../../modules/Block';

import template from './messages.hbs?raw';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';

export interface ChatListProps extends CompileOptions {
    logo: string,
    name: string,
    fileButton: Button,
    messageInput: Input,
    sendButton: Button,
}

export default class ChatList extends Block {
  constructor(props: ChatListProps) {
    super('div', {
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
