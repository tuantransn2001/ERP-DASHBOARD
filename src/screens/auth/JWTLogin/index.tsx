import { loginApi } from "src/apis/auth/auth";
import FormControl from "src/components/helpers/form";
import { IField } from "src/components/helpers/form/shared/form.interface";
import { LoginPayload, LoginResponse } from "src/domain/auth/auth";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "src/store/auth/authStore";
import { SetStateOnLoginSuccessPayload } from "src/store/auth/shared/authStore.interface";
import "react-toastify/dist/ReactToastify.css";
import { HttpResponseSuccess } from "src/services/httpService/types";
import { AxiosError } from "axios";
import { handleToastOnServerError } from "src/services/httpService/helpers";
import { useNavigate } from "react-router-dom";

const fields: IField[] = [
  {
    fieldName: "phone",
    type: "text",
    placeholder: "Enter phone number",
    label: "Phone Number",
  },
  {
    fieldName: "password",
    type: "password",
    placeholder: "Enter password",
    label: "Password",
  },
];

const JWTLogin = () => {
  const navigate = useNavigate();
  const setStateOnLoginSuccess = useAuthStore(
    (state) => state.setStateOnLoginSuccess
  );

  const handleOnSubmit = async ({ password, phone }: LoginPayload) => {
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
      if (err instanceof AxiosError)
        handleToastOnServerError(err, "Try again", () =>
          console.log("action on fail")
        );
    }
  };

  return (
    <>
      <ToastContainer />
      <FormControl
        fields={fields}
        submitAction="login"
        onSubmit={handleOnSubmit}
      />
    </>
  );
};
export default JWTLogin;
