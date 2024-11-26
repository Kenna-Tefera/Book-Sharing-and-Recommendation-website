import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert('Please provide your email address!');
      return;
    }

    console.log('Password reset requested for email:', email);
    alert('If this email is registered, a password reset link will be sent to it.');
  };

  return (
    <div className="h-screen bg-white-200 flex items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full h-full">
        <div className="flex flex-col items-center w-full mt-16">
          <h2 className="text-3xl text-center mb-4 font-poppins font-medium">Forgot Password</h2>
          <p className="text-center text-gray-500 font-poppins text-sm">
            Enter your email address to receive a password reset link.
          </p>
          <br />

          <div className="w-[400px] bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-400 text-sm font-bold mb-2"
                >
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-center">
                <button
                  id="resetButton"
                  className="text-white font-bold py-2 px-4 rounded-3xl w-full bg-[#003377] hover:bg-blue-600 transition-colors"
                  type="submit"
                >
                  Send Reset Link
                </button>
              </div>
            </form>

            <div className="text-center text-gray-500 mt-4">
              <p>
                Remember your password?{' '}
                <a href="/" className="text-[#FD7606] underline">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;