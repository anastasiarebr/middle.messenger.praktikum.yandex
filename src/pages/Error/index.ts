import Error from './Error.ts'
import { RouterLink } from '../../components/router-link/index.ts';
import { PATHS } from '../../consts.ts';

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
  },
];

const errors = new Map(errorsArr.map((item) => [item.code, item]));
const currentError = (code: string) => [...errors.keys()].includes(code)
  ? errors.get(code) : errors.get('#404')

export const error = (code: string = '404') => new Error({
  ...currentError(code),
  link: new RouterLink({
    pathname: PATHS.chat,
    text: 'Назад к чатам',
  }),
})
