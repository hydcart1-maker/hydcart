'use client';
import { useState } from 'react';

const toBlob = (c, type, q) => new Promise(r => c.toBlob(r, type, q));
const loadImg = f => new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = URL.createObjectURL(f); });

function base(img, rot) {
  const sw = rot % 180 ? img.naturalHeight : img.naturalWidth, sh = rot % 180 ? img.naturalWidth : img.naturalHeight;
  const c = document.createElement('canvas'); c.width = sw; c.height = sh;
  const x = c.getContext('2d'); x.translate(sw / 2, sh / 2); x.rotate(rot * Math.PI / 180);
  x.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
  return c;
}
function draw(src, W, H, mode) {
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, W, H);
  if (mode === 'crop') { const s = Math.max(W / src.width, H / src.height), dw = src.width * s, dh = src.height * s; x.drawImage(src, (W - dw) / 2, (H - dh) / 2, dw, dh); }
  else x.drawImage(src, 0, 0, W, H);
  return c;
}
async function fit(src, o) {
  const steps = o.shrink ? [1, .85, .72, .6, .5, .4, .3, .22, .15, .1] : [1];
  for (let i = 0; i < steps.length; i++) {
    const last = i === steps.length - 1;
    const c = draw(src, Math.max(1, Math.round(o.W * steps[i])), Math.max(1, Math.round(o.H * steps[i])), o.mode);
    const floor = last ? 0.05 : 0.4;
    let best = await toBlob(c, o.type, floor);
    if (best.size > o.limit) { if (last) return { blob: best, ok: false, w: c.width, h: c.height }; continue; }
    let lo = floor, hi = 0.95;
    for (let j = 0; j < 8; j++) {
      const m = (lo + hi) / 2, b = await toBlob(c, o.type, m);
      if (b.size <= o.limit) { best = b; lo = m; } else hi = m;
    }
    return { blob: best, ok: true, w: c.width, h: c.height };
  }
}

const SIZES = [10, 20, 30, 50, 100, 200];
const PX = [['200 × 230', 200, 230], ['140 × 60', 140, 60], ['413 × 531', 413, 531], ['600 × 600', 600, 600]];

export default function Resizer() {
  const [files, setFiles] = useState([]);
  const [kb, setKb] = useState(20);
  const [unit, setUnit] = useState('KB');
  const [fmt, setFmt] = useState('image/jpeg');
  const [w, setW] = useState('');
  const [h, setH] = useState('');
  const [mode, setMode] = useState('crop');
  const [shrink, setShrink] = useState(true);
  const [rot, setRot] = useState(0);
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState([]);

  async function run() {
    setBusy(true); setRes([]);
    const out = [];
    for (const f of files) {
      try {
        const src = base(await loadImg(f), rot);
        const fw = Number(w) || 0, fh = Number(h) || 0;
        let W = src.width, H = src.height;
        if (fw && fh) { W = fw; H = fh; }
        else if (fw) { W = fw; H = Math.round(fw * src.height / src.width); }
        else if (fh) { H = fh; W = Math.round(fh * src.width / src.height); }
        const r = await fit(src, { limit: Number(kb) * (unit === 'MB' ? 1024 : 1) * 1024, type: fmt, W, H, mode, shrink });
        const ext = fmt === 'image/webp' ? '.webp' : '.jpg';
        out.push({ ...r, name: f.name.replace(/\.[^.]+$/, '') + '-resized' + ext, orig: f.size, url: URL.createObjectURL(r.blob) });
      } catch { out.push({ name: f.name, bad: true }); }
    }
    setRes(out); setBusy(false);
  }

  const pick = v => { setKb(v); setUnit('KB'); };
  return (
    <div className="panel">
      <label>Choose your image (you can select several)
        <input type="file" accept="image/*" multiple onChange={e => { setFiles([...e.target.files]); setRes([]); }} />
      </label>
      {files.length > 0 && <p>{files.map(f => `${f.name} (${(f.size / 1024).toFixed(0)}KB)`).join(', ')}</p>}

      <h3>Target size (maximum)</h3>
      <div className="row" role="group" aria-label="Target size">
        {SIZES.map(v => <button key={v} className={unit === 'KB' && Number(kb) === v ? 'on' : ''} onClick={() => pick(v)}>{v}KB</button>)}
        <label>Other size<input type="number" min="1" value={kb} onChange={e => setKb(e.target.value)} /></label>
        <label>Unit<select value={unit} onChange={e => setUnit(e.target.value)}><option>KB</option><option>MB</option></select></label>
      </div>

      <h3>Dimensions in pixels (optional)</h3>
      <div className="row" role="group" aria-label="Quick sizes">
        {PX.map(([t, a, b]) => <button key={t} className={Number(w) === a && Number(h) === b ? 'on' : ''} onClick={() => { setW(a); setH(b); }}>{t}</button>)}
        <button onClick={() => { setW(''); setH(''); }}>Original size</button>
      </div>
      <div className="row">
        <label>Width<input type="number" min="1" value={w} onChange={e => setW(e.target.value)} /></label>
        <label>Height<input type="number" min="1" value={h} onChange={e => setH(e.target.value)} /></label>
        <label>When both are set<select value={mode} onChange={e => setMode(e.target.value)}><option value="crop">Crop to fit</option><option value="stretch">Stretch to fit</option></select></label>
      </div>
      <p style={{ margin: 0, color: 'var(--muted)', fontSize: '.9rem' }}>Fill only one side to keep the picture in proportion. Check your form for the pixel size it requires.</p>

      <h3>Other options</h3>
      <div className="row">
        <label>Save as<select value={fmt} onChange={e => setFmt(e.target.value)}><option value="image/jpeg">JPG (works on most forms)</option><option value="image/webp">WebP (smaller)</option></select></label>
        <label>Rotate<button onClick={() => setRot((rot + 90) % 360)}>Turn 90° (now {rot}°)</button></label>
      </div>
      <label className="chk"><input type="checkbox" checked={shrink} onChange={e => setShrink(e.target.checked)} /> Allow smaller dimensions if the size cannot be reached</label>
      <br />
      <button className="primary" disabled={!files.length || busy || !(Number(kb) > 0)} onClick={run}>{busy ? 'Working…' : 'Make smaller'}</button>

      {res.map((r, i) => (
        <div className="res" key={i}>
          {r.bad ? <p className="err" role="alert">{r.name}: this file could not be read. Choose a JPG, PNG or WebP image.</p> : <>
            <img src={r.url} alt={`Preview of ${r.name}`} />
            <div>
              <b>{r.name}</b>
              <p>{(r.orig / 1024).toFixed(0)}KB → <b>{(r.blob.size / 1024).toFixed(1)}KB</b>, {r.w}×{r.h}px</p>
              {!r.ok && <p className="err">Could not reach {kb}{unit}. Turn on “Allow smaller dimensions” or choose a larger size.</p>}
              <a className="btn" href={r.url} download={r.name}>Download</a>
            </div>
          </>}
        </div>
      ))}
    </div>
  );
}
