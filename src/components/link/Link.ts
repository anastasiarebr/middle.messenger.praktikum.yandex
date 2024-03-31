import { compile } from 'handlebars';
import { Block } from '../../modules/Block';

import template from './link.hbs?raw';

export interface LinkProps extends CompileOptions {
    text: string,
    url: string,
    onClick?: (e: Event) => void
}

export default class Link extends Block {
  constructor(props: LinkProps) {
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
