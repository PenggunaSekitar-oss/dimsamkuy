import React from 'react';
import { Utensils, Instagram, MapPin, Phone, ShieldCheck, Heart } from 'lucide-react';
import { Outlet } from '../types';

interface FooterProps {
  outlets: Outlet[];
}

export const Footer: React.FC<FooterProps> = ({ outlets }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#244629] text-[#FFF4D6] pt-12 pb-24 md:pb-12 border-t-4 border-[#1D2119]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-[#345A36]">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFC72C] border-2 border-[#1D2119] rounded-xl flex items-center justify-center shadow-[2px_2px_0px_#1D2119]">
                <Utensils className="w-5 h-5 text-[#1D2119]" />
              </div>
              <span className="font-display text-2xl text-[#FFC72C] text-shadow-black">
                DIMSAM KUY
              </span>
            </a>

            <p className="text-xs sm:text-sm text-[#FFF4D6]/90 leading-relaxed font-medium max-w-sm">
              Homemade Dimsum Mentai Halal Premium Quality di Makassar. Isian penuh 100% daging ayam segar dengan saus mentai lumer smoky.
            </p>

            <div className="inline-flex items-center gap-2 bg-[#345A36] px-3 py-1.5 rounded-xl border border-[#547F50] text-xs text-[#FFC72C] font-bold">
              <ShieldCheck className="w-4 h-4 text-[#FFC72C]" />
              <span>100% Halal & Fresh Daily</span>
            </div>

            {/* Social Link */}
            <div>
              <a
                href="https://www.instagram.com/dimsam_kuy/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#D94720] hover:bg-[#B93419] text-white text-xs font-bold px-3.5 py-2 rounded-xl border border-[#1D2119] transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow Instagram @dimsam_kuy</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-lg text-[#FFC72C] uppercase tracking-wider">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-semibold">
              <li><a href="#menu" className="hover:text-[#FFC72C] transition-colors">• Menu & Harga Official</a></li>
              <li><a href="#promo" className="hover:text-[#FFC72C] transition-colors">• Promo Spesial Hot</a></li>
              <li><a href="#party-pack" className="hover:text-[#FFC72C] transition-colors">• Family & Party Pack (16 Pcs)</a></li>
              <li><a href="#outlets" className="hover:text-[#FFC72C] transition-colors">• Lokasi Cabang Outlet</a></li>
              <li><a href="#testimoni" className="hover:text-[#FFC72C] transition-colors">• Testimoni Pelanggan</a></li>
              <li><a href="#faq" className="hover:text-[#FFC72C] transition-colors">• FAQ & Info Halal</a></li>
            </ul>
          </div>

          {/* Col 3: Outlets Summary */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-display text-lg text-[#FFC72C] uppercase tracking-wider">
              Cabang Makassar & Gowa
            </h4>
            <div className="space-y-2 text-xs text-[#FFF4D6]/90 font-medium">
              {outlets.map((outlet) => (
                <div key={outlet.id} className="p-2 bg-[#345A36]/60 rounded-xl border border-[#547F50]/50">
                  <div className="font-bold text-[#FFC72C] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#D94720]" />
                    <span>{outlet.name}</span>
                  </div>
                  <div className="text-[11px] truncate">{outlet.address}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FFF4D6]/70 font-medium gap-3 text-center sm:text-left">
          <div>
            © {currentYear} <strong>DIMSAM KUY</strong>. All rights reserved. Best Dimsum in Town Makassar.
          </div>
          <div className="flex items-center gap-1">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 fill-current text-[#D94720]" />
            <span>untuk Kuliner Makassar</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
