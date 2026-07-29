import React from 'react';
import { ShieldCheck, Flame, Heart, Gift, Sparkles } from 'lucide-react';

export const KeyFeatures: React.FC = () => {
  const features = [
    {
      icon: <Flame className="w-8 h-8 text-[#D94720]" />,
      title: 'Full Daging Ayam Segar',
      description: 'Dibuat dengan racikan daging ayam pilihan padat juicy, bukan sekadar tepung berlebihan. Gigitan mantap di setiap pcs!'
    },
    {
      icon: <Heart className="w-8 h-8 text-[#D94720]" />,
      title: 'Saus Mentai Lumer Smoky',
      description: 'Siraman saus mentai creamy racikan khusus bertabur tobiko segar yang ditorch hingga beraroma smoky gurih nagih.'
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#547F50]" />,
      title: '100% Halal & Fresh',
      description: 'Bahan higienis bersertifikat halal tanpa babi, tanpa pengawet sintesis, disajikan fresh panas dari kukusan setiap hari.'
    },
    {
      icon: <Gift className="w-8 h-8 text-[#FFC72C]" />,
      title: 'Personal & Party Pack',
      description: 'Tersedia porsi reguler 4 pcs untuk cemilan pribadi, hingga Family Pack 16 pcs untuk rapat kantor dan acara keluarga.'
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-[#FFF4D6] border-b-2 border-[#F0DFC0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D94720] uppercase tracking-wider bg-[#FFFCF4] px-3 py-1 rounded-full border border-[#F0DFC0] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KENAPA HARUS DIMSAM KUY?</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-[#345A36] leading-tight">
            Sensasi Dimsum Mentai Lumer Terenak di Makassar
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#FFFCF4] p-6 rounded-2xl border-2 border-[#1D2119] shadow-[4px_4px_0px_#1D2119] hover:-translate-y-1 transition-all duration-200 flex flex-col items-start"
            >
              <div className="w-14 h-14 bg-[#FFF4D6] rounded-xl border-2 border-[#1D2119] flex items-center justify-center mb-4 shadow-[2px_2px_0px_#1D2119]">
                {feature.icon}
              </div>
              <h3 className="font-display text-xl text-[#1D2119] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[#5D6257] leading-relaxed font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
