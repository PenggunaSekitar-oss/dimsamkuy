export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: 'original' | 'mentai' | 'goreng' | 'party';
  categoryLabel: string;
  price: number | null;
  pieceCount: number;
  image: string;
  altText: string;
  tags: Array<'populer' | 'baru' | 'pedas' | 'non-pedas' | 'best-seller' | 'spesial-acara'>;
  allergens: string[];
  availableOutletIds: string[];
  isAvailable: boolean;
  sauceInfo?: string;
  servingSuggestion?: string;
}

export interface OrderChannels {
  whatsappUrl?: string;
  gofoodUrl?: string;
  grabfoodUrl?: string;
  shopeefoodUrl?: string;
}

export interface Outlet {
  id: string;
  name: string;
  shortName: string;
  address: string;
  area: string;
  phone: string;
  whatsappNumber: string;
  whatsappUrl: string;
  mapsUrl: string;
  openingHours: string;
  orderChannels: OrderChannels;
  isActive: boolean;
  landmark?: string;
}

export interface Promotion {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  terms: string[];
  image: string;
  badgeText: string;
  validUntil: string;
  outletIds: string[];
  ctaLabel: string;
  whatsappMessage: string;
  isActive: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  roleOrLocation: string;
  content: string;
  rating: number;
  source: 'Instagram' | 'GoFood' | 'GrabFood' | 'Google Review' | 'Pelanggan Setia';
  avatarUrl?: string;
  verifiedProduct?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'produk' | 'pemesanan' | 'outlet' | 'acara';
}

export interface KeyFeature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export type OrderChannelType = 'whatsapp' | 'gofood' | 'grabfood' | 'shopeefood';
