import { expect } from "chai";
import { SinonStub, createSandbox } from 'sinon'
import { HTTPTransport, METHODS } from "./HTTPTransport.ts";

const url = '/user'

describe("HTTPTransport", () => {
    let http: HTTPTransport
    let request: SinonStub
    let sandbox = createSandbox()
    beforeEach(() => {
        http = new HTTPTransport();
        request = sandbox.stub(http, 'request').callsFake(() => Promise.resolve())
    })

    afterEach(() => {
        sandbox.restore()
    })

    it("should send get request", async () => {
        await http.get(url)

        expect(request.calledWithMatch(url, { method: METHODS.GET })).to.be.true
    });

    it("should send post request with data", async () => {
        const data = {
            id: '1',
            name: 'Name',
            second_name: 'Second'
        }

        await http.post(url, {
            data
        })

        expect(request.calledWithMatch(url, { method: METHODS.POST, data })).to.be.true
    });

    it("should send put request with data", async () => {
        const data = {
            id: '1',
            name: 'Name',
            second_name: 'Second'
        }

        await http.put(url, {
            data
        })

        expect(request.calledWithMatch(url, { method: METHODS.PUT, data })).to.be.true
    });

    it("should send delete request with data", async () => {
        const data = {
            id: '1',
        }

        await http.delete(url, {
            data
        })

        expect(request.calledWithMatch(url, { method: METHODS.DELETE, data })).to.be.true
    });
}); 
