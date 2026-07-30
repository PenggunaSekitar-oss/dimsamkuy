import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Phone,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react';
import { OUTLETS_DATA } from './data/outlets';
import { PRODUCTS_DATA } from './data/products';
import type { Outlet, Product } from './types';

const categories = [
  { id: 'semua', label: 'Semua menu' },
  { id: 'original', label: 'Original' },
  { id: 'mentai', label: 'Mentai & nori' },
  { id: 'goreng', label: 'Goreng' },
  { id: 'party', label: 'Party pack' },
];

const formatPrice = (price: number | null) =>
  price
    ? new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
      }).format(price)
    : 'Tanya outlet';

function useScrollReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (reduceMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    document.documentElement.classList.add('reveal-ready');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('reveal-ready');
    };
  }, []);
}

function useScrollMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const header = document.querySelector<HTMLElement>('.site-header');
    const heroImage = document.querySelector<HTMLElement>('.hero-product__image img');
    const partySection = document.querySelector<HTMLElement>('[data-scroll-scene="party"]');
    const partyImage = partySection?.querySelector<HTMLElement>('[data-scroll-zoom]');
    const partyCopy = partySection?.querySelector<HTMLElement>('[data-scroll-copy]');
    const getProductImages = () =>
      Array.from(document.querySelectorAll<HTMLElement>('.product-card__visual img'));

    let frame = 0;

    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max);

    const update = () => {
      frame = 0;
      const scrollY = window.scrollY;
      header?.classList.toggle('is-scrolled', scrollY > 40);

      if (reduceMotion.matches) {
        heroImage?.style.removeProperty('--hero-parallax');
        partySection?.style.removeProperty('--party-progress');
        partyImage?.style.removeProperty('--party-scale');
        partyImage?.style.removeProperty('--party-image-shift');
        partyCopy?.style.removeProperty('--party-copy-shift');
        getProductImages().forEach((image) => image.style.removeProperty('--card-parallax'));
        return;
      }

      heroImage?.style.setProperty(
        '--hero-parallax',
        `${clamp(scrollY * 0.22, 0, 118).toFixed(1)}px`,
      );

      if (partySection && partyImage && partyCopy) {
        const rect = partySection.getBoundingClientRect();
        const travel = Math.max(partySection.offsetHeight - window.innerHeight, 1);
        const progress = clamp(-rect.top / travel, 0, 1);

        partySection.style.setProperty('--party-progress', progress.toFixed(4));
        partyImage.style.setProperty('--party-scale', (1.04 + progress * 0.14).toFixed(4));
        partyImage.style.setProperty(
          '--party-image-shift',
          `${(-12 + progress * 24).toFixed(1)}px`,
        );
        partyCopy.style.setProperty(
          '--party-copy-shift',
          `${(18 - progress * 36).toFixed(1)}px`,
        );
      }

      getProductImages().forEach((image, index) => {
        const card = image.closest<HTMLElement>('.product-card');
        if (!card) return;

        const rect = card.getBoundingClientRect();
        if (rect.bottom < -80 || rect.top > window.innerHeight + 80) return;

        const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
        const speed = index % 3 === 0 ? 0.045 : index % 3 === 1 ? 0.033 : 0.039;
        image.style.setProperty(
          '--card-parallax',
          `${clamp(centerOffset * speed, -14, 14).toFixed(1)}px`,
        );
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    reduceMotion.addEventListener('change', requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      reduceMotion.removeEventListener('change', requestUpdate);
      header?.classList.remove('is-scrolled');
    };
  }, []);
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <a className="brand-mark" href="#top" aria-label="DIMSAM KUY, kembali ke atas">
      <span className="brand-mark__name">Dimsam Kuy</span>
      {!compact && <span className="brand-mark__tagline">Best dimsum in town</span>}
    </a>
  );
}

function Header({ onOrder }: { onOrder: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <div className="notice">
        <span>Makassar & sekitarnya</span>
        <span className="notice__dot" aria-hidden="true" />
        <span>Setiap hari, 10.00–22.00 WITA</span>
      </div>
      <header className="site-header">
        <div className="container site-header__inner">
          <BrandMark compact />
          <nav className="desktop-nav" aria-label="Navigasi utama">
            <a href="#menu">Menu</a>
            <a href="#party-pack">Party Pack</a>
            <a href="#outlet">Outlet</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="site-header__actions">
            <button className="button button--small button--primary header-order" type="button" onClick={onOrder}>
              Cara pesan
            </button>
            <button
              className="menu-toggle"
              type="button"
              onClick={() => setIsOpen((value) => !value)}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {isOpen && (
          <nav id="mobile-navigation" className="mobile-nav" aria-label="Navigasi mobile">
            <a href="#menu" onClick={closeMenu}>Menu <ArrowRight size={18} /></a>
            <a href="#party-pack" onClick={closeMenu}>Party Pack <ArrowRight size={18} /></a>
            <a href="#outlet" onClick={closeMenu}>Outlet <ArrowRight size={18} /></a>
            <a href="#faq" onClick={closeMenu}>FAQ <ArrowRight size={18} /></a>
          </nav>
        )}
      </header>
    </>
  );
}

