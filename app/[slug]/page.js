import Link from 'next/link';
const pages = { menus: 'Digital Menus', businesses: 'Businesses', pricing: 'Pricing', contact: 'Contact', login: 'Log In', 'post-your-business': 'Post Your Business' };
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(pages).map(slug => ({ slug })); }
export function generateMetadata({ params }) { return { title: pages[params.slug] }; }
export default function Page({ params }) {
  return (
    <div className="wrap" style={{ padding: '56px 20px' }}>
      <h1>{pages[params.slug]}</h1>
      <p>This page is coming soon.</p>
      <Link className="btn" href="/">Back to home</Link>
    </div>
  );
}
