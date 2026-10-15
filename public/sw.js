// قعدة عالقمة — تخزين بسيط للملفات حتى تفتح بسرعة. الرسائل الحية دايماً من السيرفر.
const V='alqimma-v1';
const CORE=['./','index.html','style.css','app.js','questions.js','vendor/qrcode.js','manifest.webmanifest','icons/icon-192.png',
  'fonts/changa-arabic-800-normal.woff2','fonts/changa-arabic-700-normal.woff2','fonts/tajawal-arabic-400-normal.woff2','fonts/tajawal-arabic-500-normal.woff2','fonts/tajawal-arabic-700-normal.woff2','fonts/tajawal-arabic-800-normal.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin||u.pathname.startsWith('/api')||u.pathname.startsWith('/stats')||u.pathname.startsWith('/ws'))return;
  // الشبكة أولاً، والتخزين احتياط
  e.respondWith(fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(V).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))))});
