import { createContext, useState } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';

export const TextContext = createContext('');

function App() {
  const [value, setValue] = useState('Teste');

  return (
    <Router>
       <TextContext.Provider value={value}>
        <Routes/>
       </TextContext.Provider>
    </Router>
  );
}

export default App;