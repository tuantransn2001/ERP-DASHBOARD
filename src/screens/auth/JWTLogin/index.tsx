import { loginApi } from "src/apis/auth/auth";
import {
  FIELD_TYPE,
  IField,
} from "src/components/helpers/form/shared/form.interface";
import { LoginPayload, LoginResponse } from "src/domain/auth/auth";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "src/store/auth/authStore";
import { SetStateOnLoginSuccessPayload } from "src/store/auth/shared/authStore.interface";
import { HttpResponseSuccess } from "src/services/httpService/types";
import { AxiosError } from "axios";
import { handleToastOnServerError } from "src/services/httpService/helpers";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { useForm } from "react-hook-form";
import TextField from "src/components/helpers/form/Text";
import { Button } from "@mui/material";
import MyLoadingButton from "src/components/helpers/button";

const fields: IField[] = [
  {
    fieldName: "phone",
    type: FIELD_TYPE.text,
    placeholder: "Enter phone number",
    label: "Phone Number",
  },
  {
    fieldName: "password",
    type: FIELD_TYPE.password,
    placeholder: "Enter password",
    label: "Password",
  },
];

type IFormValues = LoginPayload;

const JWTLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const setStateOnLoginSuccess = useAuthStore(
    (state) => state.setStateOnLoginSuccess
  );

  const { register, handleSubmit } = useForm<IFormValues>();

  const handleEnableIsLoading = () => setIsLoading(true);
  const handleDisableIsLoading = () => setIsLoading(false);

  const handleOnSubmit = React.useCallback(
    async ({ password, phone }: LoginPayload) => {
      handleEnableIsLoading();
      try {
        const loginData: LoginPayload = {
          password,
          phone,
        };
        const loginResponse: HttpResponseSuccess<LoginResponse> =
          await loginApi(loginData);
        const access_token: string = loginResponse.data.data.access_token;
        const data: SetStateOnLoginSuccessPayload = { access_token };
        localStorage.setItem("token", `Bearer ${access_token}`);
        setStateOnLoginSuccess(data);
        navigate("/app/dashboard/customers");
        handleDisableIsLoading();
      } catch (err) {
        if (err instanceof AxiosError)
          handleToastOnServerError(err, "Try again", () => {
            console.log("action on fail");
          });
      }
      handleDisableIsLoading();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        {fields.map((field, i) => (
          <TextField field={field} register={register} key={i} />
        ))}

        {isLoading ? (
          <MyLoadingButton />
        ) : (
          <Button type="submit" variant="contained" fullWidth>
            login
          </Button>
        )}
      </form>
    </>
  );
};
export default JWTLogin;
