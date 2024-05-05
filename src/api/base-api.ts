
export class BaseAPI {
    create(data?: unknown) { throw new Error(`Not implemented ${data}`); }

    request() { throw new Error('Not implemented'); }

    update() { throw new Error('Not implemented'); }

    delete() { throw new Error('Not implemented'); }
}