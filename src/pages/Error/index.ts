import Handlebars from 'handlebars'
import { Link } from '../../components/link/index.ts'

import Error from './index.hbs?raw'

Handlebars.registerPartial('Link', Link);

const windowHash = window.location.hash

const errorsArr = [
    {
        hash: '#404',
        code: '404',
        text: 'Не туда попали',
    },
    {
        hash: '#500',
        code: '500',
        text: 'Мы уже фиксим',
    }
]

const errors = new Map(errorsArr.map((item) => [item.hash, item]))

const template = Handlebars.compile(Error)

const error = () => template([...errors.keys()].includes(windowHash) 
? errors.get(windowHash): errors.get('#404'))


document.querySelector<HTMLDivElement>('#app')!.innerHTML = error() 

export default error