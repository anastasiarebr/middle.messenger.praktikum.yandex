import Handlebars from 'handlebars';
import './style.scss'

Handlebars.registerHelper('isFilled', (value) => value !== null);
Handlebars.registerHelper('hasNew', (value) => Boolean(value > 0));


export { default as ChatListItem } from './ChatListItem';
