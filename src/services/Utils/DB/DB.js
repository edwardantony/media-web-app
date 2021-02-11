import axios from 'axios';

const baseURL = 'https://adminapi.sabhatv-dev.mediasuite.in';

export const getData = async (endpoint, token) => {
  var endpoint;
  const { data } = await axios.get(baseURL+endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data; 
};


export const postData = async (endpoint, form_data, token) => {
  const url = baseURL+endpoint;
  const response = await axios.post(url, form_data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const deleteData = async (endpoint, form_data, token) => {
  const url = baseURL+endpoint;
  const response = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
