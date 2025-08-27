'use client';

import React, { useEffect, useState } from 'react';

interface Book {
  id: string;
  title: string;
  author: string;
  category?: string;
  price?: number;
}

const FavoritePage: React.FC = () => {
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const favBooks: Book[] = JSON.parse(localStorage.getItem('favorite_book') || '[]');
    setFavoriteBooks(favBooks);
    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Daftar Buku Favorit</h2>
      {favoriteBooks.length === 0 ? (
        <p>Belum ada buku favorit.</p>
      ) : (
       <ul>
  {favoriteBooks.map((book, index) => (
    <li key={book.id ?? index}>
      <strong>{book.title}</strong> - {book.author} ({book.category})
    </li>
  ))}
</ul>

      )}
    </div>
  );
};

export default FavoritePage;
