import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast }from 'react-toastify';
import { useCookies } from "react-cookie";


const Register = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();
   const [error, ] = useState("");
   const [cookies] = useCookies(["cookie-name"]);

   useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);




   const generateError = err => toast.error(err, {
      position:"bottom-right"
   });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } =  await Axios.post("http://localhost:8080/register", {
        email,
        password,
    }, {
      withCredentials: true,
    }
    );
    if(data){
       if(data.errors){
           const {email, password} = data.errors;
             if(email) generateError(email)
             else if(password) generateError(password)
       }else{
        navigate('/');
       }
    }
    } catch (error) {
      console.log(error);
    }

}



  return (
    <div className='container m-5 p-8'>
      <h1>Resgister A new User</h1>
      {error && <span style={{ color: "red"}}>{error}</span>}
      <form onSubmit={submitHandler}>
  <div className="mb-3">
    <label className="form-label">EMAIL</label>
    <input 
    type="email" 
    className="form-control" 
    aria-describedby="emailHelp" 
    placeholder='your email' 
    onChange={(e) => setEmail(e.target.value)}
    />
  </div>
  <div className="mb-3">
    <label className="form-label">PASSWORD</label>
    <input 
    type="password" 
    className="form-control" 
    placeholder='your password'
    onChange={(e) => setPassword(e.target.value)}
    />
  </div>
  <button type="submit" className="btn btn-primary">Register</button>
</form>
<span>Already have an account? <Link to="/login">Log in</Link></span>
  <ToastContainer />
    </div>
  )
}

export default Register;
