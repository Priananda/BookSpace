import api from '../../lib/API'; // sesuaikan pathnya

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export const registerUser = async (payload: RegisterPayload) => {
  return api.post('/users', payload); // ini akan jadi https://68ae9bb6b91dfcdd62b9a392.mockapi.io/api/v1/users
};

export const loginUser = async (email: string) => {
  const response = await api.get(`/users?email=${email}`); // jadi https://68ae9bb6b91dfcdd62b9a392.mockapi.io/api/v1/users?email=...
  return response.data[0];
};

