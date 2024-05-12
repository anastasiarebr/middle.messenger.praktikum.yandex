import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<main id="app"></main>', { url: 'https://localhost:3000/' });

global.window = jsdom.window
global.document = jsdom.window.document
global.FormData = jsdom.window.FormData
