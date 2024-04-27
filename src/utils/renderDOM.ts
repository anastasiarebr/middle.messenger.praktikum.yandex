import { Block } from '../modules/Block';

export function render(query: string, block: Block) {
  const root = document.querySelector(query) as HTMLElement;

  root.appendChild(block.getContent() as HTMLElement);

  block.dispatchComponentDidMount();

  return root;
}
