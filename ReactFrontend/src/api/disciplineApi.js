import { get, post, put, del } from './requester';

const base = '/api/disciplines';

export const getAllDisciplines = () =>
  get(base);

export const getDisciplineById = (id) =>
  get(`${base}/${id}`);

export const createDiscipline = (data) =>
  post(base, data);

export const updateDiscipline = (id, data) =>
  put(`${base}/${id}`, data);

export const deleteDiscipline = (id) =>
  del(`${base}/${id}`);
