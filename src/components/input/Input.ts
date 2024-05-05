import Handlebars from 'handlebars';
import { Block, Props } from '../../modules/Block';

import template from './input.hbs?raw';
import { Input } from './components/index';

export interface InputAtomProps extends CompileOptions {
    id: string,
    name: string,
    label: string,
    type: string,
    placeholder?: string,
    value?: string,
    error?: string,
    isError?: boolean,
    isDisabled?: boolean,
    input?: Input,
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

  setPropsInput = (nextProps: Props) => {
    this.setProps(nextProps)
      this.children.input.setProps({
        ...nextProps,
        disabled: nextProps?.isDisabled ? 'disabled' : ''
      })
  };

  render() {
    Handlebars.registerHelper('isFilled', (value) => value !== '');

    return this.compile(template, this.props);
  }
}
