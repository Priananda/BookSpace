'use client';

import Link from 'next/link';
import AllButton from '../src/components/AllButton';

export default function MainPage() {
  return (
    <>
    <main className="p-3 min-h-screen flex justify-center items-center text-center">
      <div>
        <h1 className="mb-5 text-4xl font-bold leading-12">Selamat datang di BookSpace</h1>
        <p className="mb-4 text-lg text-gray-500">
          Yuk login dulu untuk lanjut ke dashboard.
        </p>
      <Link href="/login">
    <AllButton label="Login Sekarang" />
  </Link>
    </div>
    </main>
  </>
  );
}
