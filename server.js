// «قعدة عالقمة» — قعدة رواق · صار بدها قعدة
// السيرفر بيمرّر الرسائل بين موبايل الريس وموبايلات اللاعبين. حالة اللعبة كلها عند الريس.
'use strict';
const path = require('path');
const fs = require('fs');
const http = require('http');
const crypto = require('crypto');
const express = require('express');
const { WebSocketServer } = require('ws');

const PORT = process.env.PORT || 3000;
const STATS_KEY = process.env.STATS_KEY || '';
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const ROOM_TTL = 8 * 60 * 60 * 1000; // القعدة بتنمسح بعد 8 ساعات بلا حدا
const TAKE_AFTER = +(process.env.TAKE_AFTER_MS || 40000); // إذا غاب الريس هالقد، حدا تاني بيقدر يستلم
const CODE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '20kb' }));

// ===== الإحصائيات (أرقام فقط، بلا أسماء ولا صور) =====
const Stats = (() => {
  const empty = () => ({
    since: new Date().toISOString(), opened: 0, started: 0, finished: 0, demo: 0,
    players: 0, rounds: 0, tiebreaks: 0, passes: 0, correct: 0, wrong: 0,
    teams: {}, doms: {}, diff: {}, assign: {}, height: {}, timer: {},
    special: 0, weather: 0, hidden: 0, shared: 0, days: {}
  });
  let data = empty();
  let pg = null, dirty = false;
  const file = path.join(DATA_DIR, 'stats.json');
  async function load() {
    if (process.env.DATABASE_URL) {
      try {
        const { Pool } = require('pg');
        pg = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.PGSSL === 'off' ? false : { rejectUnauthorized: false } });
        await pg.query('CREATE TABLE IF NOT EXISTS alqimma_stats (id INT PRIMARY KEY, data JSONB NOT NULL)');
        const r = await pg.query('SELECT data FROM alqimma_stats WHERE id=1');
        if (r.rows[0]) data = Object.assign(empty(), r.rows[0].data);
        console.log('stats: postgres');
        return;
      } catch (e) { console.error('stats: postgres failed, using file', e.message); pg = null; }
    }
    try { data = Object.assign(empty(), JSON.parse(fs.readFileSync(file, 'utf8'))); } catch (_) {}
  }
  async function save() {
    if (!dirty) return; dirty = false;
    try {
      if (pg) await pg.query('INSERT INTO alqimma_stats (id,data) VALUES (1,$1) ON CONFLICT (id) DO UPDATE SET data=$1', [data]);
      else { fs.mkdirSync(DATA_DIR, { recursive: true }); fs.writeFileSync(file, JSON.stringify(data)); }
    } catch (e) { console.error('stats save', e.message); }
  }
  setInterval(save, 15000).unref();
  const inc = (o, k, n = 1) => { if (k === undefined || k === null) return; k = String(k).slice(0, 20); o[k] = (o[k] || 0) + n; };
  const num = (v, max = 1e4) => { v = Math.round(+v || 0); return v < 0 ? 0 : v > max ? max : v; };
  function day() { const d = new Date().toISOString().slice(0, 10); inc(data.days, d); const ks = Object.keys(data.days).sort(); while (ks.length > 60) delete data.days[ks.shift()]; }
  function record(ev, d) {
    d = d || {};
    if (ev === 'open') data.opened++;
    else if (ev === 'demo') data.demo++;
    else if (ev === 'start') {
      data.started++; day();
      data.players += num(d.players, 200);
      inc(data.teams, num(d.teams, 4)); inc(data.diff, ['e', 'm', 'h'].includes(d.diff) ? d.diff : 'm');
      inc(data.assign, d.assign === 'random' ? 'random' : 'pick'); inc(data.height, num(d.height, 50)); inc(data.timer, num(d.timer, 120));
      (Array.isArray(d.doms) ? d.doms : []).slice(0, 12).forEach(k => /^[a-z]{2,6}$/.test(k) && inc(data.doms, k));
      if (d.special) data.special++; if (d.weather) data.weather++; if (d.hidden) data.hidden++;
    } else if (ev === 'end') {
      data.finished++;
      data.rounds += num(d.rounds, 500); data.tiebreaks += num(d.tiebreaks, 50);
      data.correct += num(d.correct); data.wrong += num(d.wrong); data.passes += num(d.passes);
      if (d.shared) data.shared++;
    } else return;
    dirty = true;
  }
  return { load, record, get: () => data, save };
})();

