import React from 'react';
import { MapPin, Clock, Phone, ExternalLink, MessageCircle, Check, Star, ShoppingBag } from 'lucide-react';
import { Outlet } from '../types';

interface OutletsSectionProps {
  outlets: Outlet[];
  selectedOutlet: Outlet | null;
  onSelectOutlet: (outlet: Outlet) => void;
  onOpenOrderDialog: (productName?: string) => void;
}

export const OutletsSection: React.FC<OutletsSectionProps> = ({
  outlets,
  selectedOutlet,
  onSelectOutlet,
  onOpenOrderDialog
}) => {
  return (
    <section id="outlets" className="py-16 bg-[#FFF4D6] scroll-mt-20 border-b-2 border-[#F0DFC0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D94720] uppercase tracking-wider bg-[#FFFCF4] px-3.5 py-1 rounded-full border border-[#F0DFC0] mb-2 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#D94720]" />
            <span>CABANG DIMSAM KUY MAKASSAR & GOWA</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-[#345A36] leading-tight mb-2">
            Pilih Outlet Terdekat Dari Lokasimu
          </h2>
          <p className="text-sm md:text-base text-[#5D6257] font-medium">
            Tersedia 4 lokasi strategis siap kirim cepat via WhatsApp & aplikasi pesan antar favoritmu.
          </p>
        </div>

        {/* Outlets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {outlets.map((outlet) => {
            const isSelected = selectedOutlet?.id === outlet.id;

            return (
              <div
                key={outlet.id}
                className={`bg-[#FFFCF4] rounded-3xl border-3 border-[#1D2119] p-6 flex flex-col justify-between transition-all duration-300 relative ${
                  isSelected
                    ? 'shadow-[8px_8px_0px_#1D2119] ring-2 ring-[#547F50]'
                    : 'shadow-[4px_4px_0px_#1D2119] hover:-translate-y-1'
                }`}
              >
                
                {/* Active Outlet Star Badge */}
                {isSelected && (
                  <div className="absolute -top-3.5 right-6 bg-[#FFC72C] text-[#1D2119] font-extrabold text-xs px-3 py-1 rounded-full border-2 border-[#1D2119] shadow-[2px_2px_0px_#1D2119] flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current text-[#D94720]" />
                    <span>OUTLET PILIHANMU</span>
                  </div>
                )}

                <div>
                  {/* Outlet Area Tag */}
                  <div className="text-xs uppercase font-extrabold text-[#547F50] bg-[#FFF4D6] px-3 py-1 rounded-full border border-[#F0DFC0] inline-block mb-3">
                    {outlet.area}
                  </div>

                  <h3 className="font-display text-2xl text-[#1D2119] mb-3">
                    {outlet.name}
                  </h3>

                  {/* Address */}
                  <div className="space-y-2.5 text-xs sm:text-sm text-[#5D6257] font-medium mb-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#D94720] shrink-0 mt-0.5" />
                      <span>{outlet.address}</span>
                    </div>

                    {outlet.landmark && (
                      <div className="text-xs text-[#345A36] font-semibold bg-[#FFF4D6] px-2.5 py-1 rounded-lg inline-block border border-[#F0DFC0]">
                        📍 {outlet.landmark}
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#547F50] shrink-0" />
                      <span>Jam Buka: <strong>{outlet.openingHours}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#547F50] shrink-0" />
                      <span>Telp / WA: <strong>{outlet.phone}</strong></span>
                    </div>
                  </div>

                  {/* Channels Available */}
                  <div className="pt-3 border-t border-[#F0DFC0] mb-6">
                    <div className="text-[11px] font-bold text-[#5D6257] uppercase tracking-wider mb-2">
                      Layanan & Aplikasi Tersedia:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[11px] font-bold bg-[#25D366]/10 text-[#25D366] px-2.5 py-1 rounded-full border border-[#25D366]/30">
                        WhatsApp Pesan
                      </span>
                      <span className="text-[11px] font-bold bg-[#D94720]/10 text-[#D94720] px-2.5 py-1 rounded-full border border-[#D94720]/30">
                        GoFood
                      </span>
                      <span className="text-[11px] font-bold bg-[#547F50]/10 text-[#547F50] px-2.5 py-1 rounded-full border border-[#547F50]/30">
                        GrabFood
                      </span>
                      <span className="text-[11px] font-bold bg-[#FFC72C]/20 text-[#1D2119] px-2.5 py-1 rounded-full border border-[#FFC72C]/40">
                        ShopeeFood
                      </span>
                    </div>
                  </div>
                </div>

                {/* Outlet Actions */}
                <div className="space-y-2 pt-2 border-t border-[#F0DFC0]">
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectOutlet(outlet)}
                      className={`py-2.5 px-3 rounded-xl font-bold text-xs border border-[#1D2119] flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#547F50] text-white shadow-[2px_2px_0px_#1D2119]'
                          : 'bg-[#FFF4D6] text-[#1D2119] hover:bg-[#FFC72C]'
                      }`}
                    >
                      {isSelected ? <Check className="w-4 h-4" /> : null}
                      <span>{isSelected ? 'Outlet Utama' : 'Pilih Cabang Ini'}</span>
                    </button>

                    <a
                      href={outlet.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 bg-[#FFFCF4] hover:bg-[#FFF4D6] text-[#1D2119] font-bold text-xs rounded-xl border border-[#1D2119] flex items-center justify-center gap-1.5 transition-colors text-center"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#D94720]" />
                      <span>Buka Google Maps</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectOutlet(outlet);
                      onOpenOrderDialog();
                    }}
                    className="w-full bg-[#D94720] hover:bg-[#B93419] text-white font-extrabold text-xs sm:text-sm py-3 rounded-xl border-2 border-[#1D2119] shadow-[3px_3px_0px_#1D2119] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Pesan Langsung Dari Outlet Ini</span>
                  </button>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
