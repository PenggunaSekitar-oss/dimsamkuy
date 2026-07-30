# DESIGN — DIMSAM KUY

## Peran landing page

Landing page DIMSAM KUY adalah media informasi dan promosi. Tujuan utamanya:

1. Memperkenalkan identitas dan produk DIMSAM KUY.
2. Menampilkan menu, harga, party pack, dan lokasi outlet.
3. Membantu pengunjung menentukan outlet atau kanal pesan-antar.
4. Mengarahkan pembelian ke outlet offline, WhatsApp outlet, GoFood, GrabFood,
   atau ShopeeFood.

Website bukan toko online dan tidak memiliki checkout, pembayaran, akun
pelanggan, maupun keranjang.

## Prinsip CTA

- Gunakan: `Lihat menu`, `Cara pesan`, `Hubungi outlet`, dan
  `Lihat jalur pemesanan`.
- Hindari CTA yang memberi kesan transaksi terjadi di website, seperti
  `Checkout`, `Bayar sekarang`, atau `Beli di website`.
- Sebelum pengguna meninggalkan website, jelaskan bahwa proses pembelian dan
  pembayaran ditangani oleh outlet atau platform eksternal.

## Alur pengguna

`Informasi brand → eksplorasi menu → pilih outlet → buka kanal eksternal`

WhatsApp digunakan untuk menghubungi outlet dan mengonfirmasi ketersediaan.
Platform delivery dibuka melalui layanan resminya saat tautan outlet sudah
tersedia.

## Arah visual

- Retro kuliner yang hangat dan lokal, bukan tampilan marketplace generik.
- Warna utama: hijau tua, kuning hangat, merah-oranye, dan krem.
- Foto makanan menjadi pusat perhatian dan harus tajam serta realistis.
- Animasi scroll bersifat pendukung: singkat, halus, dan tidak menghambat akses.
- Mobile-first dengan hierarki, ukuran teks, dan area sentuh yang dirancang
  khusus untuk layar kecil.
- Hindari kartu putih polos. Gunakan warna solid brand, pola retro, border tegas,
  dan bayangan offset untuk membedakan kelompok konten.
- Menu menggunakan rail dua baris; langkah pemesanan dan outlet menggunakan
  kartu geser horizontal berukuran normal dan ringkas.
- Transisi masuk, marquee, gerak gambar, serta respons tekan harus terasa hidup
  tetapi tetap singkat dan menghormati preferensi reduced motion.
- Tiga outlet ditampilkan dalam satu kartu kompak agar tidak memanjangkan halaman.

## Sistem animasi scrolling

Karakter gerak mengikuti pola yang disukai dari website Klinik Parakita, tetapi
tetap menggunakan identitas visual DIMSAM KUY:

- Section, heading, kartu, dan CTA masuk saat mencapai viewport dengan reveal
  satu kali.
- Kumpulan kartu memakai stagger sehingga tidak muncul serentak.
- Navbar mendapat bayangan lembut setelah halaman mulai digulir.
- Foto hero bergerak lebih lambat daripada halaman untuk membentuk kedalaman.
- Foto dalam kartu menu memakai parallax tipis dengan kecepatan yang sedikit
  berbeda.
- Area Family Pack menjadi scene sticky pada desktop: panel bertahan sejenak
  sementara foto melakukan zoom dan copy bergerak berlawanan secara halus.
- Sticky scene dinonaktifkan pada mobile agar scroll tetap cepat dan natural.
- Semua perhitungan scroll dijalankan melalui `requestAnimationFrame` dan hanya
  menganimasikan `transform`, opacity, dan CSS custom properties.
- Jika `prefers-reduced-motion` aktif, parallax dan sticky motion dihentikan
- Kartu menu memakai dua marquee tanpa ujung: baris atas bergerak ke kiri dan
  baris bawah ke kanan. Gerak berhenti saat hover, disentuh, atau difokuskan;
  pengguna `prefers-reduced-motion` mendapat rail yang bisa digeser manual.
  tanpa menyembunyikan konten.

## Kejujuran informasi

- Jangan membuat promo, diskon, testimoni, atau klaim produk tanpa sumber resmi.
- Harga dan ketersediaan perlu dikonfirmasi kembali melalui outlet.
- Logo layanan pesan-antar hanya menunjukkan kanal yang tersedia, bukan checkout
  langsung di website.
