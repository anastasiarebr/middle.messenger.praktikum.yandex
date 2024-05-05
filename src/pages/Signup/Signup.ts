import { Block } from '../../modules/Block';

import template from './index.hbs?raw';

import Title from '../../components/title/Title';
import { Button } from '../../components/button/index.ts';
import Input from '../../components/input/Input';
import Link from '../../components/link/Link';
import { Notification } from '../../components/notification/index.ts';

export interface SignupProps extends CompileOptions {
  title: Title,
  inputLogin: Input,
  inputPassword: Input,
  inputEmail: Input,
  inputFirstName: Input,
  inputSecondName: Input,
  inputPhone: Input,
  inputPasswordRepeated: Input,
  button: Button,
  link: Link,
  withInternalID?: boolean,
  notification?: Notification,
}

export default class Signup extends Block {
  constructor(props: SignupProps) {
    super('div', {
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
