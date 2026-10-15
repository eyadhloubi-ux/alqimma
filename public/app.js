/* قعدة عالقمة — قعدة رواق · صار بدها قعدة · إعداد م. إياد حلوبي */
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const QS=new URLSearchParams(location.search);
const PREVIEW=!!window.MINFOQ_PREVIEW;
const DEMO=PREVIEW||QS.has('demo');
const FAST=QS.has('fast'),SP=FAST?0.12:1;
const now=()=>Date.now();
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rid=(n=10)=>Array.from(crypto.getRandomValues(new Uint8Array(n)),b=>'abcdefghijkmnpqrstuvwxyz23456789'[b%32]).join('');
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const pick=a=>a[Math.random()*a.length|0];
const G=(p,m,f)=>p&&p.g==='f'?f:m;
const store={get(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},del(k){try{localStorage.removeItem(k)}catch(e){}}};

/* ===== ثوابت ===== */
const SV=(p,sw=2)=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ICON={
 gen:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
 geo:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
 his:'<path d="M7 3h10M7 21h10M8 3c0 5 8 6 8 9s-8 4-8 9M16 3c0 5-8 6-8 9s8 4 8 9"/>',
 rel:'<path d="M3 5c3-1 6-1 9 1 3-2 6-2 9-1v14c-3-1-6-1-9 1-3-2-6-2-9-1z"/><path d="M12 6v14"/>',
 lit:'<path d="M20 4C12 4 6 10 6 18v2M6 18c6 0 12-4 14-14M9 15h5"/>',
 sport:'<circle cx="12" cy="12" r="9"/><path d="M12 7.5l4 2.9-1.5 4.6h-5L8 10.4z"/><path d="M12 3v4.5M20.6 9.5l-4.6.9M16.5 20.5l-2-5.5M7.5 20.5l2-5.5M3.4 9.5l4.6.9"/>',
 art:'<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2s-1-1.5-1-2.5 1-1.5 2-1.5h2a4 4 0 0 0 4-4c0-4.5-4-8-9-8z"/><circle cx="7.5" cy="11" r="1.1"/><circle cx="10" cy="7" r="1.1"/><circle cx="15" cy="7.5" r="1.1"/>',
 math:'<path d="M4 7h6M7 4v6M14 7h6M5 15l4 4M9 15l-4 4M14 17h6"/>',
 phy:'<circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="9.5" ry="3.6"/><ellipse cx="12" cy="12" rx="9.5" ry="3.6" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9.5" ry="3.6" transform="rotate(120 12 12)"/>',
 chem:'<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3M7 15h10"/>',
 bio:'<path d="M5 19C5 10 10 5 20 4c0 10-5 15-14 15zM5 19l8-8"/>',
 own:'<path d="M4 20l4-1 11-11-3-3L5 16zM14 6l3 3"/>',
 back:'<path d="M9 6l6 6-6 6"/>',moon:'<path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5z"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
 pen:'<path d="M4 20l4-1 11-11-3-3L5 16zM14 6l3 3"/>',
 flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
 pause:'<path d="M9 5v14M15 5v14"/>',play:'<path d="M7 5l12 7-12 7z"/>',
 skip:'<path d="M5 5l9 7-9 7zM18 5v14"/>',eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',stop:'<rect x="6" y="6" width="12" height="12" rx="2"/>',
 shuffle:'<path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>',dl:'<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
 users:'<circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-7 7-7s7 3 7 7M16 4a4 4 0 0 1 0 8M22 21c0-3-2-5.5-5-6.5"/>',
 mtn:'<path d="M3 20l6-11 4 6 3-4 5 9z"/><path d="M8 11l1.5 2L11 11"/>'
};
const DOMS=[['gen','عامة'],['geo','جغرافيا'],['his','تاريخ'],['rel','أديان'],['lit','أدب'],['sport','رياضة'],['art','فن'],['math','رياضيات'],['phy','فيزياء'],['chem','كيمياء'],['bio','أحياء']];
const DOMN=Object.fromEntries(DOMS.concat([['own','من الريس']]));
const DIFFN={e:'سهل',m:'متوسط',h:'صعب'};
const TCOL=['#FF7A3D','#3FA2E0','#22A971','#D9579A'];
const TNAME=['الغروب','الجليد','الصنوبر','التوت'];
const WX={
 wind:{n:'ريح طيبة',d:'الجواب الصح بيطلّع درجتين',c:'#9ED9F5',i:'<path d="M3 8h10a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7"/>'},
 storm:{n:'عاصفة ثلج',d:'الجواب الغلط بينزّل درجتين',c:'#B7C4D6',i:'<path d="M12 2v20M4 7l16 10M20 7L4 17M9 3l3 3 3-3M9 21l3-3 3 3"/>'},
 fog:{n:'ضباب',d:'وقت الجواب صار النص',c:'#D9E0E4',i:'<path d="M3 8h18M5 12h14M3 16h18M7 20h10M8 4h8"/>'},
 cable:{n:'تلفريك',d:'أول فريق بيجاوب صح بياخد درجة زيادة',c:'#F4BF2A',i:'<path d="M2 4l20 4M12 6v4"/><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M5 15h14M9 10v5M15 10v5"/>'}
};
const TITLES={
 flag:['رافع العلم','رافعة العلم'],guide:['دليل القمة','دليلة القمة'],storm:['قاهر العاصفة','قاهرة العاصفة'],
 cable:['راكب التلفريك','راكبة التلفريك'],steady:['قدم ثابتة','قدم ثابتة'],arrow:['سهم الدرب','سهم الدرب'],wise:['حكيم المنحدر','حكيمة المنحدر']
};
const TORDER=['flag','guide','storm','cable','steady','arrow','wise'];
const NONE=[['نفد بريشه','نفدت بريشها'],['مخبّي ألقابه للسهرة الجاية','مخبّية ألقابها للسهرة الجاية'],['القعدة ما كشفته لسّا','القعدة ما كشفتها لسّا'],['ما حدا قدر يمسك عليه شي','ما حدا قدر يمسك عليها شي']];
const GTYPES=['شلة','عيلة','رفقة شغل','صحاب جامعة','جيران'];
const BOTS=[['سامر','m'],['ريم','f'],['طارق','m'],['لين','f'],['مجد','m'],['نور','f'],['كنان','m']];
const LETTERS=['أ','ب','ج','د'];

/* ===== أدوات واجهة ===== */
const themeNow=()=>document.documentElement.dataset.theme||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');
function toggleTheme(){document.documentElement.dataset.theme=themeNow()==='dark'?'light':'dark';store.set('alqimma-theme',document.documentElement.dataset.theme);syncThemeColor()}
function syncThemeColor(){const m=$('meta[name=theme-color]');if(m)m.content=themeNow()==='dark'?'#0F161C':'#E4ECEF'}
(()=>{const t=store.get('alqimma-theme');if(t)document.documentElement.dataset.theme=t;syncThemeColor()})();
function toast(t,ms=2400){const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('on'),ms)}
let CUR='cover';
function show(id){if(CUR!==id){CUR=id;$$('.screen').forEach(s=>s.classList.toggle('on',s.id==='s-'+id));scrollTo(0,0)}}
function openSheet(id){$('#'+id).classList.add('on')}
function closeSheets(){$$('.sheet').forEach(s=>s.classList.remove('on'))}
$$('.sheet').forEach(s=>s.addEventListener('click',e=>{if(e.target===s||e.target.closest('[data-close]'))closeSheets()}));
$$('[data-theme-t]').forEach(b=>{b.innerHTML=SV(ICON.moon);b.onclick=toggleTheme});
$$('[data-back]').forEach(b=>{b.innerHTML=SV(ICON.back,2.6);b.onclick=()=>show(b.dataset.back)});
function segBuild(el,opts,val,cb){el.innerHTML=opts.map(([v,t])=>`<button data-v="${v}" class="${String(v)===String(val)?'on':''}">${t}</button>`).join('');el.onclick=e=>{const b=e.target.closest('button');if(!b)return;cb(b.dataset.v)}}

/* ===== الهوية ===== */
let ME=null;            // {id,name,g,photo}
let ROLE=null;          // 'host' | 'player'
let PUB=null;           // آخر حالة عامة
const PH={};            // الصور: id → dataURL
const LOCAL={ans:{},lastWx:0,partyK:null,story:{who:null,lay:'cover',th:null},cache:{}};

function avHTML(p,s=38,cls=''){if(!p)return '';const ph=PH[p.id];const tc=teamColor(p.team);return `<span class="av ${cls}" style="--s:${s}px;--pc:${tc||'#C3D0D6'}">${ph?`<img src="${ph}" alt="">`:esc((p.name||'؟').trim()[0]||'؟')}</span>`}
function teamColor(i){return i===null||i===undefined||i<0?null:TCOL[i]}
function teamName(T,i){return (T&&T[i]&&T[i].name)||('فريق '+TNAME[i])}
function membersOf(pub,i){return pub.P.filter(p=>p.team===i)}
function clgHTML(pub,i,s=54){const ms=membersOf(pub,i);const ph=ms.filter(p=>PH[p.id]).slice(0,4);const c=TCOL[i];
  if(!ph.length){const ini=ms.slice(0,4);if(!ini.length)return `<span class="clg c0" style="--s:${s}px;--tc:${c}">${SV(ICON.flag,2.4)}</span>`;
    return `<span class="clg c1" style="--s:${s}px;--tc:${c}"><span class="ini" style="font-size:${Math.round(s*(ini.length>2?.22:.3))}px">${ini.map(p=>esc((p.name||'؟')[0])).join(' ')}</span></span>`}
  return `<span class="clg c${ph.length}" style="--s:${s}px;--tc:${c}">${ph.map(p=>`<span><img src="${PH[p.id]}" alt=""></span>`).join('')}</span>`}

/* ===== الشبكة ===== */
const Net={ws:null,ok:false,role:null,code:null,key:null,pid:null,q:[],tries:0,closed:false,
  start(role,o){this.role=role;Object.assign(this,o||{});this.closed=false;this.connect()},
  url(){return (location.protocol==='https:'?'wss://':'ws://')+location.host+'/ws'},
  connect(){if(DEMO||this.closed)return;let ws;try{ws=new WebSocket(this.url())}catch(e){return this.retry()}this.ws=ws;
    ws.onopen=()=>{this.tries=0;if(this.role==='host'){if(this.code&&this.key)this.raw({t:'host',code:this.code,key:this.key,pid:ME.id});else this.raw({t:'create',pid:ME.id})}else this.raw({t:'join',code:this.code,pid:this.pid})};
    ws.onmessage=e=>{let m;try{m=JSON.parse(e.data)}catch(_){return}this.onmsg(m)};
    ws.onclose=()=>{this.ok=false;netbar(true);if(this.ws===ws)this.retry()};ws.onerror=()=>{}},
  retry(){if(this.closed)return;clearTimeout(this._r);this._r=setTimeout(()=>this.connect(),Math.min(5000,700+this.tries++*800))},
  raw(o){if(this.ws&&this.ws.readyState===1)this.ws.send(JSON.stringify(o))},
  stop(){this.closed=true;try{this.ws&&this.ws.close()}catch(e){}this.ws=null;this.ok=false},
  up(d){if(this.ok)this.raw({t:'up',d});else this.q.push(d)},
  down(to,d){if(this.ok)this.raw({t:'down',to,d})},
  stat(ev,d){this.raw({t:'stat',ev,d})},
  onmsg(m){switch(m.t){
    case 'created':this.code=m.code;this.key=m.key;this.ok=true;netbar(false);E.onHosted(m.code,m.key);break;
    case 'hosted':this.ok=true;netbar(false);if(m.snap&&E.S&&(m.snap.rev||0)>(E.S.rev||0))E.adopt(m.snap,true);E.onHosted(this.code,this.key,m.players);break;
    case 'cantake':if(this.role==='player')takeBar(true);break;
    case 'took':takeBar(false);this.role='host';this.code=m.code;this.key=m.key;ROLE='host';store.del('alqimma-player');E.adopt(m.snap);E.onHosted(m.code,m.key,m.players);toast(G(ME,'صرت الريس هلق','صرتي الريسة هلق'));break;
    case 'demoted':ROLE='player';store.del('alqimma-host');this.stop();toast('في حدا استلم الريسة، رجعت لاعب');setTimeout(()=>{Net.start('player',{code:this.code,pid:ME.id})},300);break;
    case 'p+':E.peer(m.pid,true);break;
    case 'p-':E.peer(m.pid,false);break;
    case 'up':E.act(m.pid,m.d);break;
    case 'joined':this.ok=true;netbar(false);if(!m.host)waitMsg('الريس مو متصل هلق','استنّوه شوي، أول ما يرجع بتكمل القعدة.');Client.sendHello();const q=this.q;this.q=[];q.forEach(d=>this.up(d));break;
    case 'down':Client.onDown(m.d);break;
    case 'hostoff':if(this.role==='player')netbar(true,'الريس انقطع… عم نستناه');break;
    case 'hoston':netbar(false);takeBar(false);break;
    case 'err':if(m.e==='noroom'){netbar(false);waitMsg('ما لقينا القعدة','يمكن الكود غلط، أو الريس لسّا عم يرجع. رح نضل نحاول.');this.ok=false;clearTimeout(this._n);this._n=setTimeout(()=>this.raw({t:'join',code:this.code,pid:this.pid}),4000)}
      else if(m.e==='taken'){this.code=null;this.key=null;this.raw({t:'create'})}break;
  }}
};
function netbar(on,t){const b=$('#netbar');clearTimeout(b._t);if(on){b._t=setTimeout(()=>{b.textContent=t||'عم نرجع نتصل…';b.classList.add('on')},1200)}else b.classList.remove('on')}

