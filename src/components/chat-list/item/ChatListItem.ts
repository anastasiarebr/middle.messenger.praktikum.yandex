import { Block } from '../../../modules/Block';

import template from './item.hbs?raw';
import { IChats, chatController } from '../../../controllers/chat';
import store from '../../../utils/Store'

interface ChatListProps extends IChats {
  userId: string
}

export default class ChatListItem extends Block {
  constructor(props: ChatListProps) {
    super('div', {
      ...props,
      last_message: props.last_message?.content || '',
      events: {
        click: async () => {
          try {
            const token = await chatController.getChatToken(props.id)
            await chatController.openChat(props.userId, props.id, token)
            await chatController.getOldMessages()
            store.set('currentChatId', props.id)
            store.set('currentChatTitle', props.title)

          } catch (e) {
            console.error(e)
          }
        },
        
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
