import { createContext } from 'react';

import { 
  Routes,
  Route
} from 'react-router-dom';

import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"

const TextContext = createContext('');

export default function MainRoutes() {
  return (
    <Routes>
      <TextContext.Provider value={'Teste'}>
        <Route path='/' element={<Home/>}/>
        <Route path='/rooms/new' element={<NewRoom/>}/>
      </TextContext.Provider>
    </Routes>
  )
}