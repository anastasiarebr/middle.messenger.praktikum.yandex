import Handlebars from 'handlebars'
import { Input } from '../../components/input/index.ts'
import { Title } from '../../components/title/index.ts'
import { Button } from '../../components/button/index.ts'
import { Link } from '../../components/link/index.ts'

import SignupForm from './index.hbs?raw'

import { user } from '../../user.ts'
import { inputUserField } from '../../helpers'
import { InputUserFieldIds } from '../../consts.ts'

interface Signup {
    login: string,
    password: string,
    email: string,
    first_name: string,
    second_name: string,
    phone: string,
    password_repeated: string,
}

Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Title', Title);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Link', Link);


const template = Handlebars.compile(SignupForm)

const signupForm = (thisUser: Signup) => template(thisUser)

document.querySelector<HTMLDivElement>('#app')!.innerHTML = signupForm({...user}) 

const inputLogin = document.querySelector<HTMLDivElement>(InputUserFieldIds.login)
const inputPassword = document.querySelector<HTMLDivElement>(InputUserFieldIds.password)
const inputEmail = document.querySelector<HTMLDivElement>(InputUserFieldIds.email)
const inputFirstName = document.querySelector<HTMLDivElement>(InputUserFieldIds.first_name)
const inputSecondName = document.querySelector<HTMLDivElement>(InputUserFieldIds.second_name)
const inputPhone = document.querySelector<HTMLDivElement>(InputUserFieldIds.phone)
const inputPasswordRepeated = document.querySelector<HTMLDivElement>(InputUserFieldIds.password_repeated)

inputLogin?.addEventListener('input', (e) => inputUserField(e, 'login'))
inputPassword?.addEventListener('input', (e) => inputUserField(e, 'password'))
inputEmail?.addEventListener('input', (e) => inputUserField(e, 'email'))
inputFirstName?.addEventListener('input', (e) => inputUserField(e, 'first_name'))
inputSecondName?.addEventListener('input', (e) => inputUserField(e, 'second_name'))
inputPhone?.addEventListener('input', (e) => inputUserField(e, 'phone'))
inputPasswordRepeated?.addEventListener('input', (e) => inputUserField(e, 'password_repeated'))

export default signupForm

