import axios from 'axios';
import Config from './Config';

const AuthHandler = {
  login: async (username, password, callback) => {
    try {
      const response = await axios.post(Config.loginUrl, { username, password });
      console.log(response.data);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
        localStorage.setItem('username', response.data.username);
        callback({ error: false, message: 'Login Successful...' });
      }
    } catch (error) {
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
        message: errorMessage,
      });
    }
  },

  register: async (formData, callback) => {
    try {
      const response = await axios.post(Config.registerUrl, formData);

      if (response.status === 201) {
        callback({ error: false, message: 'Registration Successful...' });
      }
      console.log(response.data)
    } catch (error) {
      // Handle error response
      if (error.response) {
        // The request was made and the server responded with a status code
        return { error: error.response.data }; // Return the error message
      } else {
        // The request was made but no response was received
        return { error: { non_field_errors: ['Network error'] } };
      }
    }
  },
  
  loggedIn: () => {
    return !!localStorage.getItem('token') && !!localStorage.getItem('refresh');
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
  
  logoutUser: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    localStorage.removeItem('username');
  },
  checkTokenExpiry: () => {
    const token = localStorage.getItem('token');
    if (!token) return true; // If no token, consider it expired
    const tokenArray = token.split(".");

    // atob() is a built-in function to decode a base64 encoded string
    const jwt = JSON.parse(atob(tokenArray[1])); // Parse the payload from the token
    const expire = jwt?.exp ? jwt.exp * 1000 : false; // Convert seconds to milliseconds
    const isExpired = expire ? Date.now() > expire : false; // Check if token is expired
    
    return isExpired;
  },
};

export default AuthHandler;