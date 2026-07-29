import React, { useState, useEffect } from 'react';
import { PRODUCTS_DATA } from './data/products';
import { OUTLETS_DATA } from './data/outlets';
import { PROMOTIONS_DATA } from './data/promotions';
import { TESTIMONIALS_DATA } from './data/testimonials';
import { FAQS_DATA } from './data/faqs';
import { Outlet, Product } from './types';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { KeyFeatures } from './components/KeyFeatures';
import { MenuSection } from './components/MenuSection';
import { ProductModal } from './components/ProductModal';
import { FamilyPartyPack } from './components/FamilyPartyPack';
import { PromoSection } from './components/PromoSection';
import { HowToOrder } from './components/HowToOrder';
import { OutletsSection } from './components/OutletsSection';
import { OrderDialog } from './components/OrderDialog';
import { Testimonials } from './components/Testimonials';
import { GallerySection } from './components/GallerySection';
import { FaqSection } from './components/FaqSection';
import { CtaBanner } from './components/CtaBanner';
import { StickyOrderBar } from './components/StickyOrderBar';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet | null>(null);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState<boolean>(false);
  const [orderProductName, setOrderProductName] = useState<string | undefined>(undefined);

  // Load saved outlet preference from localStorage on mount
  useEffect(() => {
    try {
      const savedOutletId = localStorage.getItem('dimsam_kuy_outlet_id');
      if (savedOutletId) {
        const found = OUTLETS_DATA.find((o) => o.id === savedOutletId);
        if (found) {
          setSelectedOutlet(found);
          return;
        }
      }
      // Default to Hertasning if no saved preference
      setSelectedOutlet(OUTLETS_DATA[0]);
    } catch {
      setSelectedOutlet(OUTLETS_DATA[0]);
    }
  }, []);

  const handleSelectOutlet = (outlet: Outlet) => {
    setSelectedOutlet(outlet);
    try {
      localStorage.setItem('dimsam_kuy_outlet_id', outlet.id);
    } catch {
      // ignore
    }
  };

  const handleOpenOrderDialog = (productName?: string) => {
    setOrderProductName(productName);
    setIsOrderDialogOpen(true);
  };

  const handleCloseOrderDialog = () => {
    setIsOrderDialogOpen(false);
    setOrderProductName(undefined);
  };

  return (
    <div className="min-h-screen bg-[#FFF4D6] text-[#1D2119] flex flex-col font-sans">
      
      {/* Header & Navbar */}
      <Navbar
        outlets={OUTLETS_DATA}
        selectedOutlet={selectedOutlet}
        onOpenOrderDialog={handleOpenOrderDialog}
        onSelectOutlet={handleSelectOutlet}
      />

      {/* Hero Section */}
      <main className="flex-grow">
        <Hero
          selectedOutlet={selectedOutlet}
          onOpenOrderDialog={handleOpenOrderDialog}
        />

        {/* 4 Pillars / Key Features */}
        <KeyFeatures />

        {/* Menu & Pricing Section */}
        <MenuSection
          products={PRODUCTS_DATA}
          onSelectProduct={(product) => setSelectedProductForModal(product)}
          onOpenOrderDialog={handleOpenOrderDialog}
        />

        {/* Family & Party Pack Highlight */}
        <FamilyPartyPack
          selectedOutlet={selectedOutlet}
          onOpenOrderDialog={handleOpenOrderDialog}
        />

        {/* Active Promos */}
        <PromoSection
          promotions={PROMOTIONS_DATA}
          selectedOutlet={selectedOutlet}
        />

        {/* How To Order */}
        <HowToOrder />

        {/* Outlets Locations & Selector */}
        <OutletsSection
          outlets={OUTLETS_DATA}
          selectedOutlet={selectedOutlet}
          onSelectOutlet={handleSelectOutlet}
          onOpenOrderDialog={handleOpenOrderDialog}
        />

        {/* Testimonials */}
        <Testimonials testimonials={TESTIMONIALS_DATA} />

        {/* Gallery */}
        <GallerySection />

        {/* FAQ Accordion */}
        <FaqSection faqs={FAQS_DATA} />

        {/* Closing CTA Banner */}
        <CtaBanner onOpenOrderDialog={handleOpenOrderDialog} />
      </main>

      {/* Footer */}
      <Footer outlets={OUTLETS_DATA} />

      {/* Mobile Sticky Order Bar */}
      <StickyOrderBar
        selectedOutlet={selectedOutlet}
        onOpenOrderDialog={() => handleOpenOrderDialog()}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProductForModal}
        outlets={OUTLETS_DATA}
        selectedOutlet={selectedOutlet}
        onClose={() => setSelectedProductForModal(null)}
        onOpenOrderDialog={handleOpenOrderDialog}
        onSelectOutlet={handleSelectOutlet}
      />

      {/* Order Workflow Dialog / Bottom Sheet */}
      <OrderDialog
        isOpen={isOrderDialogOpen}
        outlets={OUTLETS_DATA}
        selectedOutlet={selectedOutlet}
        productName={orderProductName}
        onClose={handleCloseOrderDialog}
        onSelectOutlet={handleSelectOutlet}
      />

    </div>
  );
}