/* ===== المحرّك (عند الريس) ===== */
const E={S:null,
  fresh(){return {v:1,code:'',key:'',phase:'set',set:{teams:2,assign:'pick',doms:['gen','geo','his','sport'],diff:'m',timer:20,height:7,tie:'break',special:false,weather:true,hide:false},
    P:{},seq:0,T:[],R:null,H:[],used:[],custom:[],tieT:null,win:null,reached:false,group:{type:'',name:''},party:null,hideT:{},rn:0,lastWx:null,statStart:false,statEnd:false,final:null,mk:now()}},
  init(){this.S=this.fresh();this.mkTeams()},
  mkTeams(){const S=this.S,old=S.T||[];S.T=Array.from({length:S.set.teams},(_,i)=>old[i]||{name:'',by:null,score:0,rot:0});
    Object.values(S.P).forEach(p=>{if(p.team!==null&&p.team>=S.set.teams)p.team=null});S.T.forEach((t,i)=>{if(t.by&&(!S.P[t.by]||S.P[t.by].team!==i))t.by=this.firstOf(i)})},
  firstOf(i){const m=this.members(i);return m.length?m[0].id:null},
  members(i){return Object.values(this.S.P).filter(p=>p.team===i).sort((a,b)=>a.j-b.j)},
  onHosted(code,key,players){const S=this.S;S.code=code;S.key=key;const on=new Set(players||[]);
    Object.keys(S.P).forEach(id=>{if(id!==ME.id&&!S.P[id].bot)S.P[id].on=on.has(id)});(players||[]).forEach(pid=>this.sendAll(pid));this.changed()},
  peer(pid,on){const p=this.S.P[pid];if(on){this.sendAll(pid)}if(p){p.on=on;this.changed()}},
  sendAll(pid){Object.entries(PH).forEach(([id,src])=>{if(id!==pid)Net.down(pid,{a:'ph',id,src})});Net.down(pid,{a:'st',s:this.pub()})},
  save(){if(DEMO)return;store.set('alqimma-host',{S:this.S,me:ME,at:now()});try{localStorage.setItem('alqimma-ph',JSON.stringify(PH))}catch(e){}},
  _t:null,_sn:0,changed(){clearTimeout(this._t);this._t=setTimeout(()=>{this.S.rev=(this.S.rev||0)+1;const pub=this.pub();this.save();Net.down(null,{a:'st',s:pub});Client.apply(pub);this.snap()},25)},
  snap(){if(DEMO)return;clearTimeout(this._snT);const go=()=>{this._sn=now();Net.raw({t:'snap',s:this.S})};const w=1500-(now()-this._sn);if(w<=0)go();else this._snT=setTimeout(go,w)},
  adopt(snap,mine){const S=snap;this.S=S;Object.values(S.P).forEach(p=>p.host=p.id===ME.id);if(!S.P[ME.id]){S.P[ME.id]={id:ME.id,name:ME.name||'الريس',g:ME.g||'m',host:true,team:null,on:true,j:++S.seq}}
    if(S.R&&!S.R.done&&S.phase==='play'){S.R.paused=S.R.paused??S.R.dur;S.R.endsAt=null}this.save()},
  rename(pid,nm){const p=this.S.P[pid];nm=String(nm||'').trim().slice(0,16);if(!p||!nm)return;p.name=nm;this.changed()},

  /* --- اللاعبين --- */
  act(pid,d){const S=this.S;if(!d||typeof d!=='object')return;
    if(d.a==='hello'){const me=d.me||{};let p=S.P[pid];const nm=String(me.name||'').trim().slice(0,16);
      if(!p){p=S.P[pid]={id:pid,name:nm||this.autoName(me.g),g:me.g==='f'?'f':'m',host:pid===ME.id,team:null,dom:null,on:true,j:++S.seq,bot:!!d.bot};
        if(S.phase!=='set'&&S.phase!=='lobby')this.autoTeam(p)}
      else{if(nm)p.name=nm;if(me.g)p.g=me.g==='f'?'f':'m';p.on=true}
      if(typeof d.ph==='string'&&d.ph.startsWith('data:image/')&&d.ph.length<400000&&PH[pid]!==d.ph){PH[pid]=d.ph;Net.down(null,{a:'ph',id:pid,src:d.ph})}
      this.changed();return}
    const p=S.P[pid];if(!p)return;
    if(d.a==='team'){if(S.phase!=='lobby')return;const i=+d.i;if(!(i>=0&&i<S.set.teams))return;if(S.set.assign==='random'&&pid!==ME.id&&!p.host)return;this.setTeam(p,i);this.changed()}
    else if(d.a==='tname'){const i=+d.i;const t=S.T[i];if(!t)return;if(t.by!==pid&&pid!==ME.id)return;t.name=String(d.name||'').trim().slice(0,18);this.changed()}
    else if(d.a==='slot'){if(S.phase!=='lobby'||!S.set.special)return;const who=d.pid&&pid===ME.id?S.P[d.pid]:p;if(!who||who.team===null)return;if(!S.set.doms.includes(d.k))return;
      const r=this.claim(who.id,d.k,d.force&&pid===ME.id);if(r)this.tell(pid,r);this.changed()}
    else if(d.a==='autoslot'){if(pid!==ME.id)return;this.autoSlots();this.changed()}
    else if(d.a==='ans')this.answer(pid,d)},
  tell(pid,t){if(pid===ME.id)toast(t);else Net.down(pid,{a:'msg',t})},
  slots(i){const S=this.S,t=S.T[i];if(!t)return {};t.slots=t.slots||{};const ids=new Set(this.members(i).map(m=>m.id));
    Object.keys(t.slots).forEach(k=>{if(!S.set.doms.includes(k))delete t.slots[k]});S.set.doms.forEach(k=>{t.slots[k]=(t.slots[k]||[]).filter(x=>ids.has(x))});return t.slots},
  held(i,pid){const sl=this.slots(i);return Object.keys(sl).filter(k=>sl[k].includes(pid))},
  release(pid,i){if(i===null||i===undefined||!this.S.T[i])return;const sl=this.slots(i);Object.keys(sl).forEach(k=>sl[k]=sl[k].filter(x=>x!==pid))},
  claim(pid,k,force){const S=this.S,p=S.P[pid],i=p.team,sl=this.slots(i),n=this.members(i).length,d=S.set.doms.length,mine=this.held(i,pid);
    if(sl[k].includes(pid)){sl[k]=sl[k].filter(x=>x!==pid);return ''}
    if(force){if(n>=d)this.release(pid,i);sl[k].push(pid);return ''}
    if(sl[k].length&&n<=d)return 'هالاختصاص محجوز بفريقكم';
    if(sl[k].length&&S.set.doms.some(x=>!sl[x].length))return 'في اختصاصات لسّا فاضية، احجزوها أول';
    if(mine.length&&n>=d)this.release(pid,i);
    sl[k].push(pid);return ''},
  autoSlots(only){const S=this.S;S.T.forEach((t,i)=>{if(only!==undefined&&only!==i)return;const ms=this.members(i);if(!ms.length)return;const sl=this.slots(i);
      const cnt=m=>this.held(i,m.id).length;
      S.set.doms.filter(k=>!sl[k].length).forEach(k=>{const free=ms.filter(m=>!cnt(m));const c=(free.length?free:ms).slice().sort((a,b)=>cnt(a)-cnt(b)||Math.random()-.5)[0];sl[k].push(c.id)});
      ms.filter(m=>!cnt(m)).forEach(m=>{const k=S.set.doms.slice().sort((a,b)=>sl[a].length-sl[b].length||Math.random()-.5)[0];sl[k].push(m.id)})})},
  slotErr(){const S=this.S;const bad=[];S.T.forEach((t,i)=>{const ms=this.members(i);if(!ms.length)return;const sl=this.slots(i);
      const miss=S.set.doms.filter(k=>!sl[k].length),idle=ms.filter(m=>!this.held(i,m.id).length);
      if(miss.length||idle.length)bad.push(teamName(S.T,i)+': '+[miss.length?'ناقص '+miss.map(k=>DOMN[k]).join('، '):'',idle.length?idle.map(m=>m.name).join('، ')+' بلا اختصاص':''].filter(Boolean).join(' · '))});return bad},
  autoName(g){const n=Object.keys(this.S.P).length+1;return (g==='f'?'متسلّقة ':'متسلّق ')+n},
  setTeam(p,i){const S=this.S,old=p.team;if(old!==i)this.release(p.id,old);p.team=i;if(old!==null&&old!==undefined&&S.T[old]&&S.T[old].by===p.id)S.T[old].by=this.firstOf(old);if(!S.T[i].by)S.T[i].by=p.id;
  },
  autoTeam(p){const S=this.S;let best=0,bn=1e9;S.T.forEach((t,i)=>{if(S.tieT&&!S.tieT.includes(i))return;const n=this.members(i).length;if(n<bn){bn=n;best=i}});this.setTeam(p,best);if(S.set.special&&S.phase!=='lobby'&&S.phase!=='set')this.autoSlots(best)},
  shuffleTeams(){const S=this.S,ps=shuffle(Object.values(S.P));S.T.forEach(t=>t.by=null);ps.forEach((p,k)=>{p.team=null});ps.forEach((p,k)=>this.setTeam(p,k%S.set.teams));this.changed()},
  fillLoose(){Object.values(this.S.P).filter(p=>p.team===null).sort((a,b)=>a.j-b.j).forEach(p=>this.autoTeam(p))},
  cycleTeam(pid){const S=this.S,p=S.P[pid];if(!p||S.phase!=='lobby')return;this.setTeam(p,p.team===null?0:(p.team+1)%S.set.teams);this.changed()},
  kick(pid){const S=this.S,p=S.P[pid];if(!p||p.host)return;const t=p.team;this.release(pid,t);delete S.P[pid];if(t!==null&&S.T[t]&&S.T[t].by===pid)S.T[t].by=this.firstOf(t);Net.down(pid,{a:'kick'});this.changed()},

  /* --- الإعدادات --- */
  setSet(k,v){const s=this.S.set;s[k]=v;if(k==='teams')this.mkTeams();if(k==='doms'){if(s.doms.length<2)s.special=false;this.S.T.forEach((_,i)=>this.slots(i))}this.changed()},
  addCustom(c){this.S.custom.push({q:c.q,a:c.a,w:c.w,used:false});this.changed()},
  delCustom(i){this.S.custom.splice(i,1);this.changed()},
  openLobby(){this.S.phase='lobby';this.mkTeams();this.changed()},

  /* --- اللعب --- */
  canStart(){const S=this.S;const ps=Object.values(S.P);if(ps.length<2)return 'لازم يكون في لاعبين اتنين على الأقل';
    if(ps.length<S.set.teams)return 'عدد اللاعبين أقل من عدد الفرق';
    if(ps.some(p=>p.team===null)&&S.set.assign==='pick'&&S.set.special)return 'في حدا لسّا بالمخيم بلا فريق';
    if(S.set.special){const b=this.slotErr();if(b.length)return 'لازم كل فريق يحجز كل الاختصاصات. '+b.join(' | ')}return ''},
  start(){const S=this.S;const err=this.canStart();if(err){toast(err);return}
    this.fillLoose();
    for(let i=0;i<S.set.teams;i++)if(!this.members(i).length){const big=[...Array(S.set.teams).keys()].sort((a,b)=>this.members(b).length-this.members(a).length)[0];const mv=this.members(big).slice(-1)[0];if(mv){this.setTeam(mv,i);toast(mv.name+' انتقل لـ'+(S.T[i].name||'فريق '+TNAME[i])+' لأنه كان فاضي')}}
    if(S.set.special)this.autoSlots();S.bag=[];
    S.T.forEach(t=>{t.score=0;t.rot=0});S.H=[];S.win=null;S.tieT=null;S.reached=false;S.final=null;S.party=null;S.hideT={};S.lastWx=null;S.statEnd=false;
    if(!S.statStart){S.statStart=true;Net.stat('start',{players:Object.keys(S.P).length,teams:S.set.teams,doms:S.set.doms,diff:S.set.diff,assign:S.set.assign,height:S.set.height,timer:S.set.timer,special:S.set.special,weather:S.set.weather,hidden:S.set.hide})}
    this.newRound()},
  nextAnswerer(i,force){const S=this.S,ms=this.members(i);if(!ms.length)return null;if(force&&ms.some(m=>m.id===force))return force;
    const t=S.T[i];for(let k=0;k<ms.length;k++){const m=ms[(t.rot+k)%ms.length];if(m.on||m.bot){t._off=k;return m.id}}t._off=0;return ms[t.rot%ms.length].id},
  pickQ(dom,avoid){const S=this.S,lv=S.set.diff,ord={e:['e','m','h'],m:['m','e','h'],h:['h','m','e']}[lv];
    const tryDom=d=>{for(const l of ord){const a=(window.QBANK[d]||{})[l]||[];const free=a.map((_,i)=>i).filter(i=>!S.used.includes(d+'.'+l+'.'+i)&&!(avoid||[]).includes(d+'.'+l+'.'+i));if(free.length){const i=pick(free);return this.mkQ(d+'.'+l+'.'+i,d,a[i])}}return null};
    return tryDom(dom)||S.set.doms.map(tryDom).find(Boolean)||DOMS.map(d=>tryDom(d[0])).find(Boolean)||null},
  hasFree(d){const S=this.S;return ['e','m','h'].some(l=>((window.QBANK[d]||{})[l]||[]).some((_,i)=>!S.used.includes(d+'.'+l+'.'+i)))},
  turns(pid){let n=0;this.S.H.forEach(h=>h.rows.forEach(r=>{if(r.pid===pid)n++}));return n},
  specPick(i,d){const S=this.S,ms=this.members(i);const live=a=>{const on=a.filter(m=>m.on||m.bot);return on.length?on:a};
    const low=a=>{a=live(a);const mn=Math.min(...a.map(m=>this.turns(m.id)));return pick(a.filter(m=>this.turns(m.id)===mn))};
    const sl=this.slots(i),h=(sl[d]||[]).map(id=>S.P[id]).filter(Boolean);
    if(h.length){const m=low(h);return {pid:m.id,why:h.length>1?'share':this.held(i,m.id).length>1?'dbl':'spec'}}
    return {pid:low(ms).id,why:'any'}},
  specDom(){const S=this.S;S.bag=(S.bag||[]).filter(d=>S.set.doms.includes(d)&&this.hasFree(d));
    if(!S.bag.length)S.bag=shuffle(S.set.doms.filter(d=>this.hasFree(d)));return S.bag.shift()||null},
  mkQ(id,d,row){const opts=shuffle([0,1,2,3]);return {id,d,text:row[0],opts:opts.map(k=>row[1+k]),ok:opts.indexOf(0)}},
  newRound(force){const S=this.S;const tb=S.tieT;const teams=(tb||S.T.map((_,i)=>i)).filter(i=>this.members(i).length);
    if(!teams.length){this.endGame();return}
    let wx=null;if(!tb&&S.set.weather&&S.H.length>=1&&!S.lastWx&&Math.random()<0.38)wx=pick(teams.length>1?['wind','storm','fog','cable']:['wind','storm','fog']);
    S.lastWx=wx;const dur=Math.round(S.set.timer*1000*(wx==='fog'?0.5:1));
    const ask={};const cust=S.custom.find(c=>!c.used);let shared=null;
    if(cust){cust.used=true;const opts=shuffle([0,1,2,3]);const all=[cust.a,...cust.w];shared={id:'own.'+S.custom.indexOf(cust),d:'own',text:cust.q,opts:opts.map(k=>all[k]),ok:opts.indexOf(0)}}
    else{const d=(S.set.special&&force&&force.dom&&this.hasFree(force.dom))?force.dom:this.specDom();shared=d?this.pickQ(d):null}
    if(!shared){this.endGame('bank');return}
    if(!shared.id.startsWith('own')&&!S.used.includes(shared.id))S.used.push(shared.id);
    for(const i of teams){let pid,why=null;
      if(force&&force[i]&&this.members(i).some(m=>m.id===force[i])){pid=force[i];why=force.why&&force.why[i]||null}
      else if(S.set.special){const r=this.specPick(i,shared.d);pid=r.pid;why=r.why}
      else pid=this.nextAnswerer(i);
      ask[i]={pid,q:shared,why}}
    const intro=(wx?2800:1400)*SP;S.R={id:++S.rn,n:S.H.length+1,tb:!!tb,teams,ask,ans:{},wx,dur:Math.round(dur*(FAST?0.25:1)),intro,endsAt:now()+intro+Math.round(dur*(FAST?0.25:1)),paused:null,done:false,res:null};
    S.phase='play';this.changed();Bots.round()},
  answer(pid,d){const S=this.S,R=S.R;if(S.phase!=='play'||!R||R.done||d.r!==R.id||R.paused!==null)return;
    const ti=R.teams.find(i=>R.ask[i].pid===pid);if(ti===undefined||R.ans[ti])return;
    const c=d.c==='pass'?-1:+d.c;if(!(c===-1||(c>=0&&c<4)))return;const start=R.endsAt-R.dur;if(now()<start-200)return;
    R.ans[ti]={c,t:Math.max(0,now()-start)};this.changed();
    if(R.teams.every(i=>R.ans[i])){clearTimeout(this._fin);this._fin=setTimeout(()=>this.finish(),650*SP)}},
  tick(){const S=this.S;if(!S||S.phase!=='play'||!S.R||S.R.done||S.R.paused!==null)return;if(now()>=S.R.endsAt)this.finish()},
  pause(){const R=this.S.R;if(!R||R.done||R.paused!==null)return;R.paused=Math.max(0,R.endsAt-now());R.endsAt=null;this.changed()},
  resume(){const R=this.S.R;if(!R||R.paused===null)return;R.endsAt=now()+R.paused;R.paused=null;this.changed()},
  finish(){const S=this.S,R=S.R;if(!R||R.done)return;clearTimeout(this._fin);R.done=true;
    R.snap={scores:S.T.map(t=>t.score),rots:S.T.map(t=>t.rot),win:S.win,tieT:S.tieT,reached:S.reached,lastWx:S.lastWx};
    const rows=R.teams.map(ti=>{const a=R.ans[ti]||{c:-2,t:R.dur};const q=R.ask[ti].q;const right=a.c>=0?a.c===q.ok:null;
      let delta=right===true?1:right===false?-1:0;if(R.wx==='wind'&&right)delta=2;if(R.wx==='storm'&&right===false)delta=-2;
      return {ti,pid:R.ask[ti].pid,qid:q.id,d:q.d,text:q.text,opts:q.opts,ok:q.ok,c:a.c,t:a.t,right,delta,bonus:null}});
    if(R.wx==='cable'){const rs=rows.filter(r=>r.right).sort((a,b)=>a.t-b.t);if(rs.length){rs[0].delta+=1;rs[0].bonus='cable'}}
    let won=null;
    if(R.tb){rows.forEach(r=>r.delta=0);const rs=rows.filter(r=>r.right).sort((a,b)=>a.t-b.t);if(rs.length){won=[rs[0].ti];rs[0].won=true}}
    else rows.forEach(r=>S.T[r.ti].score+=r.delta);
    if(!S.set.special)R.teams.forEach(i=>{const t=S.T[i];t.rot+=1+(t._off||0)});
    R.res=rows;S.H.push({id:R.id,n:R.n,tb:R.tb,wx:R.wx,rows,after:S.T.map(t=>t.score)});
    if(R.tb){if(won){S.win=won;S.tieT=null}}
    else{const reached=S.T.map((t,i)=>i).filter(i=>S.T[i].score>=S.set.height);
      if(reached.length===1)S.win=reached;else if(reached.length>1){if(S.set.tie==='share')S.win=reached;else S.tieT=reached}}
    if(S.win){S.reached=true;S.win.forEach(i=>{const r=[...rows].reverse().find(x=>x.ti===i&&x.right);if(r)r.flag=true})}
    S.phase='round';this.changed()},
  skip(){const S=this.S,R=S.R;if(!R)return;const force={dom:R.ask[R.teams[0]].q.d,why:{}};R.teams.forEach(i=>{force[i]=R.ask[i].pid;force.why[i]=R.ask[i].why});clearTimeout(this._fin);Bots.clear();
    if(R.done&&R.snap){const s=R.snap;S.T.forEach((t,i)=>{t.score=s.scores[i];t.rot=s.rots[i]});S.win=s.win;S.tieT=s.tieT;S.reached=s.reached;S.H.pop()}
    S.lastWx=R.snap?R.snap.lastWx:null;if(S.lastWx===R.wx)S.lastWx=null;S.R=null;toast('انمسحت الجولة كأنها ما صارت');this.newRound(force)},
  reveal(){if(this.S.R&&!this.S.R.done)this.finish()},
  next(){const S=this.S;if(S.win)return this.toWrap();this.newRound()},
  endGame(why){const S=this.S;Bots.clear();if(S.R&&!S.R.done)S.R=null;if(!S.win){const mx=Math.max(...S.T.map(t=>t.score));S.win=S.T.map((t,i)=>i).filter(i=>S.T[i].score===mx&&this.members(i).length)}
    if(why==='bank')toast('خلصت الأسئلة المحضّرة لهالإعدادات');this.toWrap()},
  toWrap(){this.S.phase='wrap';this.S.final=this.compute();this.changed()},
  setGroup(k,v){this.S.group[k]=v;this.changed()},
  setGroupPhoto(src){if(src){PH._group=src;Net.down(null,{a:'ph',id:'_group',src})}else{delete PH._group;Net.down(null,{a:'ph',id:'_group',src:null})}this.save();this.changed()},
  partyStart(){const S=this.S;S.final=this.compute();S.phase='party';S.party={k:0,at:now()};this.changed()},
  partyNext(){const S=this.S;const n=S.final.rank.length;if(S.party.k>=n)return this.showRes();S.party={k:S.party.k+1,at:now()};this.changed()},
  showRes(){const S=this.S;S.final=this.compute();S.phase='res';S.party=null;
    if(!S.statEnd){S.statEnd=true;let c=0,w=0,p=0;S.H.forEach(h=>h.rows.forEach(r=>{if(r.right===true)c++;else if(r.right===false)w++;else p++}));
      Net.stat('end',{rounds:S.H.filter(h=>!h.tb).length,tiebreaks:S.H.filter(h=>h.tb).length,correct:c,wrong:w,passes:p,shared:(S.win||[]).length>1})}
    this.changed()},
  toggleTitle(pid,k){const S=this.S;const a=S.hideT[pid]=S.hideT[pid]||[];const i=a.indexOf(k);if(i>-1)a.splice(i,1);else a.push(k);this.changed()},
  newGame(){const S=this.S;Bots.clear();S.phase='set';S.R=null;S.H=[];S.win=null;S.tieT=null;S.reached=false;S.final=null;S.party=null;S.hideT={};S.used=[];S.statStart=false;S.statEnd=false;S.group={type:'',name:''};delete PH._group;
    S.T.forEach(t=>{t.score=0;t.rot=0});S.custom.forEach(c=>c.used=false);this.changed()},

  /* --- الحساب النهائي --- */
  compute(){const S=this.S;const ppl={};Object.values(S.P).forEach(p=>ppl[p.id]={c:0,w:0,p:0,tc:0,tn:0,storm:0,cable:0,flag:0});
    S.H.forEach(h=>h.rows.forEach(r=>{const s=ppl[r.pid];if(!s)return;if(r.right===true){s.c++;s.tc+=r.t;s.tn++;if(h.wx==='storm')s.storm++;if(r.bonus==='cable')s.cable++}else if(r.right===false)s.w++;else s.p++;if(r.flag||r.won)s.flag++}));
    const titles={};Object.keys(ppl).forEach(id=>titles[id]=[]);const ids=Object.keys(ppl);
    const best=(f,min)=>{let mx=-1;ids.forEach(id=>{const v=f(ppl[id]);if(v>mx)mx=v});if(mx<min)return [];return ids.filter(id=>f(ppl[id])===mx)};
    ids.forEach(id=>{const s=ppl[id];if(s.flag)titles[id].push('flag');if(s.storm)titles[id].push('storm');if(s.cable)titles[id].push('cable');if(s.c>=2&&s.w===0)titles[id].push('steady')});
    best(s=>s.c,1).forEach(id=>titles[id].push('guide'));
    const fast=ids.filter(id=>ppl[id].tn>=2).sort((a,b)=>ppl[a].tc/ppl[a].tn-ppl[b].tc/ppl[b].tn);if(fast.length)titles[fast[0]].push('arrow');
    best(s=>s.p,2).forEach(id=>titles[id].push('wise'));
    ids.forEach(id=>titles[id].sort((a,b)=>TORDER.indexOf(a)-TORDER.indexOf(b)));
    const tStat=S.T.map((t,i)=>{let c=0;S.H.forEach(h=>h.rows.forEach(r=>{if(r.ti===i&&r.right)c++}));return {i,score:t.score,c,win:(S.win||[]).includes(i)}}).filter(x=>this.members(x.i).length);
    tStat.sort((a,b)=>(b.win-a.win)||(b.score-a.score)||(b.c-a.c));let rk=0,prev=null;tStat.forEach((x,k)=>{const key=x.win+'|'+x.score+'|'+x.c;if(key!==prev){rk=k+1;prev=key}x.rank=rk});
    let k=0;const none={};Object.values(S.P).sort((a,b)=>a.j-b.j).forEach(p=>{if(!titles[p.id].length)none[p.id]=k++%NONE.length});
    return {ppl,titles,none,rank:tStat}},

  /* --- الحالة العامة --- */
  pub(){const S=this.S;const hide=S.set.hide&&!['wrap','party','res'].includes(S.phase);const R=S.R;
    let r=null;if(R){r={id:R.id,n:R.n,tb:R.tb,teams:R.teams,wx:R.wx,dur:R.dur,done:R.done,paused:R.paused,
      left:R.endsAt?R.endsAt-now():R.paused,introLeft:R.endsAt?Math.max(0,R.endsAt-R.dur-now()):0,
      ask:Object.fromEntries(R.teams.map(i=>[i,{pid:R.ask[i].pid,why:R.ask[i].why,q:{d:R.ask[i].q.d,text:R.ask[i].q.text,opts:R.ask[i].q.opts}}])),
      got:Object.fromEntries(R.teams.map(i=>[i,!!R.ans[i]])),
      res:R.done?(hide?R.res.map(x=>({ti:x.ti,pid:x.pid,text:x.text,opts:x.opts,d:x.d})):R.res):null}}
    return {v:1,code:S.code,phase:S.phase,demo:DEMO,set:Object.assign({},S.set),cust:S.custom.length,
      P:Object.values(S.P).sort((a,b)=>a.j-b.j).map(p=>({id:p.id,name:p.name,g:p.g,host:p.host,team:p.team,on:p.on||p.bot})),
      T:S.T.map((t,i)=>({name:t.name,by:t.by,score:hide?null:t.score,slots:S.set.special?JSON.parse(JSON.stringify(this.slots(i))):null})),R:r,
      H:hide?null:S.H,win:hide?null:S.win,tieT:hide?null:S.tieT,reached:S.reached,
      group:Object.assign({},S.group),party:S.party,hideT:S.hideT,final:['wrap','party','res'].includes(S.phase)?S.final:null,hasGroupPhoto:!!PH._group}}
};
setInterval(()=>{if(ROLE==='host')E.tick()},200);

