import axios from 'axios';

export const fetchAdminsList = async (token) => {
  const url = 'https://adminapi.sabhatv-dev.mediasuite.in/admins';

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const fetchSubscribersList = async (token) => {
  const url = 'https://adminapi.sabhatv-dev.mediasuite.in/subscribers';

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
export const fetchSingleVideos = async (token) => {
  const url = 'https://adminapi.sabhatv-dev.mediasuite.in/singles';

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const manageLanguages = async (token) => {
  const url = 'https://adminapi.sabhatv-dev.mediasuite.in/languages';

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
export const manageGenre = async (token) => {
  const url = 'https://adminapi.sabhatv-dev.mediasuite.in/genres';

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
export const manageCategories = async (token) => {
  const url = 'https://adminapi.sabhatv-dev.mediasuite.in/categories';

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const manageBanners = async (token) => {
  var response;
  var config = {
    method: 'get',
    url: 'https://adminapi.sabhatv-dev.mediasuite.in/banners',
    headers: { 
      Authorization: `Bearer ${token}`,
    }
  };
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
  return response.data;
};

export const manageAdminRoles = async (token) => {
  const url = 'https://adminapi.sabhatv-dev.mediasuite.in/roles';

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const addAdmin = async (form_data, token) => {
  const url = 'https://adminapi.sabhatv-dev.mediasuite.in/admins';

  const response = await axios.post(url, form_data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const addAdminstrator = async (form_data, token) => {
  const url = 'https://adminapi.sabhatv-dev.mediasuite.in/admins';
  const response = await axios.post(url, form_data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const addSubscriber = async (form_data, token) => {
  const url = 'https://adminapi.sabhatv-dev.mediasuite.in/subscribers';
  const response = await axios.post(url, form_data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
