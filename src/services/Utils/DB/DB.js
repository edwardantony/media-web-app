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