/* ===== لاعبين وهميين (جرّب لحالك) ===== */
const Bots={t:[],clear(){this.t.forEach(clearTimeout);this.t=[]},
  join(){if(!DEMO)return;const n=Math.max(5,E.S.set.teams*2+1);BOTS.slice(0,n).forEach((b,k)=>this.t.push(setTimeout(()=>{const id='bot'+k;if(E.S.P[id])return;E.act(id,{a:'hello',me:{name:b[0],g:b[1]},bot:true});
    if(E.S.set.assign==='pick')this.t.push(setTimeout(()=>{if(E.S.phase!=='lobby'||!E.S.P[id])return;const counts=E.S.T.map((_,i)=>E.members(i).length);const i=counts.indexOf(Math.min(...counts));E.act(id,{a:'team',i});
      if(E.S.set.special)this.t.push(setTimeout(()=>{const p=E.S.P[id];if(!p||p.team===null||E.S.phase!=='lobby')return;const sl=E.slots(p.team);const free=E.S.set.doms.filter(k=>!sl[k].length);
        if(free.length)E.act(id,{a:'slot',k:pick(free)});else if(E.members(p.team).length>E.S.set.doms.length)E.act(id,{a:'slot',k:E.S.set.doms.slice().sort((a,b)=>sl[a].length-sl[b].length)[0]})},(900+Math.random()*1800)*SP))},(700+Math.random()*1500)*SP))},(600+k*700)*SP)))},
  round(){if(!DEMO)return;const R=E.S.R;const pr={e:.8,m:.64,h:.48}[E.S.set.diff];
    R.teams.forEach(i=>{const pid=R.ask[i].pid;const p=E.S.P[pid];if(!p||!p.bot)return;const q=R.ask[i].q;
      const delay=R.intro+Math.max(900,Math.random()*R.dur*0.85);
      this.t.push(setTimeout(()=>{if(!E.S.R||E.S.R.id!==R.id)return;if(E.S.R.paused!==null){this.t.push(setTimeout(()=>E.answer(pid,{r:R.id,c:q.ok}),1500));return}
        const roll=Math.random();const c=roll<0.08?'pass':roll<0.08+pr?q.ok:pick([0,1,2,3].filter(x=>x!==q.ok));E.answer(pid,{r:R.id,c})},delay))})}
};

/* ===== العميل ===== */
const Client={
  apply(pub){const prev=PUB;PUB=pub;if(pub.code&&ROLE==='player')store.set('alqimma-player',{code:pub.code,pid:ME.id,me:{name:ME.name,g:ME.g},at:now()});
    if(prev&&prev.R&&pub.R&&prev.R.id!==pub.R.id)LOCAL.cache={};
    render()},
  onDown(d){if(!d)return;if(d.a==='st')this.apply(d.s);else if(d.a==='ph'){if(d.src)PH[d.id]=d.src;else delete PH[d.id];LOCAL.cache={};if(PUB)render()}
    else if(d.a==='msg')toast(d.t);else if(d.a==='kick'){store.del('alqimma-player');Net.stop();PUB=null;ROLE=null;waitMsg('طلعت من القعدة','الريس شالك من القائمة. فيك تفوت من جديد بالكود.');}},
  sendHello(){Net.up({a:'hello',me:{name:ME.name,g:ME.g},ph:ME.photo||undefined})},
  act(d){if(ROLE==='host')E.act(ME.id,d);else Net.up(d)}
};

/* ===== الرسم ===== */
function myP(){return PUB&&PUB.P.find(p=>p.id===ME.id)}
function waitMsg(t,s,icon){show('wait');$('#waitBody').innerHTML=`<div class="bigicon">${mtnIcon()}</div><h2>${esc(t)}</h2><p class="mut">${esc(s||'')}</p>${ROLE==='player'?'<button class="btn flat sm" style="margin-top:20px" onclick="leaveRoom()">اطلع من القعدة</button>':''}`}
function mtnIcon(){return `<svg viewBox="0 0 120 120"><circle cx="88" cy="30" r="12" fill="var(--gold)" stroke="var(--press)" stroke-width="3"/><path d="M8 104L46 34l22 36 12-16 32 50z" fill="var(--rock)" stroke="var(--press)" stroke-width="4" stroke-linejoin="round"/><path d="M38 49l8-15 10 16-8-4-4 6z" fill="var(--snow)" stroke="var(--press)" stroke-width="3" stroke-linejoin="round"/><path d="M46 34V14" stroke="var(--press)" stroke-width="3.5"/><path class="flagw" d="M46 14h18l-5 6 5 6H46z" fill="var(--acc)" stroke="var(--press)" stroke-width="3" stroke-linejoin="round"/></svg>`}

function render(){if(!PUB)return;const ph=PUB.phase;
  $('#demoTag').classList.toggle('hide',!PUB.demo);
  if(ph==='set'){if(ROLE==='host')return renderSet();return waitMsg('الريس عم يظبّط الطلعة','شوي وبتفتح الفرق.')}
  if(ph==='lobby')return renderLobby();
  if(ph==='play')return renderPlay();
  if(ph==='round')return renderRound();
  if(ph==='wrap'){if(ROLE==='host')return renderWrap();return waitMsg(PUB.reached?'في فريق وصل للقمة!':'خلصت الطلعة','الريس عم يجهّز الكشف… خليكن قراب.')}
  if(ph==='party')return renderParty();
  if(ph==='res')return renderRes()}

/* --- الإعدادات --- */
function renderSet(){show('set');const s=PUB.set;
  segBuild($('#o-teams'),[[2,'2'],[3,'3'],[4,'4']],s.teams,v=>E.setSet('teams',+v));
  segBuild($('#o-assign'),[['pick','كل واحد بيختار'],['random','فرز عشوائي']],s.assign,v=>E.setSet('assign',v));
  segBuild($('#o-diff'),[['e','سهل'],['m','متوسط'],['h','صعب']],s.diff,v=>E.setSet('diff',v));
  segBuild($('#o-timer'),[[10,'10ث'],[15,'15ث'],[20,'20ث'],[30,'30ث'],[45,'45ث'],[60,'60ث']],s.timer,v=>E.setSet('timer',+v));
  segBuild($('#o-height'),[[5,'5'],[7,'7'],[10,'10'],[15,'15'],[20,'20']],s.height,v=>E.setSet('height',+v));
  segBuild($('#o-tie'),[['break','جولة فاصلة'],['share','بيربحوا سوا']],s.tie,v=>E.setSet('tie',v));
  const all=s.doms.length===DOMS.length;
  $('#o-doms').innerHTML=`<button class="chip ${all?'on':''}" data-k="__all">${SV(ICON.mtn)}كلشي</button>`+DOMS.map(([k,n])=>`<button class="chip ${s.doms.includes(k)?'on':''}" data-k="${k}">${SV(ICON[k])}${n}</button>`).join('');
  $('#o-doms').onclick=e=>{const c=e.target.closest('.chip');if(!c)return;const k=c.dataset.k;let d=[...s.doms];
    if(k==='__all')d=all?['gen']:DOMS.map(x=>x[0]);else if(d.includes(k)){if(d.length===1)return toast('لازم مجال واحد على الأقل');d=d.filter(x=>x!==k)}else d.push(k);E.setSet('doms',d)};
  $('#domHint').textContent=s.doms.length===1?'مجال واحد':s.doms.length+' مجالات';
  $('#specBox').innerHTML=s.doms.length>1?`<div class="toggle ${s.special?'on':''}" id="o-spec"><div>اختصاصات الفريق<small>كل مجال اخترتوه بيصير اختصاص، وكل فريق لازم يحجزهن كلهن قبل البداية. سؤال الجولة واحد للكل وبيجاوبه المختص بكل فريق</small></div><span class="sw"></span></div>`:'';
  const sp=$('#o-spec');if(sp)sp.onclick=()=>E.setSet('special',!s.special);
  $('#o-weather').classList.toggle('on',s.weather);$('#o-weather').onclick=()=>E.setSet('weather',!s.weather);
  $('#o-hide').classList.toggle('on',s.hide);$('#o-hide').onclick=()=>E.setSet('hide',!s.hide);
  $('#custN').textContent=PUB.cust?PUB.cust+' محضّرين':'';
  const back=$('#setBack');back.innerHTML=SV(ICON.back,2.6);back.onclick=()=>{if(E.S.code||DEMO){if(Object.keys(E.S.P).length>1||E.S.H.length)E.openLobby();else{leaveRoom(true)}}else leaveRoom(true)};
  $('#setGo').textContent=Object.keys(E.S.P).length>1?'رجوع للفرق':'تمام، افتح القعدة';
  $('#setGo').onclick=()=>{E.openLobby();if(DEMO&&Object.keys(E.S.P).length<2)Bots.join()}}

