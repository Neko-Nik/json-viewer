import axios from 'axios';

const BASE_URL = 'https://api.nekonik.com/neko-nik/json-share';
const API_KEY = 'TMDRHRQSyWuRi0A0g40gS';


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


