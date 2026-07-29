import React from 'react';
import { ShoppingBag, Star, Flame, Eye, Info } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onOpenOrderDialog: (productName?: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onOpenOrderDialog
}) => {
  const formatRupiah = (val: number | null) => {
    if (!val) return 'Hubungi Outlet';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="bg-[#FFFCF4] rounded-2xl border-2 border-[#1D2119] shadow-[4px_4px_0px_#1D2119] overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 group">
      
      <div>
        {/* Image Container */}
        <div className="relative aspect-[4/3] bg-[#FFF4D6] overflow-hidden border-b-2 border-[#1D2119]">
          <img
            src={product.image}
            alt={product.altText}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />

          {/* Badges on Image */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            {product.tags.includes('best-seller') && (
              <span className="bg-[#D94720] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg border border-[#1D2119] shadow-[2px_2px_0px_#1D2119] flex items-center gap-1">
                <Star className="w-3 h-3 fill-current text-[#FFC72C]" />
                BEST SELLER
              </span>
            )}
            {product.tags.includes('pedas') && (
              <span className="bg-[#FFC72C] text-[#1D2119] text-[10px] font-bold uppercase px-2 py-0.5 rounded-lg border border-[#1D2119] flex items-center gap-1">
                <Flame className="w-3 h-3 text-[#D94720]" />
                PEDAS GURIH
              </span>
            )}
          </div>

          {/* Piece Count Pill */}
          <div className="absolute bottom-3 left-3 bg-[#1D2119] text-[#FFC72C] text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border border-white/20">
            {product.pieceCount} Pcs Padat
          </div>

          {/* Price Starburst Badge */}
          <div className="absolute top-3 right-3 bg-[#FFC72C] text-[#1D2119] px-3 py-1.5 rounded-xl border-2 border-[#1D2119] shadow-[2px_2px_0px_#1D2119] font-extrabold text-sm">
            {formatRupiah(product.price)}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold text-[#547F50] bg-[#FFF4D6] px-2 py-0.5 rounded border border-[#F0DFC0]">
              {product.categoryLabel}
            </span>
          </div>

          <h3 className="font-display text-xl text-[#1D2119] group-hover:text-[#547F50] transition-colors mb-2">
            {product.name}
          </h3>

          <p className="text-xs text-[#5D6257] line-clamp-2 leading-relaxed mb-3 font-medium">
            {product.description}
          </p>

          {/* Sauce info highlight */}
          {product.sauceInfo && (
            <div className="text-[11px] text-[#345A36] font-semibold bg-[#FFF4D6] p-2 rounded-xl border border-[#F0DFC0] mb-4 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#D94720] shrink-0" />
              <span className="truncate">{product.sauceInfo}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="p-4 sm:p-5 pt-0 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onSelectProduct(product)}
          className="w-full bg-[#FFF4D6] hover:bg-[#F0DFC0] text-[#1D2119] font-bold text-xs py-2.5 rounded-xl border border-[#1D2119] flex items-center justify-center gap-1 transition-colors cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-[#547F50]" />
          <span>Detail</span>
        </button>

        <button
          type="button"
          onClick={() => onOpenOrderDialog(product.name)}
          className="w-full bg-[#D94720] hover:bg-[#B93419] text-white font-bold text-xs py-2.5 rounded-xl border border-[#1D2119] shadow-[2px_2px_0px_#1D2119] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-1 cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Pesan</span>
        </button>
      </div>

    </div>
  );
};
