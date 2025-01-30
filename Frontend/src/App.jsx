import { Routes, Route, NavLink } from 'react-router-dom'
import { useState } from 'react';
import './App.css'

// Rutas
import Home from "./views/Home";
import Cats from "./views/Cats/Cats";
import AddCat from "./views/Cats/AddCat";
import CatDetail from "./views/Cats/Details";
import Login from "./views/Auth/Login";
import Logout from "./views/Auth/Logout";
import Register from "./views/Auth/Register";
import Admin from "./views/Admin";
import NotFound from "./views/NotFound";

import LoginCheck from './components/utility/LoginCheck';
import AdminCheck from './components/utility/AdminCheck';

function App() {
    const [checkUser, setcheckUser] = useState(false);
    const [checkAdmin, setcheckAdmin] = useState(false);

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

    const adminCheck = async()=>{
      const endpoint = import.meta.env.VITE_ADMIN_CHECK;

      const config = {
        method: 'GET',
        headers:{
            'Content-type': 'application/json'
        },
        credentials: 'include'
    }

      const res = await fetch(endpoint, config);

      const adminCheck = await res.json();

      console.log(adminCheck);

      if(res.ok){
        setcheckAdmin(true);
        console.log("el user es admin = ", checkAdmin);

      }else{
        setcheckAdmin(false);
        console.log("el user no es admin = ", checkAdmin);
      }
    }

    loginCheck();
    adminCheck();

  return (
    <>
      <div className="">
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/cats">Gatos</NavLink></li>

          {
            checkAdmin == true ? (
              <li><NavLink to="/cats/add">Agregar Gato</NavLink></li>
            ) : (
              <></>
            )
          }

          {
            checkUser == true ? (
              <>
                <li><NavLink to="">Perfil</NavLink></li>
                <li><NavLink to="/logout">Logout</NavLink></li>
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
        <Route    path="/"          element={ <Home /> }/>
        <Route    path="/cats"      element={ <Cats /> }/>
        <Route    path="/cats/:id"  element={ <CatDetail /> }/>

        <Route                      element={ <AdminCheck check={checkAdmin} /> }>

          <Route  path="/cats/add"  element={ <AddCat /> }/>
          <Route  path="/admin"     element={ <Admin /> }/>

        </Route>

        <Route                      element={ <LoginCheck check={checkUser} /> }>
          <Route  path="/login"     element={ <Login /> }/>
          <Route  path="/register"  element={ <Register />}/>
        </Route>
        
        <Route    path="/logout"    element={ <Logout/> }/>
        <Route    path="*"          element={ <NotFound /> }/>
      </Routes>
      
    </>
  )
}

export default App
