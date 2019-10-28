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
        for (let middleware of middlewares) {
            middleware(this)
        }
    }

    async runHook(hook, data, args, ctx) {
        const hooks = this.hooks[hook]

        let res = data
        for (let cb of hooks) {
            const ires = await cb(args, res, ctx)

            if (typeof ires === 'function') {
                res = await ires(args, res, ctx)
            } else {
                res = ires
            }
        }

        return res
    }
}
