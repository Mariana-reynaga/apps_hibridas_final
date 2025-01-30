import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect} from 'react';
import './App.css'

// Rutas
import Home from "./views/Home";
import Cats from "./views/Cats/Cats";
import AddCat from "./views/Cats/AddCat";
import CatDetail from "./views/Cats/Details";
import Login from "./views/Auth/Login";
import Register from "./views/Auth/Register";
import Admin from "./views/Admin";
import NotFound from "./views/NotFound";

import LoginCheck from './components/utility/LoginCheck';

function App() {
    const navigate = useNavigate();

    const [checkUser, setcheckUser] = useState(false);

    const loginCheck = async()=>{
      const endpoint = import.meta.env.VITE_LOGIN_CHECK;

      const config = {
        method: 'GET',
        headers:{
            'Content-type': 'application/json'
        },
        credentials: 'include'
    }

      const res = await fetch(endpoint, config);

      const loginCheck = await res.json();

      if(res.ok){
        setcheckUser(true);
        console.log("el user esta verificado = ", checkUser);

      }else{
        setcheckUser(false);
        console.log("el user no esta verificado = ", checkUser);
      }
    }

    loginCheck();

  return (
    <>
      <div className="">
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/cats">Gatos</NavLink></li>

          {
            checkUser == true ? (
              <>
                <li><NavLink to="">Perfil</NavLink></li>
                <li><NavLink to="">Logout</NavLink></li>
              </>
            ) : (
              <>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Registro</NavLink></li>
              </>
            )
          }
        </ul>
      </div>

      {/* Rutas */}
      <Routes>
        <Route path="/" element={ <Home /> }/>
        <Route path="/cats" element={ <Cats /> }/>
        <Route path="/cats/add" element={ <AddCat /> }/>
        <Route path="/cats/:id" element={ <CatDetail /> }/>

        <Route element={ <LoginCheck check={checkUser} /> }>
          <Route path="/login" element={ <Login /> }/>
          <Route path="/register" element={ <Register />}/>
        </Route>
        
        <Route path="/admin" element={ <Admin /> }/>
        <Route path="*" element={ <NotFound /> }/>
      </Routes>
      
    </>
  )
}

export default App
