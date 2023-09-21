import * as React from "react";
import { Path, UseFormRegister, FieldValues } from "react-hook-form";
import { IField } from "./shared/form.interface";
interface Props<T> {
  field: IField;
  register?: UseFormRegister<T & FieldValues>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextField<T>({ field, register, ...rest }: Props<T>) {
  const _register =
    register && register(field.fieldName as Path<T & FieldValues>);
  return (
    <div className="relative w-full mb-3">
      <label
        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
        htmlFor="grid-password"
      >
        {field.label}
      </label>
      <input
        type={field.type}
        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        placeholder={field.placeholder}
        {..._register}
        {...rest}
      />
    </div>
  );
}
