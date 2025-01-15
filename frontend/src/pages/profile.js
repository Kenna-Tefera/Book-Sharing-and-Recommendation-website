

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Profile = ({ userId, loggedInUserId }) => {
//   const [user, setUser] = useState({});
//   const [isFollowing, setIsFollowing] = useState(false);

//   useEffect(() => {
//     // Fetch the profile user data
//     axios.get(`/api/profile/${userId}`)
//       .then(response => {
//         setUser(response.data);
//         // Check if the logged-in user is already following this profile
//         setIsFollowing(response.data.follower.includes(loggedInUserId));
//       })
//       .catch(error => console.error(error));
//   }, [userId, loggedInUserId]);

//   const handleFollow = () => {
//     axios.post(`/api/profile/${userId}/follow`, { followerId: loggedInUserId })
//       .then(response => {
//         setUser(response.data); // Update user data
//         setIsFollowing(true); // Set the following state
//       })
//       .catch(error => console.error(error));
//   };

//   const handleUnfollow = () => {
//     axios.post(`/api/profile/${userId}/unfollow`, { followerId: loggedInUserId })
//       .then(response => {
//         setUser(response.data); // Update user data
//         setIsFollowing(false); // Set the following state
//       })
//       .catch(error => console.error(error));
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
//       {/* Profile Picture */}
//       <img
//         src={user.profile_picture || '/default-avatar.png'}
//         alt="Profile"
//         className="w-24 h-24 rounded-full mx-auto"
//       />

//          {/* Follower and Following Counts */}
//          <div className="flex justify-around mt-6">
//         <div className="text-center">
//         <p className="text-gray-600">Followers</p>
//           <span className="text-xl font-bold">{user.follower?.length || 0}</span>
//         </div>

//         <div className="text-center">
//           <p className="text-gray-600">Following</p>
//           <span className="text-xl font-bold">{user.following?.length || 0}</span>
//         </div>

//         <div className="text-center">
//           <p className="text-gray-600">Groups</p>
//           <span className="text-xl font-bold">{user.Groups?.length || 0}</span>
//         </div>
//       </div>

//       {/* Full Name */}
//       <h2 className="text-center text-2xl font-bold mt-4">
//         {user.fullname || "Your Name"}
//       </h2>

//       {/* Bio */}
//       <p className="text-center text-gray-600">
//         {user.bio || "Add a bio to let others know more about you."}
//       </p>


//       {/* Follow/Unfollow Button */}
//       {/* <div className="flex justify-center mt-6">
//         {loggedInUserId !== userId && (
//           isFollowing ? ( */}
//             <button
//               className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
//               onClick={handleUnfollow}
//             >
//               Unfollow
//             </button>
//           {/* ) : ( */}
//             <button
//               className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//               onClick={handleFollow}
//             >
//               Follow
//             </button>
//           {/* )
//         )}
//       </div> */}

     
//       {loggedInUserId === userId && (
//         <div className="flex justify-between mt-6">
//           <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
//             Edit Profile
//           </button>
//           <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
//             Delete Profile
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/sidebar/sidebar';

const Profile = ({ userId, loggedInUserId }) => {
  const [user, setUser] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    axios.get(`/api/profile/${userId}`)
      .then(response => {
        setUser(response.data);
        setIsFollowing(response.data.follower.includes(loggedInUserId));
      })
      .catch(error => console.error(error));
  }, [userId, loggedInUserId]);

  const handleFollow = () => {
    axios.post(`/api/profile/${userId}/follow`, { followerId: loggedInUserId })
      .then(response => {
        setUser(response.data); 
        setIsFollowing(true); 
      })
      .catch(error => console.error(error));
  };

  const handleUnfollow = () => {
    axios.post(`/api/profile/${userId}/unfollow`, { followerId: loggedInUserId })
      .then(response => {
        setUser(response.data); 
        setIsFollowing(false); 
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="max-w-4xl mx-auto p-10 bg-white shadow-md rounded-lg my-10">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between space-y-6 md:space-y-0 md:space-x-6">
          <img
            src={user.profile_picture || 'assets/img/book.jpg'}
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />

          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-semibold">
              {user.fullname || "Full Name Not Provided"}
            </h2>
            <p className="text-gray-600 mt-2">
              {user.email || "Email Not Provided"}
            </p>

            {/* Only show follow/unfollow button if the logged-in user is not the profile owner */}
            {loggedInUserId !== userId && (
              <button
                className={`mt-4 py-2 px-6 rounded text-white ${isFollowing ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                onClick={isFollowing ? handleUnfollow : handleFollow}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>
        </div>

        {/* Followers, Following, and Groups */}
        <div className="flex justify-around mt-6 space-x-8">
          <div className="text-center">
            <p className="text-gray-600">Followers</p>
            <span className="text-xl font-bold">{user.follower?.length || 0}</span>
          </div>

          <div className="text-center">
            <p className="text-gray-600">Following</p>
            <span className="text-xl font-bold">{user.following?.length || 0}</span>
          </div>

          <div className="text-center">
            <p className="text-gray-600">Groups</p>
            <span className="text-xl font-bold">{user.Groups?.length || 0}</span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-center text-gray-600 mt-2">
          {user.bio || "Add a bio to let others know more about you."}
        </p>

        {/* Edit/Delete Profile buttons */}
        {loggedInUserId === userId && (
          <div className="flex justify-between mt-6">
            <a href="/editprofile">
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Edit Profile
              </button>
            </a>
            <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
              Delete Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