/* --- اللوبي --- */
function renderLobby(){show('lobby');const me=myP();const host=ROLE==='host';const s=PUB.set;
  const mb=$('#lobMenu');mb.innerHTML=SV(host?ICON.gear:ICON.users);mb.onclick=()=>host?E.S.phase==='lobby'&&(E.S.phase='set',E.changed()):playerMenu();
  $('#permitBox').innerHTML=host||PUB.demo?`<div class="permit"><canvas class="qr" id="qr" width="110" height="110"></canvas><div><small>تصريح صعود · امسحوا أو اكتبوا الكود</small><div class="code" id="codeT">${esc(PUB.code||'—')}</div><span class="stamp">${PUB.P.length} متسلّق</span></div></div>`:
    `<div class="mut sm" style="text-align:center">كود القعدة <b class="n" style="letter-spacing:3px;color:var(--ink)">${esc(PUB.code)}</b></div>`;
  if(host||PUB.demo)drawQR();
  const loose=PUB.P.filter(p=>p.team===null);
  $('#lobInfo').textContent=s.assign==='random'?(host?'الفرز عشوائي: اكبس «افرز» لما الكل يفوت':'الريس رح يفرز الفرق عشوائياً'):(me&&me.team===null?'اختار فريقك':'فيك تغيّر فريقك قبل ما نبلّش');
  if(s.special)$('#lobInfo').textContent+=` · كل فريق لازم يحجز كل الاختصاصات (${s.doms.length})`;
  $('#teams').innerHTML=PUB.T.map((t,i)=>{const ms=membersOf(PUB,i);const mine=me&&me.team===i;const canName=(t.by===ME.id)||host;
    return `<div class="team" style="--tc:${TCOL[i]}"><div class="hd">${clgHTML(PUB,i,52)}<div class="nm">${esc(teamName(PUB.T,i))}<small>${ms.length?ms.length+' بالحبل':'لسّا فاضي'}${canName&&ms.length?' · اكبس ✎ لتسمّيه':''}</small></div>
      ${canName&&ms.length?`<button class="ib" data-tn="${i}" aria-label="سمّي الفريق">${SV(ICON.pen)}</button>`:''}
      ${s.assign==='pick'&&!mine&&me?`<button class="btn sm" style="width:auto;padding:0 14px" data-join="${i}">انضم</button>`:''}</div>
      <div class="rope"></div><div class="mem">${ms.map(p=>plChip(p,i,host)).join('')||'<span class="mut sm">بانتظار أول متسلّق، وهو اللي بيسمّي الفريق</span>'}</div>${s.special&&ms.length?slotsHTML(t,i,ms,mine,host):''}</div>`}).join('');
  $('#looseBox').innerHTML=(loose.length?`<div class="waitbox"><b class="sm">بالمخيم، بلا فريق (${loose.length})</b><div class="loose">${loose.map(p=>plChip(p,null,host)).join('')}</div></div>`:'');
  $$('#teams [data-join]').forEach(b=>b.onclick=()=>Client.act({a:'team',i:+b.dataset.join}));
  $$('#teams [data-tn]').forEach(b=>b.onclick=()=>nameTeam(+b.dataset.tn));
  $$('#teams .slot').forEach(b=>b.onclick=()=>{const i=+b.dataset.t,k=b.dataset.k;if(me&&me.team===i)Client.act({a:'slot',k});else if(host)assignSlot(i,k);else toast('هاد مو فريقك')});
  if(host)$$('.pl[data-pid]').forEach(c=>c.onclick=()=>hostPlayerMenu(c.dataset.pid));
  const acts=$('#lobActs');
  if(host){const err=E.canStart();acts.innerHTML=`${s.assign==='random'||loose.length?`<button class="btn ghost" id="shufB">${SV(ICON.shuffle)}${s.assign==='random'?'افرز عشوائي':'وزّع اللي بالمخيم'}</button>`:''}
      <button class="btn" id="startB" ${err?'disabled':''}>${SV(ICON.flag)}يلا نطلع!</button>${err?`<div class="mut sm" style="text-align:center">${err}</div>`:''}
      ${s.special?`<button class="btn ghost sm" id="autoB">${SV(ICON.shuffle)}وزّع الاختصاصات الفاضية تلقائياً</button>`:''}<div class="row"><button class="btn flat sm" id="setB">${SV(ICON.gear)}الإعدادات</button><button class="btn flat sm" data-act="custom">${SV(ICON.plus)}سؤال من عندك</button></div>`;
    const sh=$('#shufB');if(sh)sh.onclick=()=>s.assign==='random'?E.shuffleTeams():(E.fillLoose(),E.changed());
    $('#startB').onclick=()=>E.start();const ab=$('#autoB');if(ab)ab.onclick=()=>{E.autoSlots();E.changed()};$('#setB').onclick=()=>{E.S.phase='set';E.changed()}}
  else acts.innerHTML=`<div class="mut sm" style="text-align:center">${me&&me.team!==null?'جاهزين؟ الريس هو اللي بيبلّش':'لما تختار فريقك، استنّى الريس يبلّش'}</div>`;
  bindActs()}
function plChip(p,i,host){const me=p.id===ME.id;let warn='';
  if(PUB.set.special&&i!==null&&PUB.T[i].slots){const n=Object.values(PUB.T[i].slots).filter(a=>a.includes(p.id)).length;if(!n)warn='<span class="need">بلا اختصاص</span>';else if(n>1)warn='<span class="b dbl">دبل</span>'}
  return `<span class="pl ${me?'me':''}" data-pid="${p.id}" style="--tc:${TCOL[i]||'var(--acc)'}">${avHTML(p,26,p.on?'':'off')}${esc(p.name)}${p.host?' <span class="b">الريس</span>':''}${warn}</span>`}
function slotsHTML(t,i,ms,mine,host){const sl=t.slots||{},s=PUB.set,n=ms.length,d=s.doms.length;const miss=s.doms.filter(k=>!(sl[k]||[]).length);
  const note=n<d?`أنتو ${n} و الاختصاصات ${d}: في حدا لازم ياخد اختصاصين (دبل)`:n>d?`أنتو ${n} والاختصاصات ${d}: في اتنين بيتشاركوا اختصاص وبيتناوبوا`:'كل واحد اختصاص';
  return `<div class="slots"><div class="sh"><b>${miss.length?'ناقص '+miss.length:'✓ جاهزين'}</b><span>${note}</span></div><div class="sg">${s.doms.map(k=>{const h=(sl[k]||[]).map(id=>PUB.P.find(p=>p.id===id)).filter(Boolean);const meIn=h.some(p=>p.id===ME.id);
    return `<button class="slot ${h.length?'full':''} ${meIn?'mine':''}" data-t="${i}" data-k="${k}">${SV(ICON[k])}<span class="sn">${DOMN[k]}</span><span class="sw2">${h.length?h.map(p=>avHTML(p,24)).join(''):'<i>فاضي</i>'}</span></button>`}).join('')}</div></div>`}
function assignSlot(i,k){const ms=membersOf(PUB,i);const sl=PUB.T[i].slots||{};const h=sl[k]||[];
  menu(DOMN[k]+' · '+teamName(PUB.T,i),`<div class="mut sm">اختار مين بياخد هالاختصاص</div>${ms.map(p=>`<button class="btn ${h.includes(p.id)?'':'ghost'} sm" data-as="${p.id}">${avHTML(p,28)}${esc(p.name)}${h.includes(p.id)?' ✓':''}</button>`).join('')}`);
  $$('#menuBody [data-as]').forEach(b=>b.onclick=()=>{E.act(ME.id,{a:'slot',k,pid:b.dataset.as,force:true});closeSheets()})}
function drawQR(){const c=$('#qr');if(!c||!window.qrcode||!PUB.code)return;const url=location.origin+location.pathname.replace(/index\.html$/,'')+'?c='+PUB.code;
  try{const q=qrcode(0,'M');q.addData(url);q.make();const n=q.getModuleCount(),x=c.getContext('2d'),sz=c.width/n;x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.fillStyle='#15202B';
    for(let r=0;r<n;r++)for(let k=0;k<n;k++)if(q.isDark(r,k))x.fillRect(Math.floor(k*sz),Math.floor(r*sz),Math.ceil(sz),Math.ceil(sz))}catch(e){}}
function nameTeam(i){const t=PUB.T[i];menu('سمّوا الفريق',`<input class="field" id="tnIn" maxlength="18" value="${esc(t.name||'')}" placeholder="${esc('فريق '+TNAME[i])}"><button class="btn" id="tnOk">ثبّت الاسم</button>`);
  const inp=$('#tnIn');setTimeout(()=>inp.focus(),100);$('#tnOk').onclick=()=>{Client.act({a:'tname',i,name:inp.value});closeSheets()}}
function menu(title,html){$('#menuT').textContent=title;$('#menuBody').innerHTML=html;openSheet('sh-menu');bindActs()}
function hostPlayerMenu(pid){const p=PUB.P.find(x=>x.id===pid);if(!p)return;
  menu(p.name,`<div class="row"><input class="field" id="rnIn" maxlength="16" value="${esc(p.name)}"><button class="btn sm" id="rnB" style="flex:none;width:auto;padding:0 16px">غيّر الاسم</button></div>${PUB.phase==='lobby'?`<button class="btn ghost" id="mvB">${SV(ICON.shuffle)}انقله للفريق التالي</button>`:''}${p.host?'':`<button class="btn flat" id="kkB">شيله من القعدة</button>`}`);
  $('#rnB').onclick=()=>{E.rename(pid,$('#rnIn').value);closeSheets()};const mv=$('#mvB');if(mv)mv.onclick=()=>{E.cycleTeam(pid);closeSheets()};const kk=$('#kkB');if(kk)kk.onclick=()=>{E.kick(pid);closeSheets()}}
function playerMenu(){menu('القعدة',`<div class="mut sm">كود القعدة: <b class="n">${esc(PUB.code)}</b></div><button class="btn flat" onclick="leaveRoom()">اطلع من القعدة</button>`)}

/* --- اللعب --- */
let tmLoop=null,localEnd=0,localIntro=0,lastRid=null;
function renderPlay(){show('play');const R=PUB.R,me=myP();if(!R)return;const host=ROLE==='host';
  if(R.id!==lastRid){lastRid=R.id;LOCAL.ans[R.id]=LOCAL.ans[R.id]??null}
  localEnd=R.left!==null&&R.paused===null?now()+R.left:0;localIntro=now()+(R.introLeft||0);
  $('#rdN').textContent=R.tb?'جولة فاصلة':'جولة '+R.n;
  $('#miniT').innerHTML=PUB.T.map((t,i)=>membersOf(PUB,i).length?`<span style="--tc:${TCOL[i]}"><i></i><b class="n">${t.score===null?'؟':t.score}</b></span>`:'').join('');
  const wx=R.wx&&WX[R.wx];
  $('#wxBox').innerHTML=R.tb?`<div class="wxb" style="--wxc:var(--gold)">${SV(ICON.flag,2.2)}<div>جولة فاصلة<small>الأسرع بالجواب الصح بيرفع العلم</small></div></div>`:wx?`<div class="wxb" style="--wxc:${wx.c}">${SV(wx.i,2.2)}<div>${wx.n}<small>${wx.d}</small></div></div>`:'';
  if(wx&&R.introLeft>300&&LOCAL.lastWx!==R.id){LOCAL.lastWx=R.id;wxOverlay(R.wx,R.introLeft)}
  const myTeam=me?me.team:null;const inRound=myTeam!==null&&R.teams.includes(myTeam);
  const ti=inRound?myTeam:(host?R.teams[0]:R.teams[0]);const a=R.ask[ti];const ans=PUB.P.find(p=>p.id===a.pid);
  $('#qDom').innerHTML=`${SV(ICON[a.q.d]||ICON.gen)}${DOMN[a.q.d]||''} · ${DIFFN[PUB.set.diff]}`;
  const whyT=w=>w==='spec'?'مختص '+(DOMN[a.q.d]||''):w==='dbl'?'مختص '+(DOMN[a.q.d]||'')+' (دبل)':w==='share'?'مختص '+(DOMN[a.q.d]||'')+' بالتناوب':w==='any'?'ما في مختص، بالدور':'';$('#qTxt').textContent=a.q.text;
  const isMe=a.pid===ME.id&&inRound;const mine=LOCAL.ans[R.id];const got=R.got[ti];
  $('#turn').innerHTML=isMe?`${avHTML(me,42)}<div>${G(me,'دورك! جاوب عن فريقك','دورِك! جاوبي عن فريقك')}<small>${esc(teamName(PUB.T,ti))}${a.why?' · '+whyT(a.why):''}</small></div>`:
    `${avHTML(ans,42)}<div>${inRound?'دور '+esc(ans?ans.name:'')+' من فريقكم':'دور '+esc(ans?ans.name:'')}<small>${inRound?(got?G(ans,'جاوب، استنّوا الكشف','جاوبت، استنّوا الكشف'):'ممنوع المساعدة، بس فيكن تتفرّجوا'):'فريقكم مو بهالجولة، تفرّجوا'}${a.why?' · '+whyT(a.why):''}</small></div>`;
  const locked=!isMe||mine!==null||got||R.paused!==null;
  $('#opts').innerHTML=a.q.opts.map((o,k)=>`<button class="opt ${isMe?'':'view'} ${mine===k?'pick':''} ${mine!==null&&mine!==k?'dim':''}" data-k="${k}" ${locked?'disabled':''}><span class="k">${LETTERS[k]}</span><span>${esc(o)}</span></button>`).join('');
  $$('#opts .opt').forEach(b=>b.onclick=()=>answer(+b.dataset.k));
  $('#passBox').innerHTML=isMe&&mine===null&&!got?`<button class="btn ghost sm passb" id="passB" ${R.paused!==null?'disabled':''}>${SV(ICON.skip)}${G(me,'مرّر','مرّري')} (لا ربح ولا خسارة)</button>`:(isMe&&(mine!==null||got)?`<div class="mut sm" style="text-align:center;margin-top:10px;font-weight:700">${mine===-1?'مرّرت، ولا خسارة':'انحفظ جوابك، استنّى الكشف'}</div>`:'');
  const pb=$('#passB');if(pb)pb.onclick=()=>answer('pass');
  $('#stat').innerHTML=R.teams.map(i=>{const p=PUB.P.find(x=>x.id===R.ask[i].pid);return `<span class="s ${R.got[i]?'done':''}" style="--tc:${TCOL[i]}">${avHTML(p,24)}<em>${esc(p?p.name:'')}</em>${R.got[i]?'✓':'…'}</span>`}).join('');
  const bp=$('#bossPlay');bp.classList.toggle('hide',!host);
  if(host)bp.innerHTML=`<div class="t">${SV(ICON.gear)}أدوات الريس</div><div class="g2">
    ${R.paused!==null?`<button class="btn sm" id="hRes">${SV(ICON.play)}كمّل</button>`:`<button class="btn sm ghost" id="hPau">${SV(ICON.pause)}وقّف</button>`}
    <button class="btn sm ghost" id="hSkip">${SV(ICON.skip)}مرّر الجولة</button><button class="btn sm ghost" data-act="custom">${SV(ICON.plus)}سؤال</button>
    <button class="btn sm bad" id="hRev">${SV(ICON.eye)}اكشف هلق</button></div>`;
  if(host){const p1=$('#hPau');if(p1)p1.onclick=()=>E.pause();const p2=$('#hRes');if(p2)p2.onclick=()=>E.resume();$('#hSkip').onclick=()=>E.skip();$('#hRev').onclick=()=>E.reveal();bindActs()}
  clearInterval(tmLoop);tmLoop=setInterval(drawTimer,100);drawTimer()}
function drawTimer(){const R=PUB&&PUB.R;if(!R||PUB.phase!=='play'){clearInterval(tmLoop);return}const bar=$('#tmBar'),b=bar.firstElementChild;
  if(R.paused!==null){bar.className='timer paused';b.style.width=(R.paused/R.dur*100)+'%';$('#tmN').textContent='⏸';return}
  const intro=localIntro-now();if(intro>0){bar.className='timer';b.style.width='100%';$('#tmN').textContent='…';return}
  const left=Math.max(0,localEnd-now());bar.className='timer'+(left<5000?' low':'');b.style.width=(left/R.dur*100)+'%';$('#tmN').textContent=Math.ceil(left/1000)}
function answer(c){const R=PUB.R;if(!R||LOCAL.ans[R.id]!==null&&LOCAL.ans[R.id]!==undefined)return;if(localIntro-now()>150){toast('استنّى شوي، لسّا ما بلّش الوقت');return}
  LOCAL.ans[R.id]=c==='pass'?-1:c;Client.act({a:'ans',r:R.id,c});if(navigator.vibrate)navigator.vibrate(30);renderPlay()}
function wxOverlay(k,ms){const w=WX[k],o=$('#wxo');o.style.setProperty('--wxc',w.c);$('#wxoc').innerHTML=`${SV(w.i,1.8)}<h2>${w.n}</h2><p>${w.d}</p>`;o.classList.add('on');clearTimeout(o._t);o._t=setTimeout(()=>o.classList.remove('on'),Math.max(800,ms-200));o.onclick=()=>o.classList.remove('on')}

