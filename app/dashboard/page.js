import Link from 'next/link';
import Icon, { I } from '../Icon';
export const metadata = { title: 'Business Dashboard', robots: { index: false, follow: false } };
const nav = [['Dashboard', I.grid, '/dashboard'], ['My Digital Menus', I.fork, '/menus'], ['My Tools Usage', I.resize, '/tools'], ['My Business Listings', I.store, '/businesses'], ['Favorites', I.heart, '/dashboard'], ['Reports & Insights', I.bars, '/dashboard'], ['Account Settings', I.gear, '/dashboard']];
const cards = [
  ['QR Menu Management', 'Create, manage & share your restaurant menu with QR codes', I.qr, '#fde8d2', '/menus'],
  ['PDF to Word', 'Convert PDF files to editable Word documents', I.doc, '#e0eefb', '/tools'],
  ['Image to PDF', 'Convert multiple images to a single PDF file', I.image, '#e0f5e4', '/tools'],
  ['Image Tools', 'Resize, compress, crop and convert images', I.resize, '#ebe5fb', '/tools/photo-signature-resizer'],
  ['Local Business Promotion', 'List and advertise your business in Hyderabad', I.mega, '#fde8d2', '/businesses'],
];
const stats = [['3', 'Digital Menus', I.qr, '#d9480f'], ['2,480', 'Total Views', I.eye, '#6d3fd1'], ['356', 'Menu Scans', I.people, '#0b8a4b'], ['1', 'Business Listing', I.store, '#1d6fd1']];
const quick = [['Create QR Menu', I.plus, '/menus'], ['Convert PDF to Word', I.upload, '/tools'], ['Image to PDF', I.image, '/tools'], ['Promote Business', I.mega, '/businesses']];
export default function Dashboard() {
  return (
    <div className="dash">
      <aside className="side">
        <div className="me"><i><Icon d={I.user} size={22} /></i><span><b>Business Dashboard</b><small>HYDCART.com</small></span></div>
        {nav.map(([t, d, h], i) => <Link key={t} href={h} className={i === 0 ? 'cur' : ''}><Icon d={d} size={18} />{t}</Link>)}
        <div className="promo">Promote Your Business in Hyderabad!<Link className="btn" href="/post-your-business">List Your Business</Link></div>
      </aside>
      <div>
        <section className="dhero">
          <div>
            <h1>Grow Your Business in Hyderabad with <span style={{ color: 'var(--gold)' }}>HYDCART.com</span></h1>
            <p style={{ color: '#e6eefa' }}>Create Digital Menus, use Online Tools, and Promote your Business to more customers in Hyderabad.</p>
            <div className="row"><Link className="btn" href="/menus">Create Digital Menu</Link><Link className="btn ghost" href="/businesses">Promote Your Business</Link></div>
          </div>
        </section>
        <section className="fcards">
          {cards.map(([t, s, d, bg, h]) => <Link key={t} href={h} className="card" style={{ background: bg }}><Icon d={d} color="#d9480f" size={30} /><b>{t}</b><small>{s}</small></Link>)}
        </section>
        <div className="dpanels">
          <section className="box">
            <h2>Your Business Overview <span>Last 30 Days</span></h2>
            <div className="stats">{stats.map(([n, l, d, c]) => <div key={l}><Icon d={d} color={c} size={22} /><b>{n}</b>{l}</div>)}</div>
            <p style={{ margin: '10px 0 0', fontSize: '.75rem', color: 'var(--muted)' }}>Sample numbers for preview.</p>
          </section>
          <section className="box">
            <h2>Quick Actions</h2>
            <div className="qa">{quick.map(([t, d, h]) => <Link key={t} href={h}><Icon d={d} color="#d9480f" size={22} /><br />{t}</Link>)}</div>
          </section>
        </div>
      </div>
    </div>
  );
}
