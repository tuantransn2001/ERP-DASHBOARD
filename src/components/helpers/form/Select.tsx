import { UseFormRegister, FieldValues, Path } from "react-hook-form";

import { IField } from "./shared/form.interface";

interface Props<T> {
  field: IField;
  register: UseFormRegister<T & FieldValues>;
}
export default function SelectField<T>({ field, register }: Props<T>) {
  const { label, fieldName, options } = field;
  return (
    <div className="relative w-full mb-3" key={label}>
      <label
        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
        htmlFor="grid-password"
      >
        {label}
      </label>
      <select
        {...register(fieldName as Path<T & FieldValues>)}
        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      >
        {options?.map((o) => (
          <option value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
