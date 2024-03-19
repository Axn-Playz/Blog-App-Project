import React, { useState } from 'react';
import NavBar from '../ResusableCompo/NavBar';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import {authActions} from '../../redux/Store'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post("http://localhost:8000/user/login",{email,password});
      if (data.message === "exist"){
        toast.success('✔ Account Available!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",  

      });
      setTimeout(() => {
        setEmail("");
        setPassword("");
        console.log(data?.user[0])
        localStorage.setItem('userId',data?.user[0]._id);
        localStorage.setItem('userName',data?.user[0].username);
        dispatch(authActions.login( ))
        navigate("/blog");
      }, 1500);
    }else if (data.message === "wrongPass"){
      toast.error('🤔Detail didnt matched!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

    });
    }else{
      toast.error('🤔Account Unavailable!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

    });
    }
    } catch (error) {
      toast.error('🤔Something went wrong!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

    });
    console.log(error)
    }
  }
  return (
    <div>
      <div className="nav-bar">
        <NavBar />
      </div>
      <div className='container login'>
        <form action='POST'>
          <h2>Login</h2>
          <br />
          <div className="mb-3">
            
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} value={email}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)}value={password} />
          </div>
          <p>If you don't have an account here. then?</p>
          <Link to='/register'>Register</Link><br />
          <button type="submit" className="btn btn-primary mt-3" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Login
