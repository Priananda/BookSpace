'use client';

import Link from 'next/link';
import AllButton from '../src/components/AllButton';


export default function HomePage() {
  return (
    <main className="min-h-screen flex justify-center items-center text-center">
      <div>
        <h1 className="text-4xl font-bold mb-4">Selamat datang di BookSpace 😊</h1>
        <p className="text-lg text-gray-500 mb-6">
          Yuk login dulu untuk lanjut ke dashboard.
        </p>
      <Link href="/login">
    <AllButton label="Login Sekarang" />
  </Link>
    </div>
    </main>
  );
}
