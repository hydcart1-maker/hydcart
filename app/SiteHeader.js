'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon, { I } from './Icon';
export default function SiteHeader() {
  const dash = usePathname().startsWith('/dashboard');
  return (
    <header className="top"><div className="wrap">
      <Link href="/" className="logo">
        <Icon d={I.cart} color="#ff6a13" size={42} />
        <span><b>HYD<i>CART</i><u>.com</u></b><small>Local Directory &amp; Digital Tools for Hyderabad</small></span>
      </Link>
      <nav className="nav" aria-label="Main">
        <Link href="/">Home</Link><Link href="/menus">Digital Menus</Link><Link href="/tools">Tools</Link>
        <Link href="/businesses">Businesses</Link><Link href="/pricing">Pricing</Link><Link href="/contact">Contact</Link>
        {dash ? <><button className="bell" aria-label="Notifications"><Icon d={I.bell} size={20} /></button><Link href="/dashboard" className="out">My Account</Link></>
          : <><Link href="/login" className="out">Log In</Link><Link href="/post-your-business" className="cta">Post Your Business</Link></>}
      </nav>
    </div></header>
  );
}
