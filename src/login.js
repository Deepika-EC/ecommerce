import { initializeApp } from "firebase/app";
import React ,{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";


function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate=useNavigate()

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
const auth=getAuth()

   
    const changeEmail=(e)=>{
        setEmail(e.target.value)
    }
    const changePassword=(e)=>{
        setPassword(e.target.value)
    }
   

    const submitData=(e)=>{
        e.preventDefault()
        let obj={
            email:email,
            password:password
        }
        signInWithEmailAndPassword(auth,obj.email,obj.password)
        .then(()=>{
            alert("successfully loggedin....!")
            navigate("/a")
        })
        .catch(()=>{
            alert("Error...!")
        })
    }

    return (
        <div style={{backgroundImage:`url("https://assets.uxbooth.com/uploads/2021/07/cart.jpeg")`,backgroundRepeat:"no-repeat",backgroundSize:"cover",padding: "30px",minHeight:"100vh"}}>
        <div className="mx-5 my-5"  style={{ maxWidth: "400px" }}>
            <div className="card m-3" style={{backgroundColor:"rgba(55, 55, 56, 0.568)"}}>
                <div className="card-title text-center">
                    <h2>Login Form</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={submitData}>
                        <div className="mb-3">
                            <label className="form-label px-2"><i class="fa-solid fa-envelope"></i><span className="px-2">Email</span></label>
                            <input value={email} type="email" className="form-control" onChange={changeEmail} style={{border:"none",borderBottom:"2px solid black"}} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label px-2"><i class="fa-solid fa-key"></i><span className="px-2">Password</span></label>
                            <input value={password} type="password" className="form-control" onChange={changePassword} style={{border:"none",borderBottom:"2px solid black"}} required/>
                        </div>
                        <div className="text-center">
                        <button type="submit" className="btn btn-success mx-4" >Submit</button>
                        <Link to="/" className="btn btn-danger">Back</Link>
                        <br/><br/>
                        <div>
                            <b>If you do not have an account? </b><br/>
                            <Link to="/" style={{color:"blue",fontSize:"20px"}}> REGISTER HERE</Link>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Login;