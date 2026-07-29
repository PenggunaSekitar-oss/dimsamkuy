import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search, ShieldCheck } from 'lucide-react';
import { FAQItem } from '../types';

interface FaqSectionProps {
  faqs: FAQItem[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredFaqs = faqs.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-16 bg-[#FFF4D6] scroll-mt-20 border-b-2 border-[#F0DFC0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#547F50] uppercase tracking-wider bg-[#FFFCF4] px-3.5 py-1 rounded-full border border-[#F0DFC0] mb-2 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-[#547F50]" />
            <span>PERTANYAAN UMUM (FAQ)</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-[#345A36] leading-tight mb-2">
            Informasi Seputar DIMSAM KUY
          </h2>
          <p className="text-sm text-[#5D6257] font-medium">
            Temukan jawaban lengkap seputar kehalalan, jumlah porsi, katering acara, dan lokasi outlet.
          </p>
        </div>

        {/* Search Bar in FAQ */}
        <div className="relative mb-8">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#5D6257]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pertanyaan... (contoh: halal, acara, porsi, simpan)"
            className="w-full bg-[#FFFCF4] text-[#1D2119] placeholder-[#5D6257] text-sm font-medium pl-12 pr-4 py-3.5 rounded-2xl border-2 border-[#1D2119] shadow-[3px_3px_0px_#1D2119] focus:outline-none focus:ring-2 focus:ring-[#FFC72C]"
          />
        </div>

        {/* Accordions List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-[#FFFCF4] rounded-2xl border-2 border-[#1D2119] shadow-[4px_4px_0px_#1D2119] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left font-bold text-base md:text-lg text-[#1D2119] flex items-center justify-between gap-4 hover:bg-[#FFF4D6] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[#D94720] font-display text-lg">Q.</span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#547F50] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-[#5D6257] font-medium leading-relaxed border-t border-[#F0DFC0] bg-[#FFF4D6]/50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Halal Guarantee Reassurance Banner */}
        <div className="mt-10 p-5 bg-[#345A36] text-white rounded-3xl border-2 border-[#1D2119] shadow-[4px_4px_0px_#1D2119] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#FFC72C] shrink-0" />
            <div>
              <div className="font-bold text-sm text-[#FFC72C]">
                Punya Pertanyaan Lain yang Belum Terjawab?
              </div>
              <div className="text-xs text-[#FFF4D6] font-medium">
                Tim admin kami siap membantu via WhatsApp selama jam operasional (10.00 - 22.00 WITA).
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/6282153382816?text=Halo%20DIMSAM%20KUY,%20saya%20mau%20tanya%20seputar%20menu"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs py-2.5 px-4 rounded-xl border border-[#1D2119] whitespace-nowrap"
          >
            Tanya Admin WA
          </a>
        </div>

      </div>
    </section>
  );
};
