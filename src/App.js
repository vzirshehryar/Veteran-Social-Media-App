import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import './App.css';
import Navbar from './components/navbar/Navbar'
import Login from './components/login/Login'
import Dashboard from './components/dasboard/Dashboard'
import Register from './components/register/Register';

function App() {
  
	const me = useSelector((state) => state.userId);
  const [isAuth, setIsAuth] = useState(true);

  useEffect(()=>{
		if(!me)
      setIsAuth(false);
    else
      setIsAuth(true);
	}, [me])

  return (
    <BrowserRouter>
      {isAuth && <Navbar/>}
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Dashboard/>}/>
        {/* <Route path='/login' element={<Login/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
