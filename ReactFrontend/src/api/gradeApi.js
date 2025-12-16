import { get, post, put, del } from './requester';

const baseUrl = '/api/grades';

export const getAllGrades = () =>
  get(baseUrl);

export const getGradeById = (id) =>
  get(`${baseUrl}/${id}`);

export const createGrade = (data) =>
  post(baseUrl, data);

export const updateGrade = (id, data) =>
  put(`${baseUrl}/${id}`, data);

export const deleteGrade = (id) =>
  del(`${baseUrl}/${id}`);

