import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, ShoppingBag, Utensils, MessageCircle, ChevronRight, Phone } from 'lucide-react';
import { Outlet } from '../types';

interface NavbarProps {
  outlets: Outlet[];
  selectedOutlet: Outlet | null;
  onOpenOrderDialog: (productName?: string) => void;
  onSelectOutlet: (outlet: Outlet) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  outlets,
  selectedOutlet,
  onOpenOrderDialog,
  onSelectOutlet
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOutletDropdownOpen, setIsOutletDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#D94720] text-white py-2 px-4 text-xs md:text-sm text-center font-medium tracking-wide flex items-center justify-center gap-2 shadow-inner">
        <span className="bg-[#FFC72C] text-[#1D2119] text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
          HOT PROMO
        </span>
        <span>
          Diskon <strong>Party Pack</strong> + Gratis Extra Saus Mentai! Order via WA Sekarang 🔥
        </span>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFFCF4]/95 backdrop-blur-md shadow-md py-3 border-b border-[#F0DFC0]'
            : 'bg-[#547F50] py-4 text-white border-b border-[#345A36]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#FFC72C] rounded-lg p-1">
            <div className="w-10 h-10 md:w-11 md:h-11 bg-[#FFC72C] border-2 border-[#1D2119] rounded-xl flex items-center justify-center shadow-[3px_3px_0px_#1D2119] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
              <Utensils className="w-6 h-6 text-[#1D2119]" />
            </div>
            <div className="flex flex-col">
              <span className={`font-display text-2xl md:text-3xl leading-none tracking-wide ${
                isScrolled ? 'text-[#547F50] text-shadow-black' : 'text-[#FFC72C] text-shadow-red'
              }`}>
                DIMSAM KUY
              </span>
              <span className={`text-[10px] md:text-xs font-bold tracking-widest uppercase ${
                isScrolled ? 'text-[#5D6257]' : 'text-[#FFF4D6]'
              }`}>
                HOMEMADE MENTAI HALAL
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 font-semibold text-sm">
            <a
              href="#menu"
              className={`transition-colors hover:text-[#D94720] ${
                isScrolled ? 'text-[#1D2119]' : 'text-[#FFF4D6] hover:text-[#FFC72C]'
              }`}
            >
              Menu & Harga
            </a>
            <a
              href="#promo"
              className={`transition-colors hover:text-[#D94720] ${
                isScrolled ? 'text-[#1D2119]' : 'text-[#FFF4D6] hover:text-[#FFC72C]'
              }`}
            >
              Promo Hot
            </a>
            <a
              href="#party-pack"
              className={`transition-colors hover:text-[#D94720] ${
                isScrolled ? 'text-[#1D2119]' : 'text-[#FFF4D6] hover:text-[#FFC72C]'
              }`}
            >
              Party Pack
            </a>
            <a
              href="#outlets"
              className={`transition-colors hover:text-[#D94720] ${
                isScrolled ? 'text-[#1D2119]' : 'text-[#FFF4D6] hover:text-[#FFC72C]'
              }`}
            >
              Lokasi Outlet
            </a>
            <a
              href="#testimoni"
              className={`transition-colors hover:text-[#D94720] ${
                isScrolled ? 'text-[#1D2119]' : 'text-[#FFF4D6] hover:text-[#FFC72C]'
              }`}
            >
              Testimoni
            </a>
            <a
              href="#faq"
              className={`transition-colors hover:text-[#D94720] ${
                isScrolled ? 'text-[#1D2119]' : 'text-[#FFF4D6] hover:text-[#FFC72C]'
              }`}
            >
              FAQ
            </a>
          </nav>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Active Outlet Selector Pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsOutletDropdownOpen(!isOutletDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  isScrolled
                    ? 'bg-[#FFF4D6] text-[#345A36] border-[#F0DFC0] hover:bg-[#F0DFC0]'
                    : 'bg-[#345A36] text-[#FFC72C] border-[#244629] hover:bg-[#244629]'
                }`}
                title="Pilih outlet terdekat"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D94720] animate-bounce" />
                <span>{selectedOutlet ? selectedOutlet.shortName : 'Pilih Outlet'}</span>
              </button>

              {/* Outlet Dropdown */}
              {isOutletDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#FFFCF4] border-2 border-[#1D2119] rounded-2xl shadow-[4px_4px_0px_#1D2119] p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="text-xs font-bold text-[#5D6257] px-3 py-1 border-b border-[#F0DFC0]">
                    PILIH OUTLET TERDEKAT:
                  </div>
                  <div className="py-1 space-y-1">
                    {outlets.map((outlet) => (
                      <button
                        key={outlet.id}
                        type="button"
                        onClick={() => {
                          onSelectOutlet(outlet);
                          setIsOutletDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                          selectedOutlet?.id === outlet.id
                            ? 'bg-[#547F50] text-white font-bold'
                            : 'hover:bg-[#FFF4D6] text-[#1D2119]'
                        }`}
                      >
                        <div>
                          <div className="font-bold">{outlet.name}</div>
                          <div className="text-[10px] opacity-80">{outlet.area}</div>
                        </div>
                        {selectedOutlet?.id === outlet.id && (
                          <span className="bg-[#FFC72C] text-[#1D2119] text-[9px] px-1.5 py-0.5 rounded font-bold">
                            Aktif
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Primary Order Button */}
            <button
              type="button"
              onClick={() => onOpenOrderDialog()}
              className="bg-[#D94720] hover:bg-[#B93419] text-white font-bold text-sm px-4 py-2 rounded-xl border-2 border-[#1D2119] shadow-[3px_3px_0px_#1D2119] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#1D2119] transition-all flex items-center gap-2 group cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Pesan Sekarang</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenOrderDialog()}
              className="bg-[#D94720] text-white font-bold text-xs px-3 py-1.5 rounded-lg border border-[#1D2119] flex items-center gap-1"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Pesan</span>
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-xl border-2 border-[#1D2119] shadow-[2px_2px_0px_#1D2119] ${
                isScrolled ? 'bg-[#FFF4D6] text-[#1D2119]' : 'bg-[#FFC72C] text-[#1D2119]'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Sheet */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-[#1D2119]/60 backdrop-blur-sm flex justify-end">
          <div className="w-4/5 max-w-sm bg-[#FFFCF4] h-full shadow-2xl p-6 flex flex-col justify-between border-l-4 border-[#1D2119] overflow-y-auto animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#F0DFC0]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#FFC72C] border-2 border-[#1D2119] rounded-lg flex items-center justify-center font-bold">
                    DK
                  </div>
                  <span className="font-display text-xl text-[#547F50]">DIMSAM KUY</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-[#FFF4D6] text-[#1D2119] border border-[#1D2119]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Outlet Indicator in Mobile Menu */}
              <div className="mt-4 p-3 bg-[#FFF4D6] rounded-2xl border border-[#F0DFC0]">
                <div className="text-xs font-bold text-[#5D6257] mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D94720]" />
                  <span>Outlet Pilihan Kamu:</span>
                </div>
                <div className="font-bold text-sm text-[#345A36]">
                  {selectedOutlet ? selectedOutlet.name : 'Belum Dipilih'}
                </div>
                <div className="mt-2 text-xs font-semibold text-[#D94720] flex items-center gap-1">
                  <span>Ganti outlet di section Lokasi Outlet</span>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 flex flex-col gap-3 font-bold text-base text-[#1D2119]">
                <a
                  href="#menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 rounded-xl hover:bg-[#FFF4D6] flex items-center justify-between border border-transparent hover:border-[#F0DFC0]"
                >
                  <span>Menu & Harga</span>
                  <ChevronRight className="w-4 h-4 text-[#5D6257]" />
                </a>
                <a
                  href="#promo"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 rounded-xl hover:bg-[#FFF4D6] flex items-center justify-between border border-transparent hover:border-[#F0DFC0]"
                >
                  <span>Promo Hot 🔥</span>
                  <ChevronRight className="w-4 h-4 text-[#5D6257]" />
                </a>
                <a
                  href="#party-pack"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 rounded-xl hover:bg-[#FFF4D6] flex items-center justify-between border border-transparent hover:border-[#F0DFC0]"
                >
                  <span>Family & Party Pack</span>
                  <ChevronRight className="w-4 h-4 text-[#5D6257]" />
                </a>
                <a
                  href="#outlets"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 rounded-xl hover:bg-[#FFF4D6] flex items-center justify-between border border-transparent hover:border-[#F0DFC0]"
                >
                  <span>Lokasi Outlet Makassar</span>
                  <ChevronRight className="w-4 h-4 text-[#5D6257]" />
                </a>
                <a
                  href="#testimoni"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 rounded-xl hover:bg-[#FFF4D6] flex items-center justify-between border border-transparent hover:border-[#F0DFC0]"
                >
                  <span>Testimoni Pelanggan</span>
                  <ChevronRight className="w-4 h-4 text-[#5D6257]" />
                </a>
                <a
                  href="#faq"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 rounded-xl hover:bg-[#FFF4D6] flex items-center justify-between border border-transparent hover:border-[#F0DFC0]"
                >
                  <span>FAQ & Info Halal</span>
                  <ChevronRight className="w-4 h-4 text-[#5D6257]" />
                </a>
              </nav>
            </div>

            <div className="pt-6 border-t border-[#F0DFC0] space-y-3">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenOrderDialog();
                }}
                className="w-full bg-[#D94720] text-white font-bold text-base py-3 rounded-xl border-2 border-[#1D2119] shadow-[3px_3px_0px_#1D2119] flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Pesan Sekarang</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
