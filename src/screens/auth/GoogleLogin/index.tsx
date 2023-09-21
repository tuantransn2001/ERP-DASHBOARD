import google from "Assets/images/common/google.svg";
import MyButton from "src/components/helpers/button";
import { useFirebaseAuth } from "src/hooks/useFirebaseAuth";
import { Auth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseError } from "firebase/app";
const GoogleLogin = () => {
  const { auth, googleAuthProvider } = useFirebaseAuth();

  const handleGoogleLogin = async () => {
    try {
      const googleLoginRes = await signInWithPopup(
        auth as Auth,
        googleAuthProvider as GoogleAuthProvider
      );

      console.log(googleLoginRes);
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log({ firebaseError: error });
      }
    }
  };

  return (
    <MyButton
      onClick={handleGoogleLogin}
      className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
    >
      <img alt="..." className="w-5 mr-1" src={google} />
      Google
    </MyButton>
  );
};
export default GoogleLogin;
