'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getAuthToken } from '../../utils/cookie';

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

  // 🔐 Redirect ke login jika tidak ada token
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

  // Filter buku berdasarkan search & kategori
  const filteredBooks = useMemo(() => {
    return initialBooks.filter((book) => {
      const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category ? book.category === category : true;
      return matchesSearch && matchesCategory;
    });
  }, [initialBooks, search, category]);

  return (
    <>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Cari judul buku..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded mb-4 w-full max-w-sm"
      />

      {/* Filter Kategori */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded mb-4"
      >
        <option value="">Semua Kategori</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* List Buku */}
      {filteredBooks.length === 0 ? (
        <p>Buku tidak ditemukan.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <li
              key={book.id}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              {book.cover && (
                <Image
                  src={book.cover}
                  alt={book.title}
                  width={300}
                  height={400}
                  className="rounded mb-2 object-cover"
                />
              )}

              <Link href={`/buku/${book.id}`}>
                <h3 className="text-xl font-semibold mb-1 hover:underline">{book.title}</h3>
              </Link>
              <p className="text-sm text-gray-600 mb-1">Author: {book.author}</p>
              <p className="text-sm text-gray-600 mb-1">Category: {book.category}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default BookListClient;
