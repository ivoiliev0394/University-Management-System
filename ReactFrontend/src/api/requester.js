const baseUrl = 'https://localhost:7266';

function getOptions(method, data) {
  const options = {
    method,
    headers: {}
  };

  const token = localStorage.getItem('token');
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  if (data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  return options;
}

async function request(url, options) {
  const response = await fetch(baseUrl + url, options);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Request failed');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const get = (url) =>
  request(url, getOptions('GET'));

export async function post(url, data) {
  const res = await fetch(baseUrl + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Request failed');
  }

  // ✅ ако няма body → просто приключваме
  if (res.status === 204 || res.status === 201) {
    return;
  }

  return res.json();
}


export const put = (url, data) =>
  request(url, getOptions('PUT', data));

export const del = (url) =>
  request(url, getOptions('DELETE'));
