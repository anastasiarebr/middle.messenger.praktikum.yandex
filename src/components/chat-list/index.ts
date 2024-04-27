import Handlebars from 'handlebars';

Handlebars.registerHelper('isFilled', (value) => value !== '');

export { default as Chats } from './chat-list.hbs?raw';
