import { Block } from '../../modules/Block';

import template from './index.hbs?raw';

import Title from '../../components/title/Title';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Link from '../../components/link/Link';

export interface LoginProps extends CompileOptions {
    title: Title,
    inputLogin: Input,
    inputPassword: Input,
    button: Button,
    link: Link,
    withInternalID?: boolean,
}

export default class Login extends Block {
  constructor(props: LoginProps) {
    super('div', {
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
