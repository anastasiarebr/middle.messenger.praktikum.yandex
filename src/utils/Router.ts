import { Route } from './Route.ts'
import { Block } from '../modules/Block';

export interface IRouter {
    routes: Array<Route>,
    history: History | null,
    currentRoute: Route | null,
    rootQuery: string,
    instance: Router | null
}

export class Router {
    routes: IRouter['routes'] = []
    private history: IRouter['history'] = null
    private _currentRoute: IRouter['currentRoute'] = null
    private _rootQuery: IRouter['rootQuery'] = ''
    static __instance: IRouter['instance'] = null

    
    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: Block) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes.push(route);
        return this;
    }

    start() {
      window.onpopstate = event => {
        this._onRoute((event.currentTarget as Window)?.location.pathname);
      };

      this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname) || this.getRoute('*');

        if (!route) {
          return;
        }


        if (this._currentRoute) {
          this._currentRoute.leave();
        }

        route.render();
        this._currentRoute = route
    }

    go(pathname: string) {
      this.history?.pushState({}, "", pathname);
      this._onRoute(pathname);
    }

    back() {
      this.history?.back()
    }

    forward() {
      this.history?.forward()
    }

    getRoute(pathname: string): Route | null {
      return this.routes.find((route: Route) => route.match(pathname)) || null;
    }
}

export const router = new Router("#app");
