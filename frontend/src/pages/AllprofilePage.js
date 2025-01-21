// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../axiosInstance';

// const AllProfilePage = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState('');

//   // Fetch users from the API
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axiosInstance.get('http://localhost:5000/user/alluser'); // Adjust the URL to your API endpoint
//         setUsers(response.data);
//       } catch (err) {
//         setError(err.message || 'Failed to fetch users');
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">All User Profiles</h1>
//       {error && <p className="text-red-500">{error}</p>}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {users.map((user) => (
//           <div
//             key={user._id}
//             className="bg-gray-800 text-white p-4 rounded shadow-md flex items-center space-x-4"
//           >
//             {/* Avatar */}
//             <div className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full text-2xl font-bold">
//              {user.profile_picture}
//             </div>

//             {/* User Info */}
//             <div>
//               <h2 className="text-lg font-bold">{user.fullname}</h2>
//               <p className="text-gray-300">{user.email}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllProfilePage;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axosinstance';
import Sidebar from '../components/sidebar/sidebar';

const AllProfilePage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:5000/user/alluser');
        setUsers(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex min-h-screen">
    <Sidebar />
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All User Profiles</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => navigate(`/profile/${user._id}`)}
            className="bg-gray-800 text-white p-4 rounded shadow-md flex items-center space-x-4 cursor-pointer hover:bg-gray-600"
          >
          
            <div className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full text-2xl font-bold">
              {user.profile_picture}
            </div>

            <div>
              <h2 className="text-lg font-bold">{user.name}</h2>
              <p className="text-gray-300">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AllProfilePage;
