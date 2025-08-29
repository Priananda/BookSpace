import api from '../../lib/API'; // sesuaikan pathnya

// payload untuk register
export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

// payload untuk login
export interface LoginPayload {
  email: string;
  password: string;
}

// REGISTER
export const registerUser = async (payload: RegisterPayload) => {
  return api.post('/users', payload); 
};

// LOGIN
export const loginUser = async (payload: LoginPayload) => {
  const { email, password } = payload; // ambil dari payload

  // cari user berdasarkan email
  const response = await api.get(`/users?email=${email}`);
  const user = response.data[0];

  // validasi password sederhana (karena MockAPI bukan real auth)
  if (user && user.password === password) {
    return user;
  }

  throw new Error("Invalid email or password");
};