app.post('/api/hit', (req, res) => { const ev = (req.body && req.body.ev) || ''; if (ev === 'open' || ev === 'demo') Stats.record(ev); res.json({ ok: true }); });

const DOMS = { rel: 'الأديان', chem: 'الكيمياء', geo: 'الجغرافيا', phy: 'الفيزياء', his: 'التاريخ', lit: 'الأدب', math: 'الرياضيات', sport: 'الرياضة', art: 'الفن', gen: 'المعلومات العامة', bio: 'الأحياء' };
const DIFF = { e: 'سهل', m: 'متوسط', h: 'صعب' };
app.get('/stats', (req, res) => {
  if (!STATS_KEY || req.query.key !== STATS_KEY) return res.status(404).send('Not found');
  const s = Stats.get();
  const avg = (a, b) => (b ? (a / b).toFixed(1) : '0');
  const rows = (o, map) => Object.entries(o).sort((a, b) => b[1] - a[1]).map(([k, v]) => `<tr><td>${(map && map[k]) || k}</td><td>${v}</td></tr>`).join('') || '<tr><td colspan="2">لا توجد بيانات بعد</td></tr>';
  const days = Object.entries(s.days).sort().slice(-14).map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('') || '<tr><td colspan="2">لا توجد بيانات بعد</td></tr>';
  const answered = s.correct + s.wrong;
  res.set('Cache-Control', 'no-store').send(`<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>إحصائيات «قعدة عالقمة»</title>
<style>body{font-family:Tajawal,system-ui,sans-serif;background:#E7EEF0;color:#15202B;margin:0;padding:20px}main{max-width:720px;margin:auto}h1{font-size:24px}h2{font-size:17px;margin:22px 0 8px}
.k{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}.k div{background:#fff;border:2px solid #15202B;border-radius:12px;padding:12px;box-shadow:3px 3px 0 #15202B}.k b{display:block;font-size:26px}
table{width:100%;border-collapse:collapse;background:#fff;border:2px solid #15202B;border-radius:12px;overflow:hidden}td{padding:8px 12px;border-top:1px solid #C9D4D9}td:last-child{text-align:left;font-variant-numeric:tabular-nums}p{color:#5E6B75;font-size:14px}</style></head><body><main>
<h1>إحصائيات «قعدة عالقمة»</h1><p>منذ ${s.since.slice(0, 10)} · أرقام إجمالية فقط، دون أسماء أو صور.</p>
<div class="k"><div>مرات فتح الصفحة<b>${s.opened}</b></div><div>قعدات بدأت<b>${s.started}</b></div><div>قعدات اكتملت<b>${s.finished}</b></div><div>تجارب فردية<b>${s.demo}</b></div>
<div>مجموع اللاعبين<b>${s.players}</b></div><div>متوسط اللاعبين في القعدة<b>${avg(s.players, s.started)}</b></div><div>متوسط الجولات<b>${avg(s.rounds, s.finished)}</b></div><div>جولات فاصلة<b>${s.tiebreaks}</b></div>
<div>نسبة الإجابات الصحيحة<b>${answered ? Math.round(s.correct / answered * 100) : 0}%</b></div><div>مرات التمرير<b>${s.passes}</b></div><div>قعدات بتخصص الأعضاء<b>${s.special}</b></div><div>قعدات بطقس الجبل<b>${s.weather}</b></div></div>
<h2>المجالات الأكثر اختيارًا</h2><table>${rows(s.doms, DOMS)}</table>
<h2>مستوى الصعوبة</h2><table>${rows(s.diff, DIFF)}</table>
<h2>عدد الفرق</h2><table>${rows(s.teams)}</table>
<h2>ارتفاع القمة (درجات)</h2><table>${rows(s.height)}</table>
<h2>مدة المؤقت (ثوانٍ)</h2><table>${rows(s.timer)}</table>
<h2>طريقة توزيع الفرق</h2><table>${rows(s.assign, { pick: 'اختيار حر', random: 'فرز عشوائي' })}</table>
<h2>القعدات حسب اليوم (آخر 14 يومًا)</h2><table>${days}</table>
</main></body></html>`);
});

