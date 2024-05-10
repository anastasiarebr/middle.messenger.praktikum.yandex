import { Block } from '../../modules/Block.ts';
import { router } from '../../utils/Router.ts';
import template from './link.hbs?raw';

export interface RouterLinkProps extends CompileOptions {
    text: string,
    pathname: string,
    onClick?: (e: Event) => void
}

export default class RouterLink extends Block {
  constructor(props: RouterLinkProps) {
    super('div', {
      ...props,
      events: {
        click: (e: Event) => {
          if (props.onClick) {
            props.onClick(e);
          }

          if(!props.pathname) {
            return
          }

          router.go(props.pathname)
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
