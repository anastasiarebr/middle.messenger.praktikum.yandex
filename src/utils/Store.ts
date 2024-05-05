import { set, Indexed } from './helpers'
import { EventBus } from '../modules/EventBus';

export enum StoreEvents {
    Updated = 'updated',
}

class Store extends EventBus {
    private state: Indexed = {};
  
    public getState(): Indexed {
      return this.state;
    }
  
    public set(path: string, value: unknown) {
      set(this.state, path, value);
      this.emit(StoreEvents.Updated);
    }
} 

export default new Store(); 
