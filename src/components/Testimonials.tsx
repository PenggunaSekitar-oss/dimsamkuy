import React from 'react';
import { Star, MessageSquareQuote, CheckCircle, Sparkles } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section id="testimoni" className="py-16 bg-[#FFF4D6] scroll-mt-20 border-b-2 border-[#F0DFC0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D94720] uppercase tracking-wider bg-[#FFFCF4] px-3.5 py-1 rounded-full border border-[#F0DFC0] mb-2 shadow-sm">
            <MessageSquareQuote className="w-4 h-4 text-[#D94720]" />
            <span>KATA MEREKA TENTANG DIMSAM KUY</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-[#345A36] leading-tight mb-2">
            Disukai Ribuan Pecinta Dimsum Makassar
          </h2>
          <p className="text-sm md:text-base text-[#5D6257] font-medium">
            Testimoni jujur dari pelanggan setia di Makassar & Gowa.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-[#FFFCF4] p-6 rounded-3xl border-2 border-[#1D2119] shadow-[4px_4px_0px_#1D2119] flex flex-col justify-between hover:-translate-y-1 transition-all"
            >
              
              <div>
                {/* Rating Stars & Source Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FFC72C] text-[#D94720]" />
                    ))}
                  </div>

                  <span className="text-[10px] font-extrabold uppercase bg-[#FFF4D6] text-[#345A36] px-2 py-0.5 rounded border border-[#F0DFC0]">
                    Via {item.source}
                  </span>
                </div>

                {/* Content Quote */}
                <p className="text-xs sm:text-sm text-[#1D2119] font-medium leading-relaxed italic mb-4">
                  "{item.content}"
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-3 border-t border-[#F0DFC0] space-y-1">
                <div className="font-bold text-sm text-[#1D2119] flex items-center gap-1.5">
                  <span>{item.name}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-[#547F50]" />
                </div>

                <div className="text-[11px] text-[#5D6257]">
                  {item.roleOrLocation}
                </div>

                {item.verifiedProduct && (
                  <div className="text-[10px] font-semibold text-[#D94720] pt-1">
                    Pilihan: {item.verifiedProduct}
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
