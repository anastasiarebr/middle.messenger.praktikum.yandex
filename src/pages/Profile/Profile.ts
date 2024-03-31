import { Block } from '../../modules/Block';

import template from './index.hbs?raw';

import Input from '../../components/input/Input';
import Link from '../../components/link/Link';

export interface ProfileProps extends CompileOptions {
    inputAvatar: Input,
    display_name: string,
    inputLogin: Input,
    inputDisplayName: Input,
    inputOldPassword: Input,
    inputEmail: Input,
    inputFirstName: Input,
    inputSecondName: Input,
    inputPhone: Input,
    inputNewPassword: Input,
    linkData: Link,
    linkPassword: Link,
    linkExit: Link,
    withInternalID?: boolean,
}

export default class Profile extends Block {
  constructor(props: ProfileProps) {
    super('div', {
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
