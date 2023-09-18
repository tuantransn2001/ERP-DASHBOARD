import { SubmitHandler, useForm } from "react-hook-form";
import { IField } from "./shared/form.interface";

interface LoginPayload {
  phone: string;
  password: string;
}

type IFormInput = LoginPayload;

interface Props {
  fields: IField[];
  onSubmit: SubmitHandler<IFormInput>;
  submitAction: string;
  isLoading?: boolean;
}

const FormControl = ({ fields, onSubmit, isLoading, submitAction }: Props) => {
  const { handleSubmit, register } = useForm<IFormInput>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => {
        return (
          <div className="relative w-full mb-3" key={index}>
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
              {...register(field.fieldName as keyof IFormInput)}
            />
          </div>
        );
      })}
      <div className="text-center mt-6">
        <button
          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          type="submit"
        >
          {isLoading ? "loading" : submitAction}
        </button>
      </div>
    </form>
  );
};
export default FormControl;
