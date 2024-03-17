import Handlebars from 'handlebars'
import { Input } from '../../components/input/index.ts'
import { Title } from '../../components/title/index.ts'
import { Button } from '../../components/button/index.ts'
import { Link } from '../../components/link/index.ts'

import ProfileForm from './index.hbs?raw'

import { user } from '../../user.ts'
import { inputUserField } from '../../helpers'
import { InputUserFieldIds } from '../../consts.ts'

interface Profile {
    login: string,
    password: string,
    email: string,
    first_name: string,
    second_name: string,
    display_name: string,
    phone: string,
    oldPassword: string,
    newPassword: string,
    avatar: string,
}

Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Title', Title);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Link', Link);


const template = Handlebars.compile(ProfileForm)

const profileForm = (profile: Profile) => template(profile)

document.querySelector<HTMLDivElement>('#app')!.innerHTML = profileForm({...user}) 

const inputAvatar = document.querySelector<HTMLDivElement>(InputUserFieldIds.avatar)
const inputLogin = document.querySelector<HTMLDivElement>(InputUserFieldIds.login)
const inputPassword = document.querySelector<HTMLDivElement>(InputUserFieldIds.password)
const inputEmail = document.querySelector<HTMLDivElement>(InputUserFieldIds.email)
const inputFirstName = document.querySelector<HTMLDivElement>(InputUserFieldIds.first_name)
const inputSecondName = document.querySelector<HTMLDivElement>(InputUserFieldIds.second_name)
const inputDisplayName = document.querySelector<HTMLDivElement>(InputUserFieldIds.display_name)
const inputPhone = document.querySelector<HTMLDivElement>(InputUserFieldIds.phone)
const inputOldPassword = document.querySelector<HTMLDivElement>(InputUserFieldIds.oldPassword)
const inputNewPassword = document.querySelector<HTMLDivElement>(InputUserFieldIds.newPassword)

inputAvatar?.addEventListener('input', (e) => inputUserField(e, 'avatar'))
inputLogin?.addEventListener('input', (e) => inputUserField(e, 'login'))
inputPassword?.addEventListener('input', (e) => inputUserField(e, 'password'))
inputEmail?.addEventListener('input', (e) => inputUserField(e, 'email'))
inputFirstName?.addEventListener('input', (e) => inputUserField(e, 'first_name'))
inputSecondName?.addEventListener('input', (e) => inputUserField(e, 'second_name'))
inputDisplayName?.addEventListener('input', (e) => inputUserField(e, 'display_name'))
inputPhone?.addEventListener('input', (e) => inputUserField(e, 'phone'))
inputOldPassword?.addEventListener('input', (e) => inputUserField(e, 'oldPassword'))
inputNewPassword?.addEventListener('input', (e) => inputUserField(e, 'newPassword'))

export default profileForm

