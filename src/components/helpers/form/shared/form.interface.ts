import { LoginPayload } from "src/domain/auth/auth";
import { CreateCustomerPayload } from "src/domain/customer/customer";

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

type OnSubmitArg = LoginPayload;
type R = Promise<void> | void;
export type OnSubmit = (p: OnSubmitArg) => R;
export type IFormValues = LoginPayload | CreateCustomerPayload;
