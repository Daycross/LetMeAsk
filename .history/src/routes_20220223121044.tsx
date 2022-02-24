import { 
  Routes,
  Route
} from 'react-router-dom';

import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"

import { AuthContextProvider } from './contexts/AuthContext'

export default function MainRoutes() {
  return (
    <Routes>
      <AuthContextProvider>
        <Route path='/' element={<Home/>}/>
        <Route path='/rooms/new' element={<NewRoom/>}/>
      </AuthContextProvider>
    </Routes>
  )
}