import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { AuthContext } from './AuthProvider';

// Import db from firebase configuration
import { db } from '../firebase';
import { ref, get, child } from 'firebase/database';

interface ApiCredentialsContextType {
  apiCredentials?: Record<string, string>;
}

export const ApiCredentialsContext = createContext<ApiCredentialsContextType>(
  {}
);

// include children
interface ApiCredentialsProviderProps {
  children?: ReactNode;
}

const ApiCredentialsProvider: React.FunctionComponent<ApiCredentialsProviderProps> = ({
  children,
}) => {
  const { loginStatus } = useContext(AuthContext);

  const [apiCredentials, setApiCredentials] = useState<
    Record<string, string>
  >();

  useEffect(() => {
    if (loginStatus === 'LOGGED_IN' && !apiCredentials) {
      // Use the new modular syntax for database reference
      const credentialsRef = ref(db, `credentials`);

      get(child(credentialsRef, '/'))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const credentials = snapshot.val();
            setApiCredentials(credentials);
          } else {
            console.log('No credentials found');
          }
        })
        .catch((error) => {
          console.error(error);
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
