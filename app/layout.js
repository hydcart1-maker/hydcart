import './globals.css';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { SITE } from '../lib/tools';
import SiteHeader from './SiteHeader';
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
        <SiteHeader />
        <main>{children}</main>
        <footer className="wrap">© {new Date().getFullYear()} HydCart.com. Free tools run in your browser.</footer>
      </body>
    </html>
  );
}
