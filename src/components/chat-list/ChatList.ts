import { Block } from '../../modules/Block';

import template from './chat-list.hbs?raw';
import Input from '../../components/input/Input';
import Link from '../../components/link/Link';
import { IChats } from '../../chats';

export interface ChatListProps extends CompileOptions {
    profileLink: Link,
    searchInput: Input,
    chats: Array<IChats>
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
