import ErrorScreen from "src/screens/error";
import { isLoggedInSelector, useAuthStore } from "src/store/auth/authStore";
import { WrapperComponent } from "src/ts/type/common";
interface Props extends WrapperComponent {}
const AuthGuard = ({ children }: Props): JSX.Element => {
  const isLoggedIn = useAuthStore(isLoggedInSelector);

  if (!isLoggedIn) {
    return <ErrorScreen errorCode={401} />;
  }

  return <>{children}</>;
};
export default AuthGuard;
