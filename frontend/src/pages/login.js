


// import React, { useState } from 'react';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

// export default Login;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isChecked, setIsChecked] = useState(false); // State for checkbox

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert('Please fill in all the fields!');
      return;
    }

    if (!isChecked) {
      alert('You must agree to the Terms and Conditions!');
      return;
    }

    // Call the login handler if everything is valid
    onLogin();
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 accent-blue-500"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)} // Toggle checkbox
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
            className={`w-full py-2 px-4 rounded-md ${isChecked ? 'bg-blue-500' : 'bg-gray-400 cursor-not-allowed'}`}
            disabled={!isChecked} // Disable button if checkbox is not checked
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
          <p className="text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
