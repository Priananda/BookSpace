import api from '../../lib/API'; // sesuaikan pathnya

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}

export const registerUser = async (payload: RegisterPayload) => {
  return api.post('/users', payload); 
};

export const loginUser = async (payload: LoginPayload) => {
  const { email, password } = payload;

  const response = await api.get(`/users?email=${email}`);
  const user = response.data[0];

  if (user && user.password === password) {
    return user;
  }

  throw new Error("Email dan password tidak valid");
};
