import Handlebars from 'handlebars'

Handlebars.registerHelper('isFilled', function (value) {
    return value !== '';
});

export { default as Chats } from './chat-list.hbs?raw'