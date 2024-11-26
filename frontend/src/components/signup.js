import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [isChecked, setIsChecked] = useState(false); // State for checkbox
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password) {
      alert('Please fill in all the fields!');
      return;
    }

    if (!isChecked) {
      alert('You must agree to the Terms and Conditions!');
      return;
    }

    // Here you can add your API call to handle the signup logic
    console.log('Form submitted:', formData);

    // After successful signup, redirect to the login page
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="bg-animated-gradient from-green-400 via-blue-500 to-indigo-600 min-h-screen flex items-center justify-center text-blue-600">
      <div className="flex flex-col items-center w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl text-center font-poppins font-medium mb-6">Sign Up</h2>
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-gray-400 text-sm font-bold mb-2"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-400 text-sm font-bold mb-2"
              >
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
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-400 text-sm font-bold mb-2"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
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
            </div>

            <div className="flex items-center justify-center">
              <button
                id="signupButton"
                className={`text-white font-bold py-2 px-4 rounded-3xl w-full ${isChecked ? 'bg-[#003377]' : 'bg-gray-400 cursor-not-allowed'} hover:bg-blue-600 transition-colors`}
                type="submit"
                disabled={!isChecked} // Disable button if checkbox is not checked
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
