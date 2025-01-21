

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate , to, Link} from 'react-router-dom';
import Sidebar from '../components/sidebar/sidebar';
import axiosInstance from '../axosinstance';
import {jwtDecode} from 'jwt-decode';

const Profile = () => {
  const [user, setUser] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const [message, setMessage] = useState('');
  const [userDeleted, setUserDeleted] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const loggedInUserId = token ? jwtDecode(token).id : null;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:5000/user/${userId}`);
        setUser(response.data);

        const isUserFollowing = response.data.follower.includes(loggedInUserId);
        setIsFollowing(isUserFollowing);
      } catch (error) {
        console.error("Error fetching user data:", error.response?.data || error.message);
      }
    };

    fetchUserData();
  }, [userId]);



  const handleFollow = async () => {
    try {
      if (isFollowing) return; 
      setIsFollowing(true);
      console.log("isFollowing after optimistic update:", setIsFollowing);
  
      const response = await axiosInstance.post(`http://localhost:5000/user/${userId}/follow`, {
        newFollower: loggedInUserId,
      });
  
      setUser((prevUser) => ({
        ...prevUser,
        follower: response.data.user.follower,
      }));
  
      const isUserFollowing = response.data.user.follower.includes(loggedInUserId);
      console.log("Updated followers from backend:", response.data.user.follower);
      console.log("isFollowing after backend sync:", isUserFollowing);
      setIsFollowing(isUserFollowing);
    } catch (error) {
      console.error("Error following user:", error.response?.data || error.message);
  
      setIsFollowing(false);
    }
  };
  
  
  


  // const handleFollow = async () => {
  //   try {
  //     setUser((prevUser) => ({
  //       ...prevUser,
  //       follower: [...prevUser.follower, loggedInUserId], // Optimistic UI update
  //     }));
  //     setIsFollowing(true);
  
  //     await axios.post(`http://localhost:5000/user/${userId}/follow`, {
  //       newFollower: loggedInUserId,
  //     });
  //   } catch (error) {
  //     console.error('Error following user:', error.response?.data || error.message);
  
  //     // Rollback in case of error
  //     setUser((prevUser) => ({
  //       ...prevUser,
  //       follower: prevUser.follower.filter((id) => id !== loggedInUserId),
  //     }));
  //     setIsFollowing(false);
  //   }
  // };
  
  
  const handleUnfollow = () => {
    axiosInstance
      .post(`http://localhost:5000/user/${userId}/unfollow`, { followerId: loggedInUserId })
      .then((response) => {
        setUser((prevUser) => ({
          ...prevUser,
          follower: response.data.user.follower, 
        }));
        setIsFollowing(false); 
      })
      .catch((error) => console.error('Error unfollowing user:', error));
  };
  
  

  
  const handleDeleteProfile = async () => {
    try {
      const confirmation = window.confirm(
        'Are you sure you want to delete your profile? This action cannot be undone.'
      );
      if (!confirmation) return;

      await axiosInstance.delete(`http://localhost:5000/user/deleteProfile/${userId}`);
      setUserDeleted(true);
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Error deleting profile:', error);
      setMessage(error.response?.data || 'Failed to delete profile');
    }
  };


  if (userDeleted) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold text-red-500">
          Profile Deleted Successfully
        </h2>
        <p className="text-gray-600 mt-2">
          We're sorry to see you go! Please visit again.
        </p>
        <a href="/signup" className="text-blue-500 hover:underline">
          Create a new account
        </a>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
    <Sidebar />
      <div className="max-w-4xl mx-auto p-10 bg-white shadow-md rounded-lg my-10">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between space-y-6 md:space-y-0 md:space-x-6">
          <img
            src={user.profile_picture || '/assets/img/book.jpg'}
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-semibold">
              {user.fullname || 'Full Name Not Provided'}
            </h2>
            <p className="text-gray-600 mt-2">
              {user.email || 'Email Not Provided'}
            </p>
            {loggedInUserId !== userId && (
              <button
                className={`mt-4 py-2 px-6 rounded text-white ${
                  isFollowing
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
                onClick={isFollowing ? handleUnfollow : handleFollow}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>
        </div>
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
        <p className="text-center text-gray-600 mt-2">
          {user.bio || 'Add a bio to let others know more about you.'}
        </p>

        {loggedInUserId === userId && (
          <div className="flex justify-between mt-6">
            <Link  to={`/editprofile/${userId}`}>
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Edit Profile
              </button>
            </Link>
            
            <button
              onClick={handleDeleteProfile}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Delete Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
