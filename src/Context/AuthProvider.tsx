import React, { createContext, useState, useEffect } from "react";
import firebase from "../firebase";
import { UserData } from "../Types";
import { useHistory } from "react-router-dom";

type LoginStatuses = "LOGGED_IN" | "LOGGED_OUT";

interface AuthContextType {
  loginEmail: (email: string) => void;
  login: (user: string, passord: string) => void;
  logOut: () => void;
  resetPassword: (email: string) => void;
  userDataState: UserData | null;
  loginStatus?: LoginStatuses;
  emailChecked: boolean;
  emailUserExists: boolean;
  errorText: string;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

const AuthProvider: React.FunctionComponent = ({ children }) => {
  const history = useHistory();

  const [loginStatus, setLoginStatus] = useState<LoginStatuses>();

  const [userDataState, setUserDataState] = useState<UserData | null>(null);

  const [emailChecked, setEmailChecked] = useState(false);
  const [emailUserExists, setEmailUserExists] = useState(false);
  const [errorText, setErrorText] = useState("");

  const loginEmail = (email: string) => {
    if (email.length) {
      firebase
        .auth()
        .fetchSignInMethodsForEmail(email)
        .then((methods) => {
          if (methods.length) {
            setErrorText("");
            setEmailUserExists(true);
          }
        })
        .finally(() => {
          setEmailChecked(true);
        })
        .catch((e) => {
          if (e.code === "auth/invalid-email") {
            setErrorText("Ingen bruker for valgt e-post");
          }
        });
    } else {
      setErrorText("Legg inn e-post");
    }
  };

  const login = (user: string, password: string) => {
    if (user && password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user, password)
        .then(() => {
          firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        })
        .catch((e) => {
          if (e.code === "auth/wrong-password") {
            setErrorText("Feil passord");
          } else if (e.code === "auth/too-many-requests") {
            setErrorText(
              "Du har tastet feil passord for mange ganger, prøv igjen senere."
            );
          }
        });
    } else {
      window.alert("Legg inn brukernavn og passord");
    }
  };

  const resetPassword = (email: string) =>
    firebase.auth().sendPasswordResetEmail(email);

  const logOut = () => {
    window.location.pathname = "";
    setLoginStatus("LOGGED_OUT");
    firebase.auth().signOut();
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let current = firebase.auth().currentUser;
        if (current) {
          //Brukere
          let userData = firebase.database().ref(`users/${current.uid}`);

          userData
            .once("value")
            .then((snapshot) => {
              //Håndterer brukere
              const data = snapshot.val() as UserData | undefined; // null
              setUserDataState(data || null);
            })
            .then(() => {
              setLoginStatus("LOGGED_IN");
              if (window.location.pathname.length <= 1) {
                history.push("/authed");
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      } else {
        setUserDataState(null);
        history.push("/");
      }
    });
  }, [history]);

  const context = {
    loginEmail,
    login,
    logOut,
    resetPassword,
    loginStatus,
    userDataState,
    emailChecked,
    emailUserExists,
    errorText,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
