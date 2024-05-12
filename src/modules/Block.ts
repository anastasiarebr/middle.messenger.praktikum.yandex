import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';
import { EventBus } from './EventBus.ts';

const { compile } = Handlebars
export interface Props {
  [key: string]: unknown,
}

export interface Lists {
  [key: string]: unknown[],
}

export interface Children {
  [key: string]: Block,
}

export class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  };

  private _element: HTMLElement | null = null;

  private _meta: {
        tagName: string,
        props: Props
    } | null = null;

  _id: string | null = null;

  children: Children;

  lists: Lists;

  props: Props = {};

  eventBus: () => EventBus;

  constructor(tagName: string = 'div', propsAndChildren: Props = {}) {
    const { children, lists, props = {
      withInternalID: true
    } } = this._getChildren(propsAndChildren);

    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.children = children;
    this.lists = lists;

    if (props.withInternalID) {
      this._id = makeUUID();
    }

    this.props = this._makePropsProxy({ ...props, data_id: this._id });

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    this.eventBus().emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources() {
    this._element = this._createDocumentElement(this._meta?.tagName  || 'div');
    this._render();
  }

  init() {
    this._createResources();
  }

  _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
    this._render();
  }

  componentDidMount(_oldProps?: unknown[]) {}

  dispatchComponentDidMount() {}

  _componentDidUpdate(oldProps: unknown, newProps: unknown) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this._render();
    }
  }

  componentDidUpdate(_oldProps: unknown, _newProps: unknown) {
    return true;
  }

  _getChildren(propsAndChildren: Props) {
    const children: Children = {};
    const lists: Lists = {}
    const props: Props = {};


    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value
      } else {
        props[key] = value;
      }
    });

    return { children, props, lists };
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  };

  get element() {
    return this._element;
  }

  _addEvents() {
    const { events = {} } = this.props;

    const elem = this._element?.firstChild?.nodeName === 'INPUT' ? this._element?.firstChild : this._element

    Object.keys(events as Record<string, (...args: unknown[]) => unknown>).forEach((eventName) => {
      elem
      ?.addEventListener(eventName, (events as Record<string, (...args: unknown[]) => unknown>)[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

    const elem = this._element?.firstChild?.nodeName === 'INPUT' ? this._element?.firstChild : this._element

    Object.keys(events as Record<string, (...args: unknown[]) => unknown>).forEach((eventName) => {
      elem
      ?.removeEventListener(eventName, (events as Record<string, (...args: unknown[]) => unknown>)[eventName]);
    });
  }

  compile(template: string, props: Props) {
    const propsAndStubs = { ...props };

    const thisId = Math.floor(Math.random() * 1000);

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id="${key}_${thisId}"></div>`;
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = compile(template, propsAndStubs)({ ...propsAndStubs });
    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      stub?.replaceWith(child.getContent() || '');
    });

    Object.entries(this.lists).forEach(([key, child]) => {
      const listTemplate = this._createDocumentElement('template') as HTMLTemplateElement;

      child.forEach((item) => {
        if (item instanceof Block) {
          const content = item.getContent();
          if (content) {
            listTemplate.content.append(content);
          }
        } else {
          listTemplate.content.append(`${item}`);
        }
      });

      const stub = fragment.content.querySelector(`[data-id="${key}_${thisId}"]`);
      if (stub) {
        stub.replaceWith(listTemplate.content);
      }
    });

    return fragment.content;
  }

  _render() {
    const block = this.render();

    this._removeEvents();
    this._element!.innerHTML = '';

    this._element!.appendChild(block);

    this._addEvents();
  }

  render() {
    return document.createElement('template').content;
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  _makePropsProxy(props: Props) {
    return new Proxy(props, {
      get(target: Record<string, unknown>, prop: string) {
        if (prop.startsWith('_')) {
          throw new Error('нет доступа');
        }

        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set(target: Record<string, unknown>, prop: string, value: unknown) {
        if (prop.startsWith('_')) {
          throw new Error('нет доступа');
        } else {
          target[prop] = value;
          return true;
        }
      },

      deleteProperty(_target: Record<string, unknown>, _prop: string) {
        throw new Error('нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string) {
    const element = document.createElement(tagName);
    if (this._id) {
      element.setAttribute('data-id', this._id);
    }
    return element;
  }

  show() {
    (this._element as HTMLElement).style.display = 'block';
  }

  hide() {
    (this._element as HTMLElement).style.display = 'none';
  }

  remove() {
    (this._element as HTMLElement).remove()
  }
}
