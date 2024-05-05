import { user } from '../../user.ts';
import {
  inputUserField,
  emailValidator,
  loginValidator,
  nameValidator,
  phoneValidator,
  passwordValidator,
} from '../../helpers';
import './style.scss'

import Input from '../../components/input/Input';
import { RouterLink } from '../../components/router-link';
import { PATHS } from '../../consts.ts';
import Profile from './Profile.ts';
import store, { StoreEvents } from '../../utils/Store.ts';
import { Button } from '../../components/button/index.ts';
import { User, userController } from '../../controllers/user.ts';
import { Notification, NOTIFICATION } from '../../components/notification/index.ts';
import { authController } from '../../controllers/auth.ts';

const notification = new Notification({
  isShow: false,
  text: '',
  type: NOTIFICATION.success
})

const showValidErrorPopup = (text: string) => {
  notification.setProps({text})
  notification.showNotification()
}

const inputAvatar = new Input({
  id: 'avatarField',
  name: 'avatar',
  label: '',
  type: 'file',
  value: user.avatar,
  onUpdate: (value: string) => {
    inputUserField(value, 'avatar');
  },
})

const inputEmail = new Input({
  id: 'emailField',
  name: 'email',
  label: 'Почта',
  type: 'email',
  value: '',
  isDisabled: true,
  error: 'Неверный email',
  validator: emailValidator,
  onUpdate: (value: string) => {
    inputUserField(value, 'email');
  },
})

const inputLogin = new Input({
  id: 'loginField',
  name: 'login',
  label: 'Логин',
  type: 'text',
  value: user.login,
  error: 'Неверный логин',
  isDisabled: (store.getState().isDisabledProfile as boolean),
  validator: loginValidator,
  onUpdate: (value: string) => {
    inputUserField(value, 'login');
  },
})

const inputFirstName = new Input({
  id: 'firstNameField',
  name: 'first_name',
  label: 'Имя',
  type: 'text',
  value: user.first_name,
  error: 'Неверное имя',
  isDisabled: (store.getState().isDisabledProfile as boolean),
  validator: nameValidator,
  onUpdate: (value: string) => {
    inputUserField(value, 'first_name');
  },
})

const inputSecondName = new Input({
  id: 'secondNameField',
  name: 'second_name',
  label: 'Фамилия',
  type: 'text',
  value: user.second_name,
  error: 'Неверная фамилия',
  isDisabled: (store.getState().isDisabledProfile as boolean),
  validator: nameValidator,
  onUpdate: (value: string) => {
    inputUserField(value, 'second_name');
  },
})

const inputDisplayName = new Input({
  id: 'displayNameField',
  name: 'display_name',
  label: 'Имя в чате',
  type: 'text',
  value: user.display_name,
  isDisabled: (store.getState().isDisabledProfile as boolean),
  onUpdate: (value: string) => {
    inputUserField(value, 'display_name');
  },
})

const inputPhone = new Input({
  id: 'phoneField',
  name: 'phone',
  label: 'Телефон',
  type: 'text',
  value: user.phone,
  error: 'Неверный телефон',
  isDisabled: (store.getState().isDisabledProfile as boolean),
  validator: phoneValidator,
  onUpdate: (value: string) => {
    inputUserField(value, 'phone');
  },
})

const inputOldPassword = new Input({
  id: 'oldPasswordField',
  name: 'oldPassword',
  label: 'Старый пароль',
  type: 'text',
  value: user.oldPassword,
  error: 'Неверный пароль',
  isDisabled: (store.getState().isDisabledProfile as boolean),
  validator: passwordValidator,
  onUpdate: (value: string) => {
    inputUserField(value, 'oldPassword');
  },
})

const inputNewPassword = new Input({
  id: 'newPasswordField',
  name: 'newPassword',
  label: 'Новый пароль',
  type: 'text',
  value: user.newPassword,
  error: 'Неверный пароль',
  isDisabled: store.getState().isDisabledProfile as boolean,
  validator: passwordValidator,
  onUpdate: (value: string) => {
    inputUserField(value, 'newPassword');
  },
})

