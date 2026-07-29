import React from 'react';
import { ShoppingBag, Flame, Sparkles } from 'lucide-react';

interface CtaBannerProps {
  onOpenOrderDialog: (productName?: string) => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenOrderDialog }) => {
  return (
    <section className="py-16 bg-[#547F50] text-white relative brand-checkerboard border-b-4 border-[#1D2119] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        <div className="inline-flex items-center gap-2 bg-[#FFC72C] text-[#1D2119] px-4 py-1.5 rounded-full border-2 border-[#1D2119] shadow-[3px_3px_0px_#1D2119] font-extrabold text-xs uppercase tracking-wider">
          <Flame className="w-4 h-4 text-[#D94720]" />
          <span>SUDAH SIAP NIKMATI DIMSUM MENTAI LUMER?</span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#FFC72C] text-shadow-red leading-tight">
          Pesan Sekarang, Dikirim Fresh Langsung Dari Kukusan!
        </h2>

        <p className="text-base sm:text-lg text-[#FFF4D6] font-medium max-w-2xl mx-auto leading-relaxed">
          Nikmati rasa gurih padat dimsum ayam halal dengan siraman mentai melted. Pilihan outlet di Hertasning, BTP, Onta Lama, dan Gowa.
        </p>

        <div className="pt-4">
          <button
            type="button"
            onClick={() => onOpenOrderDialog()}
            className="inline-flex items-center gap-3 bg-[#D94720] hover:bg-[#B93419] text-white font-extrabold text-lg sm:text-xl px-10 py-5 rounded-2xl border-2 border-[#1D2119] shadow-[6px_6px_0px_#1D2119] active:translate-x-0.5 active:translate-y-0.5 transition-all group cursor-pointer"
          >
            <ShoppingBag className="w-7 h-7 group-hover:scale-110 transition-transform" />
            <span>Pesan DIMSAM KUY Sekarang</span>
          </button>
        </div>

      </div>
    </section>
  );
};
