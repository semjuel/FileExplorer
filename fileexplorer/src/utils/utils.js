// import { cancellablePromise } from "./cancellable-promise";

export const noop = () => {};

export const delay = n => new Promise(resolve => setTimeout(resolve, n));
