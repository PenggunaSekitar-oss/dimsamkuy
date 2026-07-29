import React, { useState, useEffect } from 'react';
import { ShoppingBag, MapPin } from 'lucide-react';
import { Outlet } from '../types';

interface StickyOrderBarProps {
  selectedOutlet: Outlet | null;
  onOpenOrderDialog: () => void;
}

export const StickyOrderBar: React.FC<StickyOrderBarProps> = ({
  selectedOutlet,
  onOpenOrderDialog
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 350px
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-[#FFFCF4] border-t-2 border-[#1D2119] shadow-[0px_-4px_12px_rgba(0,0,0,0.15)] p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] transition-all animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between gap-3">
        
        {/* Left Info */}
        <div className="flex items-center gap-2 pl-1">
          <div className="w-8 h-8 bg-[#FFF4D6] rounded-xl border border-[#1D2119] flex items-center justify-center text-[#D94720]">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-extrabold text-[#5D6257] uppercase tracking-wider">
              {selectedOutlet ? selectedOutlet.shortName : 'Makassar & Gowa'}
            </div>
            <div className="font-display text-sm text-[#1D2119]">
              Mulai <span className="text-[#D94720]">Rp 30.000</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onOpenOrderDialog}
          className="bg-[#D94720] hover:bg-[#B93419] text-white font-extrabold text-sm px-5 py-2.5 rounded-xl border-2 border-[#1D2119] shadow-[2px_2px_0px_#1D2119] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-2 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Pesan Sekarang</span>
        </button>

      </div>
    </div>
  );
};