/* --- نتيجة الجولة --- */
function renderRound(){show('round');const R=PUB.R;if(!R||!R.res)return;const host=ROLE==='host';const hide=PUB.set.hide;
  $('#rrN').textContent=R.tb?'نتيجة الجولة الفاصلة':'نتيجة الجولة '+R.n;$('#rrWx').innerHTML=R.wx?esc(WX[R.wx].n):'';
  $('#mtnBox').innerHTML=mtnSVG(PUB,{hide,wx:R.wx,anim:true});animClimb();
  const shared=R.res.every(r=>r.text===R.res[0].text);
  $('#rrRows').innerHTML=(hide?`<div class="card" style="text-align:center;font-weight:800">انحفظت الجولة بالغيم ☁️<div class="mut sm" style="font-weight:500">الكشف كله بالآخر</div></div>`:'')+
    R.res.map(r=>{const p=PUB.P.find(x=>x.id===r.pid);const st=hide?'':r.right===true?'<span class="ok">صح</span>':r.right===false?'<span class="no">غلط</span>':r.c===-2?'خلص الوقت':'مرّر';
      const dl=hide?'':`<span class="dl ${r.delta>0?'p':r.delta<0?'m':'z'}">${r.delta>0?'+':''}${r.delta}</span>`;
      const extra=hide?'':(r.bonus==='cable'?' · تلفريك +1':'')+(r.won?' · الأسرع!':'')+(r.flag?' · رفع العلم':'');
      return `<div class="rrow" style="--tc:${TCOL[r.ti]}">${avHTML(p,40)}<div class="who">${esc(p?p.name:'')} <span class="mut sm">· ${esc(teamName(PUB.T,r.ti))}</span><small>${st}${!hide&&r.c>=0?' · '+esc(r.opts[r.c]):''}${extra}</small>${!shared&&!hide?`<small>${esc(r.text)} ← <b>${esc(r.opts[r.ok])}</b></small>`:''}</div>${dl}</div>`}).join('')+
    (shared&&!hide?`<div class="ansline">${esc(R.res[0].text)}<br>الجواب الصح: <b>${esc(R.res[0].opts[R.res[0].ok])}</b></div>`:'');
  const acts=$('#rrActs');
  let msg='';if(!hide&&PUB.win)msg=PUB.win.length>1?'وصلوا سوا للقمة!':`${esc(teamName(PUB.T,PUB.win[0]))} وصل للقمة!`;else if(!hide&&PUB.tieT)msg='أكتر من فريق وصل سوا، رح نلعب جولة فاصلة';else if(hide&&PUB.reached)msg='في فريق وصل للقمة!';
  if(host)acts.innerHTML=(msg?`<div class="winner" style="justify-content:center">${SV(ICON.flag,2.4)}<b>${msg}</b></div>`:'')+
    `<button class="btn" id="nxB">${PUB.reached?SV(ICON.flag)+'شوفوا مين عالقمة':PUB.tieT?'للجولة الفاصلة':'الجولة الجاية'}</button>
     <div class="row"><button class="btn flat sm" id="skB">${SV(ICON.skip)}مرّر الجولة</button><button class="btn flat sm" id="enB">${SV(ICON.stop)}خلّصوا هون</button></div>`;
  else acts.innerHTML=(msg?`<div class="winner" style="justify-content:center">${SV(ICON.flag,2.4)}<b>${msg}</b></div>`:'')+`<div class="mut sm" style="text-align:center">الريس بيطلق الجولة الجاية</div>`;
  if(host){$('#nxB').onclick=()=>E.next();$('#skB').onclick=()=>E.skip();$('#enB').onclick=()=>confirmAct('نخلّص هون ونشوف قعدة عالقمة',()=>E.endGame())}}
function confirmAct(t,f){menu(t,`<div class="row"><button class="btn ghost" data-close>لا</button><button class="btn" id="cfY">إي</button></div>`);$('#cfY').onclick=()=>{closeSheets();f()}}

/* --- الجبل --- */
function mtnSVG(pub,o={}){const H=pub.set.height;const n=pub.T.length;const W=360,base=250,top=58;
  const ys=s=>s>=0?base-Math.min(s,H)/H*(base-top):base+Math.min(-s,3)*11;
  const lanes=pub.T.map((_,i)=>({bx:78+204*(i+.5)/n,tx:180+(i-(n-1)/2)*9}));
  const pos=(i,s)=>{const L=lanes[i];if(s<0)return [L.bx,ys(s)];const f=Math.min(s,H)/H;return [L.bx+(L.tx-L.bx)*f,ys(s)]};
  let lv='';const step=H<=10?1:5;for(let s=0;s<=H;s+=step){const y=ys(s);lv+=`<text class="lab" x="16" y="${y+4}">${s}</text>`}
  if(H%step)lv+=`<text class="lab" x="16" y="${ys(H)+4}">${H}</text>`;
  const scores=pub.T.map(t=>t.score);
  let lanesS='',cl='';pub.T.forEach((t,i)=>{if(!membersOf(pub,i).length)return;const L=lanes[i];lanesS+=`<path class="lane" style="--tc:${TCOL[i]}" d="M${L.bx} ${base} L${L.tx} ${top}"/>`;
    const s=o.hide||t.score===null?0:t.score;const [x,y]=pos(i,s);const prev=o.anim&&pub.H&&pub.H.length>1?pub.H[pub.H.length-2].after[i]:null;const [px,py]=prev===null||prev===undefined||o.hide?[x,y]:pos(i,prev);
    const ph=membersOf(pub,i).map(p=>PH[p.id]).find(Boolean);const id='c'+i+Math.random().toString(36).slice(2,6);
    cl+=`<g class="clm" data-to="translate(${x.toFixed(1)}px,${y.toFixed(1)}px)" style="transform:translate(${px.toFixed(1)}px,${py.toFixed(1)}px)">
      <line x1="0" y1="-2" x2="0" y2="-34" stroke="var(--press)" stroke-width="2.5"/><path class="flagw" d="M0 -34h17l-4 5 4 5H0z" fill="${TCOL[i]}" stroke="var(--press)" stroke-width="2" stroke-linejoin="round"/>
      <clipPath id="${id}"><circle r="12"/></clipPath><circle r="13.5" fill="${TCOL[i]}" stroke="var(--press)" stroke-width="2.5"/>
      ${ph?`<image href="${ph}" x="-12" y="-12" width="24" height="24" clip-path="url(#${id})" preserveAspectRatio="xMidYMid slice"/>`:`<text y="5" text-anchor="middle" style="font:800 13px var(--fd);fill:#15202B">${esc(((membersOf(pub,i)[0]||{}).name||'؟')[0])}</text>`}
      ${!o.hide&&t.score!==null?`<g transform="translate(15,6)"><rect x="-2" y="-9" width="${String(t.score).length*7+8}" height="15" rx="5" fill="var(--surface)" stroke="var(--press)" stroke-width="1.8"/><text x="2" y="2.5" class="n" style="font:800 11px var(--fb);fill:var(--ink)">${t.score}</text></g>`:''}</g>`});
  const win=!o.hide&&pub.win&&pub.win.length?pub.win[0]:null;
  const peakFlag=win!==null?`<g class="flag-rise"><line x1="180" y1="${top-24}" x2="180" y2="${top-62}" stroke="var(--press)" stroke-width="3"/><path class="flagw" d="M180 ${top-62}h30l-7 8 7 8h-30z" fill="${TCOL[win]}" stroke="var(--press)" stroke-width="2.5" stroke-linejoin="round"/></g>`:'';
  const wx=o.wx?wxLayer(o.wx):'';
  return `<div class="mtnwrap"><svg class="mtn" viewBox="0 0 ${W} 300" aria-label="الجبل">
    <rect x="0" y="0" width="${W}" height="300" fill="var(--sky)"/>
    <circle cx="300" cy="44" r="16" fill="var(--gold)" stroke="var(--press)" stroke-width="2.5"/>
    <path class="valley" d="M0 256 Q90 246 180 258 T360 254 V300 H0z"/>
    <path class="face" d="M22 262 L180 30 L338 262z"/><path class="face2" d="M180 30 L338 262 L238 262 L206 190 L196 120z"/><path class="face3" d="M22 262 L180 30 L150 120 L118 180 L96 262z" opacity=".55"/>
    <path class="snow" d="M180 30 L218 86 L204 80 L194 92 L182 82 L170 94 L160 82 L146 88z"/>
    <path class="edge" d="M22 262 L180 30 L338 262"/>
    ${lv}${lanesS}
    <text class="lab" x="${W-10}" y="${base+17}" text-anchor="start" direction="rtl">المخيم</text><text class="lab" x="${W-10}" y="${ys(-3)+6}" text-anchor="start" direction="rtl">الوادي</text>
    ${peakFlag}${cl}${wx}</svg>${o.hide?`<div class="fog">الجبل بالغيم ☁️<br><span class="mut sm">محدا بيعرف وين صار</span></div>`:''}</div>`}
function wxLayer(k){let s='';if(k==='storm'){for(let i=0;i<26;i++)s+=`<circle cx="${Math.random()*360}" cy="${Math.random()*300}" r="${1+Math.random()*2}" fill="#fff" opacity=".85"><animate attributeName="cy" from="-10" to="310" dur="${2+Math.random()*2}s" begin="-${Math.random()*3}s" repeatCount="indefinite"/></circle>`}
  else if(k==='wind'){for(let i=0;i<7;i++){const y=40+i*30;s+=`<path d="M-40 ${y} q20 -6 40 0 t40 0" stroke="#fff" stroke-width="2.5" fill="none" opacity=".8"><animateTransform attributeName="transform" type="translate" from="0 0" to="440 0" dur="${2.5+Math.random()*2}s" begin="-${Math.random()*3}s" repeatCount="indefinite"/></path>`}}
  else if(k==='fog'){for(let i=0;i<4;i++)s+=`<rect x="-200" y="${70+i*50}" width="300" height="22" rx="11" fill="#fff" opacity=".45"><animate attributeName="x" from="-300" to="380" dur="${9+i*3}s" begin="-${i*2}s" repeatCount="indefinite"/></rect>`}
  else if(k==='cable'){s=`<path d="M0 140 L360 40" stroke="var(--press)" stroke-width="2"/><g><rect x="-14" y="0" width="28" height="18" rx="4" fill="var(--gold)" stroke="var(--press)" stroke-width="2"/><line x1="0" y1="0" x2="0" y2="-8" stroke="var(--press)" stroke-width="2"/><animateMotion dur="6s" repeatCount="indefinite" path="M20 142 L340 53"/></g>`}
  return `<g class="wxl">${s}</g>`}
function animClimb(){requestAnimationFrame(()=>requestAnimationFrame(()=>$$('.clm[data-to]').forEach(g=>g.style.transform=g.dataset.to)))}

/* --- قبل الكشف (الريس) --- */
function renderWrap(){show('wrap');const g=PUB.group;
  $('#wrapT').textContent=PUB.win&&PUB.win.length?'وصلنا للقمة!':'خلصت الطلعة';
  const body=$('#wrapBody');if(body.dataset.on!=='1'){body.dataset.on='1';
  body.innerHTML=`<p class="mut" style="margin:0;text-align:center">قبل الكشف، عرّفوا القعدة. كله اختياري.</p>
    <span class="label">نوع القعدة</span><div class="chips" id="gt"></div>
    <span class="label">اسمها</span><input class="field" id="gn" maxlength="22" placeholder="مثلاً: سهرة الخميس">
    <span class="label">صورة جماعية</span><label class="ppick gpick" id="gp" data-crop="group">خدوا سيلفي سوا<br>أو اختاروا صورة</label>
    <div class="col" style="margin-top:22px"><button class="btn" id="pyB">${SV(ICON.flag)}حفلة الكشف</button><button class="btn ghost" id="drB">اكشف دفعة وحدة</button></div>`;
    $('#gn').oninput=e=>{E.S.group.name=e.target.value.trim();E.changed()};
    $('#pyB').onclick=()=>E.partyStart();$('#drB').onclick=()=>E.showRes();bindCrop()}
  const custom=g.type&&!GTYPES.includes(g.type);const typing=document.activeElement&&document.activeElement.id==='gtc';
  if(!typing)$('#gt').innerHTML=GTYPES.map(t=>`<button class="chip ${g.type===t?'on':''}" data-v="${t}">${t}</button>`).join('')+`<button class="chip ${custom||LOCAL.gtc?'on':''}" data-v="__c">${custom?esc(g.type):'غير شي…'}</button>`+(custom||LOCAL.gtc?`<input class="field" id="gtc" maxlength="16" placeholder="اكتبوا نوع القعدة" value="${custom?esc(g.type):''}" style="margin-top:4px">`:'');
  const gi=$('#gtc');if(gi&&!typing){gi.oninput=()=>{E.S.group.type=gi.value.trim();E.changed()};if(LOCAL.gtc===1){LOCAL.gtc=2;setTimeout(()=>gi.focus(),50)}}
  $('#gt').onclick=e=>{const c=e.target.closest('.chip');if(!c)return;if(c.dataset.v==='__c'){if(!LOCAL.gtc){LOCAL.gtc=1;E.setGroup('type','')}return}LOCAL.gtc=0;E.setGroup('type',g.type===c.dataset.v?'':c.dataset.v)};
  if(document.activeElement!==$('#gn'))$('#gn').value=g.name||'';
  $('#gp').innerHTML=PH._group?`<img src="${PH._group}" alt="">`:'خدوا سيلفي سوا<br>أو اختاروا صورة'}
const groupLabel=()=>{const g=PUB.group;return g.name?(g.type?g.type+' '+g.name:g.name):(g.type||'قعدتنا')};

/* --- الحفلة --- */
let partyTimer=null;
function renderParty(){show('party');const F=PUB.final,pt=PUB.party;if(!F||!pt)return;const n=F.rank.length;const host=ROLE==='host';
  if(LOCAL.partyK===pt.k)return;LOCAL.partyK=pt.k;clearInterval(partyTimer);
  if(pt.k===0){$('#pb').innerHTML=`<div class="summit">${mtnIcon()}</div><h1 style="font-size:34px;margin-top:10px">مين عالقمة؟</h1><p class="mut">رح نكشف الفرق من تحت لفوق</p>${host?'<button class="btn" id="pn" style="margin-top:22px">يلا!</button>':''}`;
    if(host)$('#pn').onclick=()=>E.partyNext();return}
  const x=[...F.rank].reverse()[pt.k-1];const last=pt.k===n;let c=3;
  const lab=x.win?(PUB.win.length>1?'وصلوا سوا للقمة':'رفعوا العلم عالقمة'):`المرتبة ${x.rank}`;
  const draw=()=>$('#pb').innerHTML=`<div class="mut" style="font-weight:800">${last?'وعلى القمة…':'المرتبة '+x.rank}</div><div class="cnt n">${c}</div>`;draw();
  partyTimer=setInterval(()=>{c--;if(c>0)return draw();clearInterval(partyTimer);
    const ms=membersOf(PUB,x.i).map(p=>p.name).join('، ');
    $('#pb').innerHTML=`<div class="pod"><div class="mut" style="font-weight:800">${lab}</div>${clgHTML(PUB,x.i,150)}
      <h1 style="font-size:34px;margin-top:14px">${esc(teamName(PUB.T,x.i))}</h1><div class="mut sm">${esc(ms)}</div>
      <div class="place"><span class="n">${x.score}</span> ${x.score===1||x.score===-1?'درجة':'درجات'}${x.score<0?' (بالوادي)':''}</div>
      ${last?`<div style="margin-top:18px">${mtnSVG(PUB,{})}</div>`:''}</div>
      ${host?`<div style="margin-top:24px"><button class="btn ${last?'':'ghost'}" id="pn">${last?'النتيجة كاملة':'التالي'}</button></div>`:''}`;
    if(last)confetti(TCOL[x.i]);if(host)$('#pn').onclick=()=>E.partyNext()},FAST?90:850)}
function confetti(col){const c=$('#cf'),x=c.getContext('2d');c.width=innerWidth;c.height=innerHeight;const cols=[col,'#F4BF2A','#FFFFFF',col,'#15202B'];
  const P=Array.from({length:170},()=>({x:innerWidth/2+(Math.random()-.5)*90,y:innerHeight*.38,vx:(Math.random()-.5)*14,vy:-Math.random()*15-4,r:Math.random()*6,s:5+Math.random()*8,c:pick(cols),tri:Math.random()<.4}));
  let f=0;(function l(){x.clearRect(0,0,c.width,c.height);P.forEach(p=>{p.vy+=.4;p.x+=p.vx;p.y+=p.vy;p.r+=.15;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;x.strokeStyle='#15202B';x.lineWidth=1;
    if(p.tri){x.beginPath();x.moveTo(0,-p.s/2);x.lineTo(p.s/2,p.s/2);x.lineTo(-p.s/2,p.s/2);x.closePath();x.fill();x.stroke()}else x.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);x.restore()});
    if(++f<170)requestAnimationFrame(l);else x.clearRect(0,0,c.width,c.height)})()}

