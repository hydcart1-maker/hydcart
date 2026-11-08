'use client';
import { useState, useEffect } from 'react';
import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from 'adhan';
import { PDFDocument } from 'pdf-lib';
import { ORDER_URL } from '../../../lib/tools';

const N = v => Number(v) || 0;
const fmt = (n, d = 2) => n.toLocaleString('en-IN', { maximumFractionDigits: d });
const rs = n => '₹' + fmt(n);
const F = ({ label, v, set, w = 130 }) => (
  <label>{label}<input type="number" min="0" step="any" value={v} onChange={e => set(e.target.value)} style={{ width: w }} /></label>
);
const Note = ({ children }) => <p style={{ color: 'var(--muted)', fontSize: '.9rem' }}>{children}</p>;
const Row = ({ k, v, big }) => <li><div>{k}</div><b style={big ? { fontSize: '1.4rem' } : null}>{v}</b></li>;

/* Land */
const U = { 'Square yards (gaj)': 9, 'Square feet': 1, 'Square metres': 10.7639, 'Gunta': 1089, 'Acre': 43560, 'Cent': 435.6, 'Hectare': 107639 };
export function Land() {
  const [v, setV] = useState(1);
  const [u, setU] = useState('Square yards (gaj)');
  const ft = N(v) * U[u];
  return (
    <div className="panel">
      <div className="row">
        <F label="Value" v={v} set={setV} w={160} />
        <label>From<select value={u} onChange={e => setU(e.target.value)}>{Object.keys(U).map(k => <option key={k}>{k}</option>)}</select></label>
      </div>
      <ul className="list">{Object.keys(U).filter(k => k !== u).map(k => <Row key={k} k={k} v={fmt(ft / U[k], 4)} />)}</ul>
      <Note>1 gunta = 121 sq yd = 1,089 sq ft. 40 gunta = 1 acre = 4,840 sq yd.</Note>
    </div>
  );
}

/* Zakat */
export function Zakat() {
  const [s, setS] = useState({ cash: '', bank: '', gold: '', gp: '', silver: '', sp: '', inv: '', biz: '', rec: '', debt: '' });
  const [basis, setBasis] = useState('silver');
  const set = k => v => setS({ ...s, [k]: v });
  const assets = N(s.cash) + N(s.bank) + N(s.gold) * N(s.gp) + N(s.silver) * N(s.sp) + N(s.inv) + N(s.biz) + N(s.rec);
  const net = assets - N(s.debt);
  const nisab = basis === 'silver' ? 612.36 * N(s.sp) : 87.48 * N(s.gp);
  const due = nisab > 0 && net >= nisab;
  return (
    <div className="panel">
      <div className="row">
        <F label="Cash in hand (₹)" v={s.cash} set={set('cash')} /><F label="Money in bank (₹)" v={s.bank} set={set('bank')} />
        <F label="Investments & shares (₹)" v={s.inv} set={set('inv')} /><F label="Business stock (₹)" v={s.biz} set={set('biz')} />
        <F label="Money owed to you (₹)" v={s.rec} set={set('rec')} />
      </div>
      <div className="row">
        <F label="Gold (grams)" v={s.gold} set={set('gold')} /><F label="Gold price per gram (₹)" v={s.gp} set={set('gp')} />
        <F label="Silver (grams)" v={s.silver} set={set('silver')} /><F label="Silver price per gram (₹)" v={s.sp} set={set('sp')} />
      </div>
      <div className="row">
        <F label="Debts you owe (₹)" v={s.debt} set={set('debt')} />
        <label>Nisab based on<select value={basis} onChange={e => setBasis(e.target.value)}><option value="silver">Silver (612.36 g)</option><option value="gold">Gold (87.48 g)</option></select></label>
      </div>
      <ul className="list">
        <Row k="Net zakatable wealth" v={rs(net)} />
        <Row k="Nisab value" v={nisab > 0 ? rs(nisab) : 'Enter the price per gram'} />
        <Row k="Zakat due (2.5%)" v={due ? rs(net * 0.025) : '₹0'} big />
      </ul>
      <Note>Zakat is due when your wealth stays at or above the nisab for one lunar year. Enter today’s gold and silver prices. For your own case, ask a scholar.</Note>
    </div>
  );
}

