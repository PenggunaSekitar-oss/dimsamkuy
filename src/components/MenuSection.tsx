import React, { useState, useMemo } from 'react';
import { Search, Utensils, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface MenuSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onOpenOrderDialog: (productName?: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  products,
  onSelectProduct,
  onOpenOrderDialog
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'semua', label: 'Semua Menu' },
    { id: 'original', label: 'Original & Keju' },
    { id: 'mentai', label: 'Mentai & Nori' },
    { id: 'goreng', label: 'Dimsum Goreng' },
    { id: 'party', label: 'Family & Party Pack' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory =
        selectedCategory === 'semua' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <section id="menu" className="py-16 bg-[#FFF4D6] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D94720] uppercase tracking-wider bg-[#FFFCF4] px-3.5 py-1 rounded-full border border-[#F0DFC0] mb-2 shadow-sm">
            <Utensils className="w-3.5 h-3.5" />
            <span>MENU & HARGA RESMI</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-[#345A36] leading-tight mb-3">
            Pilihan Dimsum Lumer Favorit
          </h2>
          <p className="text-sm md:text-base text-[#5D6257] font-medium">
            Semua dimsum dibuat segar setiap hari dari daging ayam pilihan halal. Porsi besar, saus melimpah!
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="bg-[#FFFCF4] p-4 sm:p-6 rounded-3xl border-2 border-[#1D2119] shadow-[6px_6px_0px_#1D2119] mb-10 space-y-4">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5D6257]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari dimsum, mentai, nori..."
                className="w-full bg-[#FFF4D6] text-[#1D2119] placeholder-[#5D6257] text-sm font-medium pl-10 pr-4 py-3 rounded-2xl border-2 border-[#1D2119] focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#D94720] hover:underline"
                >
                  Hapus
                </button>
              )}
            </div>

            {/* Total Results Count Badge */}
            <div className="text-xs font-bold text-[#345A36] bg-[#FFF4D6] px-4 py-2 rounded-xl border border-[#F0DFC0]">
              Menampilkan <strong>{filteredProducts.length}</strong> Varian Menu
            </div>

          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                aria-pressed={selectedCategory === cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all border-2 border-[#1D2119] cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#547F50] text-white shadow-[3px_3px_0px_#1D2119]'
                    : 'bg-[#FFF4D6] text-[#1D2119] hover:bg-[#FFC72C]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onOpenOrderDialog={onOpenOrderDialog}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#FFFCF4] p-12 rounded-3xl border-2 border-[#1D2119] text-center max-w-md mx-auto space-y-4">
            <AlertCircle className="w-12 h-12 text-[#D94720] mx-auto" />
            <h3 className="font-display text-2xl text-[#1D2119]">Menu Tidak Ditemukan</h3>
            <p className="text-sm text-[#5D6257]">
              Tidak ada dimsum yang sesuai dengan kata kunci pencarian atau kategori ini.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('semua');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-2 bg-[#547F50] text-white font-bold text-sm px-5 py-2.5 rounded-xl border border-[#1D2119] shadow-[2px_2px_0px_#1D2119]"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset Filter</span>
            </button>
          </div>
        )}

        {/* Additional Note */}
        <div className="mt-12 p-4 bg-[#FFFCF4] rounded-2xl border border-[#F0DFC0] text-center text-xs text-[#5D6257] max-w-2xl mx-auto flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FFC72C] shrink-0" />
          <span>
            Setiap porsi sudah termasuk saus cocolan khas. Untuk pemesanan katering acara dalam jumlah besar, hubungi admin via WhatsApp untuk penawaran khusus!
          </span>
        </div>

      </div>
    </section>
  );
};
