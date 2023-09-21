import * as React from "react";
import { FireBaseAuthContext } from "src/context/FireBaseContext";

export const useFirebaseAuth = () => React.useContext(FireBaseAuthContext);
