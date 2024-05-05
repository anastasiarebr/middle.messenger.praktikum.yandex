import { Block } from '../../../modules/Block';
import template from './index.hbs?raw';

import { Dialog } from '../../dialog';
import { Title } from '../../title';
import store from '../../../utils/Store';
import { Input } from '../../../components/input/index';
import { Button } from '../../button';
import { chatController } from '../../../controllers/chat';

export interface MessagesSettingsItemProps extends CompileOptions {
    title: string,
    icon?: string,
    isShowPopup?: boolean
}

let userId = ''
let isShowPopup = false

const popupTitle = new Title({
  text: ''
})

const dialog = new Dialog({
  title: popupTitle,
  isShow: false,
  input: new Input({
    id: 'title',
    label: 'Название',
    name: 'title',
    type: 'text',
    value: userId,
    onUpdate: (value) => {      
      const inputWrapper = document.querySelector<HTMLDivElement>('#title');

      const labelElement = inputWrapper?.getElementsByTagName('label')[0];

      userId = value

      const hasLabelFilled = labelElement?.classList.contains('filled');

      if (userId === '') {
        labelElement?.classList.remove('filled');
      } else if (!hasLabelFilled) {
        labelElement?.classList.add('filled');
      }
    }
  }),
  button: new Button({
    value: 'Добавить',
    onClick: async () => {
      if(userId !== '') { 

        const chatId = (store.getState().currentChatId as string) || ''

        await chatController.addUsersToChat({
          users: [Number(userId)],
          chatId: Number(chatId)
        })
      }
    }
  }),
})

export default class MessagesSettingsItem extends Block {
  constructor(props: MessagesSettingsItemProps) {
    super('div', {
      ...props,
      isShow: false,
      dialog: dialog,
      isShowPopup: false,
      events: {
        click: (e: Event) => {
          if(isShowPopup) {
            if((e.target as HTMLElement)?.className === 'dialogWrapper') {
              dialog.setProps({
                isShow: false,
              })
              isShowPopup = false
            }
          } else {
            this.setProps({
              isShowPopup: true
            })
            popupTitle.setProps({
              text: props.title
            })
            isShowPopup = true
            dialog.setProps({
              isShow: true,
            })
          }
        },
      },
    })
  }

  render() {
    return this.compile(template, this.props);
  }
}
