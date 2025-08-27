'use client';

import React, { useState } from 'react';
import { registerUser } from '../../features/auth/authAPI';
import AuthButton from '../../components/AuthButton';
import { useRouter } from 'next/navigation';

// Tipe data form registrasi
interface FormData {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email.includes('@') || password.length < 6) {
      return alert('Email harus valid dan password ≥ 6 karakter');
    }

    await registerUser(formData);
    alert('Registrasi berhasil. Silakan login.');
    router.push('/login');
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
      <AuthButton label="Register" />
    </form>
  );
};

export default Register;
