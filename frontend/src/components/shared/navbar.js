// // src/components/Navbar.js
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import logo from '../../assets/logo.svg'; // Import SVG logo
// import { isAuthenticated } from '../../utils/Auth';
// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="bg-black p-4 shadow-md">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         <Link to="/" className="flex items-center">
//           <img 
//             src={logo} 
//             alt="MyApp Logo"
//             className="h-10" 
//           />
//           <span className="text-white ml-2 text-xl font-bold">Book Lovers</span>
//         </Link>

//         <div className="hidden md:flex space-x-8">
//           <Link to="/" className="text-white hover:text-gray-300">
//             Home
//           </Link>
//           <Link to="/about" className="text-white hover:text-gray-300">
//             About
//           </Link>
//           <Link to="/services" className="text-white hover:text-gray-300">
//             Services
//           </Link>
//           <Link to="/profile" className="text-white hover:text-gray-300">
//           <img
//             src={ 'assets/img/book.jpg'}
//             alt="Profile"
//             className="w-8 h-8 rounded-full"
//           />
//           </Link>
//         </div>

//         {/* Mobile Menu Toggle Button */}
//         <button
//           onClick={toggleMenu}
//           className="md:hidden text-white focus:outline-none"
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         </button>

//         {/* Mobile Menu */}
//         <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
//           <div className="flex flex-col space-y-4 p-4 bg-black"> {/* Black background */}
//             <Link to="/" className="text-white hover:text-gray-300">
//               Home
//             </Link>
//             <Link to="/about" className="text-white hover:text-gray-300">
//               About
//             </Link>
//             <Link to="/services" className="text-white hover:text-gray-300">
//               Services
//             </Link>
//             <Link to="/contact" className="text-white hover:text-gray-300">
//               Contact
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import logo from '../../assets/logo.svg'; 
import { useAuth } from '../../context/Authcontext';
import { jwtDecode } from 'jwt-decode';

const Navbar = ( ) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  
  const token = localStorage.getItem('token');
  const userId = token ? jwtDecode(token).id : null;
  const userEmail= token ? jwtDecode(token).email:null;

  const handleAvatarClick = () => {
    navigate(`/profile/${userId}`); 
  };

  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

 const Logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login")
  };

  return (
    <nav className="bg-black p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to = "/" className="flex items-center">
          <img
            src={logo} 
            alt="MyApp Logo"
            className="h-10"
          />
          <span className="text-white ml-2 text-xl font-bold">Book Lovers</span>
        </Link>

        <div className="hidden md:flex space-x-8">
          <Link to="/home" className="text-white hover:text-gray-300">
            Home
          </Link>
         
          {isLoggedIn ? (
            <>
          <button onClick={handleAvatarClick}>
            
          <img
            src="/assets/img/book.jpg" // Avatar image
            alt="Profile Avatar"
            className="w-8 h-8 rounded-full hover:ring-2 ring-blue-500"
          />
         
           </button>
           <span className="text-white ml-2">{userEmail}</span>
              <button
                onClick={()=>Logout()}
                className="text-white hover:text-gray-300 px-3 border rounded-full border-orange-600 border-2 "
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-white hover:text-gray-300">
              Login
            </Link>
          )}
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>


        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="flex flex-col space-y-4 p-4 bg-black">
            <Link to="/home" className="text-white hover:text-gray-300">
              Home
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="text-white hover:text-gray-300">
                  Profile
                </Link>
                <button
                  onClick={() => Logout()}
                  className="text-white hover:text-gray-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-white hover:text-gray-300">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
