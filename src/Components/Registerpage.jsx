import React, { useState, useEffect } from 'react';
import "./Userlogin.css";
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../auth/Firebasesdk";
import { Link } from 'react-router-dom';
import { v4 as uuid4 } from "uuid"; //new id genrate krne ke liye install 
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getFirestore } from "firebase/firestore";

const Registerpage = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imgprofile, setImgProfile] = useState()
  const [imgurlprofile, setImgUrlProfile] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
  const history = useNavigate();

  const profileImgUpload = () => {

    if (imgurlprofile && name) {
      try {
        const db = getFirestore();
        const docPro = addDoc(collection(db, "users"), {
          userName: name,
          profileImg: imgurlprofile
        });
        alert("Your Field Data Store in firestore: ", docPro.id);
      } catch (e) {
        alert("Error adding document: ", e);
      }
    }
    if (!name || !email || !password || !name) {
      alert("pls fill all fields")
      return
    } const storage = getStorage();
    console.log(storage)
    const storageRef = ref(storage, `img/${uuid4()}`);
    const uploadTask = uploadBytesResumable(storageRef, imgprofile);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progress == "100") alert(`img upload successful ${progress} `)

      },
      (error) => {
        // Handle unsuccessful uploads
        alert(`img unsuccessful uploads  ${error.message} `)
      },
      () => {
        // Handle successful uploads on complete

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setImgUrlProfile(downloadURL)
        });
      }
    )
  };

  const handelsubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      const result = await createUserWithEmailAndPassword(auth, email, password)
      history("/")
      console.log(result)
      console.log(`Welcome${result.user.email}`)
    } catch (error) {
      console.log(error.code)
      console.log(error.message)
    }
    setPassword("");
    setEmail("");
    setName('')
  }
  return (

    <>
      <section className="loginImg">
        <div className="loginBox">
          <form className='loginForm' onSubmit={(e) => handelsubmit(e)}>
            <h1 className='loginHeading'>Register</h1>
            <img src={imgurlprofile} alt="profileImg" className='profileImgr'></img>
            <label className='emailLabel'>image</label>
            <input type="file" className='cBlogImg' onChange={(e) => setImgProfile(e.target.files[0])} />
            <label className='emailLabel'>FullName</label>
            <input type="text" value={name} placeholder='Enter your FullName...' onChange={(e) => setName(e.target.value)} />
            <label className='emailLabel'>Email</label>
            <input type="email" autoComplete='off' value={email} placeholder='Enter your email...' onChange={(e) => setEmail(e.target.value)} />
            <label className='passwordLabel'>Password</label>
            <input type="password" value={password} placeholder='Enter your password...' autoComplete='off' onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className='loginButton' onClick={profileImgUpload}>Register</button><br></br>
            <p className='createAc'><Link to="/Login">Already have Account</Link></p>
          </form>
        </div>
      </section>



    </>
  )
}

export default Registerpage;