const editButton = new Button({
  value: 'Изменить данные',
  onClick: () => {
    store.set('isDisabledProfile', false)
    editButton.hide()
    saveButton.show()
  },
})

const saveButton = new Button({
  value: 'Сохранить',
  onClick: async () => {
    const form = document.querySelector('form')

    const formData = new FormData(form as HTMLFormElement)

    let profileObject = {} as User
    let passwordObject = {} as {
      oldPassword: string,
      newPassword: string,
    }

    let avatarObject = new FormData()

    formData.forEach((value: FormDataEntryValue, key: string) => {
      if(['oldPassword', 'newPassword'].includes(key)) {
        passwordObject = {
          ...passwordObject,
          [key]: value
        }
      } else if (key === 'avatar') {
        avatarObject.append('avatar', value)
      } else {
        profileObject = {
          ...profileObject,
          [key]: value
        }
      }
    });

    const {email, login, first_name, second_name, phone} = profileObject

    const errorText = 'Не все поля корректно заполнены'
    if (
      emailValidator(email)
      && loginValidator(login)
      && nameValidator(first_name)
      && nameValidator(second_name)
      && phoneValidator(phone)
    ) {
      await userController.changeUserProfile(profileObject)
    } else {
      showValidErrorPopup(errorText)
      throw new Error(errorText);
    }

    const { oldPassword, newPassword } = passwordObject

    if(passwordObject.newPassword) {
      if(passwordValidator(oldPassword) && passwordValidator(newPassword)) {
        await userController.changeUserPassword(passwordObject)
      }
      else {
        showValidErrorPopup(errorText)
        throw new Error(errorText);
      }
    }

    if((avatarObject.get('avatar') as File)?.size) {
      await userController.changeUserAvatar(avatarObject)
    }

    await authController.getUser()

    notification.setProps({text: 'Данные успешно обновлены'})
    notification.showNotification()

    
  }
})

let currentUser = undefined as User | undefined
store.on(StoreEvents.Updated, () => {
  currentUser = store.getState().currentUser as User
})

saveButton.hide()

export const profile = new Profile({
  withInternalID: true,
  display_name: currentUser?.display_name || '',
  inputAvatar: inputAvatar,
  isShowSettings: false,
  inputEmail,
  inputLogin,
  inputFirstName,
  inputSecondName,
  inputDisplayName,
  inputPhone,
  inputOldPassword,
  inputNewPassword,
  editButton,
  saveButton,
  linkExit: new RouterLink({
    pathname: PATHS.login,
    text: 'Выйти',
    onClick: async () => {
      await authController.logoutUser()
    },
  }),
  backLink: new RouterLink({
    pathname: PATHS.chat,
    text: '<-',
  }),
  notification,
});

store.on(StoreEvents.Updated, () => {
  const isDisabled = store.getState().isDisabledProfile
  if(currentUser) {
    inputAvatar.setPropsInput({
      value: currentUser.avatar,
      isDisabled
    })
    inputEmail.setPropsInput({
      value: currentUser.email,
      isDisabled
    })
    inputLogin.setPropsInput({
      value: currentUser.login,
      isDisabled,
    })
    inputFirstName.setPropsInput({
      value: currentUser.first_name,
      isDisabled,
    })
    inputSecondName.setPropsInput({
      value: currentUser.second_name,
      isDisabled,
    })
    inputDisplayName.setPropsInput({
      value: currentUser.display_name || '',
      isDisabled,
    })
    inputPhone.setPropsInput({
      value: currentUser.phone,
      isDisabled,
    })

    inputOldPassword.setPropsInput({
      isDisabled,
    })
    inputNewPassword.setPropsInput({
      isDisabled,
    })

    profile.setProps({
      isShowSettings: true,
    })

  }
})

store.set('isDisabledProfile', true)
