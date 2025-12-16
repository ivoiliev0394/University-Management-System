import { get } from './requester';
const baseUrl = 'https://localhost:7266/api/profile';

export const getStudentById = (id) =>
  get(`/api/students/${id}`);

export const getMyProfile = () =>
  get('/api/profile/me');

export const getUserProfile = (id) =>
  get(`/api/profile/${id}`);

export const getAllUsers = () =>
  get('/api/profile/allusers');

