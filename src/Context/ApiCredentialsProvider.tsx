import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";

import firebase from "../firebase";

interface ApiCredentialsContextType {
  apiCredentials?: Record<string, string>;
}

export const ApiCredentialsContext = createContext<ApiCredentialsContextType>(
  {}
);

const ApiCredentialsProvider: React.FunctionComponent = ({ children }) => {
  const { loginStatus } = useContext(AuthContext);

  const [apiCredentials, setApiCredentials] = useState<
    Record<string, string>
  >();

  useEffect(() => {
    if (loginStatus === "LOGGED_IN" && !apiCredentials) {
      let credentialsRef = firebase.database().ref(`credentials`);

      credentialsRef.once("value").then((snapshot) => {
        const credentials = snapshot.val();
        setApiCredentials(credentials);
      });
    }
  }, [apiCredentials, loginStatus]);

  const context = { apiCredentials };

  return (
    <ApiCredentialsContext.Provider value={context}>
      {children}
    </ApiCredentialsContext.Provider>
  );
};

export default ApiCredentialsProvider;
