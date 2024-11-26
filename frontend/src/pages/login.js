


// import React, { useState } from 'react';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [isChecked, setIsChecked] = useState(false);

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.email || !formData.password) {
//       alert('Please fill in all the fields!');
//       return;
//     }

//     if (!isChecked) {
//       alert('Please accept the Terms and Conditions!');
//       return;
//     }

//     console.log('Form submitted:', formData);
//   };

//   return (
//     <div className="bg-animated-gradient from-green-400 via-blue-500 to-indigo-600 min-h-screen flex items-center justify-center text-blue-600">
//       <div className="flex flex-col items-center w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
//         <h2 className="text-2xl text-center font-poppins font-medium mb-6">Login</h2>
//         <div className="w-full">
//           <form onSubmit={handleSubmit}>
           
//             <div className="mb-4">
//               <label
//                 htmlFor="email"
//                 className="block text-gray-400 text-sm font-bold mb-2"
//               >
//                 Email <span className="text-red-500">*</span>
//               </label>
//               <input
//                 className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="email"
//                 type="email"
//                 placeholder="you@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="mb-4">
//               <label
//                 htmlFor="password"
//                 className="block text-gray-400 text-sm font-bold mb-2"
//               >
//                 Password <span className="text-red-500">*</span>
//               </label>
//               <input
//                 className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="password"
//                 type="password"
//                 placeholder="Enter your password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="mb-4">
//               <label className="inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   id="terms"
//                   className="form-checkbox h-4 w-4 accent-[#003377]"
//                   checked={isChecked}
//                   onChange={() => setIsChecked(!isChecked)}
//                 />
//                 <span className="ml-2 text-gray-500">
//                   I agree to{' '}
//                   <a
//                     href="#"
//                     className="text-orange-600 underline decoration-orange-600"
//                   >
//                     Terms and Conditions
//                   </a>
//                 </span>
//               </label>
//             </div>

//             <div className="flex items-center justify-center">
//               <button
//                 id="signupButton"
//                 className="text-white font-bold py-2 px-4 rounded-3xl w-full bg-[#003377] hover:bg-blue-600 transition-colors"
//                 type="submit"
//               >
//                 Login
//               </button>
//             </div>
//           </form>

//           <p className="text-center text-gray-950 mt-4">
//             Don,t have an account?{' '}
//             <a href="/signup" className="text-[#FD7606] underline">
//               Signup
//             </a>
//           </p>
//         </div>


//         <div class="flex-grow lg:flex-none w-full lg:w-1/2 h-screen">
//         <img src="..\assets\img\_6a43fce5-1b66-4238-af97-d3a30842283d.jpg" alt="People watching a video"
//           class="w-full h-full object-cover" />
//       </div>
//       </div>
//     </div>
//   );
// };

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
