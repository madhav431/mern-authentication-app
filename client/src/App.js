import React,{createContext,useState} from 'react'
import Navbar from './Navbar'
import Register from './Register'
import Login from './Login';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Myprofile from './Myprofile';
import './App.css'

export const store = createContext();

const App = () => {
  const [token,setToken]=useState(null);

  return (
    <div>
      <store.Provider value={[token,setToken]}>
      <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path='/login' Component={Login} />
      <Route path='/register' Component={Register} />
      <Route path='/myprofile' Component={Myprofile} />
      </Routes>
      </BrowserRouter>
      </store.Provider>
    </div>
  )
}

export default App