/* Biryani */
export function Biryani() {
  const [g, setG] = useState(50);
  const [type, setType] = useState('Mutton');
  const [ap, setAp] = useState(1);
  const n = N(g) * ap, rice = n * 0.15, veg = type === 'Vegetable', base = veg ? n * 0.2 : n * 0.15;
  const rows = [
    ['Basmati rice (raw)', `${fmt(rice)} kg`], [veg ? 'Mixed vegetables' : `${type} (with bone)`, `${fmt(base)} kg`],
    ['Onions (for frying)', `${fmt(base * 0.5)} kg`], ['Curd', `${fmt(base * 0.4)} kg`],
    ['Oil + ghee', `${fmt(rice * 0.2)} litres`], ['Ginger-garlic paste', `${fmt(base * 80, 0)} g`],
    ['Green chillies', `${fmt(base * 50, 0)} g`], ['Mint & coriander', `${fmt(base * 100, 0)} g`],
    ['Biryani masala', `${fmt(base * 40, 0)} g`], ['Salt', `${fmt(rice * 20 + base * 15, 0)} g`],
  ];
  return (
    <div className="panel">
      <div className="row">
        <F label="Number of guests" v={g} set={setG} />
        <label>Biryani type<select value={type} onChange={e => setType(e.target.value)}><option>Mutton</option><option>Chicken</option><option>Vegetable</option></select></label>
        <label>Appetite<select value={ap} onChange={e => setAp(Number(e.target.value))}><option value={0.8}>Light</option><option value={1}>Normal</option><option value={1.25}>Heavy (full dawat)</option></select></label>
      </div>
      <ul className="list">{rows.map(([k, v]) => <Row key={k} k={k} v={v} />)}</ul>
      <Note>Approximate rule-of-thumb amounts. Adjust for your own recipe.</Note>
      {ORDER_URL && <a className="btn" href={ORDER_URL}>Order HydCart Biryani Masala</a>}
    </div>
  );
}

/* Electricity (TGERC retail tariff FY 2026-27, LT-I Domestic) */
const SLABS = u => u <= 100 ? [[50, 1.95], [50, 3.10]] : u <= 200 ? [[100, 3.40], [100, 4.80]] : [[200, 5.10], [100, 7.70], [100, 9.00], [400, 9.50], [Infinity, 10.00]];
export function Electricity() {
  const [u, setU] = useState(150);
  const [kw, setKw] = useState(1);
  const units = N(u);
  let left = units, from = 0;
  const rows = [];
  for (const [size, rate] of SLABS(units)) {
    const used = Math.min(left, size);
    if (used <= 0) break;
    rows.push([size === Infinity ? `${from + 1}+ units` : `${from + 1}–${from + size} units`, used, rate]);
    left -= used; from += size;
  }
  const energy = rows.reduce((a, [, x, r]) => a + x * r, 0);
  const fixed = N(kw) * (units > 800 ? 50 : 10);
  return (
    <div className="panel">
      <div className="row"><F label="Units used in the month" v={u} set={setU} /><F label="Sanctioned load (kW)" v={kw} set={setKw} /></div>
      <div className="scroll"><table className="t">
        <thead><tr><th>Slab</th><th>Units</th><th>Rate (₹/unit)</th><th>Amount</th></tr></thead>
        <tbody>{rows.map(([l, x, r]) => <tr key={l}><td>{l}</td><td>{fmt(x)}</td><td>{r.toFixed(2)}</td><td>{rs(x * r)}</td></tr>)}</tbody>
      </table></div>
      <ul className="list">
        <Row k="Energy charges" v={rs(energy)} /><Row k={`Fixed charges (₹${units > 800 ? 50 : 10}/kW/month)`} v={rs(fixed)} />
        <Row k="Estimated total" v={rs(energy + fixed)} big />
      </ul>
      <Note>Domestic (LT-I) tariff for 1 April 2026 to 31 March 2027. The total excludes electricity duty, customer charges, fuel surcharge adjustments, arrears and any subsidy (for example Gruha Jyothi, if you are eligible), so your actual bill can differ.</Note>
    </div>
  );
}

/* Metro (official fare zones, effective 24 May 2025) */
const ZONES = [[2, 11], [4, 17], [6, 28], [9, 37], [12, 47], [15, 51], [18, 56], [21, 61], [24, 65], [Infinity, 69]];
export function Metro() {
  const [d, setD] = useState(5);
  const km = N(d), z = ZONES.findIndex(([m]) => km <= m);
  return (
    <div className="panel">
      <div className="row"><F label="Distance between stations (km)" v={d} set={setD} w={170} /></div>
      <ul className="list"><Row k="Fare" v={km > 0 ? `₹${ZONES[z][1]}` : 'Enter a distance'} big /></ul>
      <div className="scroll"><table className="t">
        <thead><tr><th>Distance</th><th>Fare</th></tr></thead>
        <tbody>{ZONES.map(([m, f], i) => <tr key={i} style={i === z && km > 0 ? { fontWeight: 800 } : null}>
          <td>{m === Infinity ? 'More than 24 km' : `${i ? `More than ${ZONES[i - 1][0]}` : 'Up to'}${i ? ' up to ' : ' '}${m} km`}</td><td>₹{f}</td></tr>)}</tbody>
      </table></div>
      <Note>Fares from the L&T Metro Rail (Hyderabad) fare chart effective 24 May 2025. Check ltmetro.com for any later change.</Note>
    </div>
  );
}

