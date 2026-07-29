import React, { useState } from 'react';
import { Camera, X, ZoomIn, Sparkles } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeImage, setActiveImage] = useState<{ url: string; title: string; desc: string } | null>(null);

  const galleryItems = [
    {
      url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
      title: 'Proses Torch Saus Mentai',
      desc: 'Saus mentai creamy ditorch langsung sampai smoky melted'
    },
    {
      url: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80',
      title: 'Dimsum Kukus Bambu',
      desc: 'Dimsum panas dikukus segar dari wadah bambu tradisional'
    },
    {
      url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
      title: 'Dimsum Mozarella Melted',
      desc: 'Lelehan keju mozarella mulur gurih di atas dimsum ayam'
    },
    {
      url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80',
      title: 'Dimsum Nori Mentai',
      desc: 'Balutan rumput laut nori jepang panggang yang umami'
    },
    {
      url: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80',
      title: 'Dimsum Goreng Crispy',
      desc: 'Garing krispi renyah di luar, juicy penuh daging di dalam'
    },
    {
      url: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80',
      title: 'Family Pack 16 Pcs',
      desc: 'Paket besar porsi rame-rame lengkap dengan saus ekstra'
    }
  ];

  return (
    <section className="py-16 bg-[#FFFCF4] border-b-2 border-[#F0DFC0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#547F50] uppercase tracking-wider bg-[#FFF4D6] px-3.5 py-1 rounded-full border border-[#F0DFC0] mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>GALERI FOTO REAL DIMSAM KUY</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-[#1D2119]">
            Bikin Ngiler Di Setiap Gigitan!
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImage(item)}
              className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-[#1D2119] shadow-[4px_4px_0px_#1D2119] cursor-pointer bg-[#FFF4D6]"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1D2119]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#FFC72C]">{item.title}</span>
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>
                <span className="text-[11px] text-white/90 line-clamp-1">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-[#1D2119]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-[#FFFCF4] p-4 rounded-3xl border-4 border-[#1D2119] shadow-2xl space-y-3">
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-[#FFC72C] text-[#1D2119] rounded-2xl border-2 border-[#1D2119] shadow-[2px_2px_0px_#1D2119] flex items-center justify-center font-bold"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#1D2119]">
              <img
                src={activeImage.url}
                alt={activeImage.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-2">
              <h3 className="font-display text-2xl text-[#345A36]">{activeImage.title}</h3>
              <p className="text-sm text-[#5D6257] font-medium">{activeImage.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
