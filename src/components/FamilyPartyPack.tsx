import React from 'react';
import { Gift, Users, MessageCircle, CheckCircle2, Sparkles, Award } from 'lucide-react';
import { Outlet } from '../types';

interface FamilyPartyPackProps {
  selectedOutlet: Outlet | null;
  onOpenOrderDialog: (productName?: string) => void;
}

export const FamilyPartyPack: React.FC<FamilyPartyPackProps> = ({
  selectedOutlet,
  onOpenOrderDialog
}) => {
  const handleConsultEvent = () => {
    const waNumber = selectedOutlet ? selectedOutlet.whatsappNumber : '6282153382816';
    const message = encodeURIComponent(
      'Halo DIMSAM KUY, saya mau konsultasi pemesanan paket dimsum untuk acara (Rapat / Arisan / Syukuran / Ulang Tahun). Boleh minta info porsi dan penawaran khusus?'
    );
    window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="party-pack" className="py-16 bg-[#547F50] text-white relative brand-checkerboard border-b-4 border-[#1D2119] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#FFFCF4] text-[#1D2119] rounded-3xl border-4 border-[#1D2119] shadow-[10px_10px_0px_#1D2119] overflow-hidden p-6 sm:p-10 lg:p-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 bg-[#FFC72C] text-[#1D2119] px-3.5 py-1.5 rounded-full border-2 border-[#1D2119] shadow-[2px_2px_0px_#1D2119] font-bold text-xs">
                <Gift className="w-4 h-4 text-[#D94720]" />
                <span>SPESIAL ACARA & KATERING RAME-RAME</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#345A36] leading-tight">
                Family & Party Pack 16 Pcs Padat
              </h2>

              <p className="text-base sm:text-lg text-[#5D6257] font-medium leading-relaxed">
                Porsi jumbo hemat berisi <strong>16 pcs dimsum melimpah</strong> lengkap dengan 2 box porsi saus mentai creamy dan saus cocolan pedas. Pilihan favorit utama untuk rapat kantor, arisan keluarga, syukuran, hingga pesta ulang tahun!
              </p>

              {/* Occasions List */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#345A36]">
                  <CheckCircle2 className="w-5 h-5 text-[#D94720] shrink-0" />
                  <span>Rapat & Acara Kantor</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-[#345A36]">
                  <CheckCircle2 className="w-5 h-5 text-[#D94720] shrink-0" />
                  <span>Arisan & Syukuran</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-[#345A36]">
                  <CheckCircle2 className="w-5 h-5 text-[#D94720] shrink-0" />
                  <span>Ulang Tahun & Pesta</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-[#345A36]">
                  <CheckCircle2 className="w-5 h-5 text-[#D94720] shrink-0" />
                  <span>Kumpul Keluarga Weekend</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => onOpenOrderDialog('Family Pack Mix Party')}
                  className="bg-[#D94720] hover:bg-[#B93419] text-white font-extrabold text-base px-6 py-4 rounded-2xl border-2 border-[#1D2119] shadow-[4px_4px_0px_#1D2119] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Gift className="w-5 h-5" />
                  <span>Pesan Party Pack (16 Pcs)</span>
                </button>

                <button
                  type="button"
                  onClick={handleConsultEvent}
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-base px-6 py-4 rounded-2xl border-2 border-[#1D2119] shadow-[4px_4px_0px_#1D2119] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Tanya Katering Acara WA</span>
                </button>
              </div>

            </div>

            {/* Right Showcase Box */}
            <div className="lg:col-span-5 relative">
              <div className="bg-[#FFF4D6] p-4 rounded-3xl border-3 border-[#1D2119] shadow-[6px_6px_0px_#1D2119]">
                <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-[#1D2119]">
                  <img
                    src="https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1000&q=80"
                    alt="Family Pack Dimsum 16 pcs besar DIMSAM KUY"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-[#FFC72C] text-[#1D2119] font-extrabold text-xs px-3 py-1.5 rounded-xl border border-[#1D2119] shadow-[2px_2px_0px_#1D2119]">
                    HEMAT SAMPAI RP 15RB
                  </div>
                </div>

                <div className="mt-4 p-3 bg-[#FFFCF4] rounded-2xl border border-[#F0DFC0] flex items-center justify-between">
                  <div>
                    <div className="font-display text-lg text-[#345A36]">Family Pack Mix Party</div>
                    <div className="text-xs text-[#5D6257] font-medium">16 Pcs 4 Varian + Saus Melimpah</div>
                  </div>
                  <div className="font-display text-xl text-[#D94720]">
                    Rp 125.000
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
