import { UseFormRegister } from "react-hook-form";
import { IField, IFormValues } from "./shared/form.interface";

interface Props {
  field: IField;
  register: UseFormRegister<IFormValues>;
}
const SelectField = ({ field, register }: Props) => {
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
        {...register(fieldName as keyof IFormValues)}
        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      >
        {options?.map((o) => (
          <option value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
};
export default SelectField;
