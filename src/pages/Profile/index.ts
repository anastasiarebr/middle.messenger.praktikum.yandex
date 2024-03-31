import { user } from '../../user.ts';
import {
  inputUserField,
  emailValidator,
  loginValidator,
  nameValidator,
  phoneValidator,
  passwordValidator,
} from '../../helpers';

import Input from '../../components/input/Input';
import Link from '../../components/link/Link';

import Profile from './Profile.ts';
import { render } from '../../utils/renderDOM';

const profile = new Profile({
  withInternalID: true,
  display_name: user.display_name,
  inputAvatar: new Input({
    id: 'avatarField',
    name: 'avatar',
    label: 'avatar',
    type: 'file',
    value: user.avatar,
    onUpdate: (value: string) => {
      inputUserField(value, 'avatar');
    },
  }),
  inputEmail: new Input({
    id: 'emailField',
    name: 'email',
    label: 'Почта',
    type: 'email',
    value: user.email,
    error: 'Неверный email',
    validator: emailValidator,
    onUpdate: (value: string) => {
      inputUserField(value, 'email');
    },
  }),
  inputLogin: new Input({
    id: 'loginField',
    name: 'login',
    label: 'Логин',
    type: 'text',
    value: user.login,
    error: 'Неверный логин',
    validator: loginValidator,
    onUpdate: (value: string) => {
      inputUserField(value, 'login');
    },
  }),
  inputFirstName: new Input({
    id: 'firstNameField',
    name: 'first_name',
    label: 'Имя',
    type: 'text',
    value: user.first_name,
    error: 'Неверное имя',
    validator: nameValidator,
    onUpdate: (value: string) => {
      inputUserField(value, 'first_name');
    },
  }),
  inputSecondName: new Input({
    id: 'secondNameField',
    name: 'second_name',
    label: 'Фамилия',
    type: 'text',
    value: user.second_name,
    error: 'Неверная фамилия',
    validator: nameValidator,
    onUpdate: (value: string) => {
      inputUserField(value, 'second_name');
    },
  }),
  inputDisplayName: new Input({
    id: 'displayNameField',
    name: 'display_name',
    label: 'Имя в чате',
    type: 'text',
    value: user.display_name,
    onUpdate: (value: string) => {
      inputUserField(value, 'display_name');
    },
  }),
  inputPhone: new Input({
    id: 'phoneField',
    name: 'phone',
    label: 'Телефон',
    type: 'text',
    value: user.phone,
    error: 'Неверный телефон',
    validator: phoneValidator,
    onUpdate: (value: string) => {
      inputUserField(value, 'phone');
    },
  }),
  inputOldPassword: new Input({
    id: 'oldPasswordField',
    name: 'oldPassword',
    label: 'Старый пароль',
    type: 'text',
    value: user.oldPassword,
    error: 'Неверный пароль',
    validator: passwordValidator,
    onUpdate: (value: string) => {
      inputUserField(value, 'oldPassword');
    },
  }),
  inputNewPassword: new Input({
    id: 'newPasswordField',
    name: 'newPassword',
    label: 'Старый пароль',
    type: 'text',
    value: user.newPassword,
    error: 'Неверный пароль',
    validator: passwordValidator,
    onUpdate: (value: string) => {
      inputUserField(value, 'newPassword');
    },
  }),
  linkData: new Link({
    url: '/src/pages/Profile/',
    text: 'Изменить данные',
    onClick: () => {
      const {
        login, oldPassword, newPassword, first_name, second_name, phone, email, password_repeated,
      } = user;
      if (
        emailValidator(email)
        && loginValidator(login)
        && nameValidator(first_name)
        && nameValidator(second_name)
        && phoneValidator(phone)
        && passwordValidator(oldPassword)
        && passwordValidator(newPassword)
      ) {
        console.log(user);
      } else {
        throw new Error('Не все поля корректно заполнены');
      }
    },
  }),
  linkPassword: new Link({
    url: '/src/pages/Profile/',
    text: 'Изменить пароль',
    onClick: () => {
      console.log('onClick');
    },
  }),
  linkExit: new Link({
    url: '/',
    text: 'Выйти',
    onClick: () => {
      console.log('onClick');
    },
  }),
});

render('#app', profile);
