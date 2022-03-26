import React, { useState, useEffect, } from 'react';
import "./CreateBlog.css";
import { v4 as uuid4 } from "uuid"; //new id genrate krne ke liye install 
import { getStorage, ref, uploadBytesResumable, getDownloadURL, Timestamp } from "firebase/storage";
import { collection, addDoc, getFirestore } from "firebase/firestore";



const CreateBlog = ({ user }) => {
  console.log(user)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [img, setImg] = useState(null)
  const [imgurl, setImgUrl] = useState("")

  useEffect(() => {
    if (imgurl) {
      try {
        const db = getFirestore();
        const docRef = addDoc(collection(db, "users"), {
          title,
          body,
          uid: user.uid,
          images: imgurl,
          createDate: new Date().getDate()

        });
        alert("Your Field Data Store in firestore: ", docRef.id);
      } catch (e) {
        alert("Error adding document: ", e);
      }
    }
    setTitle('')
    setBody('')
    setImgUrl()
    setImg("")
  }, [imgurl])

  const submitDetails = () => {
    if (!title || !body || !img) {
      alert("pls fill all fields")
      return
    } const storage = getStorage();
    console.log(storage)
    const storageRef = ref(storage, `img/${uuid4()}`);
    const uploadTask = uploadBytesResumable(storageRef, img);
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
          setImgUrl(downloadURL)
        });
      }
    );

  }

  return (
    <>


      <div className="cBlogCon">
        <div className='cBlogChield'>
          <h1 className='cBlogHeading'>Create blog</h1>
          <div className='fieldsBox'>
            <input type="text" placeholder='Enter Title Here' className='cBlogtitle' value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea type="text" placeholder='Enter Body Here' rows="10" col="50" className='cBlogBody' value={body} onChange={(e) => setBody(e.target.value)} />
            <label className='fileLabel'>Select a Image:</label>
            <input type="file" className='cBlogImg' onChange={(e) => setImg(e.target.files[0])} />
            <button className='fieldSubBtn' onClick={submitDetails}>Publish</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateBlog;
