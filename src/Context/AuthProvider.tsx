import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../Types';

// Import necessary Firebase functions at the top level
import { auth, db } from '../firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { ref, get } from 'firebase/database';

type LoginStatuses = 'LOGGED_IN' | 'LOGGED_OUT';

interface AuthContextType {
  loginEmail: (email: string) => void;
  login: (user: string, password: string) => void;
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

interface AuthProviderProps {
  children?: ReactNode;
}

const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState<LoginStatuses>('LOGGED_OUT');
  const [userDataState, setUserDataState] = useState<UserData | null>(null);
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailUserExists, setEmailUserExists] = useState(false);
  const [errorText, setErrorText] = useState('');

  const loginEmail = (email: string) => {
    // Now using fetchSignInMethodsForEmail directly without import inside the function
    if (email.length) {
      fetchSignInMethodsForEmail(auth, email)
        .then((methods) => {
          setEmailUserExists(methods.length > 0);
          setErrorText('');
        })
        .catch((error) => {
          console.error(error);
          setErrorText(
            'Noe gikk galt under sjekk av e-postadresse. Prøv igjen.'
          );
        })
        .finally(() => setEmailChecked(true));
    } else {
      setErrorText('Vennligst skriv inn en e-postadresse.');
    }
  };

  const login = (user: string, password: string) => {
    signInWithEmailAndPassword(auth, user, password)
      .then(() => {
        setLoginStatus('LOGGED_IN');
        navigate('/authed');
      })
      .catch((error) => {
        console.error(error);
        setErrorText('Noe gikk galt under innlogging. Prøv igjen.');
      });
  };

  const resetPassword = (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Mail for å sette nytt passord er sendt. Sjekk e-posten din.');
      })
      .catch((error) => {
        console.error(error);
        setErrorText(
          'Noe gikk galt under sending av e-post for å sette nytt passord.'
        );
      });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setLoginStatus('LOGGED_OUT');
        setUserDataState(null);
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        setErrorText('Noe gikk galt under utlogging. Prøv igjen.');
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(db, `users/${user.uid}`);
        get(userRef).then((snapshot) => {
          setUserDataState(snapshot.val() || null);
          setLoginStatus('LOGGED_IN');
          if (window.location.pathname === '/') {
            navigate('/authed');
          }
        });
      } else {
        setLoginStatus('LOGGED_OUT');
        setUserDataState(null);
        navigate('/');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        loginEmail,
        login,
        logOut,
        resetPassword,
        userDataState,
        loginStatus,
        emailChecked,
        emailUserExists,
        errorText,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
