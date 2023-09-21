import { ObjectLiteral } from "src/ts/type/common";

export enum FIELD_TYPE {
  text = "text",
  password = "password",
  select = "select",
}

export interface IOption {
  value: string;
  label: string;
}

export interface IField {
  label: string;
  placeholder?: string;
  fieldName: string;
  type: FIELD_TYPE;
  options?: IOption[];
}

type OnSubmitArg = ObjectLiteral<string | never>;
type R = Promise<void> | void;
export type OnSubmit = (p: OnSubmitArg) => R;
