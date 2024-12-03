// src/api.js
export const fetchData = async () => {
    try {
      const response = await fetch('https://api.example.com/data');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error during fetch:', error);
      throw error; // Re-throw or handle the error appropriately
    }
  };
  