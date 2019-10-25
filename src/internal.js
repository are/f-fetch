export class RequestInternal {
    constructor() {
        this.hooks = {
            before: [],
            success: [],
            failure: [],
            after: [],
            send: [],
        }
    }

    on(hook, cb) {
        this.hooks[hook] = [...this.hooks[hook], cb]
    }

    apply(middlewares) {
        for (middleware of middlewares) {
            middleware(this)
        }
    }

    runHook(hook, data) {
        const hooks = this.hooks[hook]

        let res = data
        for (let cb of hooks) {
            res = cb(res)
        }

        return res
    }
}
