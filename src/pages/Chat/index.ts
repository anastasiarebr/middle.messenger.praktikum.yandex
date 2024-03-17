import Handlebars from 'handlebars'
import { Input } from '../../components/input/index.ts'
import { Link } from '../../components/link/index.ts'
import { Icon } from '../../components/icon/index.ts'
import { Button } from '../../components/button/index.ts'

import { Chats } from '../../components/chat-list/index.ts'
import { Messages } from '../../components/messages/index.ts'
import chevron from '../../icons/chevron.svg'

import { chatsList, IChats } from '../../chats.ts'

let search = ''

Handlebars.registerHelper('isFilled', function (value) {
    return value !== '';
});

Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('Icon', Icon);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('chevron', chevron);


const template = Handlebars.compile(Chats)
const templateMessages = Handlebars.compile(Messages)

const chats = (list: Array<IChats>) => template({chats: list})

document.querySelector<HTMLDivElement>('#chatList')!.innerHTML = chats([...chatsList]) 
document.querySelector<HTMLDivElement>('#messages')!.innerHTML = templateMessages({logo: '', name: 'Киноклуб'})

const inputSearch = document.querySelector<HTMLDivElement>('#search')
const inputWrapper = document.querySelector<HTMLDivElement>('#search')
const labelElement = inputWrapper?.getElementsByTagName('label')[0]
labelElement?.classList.remove('filled')

const inputField = function (e: Event) {
    search = (e.target as HTMLInputElement)?.value
    const hasLabelFilled = labelElement?.classList.contains('filled')

    if(search === '') {
        labelElement?.classList.remove('filled')
    } else if(!hasLabelFilled) {
        labelElement?.classList.add('filled')
    }
}

inputSearch?.addEventListener('input', (e) => inputField(e))

export default chats