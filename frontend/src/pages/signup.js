

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    fullname: '',
    email: '',
    password: '',
  });

  const [isChecked, setIsChecked] = useState(false); 
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); 
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // Clear error when user starts typing
    setErrors({ ...errors, [id]: '' });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const minLength = /^(?=.{8,})/;
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const number = /\d/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

    return (
      minLength.test(password) &&
      uppercase.test(password) &&
      lowercase.test(password) &&
      number.test(password) &&
      specialChar.test(password)
    );
  };

  const validate = () => {
    let formErrors = {};

    if (!formData.fullname) formErrors.fullname = 'Full name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) formErrors.email = 'Email is invalid';
    if (!formData.password) formErrors.password = 'Password is required';
    else if (!validatePassword(formData.password))
      formErrors.password =
        'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character';
    if (!isChecked) formErrors.terms = 'You must agree to the Terms and Conditions';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/user/signup', formData);
      if (response.data.msg === 'registerd') {
        navigate('/login');
        alert('Registration Successful!');
      } else {
        alert('Registration failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error registration:', error);
      alert('An error occurred while registering. Please try again.');
    }
  };

  return (
    <div className="bg-animated-gradient from-green-400 via-blue-500 to-indigo-600 min-h-screen flex items-center justify-center text-blue-600">
      <div className="flex flex-col items-center w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl text-center font-poppins font-medium mb-6">Sign Up</h2>
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullname" className="block text-gray-400 text-sm font-bold mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fullname"
                type="text"
                placeholder="John Doe"
                value={formData.fullname}
                onChange={handleChange}
              />
              {errors.fullname && <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-400 text-sm font-bold mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-400 text-sm font-bold mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  className="form-checkbox h-4 w-4 accent-[#003377]"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                <span className="ml-2 text-gray-500">
                  I agree to{' '}
                  <Link to="/terms-and-conditions" className="text-orange-600 underline">
                    Terms and Conditions
                  </Link>
                </span>
              </label>
              {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
            </div>

            <div className="flex items-center justify-center">
              <button
                id="signupButton"
                className={`text-white font-bold py-2 px-4 rounded-3xl w-full ${
                  isChecked ? 'bg-[#003377]' : 'bg-gray-400 cursor-not-allowed'
                } hover:bg-blue-600 transition-colors`}
                type="submit"
                disabled={!isChecked}
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="text-center text-gray-950 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-[#FD7606] underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
