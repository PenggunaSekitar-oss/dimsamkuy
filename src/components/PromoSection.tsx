import React from 'react';
import { Flame, Clock, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';
import { Promotion, Outlet } from '../types';

interface PromoSectionProps {
  promotions: Promotion[];
  selectedOutlet: Outlet | null;
}

export const PromoSection: React.FC<PromoSectionProps> = ({ promotions, selectedOutlet }) => {
  const activePromos = promotions.filter((p) => p.isActive);

  if (activePromos.length === 0) return null;

  const handleClaimPromo = (promo: Promotion) => {
    const waNumber = selectedOutlet ? selectedOutlet.whatsappNumber : '6282153382816';
    const message = encodeURIComponent(
      `Halo DIMSAM KUY, saya mau klaim ${promo.title}: ${promo.subTitle}. Mohon info syarat dan cara pemesanannya!`
    );
    window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="promo" className="py-16 bg-[#FFF4D6] scroll-mt-20 border-b-2 border-[#F0DFC0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D94720] uppercase tracking-wider bg-[#FFFCF4] px-3.5 py-1 rounded-full border border-[#F0DFC0] mb-2 shadow-sm">
            <Flame className="w-4 h-4 text-[#D94720]" />
            <span>PROMO SPESIAL HARI INI</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-[#345A36] leading-tight">
            Penawaran Hemat DIMSAM KUY
          </h2>
          <p className="text-sm md:text-base text-[#5D6257] font-medium">
            Klaim promo terbatas untuk pesanan via WhatsApp di seluruh cabang Makassar & Gowa.
          </p>
        </div>

        {/* Promo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activePromos.map((promo) => (
            <div
              key={promo.id}
              className="bg-[#FFFCF4] rounded-3xl border-3 border-[#1D2119] shadow-[6px_6px_0px_#1D2119] overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-all"
            >
              
              <div>
                {/* Banner Top Bar */}
                <div className="bg-[#D94720] text-white px-6 py-3 flex items-center justify-between border-b-2 border-[#1D2119]">
                  <span className="font-extrabold text-sm uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#FFC72C]" />
                    {promo.badgeText}
                  </span>
                  <div className="text-xs font-bold bg-[#1D2119] text-[#FFC72C] px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>s/d {promo.validUntil}</span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-4">
                  <h3 className="font-display text-2xl text-[#1D2119]">
                    {promo.title}
                  </h3>

                  <div className="font-bold text-base text-[#547F50] bg-[#FFF4D6] p-3 rounded-2xl border border-[#F0DFC0]">
                    {promo.subTitle}
                  </div>

                  <p className="text-sm text-[#5D6257] leading-relaxed font-medium">
                    {promo.description}
                  </p>

                  {/* Terms */}
                  <div className="space-y-2 pt-2 border-t border-[#F0DFC0]">
                    <div className="text-xs font-bold text-[#345A36] uppercase tracking-wider">
                      Syarat & Ketentuan:
                    </div>
                    <ul className="space-y-1.5">
                      {promo.terms.map((term, idx) => (
                        <li key={idx} className="text-xs text-[#5D6257] flex items-start gap-2 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#547F50] shrink-0 mt-0.5" />
                          <span>{term}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Promo Action Button */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => handleClaimPromo(promo)}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm py-3.5 rounded-2xl border-2 border-[#1D2119] shadow-[3px_3px_0px_#1D2119] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{promo.ctaLabel}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
