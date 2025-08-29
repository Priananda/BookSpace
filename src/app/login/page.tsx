'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginUser, type LoginPayload } from '../../features/auth/authAPI';
import { setAuthToken } from '../../utils/cookie';
import { loginSuccess } from '../../features/auth/authSlice';
import AuthButton from '../../components/AuthButton';
import Link from 'next/link';
import AllButton from '../../components/AllButton';


const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginPayload>({
    email: '',
    password: '',
  });

  const router = useRouter();
  const dispatch = useDispatch();

  
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;
   if (!email.includes('@') || password.length < 6) {
      setModalMessage('Masukan email dan password dengan benar.');
      setShowModal(true);
      return;
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
    <>
    <div className="flex items-center justify-center rounded-md">
      <div className="flex w-full mt-5 max-w-4xl bg-white rounded-md shadow-md">
        {/* Teks Kiri */}
        <div className="hidden lg:flex w-1/2 p-9 justify-start items-center">
          <div>
            <h2 className="mb-5 text-black dark:text-black text-4xl font-semibold">BookSpace</h2>
            <p className="text-md text-gray-500 dark:text-gray-500">Silakan login terlebih dahulu</p>
          </div>
        </div>

        {/* Form Register Kanan */}
        <div className="w-full lg:w-1/2 p-9 m-5 rounded-md shadow-lg">
          <h2 className="mb-5 text-black dark:text-black text-xl font-semibold">Login</h2>
          <form onSubmit={handleLogin} className="space-y-5">
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
            <AuthButton  label="Login"/>
          </form>
    

          <div className="">
          <p className="mt-5 text-md text-center text-gray-500">Belum punya akun? 
            <Link href="/register" className="text-blue-500 hover:underline pl-1">Daftar</Link>
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

export default Login;
