import { Block } from '../../modules/Block';
import template from './notification.hbs?raw';

export enum NOTIFICATION {
  success = 'success',
  error = 'error',
  warning = 'warning',
}

export interface NotificationProps extends CompileOptions {
    type: NOTIFICATION,
    text?: string,
    isShow: boolean,
    showTimeout?: number,
    onClose?: (e: Event) => void
}

export default class Notification extends Block {
  constructor(props: NotificationProps) {
    super('div', {
      ...props,
      events: {
        close: (e: Event) => {
          if (props.onClose) {
            props.onClose(e);
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  showNotification() {
    const timeout = (this.props.showTimeout as number) || 5000
    this.setProps({
      isShow: true
    })

    setTimeout(() => {
      this.setProps({
        isShow: false
      })
    }, timeout)
  }
}
