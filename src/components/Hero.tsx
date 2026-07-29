import React from 'react';
import { ShoppingBag, ArrowDown, ShieldCheck, Flame, Heart, Star, Sparkles, MapPin } from 'lucide-react';
import { Outlet } from '../types';

interface HeroProps {
  selectedOutlet: Outlet | null;
  onOpenOrderDialog: (productName?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ selectedOutlet, onOpenOrderDialog }) => {
  return (
    <section className="relative brand-checkerboard text-white pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden border-b-4 border-[#1D2119]">
      
      {/* Decorative Warm Shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#FFC72C]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#D94720]/20 rounded-full blur-2xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 bg-[#FFC72C] text-[#1D2119] px-3.5 py-1.5 rounded-full border-2 border-[#1D2119] shadow-[3px_3px_0px_#1D2119] font-bold text-xs md:text-sm">
              <Sparkles className="w-4 h-4 text-[#D94720]" />
              <span>HOMEMADE DIMSUM MENTAI HALAL MAKASSAR</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#FFC72C] text-shadow-red leading-[1.05] tracking-wide">
              Dimsum Lumer, <br className="hidden sm:block" />
              <span className="text-white text-shadow-black">Isiannya Nggak Pelit!</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-[#FFF4D6] font-medium leading-relaxed max-w-2xl">
              Dimsum kukus & goreng homemade bersertifikat halal dengan isian penuh <strong>100% daging ayam pilihan</strong> dan siraman <strong>saus mentai lumer smoky</strong> yang bikin susah berhenti mengunyah.
            </p>

            {/* Trust Points Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full pt-2">
              <div className="bg-[#345A36]/80 backdrop-blur-sm border border-[#244629] p-2.5 rounded-xl flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#FFC72C] shrink-0" />
                <span className="text-xs font-bold text-[#FFF4D6]">100% Halal</span>
              </div>
              <div className="bg-[#345A36]/80 backdrop-blur-sm border border-[#244629] p-2.5 rounded-xl flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#D94720] shrink-0" />
                <span className="text-xs font-bold text-[#FFF4D6]">Full Daging</span>
              </div>
              <div className="bg-[#345A36]/80 backdrop-blur-sm border border-[#244629] p-2.5 rounded-xl flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#FFC72C] shrink-0" />
                <span className="text-xs font-bold text-[#FFF4D6]">Mentai Lumer</span>
              </div>
              <div className="bg-[#345A36]/80 backdrop-blur-sm border border-[#244629] p-2.5 rounded-xl flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#D94720] shrink-0" />
                <span className="text-xs font-bold text-[#FFF4D6]">4 Outlet</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full pt-2">
              <button
                type="button"
                onClick={() => onOpenOrderDialog('Dimsum Mentai Lumer')}
                className="bg-[#D94720] hover:bg-[#B93419] text-white font-extrabold text-base sm:text-lg px-8 py-4 rounded-2xl border-2 border-[#1D2119] shadow-[4px_4px_0px_#1D2119] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#1D2119] transition-all flex items-center justify-center gap-3 group cursor-pointer"
              >
                <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Pesan Sekarang</span>
              </button>

              <a
                href="#menu"
                className="bg-[#FFF4D6] hover:bg-[#FFC72C] text-[#1D2119] font-bold text-base px-6 py-4 rounded-2xl border-2 border-[#1D2119] shadow-[4px_4px_0px_#1D2119] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#1D2119] transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Lihat Menu & Harga</span>
                <ArrowDown className="w-5 h-5 text-[#D94720]" />
              </a>
            </div>

            {/* Selected Outlet Quick Note */}
            {selectedOutlet && (
              <div className="text-xs text-[#FFF4D6] font-medium flex items-center gap-1.5 pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#FFC72C]" />
                <span>Siap dikirim dari <strong>{selectedOutlet.name}</strong> ({selectedOutlet.area})</span>
              </div>
            )}

          </div>

          {/* Right Column: Featured Dimsum Hero Visual Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Scalloped Starburst Retro Badge */}
            <div className="absolute -top-6 -left-4 sm:-top-8 sm:-left-6 z-20 bg-[#D94720] text-white p-5 sm:p-6 rounded-full border-2 border-[#1D2119] shadow-[4px_4px_0px_#1D2119] starburst-badge animate-bounce duration-1000 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFC72C]">HARGA MULAI</span>
              <span className="font-display text-xl sm:text-2xl text-white">Rp 30rb</span>
              <span className="text-[9px] font-extrabold uppercase bg-[#FFC72C] text-[#1D2119] px-1.5 py-0.5 rounded mt-0.5">
                4 PCS PADAT
              </span>
            </div>

            {/* Main Product Frame */}
            <div className="relative w-full max-w-md bg-[#FFFCF4] p-3 sm:p-4 rounded-3xl border-4 border-[#1D2119] shadow-[8px_8px_0px_#1D2119] transform rotate-1 hover:rotate-0 transition-transform duration-300">
              
              {/* Image Container */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#1D2119] group">
                <img
                  src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80"
                  alt="Dimsum Mentai Lumer khas DIMSAM KUY"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute top-3 right-3 bg-[#FFC72C] text-[#1D2119] font-extrabold text-xs px-3 py-1 rounded-full border border-[#1D2119] shadow-[2px_2px_0px_#1D2119] flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current text-[#D94720]" />
                  <span>BEST SELLER NO. 1</span>
                </div>
              </div>

              {/* Product Info Strip in Hero */}
              <div className="pt-3 pb-1 px-2 flex items-center justify-between text-[#1D2119]">
                <div>
                  <h3 className="font-display text-xl text-[#345A36]">Dimsum Mentai Lumer</h3>
                  <p className="text-xs text-[#5D6257] font-medium">Saus mentai creamy tobiko ditorch smoky</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#D94720] block">Rp 35.000</span>
                  <span className="text-[10px] bg-[#FFF4D6] text-[#345A36] font-bold px-2 py-0.5 rounded border border-[#F0DFC0]">
                    4 Pcs Besar
                  </span>
                </div>
              </div>

              {/* Quick Order Button on Card */}
              <button
                type="button"
                onClick={() => onOpenOrderDialog('Dimsum Mentai Lumer')}
                className="mt-2 w-full bg-[#345A36] hover:bg-[#244629] text-white font-bold text-xs py-2.5 rounded-xl border border-[#1D2119] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#FFC72C]" />
                <span>Pesan Varian Mentai Lumer</span>
              </button>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
