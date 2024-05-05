import template from './index.hbs?raw';
import { Block } from '../../modules/Block';
import { RouterLink } from '../../components/router-link/index';

export interface ErrorProps extends CompileOptions {
    code?: string,
    text?: string,
    hash?: string,
    link: RouterLink,
}

export default class Error extends Block {
    constructor(props: ErrorProps) {
      super('div', {
        ...props,
      });
    }
  
    render() {
        return this.compile(template, this.props);
    }
}
