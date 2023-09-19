import { AxiosError } from "axios";
import toast from "src/helpers/toast/toast";
import { ZodError } from "zod";
import { HttpResponseFail } from "./types";

export const convertServerErrorToString = (
  axiosError: AxiosError<HttpResponseFail>
): string => {
  const serverError: HttpResponseFail | undefined = axiosError?.response
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
  axiosError: AxiosError<HttpResponseFail>,
  actionOnFailContent: string,
  actionOnFailHandler: () => void
) => {
  const notify = {};

  toast.error({
    title: convertServerErrorToString(axiosError),
    action: {
      text: actionOnFailContent,
      onClick: actionOnFailHandler,
    },
  });

  return notify;
};
