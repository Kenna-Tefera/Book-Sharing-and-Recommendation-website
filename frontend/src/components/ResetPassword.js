
import React, { useState } from "react";

const ResetPassword = () => {
  const [formValues, setFormValues] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { newPassword, confirmPassword } = formValues;

    if (newPassword === confirmPassword) {
      alert("Password reset successful!");
    } else {
      alert("Passwords do not match. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Reset Password</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="password"
              id="newPassword"
              value={formValues.newPassword}
              onChange={handleChange}
              className="peer w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=" "
            />
            <label
              htmlFor="newPassword"
              className="absolute left-3 -top-3 text-sm bg-white px-1 text-blue-500 pb-2 transition-all peer-placeholder-shown:top-1/4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white peer-focus:px-1"
            >
              New Password
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              id="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleChange}
              className="peer w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=" "
            />
            <label
              htmlFor="confirmPassword"
              className="absolute left-3 -top-3 text-sm bg-white px-1 text-blue-500 pb-2 transition-all peer-placeholder-shown:top-1/4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white peer-focus:px-1"
            >
              Confirm Password
            </label>
          </div>

          <div className="flex items-center justify-center">
            <button
              id="resetButton"
              className="text-white font-bold py-2 px-4 rounded-3xl w-full bg-[#003377] hover:bg-blue-600 transition-colors"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
