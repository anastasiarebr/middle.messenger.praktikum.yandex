import { expect } from "chai";
import { Block } from "../modules/Block.ts";
import { router } from "./Router.ts";

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

const testText1 = 'Test Block 1'
const testText2 = 'Test Block 2'

const page1 = new TestBlock({
    text: testText1,
})

const page2 = new TestBlock({
    text: testText2,
})

const testPaths = {
    page1: '/page1',
    page2: '/page2',
}


describe("Router", () => {
    beforeEach(() => {
        router
            .use(testPaths.page1, page1)
            .use(testPaths.page2, page2)
            .start();
    })

    it("should create 2 pages", () => {
        expect(router.routes.length).to.equal(2)
    });

    it("should go to /page2", () => {
        router.go(testPaths.page2)
        expect(window.location.pathname).to.equal(testPaths.page2)
    });
}); 