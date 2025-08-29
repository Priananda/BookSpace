// app/dashboard/page.tsx
import React from 'react';
import { getBookList } from '../../features/books/booksAPI';
import BookListClient from '../dashboard/BookListClient';


export default async function Dashboard() {
  const books = await getBookList();

  return (
    <div className="p-4">
      {/* <h2 className="text-2xl font-bold mb-4">📚 Dashboard Buku</h2> */}
      {/* Passing data awal ke client component */}
      <BookListClient initialBooks={books} />
    </div>
  );
}


// 'use client';

// import React, { useState, useEffect } from 'react';
// import { getBookList } from '../../features/books/booksAPI';
// import { getAuthToken } from '../../utils/cookie';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';

// // Data mentah dari API
// interface ApiBook {
//   id: string;
//   title: string;
//   author: string;
//   category: string;
//   price: number;
//   description: string;
//   cover: string;
// }

// const Dashboard: React.FC = () => {
//   const router = useRouter();
//   const [books, setBooks] = useState<ApiBook[]>([]);
//   const [search, setSearch] = useState('');
//   const [category, setCategory] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   // 🔐 Redirect ke login jika tidak ada token
//   useEffect(() => {
//     if (!getAuthToken()) {
//       router.push('/login');
//     }
//   }, [router]);

//   // 📚 Fetch books dari API
//   useEffect(() => {
//     const loadBooks = async () => {
//       try {
//         const apiBooks: ApiBook[] = await getBookList();
//         const mappedBooks: ApiBook[] = apiBooks.map((book) => ({
//           ...book,
//           category: book.category || 'others', // fallback jika kosong
//         }));
//         setBooks(mappedBooks);
//       } catch (err) {
//         console.error('❌ Failed to fetch books:', err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadBooks();
//   }, []);

//   // 🔎 Filtering berdasarkan search + category
//   const categories = Array.from(new Set(books.map((book) => book.category)));
//   const visibleBooks = books.filter((book) => {
//     const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase());
//     const matchesCategory = category ? book.category === category : true;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">📚 Dashboard Buku</h2>

//       {/* 🔍 Search */}
//       <input
//         type="text"
//         placeholder="Cari judul buku..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="border p-2 rounded mb-4 w-full max-w-sm"
//       />

//       {/* 🏷️ Filter kategori */}
//       <select
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//         className="border p-2 rounded mb-4"
//       >
//         <option value="">Semua Kategori</option>
//         {categories.map((cat) => (
//           <option key={cat} value={cat}>
//             {cat}
//           </option>
//         ))}
//       </select>

//       {/* 📖 List buku */}
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : visibleBooks.length === 0 ? (
//         <p>Buku tidak ditemukan.</p>
//       ) : (
//         <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {visibleBooks.map((book) => (
//             <li
//               key={book.id}
//               className="border p-4 rounded shadow hover:shadow-lg transition"
//             >
//               {book.cover && (
//                 <Image
//                   src={book.cover}
//                   alt={book.title}
//                   width={300}       
//                   height={400}      
//                   className="rounded mb-2 object-cover"
//                 />
//               )}

//               <Link href={`/buku/${book.id}`}>
//                 <h3 className="text-xl font-semibold mb-1 hover:underline">{book.title}</h3>
//               </Link>
//               <p className="text-sm text-gray-600 mb-1">Author: {book.author}</p>
//               <p className="text-sm text-gray-600 mb-1">Category: {book.category}</p>
//               {/* <p className="text-sm text-gray-600 mb-1">Price: ${book.price}</p>
//               <p className="text-sm">{book.description}</p> */}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
