import React, { useState } from 'react';
import "./Userlogin.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'; //usehistory
import { Link } from 'react-router-dom';
import app from "../auth/Firebasesdk";


const Userlogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useNavigate();
    const handelsubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);
        try {
            const auth = getAuth(app);
            const result = await signInWithEmailAndPassword(auth, email, password);
            history("/");
            console.log(result.user.email)
        } catch (error) {
            console.log(error.message)
            alert("wrong ")
        }
        setPassword("");
        setEmail("");
    }
    return (
        <> <section className="loginImg">
                <div className="loginBox">
                    <form className='loginForm' onSubmit={(e) => handelsubmit(e)}>
                        <h1 className='loginHeading'>Login</h1>
                        <label className='emailLabel'>Email</label>
                        <input type="email" value={email} placeholder='Enter your email...' onChange={(e) => setEmail(e.target.value)} />
                        <label className='passwordLabel'>Password</label>
                        <input type="password" value={password} placeholder='Enter your password...' onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit" className='loginButton'>Login</button><br></br>
                        <p className='createAc' ><Link to="/Register">Create New Account</Link></p>
                    </form>

                </div>
            </section>
        </>
    )
}

export default Userlogin;
