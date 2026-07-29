import React from 'react';
import { ShoppingBag, MapPin, Smartphone, ArrowRight } from 'lucide-react';

export const HowToOrder: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Pilih Menu & Porsi',
      desc: 'Pilih varian dimsum favoritmu dari menu reguler 4 pcs sampai Family Pack 16 pcs.',
      icon: <ShoppingBag className="w-6 h-6 text-[#D94720]" />
    },
    {
      num: '02',
      title: 'Pilih Outlet Terdekat',
      desc: 'Tentukan lokasi outlet terdekatmu di Hertasning, BTP, Onta Lama, atau Gowa.',
      icon: <MapPin className="w-6 h-6 text-[#547F50]" />
    },
    {
      num: '03',
      title: 'Order via Aplikasi / WA',
      desc: 'Klik order langsung via WhatsApp pesan cepat, GoFood, GrabFood, atau ShopeeFood!',
      icon: <Smartphone className="w-6 h-6 text-[#FFC72C]" />
    }
  ];

  return (
    <section className="py-16 bg-[#FFFCF4] border-b-2 border-[#F0DFC0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#547F50] uppercase tracking-wider bg-[#FFF4D6] px-3.5 py-1 rounded-full border border-[#F0DFC0] mb-2">
            <span>3 LANGKAH MUDAH</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-[#1D2119]">
            Cara Memesan DIMSAM KUY
          </h2>
        </div>

        {/* Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-[#FFF4D6] p-6 rounded-3xl border-2 border-[#1D2119] shadow-[4px_4px_0px_#1D2119] flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#FFFCF4] rounded-2xl border-2 border-[#1D2119] flex items-center justify-center shadow-[2px_2px_0px_#1D2119]">
                    {step.icon}
                  </div>
                  <span className="font-display text-4xl text-[#345A36] opacity-30 group-hover:opacity-100 transition-opacity">
                    {step.num}
                  </span>
                </div>

                <h3 className="font-display text-xl text-[#1D2119] mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-[#5D6257] leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 z-10 text-[#345A36]">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
