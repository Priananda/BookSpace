This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

# BookSpace

# I Kadek Priananda

## Deskripsi Proyek
Sistem bookSpace sederhana untuk menampilkan daftar buku, detail buku dan fitur authentikasi register login.

Fitur-fitur:
- Halaman registrasi dan login menggunakan mockapi.io.
- Halaman dashboard daftar buku menggunakan mockapi.io.
- Pencarian buku berdasarkan judul buku.
- Filter kategori berdasarkan kategori buku.
- Halaman detail buku berdasarkan id dan halaman favorit berdasarkan localstorage.
- Menampilkan daftar buku yang telah dipilih user sebagai buku favorit.
- Menambahkan buku ke favorit dan tersimpan pada local storage.
- Menerapkan tema terang dan gelap.
- Responsive desain pada device laptop, tablet, dan hp.

## Basis Data testing
-API
https://68ae9bb6b91dfcdd62b9a392.mockapi.io/api/v1/users

https://68ae9bb6b91dfcdd62b9a392.mockapi.io/api/v1/ListOfBooks

## Alat Pengembangan
- **Framework** : Next.js 15.5.2
- **Language**  : TypeScript
- **State Management**: Redux Toolkit
- **Font**: Geist / Geist Mono (Google Fonts)
- **Theme Management**: `next-themes`
- **Styling**: Tailwind CSS
- **Storage**: localStorage (pada fitur favorit buku)
- **Jest**: Unit test

## Hal-hal apa saja yang dikembangkan
- Authentikasi register dan login menggunakan JWT palsu untuk testing
- Dashboard daftar buku
- Pencarian buku
- Pengkategorian buku
- Halaman detail buku 
- Tombol tambahkan ke favorite
- Halaman favorit buku
- Tema terang dan gelap
- Responsive design

## Cara menjalankan di lokal 
- **Clone repository**  
```bash
git clone https://github.com/Priananda/bookspace.git

First, run the development server:

# test
npm run test

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

