import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { useEffect, useState } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyBRwpa1nvwlZpzdA9vQwbogLLA-bM6oRYQ",
    authDomain: "cart-a65f3.firebaseapp.com",
    projectId: "cart-a65f3",
    storageBucket: "cart-a65f3.appspot.com",
    messagingSenderId: "934653575495",
    appId: "1:934653575495:web:5d4802f0e419b1d67c0c62",
    measurementId: "G-20837Z7NNV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()

function UserAuth(){
    const [user,setUser]=useState()
    // const data=(user)=>{
    //     setUser(user)
    // } instead of this we use user=>setUser(user)
    useEffect(()=>{
        let x=onAuthStateChanged(auth,user=>setUser(user))
        // onauthstatechanged -- used when ever the auth will be changed the new account will be displayed(current user)
        return x
    },[])
    return user   // state values (user)
    
}
export default UserAuth;