/* --- النتيجة --- */
function renderRes(){show('res');const F=PUB.final;if(!F)return;const host=ROLE==='host';
  $('#resH').textContent=groupLabel();
  const eb=$('#resEdit');eb.classList.toggle('hide',!host);eb.innerHTML=SV(ICON.pen);eb.onclick=()=>{$('#wrapBody').dataset.on='';E.S.phase='wrap';E.changed()};
  const w=PUB.win||[];
  $('#winBox').innerHTML=w.length?`<div class="winner">${w.length===1?clgHTML(PUB,w[0],64):SV(ICON.flag,2.4)}<div><small>${w.length>1?'رفعوا العلم سوا':'رفعوا العلم عالقمة'}</small><b>${w.map(i=>esc(teamName(PUB.T,i))).join(' و')}</b></div></div>`:'';
  $('#resMtn').innerHTML=mtnSVG(PUB,{});
  $('#resT').innerHTML=F.rank.map(x=>{const ms=membersOf(PUB,x.i);
    return `<div class="trow" style="--tc:${TCOL[x.i]}"><div class="hd"><span class="rk n">${x.rank}</span>${clgHTML(PUB,x.i,46)}<div class="nm">${esc(teamName(PUB.T,x.i))}<small>${x.win?'وصلوا للقمة 🏁':x.score<0?'ضلّوا بالوادي':'وقفوا عارتفاع '+x.score}</small></div><div class="ht n">${x.score}<small>درجة</small></div></div>
      ${ms.map(p=>{const s=F.ppl[p.id]||{c:0,w:0,p:0};const t=F.titles[p.id]||[];return `<div class="pp ${p.id===ME.id?'me':''}">${avHTML(p,36)}<div style="min-width:0"><div class="nm2">${esc(p.name)}</div><div class="tt">${t.length?t.map(k=>`<span>${TITLES[k][p.g==='f'?1:0]}</span>`).join(''):`<i>${NONE[F.none[p.id]||0][p.g==='f'?1:0]}</i>`}</div></div>
        <span class="sc">✓<b>${s.c}</b> ✗<u>${s.w}</u> ⤼<s>${s.p}</s></span></div>`}).join('')}</div>`}).join('');
  $('#resR').innerHTML=(PUB.H||[]).map(h=>`<details class="rd"><summary><span class="n">${h.tb?'فاصلة':h.n}.</span>${h.wx?`<span class="mut sm">${WX[h.wx].n}</span>`:''}<span class="sm" style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(h.rows[0].text)}</span></summary>
    ${h.rows.map(r=>{const p=PUB.P.find(x=>x.id===r.pid);return `<div class="tq" style="--tc:${TCOL[r.ti]}"><b>${esc(p?p.name:'')}</b> · ${esc(teamName(PUB.T,r.ti))} ${r.right===true?'<span class="ok">صح</span>':r.right===false?'<span class="no">غلط</span>':'<span class="mut">مرّر</span>'} <span class="n">(${r.delta>0?'+':''}${r.delta})</span>
      ${h.rows.every(z=>z.text===h.rows[0].text)?'':`<div class="mut">${esc(r.text)}</div>`}<div class="mut">${r.c>=0?'جوابه: '+esc(r.opts[r.c])+' · ':''}الصح: ${esc(r.opts[r.ok])}</div></div>`}).join('')}</details>`).join('')||'<div class="mut">ما في جولات</div>';
  $('#rtab').onclick=e=>{const b=e.target.closest('button');if(!b)return;$$('#rtab button').forEach(x=>x.classList.toggle('on',x===b));$('#resT').classList.toggle('hide',b.dataset.t!=='t');$('#resR').classList.toggle('hide',b.dataset.t!=='r')};
  // الستوري
  const tis=F.rank.map(r=>r.i);if(LOCAL.story.ti==null||!tis.includes(LOCAL.story.ti)){const me=myP();LOCAL.story.ti=me&&tis.includes(me.team)?me.team:tis[0]}
  if(!LOCAL.story.th)LOCAL.story.th=themeNow();const ti=LOCAL.story.ti;
  $('#storyWho').innerHTML=tis.length>1?`<div class="chips">${tis.map(i=>`<button class="chip ${ti===i?'on':''}" data-w="${i}" style="${ti===i?`background:${TCOL[i]};color:#15202B`:''}"><span style="width:12px;height:12px;border-radius:50%;background:${TCOL[i]};border:2px solid var(--press);display:inline-block"></span>${esc(teamName(PUB.T,i))}</button>`).join('')}</div>`:'';
  $('#storyWho').onclick=e=>{const c=e.target.closest('[data-w]');if(!c)return;LOCAL.story.ti=+c.dataset.w;renderRes()};
  $$('#lay button').forEach(b=>b.classList.toggle('on',b.dataset.v===LOCAL.story.lay));$$('#ith button').forEach(b=>b.classList.toggle('on',b.dataset.v===LOCAL.story.th));
  $('#lay').onclick=e=>{const b=e.target.closest('button');if(!b)return;LOCAL.story.lay=b.dataset.v;renderRes()};
  $('#ith').onclick=e=>{const b=e.target.closest('button');if(!b)return;LOCAL.story.th=b.dataset.v;renderRes()};
  const ms=membersOf(PUB,ti);const tgl=[];ms.forEach(p=>(F.titles[p.id]||[]).forEach(k=>tgl.push([p,k])));
  $('#tgBox').innerHTML=host&&tgl.length?`<div class="mut sm" style="margin-top:10px">اكبس على أي لقب لتشيله من الصورة</div><div class="tg">${tgl.map(([p,k])=>`<button class="${(PUB.hideT[p.id]||[]).includes(k)?'off':''}" data-p="${p.id}" data-k="${k}">${esc(p.name)}: ${TITLES[k][p.g==='f'?1:0]}</button>`).join('')}</div>`:'';
  $('#tgBox').onclick=e=>{const b=e.target.closest('[data-k]');if(!b)return;E.toggleTitle(b.dataset.p,b.dataset.k)};
  $('#dlB').onclick=()=>Story.download(ti);
  Story.preview(ti);
  $('#resActs').innerHTML=host?`<button class="btn flat sm" id="rgB">${SV(ICON.pen)}عدّل اسم القعدة أو صورتها</button><button class="btn flat sm" id="ngB">${SV(ICON.mtn)}طلعة جديدة بنفس الفرق</button>${DEMO?'':'<button class="btn flat sm" onclick="leaveRoom(true)">سكّر القعدة</button>'}`:'<button class="btn flat sm" onclick="leaveRoom()">اطلع من القعدة</button>';
  if(host){$('#rgB').onclick=()=>{$('#wrapBody').dataset.on='';E.S.phase='wrap';E.changed()};$('#ngB').onclick=()=>confirmAct('نبلّش طلعة جديدة؟',()=>{E.newGame();if(DEMO)Bots.clear()})}
  installHint()}

/* ===== القص ===== */
const CR={};let cropFor=null;
function bindCrop(){$$('[data-crop]').forEach(l=>l.onclick=e=>{e.preventDefault();cropFor=l.dataset.crop;
  menu(cropFor==='group'?'الصورة الجماعية':'صورتك',`<div class="pickmenu"><button class="btn" id="pkCam">📷 صوّر سيلفي</button><button class="btn ghost" id="pkFile">🖼️ من الصور</button>${(cropFor==='group'?PH._group:ME&&ME.photo)?'<button class="btn flat sm" id="pkDel">شيل الصورة</button>':''}</div>`);
  $('#pkCam').onclick=()=>{closeSheets();$('#cam').click()};$('#pkFile').onclick=()=>{closeSheets();$('#file').click()};
  const d=$('#pkDel');if(d)d.onclick=()=>{closeSheets();if(cropFor==='group')E.setGroupPhoto(null);else{ME.photo=null;$('#pp').innerHTML='صورتك<br>(اختياري)'}}})}
$('#cam').onchange=e=>$('#file').onchange(e);
$('#file').onchange=e=>{const f=e.target.files[0];e.target.value='';if(!f)return;const r=new FileReader();r.onload=()=>{const im=$('#cimg');im.onload=openCrop;im.src=r.result};r.readAsDataURL(f)};
function openCrop(){const im=$('#cimg'),g=cropFor==='group';$('#frame').style.setProperty('--ar',g?'4/3':'1');$('#frame').style.setProperty('--fr',g?'14px':'50%');$('#crop').classList.add('on');
  requestAnimationFrame(()=>{const F=$('#frame');CR.W=F.clientWidth;CR.H=F.clientHeight;CR.w=im.naturalWidth;CR.h=im.naturalHeight;
    CR.cover=Math.max(CR.W/CR.w,CR.H/CR.h);CR.min=Math.min(CR.W/CR.w,CR.H/CR.h);CR.max=CR.cover*4;CR.s=CR.cover;CR.x=0;CR.y=0;syncZ();applyCrop()})}
const syncZ=()=>$('#zm').value=(CR.s-CR.min)/(CR.max-CR.min);
function applyCrop(){CR.s=Math.max(CR.min,Math.min(CR.max,CR.s));const W=CR.w*CR.s,H=CR.h*CR.s,lx=Math.abs(W-CR.W)/2,ly=Math.abs(H-CR.H)/2;
  CR.x=Math.max(-lx,Math.min(lx,CR.x));CR.y=Math.max(-ly,Math.min(ly,CR.y));const im=$('#cimg');im.style.width=W+'px';im.style.height=H+'px';im.style.transform=`translate(calc(-50% + ${CR.x}px),calc(-50% + ${CR.y}px))`}
$('#zm').oninput=e=>{CR.s=CR.min+(CR.max-CR.min)*+e.target.value;applyCrop()};
(()=>{const f=$('#frame');const pts=new Map();let pd=0;
  f.addEventListener('pointerdown',e=>{f.setPointerCapture(e.pointerId);pts.set(e.pointerId,{x:e.clientX,y:e.clientY})});
  f.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId))return;const p=pts.get(e.pointerId);if(pts.size===1){CR.x+=e.clientX-p.x;CR.y+=e.clientY-p.y}pts.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(pts.size===2){const [a,b]=[...pts.values()];const d=Math.hypot(a.x-b.x,a.y-b.y);if(pd)CR.s*=d/pd;pd=d;syncZ()}applyCrop()});
  const up=e=>{pts.delete(e.pointerId);pd=0};f.addEventListener('pointerup',up);f.addEventListener('pointercancel',up);
  f.addEventListener('wheel',e=>{e.preventDefault();CR.s*=e.deltaY<0?1.06:.94;syncZ();applyCrop()},{passive:false})})();
$('#cropNo').onclick=()=>$('#crop').classList.remove('on');
$('#cropOk').onclick=()=>{const g=cropFor==='group';const ow=g?1200:300,oh=g?900:300;const c=document.createElement('canvas');c.width=ow;c.height=oh;const x=c.getContext('2d');
  x.fillStyle='#15202B';x.fillRect(0,0,ow,oh);const k=ow/CR.W,W=CR.w*CR.s*k,H=CR.h*CR.s*k;x.drawImage($('#cimg'),ow/2+CR.x*k-W/2,oh/2+CR.y*k-H/2,W,H);
  const url=c.toDataURL('image/jpeg',g?.85:.82);$('#crop').classList.remove('on');
  if(cropFor==='me'){ME.photo=url;$('#pp').innerHTML=`<img src="${url}" alt="">`}else{E.setGroupPhoto(url)}LOCAL.cache={}};

/* ===== أسئلة الريس ===== */
function bindActs(){$$('[data-act]').forEach(b=>{if(b._b)return;b._b=1;b.onclick=()=>actBtn(b.dataset.act)})}
function actBtn(a){if(a==='host')startHost();else if(a==='havecode'){if(DEMO){toast('بالنسخة الحقيقية بتكتب كود الريس أو بتمسح الـQR');return}show('code');setTimeout(()=>$('#codeIn').focus(),200)}
  else if(a==='custom'){renderCustList();openSheet('sh-custom')}}
function renderCustList(){const L=E.S.custom;$('#custList').innerHTML=L.length?`<b class="sm">المحضّرين (${L.length})</b>`+L.map((c,i)=>`<div class="row" style="align-items:center;margin-top:8px"><div class="sm" style="flex:4">${esc(c.q)} <span class="ok">${esc(c.a)}</span>${c.used?' <span class="mut">· انطرح</span>':''}</div><button class="ib" data-del="${i}" style="flex:none">✕</button></div>`).join(''):'';
  $$('#custList [data-del]').forEach(b=>b.onclick=()=>{E.delCustom(+b.dataset.del);renderCustList()})}
$('#cSave').onclick=()=>{const q=$('#cq').value.trim(),a=$('#ca').value.trim(),w=[$('#cw1'),$('#cw2'),$('#cw3')].map(i=>i.value.trim());
  if(!q||!a||w.some(x=>!x))return toast('عبّي السؤال والجواب الصح و3 أجوبة غلط');if(new Set([a,...w]).size<4)return toast('الأجوبة لازم تكون مختلفة');
  E.addCustom({q,a,w});['#cq','#ca','#cw1','#cw2','#cw3'].forEach(s=>$(s).value='');toast('انضاف السؤال');renderCustList()};

/* ===== الدخول ===== */
let myG=null;
$('#gen').onclick=e=>{const b=e.target.closest('button');if(!b)return;myG=b.dataset.g;$$('#gen button').forEach(x=>x.classList.toggle('on',x===b));$('#meGo').disabled=false};
let afterMe=null;
function askMe(next){ME={id:ME&&ME.id||rid(12),name:'',g:null,photo:null};$('#nm').value='';$('#pp').innerHTML='صورتك<br>(اختياري)';myG=null;$$('#gen button').forEach(x=>x.classList.remove('on'));$('#meGo').disabled=true;afterMe=next;show('me');bindCrop()}
$('#meGo').onclick=()=>{ME.name=$('#nm').value.trim();ME.g=myG;if(afterMe)afterMe()};
function startHost(){askMe(()=>{ROLE='host';ME.id='h'+ME.id.slice(1);E.init();
  if(!ME.name)ME.name=G(ME,'الريس','الريسة');if(ME.photo)PH[ME.id]=ME.photo;
  E.act(ME.id,{a:'hello',me:{name:ME.name,g:ME.g},ph:ME.photo||undefined});
  if(DEMO){E.S.code='DEMO1';E.changed();hit('demo')}else Net.start('host',{})})}
$('#codeIn').oninput=e=>{e.target.value=e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,5);$('#codeGo').disabled=e.target.value.length!==5};
$('#codeGo').onclick=()=>joinCode($('#codeIn').value);
function joinCode(code){askMe(()=>{ROLE='player';waitMsg('عم نفوت عالقعدة…','لحظة');Net.start('player',{code,pid:ME.id})})}
function leaveRoom(hostClose){if(ROLE==='host'){store.del('alqimma-host');try{localStorage.removeItem('alqimma-ph')}catch(e){}Bots.clear()}else store.del('alqimma-player');
  Net.stop();PUB=null;ROLE=null;closeSheets();Object.keys(PH).forEach(k=>delete PH[k]);history.replaceState(null,'',location.pathname+(DEMO&&!PREVIEW?'?demo=1':''));show('cover')}
function hit(ev){if(PREVIEW)return;try{fetch('api/hit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ev})}).catch(()=>{})}catch(e){}}

/* ===== التنزيل كتطبيق ===== */
let deferredInstall=null;addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstall=e;installHint()});
function installHint(){const b=$('#instB');if(!b)return;const standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone;if(standalone){$('#install').classList.add('hide');return}
  b.classList.toggle('hide',!deferredInstall);b.onclick=async()=>{if(!deferredInstall)return;deferredInstall.prompt();try{await deferredInstall.userChoice}catch(e){}deferredInstall=null;b.classList.add('hide')}}
if('serviceWorker' in navigator&&!PREVIEW&&location.protocol!=='file:')addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));

/* ===== الغلاف ===== */
function coverScene(){const fl=(x,y,c,dx,dy,d)=>`<g class="climb" style="--dx:${dx}px;--dy:${dy}px;animation-delay:${d}s"><g transform="translate(${x} ${y})"><line x1="0" y1="0" x2="0" y2="-20" stroke="var(--press)" stroke-width="2.4"/><path class="flagw" d="M0 -20h12l-3 4 3 4H0z" fill="${c}" stroke="var(--press)" stroke-width="2" stroke-linejoin="round"/><circle r="6" fill="${c}" stroke="var(--press)" stroke-width="2.4"/></g></g>`;
  return `<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <rect width="400" height="250" fill="var(--sky)"/>
  <circle cx="320" cy="56" r="24" fill="var(--gold)" stroke="var(--press)" stroke-width="3"/>
  <g class="cloud"><path d="M40 70h46a12 12 0 0 0-12-14 16 16 0 0 0-28 2 10 10 0 0 0-6 12z" fill="#fff" stroke="var(--press)" stroke-width="2.5" stroke-linejoin="round"/></g>
  <g class="cloud b"><path d="M120 40h36a10 10 0 0 0-10-11 13 13 0 0 0-22 2 8 8 0 0 0-4 9z" fill="#fff" stroke="var(--press)" stroke-width="2.5" stroke-linejoin="round"/></g>
  <path d="M-10 250L70 120l40 50 40-60 60 140z" fill="var(--rock2)" stroke="var(--press)" stroke-width="3" stroke-linejoin="round"/>
  <path d="M230 250l60-110 40 40 30-30 60 100z" fill="var(--rock2)" stroke="var(--press)" stroke-width="3" stroke-linejoin="round"/>
  <path d="M60 250L200 34l140 216z" fill="var(--rock)" stroke="var(--press)" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M200 34l70 108-40-30-30 138-80-0 40-120z" fill="var(--rock3)" opacity=".35"/>
  <path d="M200 34l30 46-12-6-10 12-10-10-12 12-8-14-10 6z" fill="var(--snow)" stroke="var(--press)" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M120 236 Q170 210 150 180 T200 120 T190 70" fill="none" stroke="var(--snow)" stroke-width="3" stroke-dasharray="3 7" stroke-linecap="round"/>
  <line x1="200" y1="34" x2="200" y2="4" stroke="var(--press)" stroke-width="3"/><path class="flagw" d="M200 4h26l-6 7 6 7h-26z" fill="var(--acc)" stroke="var(--press)" stroke-width="2.5" stroke-linejoin="round"/>
  ${fl(128,232,TCOL[1],22,-52,0)}${fl(150,182,TCOL[2],40,-58,1.2)}${fl(176,150,TCOL[3],14,-56,.6)}
  <rect x="0" y="244" width="400" height="8" fill="var(--press)"/></svg>`}
