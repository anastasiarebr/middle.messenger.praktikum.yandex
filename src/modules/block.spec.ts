import { expect } from "chai";
import { Block } from "./Block.ts";

const testTemplate = `
    <div data-name="test-block">{{text}}</div>
`

interface TestProps {
    text?: string
}

class TestBlock extends Block {
    constructor(props: TestProps) {
        super('div', {
            ...props,
        });
    }
  
    render() {
      return this.compile(testTemplate, this.props);
    }
}



const testText = 'Test Block'
const block = new TestBlock({
    text: testText,
})


const mainComponent = document.querySelector('main')
mainComponent?.append(block.getContent() as HTMLElement)

describe("Block", () => {
    it("should show text", () => {
        const testComponnet = mainComponent?.querySelector('div[data-name="test-block"]')

        expect(testComponnet?.innerHTML).to.include(testText)
    });

    it("should hide", () => {
        block.hide()

        const testComponnet = mainComponent?.querySelector('div')

        expect(testComponnet?.getAttribute('style')).to.equal('display: none;')
    });

    it("should remove", () => {
        block.remove()

        const testComponnet = mainComponent?.querySelector('div')
                
        expect(testComponnet?.innerHTML).to.equal(true)
    });
}); 
