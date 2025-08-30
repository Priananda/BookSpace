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
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const favs: Book[] = JSON.parse(localStorage.getItem('favorite_book') || '[]');
    setFavorites(favs);
    setIsFavorited(favs.some(b => b.id === book.id));
  }, [book.id]);

  const handleAddFavorite = () => {

    if (favorites.some(b => b.id === book.id)) return;

    const updated = [...favorites, book];
    setFavorites(updated); 
    setIsFavorited(true); 
    localStorage.setItem('favorite_book', JSON.stringify(updated));
  };

  return (
    <AllButton
      label={isFavorited ? 'Sudah di Favorite' : 'Tambahkan ke Favorite'}
      onClick={handleAddFavorite}
      disabled={isFavorited}
    />
  );
}