/* Namaz */
const HYD = new Coordinates(17.385, 78.4867);
const METHODS = { Karachi: 'Karachi (common in India)', MuslimWorldLeague: 'Muslim World League', Egyptian: 'Egyptian', UmmAlQura: 'Umm al-Qura' };
const tm = d => d.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true });
export function Namaz() {
  const [date, setDate] = useState('');
  const [method, setMethod] = useState('Karachi');
  const [mad, setMad] = useState('Shafi');
  useEffect(() => {
    const t = new Date();
    setDate(`${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`);
  }, []);
  if (!date) return <div className="panel">Loading…</div>;
  const [y, m, d] = date.split('-').map(Number);
  const pt = i => { const p = CalculationMethod[method](); p.madhab = mad === 'Hanafi' ? Madhab.Hanafi : Madhab.Shafi; return new PrayerTimes(HYD, new Date(y, m - 1, d + i), p); };
  const t0 = pt(0);
  const list = [['Fajr (Sehri ends)', t0.fajr], ['Sunrise', t0.sunrise], ['Dhuhr', t0.dhuhr], ['Asr', t0.asr], ['Maghrib (Iftar)', t0.maghrib], ['Isha', t0.isha]];
  const days = Array.from({ length: 30 }, (_, i) => ({ d: new Date(y, m - 1, d + i), p: pt(i) }));
  return (
    <div className="panel">
      <div className="row">
        <label>Date<input type="date" value={date} onChange={e => e.target.value && setDate(e.target.value)} /></label>
        <label>Method<select value={method} onChange={e => setMethod(e.target.value)}>{Object.entries(METHODS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></label>
        <label>Asr<select value={mad} onChange={e => setMad(e.target.value)}><option value="Shafi">Shafi / Maliki / Hanbali</option><option value="Hanafi">Hanafi</option></select></label>
      </div>
      <ul className="list">{list.map(([k, v]) => <Row key={k} k={k} v={tm(v)} />)}</ul>
      <h3>Next 30 days</h3>
      <div className="scroll"><table className="t">
        <thead><tr><th>Date</th><th>Fajr / Sehri ends</th><th>Sunrise</th><th>Dhuhr</th><th>Asr</th><th>Maghrib / Iftar</th><th>Isha</th></tr></thead>
        <tbody>{days.map(({ d: dd, p }, i) => <tr key={i}><td>{dd.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</td>
          {[p.fajr, p.sunrise, p.dhuhr, p.asr, p.maghrib, p.isha].map((x, j) => <td key={j}>{tm(x)}</td>)}</tr>)}</tbody>
      </table></div>
      <Note>Times are calculated for Hyderabad and may differ by a few minutes from your local masjid timetable. Please follow your masjid.</Note>
    </div>
  );
}

/* Image to PDF */
export function ImagePdf() {
  const [files, setFiles] = useState([]);
  const [size, setSize] = useState('a4');
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState('');
  const [err, setErr] = useState('');
  const move = (i, k) => { const a = [...files], j = i + k; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; setFiles(a); setUrl(''); };
  async function build() {
    setBusy(true); setErr(''); setUrl('');
    try {
      const pdf = await PDFDocument.create();
      for (const f of files) {
        const bmp = await createImageBitmap(f);
        const c = document.createElement('canvas'); c.width = bmp.width; c.height = bmp.height;
        const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(bmp, 0, 0);
        const blob = await new Promise(r => c.toBlob(r, 'image/jpeg', 0.92));
        const img = await pdf.embedJpg(new Uint8Array(await blob.arrayBuffer()));
        if (size === 'fit') {
          const s = Math.min(1, 1400 / Math.max(img.width, img.height)), w = img.width * s, h = img.height * s;
          pdf.addPage([w, h]).drawImage(img, { x: 0, y: 0, width: w, height: h });
        } else {
          const [pw, ph] = img.width > img.height ? [842, 595] : [595, 842], mg = 24;
          const s = Math.min((pw - 2 * mg) / img.width, (ph - 2 * mg) / img.height), w = img.width * s, h = img.height * s;
          pdf.addPage([pw, ph]).drawImage(img, { x: (pw - w) / 2, y: (ph - h) / 2, width: w, height: h });
        }
      }
      setUrl(URL.createObjectURL(new Blob([await pdf.save()], { type: 'application/pdf' })));
    } catch { setErr('One of the files could not be read. Use JPG, PNG or WebP images.'); }
    setBusy(false);
  }
  return (
    <div className="panel">
      <label>Choose images (you can select several)
        <input type="file" accept="image/*" multiple onChange={e => { setFiles([...files, ...e.target.files]); setUrl(''); }} />
      </label>
      <ul className="list">{files.map((f, i) => (
        <li key={i}><div>{i + 1}. {f.name}</div>
          <span className="row" style={{ margin: 0 }}>
            <button onClick={() => move(i, -1)} aria-label="Move up">↑</button><button onClick={() => move(i, 1)} aria-label="Move down">↓</button>
            <button onClick={() => { setFiles(files.filter((_, k) => k !== i)); setUrl(''); }}>Remove</button>
          </span></li>))}</ul>
      <div className="row"><label>Page size<select value={size} onChange={e => { setSize(e.target.value); setUrl(''); }}><option value="a4">A4 page</option><option value="fit">Same size as each image</option></select></label></div>
      <button className="primary" disabled={!files.length || busy} onClick={build}>{busy ? 'Working…' : 'Create PDF'}</button>
      {err && <p className="err" role="alert">{err}</p>}
      {url && <p><a className="btn" href={url} download="images.pdf">Download PDF</a></p>}
    </div>
  );
}
