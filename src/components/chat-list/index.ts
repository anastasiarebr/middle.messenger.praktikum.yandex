import Handlebars from 'handlebars';
import './style.scss'

Handlebars.registerHelper('isFilled', (value) => value !== '');

export { default as ChatList } from './ChatList';
