import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL 
const API_KEY = process.env.REACT_APP_API_KEY 



export const postJsonData = async (jsonData) => {
  try {
    const response = await axios.post(`${BASE_URL}/neko-nik/json-share`, jsonData, {
      headers: {
        'Content-Type': 'application/json',
        'API-Key': API_KEY
      }
    });    return {
      id: response.data.data.id,
      expiresAt: response.data.data.expires_at
    };
  } catch (error) {
    console.error('Error posting JSON data:', error);
    throw error;
  }
};


export const getSharedJson = async (uuid) => {
  try {
    const headers = API_KEY ? { 'API-Key': API_KEY } : {};    const response = await axios.get(`${BASE_URL}/neko-nik/json-share/${uuid}`, {
      headers
    });

    const content = response.data.data.content;
    return typeof content === 'string' ? content : JSON.stringify(content, null, 2);
  } catch (error) {
    console.error('Error fetching shared JSON:', error);
    throw error;
  }
};


