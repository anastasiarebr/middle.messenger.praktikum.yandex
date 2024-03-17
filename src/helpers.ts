import { user } from './user'
import { InputUserFieldIds } from './consts'

export const inputUserField = function (e: Event, field: keyof typeof user) {
    
    const inputWrapper = document.querySelector<HTMLDivElement>(InputUserFieldIds[field])

    const labelElement = inputWrapper?.getElementsByTagName('label')[0]

    user[field] = (e.target as HTMLInputElement)?.value

    const hasLabelFilled = labelElement?.classList.contains('filled')

    if(user[field] === '') {
        labelElement?.classList.remove('filled')
    } else if(!hasLabelFilled) {
        labelElement?.classList.add('filled')
    }
}

