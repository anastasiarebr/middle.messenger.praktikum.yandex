import { compile } from 'handlebars';
import { Block } from '../../modules/Block';

import template from './icon.hbs?raw';

export interface IconProps extends CompileOptions {
    url: string,
    onClick?: (e: Event) => void
}

export default class Icon extends Block {
  constructor(props: IconProps) {
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
