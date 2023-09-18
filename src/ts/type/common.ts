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
  id: string;
  title: string;
  type: string;
  icon?: string;
  url?: string;
  badge?: {
    title: string;
    type: string;
  };
  children?: ISideBarMenu[];
};

export type ObjectProps = string;
export type ObjectValues = string;

export type ObjectLiteral = Record<ObjectProps, ObjectValues>;
