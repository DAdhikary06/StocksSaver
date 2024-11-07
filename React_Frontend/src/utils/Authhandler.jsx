// AuthHandler.js
import axios from 'axios';
import Config from './Config';

const AuthHandler = {
  login: (username, password, callback) => {
    axios
      .post(Config.loginUrl, { username, password })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          localStorage.setItem('token', response.data.access);
          localStorage.setItem('refresh', response.data.refresh);
          localStorage.setItem('username', response.data.username);
          callback({ error: false, message: 'Login Successful...' });
        }
      })
      .catch((error) => {
        let errorMessage = 'Error During Login. Invalid Login Details.';
        if (error.response) {
          // Server responded with a status other than 200 range
          errorMessage = error.response.data.message || errorMessage;
        } else if (error.request) {
          // Request was made but no response received
          errorMessage = 'Network error. Please try again later.';
        }
        callback({
          error: true,
          message: 'Error During Login Invalid Login Details..',
        });
      });
  },
  loggedIn: () => {
    return !!localStorage.getItem('token') && !!localStorage.getItem('refresh');
  },
  logoutUser: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    localStorage.removeItem('username');
    
  },
  getLoginToken: () => {
    return localStorage.getItem('token');
  },
  getUsername: () => {
    return localStorage.getItem('username');
  },
  
  getRefreshToken: () => {
    return localStorage.getItem('refresh');
  },
  
  checkTokenExpiry : () => {
    const token = localStorage.getItem('token');
    if (!token) return true; // If no token, consider it expired
    const tokenArray = token.split(".");

    // atob() is a built-in function to decode a base64 encoded string
    const jwt = JSON.parse(atob(tokenArray[1])); // Parse the payload from the token
    const expire = jwt?.exp ? jwt.exp * 1000 : false; // Convert seconds to milliseconds
    return expire ? Date.now() > expire : false; // Check if token is expired
    // console.log('Token expiry check:', Date.now(), expire, time);
  },
};

export default AuthHandler;