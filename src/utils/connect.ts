import { Block } from "../modules/Block";
import { Indexed } from "./helpers";
import store, { StoreEvents } from './Store'

export function connect(Component: typeof Block, 
  mapStateToProps: (state: Indexed) => Indexed, 
  tagName: string = 'div'
) {
  return class extends Component {
    constructor(props: Indexed) {
        super(tagName, { ...props, ...mapStateToProps(store.getState()) });

        store.on(StoreEvents.Updated, () => {
          this.setProps({...mapStateToProps(store.getState())});
        });
    }
  } 
}
