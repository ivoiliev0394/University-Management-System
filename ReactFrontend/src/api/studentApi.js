import { get, post, put, del } from './requester';

export const getAllStudents = () =>
  get('/api/students');

export const getStudentById = (id) =>
  get(`/api/students/${id}`);

export const createStudent = (data) =>
  post('/api/students', data);

export const updateStudent = (id, data) =>
  put(`/api/students/${id}`, data);

export const deleteStudent = (id) =>
  del(`/api/students/${id}`);

