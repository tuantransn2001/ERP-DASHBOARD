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

import MyForm from "src/components/helpers/form";
import { ZodError } from "zod";

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

  const handleOnSubmit = async ({ password, phone }: LoginPayload) => {
    setIsLoading(true);
    try {
      const loginData: LoginPayload = {
        password,
        phone,
      };
      const loginResponse: HttpResponseSuccess<LoginResponse> = await loginApi(
        loginData
      );

      const access_token: string = loginResponse.data.data.access_token;
      const data: SetStateOnLoginSuccessPayload = { access_token };
      localStorage.setItem("token", `Bearer ${access_token}`);
      setStateOnLoginSuccess(data);
      navigate("/app/dashboard/customers");
    } catch (err) {
      handleToastOnServerError(err as AxiosError | ZodError, "Try again");
    }
    setIsLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <MyForm<IFormValues>
        isLoading={isLoading}
        fields={fields}
        handleOnSubmit={handleOnSubmit}
      />
    </>
  );
};
export default JWTLogin;
