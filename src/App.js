
import React, { useEffect, useState } from 'react';
import "./Components/App.css";
import Login from "./Components/Userlogin";
import Register from "./Components/Registerpage";
import { Routes, Route, Link } from 'react-router-dom';
// import Home from "./Components/Home";
import Artical from "./Components/NavArtical";
import Createblog from "./Components/CreateBlog";
import Art from "./Components/Artical";
import { getAuth } from "firebase/auth";

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    getAuth().onAuthStateChanged(user => {
      if (user) setUser(user)
      else setUser(null)
    })
  }, [])
  console.log(user)

  return (
    <>
      <div className="navContainer">
        <div className='navLink'>
          <div className='navLogo'>
            <h1><Link to="/Artical">Logo</Link></h1>
          </div>
          <div className="navLinks">
            {/* <Link to="/" activeClassName="link_active"> Home </Link> */}
            <Link to="/" activeClassName="link_active">Artical</Link>
            {user ?
              <>
                <Link to="/Createblog" activeClassName="link_active">  CreateBlog</Link>
                <button className='logoutBtn' onClick={() => getAuth().signOut()}>Logout</button>
              </>
              :
              <>
                <Link to="/Login" activeClassName="link_active"> Login</Link>
                <Link to="/Register" activeClassName="link_active"> Register</Link>
              </>
            }
          </div>
        </div>
      </div>

      <Routes> <Route path="/Art" element={<Art />} />
        {/* <Route   path="/" element={<Home/>}/> */}
        <Route path="/" element={<Artical />} />
        <Route path="/Createblog" element={<Createblog user={user} />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        {/* // <Route   path="/UserProfile/:id" element={<UserOpenProfile/>}/>  */}
        {/* render={props=>(<UserOpenProfile {...props} />)} */}
      </Routes>

    </>
  )
}

export default App;