function Hero({ onOrder }: { onOrder: () => void }) {
  return (
    <section id="top" className="hero checkerboard">
      <div className="container hero__grid">
        <div className="hero__content" data-reveal="left">
          <p className="eyebrow eyebrow--yellow">Homemade dimsum halal di Makassar</p>
          <h1>
            <span className="hero__title-primary">Dimsum lumer,</span>
            <span className="hero__title-secondary">isiannya nggak pelit.</span>
          </h1>
          <p className="hero__lead">
            Pilih yang original, gurih nori, sampai family pack buat rame-rame.
            Cek menu dan harga di sini, lalu pesan melalui outlet atau aplikasi
            pesan-antar pilihanmu.
          </p>
          <div className="hero__actions">
            <button className="button button--primary" type="button" onClick={onOrder}>
              <ShoppingBag size={19} />
              Lihat cara pesan
            </button>
            <a className="button button--light" href="#menu">
              Lihat menu
              <ArrowRight size={19} />
            </a>
          </div>
          <ul className="hero__proof" aria-label="Keunggulan DIMSAM KUY">
            <li><Check size={15} /> Homemade</li>
            <li><Check size={15} /> Halal</li>
            <li><Check size={15} /> 3 outlet Makassar</li>
          </ul>
        </div>

        <div
          className="hero-product"
          aria-label="Family Pack Mix Party DIMSAM KUY"
          data-reveal="scale"
          data-reveal-delay="1"
        >
          <div className="hero-product__image">
            <img
              src="/images/products/family-mix.webp"
              alt="Family Pack Mix Party DIMSAM KUY berisi dimsum nori, spicy, dan mozzarella"
            />
          </div>
          <div className="hero-product__caption">
            <div>
              <p>Yang paling rame</p>
              <strong>Family Pack Mix Party</strong>
            </div>
            <span>Rp125K</span>
          </div>
          <div className="hero-product__stamp" aria-hidden="true">
            <Sparkles size={18} />
            <span>Mix<br />Party</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function MarqueeStrip() {
  const items = ['Original', 'Nori', 'Mozarella', 'Dimsum Goreng', 'Party Pack'];

  return (
    <div className="brand-strip" aria-label="Pilihan menu DIMSAM KUY">
      <div className="brand-strip__track">
        {[false, true].map((duplicate) => (
          <div className="brand-strip__group" aria-hidden={duplicate || undefined} key={String(duplicate)}>
            {items.map((item) => (
              <span className="brand-strip__item" key={item}>
                <span>{item}</span>
                <Minus aria-hidden="true" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductCard({
  product,
  onOrder,
  decorative = false,
}: {
  product: Product;
  onOrder: (product: Product) => void;
  decorative?: boolean;
}) {
  const tag = product.tags.includes('best-seller')
    ? 'Favorit'
    : product.category === 'party'
      ? 'Rame-rame'
      : null;

  return (
    <article
      className={`product-card ${product.category === 'party' ? 'product-card--wide' : ''}`}
      aria-hidden={decorative || undefined}
    >
      <div className="product-card__visual">
        {tag && <span className="product-card__tag">{tag}</span>}
        <img src={product.image} alt={product.altText} loading="lazy" />
      </div>
      <div className="product-card__content">
        <div className="product-card__heading">
          <h3>{product.name}</h3>
          <strong>{formatPrice(product.price)}</strong>
        </div>
        <p>{product.description}</p>
        <button type="button" tabIndex={decorative ? -1 : 0} onClick={() => onOrder(product)}>
          Cara pesan <ArrowRight size={17} />
        </button>
      </div>
    </article>
  );
}

function MenuSection({ onOrder }: { onOrder: (product: Product) => void }) {
  const [category, setCategory] = useState('semua');
  const products = useMemo(
    () => PRODUCTS_DATA.filter((product) => category === 'semua' || product.category === category),
    [category],
  );
  const menuRows = useMemo(() => {
    const sources =
      products.length === 1
        ? [products, products]
        : [
            products.filter((_, index) => index % 2 === 0),
            products.filter((_, index) => index % 2 === 1),
          ];

    return sources.map((source) => {
      if (!source.length) return [];

      return Array.from({ length: Math.max(5, source.length) }, (_, index) => ({
        product: source[index % source.length],
        decorative: index >= source.length,
      }));
    });
  }, [products]);

  return (
    <section id="menu" className="section menu-section">
      <div className="container">
        <div className="section-heading section-heading--split" data-reveal="left">
          <div>
            <p className="eyebrow">Menu DIMSAM KUY</p>
            <h2>Mau yang mana dulu?</h2>
          </div>
          <p>
            Harga mengikuti poster menu resmi. Ketersediaan dapat berbeda di setiap outlet.
          </p>
        </div>

        <div
          className="category-tabs"
          role="group"
          aria-label="Filter kategori menu"
          data-reveal="up"
          data-reveal-delay="1"
        >
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              className={category === item.id ? 'is-active' : ''}
              aria-pressed={category === item.id}
              onClick={() => setCategory(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="menu-marquee" aria-label="Daftar menu bergerak" data-reveal="up">
          {menuRows.map((row, rowIndex) => (
            <div
              className="menu-marquee__viewport"
              key={`${category}-${rowIndex}`}
              aria-label={rowIndex === 0 ? 'Menu baris atas' : 'Menu baris bawah'}
            >
              <div
                className={`menu-marquee__track menu-marquee__track--${
                  rowIndex === 0 ? 'left' : 'right'
                }`}
              >
                {[false, true].map((clone) => (
                  <div
                    className="menu-marquee__group"
                    key={clone ? 'clone' : 'original'}
                    aria-hidden={clone || undefined}
                  >
                    {row.map(({ product, decorative }, index) => (
                      <ProductCard
                        key={`${product.id}-${index}`}
                        product={product}
                        onOrder={onOrder}
                        decorative={clone || decorative}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartyPack({ onOrder }: { onOrder: (product: Product) => void }) {
  const product = PRODUCTS_DATA.find((item) => item.id === 'family-pack-mix-party')!;

  return (
    <section
      id="party-pack"
      className="party-section"
      data-scroll-scene="party"
      style={{ '--party-progress': 0 } as React.CSSProperties}
    >
      <div className="party-section__sticky">
        <div className="container">
          <div className="party-panel">
            <div className="party-panel__visual" data-reveal="left">
              <span className="party-panel__number">16</span>
              <img
                src="/images/products/family-nori.webp"
                alt="Family Pack Party Nori DIMSAM KUY"
                loading="lazy"
                data-scroll-zoom
              />
            </div>
            <div className="party-panel__copy" data-reveal="right" data-reveal-delay="1">
              <div className="party-panel__copy-inner" data-scroll-copy>
                <p className="eyebrow eyebrow--red">Buat kumpul jadi lebih enak</p>
                <h2>Satu loyang, banyak yang kebagian.</h2>
                <p>
                  Family Pack tersedia dalam pilihan Party Nori dan Mix Party. Cocok buat
                  kumpul keluarga, rapat, arisan, atau acara kecil.
                </p>
                <div className="party-options">
                  <span>Party Nori <strong>Rp122K</strong></span>
                  <span>Mix Party <strong>Rp125K</strong></span>
                </div>
                <button className="button button--dark" type="button" onClick={() => onOrder(product)}>
                  Hubungi outlet
                  <MessageCircle size={19} />
                </button>
              </div>
            </div>
            <div className="party-scroll-progress" aria-hidden="true">
              <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OrderSteps() {
  const steps = [
    ['01', 'Pilih menu', 'Tentukan dimsum atau party pack yang kamu mau.'],
    ['02', 'Pilih outlet', 'Pilih lokasi DIMSAM KUY yang paling dekat.'],
    ['03', 'Pesan di luar website', 'Hubungi outlet atau buka aplikasi pesan-antar.'],
  ];

  return (
    <section className="section steps-section">
      <div className="container">
        <div className="section-heading section-heading--center" data-reveal="up">
          <p className="eyebrow">Jalur pemesanan</p>
          <h2>Pilih menu di sini, pesan lewat outlet.</h2>
        </div>
        <div className="steps-grid" data-reveal="stagger">
          {steps.map(([number, title, description]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OutletSection({
  selected,
  onSelect,
  onOrder,
}: {
  selected: Outlet;
  onSelect: (outlet: Outlet) => void;
  onOrder: () => void;
}) {
  return (
    <section id="outlet" className="section outlet-section">
      <div className="container">
        <div className="section-heading section-heading--split" data-reveal="left">
          <div>
            <p className="eyebrow eyebrow--yellow">Outlet Makassar</p>
            <h2>Pilih yang paling dekat.</h2>
          </div>
          <p>Geser kartu untuk melihat alamat dan kontak setiap outlet DIMSAM KUY.</p>
        </div>
        <div className="outlet-board" data-reveal="up" aria-label="Daftar outlet DIMSAM KUY">
          {OUTLETS_DATA.map((outlet) => {
            const active = selected.id === outlet.id;
            return (
              <article className={`outlet-card ${active ? 'is-active' : ''}`} key={outlet.id}>
                <div className="outlet-card__top">
                  <span className="outlet-card__pin"><MapPin size={20} /></span>
                  {active && <span className="outlet-card__active">Pilihanmu</span>}
                </div>
                <h3>{outlet.shortName}</h3>
                <p>{outlet.address}</p>
                <div className="outlet-card__meta">
                  <span><Clock3 size={15} /> 10.00–22.00 WITA</span>
                  <a href={`tel:${outlet.whatsappNumber}`}><Phone size={15} /> {outlet.phone}</a>
                </div>
                <div className="outlet-card__actions">
                  <button type="button" onClick={() => onSelect(outlet)}>
                    {active ? <><Check size={16} /> Dipilih</> : 'Pilih outlet'}
                  </button>
                  <a href={outlet.mapsUrl} target="_blank" rel="noreferrer">
                    Buka Maps <ArrowRight size={16} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
        <div className="outlet-order" data-reveal="up" data-reveal-delay="1">
          <div>
            <span>Outlet aktif</span>
            <strong>{selected.shortName}</strong>
          </div>
          <button className="button button--primary" type="button" onClick={onOrder}>
            Hubungi outlet <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      question: 'Bagaimana cara memesan?',
      answer: 'Website ini hanya menampilkan informasi menu dan promo. Untuk membeli, datang ke outlet, hubungi outlet melalui WhatsApp, atau gunakan aplikasi pesan-antar.',
    },
    {
      question: 'Apakah tersedia di aplikasi pesan-antar?',
      answer: 'Ya. DIMSAM KUY tersedia di GoFood, GrabFood, dan ShopeeFood. Cari nama outlet DIMSAM KUY terdekat di aplikasi pilihanmu.',
    },
    {
      question: 'Apakah bisa pesan untuk acara?',
      answer: 'Bisa. Pilih Family Pack lalu hubungi outlet melalui WhatsApp untuk menanyakan jumlah, ketersediaan, dan waktu pengambilan atau pengiriman.',
    },
    {
      question: 'Apakah semua menu tersedia di setiap outlet?',
      answer: 'Ketersediaan dapat berbeda. Konfirmasikan menu pilihanmu melalui WhatsApp sebelum datang atau melakukan pemesanan.',
    },
  ];
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section faq-section">
      <div className="container faq-layout">
        <div className="section-heading" data-reveal="left">
          <p className="eyebrow">Yang sering ditanyakan</p>
          <h2>Sebelum kamu pesan.</h2>
          <p>Masih ada pertanyaan? Admin outlet siap membantu lewat WhatsApp.</p>
        </div>
        <div className="faq-list" data-reveal="right" data-reveal-delay="1">
          {items.map((item, index) => {
            const expanded = open === index;
            return (
              <article key={item.question} className={expanded ? 'is-open' : ''}>
                <h3>
                  <button type="button" onClick={() => setOpen(expanded ? -1 : index)} aria-expanded={expanded}>
                    {item.question}
                    <ChevronDown size={20} />
                  </button>
                </h3>
                {expanded && <p>{item.answer}</p>}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ClosingCTA({ onOrder }: { onOrder: () => void }) {
  return (
    <section className="closing-cta checkerboard">
      <div className="container closing-cta__inner">
        <div data-reveal="left">
          <p className="eyebrow eyebrow--yellow">Sudah tahu mau pilih apa?</p>
          <h2>Pesan lewat outlet terdekat.</h2>
        </div>
        <button
          className="button button--light"
          type="button"
          onClick={onOrder}
          data-reveal="right"
          data-reveal-delay="1"
        >
          Lihat jalur pemesanan <ArrowRight size={19} />
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid" data-reveal="stagger">
        <div>
          <BrandMark />
          <p>Homemade dimsum halal di Makassar. Menu personal sampai party pack.</p>
        </div>
        <div>
          <strong>Jelajahi</strong>
          <a href="#menu">Menu</a>
          <a href="#party-pack">Party Pack</a>
          <a href="#outlet">Outlet</a>
        </div>
        <div>
          <strong>Ikuti kami</strong>
          <a href="https://www.instagram.com/dimsam_kuy/" target="_blank" rel="noreferrer">
            <Instagram size={17} /> @dimsam_kuy
          </a>
          <div className="delivery-platforms" aria-label="Tersedia di platform pesan-antar">
            <span className="delivery-platform">
              <img src="/brands/gofood.svg" alt="GoFood" loading="lazy" />
            </span>
            <span className="delivery-platform">
              <img src="/brands/grabfood.png" alt="GrabFood" loading="lazy" />
            </span>
            <span className="delivery-platform">
              <img src="/brands/shopeefood.png" alt="ShopeeFood" loading="lazy" />
            </span>
          </div>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} DIMSAM KUY</span>
        <span>Best dimsum in town.</span>
      </div>
    </footer>
  );
}

function OrderDialog({
  open,
  product,
  selectedOutlet,
  onSelectOutlet,
  onClose,
}: {
  open: boolean;
  product: Product | null;
  selectedOutlet: Outlet;
  onSelectOutlet: (outlet: Outlet) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', close);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', close);
    };
  }, [open, onClose]);

  if (!open) return null;

  const message = encodeURIComponent(
    `Halo DIMSAM KUY ${selectedOutlet.shortName}, saya ingin pesan ${product?.name ?? 'dimsum'}. Apakah masih tersedia?`,
  );
  const whatsappUrl = `https://wa.me/${selectedOutlet.whatsappNumber}?text=${message}`;

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="order-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="order-dialog__handle" aria-hidden="true" />
        <div className="order-dialog__header">
          <div>
            <p className="eyebrow">Pemesanan via outlet</p>
            <h2 id="order-dialog-title">{product?.name ?? 'Pilih outlet terdekat'}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Tutup dialog"><X size={21} /></button>
        </div>

        {product && (
          <div className="order-dialog__product">
            <img src={product.image} alt="" />
            <div><span>Menu pilihan</span><strong>{formatPrice(product.price)}</strong></div>
          </div>
        )}

        <fieldset className="outlet-options">
          <legend>Pilih outlet</legend>
          {OUTLETS_DATA.map((outlet) => (
            <label key={outlet.id} className={selectedOutlet.id === outlet.id ? 'is-selected' : ''}>
              <input
                type="radio"
                name="order-outlet"
                checked={selectedOutlet.id === outlet.id}
                onChange={() => onSelectOutlet(outlet)}
              />
              <span>
                <strong>{outlet.shortName}</strong>
                <small>{outlet.address}</small>
              </span>
              <Check size={17} />
            </label>
          ))}
        </fieldset>

        <a className="button button--whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
          <MessageCircle size={20} />
          Lanjut ke WhatsApp
        </a>
        <p className="order-dialog__note">
          Website ini tidak melayani checkout atau pembayaran. Kamu juga dapat
          memesan lewat GoFood, GrabFood, atau ShopeeFood dengan mencari outlet
          DIMSAM KUY terdekat.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  useScrollReveal();
  useScrollMotion();

  const [selectedOutlet, setSelectedOutlet] = useState<Outlet>(() => {
    const savedId = window.localStorage.getItem('dimsam_kuy_outlet_id');
    return OUTLETS_DATA.find((outlet) => outlet.id === savedId) ?? OUTLETS_DATA[0];
  });
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const selectOutlet = (outlet: Outlet) => {
    setSelectedOutlet(outlet);
    window.localStorage.setItem('dimsam_kuy_outlet_id', outlet.id);
  };

  const openOrder = (product: Product | null = null) => {
    setSelectedProduct(product);
    setIsOrderOpen(true);
  };

  return (
    <>
      <Header onOrder={() => openOrder()} />
      <main>
        <Hero onOrder={() => openOrder()} />
        <MarqueeStrip />
        <MenuSection onOrder={openOrder} />
        <PartyPack onOrder={openOrder} />
        <OrderSteps />
        <OutletSection
          selected={selectedOutlet}
          onSelect={selectOutlet}
          onOrder={() => openOrder()}
        />
        <FAQ />
        <ClosingCTA onOrder={() => openOrder()} />
      </main>
      <Footer />
      <button className="mobile-order" type="button" onClick={() => openOrder()}>
        <span>
          <small>Outlet pilihan</small>
          {selectedOutlet.shortName}
        </span>
        <span>Cara pesan <ArrowRight size={17} /></span>
      </button>
      <OrderDialog
        open={isOrderOpen}
        product={selectedProduct}
        selectedOutlet={selectedOutlet}
        onSelectOutlet={selectOutlet}
        onClose={() => setIsOrderOpen(false)}
      />
    </>
  );
}