// ===== الملفات =====
app.get(['/sw.js', '/manifest.webmanifest'], (req, res, next) => { res.set('Cache-Control', 'no-cache'); next(); });
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html'],
  setHeaders(res, p) { if (p.endsWith('.html')) res.set('Cache-Control', 'no-cache'); else if (/\/(fonts|vendor|icons)\//.test(p)) res.set('Cache-Control', 'public, max-age=604800'); }
}));
app.get('/healthz', (req, res) => res.json({ ok: true, rooms: rooms.size }));

// ===== القعدات =====
const rooms = new Map(); // code -> {code,key,host,clients:Map(pid->ws),seen}
function newCode() { let c; do { c = Array.from({ length: 5 }, () => CODE_CHARS[crypto.randomInt(CODE_CHARS.length)]).join(''); } while (rooms.has(c)); return c; }
function send(ws, obj) { if (ws && ws.readyState === 1) ws.send(JSON.stringify(obj)); }
function toPlayers(room, obj, except) { const s = JSON.stringify(obj); room.clients.forEach((ws, pid) => { if (pid !== except && ws.readyState === 1) ws.send(s); }); }

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws', maxPayload: 3 * 1024 * 1024 });

wss.on('connection', (ws) => {
  ws.alive = true; ws.on('pong', () => { ws.alive = true; });
  ws.on('message', (buf) => {
    let m; try { m = JSON.parse(buf); } catch (_) { return; }
    if (!m || typeof m.t !== 'string') return;
    const room = ws.room;
    switch (m.t) {
      case 'create': {
        const code = newCode(), key = crypto.randomBytes(16).toString('hex');
        const r = { code, key, host: ws, hostPid: String(m.pid || '').slice(0, 24), clients: new Map(), seen: Date.now(), snap: null, canTake: false, tk: null };
        rooms.set(code, r); ws.room = r; ws.role = 'host';
        send(ws, { t: 'created', code, key });
        break;
      }
      case 'host': { // الريس رجع (تحديث صفحة أو انقطاع أو إعادة تشغيل السيرفر)
        const code = String(m.code || '').toUpperCase().slice(0, 5), key = String(m.key || '');
        if (!/^[A-Z0-9]{5}$/.test(code) || key.length < 16) return send(ws, { t: 'err', e: 'bad' });
        let r = rooms.get(code);
        if (r && r.key !== key) return send(ws, { t: 'err', e: 'taken' });
        const pid = String(m.pid || '').slice(0, 24);
        if (!r) { r = { code, key, host: null, hostPid: pid, clients: new Map(), seen: Date.now(), snap: null, canTake: false, tk: null }; rooms.set(code, r); }
        if (r.host && r.host !== ws && r.host.readyState === 1 && r.hostPid && pid !== r.hostPid) { ws.room = null; return send(ws, { t: 'demoted', code }); }
        if (!r.host && r.hostPid && pid && pid !== r.hostPid) { ws.room = null; return send(ws, { t: 'demoted', code }); }
        if (r.host && r.host !== ws) { r.host.replaced = true; try { r.host.close(4001, 'replaced'); } catch (_) {} }
        clearTimeout(r.tk); r.canTake = false;
        r.host = ws; r.hostPid = pid || r.hostPid; r.seen = Date.now(); ws.room = r; ws.role = 'host'; ws.pid = pid;
        send(ws, { t: 'hosted', code, players: [...r.clients.keys()], snap: r.snap });
        toPlayers(r, { t: 'hoston' });
        break;
      }
      case 'join': {
        const code = String(m.code || '').toUpperCase().slice(0, 5), pid = String(m.pid || '').slice(0, 24);
        if (!/^[A-Za-z0-9_-]{6,24}$/.test(pid)) return send(ws, { t: 'err', e: 'bad' });
        const r = rooms.get(code);
        if (!r) return send(ws, { t: 'err', e: 'noroom' });
        const old = r.clients.get(pid); if (old && old !== ws) { old.replaced = true; try { old.close(4001, 'replaced'); } catch (_) {} }
        r.clients.set(pid, ws); r.seen = Date.now(); ws.room = r; ws.role = 'player'; ws.pid = pid;
        send(ws, { t: 'joined', code, host: !!(r.host && r.host.readyState === 1) });
        send(r.host, { t: 'p+', pid });
        if (r.canTake && !r.host) send(ws, { t: 'cantake' });
        break;
      }
      case 'up': { // لاعب ← الريس
        if (!room || ws.role !== 'player') return;
        room.seen = Date.now();
        if (room.host && room.host.readyState === 1) send(room.host, { t: 'up', pid: ws.pid, d: m.d });
        else send(ws, { t: 'hostoff' });
        break;
      }
      case 'down': { // الريس ← لاعب أو الكل
        if (!room || ws.role !== 'host' || room.host !== ws) return;
        room.seen = Date.now();
        if (m.to) send(room.clients.get(String(m.to)), { t: 'down', d: m.d });
        else toPlayers(room, { t: 'down', d: m.d });
        break;
      }
      case 'stat': { if (ws.role === 'host') Stats.record(m.ev, m.d); break; }
      case 'snap': { if (room && ws.role === 'host' && room.host === ws && m.s && typeof m.s === 'object') room.snap = m.s; break; }
      case 'take': { // لاعب بيستلم الريسة بعد غياب الريس
        if (!room || ws.role !== 'player' || room.host || !room.snap || !room.canTake) return;
        clearTimeout(room.tk); room.canTake = false;
        room.clients.delete(ws.pid); room.host = ws; room.hostPid = ws.pid; ws.role = 'host';
        send(ws, { t: 'took', code: room.code, key: room.key, snap: room.snap, players: [...room.clients.keys()] });
        toPlayers(room, { t: 'hoston' });
        break;
      }
      case 'ping': send(ws, { t: 'pong' }); break;
    }
  });
  ws.on('close', () => {
    const r = ws.room; if (!r) return;
    if (ws.role === 'host' && r.host === ws && !ws.replaced) { r.host = null; toPlayers(r, { t: 'hostoff' });
      clearTimeout(r.tk); r.tk = setTimeout(() => { if (!r.host && r.snap) { r.canTake = true; toPlayers(r, { t: 'cantake' }); } }, TAKE_AFTER); }
    if (ws.role === 'player' && r.clients.get(ws.pid) === ws) { r.clients.delete(ws.pid); if (!ws.replaced) send(r.host, { t: 'p-', pid: ws.pid }); }
    r.seen = Date.now();
  });
});

setInterval(() => {
  wss.clients.forEach(ws => { if (!ws.alive) return ws.terminate(); ws.alive = false; try { ws.ping(); } catch (_) {} });
  const now = Date.now();
  rooms.forEach((r, code) => { const empty = !r.host && r.clients.size === 0; if (empty && now - r.seen > 30 * 60 * 1000) rooms.delete(code); else if (now - r.seen > ROOM_TTL) rooms.delete(code); });
}, 25000).unref();

Stats.load().then(() => server.listen(PORT, () => console.log(`قعدة عالقمة شغّال على ${PORT}`)));
const bye = () => Stats.save().finally(() => process.exit(0));
process.on('SIGTERM', bye); process.on('SIGINT', bye);
