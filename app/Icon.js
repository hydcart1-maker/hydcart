export default function Icon({ d, color = 'currentColor', size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {d.split(' M').map((p, i) => <path key={i} d={(i ? 'M' : '') + p} />)}
    </svg>
  );
}
export const I = {
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7z',
  phone: 'M8 2h8a1 1 0 011 1v18a1 1 0 01-1 1H8a1 1 0 01-1-1V3a1 1 0 011-1z M11 18h2',
  qr: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h3v3h-3z M20 14v7h-4',
  bars: 'M4 20V10 M10 20V4 M16 20v-8 M22 20H2',
  store: 'M3 9l2-5h14l2 5 M4 9v11h16V9 M9 20v-6h6v6',
  people: 'M16 11a3 3 0 100-6 M8 11a3 3 0 100-6 M2 20c0-3 3-5 6-5s6 2 6 5 M16 15c3 0 6 2 6 5',
  check: 'M5 12l5 5 9-10',
  hand: 'M3 12l5-5 4 3 4-3 5 5-9 8z',
  fork: 'M6 3v8 M10 3v8 M6 7h4 M8 11v10 M17 3c-2 2-2 6 0 8v10',
  doc: 'M6 3h8l4 4v14H6z M14 3v4h4',
  image: 'M3 5h18v14H3z M3 16l5-5 4 4 3-3 6 5',
  resize: 'M4 20l7-7 M14 4h6v6 M10 20H4v-6 M20 4l-7 7',
  cart: 'M3 4h3l2 11h10l2-8H7',
};
