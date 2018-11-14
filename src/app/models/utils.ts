import { Component } from 'react';
export type GetProps<TComponentOrTProps> = TComponentOrTProps extends Component<
  infer RProps,
  infer LState
>
  ? RProps
  : TComponentOrTProps;
