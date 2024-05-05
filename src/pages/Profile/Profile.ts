import { Block } from '../../modules/Block';

import template from './index.hbs?raw';

import { Input } from '../../components/input/index.ts';
import { RouterLink } from '../../components/router-link/index.ts';
import { Button } from '../../components/button/index';
import { Notification } from '../../components/notification/index.ts';

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
    editButton?: Button
    saveButton?: Button
    linkExit: RouterLink,
    withInternalID?: boolean,
    isShowSettings: boolean,
    notification?: Notification,
    backLink: RouterLink
    
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
