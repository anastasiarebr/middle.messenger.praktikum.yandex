import { Block } from '../../modules/Block';
import template from './index.hbs?raw';

import { MessagesSettingsItem, TYPES } from './item/index'
import { chatController } from '../../controllers/chat';

export interface MessagesSettingsProps extends CompileOptions {
    isShowItems?: boolean,
    onClose?: () => void
}

const settings = [
  {
    title: 'Добавить пользователя',
    type: TYPES.add,
    action: ({users, chatId}: {users: number[], chatId: number}) => {
      chatController.addUsersToChat({
        users,
        chatId
    })
  }
  },
  {
    title: 'Удалить пользователя',
    type: TYPES.delete,
    action: ({users, chatId}: {users: number[], chatId: number}) => {
      chatController.deleteUserFromChat({
        users,
        chatId
    })
  }
  },
]

export default class MessagesSettings extends Block {
  constructor(props: MessagesSettingsProps) {
    super('div', {
      ...props,
      isShowItems: false,
      items: settings.map(item => {
        return new MessagesSettingsItem({...item})
      }),
      className: 'messagesSetting',
      events: {
        click: (e: Event) => {

          if(['messagesSetting', 'messagesSettingOpen'].includes((e.target as HTMLElement)?.className)) {
            this.setProps({
              isShowItems: !this.props.isShowItems,
              className: this.props.isShowItems ? 'messagesSetting' : 'messagesSettingOpen',
            })

            if(props.onClose) {
              props.onClose()
            }

            
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
