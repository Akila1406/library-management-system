import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Add token to headers if it exists
API.interceptors.request.use((req) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        const { token } = JSON.parse(userInfo);
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);
export const getStats = () => API.get('/dashboard/stats');

export const getBooks = (search = '') => API.get(`/books${search ? `?search=${search}` : ''}`);
export const getBookById = (id) => API.get(`/books/${id}`);
export const addBook = (data) => API.post('/books', data);
export const updateBook = (id, data) => API.put(`/books/${id}`, data);
export const deleteBook = (id) => API.delete(`/books/${id}`);

export const getMembers = (search = '') => API.get(`/members${search ? `?search=${search}` : ''}`);
export const getMemberById = (id) => API.get(`/members/${id}`);
export const addMember = (data) => API.post('/members', data);
export const updateMember = (id, data) => API.put(`/members/${id}`, data);
export const deleteMember = (id) => API.delete(`/members/${id}`);

export const getIssues = () => API.get('/issues');
export const issueBook = (data) => API.post('/issues', data);
export const returnBook = (id, data) => API.put(`/issues/return/${id}`, data);

export default API;
