import React, { useState, useEffect, createContext } from 'react';
import "./NavArtical.css";
import { collection, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";


const tata = createContext();
const User = () => {
    const [articals, setArticals] = useState([]);

    const db = getFirestore();



    useEffect(() => {

        const collectionDb = collection(db, "users");
        const q = query(collectionDb, orderBy("createDate", 'desc'));//,limit(3)
        onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                //   createDate:doc.data().createDate.getMilliseconds(),
                ...doc.data(),
            }))
            console.log(data);
            setArticals(data)

        })
    }, [])

    return (
        <>
            {articals.length === 0 ? (<h1>No Articals Found</h1>)
                : (
                    articals.map((data) => (
                        <>
                            <div className='mainUserContainer' key={data.id}>
                                <div className='MainUserChield'>

                                    <div className='MainuserProfliePostCon'>
                                        <img src={data.images} className='MainuserProfilePostImg'></img>
                                    </div>
                                    <div className="mainUserPostContentCon">
                                        <div className='mainUserPostContent'>
                                            <h3 className='mainUserPostContentHeading'>{data.title}</h3>
                                            <p className='mainUserPostContentPgh'>{data.body}</p>
                                        </div></div>
                                </div>
                            </div>

                        </>))
                )}

        </>
    )
};

export default User;
export { tata }

