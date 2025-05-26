import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
  const [isActive, setIsActive] = useState(false);
 const navigate = useNavigate();
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    console.log('Login submitted:', { username, password });

    // 👉 You can call your login API here
    const response = axios.post('http://localhost:5000/api/users/login', {
      username,
      password
    })
  };

  const handleRegisterSubmit = async(e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    console.log('Signup submitted:', { username, email, password });

    // 👉 You can call your registration API here
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        username,
        password,
        email
      });

      console.log("The response data:", response.data);

      if (response.data.success) {
        console.log("Registration successful");
        toast.success("Success Notification!", {
          position: "top-right"
        });
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Error occurred during registration", {
        position: "top-right"
      });
    }
  }

  return (
    <div className={`wrapper ${isActive ? 'active' : ''}`}>
      <span className="bg-animation"></span>
      <span className="bg-animation2"></span>

      {/* Login Form */}
      <div className="form-box login">
        <h2 className="animation" style={{ '--i': 0 }}>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <div className="input-box animation" style={{ '--i': 1 }}>
            <input type="text" id="login-username" required />
            <label htmlFor="login-username">Username</label>
            <i className="icon"></i>
          </div>

          <div className="input-box animation" style={{ '--i': 2 }}>
            <input type="password" id="login-password" required />
            <label htmlFor="login-password">Password</label>
            <i className="icon"></i>
          </div>
          <button type="submit" className="bttn animation" style={{ '--i': 3 }}>Login</button>
          <div className="register-link animation" style={{ '--i': 4 }}>
            <p>Not a member? <a href="#" onClick={() => setIsActive(true)}>Register now</a></p>
          </div>
        </form>
      </div>

      <div className="info-text login">
        <h2 className="animation" style={{ '--i': 0 }}>Welcome Back!</h2>
        <p className="animation" style={{ '--i': 1 }}>Login to your account to continue</p>
      </div>

      {/* Register Form */}
      <div className="form-box register">
        <h2 className="animation" style={{ '--i': 17 }}>Sign Up</h2>
        <form onSubmit={handleRegisterSubmit}>
          <div className="input-box animation" style={{ '--i': 19 }}>
            <input type="text" id="register-username" required />
            <label htmlFor="register-username">Username</label>
            <i className="icon"></i>
          </div>

          <div className="input-box animation" style={{ '--i': 21 }}>
            <input type="email" id="register-email" required />
            <label htmlFor="register-email">Email</label>
            <i className="icon"></i>
          </div>

          <div className="input-box animation" style={{ '--i': 23 }}>
            <input type="password" id="register-password" required />
            <label htmlFor="register-password">Password</label>
            <i className="icon"></i>
          </div>

          <button type="submit" className="bttn animation" style={{ '--i': 25 }}>Sign Up</button>
          <div className="register-link animation" style={{ '--i': 27 }}>
            <p>Already have an account? <a href="#" onClick={() => setIsActive(false)}>Login now</a></p>
          </div>
        </form>
      </div>

      <div className="info-text register">
        <h2 className="animation" style={{ '--i': 20 }}>Register</h2>
        <p className="animation" style={{ '--i': 25 }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, soluta!</p>
      </div>
    </div>
  );
};

export default LoginRegister;
