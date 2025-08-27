'use client';

import React, { useState } from 'react';
import { loginUser } from '../../features/auth/authAPI';
import { useRouter } from 'next/navigation'; // Gunakan useRouter bukan useNavigate
import { setAuthToken } from '../../utils/cookie';
import AuthButton from '../../components/AuthButton';

const Login = () => {
   const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || password.length < 6) {
      return alert('Email harus valid dan password ≥ 6 karakter');
    }

    const user = await loginUser(email);
    if (user && user.password === password) {
      const fakeToken = btoa(`${user.id}:${user.email}`);
      setAuthToken(fakeToken);
      router.push('/dashboard');
    } else {
      alert('Login gagal');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <AuthButton label="Login" />
    </form>
  );
};

export default Login;
