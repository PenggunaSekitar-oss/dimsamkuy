import React, { useState, useEffect } from 'react';
import { X, MapPin, MessageCircle, ExternalLink, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { Outlet, OrderChannelType } from '../types';

interface OrderDialogProps {
  isOpen: boolean;
  outlets: Outlet[];
  selectedOutlet: Outlet | null;
  productName?: string;
  onClose: () => void;
  onSelectOutlet: (outlet: Outlet) => void;
}

export const OrderDialog: React.FC<OrderDialogProps> = ({
  isOpen,
  outlets,
  selectedOutlet,
  productName,
  onClose,
  onSelectOutlet
}) => {
  const [activeStep, setActiveStep] = useState<1 | 2>(selectedOutlet ? 2 : 1);

  useEffect(() => {
    if (selectedOutlet) {
      setActiveStep(2);
    } else {
      setActiveStep(1);
    }
  }, [selectedOutlet, isOpen]);

  if (!isOpen) return null;

  const currentOutlet = selectedOutlet || outlets[0];

  const handleWhatsAppRedirect = () => {
    const waNum = currentOutlet.whatsappNumber;
    let messageText = `Halo DIMSAM KUY ${currentOutlet.shortName}, saya mau pesan dimsum!`;
    if (productName) {
      messageText = `Halo DIMSAM KUY ${currentOutlet.shortName}, saya mau pesan *${productName}*. Boleh minta info total & ongkirnya?`;
    }
    const url = `https://wa.me/${waNum}?text=${encodeURIComponent(messageText)}`;
    window.open(url, '_blank');
  };

  const handleChannelRedirect = (type: OrderChannelType) => {
    if (type === 'whatsapp') {
      handleWhatsAppRedirect();
      return;
    }

    let url = currentOutlet.whatsappUrl;
    if (type === 'gofood') url = currentOutlet.orderChannels.gofoodUrl || currentOutlet.whatsappUrl;
    if (type === 'grabfood') url = currentOutlet.orderChannels.grabfoodUrl || currentOutlet.whatsappUrl;
    if (type === 'shopeefood') url = currentOutlet.orderChannels.shopeefoodUrl || currentOutlet.whatsappUrl;

    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1D2119]/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      
      {/* Container: Bottom Sheet on Mobile, Centered Modal on Desktop */}
      <div className="relative w-full max-w-lg bg-[#FFFCF4] rounded-t-3xl sm:rounded-3xl border-t-4 sm:border-4 border-[#1D2119] shadow-[0px_-8px_20px_rgba(0,0,0,0.3)] sm:shadow-[10px_10px_0px_#1D2119] overflow-hidden my-0 sm:my-auto max-h-[92vh] flex flex-col animate-in slide-in-from-bottom duration-300">
        
        {/* Mobile Drag Handle Indicator */}
        <div className="w-12 h-1.5 bg-[#F0DFC0] rounded-full mx-auto my-2 sm:hidden"></div>

        {/* Header */}
        <div className="p-5 bg-[#547F50] text-white border-b-2 border-[#1D2119] flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-extrabold text-[#FFC72C] tracking-wider">
              {activeStep === 1 ? 'LANGKAH 1 DARI 2' : 'LANGKAH 2 DARI 2'}
            </div>
            <h3 className="font-display text-xl text-white">
              {activeStep === 1 ? 'Mau pesan dari outlet mana?' : 'Pilih Kanal Pemesanan'}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 bg-[#FFC72C] hover:bg-[#D94720] hover:text-white text-[#1D2119] rounded-xl border border-[#1D2119] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Tutup dialog pemesanan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          
          {/* Order Item Context Badge */}
          {productName && (
            <div className="p-3 bg-[#FFF4D6] rounded-2xl border border-[#F0DFC0] flex items-center justify-between">
              <div className="text-xs text-[#5D6257] font-medium">
                Pilihan Pesanan: <strong className="text-[#345A36] text-sm block">{productName}</strong>
              </div>
              <span className="bg-[#D94720] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                Item Terpilih
              </span>
            </div>
          )}

          {/* STEP 1: Select Outlet */}
          {activeStep === 1 ? (
            <div className="space-y-3">
              <p className="text-xs text-[#5D6257] font-semibold">
                Pilih lokasi outlet DIMSAM KUY terdekat dari lokasimu agar pengiriman lebih cepat & ongkir lebih hemat:
              </p>

              <div className="space-y-2">
                {outlets.map((outlet) => (
                  <button
                    key={outlet.id}
                    type="button"
                    onClick={() => {
                      onSelectOutlet(outlet);
                      setActiveStep(2);
                    }}
                    className="w-full bg-[#FFF4D6] hover:bg-[#FFC72C] p-4 rounded-2xl border-2 border-[#1D2119] shadow-[3px_3px_0px_#1D2119] active:translate-x-0.5 active:translate-y-0.5 transition-all text-left flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-sm text-[#1D2119] group-hover:text-[#345A36]">
                        {outlet.name}
                      </div>
                      <div className="text-xs text-[#5D6257] font-medium">
                        {outlet.area} • Jam: {outlet.openingHours}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#345A36] group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            
            /* STEP 2: Choose Delivery Channel */
            <div className="space-y-4">
              
              {/* Outlet Active Summary Card */}
              <div className="p-3.5 bg-[#345A36] text-white rounded-2xl border-2 border-[#1D2119] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FFC72C] shrink-0" />
                  <div>
                    <div className="text-[10px] text-[#FFC72C] font-extrabold uppercase">OUTLET DIMSAM KUY:</div>
                    <div className="text-sm font-bold">{currentOutlet.name}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="text-xs text-[#FFC72C] underline font-bold hover:text-white"
                >
                  Ganti
                </button>
              </div>

              {/* Channel Buttons */}
              <div className="space-y-2.5">
                
                {/* WhatsApp - Recommended */}
                <button
                  type="button"
                  onClick={() => handleChannelRedirect('whatsapp')}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-2xl border-2 border-[#1D2119] shadow-[4px_4px_0px_#1D2119] active:translate-x-0.5 active:translate-y-0.5 transition-all text-left flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl text-[#25D366] flex items-center justify-center font-bold">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm flex items-center gap-2">
                        <span>Pesan Cepat via WhatsApp</span>
                        <span className="bg-[#FFC72C] text-[#1D2119] text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">
                          REKOMENDASI
                        </span>
                      </div>
                      <div className="text-xs text-white/90 font-medium">
                        Respon cepat admin • Pilihan custom promo
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>

                {/* GoFood */}
                <button
                  type="button"
                  onClick={() => handleChannelRedirect('gofood')}
                  className="w-full bg-[#FFF4D6] hover:bg-[#F0DFC0] text-[#1D2119] p-3.5 rounded-2xl border-2 border-[#1D2119] shadow-[2px_2px_0px_#1D2119] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#D94720] rounded-xl text-white font-black text-xs flex items-center justify-center">
                      GF
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-sm">GoFood Makassar</div>
                      <div className="text-xs text-[#5D6257]">Buka aplikasi Gojek untuk pesan antar</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#5D6257]" />
                </button>

                {/* GrabFood */}
                <button
                  type="button"
                  onClick={() => handleChannelRedirect('grabfood')}
                  className="w-full bg-[#FFF4D6] hover:bg-[#F0DFC0] text-[#1D2119] p-3.5 rounded-2xl border-2 border-[#1D2119] shadow-[2px_2px_0px_#1D2119] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#547F50] rounded-xl text-white font-black text-xs flex items-center justify-center">
                      GR
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-sm">GrabFood Makassar</div>
                      <div className="text-xs text-[#5D6257]">Buka aplikasi Grab untuk pesan cepat</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#5D6257]" />
                </button>

                {/* ShopeeFood */}
                <button
                  type="button"
                  onClick={() => handleChannelRedirect('shopeefood')}
                  className="w-full bg-[#FFF4D6] hover:bg-[#F0DFC0] text-[#1D2119] p-3.5 rounded-2xl border-2 border-[#1D2119] shadow-[2px_2px_0px_#1D2119] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#FFC72C] text-[#1D2119] border border-[#1D2119] rounded-xl font-black text-xs flex items-center justify-center">
                      SF
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-sm">ShopeeFood Makassar</div>
                      <div className="text-xs text-[#5D6257]">Gunakan voucher gratis ongkir Shopee</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#5D6257]" />
                </button>

              </div>

            </div>
          )}

          {/* Footer note */}
          <div className="p-3 bg-[#FFFCF4] rounded-2xl border border-[#F0DFC0] text-center text-[11px] text-[#5D6257] font-medium flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#547F50] shrink-0" />
            <span>100% Halal • Fresh Kukus Setiap Hari • Kemasan Aman Fast Shipping</span>
          </div>

        </div>

      </div>

    </div>
  );
};
