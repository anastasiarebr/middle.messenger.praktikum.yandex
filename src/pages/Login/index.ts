import Handlebars from 'handlebars'

import { user } from '../../user.ts'
import { inputUserField } from '../../helpers'

import { Input } from '../../components/input/index.ts'
import { Title } from '../../components/title/index.ts'
import { Button } from '../../components/button/index.ts'
import { Link } from '../../components/link/index.ts'

import LoginForm from './index.hbs?raw'

Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Title', Title);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Link', Link);

const template = Handlebars.compile(LoginForm)

const loginForm = (login: string, password: string) => template({login, password})

document.querySelector<HTMLDivElement>('#app')!.innerHTML = loginForm(user.login, user.password)

const inputLogin = document.querySelector<HTMLDivElement>('#login')
const inputPassword = document.querySelector<HTMLDivElement>('#password')

inputLogin?.addEventListener('input', (e) => inputUserField(e, 'login'))
inputPassword?.addEventListener('input', (e) => inputUserField(e, 'password'))

export default loginForm