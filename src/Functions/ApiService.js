import axios from 'axios';

const BASE_URL = 'https://jsonviewer.nekonik.com/share';
const API_KEY = 'API_KEY';


export const postJsonData = async (jsonData) => {
  try {
    const response = await axios.post(BASE_URL, jsonData, {
      headers: {
        'Content-Type': 'application/json',
        'API-Key': API_KEY
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


export const getSharedJson = async (uuid) => {
  try {
    const response = await axios.get(`${BASE_URL}/${uuid}`, {
      headers: {
        'API-Key': API_KEY
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching shared JSON:', error);
    throw error;
  }
};


