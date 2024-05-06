import Title from '../../components/title/Title';
import { Button } from '../../components/button/index.ts';
import Input from '../../components/input/Input';
import { RouterLink } from '../../components/router-link';

import { user } from '../../user.ts';
import {
  inputUserField,
  emailValidator,
  loginValidator,
  nameValidator,
  phoneValidator,
  passwordValidator,
  passwordRepeatedValidator,
} from '../../helpers';
import Signup from './Signup.ts';
import { PATHS } from '../../consts.ts';
import { authController } from '../../controllers/auth.ts';
import { router } from '../../utils/Router.ts';
import { Notification, NOTIFICATION } from '../../components/notification/index.ts';

const notification = new Notification({
  isShow: false,
  text: '',
  type: NOTIFICATION.success
})

export const signup = new Signup({
  withInternalID: true,
  title: new Title({
    text: 'Регистрация',
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
  inputPassword: new Input({
    id: 'passwordField',
    name: 'password',
    label: 'Пароль',
    type: 'text',
    value: user.password,
    error: 'Неверный пароль',
    validator: passwordValidator,
    onUpdate: (value: string) => {
      inputUserField(value, 'password');
    },
  }),
  inputPasswordRepeated: new Input({
    id: 'passwordRepeatedField',
    name: 'password_repeated',
    label: 'Пароль (ещё раз)',
    type: 'text',
    value: user.password_repeated,
    error: 'Пароли не совпадают',
    validator: (value: string): boolean => passwordRepeatedValidator(value, user.password),
    onUpdate: (value: string) => {
      inputUserField(value, 'password_repeated');
    },
  }),
  button: new Button({
    value: 'Зарегистрироваться',
    onClick: async () => {
      const {
        login, password, first_name, second_name, phone, email, password_repeated,
      } = user;
      if (
        emailValidator(email)
        && loginValidator(login)
        && nameValidator(first_name)
        && nameValidator(second_name)
        && phoneValidator(phone)
        && passwordValidator(password)
        && passwordRepeatedValidator(password_repeated, password)
      ) {
        const data = { login, password, first_name, second_name, phone, email }

        try {
          const resp = await authController.createUser(data)

          const id = resp.response

          if(id) {
            router.go('/messenger')
          } else {
            const error = JSON.parse(resp.response);
            const errorText = error.reason || 'Произошла ошибка'
            const userInSystem = errorText === 'User already in system'

            if(userInSystem) {
              router.go(PATHS.chat)
            }
            
            notification.setProps({text: errorText})

            notification.showNotification()
          } 
        } catch (e) {
          notification.setProps({text: 'Произошла ошибка'})

          notification.showNotification()
        }

       
      } else {
        notification.setProps({text: 'Не все поля корректно заполнены'})
        notification.showNotification()
      }
    },
  }),
  link: new RouterLink({
    pathname: PATHS.login,
    text: 'Войти',
  }),
  notification,
});
