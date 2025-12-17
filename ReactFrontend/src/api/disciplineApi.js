import { get, post, put, del } from './requester';

const base = '/api/disciplines';

const baseUrl = 'https://localhost:7266/api/disciplines';

function authHeaders() {
  const token = localStorage.getItem('token'); 

  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

// 🔹 Admin / Teacher 
export const getAllDisciplines = async () => {
  const res = await fetch(baseUrl, {
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error('Failed to load disciplines');
  return res.json();
};

// 🔹 Student 
export const getDisciplinesByMyMajor = async () => {
  const res = await fetch(`${baseUrl}/by-my-major`, {
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error('Failed to load disciplines by major');
  return res.json();
};

export const getDisciplineById = (id) =>
  get(`${base}/${id}`);

export const createDiscipline = (data) =>
  post(base, data);

export const updateDiscipline = (id, data) =>
  put(`${base}/${id}`, data);

export const deleteDiscipline = (id) =>
  del(`${base}/${id}`);


