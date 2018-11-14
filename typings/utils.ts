type FirstArgument<T> = T extends (arg1: infer U, ...args: any[]) => any ? U : any;
type SecondArgument<T> = T extends (arg1: any, arg2: infer U, ...args: any[]) => any ? U : any;

export type thunkAction<T extends (...args: any[]) => any> = (
  a?: FirstArgument<T>,
  b?: SecondArgument<T>,
) => ReturnType<T>;

export type ThunkResult<T extends (...args: any[]) => any> = ReturnType<ReturnType<T>>;
