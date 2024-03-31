import { Block } from '../../modules/Block';

import template from './title.hbs?raw';

export interface TitleProps extends CompileOptions {
    text: string,
    withInternalID?: boolean,
}

export default class Title extends Block {
  constructor(props: TitleProps) {
    super('div', {
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
