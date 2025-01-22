// api.js
import axios from 'axios';

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

/**
 * Logs in a user and returns the user data
 * @param {string} email The user's email
 * @param {string} password The user's password
 * @returns {Promise<Object>} The user data
 */
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('An error occurred while logging in');
  }
};

/**
 * Sends a password reset email to the user
 * @param {string} email The user's email
 * @returns {Promise<Object>} The response from the server
 */
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/forgotpassword`, { email });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('An error occurred while sending the password reset email');
  }
};

/**
 * Resets a user's password
 * @param {string} token The password reset token
 * @param {string} password The new password
 * @returns {Promise<Object>} The response from the server
 */
export const resetPassword = async (token, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/reset/${token}`, { password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('An error occurred while resetting the password');
  }
};

/**
 * Updates a user's profile
 * @param {string} userId The user's ID
 * @param {Object} data The user data to update
 * @returns {Promise<Object>} The updated user data
 */
export const updateProfile = async (userId, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/user/update/${userId}`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('An error occurred while updating the profile');
  }
};

/**
 * Adds a like to a book
 * @param {string} bookId The book's ID
 * @param {string} userId The user's ID
 * @returns {Promise<Object>} The updated book data
 */
export const addLike = async (bookId, userId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/book/${bookId}/like`, { userId });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('An error occurred while adding the like');
  }
};

