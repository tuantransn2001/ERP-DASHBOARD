import { FieldValues, useForm } from "react-hook-form";
import MyButton from "../button";
import SelectField from "./Select";
import { FIELD_TYPE, IField } from "./shared/form.interface";
import TextField from "./Text";

interface Props<TFormValues> {
  fields: IField[];
  handleOnSubmit: (payload: TFormValues) => void;
  isLoading: boolean;
}

export default function MyForm<TFormValues>({
  fields,
  handleOnSubmit,
  isLoading,
}: Props<TFormValues>) {
  const { register, handleSubmit } = useForm<TFormValues & FieldValues>();

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      {fields.map((field, i) => {
        switch (field.type) {
          case FIELD_TYPE.text:
          case FIELD_TYPE.password: {
            return <TextField field={field} register={register} key={i} />;
          }
          case FIELD_TYPE.select: {
            return <SelectField field={field} register={register} key={i} />;
          }
          default: {
            return <TextField field={field} register={register} key={i} />;
          }
        }
      })}

      <MyButton isLoading={isLoading}>Submit</MyButton>
    </form>
  );
}
