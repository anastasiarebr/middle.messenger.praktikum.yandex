import { Block } from '../../../modules/Block';

import template from './index.hbs?raw';
import { User } from '../../../controllers/types';
import store, { StoreEvents } from '../../../utils/Store'

interface Message {
  user_id?: string,
  chat_id?: string,
  content?: string,
  time?: string,
  className?: string
}

export interface MessageItemProps extends CompileOptions {
  messages?: Message[]
}

export default class MessageItems extends Block {
  constructor(props: MessageItemProps) {
    super('div', {
      ...props,
    });

    store.on(StoreEvents.Updated, () => {
      const userId = (store.getState().currentUser as User)?.id
      const messages = ((store.getState().messages || []) as Message[]).map((item: Message) => ({
        ...item, 
        className: (item.user_id === userId ? 'right' : 'left')
      })).sort((a, b) => Date.parse(a.time || '') - Date.parse(b.time || ''))
      this.setProps({
        messages
      })
    })
  }

  render() {
    return this.compile(template, this.props);
  }
}
