'use client';

import { useState, useEffect } from 'react';
import AllButton from '../../../src/components/AllButton';

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  description: string;
  cover: string;
}

interface FavoriteButtonProps {
  book: Book;
}

export default function FavoriteButton({ book }: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const favs: Book[] = JSON.parse(localStorage.getItem('favorite_book') || '[]');
    setIsFavorited(favs.some((b) => b.id === book.id));
  }, [book.id]);


  const handleAddFavorite = () => {
    const favs: Book[] = JSON.parse(localStorage.getItem('favorite_book') || '[]');

    if (favs.some(b => b.id === book.id)) return;

    const updated = [...favs, book];
    localStorage.setItem('favorite_book', JSON.stringify(updated));
    setIsFavorited(true);
  };

return (
  <>
    <AllButton
      label={isFavorited ? 'Sudah di Favorite' : 'Tambahkan ke Favorite'}
      onClick={handleAddFavorite}
      disabled={isFavorited}
    />
  </>
);
}
