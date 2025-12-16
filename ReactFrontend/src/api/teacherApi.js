import { get, post, put, del } from './requester';

export const getAllTeachers = () =>
  get('/api/teachers');

export const getTeacherById = (id) =>
  get(`/api/teachers/${id}`);

export const createTeacher = (data) =>
  post('/api/teachers', data);

export const updateTeacher = (id, data) =>
  put(`/api/teachers/${id}`, data);

export const deleteTeacher = (id) =>
  del(`/api/teachers/${id}`);
