import axios from 'axios';

const BASE_URL = 'https://api.nekonik.com/neko-nik/json-share';
const API_KEY = 'TMDRHRQSyWuRi0A0g40gS';
const HEADERS = {
  'Content-Type': 'application/json',
  'API-Key': API_KEY
};


const postJsonData = async (jsonData) => {
  try {
    const response = await axios.post(BASE_URL, jsonData, {headers: HEADERS});
    if (response.status !== 201) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }

    return response.data;
  }
  catch (error) {
    console.error('Error posting JSON data:', error);
    throw error;
  }
};


const getSharedJson = async (uuid) => {
  try {
    const response = await axios.get(`${BASE_URL}/${uuid}`, {headers: HEADERS});
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }

    return response.data;
  }
  catch (error) {
    console.error('Error fetching shared JSON:', error);
    throw error;
  }
};


export { postJsonData, getSharedJson };
