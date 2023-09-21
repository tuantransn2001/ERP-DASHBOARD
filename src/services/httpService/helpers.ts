import { AxiosError } from "axios";
import toast from "src/helpers/toast/toast";
import { ZodError } from "zod";
import { HttpResponseFail } from "./types";

export const convertAxiosErrorToString = (axiosError: AxiosError): string => {
  const serverError = axiosError?.response
    ? (axiosError?.response.data as HttpResponseFail)
    : undefined;
  return `Status code ${axiosError.response?.status}! ${
    serverError ? serverError.error.message : "Server Error"
  }`;
};

export const convertZodValidateErrorToString = (zodError: ZodError) => {
  return zodError.issues
    .map((err) => `${err.path}:: ${err.message}`)
    .join(" || ");
};

export const handleToastOnServerError = (
  serverError: ZodError | AxiosError,
  actionOnFailContent?: string,
  ...rest: never[]
) => {
  let errMess: string = "";
  const isAxiosError = serverError instanceof AxiosError;
  const isZodError = serverError instanceof ZodError;

  if (isAxiosError) errMess = convertAxiosErrorToString(serverError);
  if (isZodError) errMess = convertZodValidateErrorToString(serverError);

  toast.error({
    title: errMess,
    action: {
      text: actionOnFailContent ? actionOnFailContent : "Thủ lại",
      ...rest,
    },
  });
};
