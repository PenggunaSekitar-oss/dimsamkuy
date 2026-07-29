import React from 'react';
import { X, ShoppingBag, ShieldCheck, Flame, Star, CheckCircle, Info, MapPin } from 'lucide-react';
import { Product, Outlet } from '../types';

interface ProductModalProps {
  product: Product | null;
  outlets: Outlet[];
  selectedOutlet: Outlet | null;
  onClose: () => void;
  onOpenOrderDialog: (productName?: string) => void;
  onSelectOutlet: (outlet: Outlet) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  outlets,
  selectedOutlet,
  onClose,
  onOpenOrderDialog,
  onSelectOutlet
}) => {
  if (!product) return null;

  const formatRupiah = (val: number | null) => {
    if (!val) return 'Hubungi Outlet';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1D2119]/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      
      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-[#FFFCF4] rounded-3xl border-4 border-[#1D2119] shadow-[10px_10px_0px_#1D2119] overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-[#FFC72C] hover:bg-[#D94720] hover:text-white text-[#1D2119] rounded-2xl border-2 border-[#1D2119] shadow-[2px_2px_0px_#1D2119] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Tutup detail produk"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Top Section: Photo & Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            
            {/* Large Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-[#1D2119] shadow-[4px_4px_0px_#1D2119] bg-[#FFF4D6]">
              <img
                src={product.image}
                alt={product.altText}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-[#1D2119] text-[#FFC72C] text-xs font-extrabold px-3 py-1 rounded-full border border-white/20">
                {product.pieceCount} Pcs Dimsum
              </div>
            </div>

            {/* Title & Pricing */}
            <div className="space-y-3">
              <span className="text-xs uppercase font-extrabold text-[#547F50] bg-[#FFF4D6] px-3 py-1 rounded-full border border-[#F0DFC0]">
                {product.categoryLabel}
              </span>

              <h2 className="font-display text-2xl sm:text-3xl text-[#1D2119]">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl text-[#D94720]">
                  {formatRupiah(product.price)}
                </span>
                <span className="text-xs text-[#5D6257] font-semibold">
                  / {product.pieceCount} Pcs Padat
                </span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="bg-[#FFF4D6] text-[#345A36] text-xs font-bold px-2.5 py-1 rounded-lg border border-[#F0DFC0] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#547F50]" />
                  100% Halal
                </span>
                {product.tags.includes('pedas') && (
                  <span className="bg-[#FFC72C] text-[#1D2119] text-xs font-bold px-2.5 py-1 rounded-lg border border-[#1D2119] flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-[#D94720]" />
                    Pedas Gurih
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* Detailed Description */}
          <div className="p-4 bg-[#FFF4D6] rounded-2xl border border-[#F0DFC0] space-y-2">
            <h4 className="text-xs font-bold text-[#5D6257] uppercase tracking-wider">
              Deskripsi Produk
            </h4>
            <p className="text-sm text-[#1D2119] leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          {/* Sauce & Serving Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {product.sauceInfo && (
              <div className="p-3.5 bg-[#FFFCF4] rounded-2xl border-2 border-[#1D2119] space-y-1">
                <div className="text-xs font-bold text-[#345A36] flex items-center gap-1">
                  <Info className="w-4 h-4 text-[#D94720]" />
                  <span>Saus & Topping</span>
                </div>
                <div className="text-xs text-[#1D2119] font-semibold">
                  {product.sauceInfo}
                </div>
              </div>
            )}

            {product.servingSuggestion && (
              <div className="p-3.5 bg-[#FFFCF4] rounded-2xl border-2 border-[#1D2119] space-y-1">
                <div className="text-xs font-bold text-[#345A36] flex items-center gap-1">
                  <Star className="w-4 h-4 text-[#FFC72C]" />
                  <span>Saran Penyajian</span>
                </div>
                <div className="text-xs text-[#1D2119] font-semibold">
                  {product.servingSuggestion}
                </div>
              </div>
            )}
          </div>

          {/* Allergens Information */}
          {product.allergens && product.allergens.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-[#5D6257] uppercase tracking-wider mb-2">
                Informasi Bahan & Alergen:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {product.allergens.map((alg, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-semibold bg-[#FFF4D6] text-[#1D2119] px-2.5 py-1 rounded-full border border-[#F0DFC0]"
                  >
                    • {alg}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Outlet Selection */}
          <div className="p-4 bg-[#345A36] text-white rounded-2xl border-2 border-[#1D2119] space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#FFC72C]">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#FFC72C]" />
                <span>PILIH OUTLET PEMESANAN:</span>
              </div>
              <span>{selectedOutlet ? selectedOutlet.shortName : 'Pilih Cabang'}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {outlets.map((outlet) => (
                <button
                  key={outlet.id}
                  type="button"
                  onClick={() => onSelectOutlet(outlet)}
                  className={`p-2 rounded-xl text-xs font-bold text-left border transition-all cursor-pointer ${
                    selectedOutlet?.id === outlet.id
                      ? 'bg-[#FFC72C] text-[#1D2119] border-[#1D2119] shadow-[2px_2px_0px_#1D2119]'
                      : 'bg-[#244629] text-[#FFF4D6] border-transparent hover:bg-[#1D2119]'
                  }`}
                >
                  <div className="truncate">{outlet.shortName}</div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-6 bg-[#FFF4D6] border-t-2 border-[#1D2119] flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] text-[#5D6257] font-bold uppercase">Total Estimasi Harga</div>
            <div className="font-display text-2xl text-[#D94720]">
              {formatRupiah(product.price)}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenOrderDialog(product.name);
            }}
            className="bg-[#D94720] hover:bg-[#B93419] text-white font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-2xl border-2 border-[#1D2119] shadow-[3px_3px_0px_#1D2119] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Pesan Varian Ini</span>
          </button>
        </div>

      </div>

    </div>
  );
};
