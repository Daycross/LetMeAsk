import { createContext, useState } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';
import { auth, firebase } from './services/firebase';

type User = {
  id: string,
  nome: string,
  avatar: string
}

type AuthContextType = {
  user: User,
  signInWithGoogle: () => void,
}

export const AuthContext = createContext({} as AuthContextType);

function App() {
  const [user, setUser] = useState<User>();

  function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(result => {
      if(result.user){
        const { displayName, photoURL, uid } = result.user;
        if(!displayName || !photoURL){
          throw new Error('Missing Information from google account.')
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL 
        })
      } 
    });
  }

  return (
    <Router>
       <AuthContext.Provider value={{user, signInWithGoogle}}>
        <Routes/>
       </AuthContext.Provider>
    </Router>
  );
}

export default App;
