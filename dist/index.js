"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var cross_fetch_1 = require("cross-fetch");
exports.json = function (obj) { return function (req) { return (__assign(__assign({}, req), { body: JSON.stringify(obj), headers: __assign(__assign({}, req.headers), { 'Content-Type': 'application/json' }) })); }; };
exports.toJson = function () { return function (req) { return (__assign(__assign({}, req), { onSuccess: __spreadArrays(req.onSuccess, [
        function (response) {
            if (response instanceof Response) {
                return response.json();
            }
            return response;
        },
    ]) })); }; };
exports.tap = function (cb) { return function (req) { return (__assign(__assign({}, req), { onBefore: __spreadArrays(req.onBefore, [cb]) })); }; };
exports.method = function (method) { return function (req) { return (__assign(__assign({}, req), { method: method })); }; };
exports.timeout = function (delay) { return function (req) {
    var controller = new AbortController();
    var timeoutId = setTimeout(function () {
        controller.abort();
    }, delay);
    return __assign(__assign({}, req), { signal: controller.signal, onAfter: __spreadArrays(req.onAfter, [
            function () {
                clearTimeout(timeoutId);
            },
        ]) });
}; };
exports.headers = function (headers) { return function (req) { return (__assign(__assign({}, req), { headers: __assign(__assign({}, req.headers), headers) })); }; };
exports.url = function () {
    var fragments = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fragments[_i] = arguments[_i];
    }
    return function (req) { return (__assign(__assign({}, req), { url: fragments.join('/') })); };
};
exports.build = function () {
    var middlewares = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        middlewares[_i] = arguments[_i];
    }
    return function () {
        var requestData = {
            url: '',
            method: 'GET',
            headers: {},
            onFailure: [],
            onSuccess: [],
            onAfter: [],
            onBefore: [],
        };
        for (var _i = 0, middlewares_1 = middlewares; _i < middlewares_1.length; _i++) {
            var middleware = middlewares_1[_i];
            requestData = middleware(requestData);
        }
        return requestData;
    };
};
var fetchImplementation = cross_fetch_1.default;
exports.run = function (builder) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, url, onBefore, onSuccess, onFailure, onAfter, rest, response, _i, onSuccess_1, cb, e_1, error, _b, onFailure_1, cb;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = builder(), url = _a.url, onBefore = _a.onBefore, onSuccess = _a.onSuccess, onFailure = _a.onFailure, onAfter = _a.onAfter, rest = __rest(_a, ["url", "onBefore", "onSuccess", "onFailure", "onAfter"]);
                onBefore.forEach(function (cb) { return cb(url, rest); });
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, 4, 5]);
                return [4 /*yield*/, fetchImplementation(url, rest)];
            case 2:
                response = _c.sent();
                for (_i = 0, onSuccess_1 = onSuccess; _i < onSuccess_1.length; _i++) {
                    cb = onSuccess_1[_i];
                    response = cb(response);
                }
                return [2 /*return*/, response];
            case 3:
                e_1 = _c.sent();
                error = e_1;
                for (_b = 0, onFailure_1 = onFailure; _b < onFailure_1.length; _b++) {
                    cb = onFailure_1[_b];
                    error = cb(error);
                }
                throw error;
            case 4:
                onAfter.forEach(function (cb) { return cb(); });
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
