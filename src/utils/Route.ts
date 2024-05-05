import { Block } from '../modules/Block';

export interface IRoute {
    pathname: string,
    blockClass: Block,
    block: Block | null,
    props: {
        rootQuery: string
    }
}

function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
  }
  
function render(query: string, block: Block | null) {
    const root = document.querySelector(query);

    if(block) {
        root?.append(block.getContent() as Node);
    }

    return root;
}

export class Route {
    private _pathname: IRoute['pathname']
    private _blockClass: IRoute['blockClass']
    private _block: IRoute['block']
    private _props: IRoute['props']

    constructor(pathname: IRoute['pathname'], view: IRoute['blockClass'], props: IRoute['props']) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: IRoute['pathname']) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.remove()
        }
    }

    match(pathname: IRoute['pathname']) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        this._block = this._blockClass;
        render(this._props.rootQuery, this._block);
    }
}