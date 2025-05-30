import axios from 'axios';

/**
 * Sends JSON data to the API and returns a key with expiration time
 * @param {Object} jsonData - The JSON data to send
 * @returns {Promise<{key: string, expiresAt: string}>}
 */
export const postJsonData = async (jsonData) => {
  try {
    const response = await axios.post('https://api.your-service.com/share', jsonData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return {
      key: response.data.key,
      expiresAt: response.data.expiresAt
    };
  } catch (error) {
    console.error('Error posting JSON data:', error);
    throw error;
  }
};

/**
 * Example usage:
 * 
 * try {
 *   const result = await postJsonData({
 *     name: "John Doe",
 *     age: 30
 *   });
 *   console.log('Received key:', result.key);
 *   console.log('Expires at:', result.expiresAt);
 * } catch (error) {
 *   // Handle error
 * }
 */
