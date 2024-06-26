export enum Fields {
    login = 'login',
    password = 'password',
}

export enum InputUserFieldIds {
    avatar = '#avatarField',
    login = '#loginField',
    password = '#passwordField',
    email = '#emailField',
    first_name = '#firstNameField',
    second_name = '#secondNameField',
    display_name = '#displayNameField',
    phone = '#phoneField',
    password_repeated = '#passwordRepeatedField',
    oldPassword = '#oldPasswordField',
    newPassword = '#newPasswordField',
}

export enum PATHS {
    login = '/',
    profile = '/settings',
    signup = '/sign-up',
    chat = '/messenger',
    error = '/500',
    all = '*',
}
