import { Block } from '../../modules/Block';
import template from './button.hbs?raw';

export interface ButtonProps extends CompileOptions {
    value?: string,
    onClick?: (e: Event) => void
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super('div', {
      ...props,
      events: {
        click: (e: Event) => {
          if (props.onClick) {
            props.onClick(e);
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
