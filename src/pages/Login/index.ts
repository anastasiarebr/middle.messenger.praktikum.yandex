import { render } from '../../utils/renderDOM';
import { user } from '../../user.ts';
import {
  inputUserField,
  loginValidator,
  passwordValidator,
} from '../../helpers';
import Title from '../../components/title/Title';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Link from '../../components/link/Link';
import Login from './Login.ts';

const login = new Login({
  withInternalID: true,
  title: new Title({
    text: 'Вход',
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
  inputPassword: new Input({
    id: 'passwordField',
    name: 'password',
    label: 'Пароль',
    type: 'password',
    value: user.password,
    error: 'Неверный пароль',
    validator: passwordValidator,
    onUpdate: (value: string) => {
      inputUserField(value, 'password');
    },
  }),
  button: new Button({
    value: 'Войти',
    onClick: () => {
      const { login, password } = user;

      if (loginValidator(login) && passwordValidator(password)
      ) {
        console.log({
          login,
          password,
        });
      } else {
        throw new Error('Не все поля корректно заполнены');
      }
    },
  }),
  link: new Link({
    url: '/src/pages/Signup/',
    text: 'Нет аккаунта?',
    onClick: () => {
      console.log('from onClick');
    },
  }),
});

render('#app', login);