$('#scene').innerHTML=coverScene();

/* ===== البداية ===== */
function boot(){bindActs();
  if(DEMO)$('#demoTag').classList.remove('hide');
  const code=(QS.get('c')||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,5);
  if(!DEMO){const h=store.get('alqimma-host');if(h&&h.S&&now()-h.at<8*3600e3&&!code){ME=h.me;ROLE='host';E.S=h.S;try{Object.assign(PH,JSON.parse(localStorage.getItem('alqimma-ph'))||{})}catch(e){}
      if(E.S.R&&!E.S.R.done&&E.S.phase==='play'){E.S.R.paused=E.S.R.paused??Math.max(3000,(E.S.R.endsAt||now())-now());E.S.R.endsAt=null}
      Net.start('host',{code:E.S.code,key:E.S.key});E.changed();return}
    const p=store.get('alqimma-player');if(p&&p.code&&now()-p.at<8*3600e3&&(!code||code===p.code)){ME={id:p.pid,name:p.me.name,g:p.me.g,photo:null};ROLE='player';waitMsg('عم نرجع عالقعدة…','لحظة');Net.start('player',{code:p.code,pid:p.pid});return}
    hit('open')}
  if(code&&code.length===5&&!DEMO){joinCode(code);return}
  show('cover')}
window.leaveRoom=leaveRoom;
$$('[data-help]').forEach(b=>b.onclick=()=>openSheet('sh-help'));
function takeBar(on){let b=$('#takebar');if(!b){b=document.createElement('div');b.id='takebar';b.className='takebar';document.body.appendChild(b)}
  if(!on){b.classList.remove('on');return}b.innerHTML=`<b>الريس طلع من القعدة</b><small>اللعبة ما وقفت. حدا منكم فيه يستلم ويكمّل من وين وقفنا.</small><button class="btn ink sm" id="takeB">${G(ME,'صير أنا الريس','صير أنا الريسة')}</button>`;b.classList.add('on');
  $('#takeB').onclick=()=>{Net.raw({t:'take'});b.classList.remove('on')}}
document.fonts&&document.fonts.ready.then(()=>{if(PUB&&CUR==='res')Story.preview(LOCAL.story.ti)});

