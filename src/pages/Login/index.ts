import { user } from '../../user.ts';
import {
  inputUserField,
  loginValidator,
  passwordValidator,
} from '../../helpers';
import { Title } from '../../components/title/index.ts';
import { Button } from '../../components/button/index.ts';
import { Input } from '../../components/input/index.ts';
import { RouterLink } from '../../components/router-link/index.ts';
import Login from './Login.ts';
import { router } from '../../utils/Router.ts';
import './style.scss'
import { PATHS } from '../../consts.ts';
import { authController } from '../../controllers/auth.ts';
import { Notification, NOTIFICATION } from '../../components/notification/index.ts';
import { chatController } from '../../controllers/chat.ts';

const notification = new Notification({
  isShow: false,
  text: '',
  type: NOTIFICATION.success
})

export const login = new Login({
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
    onClick: async () => {
      const { login, password } = user;

      const data = { login, password }

      if (loginValidator(login) && passwordValidator(password)
      ) {
        try {
          const resp = await authController.signinUser(data)

          const isSuccess = resp.response === 'OK'
          
          if(isSuccess) {
            chatController.getChats()
            router.go(PATHS.chat)
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
        } catch (e: unknown) {
          notification.setProps({text: 'Произошла ошибка'})

          notification.showNotification()
        }
      } else {
        notification.setProps({text: 'Не все поля корректно заполнены'})

        notification.showNotification()

        throw new Error('Не все поля корректно заполнены');
      }
    },
  }),
  link: new RouterLink({
    pathname: PATHS.signup,
    text: 'Нет аккаунта?',
  }),
  notification,
});
