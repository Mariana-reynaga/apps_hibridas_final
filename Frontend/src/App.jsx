import { Routes, Route, NavLink } from 'react-router-dom'
import { useState } from 'react';
import './App.css'

// Rutas
import Home         from "./views/Home";
  // Gatos
import Cats         from "./views/Cats/Cats";
import AddCat       from "./views/Cats/AddCat";
import CatDetail    from "./views/Cats/Details";
import EditCat      from "./views/Cats/EditCat";
import DeleteCat    from './views/Cats/DeleteCat';
  // Colores
import AddColor     from './views/Colors/AddColor';
import DeleteColor  from './views/Colors/DeleteColor';
  // Largo
import AddLargo     from './views/Lengths/AddLength';
import DeleteLength from './views/Lengths/DeleteLength'
  // Usuario
import Login        from "./views/Auth/Login";
import Logout       from "./views/Auth/Logout";
import Register     from "./views/Auth/Register";
import Profile      from './views/User/Profile';
import EditProfile  from './views/User/EditProfile';
import Admin        from "./views/Admin";

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
            'Content-type': 'application/json'
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
            'Content-type': 'application/json'
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
      <div className="py-5 mb-10 flex justify-center bg-green-600">
        <div className="w-4/5">
          <ul className='flex justify-between'>
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

          <Route  path="/cats/add"                      element={ <AddCat /> }/>
          <Route  path="/cats/edit/:id"                 element={ <EditCat /> }/>
          <Route  path="/cats/delete/:id"               element={ <DeleteCat /> }/>
          <Route  path='/colors/add'                    element={ <AddColor/> }/>
          <Route  path="/colors/delete/:id"             element={ <DeleteColor /> }/>
          <Route  path='/lengths/add'                   element={ <AddLargo /> } />
          <Route  path='/lengths/delete/:id'            element={ <DeleteLength /> } />
          <Route  path="/admin"                         element={ <Admin /> }/>

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
