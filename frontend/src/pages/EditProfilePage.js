import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar/sidebar';
import axios from 'axios';

const EditProfile = ({ userId }) => {
  const [user, setUser] = useState({
    fullname: '',
    email: '',
    bio: '',
    profile_picture: '',
    sex: '',
    age: 0,
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/profile/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.error(error));
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, profile_picture: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullname', user.fullname);
    formData.append('email', user.email);
    formData.append('bio', user.bio);
    formData.append('sex', user.sex);
    formData.append('age', user.age);
    if (user.profile_picture instanceof File) {
      formData.append('profile_picture', user.profile_picture);
    }

    axios
      .put(`/api/profile/${userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        alert('Profile updated successfully!');
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex min-h-screen">
    <Sidebar />
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-center text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold">Full Name</label>
        <input
          type="text"
          name="fullname"
          value={user.fullname}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2 font-semibold">Bio</label>
        <textarea
          name="bio"
          value={user.bio}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2 font-semibold">Gender</label>
        <select
          name="sex"
          value={user.sex}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label className="block mb-2 font-semibold">Age</label>
        <input
          type="number"
          name="age"
          value={user.age}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2 font-semibold">Profile Picture</label>
        <input
          type="file"
          name="profile_picture"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded mb-4"
        />
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
    </div>
  );
};

export default EditProfile;
