// بيبني public/questions.js من src/q، ومعاينة HTML بملف واحد (وضع «جرّب لحالك»)
const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..');
const qdir=path.join(root,'src','q');
let src='';for(const f of fs.readdirSync(qdir).sort())src+=fs.readFileSync(path.join(qdir,f),'utf8')+'\n';
const Q={};eval(src);
let n=0;for(const d in Q)for(const l in Q[d])n+=Q[d][l].length;
fs.writeFileSync(path.join(root,'public','questions.js'),`/* خزينة أسئلة «قعدة عالقمة» — ${n} سؤال، كل سؤال: [السؤال، الصح، غلط، غلط، غلط] */\nwindow.QBANK=${JSON.stringify(Q)};\n`);
console.log('questions:',n);
if(process.argv.includes('--preview')){
  const pub=path.join(root,'public');
  let css=fs.readFileSync(path.join(pub,'style.css'),'utf8').replace(/url\(fonts\/([^)]+)\)/g,(m,f)=>`url(data:font/woff2;base64,${fs.readFileSync(path.join(pub,'fonts',f)).toString('base64')})`);
  let html=fs.readFileSync(path.join(pub,'index.html'),'utf8');
  html=html.replace(/<link rel="(manifest|icon|apple-touch-icon|preload)"[^>]*>\n?/g,'').replace('<link rel="stylesheet" href="style.css">',`<style>${css}</style>`).replace('<title>قعدة عالقمة · قعدة رواق</title>','<title>قعدة عالقمة · معاينة</title>');
  const js=['vendor/qrcode.js','questions.js','app.js'].map(f=>fs.readFileSync(path.join(pub,f),'utf8'));
  html=html.replace(/<script src="vendor\/qrcode.js"><\/script>\n<script src="questions.js"><\/script>\n<script src="app.js"><\/script>/,()=>`<script>window.MINFOQ_PREVIEW=true;</script>\n<script>${js[0]}</script>\n<script>${js[1]}</script>\n<script>${js[2].replace(/<\/script/g,'<\\/script')}</script>`);
  const out=path.join(root,'dist');fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'alqimma-preview.html'),html);console.log('preview:',(html.length/1024).toFixed(0)+'KB');
}
