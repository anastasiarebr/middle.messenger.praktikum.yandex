import { Block } from '../../modules/Block';

import template from './messages.hbs?raw';
import { Button } from '../../components/button/index';
import Input from '../../components/input/Input';
import store, { StoreEvents } from '../../utils/Store'
import { MessageItems } from './items/index'
import { MessagesSettings } from '../messages-settings/index';

export interface MessagesProps extends CompileOptions {
    logo?: string,
    name?: string,
    fileButton?: Button,
    messageInput?: Input,
    sendButton?: Button,
    isEmpty?: boolean,
    messages?: MessageItems
}
export default class Messages extends Block {
  constructor(props: MessagesProps) {
    super('div', {
      chatSettings: new MessagesSettings({}),
      messages: new MessageItems({}),
      ...props,
    });

    store.on(StoreEvents.Updated, () => {
      this.setProps({
        isEmpty: !store.getState().currentChatId
      })
    })

    store.on(StoreEvents.Updated, () => {
      this.setProps({
        currentUser: store.getState().currentUser
      })
    })

    store.on(StoreEvents.Updated, () => {
      this.setProps({
        title: store.getState().currentChatTitle
      })
    })
  }

  render() {
    return this.compile(template, this.props);
  }
}
