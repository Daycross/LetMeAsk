import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';

import { AuthContextProvider } from './contexts/AuthContext'

function App() {

  return (
    <Router> 
      <AuthContextProvider>
        <Routes/>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
