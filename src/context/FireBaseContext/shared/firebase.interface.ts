import { Auth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
export interface FireBaseAuth {
  auth?: Auth;
  googleAuthProvider?: GoogleAuthProvider;
}
