import { user } from './user';
import { InputUserFieldIds } from './consts';

export const inputUserField = function (value: string, field: keyof typeof user) {
  const inputWrapper = document.querySelector<HTMLDivElement>(InputUserFieldIds[field]);

  const labelElement = inputWrapper?.getElementsByTagName('label')[0];

  user[field] = value;

  const hasLabelFilled = labelElement?.classList.contains('filled');

  if (user[field] === '') {
    labelElement?.classList.remove('filled');
  } else if (!hasLabelFilled) {
    labelElement?.classList.add('filled');
  }
};

export const emailValidator = function (value: string): boolean {
  const regExp = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const checkValue = regExp.test(value);

  return checkValue;
};

export const loginValidator = function (value: string): boolean {
  const regExp = /^[a-zA-Z0-9-_]+$/;
  const checkValue = regExp.test(value);
  const valueHasLetters = /[a-zA-Z]/g.test(value);

  return value.length > 2
    && value.length < 21
    && checkValue
    && valueHasLetters;
};

export const nameValidator = function (value: string): boolean {
  const regExp = /^[a-zA-Zа-яА-Я-]+$/;
  const checkValue = regExp.test(value);
  const firstLetter = /[A-ZА-Я]/g.test(value[0]);

  return checkValue
    && firstLetter;
};

export const phoneValidator = function (value: string): boolean {
  const regExp = /^[+]*[0-9]{10,15}$/;
  const checkValue = regExp.test(value);

  return checkValue;
};

export const passwordValidator = function (value: string): boolean {
  const valueHasLetters = /[A-ZА-Я]/g.test(value);
  const valueHasNumbers = /[0-9]/g.test(value);

  return value.length > 7
    && value.length < 41
    && valueHasNumbers
    && valueHasLetters;
};

export const passwordRepeatedValidator = function (value: string, oldValue: string): boolean {
  return value === oldValue;
};

export const emptyValidator = function (value: string): boolean {
  return value !== '';
};

export const trim = function (value: string, chars?: string): string {
  if(!chars) {
    return value.trim()
  }

  const reg = new RegExp(`[${chars}]`, "gi");

  const res = value.replace(reg, '')

  return res
}