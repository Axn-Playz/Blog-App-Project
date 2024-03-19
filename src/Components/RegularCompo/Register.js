import React, { useState } from 'react'
import NavBar from '../ResusableCompo/NavBar'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8000/user/register", { email, password, username })
      console.log(data)
      if (data.message === "notexist") {
        toast.success('✔ Account Created!', {
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
          setUsername("");
          setEmail("");
          setPassword("");
          navigate("/");
        }, 1500);

      }else{
        toast.error('🤔 User Already Exist!', {
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
      }
     catch (error) {
      toast.error('🤔 Something went wrong!', {
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
  }
  return (
    <div>
      <div className="nav-bar">
        <NavBar />
      </div>
      <div className='container register'>
        <form action='POST'>
          <h2>Register</h2>
          <br />
          <div className="mb-3">
            <div className="mb-3">
              <label htmlFor="exampleInputUsername1" className="form-label">Username</label>
              <input type="text" className="form-control" id="exampleInputUsername1" onChange={(e) => setUsername(e.target.value)} value={username} />
            </div>
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <p>Already have an account. then?</p>
          <Link to='/'>Login</Link><br />
          <button type="submit" className="btn btn-primary mt-3" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Register
