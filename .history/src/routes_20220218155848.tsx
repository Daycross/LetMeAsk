import { 
  Routes,
  Route
} from 'react-router-dom';

import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"

// export const TextContext = createContext('');

export default function MainRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/rooms/new' element={<NewRoom/>}/>
    </Routes>
  )
}