/* ===== صورة الستوري (لكل شخص) ===== */
const Story=(()=>{const W=1080,H=1920;const imgC={};
  const load=src=>src?(imgC[src]=imgC[src]||new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=src})):Promise.resolve(null);
  const pal=d=>d?{bg:'#0F161C',sky:'#16212A',sf:'#1A2530',ink:'#EAF0F2',ink2:'#91A2AD',line:'#2B3A46',pr:'#3B4E5B',rock:'#3B4A55',rock2:'#4C5C67',snow:'#DCE6EA',valley:'#26343E',ct:'rgba(255,255,255,.05)'}
    :{bg:'#E4ECEF',sky:'#D3E3EA',sf:'#FFFFFF',ink:'#15202B',ink2:'#566571',line:'#C3D0D6',pr:'#15202B',rock:'#61727D',rock2:'#7F909A',snow:'#FFFFFF',valley:'#9DB0B8',ct:'rgba(21,32,43,.07)'};
  function rr(x,X,Y,w,h,r){x.beginPath();x.moveTo(X+r,Y);x.arcTo(X+w,Y,X+w,Y+h,r);x.arcTo(X+w,Y+h,X,Y+h,r);x.arcTo(X,Y+h,X,Y,r);x.arcTo(X,Y,X+w,Y,r);x.closePath()}
  function fit(x,t,max){if(x.measureText(t).width<=max)return t;let s=t;while(s.length>1&&x.measureText(s+'…').width>max)s=s.slice(0,-1);return s+'…'}
  function T(x,t,X,Y,font,col,al='center',max=960){x.font=font;x.fillStyle=col;x.textAlign=al;x.direction='rtl';x.textBaseline='alphabetic';x.fillText(fit(x,String(t),max),X,Y)}
  function shrink(x,t,size,weight,fam,max,min=40){let s=size;x.font=`${weight} ${s}px ${fam}`;while(s>min&&x.measureText(t).width>max){s-=4;x.font=`${weight} ${s}px ${fam}`}return s}
  function box(x,X,Y,w,h,r,P,fill,sh=12,lw=6){x.fillStyle=P.pr;rr(x,X+sh,Y+sh,w,h,r);x.fill();x.fillStyle=fill;rr(x,X,Y,w,h,r);x.fill();x.lineWidth=lw;x.strokeStyle=P.pr;x.stroke()}
  function bg(x,P,tint){x.fillStyle=P.bg;x.fillRect(0,0,W,H);if(tint){x.fillStyle=tint;x.globalAlpha=P.bg==='#0F161C'?.08:.16;x.fillRect(0,0,W,H);x.globalAlpha=1}
    x.strokeStyle=P.ct;x.lineWidth=4;for(let k=0;k<11;k++){const y=120+k*170;x.beginPath();x.moveTo(-20,y);for(let i=0;i<=6;i++){const X=i*200;x.quadraticCurveTo(X-100,y+(i%2?-50:50),X,y+(i%3?14:-10))}x.stroke()}}
  function avatar(x,img,p,cx,cy,r,col,P,sq){x.save();if(sq){rr(x,cx-r,cy-r,2*r,2*r,r*.18)}else{x.beginPath();x.arc(cx,cy,r,0,7)}x.fillStyle=col;x.fill();x.clip();
    if(img){const k=Math.max(2*r/img.width,2*r/img.height);x.drawImage(img,cx-img.width*k/2,cy-img.height*k/2,img.width*k,img.height*k)}
    else{x.fillStyle='#15202B';x.font=`800 ${r*.9}px Changa`;x.textAlign='center';x.textBaseline='middle';x.direction='rtl';x.fillText((p.name||'؟')[0],cx,cy+r*.08)}
    x.restore();x.lineWidth=Math.max(6,r*.06);x.strokeStyle=P.pr;if(sq)rr(x,cx-r,cy-r,2*r,2*r,r*.18);else{x.beginPath();x.arc(cx,cy,r,0,7)}x.stroke()}
  function flag(x,X,Y,h,col,P,s=1){x.lineWidth=5*s;x.strokeStyle=P.pr;x.beginPath();x.moveTo(X,Y);x.lineTo(X,Y-h);x.stroke();x.fillStyle=col;x.beginPath();x.moveTo(X,Y-h);x.lineTo(X+46*s,Y-h);x.lineTo(X+34*s,Y-h+14*s);x.lineTo(X+46*s,Y-h+28*s);x.lineTo(X,Y-h+28*s);x.closePath();x.fill();x.lineWidth=4*s;x.stroke()}
  function mountain(x,P,X,Y,w,h,pub,hi,imgs){const sx=w/360,sy=h/300;const m=(a,b)=>[X+a*sx,Y+b*sy];
    x.save();rr(x,X,Y,w,h,24);x.clip();x.fillStyle=P.sky;x.fillRect(X,Y,w,h);
    let [cx,cy]=m(300,44);x.fillStyle='#F4BF2A';x.beginPath();x.arc(cx,cy,16*sx,0,7);x.fill();x.lineWidth=4;x.strokeStyle=P.pr;x.stroke();
    const poly=(pts,fill,stroke)=>{x.beginPath();pts.forEach((p,i)=>{const [a,b]=m(p[0],p[1]);i?x.lineTo(a,b):x.moveTo(a,b)});x.closePath();x.fillStyle=fill;x.fill();if(stroke){x.lineWidth=6;x.strokeStyle=P.pr;x.lineJoin='round';x.stroke()}};
    poly([[0,256],[180,250],[360,254],[360,300],[0,300]],P.valley);
    poly([[22,262],[180,30],[338,262]],P.rock,true);poly([[180,30],[338,262],[238,262],[206,190],[196,120]],P.rock2);
    poly([[180,30],[218,86],[204,80],[194,92],[182,82],[170,94],[160,82],[146,88]],P.snow,true);
    const Hh=pub.set.height,base=250,top=58,n=pub.T.length;const ys=s=>s>=0?base-Math.min(s,Hh)/Hh*(base-top):base+Math.min(-s,3)*11;
    const win=pub.win&&pub.win.length?pub.win[0]:null;if(win!==null){const [a,b]=m(180,top-22);flag(x,a,b,70*sy,TCOL[win],P,1.2)}
    pub.T.forEach((t,i)=>{if(!membersOf(pub,i).length)return;const bx=78+204*(i+.5)/n,tx=180+(i-(n-1)/2)*9,s=t.score||0,f=s<0?0:Math.min(s,Hh)/Hh;const [a,b]=m(bx+(tx-bx)*f,ys(s));
      const r=(i===hi?22:15)*sx;x.lineWidth=4;x.strokeStyle=P.pr;x.beginPath();x.moveTo(a,b);x.lineTo(a,b-r*2.6);x.stroke();
      x.fillStyle=TCOL[i];x.beginPath();x.moveTo(a,b-r*2.6);x.lineTo(a+r*1.5,b-r*2.6);x.lineTo(a+r*1.1,b-r*2.1);x.lineTo(a+r*1.5,b-r*1.6);x.lineTo(a,b-r*1.6);x.closePath();x.fill();x.lineWidth=3;x.stroke();
      x.beginPath();x.arc(a,b,r,0,7);x.fillStyle=TCOL[i];x.fill();x.lineWidth=i===hi?7:4;x.stroke();if(i===hi&&imgs.me){x.save();x.beginPath();x.arc(a,b,r-4,0,7);x.clip();const im=imgs.me,k=Math.max(2*r/im.width,2*r/im.height);x.drawImage(im,a-im.width*k/2,b-im.height*k/2,im.width*k,im.height*k);x.restore()}});
    x.restore();x.lineWidth=6;x.strokeStyle=P.pr;rr(x,X,Y,w,h,24);x.stroke()}
  function pills(x,P,items,cx,Y,maxW,sz=40){const pad=26,gap=16;x.font=`800 ${sz}px Tajawal`;const ws=items.map(t=>Math.min(maxW,x.measureText(t.t).width+pad*2));
    const rows=[];let cur=[],cw=0;ws.forEach((w,k)=>{if(cur.length&&cw+gap+w>maxW){rows.push(cur);cur=[];cw=0}cur.push(k);cw+=(cur.length>1?gap:0)+w});if(cur.length)rows.push(cur);
    const h=sz+30;rows.forEach((row,ri)=>{const tot=row.reduce((a,k)=>a+ws[k],0)+gap*(row.length-1);let xx=cx+tot/2;row.forEach(k=>{const w=ws[k],it=items[k];const y=Y+ri*(h+16);
      x.fillStyle=P.pr;rr(x,xx-w+6,y+6,w,h,h/2);x.fill();x.fillStyle=it.c;rr(x,xx-w,y,w,h,h/2);x.fill();x.lineWidth=5;x.strokeStyle=P.pr;x.stroke();
      T(x,it.t,xx-w/2,y+h*.68,`800 ${sz}px Tajawal`,it.ink||'#15202B','center',w-pad);xx-=w+gap})});return rows.length*(h+16)}
  function statsRow(x,P,s,cx,Y,w){const items=[['صح',s.c,'#1F9D63'],['غلط',s.w,'#E0484A'],['مرّر',s.p,P.ink2]];const bw=(w-40)/3,bh=150;
    items.forEach((it,k)=>{const X=cx+w/2-bw-(bw+20)*k;box(x,X,Y,bw,bh,26,P,P.sf,8,5);T(x,String(it[1]),X+bw/2,Y+88,'800 72px Changa',it[2]);T(x,it[0],X+bw/2,Y+130,'700 32px Tajawal',P.ink2)});return bh}
  function info(pub,who){const F=pub.final;const ti=who.team;const rk=F.rank.find(r=>r.i===ti)||{rank:'-',score:0,win:false};const s=F.ppl[who.id]||{c:0,w:0,p:0};
    const all=(F.titles[who.id]||[]).filter(k=>!(pub.hideT[who.id]||[]).includes(k));const gi=who.g==='f'?1:0;
    const titles=all.slice(0,3).map(k=>TITLES[k][gi]);const more=all.length-titles.length;const none=all.length?null:NONE[F.none[who.id]||0][gi];
    const tn=teamName(pub.T,ti);const status=rk.win?((pub.win.length>1?'وصلوا سوا للقمة':'رفعوا العلم عالقمة')):rk.score<0?`ضلّوا بالوادي (\u2066${rk.score}\u2069)`:`وقفوا عارتفاع ${rk.score} من ${pub.set.height}`;
    return {ti,rk,s,titles,more,none,tn,status,col:TCOL[ti]||'#FF7A3D',label:groupLabel(),who:who.id}}
  function titleItems(I,P){const it=I.titles.map(t=>({t,c:'#F4BF2A'}));if(I.more>0)it.push({t:'+'+I.more,c:P.sf,ink:P.ink});return it}
  function titlesOrNone(x,P,I,cx,y,w){if(I.titles.length)return pills(x,P,titleItems(I,P),cx,y,w,38);T(x,I.none,cx,y+46,'500 38px Tajawal',P.ink2,'center',w);return 70}
  function statsLine(x,P,s,cx,Y){const it=[['صح',s.c,'#1F9D63'],['غلط',s.w,'#E0484A'],['مرّر',s.p,P.ink2]];const h=70;x.font='800 36px Tajawal';
    const ws=it.map(i=>x.measureText(i[0]+'  '+i[1]).width+60);const tot=ws.reduce((a,b)=>a+b,0)+20*2;let xx=cx+tot/2;
    it.forEach((i,k)=>{const w=ws[k];x.fillStyle=P.sf;rr(x,xx-w,Y,w,h,h/2);x.fill();x.lineWidth=4;x.strokeStyle=P.pr;x.stroke();
      x.textAlign='right';x.direction='rtl';x.font='700 32px Tajawal';x.fillStyle=P.ink2;x.fillText(i[0],xx-28,Y+46);const lw=x.measureText(i[0]).width;
      x.font='800 40px Changa';x.fillStyle=i[2];x.fillText(String(i[1]),xx-28-lw-14,Y+50);xx-=w+20});return h}
  function ranking(x,P,pub,I,X,Y,w,avail,all){const R=pub.final.rank,n=R.length,gap=14;const rh=Math.max(82,Math.min(140,(avail-gap*(n-1))/n));
    R.forEach((r,k)=>{const y=Y+k*(rh+gap),mine=r.i===I.ti,col=TCOL[r.i];
      box(x,X,y,w,rh,24,P,mine?col:P.sf,mine?10:6,mine?7:4);
      if(!mine){x.save();rr(x,X,y,w,rh,24);x.clip();x.fillStyle=col;x.fillRect(X+w-18,y,18,rh);x.restore();x.lineWidth=4;x.strokeStyle=P.pr;rr(x,X,y,w,rh,24);x.stroke()}
      const ink=mine?'#15202B':P.ink,ink2=mine?'#15202B':P.ink2;const cr=rh*.3,rx=X+w-30-cr-(mine?0:10);
      x.beginPath();x.arc(rx,y+rh/2,cr,0,7);x.fillStyle=mine?'#FFFFFF':col;x.fill();x.lineWidth=4;x.strokeStyle=P.pr;x.stroke();
      T(x,String(r.rank),rx,y+rh/2+cr*.42,`800 ${Math.round(cr*1.15)}px Changa`,'#15202B');
      const ms=membersOf(pub,r.i).slice(0,3),ar=rh*.25;let ax=rx-cr-22-ar;
      ms.forEach((m,j)=>{const cx=ax-j*ar*2.15;x.save();x.beginPath();x.arc(cx,y+rh/2,ar,0,7);x.fillStyle=col;x.fill();x.clip();const im=all[m.id];
        if(im){const kk=Math.max(2*ar/im.width,2*ar/im.height);x.drawImage(im,cx-im.width*kk/2,y+rh/2-im.height*kk/2,im.width*kk,im.height*kk)}
        else{x.fillStyle='#15202B';x.font=`800 ${ar}px Changa`;x.textAlign='center';x.textBaseline='middle';x.direction='rtl';x.fillText((m.name||'؟')[0],cx,y+rh/2+ar*.1)}
        x.restore();x.lineWidth=3.5;x.strokeStyle=P.pr;x.beginPath();x.arc(cx,y+rh/2,ar,0,7);x.stroke()});
      const tx=ax-(ms.length-1)*ar*2.15-ar-20;const sw=160;const fs=Math.round(Math.min(44,rh*.36));
      const sub=r.win?'عالقمة 🏁':r.score<0?'بالوادي':'';const nameY=sub||mine?y+rh/2-2:y+rh/2+fs*.35;
      T(x,teamName(pub.T,r.i),tx,nameY,`800 ${fs}px Tajawal`,ink,'right',tx-X-sw-20);
      if(sub||mine)T(x,(mine?(who=>G(who,'فريقك','فريقِك'))(pub.P.find(p=>p.team===r.i&&p.id===I.who))||'فريقك':'')+(mine&&sub?' · ':'')+sub,tx,y+rh/2+fs*.95,`700 ${Math.round(fs*.72)}px Tajawal`,ink2,'right',tx-X-sw-20);
      T(x,'\u2066'+r.score+'\u2069',X+30+sw/2-30,y+rh/2+fs*.2,`800 ${Math.round(fs*1.25)}px Changa`,ink,'center');
      T(x,'درجة',X+30+sw/2-30,y+rh/2+fs*1.05,`700 ${Math.round(fs*.6)}px Tajawal`,ink2,'center')});return n*(rh+gap)}
  function footer(x,P){T(x,'\u2066@eyad.hloubi\u2069 · صار بدها قعدة.',W/2,H-64,'700 36px Tajawal',P.ink2)}
  /* ---- ستوري الفريق ---- */
  function tinfo(pub,ti){const F=pub.final;const rk=F.rank.find(r=>r.i===ti)||{rank:1,score:0,win:false,c:0};
    const ms=membersOf(pub,ti).map(p=>{const all=(F.titles[p.id]||[]).filter(k=>!(pub.hideT[p.id]||[]).includes(k));const gi=p.g==='f'?1:0;
      return {p,titles:all.map(k=>TITLES[k][gi]),none:NONE[F.none[p.id]||0][gi],s:F.ppl[p.id]||{c:0,w:0,p:0}}});
    const word=['','الأولى','التانية','التالتة','الرابعة'][rk.rank]||String(rk.rank);
    const status=rk.win?(pub.win.length>1?'وصلوا سوا للقمة':'رفعوا العلم عالقمة'):rk.score<0?'ضلّوا بالوادي':`وقفوا عارتفاع ${rk.score} من ${pub.set.height}`;
    let c=0,w=0;ms.forEach(m=>{c+=m.s.c;w+=m.s.w});
    return {ti,rk,ms,word,status,c,w,col:TCOL[ti],tn:teamName(pub.T,ti),label:groupLabel(),n:F.rank.length,win:rk.win}}
  function coverImg(x,img,X,Y,w,h){const k=Math.max(w/img.width,h/img.height);x.drawImage(img,X+(w-img.width*k)/2,Y+(h-img.height*k)/2,img.width*k,img.height*k)}
  function shade(hex,amt){const n=parseInt(hex.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const f=amt<0?0:255,t=Math.abs(amt);r=Math.round(r+(f-r)*t);g=Math.round(g+(f-g)*t);b=Math.round(b+(f-b)*t);return `rgb(${r},${g},${b})`}
  function hero(x,P,I,all,gp,X,Y,w,h){x.save();x.beginPath();x.rect(X,Y,w,h);x.clip();
    if(gp){coverImg(x,gp,X,Y,w,h)}
    else{const k=Math.max(1,I.ms.length),cols=k<=1?1:k<=4?2:3,rows=Math.ceil(k/cols);const th=h/rows;
      I.ms.forEach((m,j)=>{const r=Math.floor(j/cols),inRow=r===rows-1?k-r*cols:cols,cw=w/inRow,c=j-r*cols;const tx=X+w-(c+1)*cw,ty=Y+r*th;
        x.fillStyle=shade(I.col,((r+c)%2)*.18-.06);x.fillRect(tx,ty,cw,th);const im=all[m.p.id];
        if(im)coverImg(x,im,tx,ty,cw,th);else{x.fillStyle='rgba(21,32,43,.85)';x.font=`800 ${Math.min(cw,th)*.5}px Changa`;x.textAlign='center';x.textBaseline='middle';x.direction='rtl';x.fillText((m.p.name||'؟')[0],tx+cw/2,ty+th/2+th*.04)}
        x.lineWidth=5;x.strokeStyle='rgba(21,32,43,.9)';x.strokeRect(tx,ty,cw,th)});
      if(!I.ms.length){x.fillStyle=I.col;x.fillRect(X,Y,w,h)}}
    x.restore()}
  function star(x,cx,cy,r,pts,inner){x.beginPath();for(let i=0;i<pts*2;i++){const a=-Math.PI/2+i*Math.PI/pts,rr2=i%2?r*inner:r;x.lineTo(cx+Math.cos(a)*rr2,cy+Math.sin(a)*rr2)}x.closePath()}
  function rankBadge(x,P,I,cx,cy,r,rot=-.12){x.save();x.translate(cx,cy);x.rotate(rot);const gold=I.rk.rank===1;
    x.fillStyle=P.pr;star(x,8,8,r,14,.86);x.fill();x.fillStyle=gold?'#F4BF2A':'#FFFFFF';star(x,0,0,r,14,.86);x.fill();x.lineWidth=6;x.strokeStyle='#15202B';x.stroke();
    x.beginPath();x.arc(0,0,r*.7,0,7);x.lineWidth=3;x.setLineDash([6,7]);x.stroke();x.setLineDash([]);
    T(x,'المرتبة',0,-r*.28,`800 ${Math.round(r*.22)}px Tajawal`,'#15202B');T(x,String(I.rk.rank),0,r*.5,`800 ${Math.round(r*.78)}px Changa`,'#15202B');x.restore()}
  function memberChips(x,P,I,all,cx,Y,maxW,draw){const items=I.ms.map(m=>({m,t:m.p.name,sub:m.titles.length?m.titles.slice(0,2).join(' · '):m.none,gold:!!m.titles.length}));
    const h=104,gap=16,ar=36;const ws=items.map(it=>{x.font='800 36px Tajawal';const a=x.measureText(it.t).width;x.font='700 26px Tajawal';const b=x.measureText(it.sub).width;return Math.min(maxW,Math.max(a,b)+ar*2+70)});
    const rows=[];let cur=[],cw=0;ws.forEach((w,k)=>{if(cur.length&&cw+gap+w>maxW){rows.push(cur);cur=[];cw=0}cur.push(k);cw+=(cur.length>1?gap:0)+w});if(cur.length)rows.push(cur);
    if(draw)rows.forEach((row,ri)=>{const tot=row.reduce((a,k)=>a+ws[k],0)+gap*(row.length-1);let xx=cx+tot/2;row.forEach(k=>{const w=ws[k],it=items[k],y=Y+ri*(h+gap);
      box(x,xx-w,y,w,h,h/2,P,P.sf,7,5);avatar(x,all[it.m.p.id],it.m.p,xx-14-ar,y+h/2,ar,I.col,P);
      T(x,it.t,xx-ar*2-34,y+44,'800 36px Tajawal',P.ink,'right',w-ar*2-60);T(x,it.sub,xx-ar*2-34,y+82,'700 26px Tajawal',it.gold?'#C98A00':P.ink2,'right',w-ar*2-60);xx-=w+gap})});
    return rows.length*(h+gap)-gap}
  function peaks(x,P,pub,I,X,Y,w,h){const R=[...pub.final.rank].sort((a,b)=>a.rank-b.rank),n=R.length,lab=96,base=Y+h-lab,ph=h-lab-40,slot=w/n;
    x.fillStyle=P.valley;x.fillRect(X,base,w,10);
    const order=R.map((r,k)=>({r,k})).sort((a,b)=>(a.r.i===I.ti)-(b.r.i===I.ti));
    order.forEach(({r,k})=>{const mine=r.i===I.ti,cx=X+w-slot*(k+.5),hh=ph*Math.max(.32,1-(r.rank-1)*.27),hw=Math.min(slot*.56,230),top=base-hh;
      x.beginPath();x.moveTo(cx-hw,base);x.lineTo(cx,top);x.lineTo(cx+hw,base);x.closePath();x.fillStyle=mine?I.col:shade(TCOL[r.i],P.bg==='#0F161C'?-.45:.55);x.fill();x.lineWidth=mine?7:4;x.strokeStyle=P.pr;x.lineJoin='round';x.stroke();
      const sh=hh*.26;x.beginPath();x.moveTo(cx,top);x.lineTo(cx+hw*sh/hh,top+sh);x.lineTo(cx+hw*sh/hh*.4,top+sh*.8);x.lineTo(cx,top+sh*1.05);x.lineTo(cx-hw*sh/hh*.4,top+sh*.8);x.lineTo(cx-hw*sh/hh,top+sh);x.closePath();x.fillStyle=P.snow;x.fill();x.lineWidth=mine?5:3;x.stroke();
      if(mine||r.win)flag(x,cx,top-2,mine?96:70,TCOL[r.i],P,mine?1.4:1);
      T(x,'⁦'+r.score+'⁩',cx,base-14-(hh>140?hh*.35:0),`800 ${mine?50:36}px Changa`,mine?'#15202B':P.ink,'center');
      const cr=mine?26:22;x.beginPath();x.arc(cx+Math.min(slot*.36,110),base+48,cr,0,7);x.fillStyle=mine?'#15202B':P.sf;x.fill();x.lineWidth=3;x.strokeStyle=P.pr;x.stroke();
      T(x,String(r.rank),cx+Math.min(slot*.36,110),base+48+cr*.42,`800 ${cr}px Changa`,mine?'#FFFFFF':P.ink);
      T(x,teamName(pub.T,r.i),cx+Math.min(slot*.36,110)-cr-12,base+60,`800 ${mine?34:28}px Tajawal`,mine?P.ink:P.ink2,'right',slot-cr*2-30)})}
  function chip(x,P,t,cx,Y,fill,ink,fs=40){x.font=`800 ${fs}px Tajawal`;const w=Math.min(960,x.measureText(t).width+70),h=fs+34;box(x,cx-w/2,Y,w,h,h/2,P,fill,7,5);T(x,t,cx,Y+h*.67,`800 ${fs}px Tajawal`,ink,'center',w-40);return h}
  function sticker(x,P,t,cx,cy,rot,fill,ink,fs){x.save();x.translate(cx,cy);x.rotate(rot);x.font=`800 ${fs}px Changa`;const w=x.measureText(t).width+60,h=fs+36;box(x,-w/2,-h/2,w,h,16,P,fill,7,5);T(x,t,0,fs*.36,`800 ${fs}px Changa`,ink);x.restore()}
  async function build(ti,lay,th){await Promise.all(['800 60px Changa','700 60px Changa','800 40px Tajawal','700 40px Tajawal','500 40px Tajawal'].map(f=>document.fonts.load(f,'قعدة عالقمة abc 123').catch(()=>{})));
    const pub=PUB,P=pal(th==='dark'),I=tinfo(pub,ti);const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
    const all={};for(const q of pub.P)all[q.id]=await load(PH[q.id]);const gp=await load(PH._group);
    const PK=I.n<=2?300:340;const mH=memberChips(x,P,I,all,W/2,0,940,false);
    if(lay==='cover'){bg(x,P);
      const hh=Math.max(660,Math.min(960,H-110-PK-mH-330));
      hero(x,P,I,all,gp,0,0,W,hh);
      const g=x.createLinearGradient(0,hh*.55,0,hh);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,P.bg);x.fillStyle=g;x.fillRect(0,hh*.55,W,hh*.45+2);
      const g2=x.createLinearGradient(0,0,0,240);g2.addColorStop(0,'rgba(10,14,18,.55)');g2.addColorStop(1,'rgba(10,14,18,0)');x.fillStyle=g2;x.fillRect(0,0,W,240);
      sticker(x,P,'قعدة عالقمة',W-200,110,.05,'#FFFFFF','#15202B',56);
      x.font='700 34px Tajawal';const lw=Math.min(560,x.measureText(I.label).width+56);box(x,60,82,lw,62,31,P,I.col,6,4);T(x,I.label,60+lw/2,124,'700 34px Tajawal','#15202B','center',lw-30);
      rankBadge(x,P,I,W-170,hh-150,128);
      let y=hh+92;const ns=shrink(x,I.tn,124,800,'Changa',940,64);T(x,I.tn,W/2,y,`800 ${ns}px Changa`,P.ink,'center',940);
      y+=40;y+=chip(x,P,I.status,W/2,y,I.col,'#15202B',38)+36;
      memberChips(x,P,I,all,W/2,y,940,true);y+=mH+30;
      peaks(x,P,pub,I,60,Math.max(y,H-120-PK),960,PK)}
    else if(lay==='pola'){bg(x,P,I.col);
      T(x,'قعدة عالقمة',W/2,108,'800 60px Changa',P.ink);T(x,I.label,W/2,162,'700 34px Tajawal',P.ink2,'center',900);
      const fw=880,iw=fw-60,ih=Math.max(470,Math.min(615,H-110-PK-mH-560)),fh=ih+190,top=210;
      x.save();x.translate(W/2,top+fh/2);x.rotate(-.035);box(x,-fw/2,-fh/2,fw,fh,8,P,'#FFFFFF',16);
      hero(x,P,I,all,gp,-iw/2,-fh/2+30,iw,ih);x.lineWidth=4;x.strokeStyle='#15202B';x.strokeRect(-iw/2,-fh/2+30,iw,ih);
      const ns=shrink(x,I.tn,86,800,'Changa',iw-60,52);T(x,I.tn,0,fh/2-74,`800 ${ns}px Changa`,'#15202B','center',iw-60);
      T(x,'صار بدها قعدة.',0,fh/2-26,'700 28px Tajawal','#7A8790','center');
      x.fillStyle='rgba(244,191,42,.75)';[[-fw/2+40,-fh/2-6,-.5],[fw/2-40,-fh/2-6,.5]].forEach(([a,b,r])=>{x.save();x.translate(a,b);x.rotate(r);x.fillRect(-80,-22,160,44);x.restore()});x.restore();
      rankBadge(x,P,I,150,top+40,112,-.18);
      let y=top+fh+80;y+=chip(x,P,I.status,W/2,y,I.col,'#15202B',38)+36;
      memberChips(x,P,I,all,W/2,y,940,true);y+=mH+30;
      peaks(x,P,pub,I,60,Math.max(y,H-120-PK),960,PK)}
    else{bg(x,P);
      const X=60,Y=80,w=960,h=H-200;box(x,X,Y,w,h,40,P,P.sf,14);
      x.save();rr(x,X,Y,w,150,40);x.clip();x.fillStyle=I.col;x.fillRect(X,Y,w,150);x.restore();x.lineWidth=6;x.strokeStyle=P.pr;x.beginPath();x.moveTo(X,Y+150);x.lineTo(X+w,Y+150);x.stroke();
      T(x,'تصريح القمة',X+w-46,Y+78,'800 54px Changa','#15202B','right',600);T(x,'قعدة عالقمة · '+I.label,X+w-46,Y+126,'700 30px Tajawal','#15202B','right',640);
      flag(x,X+86,Y+128,90,'#FFFFFF',{pr:'#15202B'},1.2);
      const pw=w-80,ph=Math.max(380,Math.min(520,h-150-PK-mH-330));const py=Y+180;
      x.save();rr(x,X+40,py,pw,ph,22);x.clip();hero(x,P,I,all,gp,X+40,py,pw,ph);x.restore();x.lineWidth=5;x.strokeStyle=P.pr;rr(x,X+40,py,pw,ph,22);x.stroke();
      rankBadge(x,P,I,X+150,py+ph-10,112,-.15);
      let y=py+ph+96;const ns=shrink(x,I.tn,92,800,'Changa',w-300,54);T(x,I.tn,X+w-46,y,`800 ${ns}px Changa`,P.ink,'right',w-300);
      y+=56;T(x,I.status+' · '+I.c+' جواب صح',X+w-46,y,'700 34px Tajawal',P.ink2,'right',w-300);y+=34;
      x.setLineDash([14,12]);x.lineWidth=4;x.strokeStyle=P.line;x.beginPath();x.moveTo(X+40,y);x.lineTo(X+w-40,y);x.stroke();x.setLineDash([]);y+=28;
      memberChips(x,P,I,all,X+w/2,y,w-80,true);y+=mH+24;
      peaks(x,P,pub,I,X+30,Math.max(y,Y+h-30-PK),w-60,PK)}
    footer(x,P);return c}
  async function preview(ti){if(ti==null||!PUB||!PUB.final)return;const ms=membersOf(PUB,ti);
    const k=['t'+ti,LOCAL.story.lay,LOCAL.story.th,JSON.stringify(ms.map(p=>PUB.hideT[p.id]||[])),PUB.group.name,PUB.group.type,!!PH._group,ms.map(p=>!!PH[p.id]).join('')].join('|');
    if(!LOCAL.cache[k]){LOCAL.cache[k]=(await build(ti,LOCAL.story.lay,LOCAL.story.th)).toDataURL('image/png')}
    if(PUB&&LOCAL.story.ti===ti)$('#story').innerHTML=`<img src="${LOCAL.cache[k]}" alt="صورة الستوري">`}
  async function download(ti){const c=await build(ti,LOCAL.story.lay,LOCAL.story.th);c.toBlob(async b=>{const name='alqimma-'+Date.now()+'.png',f=new File([b],name,{type:'image/png'});
    if(navigator.canShare&&navigator.canShare({files:[f]})){try{await navigator.share({files:[f]});return}catch(e){if(e.name==='AbortError')return}}
    const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500)},'image/png')}
  return {build,preview,download}})();
window.Story=Story;window.E=E;
boot();
