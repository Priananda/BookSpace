'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginUser, type LoginPayload } from '../../features/auth/authAPI';
import { setAuthToken } from '../../utils/cookie';
import { loginSuccess } from '../../features/auth/authSlice';
import AuthButton from '../../components/AuthButton';

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginPayload>({
    email: '',
    password: '',
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email.includes('@') || password.length < 6) {
      return alert('Email harus valid dan password ≥ 6 karakter');
    }

    try {
      const user = await loginUser(formData);

      if (user) {
        const fakeToken = btoa(`${user.id}:${user.email}`);

        // ✅ simpan ke cookie
        setAuthToken(fakeToken);

        // ✅ update redux state
        dispatch(loginSuccess(fakeToken));

        // ✅ redirect ke dashboard
        router.push('/dashboard');
      } else {
        alert('Login gagal');
      }
    } catch (error) {
      alert('Login gagal: ' + (error as Error).message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <h2 className="text-lg font-bold">Login</h2>
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="border p-2 rounded w-full"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="border p-2 rounded w-full"
      />
      <AuthButton label="Login" />
    </form>
  );
};

export default Login;
