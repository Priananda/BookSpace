'use client';

import React, { useState } from 'react';
import { registerUser, type RegisterPayload } from '../../features/auth/authAPI';
import AuthButton from '../../components/AuthButton';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AllButton from '../../components/AllButton';

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterPayload>({
    username: '',
    email: '',
    password: '',
  });
  const router = useRouter();

  const [showModal, setShowModal] = useState(true);
  const [modalMessage, setModalMessage] = useState('');


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email.includes('@') || password.length < 6) {
      setModalMessage('Buat email dengan benar dan password minimal 6 karakter.');
      setShowModal(true);
      return;
  }

    await registerUser(formData);
    router.push('/login');
  };

   return (
    <>
    <div className="flex items-center justify-center rounded-md">
      <div className="flex w-full mt-5 max-w-4xl bg-white rounded-md shadow-md">
        {/* Teks Kiri */}
        <div className="hidden lg:flex w-1/2 p-9 justify-start items-center">
          <div>
            <h2 className="mb-5 text-black dark:text-black text-4xl font-semibold">BookSpace</h2>
            <p className="text-md text-gray-500 dark:text-gray-500">Silakan daftar menggunakan informasi pribadi Anda agar tetap terhubung dengan kami.</p>
          </div>
        </div>

        {/* Form Register Kanan */}
        <div className="w-full lg:w-1/2 p-9 m-5 rounded-md shadow-lg">
          <h2 className="mb-5 text-black dark:text-black text-xl font-semibold">Register</h2>
          <form onSubmit={handleRegister} className="space-y-5">
            <input 
              type="text" 
              name="username" 
              value={formData.username}
              placeholder="Username" 
              className="w-full p-3 border border-gray-200 placeholder:text-gray-500 placeholder:text-md rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" 
              onChange={handleChange} 
              required
            />
            <input 
              type="email" 
              name="email" 
              value={formData.email}
              placeholder="Email" 
              className="w-full p-3 border border-gray-200 placeholder:text-gray-500 placeholder:text-md rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" 
              onChange={handleChange} 
              required
            />
            <input 
              type="password" 
              name="password" 
              value={formData.password}
              placeholder="Password" 
              className="w-full p-3 border border-gray-200 placeholder:text-gray-500 placeholder:text-md rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" 
              onChange={handleChange} 
              required
            />
          <AuthButton  label="Register"/>
          </form>

          <div className="">
          <p className="mt-5 text-md text-center text-gray-500">Sudah punya akun? 
            <Link href="/login" className="text-blue-500 hover:underline pl-1">Masuk</Link>
          </p>
          </div>
        </div>
      </div>
      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div className="p-6 bg-white rounded-md shadow-lg max-w-sm w-full">
      <h2 className="mb-5 text-lg font-semibold">Peringatan</h2>
      <p className="mb-4 text-gray-500 ">{modalMessage}</p>
     <AllButton label="Tutup" onClick={() => setShowModal(false)} />

    </div>
  </div>
)}

    </div>
    </>
  );
};

export default Register;
