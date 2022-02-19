import { createContext } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';

export const TextContext = createContext('');

function App() {
  return (
    <Router>
       <TextContext.Provider value={'Teste'}>
        <Routes/>
       </TextContext.Provider>
    </Router>
  );
}

export default App;
