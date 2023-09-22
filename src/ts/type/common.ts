import * as React from "react";

export interface WrapperComponent {
  children?: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[];
}

export interface IRoute {
  path?: string;
  element?: JSX.Element;
  routes?: IRoute[];
}

export type ISideBarMenu = {
  id?: string;
  itemId?: string;
  title: string;
  elemBefore?: unknown;
  url?: string;
  subNav?: ISideBarMenu[];
};

export type ObjectLiteral<TValue> = Record<string, TValue>;

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
