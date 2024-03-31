import Handlebars from 'handlebars';
import { Block } from '../../modules/Block';

import template from './input.hbs?raw';
import Input from './components/Input';

export interface InputAtomProps extends CompileOptions {
    id: string,
    name: string,
    label: string,
    type: string,
    placeholder?: string,
    value?: string,
    error?: string,
    isError?: boolean,
    onUpdate?: (e: string) => void
    onBlur?: (e: string) => void
    validator?: (value: string) => boolean
}

export default class InputAtom extends Block {
  constructor(props: InputAtomProps) {
    super('div', {
      ...props,
      input: new Input({
        ...props,
        onUpdate: (value: string) => {
          if (props.onUpdate) {
            props.onUpdate(value);
          }
        },
        onBlur: (value: string) => {
          if (props.onBlur) {
            props.onBlur(value);
          }

          if (props.validator) {
            const valid = props.validator(value);

            if (!valid) {
              this.setProps({
                ...props,
                value,
                isError: true,
                error: props.error,
              });
            } else {
              this.setProps({
                ...props,
                value,
                isError: false,
              });
            }
          }
        },
      }),
    });
  }

  render() {
    Handlebars.registerHelper('isFilled', (value) => value !== '');

    return this.compile(template, this.props);
  }
}
