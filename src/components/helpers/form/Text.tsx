import { UseFormRegister } from "react-hook-form";
import { WrapperComponent } from "src/ts/type/common";
import { IField, IFormValues } from "./shared/form.interface";

interface Props extends WrapperComponent {
  field: IField;
  register?: UseFormRegister<IFormValues>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const TextField = ({ field, register, onChange }: Props) => {
  const { label, type, placeholder, fieldName } = field;
  const _register = register && { ...register(fieldName as keyof IFormValues) };
  return (
    <div className="relative w-full mb-3" key={label}>
      <label
        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
        htmlFor="grid-password"
      >
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        placeholder={placeholder}
        {..._register}
      />
    </div>
  );
};
export default TextField;
