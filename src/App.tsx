import { useEffect, useMemo, useRef, useState } from 'react';
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
              Pesan sekarang
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
        <div className="hero__content">
          <p className="eyebrow eyebrow--yellow">Homemade dimsum halal di Makassar</p>
          <h1>
            Dimsum lumer,
            <span>isiannya nggak pelit.</span>
          </h1>
          <p className="hero__lead">
            Pilih yang original, gurih nori, sampai family pack buat rame-rame.
            Menu jelas, harga jelas, tinggal pesan dari outlet terdekat.
          </p>
          <div className="hero__actions">
            <button className="button button--primary" type="button" onClick={onOrder}>
              <ShoppingBag size={19} />
              Pesan sekarang
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

        <div className="hero-product" aria-label="Family Pack Mix Party DIMSAM KUY">
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
  return (
    <div className="brand-strip" aria-label="Pilihan menu DIMSAM KUY">
      <div className="container brand-strip__inner">
        <span>Original</span><Minus aria-hidden="true" />
        <span>Nori</span><Minus aria-hidden="true" />
        <span>Mozarella</span><Minus aria-hidden="true" />
        <span>Dimsum Goreng</span><Minus aria-hidden="true" />
        <span>Party Pack</span>
      </div>
    </div>
  );
}

function ProductCard({
  product,
  onOrder,
}: {
  product: Product;
  onOrder: (product: Product) => void;
}) {
  const tag = product.tags.includes('best-seller')
    ? 'Favorit'
    : product.category === 'party'
      ? 'Rame-rame'
      : null;

  return (
    <article className={`product-card ${product.category === 'party' ? 'product-card--wide' : ''}`}>
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
        <button type="button" onClick={() => onOrder(product)}>
          Pilih menu <ArrowRight size={17} />
        </button>
      </div>
    </article>
  );
}

function MenuSection({ onOrder }: { onOrder: (product: Product) => void }) {
  const [category, setCategory] = useState('semua');
  const gridRef = useRef<HTMLDivElement>(null);
  const products = useMemo(
    () => PRODUCTS_DATA.filter((product) => category === 'semua' || product.category === category),
    [category],
  );

  useEffect(() => {
    gridRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  }, [category]);

  const scrollMenu = (direction: -1 | 1) => {
    const grid = gridRef.current;
    if (!grid) return;
    grid.scrollBy({
      left: direction * Math.max(260, grid.clientWidth * 0.82),
      behavior: 'smooth',
    });
  };

  return (
    <section id="menu" className="section menu-section">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">Menu DIMSAM KUY</p>
            <h2>Mau yang mana dulu?</h2>
          </div>
          <p>
            Harga mengikuti poster menu resmi. Ketersediaan dapat berbeda di setiap outlet.
          </p>
        </div>

        <div className="category-tabs" role="group" aria-label="Filter kategori menu">
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

        <div className="mobile-menu-guide">
          <span>Geser untuk lihat menu lainnya</span>
          <div aria-label="Navigasi menu">
            <button type="button" onClick={() => scrollMenu(-1)} aria-label="Menu sebelumnya">
              <ArrowRight size={18} />
            </button>
            <button type="button" onClick={() => scrollMenu(1)} aria-label="Menu berikutnya">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="product-grid" ref={gridRef}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onOrder={onOrder} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PartyPack({ onOrder }: { onOrder: (product: Product) => void }) {
  const product = PRODUCTS_DATA.find((item) => item.id === 'family-pack-mix-party')!;

  return (
    <section id="party-pack" className="section party-section">
      <div className="container">
        <div className="party-panel">
          <div className="party-panel__visual">
            <span className="party-panel__number">16</span>
            <img
              src="/images/products/family-nori.webp"
              alt="Family Pack Party Nori DIMSAM KUY"
              loading="lazy"
            />
          </div>
          <div className="party-panel__copy">
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
              Tanya pesanan acara
              <MessageCircle size={19} />
            </button>
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
    ['03', 'Lanjut WhatsApp', 'Pesan langsung dan konfirmasi ketersediaan.'],
  ];

  return (
    <section className="section steps-section">
      <div className="container">
        <div className="section-heading section-heading--center">
          <p className="eyebrow">Cara pesan</p>
          <h2>Tiga langkah, beres.</h2>
        </div>
        <div className="steps-grid">
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
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow eyebrow--yellow">Outlet Makassar</p>
            <h2>Pilih yang paling dekat.</h2>
          </div>
          <p>Alamat dan nomor berikut mengikuti materi menu resmi DIMSAM KUY.</p>
        </div>
        <div className="outlet-grid">
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
        <div className="outlet-order">
          <div>
            <span>Outlet aktif</span>
            <strong>{selected.shortName}</strong>
          </div>
          <button className="button button--primary" type="button" onClick={onOrder}>
            Pesan dari sini <ArrowRight size={18} />
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
      answer: 'Pilih menu, tentukan outlet terdekat, lalu lanjutkan ke WhatsApp. Admin outlet akan membantu mengonfirmasi menu dan ketersediaannya.',
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
        <div className="section-heading">
          <p className="eyebrow">Yang sering ditanyakan</p>
          <h2>Sebelum kamu pesan.</h2>
          <p>Masih ada pertanyaan? Admin outlet siap membantu lewat WhatsApp.</p>
        </div>
        <div className="faq-list">
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
        <div>
          <p className="eyebrow eyebrow--yellow">Sudah tahu mau pesan apa?</p>
          <h2>Kalau lapar, jangan cuma lihat-lihat.</h2>
        </div>
        <button className="button button--light" type="button" onClick={onOrder}>
          Pilih outlet & pesan <ArrowRight size={19} />
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
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
          <span>GoFood · GrabFood · ShopeeFood</span>
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
            <p className="eyebrow">Pesan DIMSAM KUY</p>
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
          Tersedia juga di GoFood, GrabFood, dan ShopeeFood. Cari outlet DIMSAM KUY terdekat di aplikasimu.
        </p>
      </div>
    </div>
  );
}

export default function App() {
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
          <small>Pesan dari</small>
          {selectedOutlet.shortName}
        </span>
        <span>Pesan sekarang <ArrowRight size={17} /></span>
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
