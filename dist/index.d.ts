declare type RequestData = {
    url: string;
    method: string;
    headers: Record<string, string>;
    signal?: AbortSignal;
    body?: string;
    onFailure: Array<(error: unknown) => void>;
    onSuccess: Array<(response: unknown) => unknown>;
    onAfter: Array<() => void>;
    onBefore: Array<(url: string, data: Partial<RequestData>) => void>;
};
export declare const json: (obj: any) => (req: RequestData) => RequestData;
export declare const toJson: () => (req: RequestData) => RequestData;
export declare const method: (method: string) => (req: RequestData) => RequestData;
export declare const timeout: (delay: number) => (req: RequestData) => RequestData;
export declare const headers: <T extends {}>(headers: T) => (req: RequestData) => RequestData;
export declare const url: (...fragments: string[]) => (req: RequestData) => RequestData;
export declare const build: (...middlewares: ((req: RequestData) => RequestData)[]) => () => RequestData;
export declare const run: (builder: () => RequestData) => Promise<unknown>;
export {};
