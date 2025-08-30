'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { getAuthToken } from '../../src/utils/cookie';
import AllButton from '../../src/components/AllButton';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface ApiBook {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  description: string;
  cover: string;
}
interface Props {
  initialBooks: ApiBook[];
}

const BookListClient: React.FC<Props> = ({ initialBooks }) => {

   const router = useRouter();

  // Redirect ke login jika tidak ada token
  useEffect(() => {
    if (!getAuthToken()) {
      router.push('/login');
    }
  }, [router]);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  // Mendapatkan daftar kategori unik
  const categories = useMemo(() => {
    const cats = initialBooks.map((book) => book.category || 'others');
    return Array.from(new Set(cats));
  }, [initialBooks]);

  // Filter buku berdasarkan search dan kategori
  const filteredBooks = useMemo(() => {
    return initialBooks.filter((book) => {
      const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category ? book.category === category : true;
      return matchesSearch && matchesCategory;
    });
  }, [initialBooks, search, category]);


return (
  <>
    <div className="container mx-auto">
      <div className="mt-1">
        <h2 className="mb-5 text-2xl font-bold">📚 Dashboard Buku</h2> 
      </div>
      <div className="w-28 mb-5">
        <Link href="/favorite">
        <AllButton label="Favorit" />
        </Link>
      </div>
      <div className="flex mb-3 space-x-2">
      <input
        type="text"
        placeholder="Cari judul buku......"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 mb-5 focus:outline-none border border-gray-300 rounded-md shadow-sm w-full"
      />
      
      <div className="relative inline-block text-md">
        <select value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 mb-5 text-gray-900 dark:text-white bg-white 
             focus:outline-none border border-gray-300 dark:border-gray-600 
             rounded-md shadow-sm appearance-none pr-10 cursor-pointer">
          <option value="">Semua Kategori</option>
            {categories.map((cat) => (
            <option key={cat} value={cat} className="text-gray-900 dark:text-white">
              {cat}
            </option>
          ))}
        </select>

        <div className="flex absolute -mt-4 items-center pointer-events-none inset-y-0 right-3">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      </div>

      {/* Daftar Buku */}
      {filteredBooks.length === 0 ? (
        <div className="mt-5 text-center">
        <p className="text-gray-500">Buku yang anda cari tidak dapat ditemukan.</p>
        </div>
      ) : (
  
      <div> 
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
          {filteredBooks.map((book) => (
        <li
            key={book.id}
            className="p-3 border border-gray-300 rounded shadow-md transition flex flex-col h-full">
          
          {book.cover && (
            <Image
            src={book.cover}
            alt={book.title}
            width={400}
            height={300}
            className="mb-5 rounded object-cover w-full h-full"
            unoptimized
            />
          )}

          <Link href={`/buku/${book.id}`}>
            <h1 className="mb-2 text-lg font-semibold hover:underline hover:text-gray-500">
              {book.title}
            </h1>
          </Link>
      
          <div className="space-y-1 mb-1">
            <p className="text-md text-gray-500">Author: {book.author}</p>
            <p className="text-md text-gray-500">Category: {book.category}</p>
          </div>
        </li>
        ))}
        </ul>
      </div>
    
    )}
    </div>
  </>
  );
};

export default BookListClient;
