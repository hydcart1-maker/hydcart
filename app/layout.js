import './globals.css';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { SITE } from '../lib/tools';
import Icon, { I } from './Icon';
const body = Poppins({ subsets: ['latin'], variable: '--font-body', weight: ['400', '600', '700', '800'] });
export const metadata = {
  metadataBase: new URL(SITE),
  title: { default: 'HydCart: digital menus and free tools for Hyderabad', template: '%s | HydCart' },
  description: 'Create a digital menu for your restaurant and use free tools for Hyderabad: photo resizer, plot converter, namaz timings and more.',
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={body.variable}>
      <body>
        <header className="top"><div className="wrap">
          <Link href="/" className="logo">
            <Icon d={I.cart} color="#ff6a13" size={42} />
            <span><b>HYD<i>CART</i><u>.com</u></b><small>Local Directory &amp; Digital Tools for Hyderabad</small></span>
          </Link>
          <nav className="nav" aria-label="Main">
            <Link href="/">Home</Link><Link href="/menus">Digital Menus</Link><Link href="/tools">Tools</Link>
            <Link href="/businesses">Businesses</Link><Link href="/pricing">Pricing</Link><Link href="/contact">Contact</Link>
            <Link href="/login" className="out">Log In</Link><Link href="/post-your-business" className="cta">Post Your Business</Link>
          </nav>
        </div></header>
        <main>{children}</main>
        <footer className="wrap">© {new Date().getFullYear()} HydCart.com. Free tools run in your browser.</footer>
      </body>
    </html>
  );
}
