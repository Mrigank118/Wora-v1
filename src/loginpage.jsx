import React, { useState } from 'react';
import './loginpage.css';

const Loginpage = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  
  const handleCloseClick = () => {
    onClose(); // Call the onClose prop to notify the parent component to close the login page
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/WORA/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: event.target['login-email'].value,
          password: event.target['login-password'].value,
        }),
      });
      if (!response.ok) {
        throw new Error('Error logging user');
      }

      const data = await response.json();
      console.log('Logged in successfully!');
      console.log(data.username); // Log the username received from the server
      
        setUsername(data.username);
    
       // Update the username state
    console.log(username);
      // Optionally, update the username globally
      // Close the login page after successful login
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/WORA/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      if (!response.ok) {
        throw new Error('Error creating user');
      }

      console.log('User created successfully!'); // Set username globally// Close the signup page after successful signup
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <button className="close-button" onClick={handleCloseClick}>X</button>
        <div className="form-header">
          <h2>Welcome</h2>
          <p>Sign in or create an account to get started.</p>
        </div>
        <div className="form-tabs">
          <button className={`tab-button ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>Login</button>
          <button className={`tab-button ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>Sign Up</button>
        </div>
        {isLogin ? (
          <div className="form-content active">
            <form onSubmit={handleLoginSubmit}>
              <label htmlFor="login-email">Email</label>
              <input type="email" id="login-email" name="login-email" required />
              <label htmlFor="login-password">Password</label>
              <input type="password" id="login-password" name="login-password" required />
              <a href="#" className="forgot-password">Forgot password?</a>
              <button className="submit" type="submit">Sign In</button>
            </form>
          </div>
        ) : (
          <div className="form-content active">
            <form onSubmit={handleSignupSubmit}>
              <label htmlFor="signup-username">Username</label>
              <input type="text" id="signup-username" name="signup-username" required value={username} onChange={handleUsernameChange} />
              <label htmlFor="signup-email">Email</label>
              <input type="email" id="signup-email" name="signup-email" required onChange={handleEmailChange} />
              <label htmlFor="signup-password">Password</label>
              <input type="password" id="signup-password" name="signup-password" required onChange={handlePasswordChange} />
              <button className="submit" type="submit">Sign Up</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
//export {setUsername};
export default Loginpage;


