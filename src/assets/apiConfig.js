import axios from 'axios';


const API_URL = 'http://localhost:8080'; // Replace with the actual API URL


// Fetch all videos
// export const fetchDesignAssets = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/assets`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching videos:', error);
//       return [];
//     }
//   };
  
//   // Fetch video details by ID
//   export const fetchVideoDetails = async (id) => {
//     try {
//       const response = await axios.get(`${API_URL}/videos/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching video details:', error);
//       return null;
//     }
//   };