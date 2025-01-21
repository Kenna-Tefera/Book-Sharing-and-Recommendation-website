

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/Authcontext';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isChecked, setIsChecked] = useState(false); 
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(password);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!formData.email) formErrors.email = 'Email is required.';
    else if (!validateEmail(formData.email)) formErrors.email = 'Invalid email address.';

    if (!formData.password) formErrors.password = 'Password is required.';
    else if (!validatePassword(formData.password))
      formErrors.password =
        'Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character.';

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (!isChecked) {
      alert('You must agree to the Terms and Conditions!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/user/login', formData);
      console.log("response", response.data)
      if (response.data.msg === "logedIn") {
        localStorage.setItem('token', response.data.token);
        setIsLoggedIn(true);
        alert('Login Successful!');
        navigate("/home");
        
      } else {
        alert('Login failed: ' + response.data.msg);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in. Please try again.');
    }
  };

  const isFormValid =
    !errors.email && !errors.password && formData.email && formData.password && isChecked;

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl  font-medium mb-6 text-center text-blue-600">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 py-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 accent-blue-500"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
              I agree to the{' '}
              <Link to="/terms-and-conditions" className="text-blue-500 hover:underline">
                Terms and Conditions
              </Link>
            </label>
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md ${
              isFormValid ? 'bg-blue-500' : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!isFormValid}
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>
        <div className="mt-2 text-center">
          <p className="">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#FD7606] underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
