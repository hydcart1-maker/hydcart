import Link from 'next/link';
import { tools } from '../lib/tools';
export default function ToolList() {
  return (
    <ul className="list">
      {tools.map(t => (
        <li key={t.slug}>
          <div>
            {t.live ? <Link href={t.href || `/tools/${t.slug}`}>{t.name}</Link> : <strong style={{fontFamily:'var(--font-display)'}}>{t.name}</strong>}
            <span>{t.desc}</span>
          </div>
          <em className={`tag ${t.live ? 'on' : ''}`}>{t.live ? 'Ready to use' : 'Coming soon'}</em>
        </li>
      ))}
    </ul>
  );
}
