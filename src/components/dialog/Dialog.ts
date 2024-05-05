import { Block } from '../../modules/Block';
import template from './dialog.hbs?raw';
import { Input } from '../input';
import { Button } from '../button';
import { Title } from '../title';

export interface DialogProps extends CompileOptions {
    title: Title
    input?: Input
    button?: Button
    isShow?: boolean,
    onClose?: () => void
}

export default class Dialog extends Block {
  constructor(props: DialogProps) {
    super('div', {
      ...props,
      events: {
        click: (e: Event) => {
          if((e.target as HTMLElement)?.className === 'dialogWrapper') {
            this.setProps({
              isShow: false
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
