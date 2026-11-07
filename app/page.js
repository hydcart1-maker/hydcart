import Link from 'next/link';
import Icon, { I } from './Icon';
const feats = [['Quick Setup', I.bolt], ['Mobile Friendly', I.phone], ['QR Code Ready', I.qr], ['More Customers', I.bars]];
const cards = [
  ['Digital Menus', 'Create & share your restaurant menu online', I.fork, '#fde8d2', '/menus'],
  ['PDF to Word', 'Convert PDF files to editable Word documents', I.doc, '#e0eefb', '/tools'],
  ['Image to PDF', 'Convert images to PDF instantly', I.image, '#e0f5e4', '/tools'],
  ['Image Tools', 'Resize, compress & convert images', I.resize, '#ebe5fb', '/tools/photo-signature-resizer'],
  ['More Tools', 'Useful online tools for everyday needs', I.doc, '#fbe3ea', '/tools'],
];
const strip = [
  ['For Restaurants & Cafés', 'Show your menu, attract more customers', I.hand],
  ['For Local Businesses', 'List your business on HYDCART', I.store],
  ['Reach Hyderabad Customers', 'Get more visibility online', I.people],
  ['Simple & Affordable', 'Easy setup, no technical skills needed', I.check],
];
export default function Home() {
  return (
    <>
      <section className="hero"><div className="wrap">
        <div>
          <h1>Digital Menus &amp; Useful Tools for <span>Hyderabad Businesses</span></h1>
          <p>Create a beautiful Digital Menu for your Restaurant, Café or Food Business and reach more customers online.</p>
          <div className="row"><Link className="btn" href="/menus">Create Digital Menu</Link><Link className="btn ghost" href="/tools">Explore Tools</Link></div>
          <div className="feats">{feats.map(([t, d]) => <div key={t}><Icon d={d} />{t}</div>)}</div>
        </div>
        <div className="stage" aria-hidden="true">
          <div className="qr">Scan for Digital Menu<i /></div>
          <div className="phone"><h3>Nawab Restaurant</h3><p>Digital Menu</p>
            <div className="tiles">{['Biryani', 'Starters', 'Main Course', 'Chinese', 'Beverages', 'Desserts'].map(x => <div key={x}>{x}</div>)}</div>
          </div>
        </div>
      </div></section>
      <section className="wrap explore">
        <h2>Explore Our <span>Tools &amp; Services</span></h2>
        {cards.map(([t, s, d, bg, href]) => (
          <Link key={t} href={href} className="card" style={{ background: bg }}><Icon d={d} color="#d9480f" size={32} /><b>{t}</b><small>{s}</small></Link>
        ))}
      </section>
      <section className="strip"><div className="wrap">
        {strip.map(([t, s, d]) => <div key={t}><Icon d={d} size={30} /><span><b>{t}</b><small>{s}</small></span></div>)}
      </div></section>
    </>
  );
}
