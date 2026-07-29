# DIMSAM KUY

Landing page resmi DIMSAM KUY untuk menampilkan menu, harga, outlet, dan jalur pemesanan WhatsApp.

## Arah produk

- Mobile-first dan cepat dibuka dari bio Instagram.
- Identitas retro hijau, kuning, dan merah mengikuti materi brand.
- Foto produk menggunakan materi asli DIMSAM KUY.
- Alur pemesanan: pilih menu → pilih outlet → lanjut WhatsApp.
- Tidak ada checkout atau pembayaran di dalam website.

## Data publik

Harga, alamat, nomor WhatsApp, dan jam operasional mengikuti materi menu yang diberikan. Ketersediaan menu tetap perlu dikonfirmasi kepada outlet.

Website tidak menampilkan promo, testimoni, alamat outlet, klaim komposisi, maupun tautan marketplace yang belum dikonfirmasi.

## Menjalankan proyek

```bash
npm install
npm run dev
```

Build produksi:

```bash
npm run lint
npm run build
```

Hasil build tersedia di folder `dist`.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Lucide icons

## Struktur utama

```text
src/
├── App.tsx
├── index.css
├── main.tsx
├── types.ts
└── data/
    ├── outlets.ts
    └── products.ts

public/images/
├── menu-poster.webp
└── products/
```

## Checklist sebelum publikasi

- Konfirmasi ulang harga dan jam operasional.
- Uji seluruh nomor WhatsApp.
- Perbarui tautan Google Maps jika tersedia pin resmi.
- Tambahkan tautan GoFood, GrabFood, dan ShopeeFood setelah diberikan.
- Ganti foto hasil ekstraksi poster dengan file produk resolusi tinggi jika sudah tersedia.
