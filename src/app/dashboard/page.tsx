'use client';

import React, { useState, useEffect } from 'react';
import { getBookList } from '../../features/books/booksAPI';
import { getAuthToken } from '../../utils/cookie';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


interface BookRaw {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
}

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
}

const categoryMap: Record<string, string> = {
  '': 'history',
  'category 2': 'romance',
  'category 3': 'technology',
  'category 4': 'fiction',
  'category 5': 'biography',
  'category 6': 'science',
  'category 7': 'fantasy',
  'category 8': 'thriller',
  'category 9': 'self-help',
};

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const rawBooks: BookRaw[] = await getBookList();
        const mappedBooks: Book[] = rawBooks.map(book => ({
          ...book,
          category: categoryMap[book.category] || 'others',
        }));
        setBooks(mappedBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const categories = Array.from(new Set(books.map(book => book.category)));

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? book.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    
    <div>
      <h2>Dashboard Buku</h2>

      <input
        type="text"
        placeholder="Cari berdasarkan judul buku..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
        <option value="">Semua Kategori</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
  {filteredBooks.map(book => (
    <li key={book.id}>
      <Link href={`/buku/${book.id}`}>
        <strong>{book.title}</strong>
      </Link> - {book.author} <span>price:</span> {book.price}
    </li>
  ))}
</ul>

      )}
    </div>
  );
};

export default Dashboard;
