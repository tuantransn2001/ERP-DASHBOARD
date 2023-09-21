import * as React from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { WrapperComponent } from "src/ts/type/common";
import { FireBaseAuth } from "./shared/firebase.interface";
interface Props extends WrapperComponent {}

export const FireBaseAuthContext = React.createContext<FireBaseAuth>({});

const FireBaseProvider = (props: Props) => {
  const firebaseConfig = {
    apiKey: "AIzaSyBHA8JUSfuaZKIwrgP0_JiuNMP6yV1I7y8",
    authDomain: "erp-system-c2172.firebaseapp.com",
    projectId: "erp-system-c2172",
    storageBucket: "erp-system-c2172.appspot.com",
    messagingSenderId: "726521242248",
    appId: "1:726521242248:web:f488111da433c182e2753d",
    measurementId: "G-G5W8554XEN",
  };
  const firebaseApp = initializeApp(firebaseConfig);

  const auth = getAuth(firebaseApp);
  const googleAuthProvider = new GoogleAuthProvider();

  return (
    <FireBaseAuthContext.Provider
      value={{
        auth,
        googleAuthProvider,
      }}
    >
      {props.children}
    </FireBaseAuthContext.Provider>
  );
};

export default FireBaseProvider;
