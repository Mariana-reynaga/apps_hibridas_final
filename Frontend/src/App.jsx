import { Routes, Route, NavLink } from 'react-router-dom'
import { useState } from 'react';
import './App.css'

// Rutas
import Home         from "./views/Home";
  // Gatos
import Cats         from "./views/Cats/Cats";
import AddCat       from "./views/Cats/AddCat";
import CatDetail    from "./views/Cats/Details";
import GatosAdmin   from './views/Admin/GatosAdmin';
import EditCat      from "./views/Cats/EditCat";
import DeleteCat    from './views/Cats/DeleteCat';
  // Colores
import ColoresAdmin from './views/Admin/ColoresAdmin';
import AddColor     from './views/Colors/AddColor';
import DeleteColor  from './views/Colors/DeleteColor';
  // Largo
import LargosAdmin  from './views/Admin/LargosAdmin';
import AddLargo     from './views/Lengths/AddLength';
import DeleteLength from './views/Lengths/DeleteLength'
  // Usuario
import Login        from "./views/Auth/Login";
import Logout       from "./views/Auth/Logout";
import Register     from "./views/Auth/Register";
import Profile      from './views/User/Profile';
import EditProfile  from './views/User/EditProfile';
import Admin        from "./views/Admin/Admin";
import Usuarios     from './views/Admin/UsuariosAdmin';
import MakeAdmin    from './views/User/MakeAdmin';
import DemoteAdmin  from './views/User/DemoteAdmin';

import NotFound     from "./views/NotFound";

// To protect routes
import LoginCheck from './components/utility/LoginCheck';
import AdminCheck from './components/utility/AdminCheck';

function App() {
    const [checkUser, setcheckUser] = useState(false);
    const [checkAdmin, setcheckAdmin] = useState(false);
    const [loginInfo, setloginInfo] = useState('');

    const loginCheck = async()=>{
      const endpoint = import.meta.env.VITE_LOGIN_CHECK;

      const config = {
        method: 'GET',
        headers:{
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': 'https://apps-hibridas-final.onrender.com'
        },
        credentials: 'include'
    }

      const res = await fetch(endpoint, config);

      const loginInfo = await res.json();

      setloginInfo(loginInfo.data.userID);

      if(res.ok){
        setcheckUser(true);

      }else{
        setcheckUser(false);
      }
    }

    const adminCheck = async()=>{
      const endpoint = import.meta.env.VITE_ADMIN_CHECK;

      const config = {
        method: 'GET',
        headers:{
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': 'https://apps-hibridas-final.onrender.com'
        },
        credentials: 'include'
    }

      const res = await fetch(endpoint, config);

      const adminCheck = await res.json();

      if(res.ok){
        setcheckAdmin(true);

      }else{
        setcheckAdmin(false);
      }
    }

    loginCheck();
    adminCheck();

  return (
    <>
      <div className="py-5 mb-10 flex justify-center bg-teal-500">
        <div className="w-4/5">
          <ul className='flex justify-between text-lg font-semibold'>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/cats">Gatos</NavLink></li>

            {
              checkAdmin == true ? (
                <>
                  <li><NavLink to="/admin">Admin</NavLink></li>
                </>
              ) : (
                <></>
              )
            }

            {
              checkUser == true ? (
                <>
                  <li><NavLink to={`/profile/${loginInfo}`}>Perfil</NavLink></li>
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
      </div>

      {/* Rutas */}
      <Routes>
        <Route    path="/"                              element={ <Home /> }/>
        <Route    path="/cats"                          element={ <Cats /> }/>
        <Route    path="/cats/:id"                      element={ <CatDetail /> }/>

        <Route                                          element={ <AdminCheck check={checkAdmin} /> }>
            {/* home */}
          <Route  path="/admin"                         element={ <Admin /> }/>
            {/* gatos */}
          <Route  path="/admin/cats/"                   element={ <GatosAdmin /> }/>
          <Route  path="/cats/add"                      element={ <AddCat /> }/>
          <Route  path="/cats/edit/:id"                 element={ <EditCat /> }/>
          <Route  path="/cats/delete/:id"               element={ <DeleteCat /> }/>
            {/* colores */}
          <Route  path='/colors'                        element={ <ColoresAdmin/> }/>
          <Route  path='/colors/add'                    element={ <AddColor/> }/>
          <Route  path="/colors/delete/:id"             element={ <DeleteColor /> }/>
            {/* Largos */}
          <Route  path='/lengths'                       element={ <LargosAdmin /> } />
          <Route  path='/lengths/add'                   element={ <AddLargo /> } />
          <Route  path='/lengths/delete/:id'            element={ <DeleteLength /> } />
            {/* Usuarios */}
          <Route  path='/users'                         element={ <Usuarios /> } />
          <Route  path='/makeAdmin/:id'                 element={ <MakeAdmin /> } />
          <Route  path='/demoteAdmin/:id'               element={ <DemoteAdmin /> } />
        </Route>
        
        <Route                                          element={ <LoginCheck bool={true} check={checkUser} /> }>
          <Route  path="/profile/:id"                   element={ <Profile /> }/>
          <Route  path="/profile/edit/:id"              element={ <EditProfile /> }/>
        </Route>

        <Route                                          element={ <LoginCheck bool={false} check={checkUser} /> }>
          <Route  path="/login"                         element={ <Login /> }/>
          <Route  path="/register"                      element={ <Register />}/>
        </Route>
        
        <Route    path="/logout"                        element={ <Logout/> }/>
        <Route    path="*"                              element={ <NotFound /> }/>
      </Routes>
      
    </>
  )
}

export default App
