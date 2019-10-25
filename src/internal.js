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

    clone() {
        const ri = new RequestInternal()

        for (let [key, values] of Object.entries(this.hooks)) {
            values.forEach(cb => {
                ri.on(key, cb)
            })
        }

        return ri
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
