import { Promotion } from '../types';

export const PROMOTIONS_DATA: Promotion[] = [
  {
    id: 'promo-party-pack',
    title: 'PROMO MERDEKA PARTY PACK',
    subTitle: 'Hemat sampai Rp 15.000 untuk Paket Rame-Rame!',
    description: 'Setiap pembelian Family Pack Mix Party (16 Pcs) dapatkan gratis 1 porsi Extra Saus Mentai Lumer & Free Delivery jarak 3 KM dari outlet terdekat.',
    terms: [
      'Berlaku untuk pemesanan langsung via WhatsApp di semua outlet',
      'Berlaku hingga akhir bulan ini',
      'Tidak dapat digabung dengan promo aplikasi pesan antar lain'
    ],
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80',
    badgeText: 'HOT DEAL 🔥',
    validUntil: '31 Agustus 2026',
    outletIds: ['hertasning', 'btp', 'onta-lama', 'gowa'],
    ctaLabel: 'Klaim Promo via WhatsApp',
    whatsappMessage: 'Halo DIMSAM KUY, saya mau klaim Promo Merdeka Party Pack (Free Extra Saus Mentai + Free Delivery)!',
    isActive: true
  },
  {
    id: 'promo-bundling-mentai',
    title: 'BUNDLING MENTAI DUAAN',
    subTitle: '2 Box Dimsum Mentai Lumer cuma Rp 65.000 (Normal Rp 70.000)',
    description: 'Nikmati 2 box Dimsum Mentai Lumer hangat berdua pasangan atau sahabat dengan harga lebih hemat.',
    terms: [
      'Berlaku untuk pesan via WhatsApp & Takeaway di outlet',
      'Berlaku setiap hari pukul 13.00 - 17.00 WITA',
      'Selama persediaan masih ada'
    ],
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    badgeText: 'HEMAT BERSAMA 💛',
    validUntil: 'Selama Persediaan Ada',
    outletIds: ['hertasning', 'btp', 'onta-lama', 'gowa'],
    ctaLabel: 'Pesan Bundling Duaan',
    whatsappMessage: 'Halo DIMSAM KUY, saya mau pesan Promo Bundling Mentai Duaan Rp65.000!',
    isActive: true
  }
];
