import Handlebars from 'handlebars';
import { Block } from '../../../modules/Block';
import template from './index.hbs?raw';

export interface InputProps extends CompileOptions {
    id: string,
    name: string,
    class?: string,
    label: string,
    type: string,
    placeholder?: string,
    value?: string,
    isError?: boolean,
    onUpdate?: (e: string) => void
    onBlur?: (e: string) => void
}

export default class Input extends Block {
  constructor(props: InputProps) {
    super('div', {
      ...props,
      class: 'input',
      id: props.name,
      type: props.type,
      name: props.name,
      placeholder: props.placeholder,
      value: props.value,
      events: {
        input: (e: Event) => {
          if (props.onUpdate) {
            props.onUpdate((e.target as HTMLInputElement)?.value);
          }
        },
        blur: (e: Event) => {
          if (props.onBlur) {
            props.onBlur((e.target as HTMLInputElement)?.value);
          }
        },
      },
    });
  }

  render() {
    Handlebars.registerHelper('isFilled', (value) => value !== '');
    return this.compile(template, this.props)
  }
}
