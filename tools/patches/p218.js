<style>/* P218: ekran ładowania przy zmianie pory roku, licznik graczy online */
#sload{position:fixed;inset:0;z-index:2147482000;background:radial-gradient(circle at 50% 38%,rgba(36,89,58,.96),rgba(11,35,22,.98) 75%);display:none;flex-direction:column;align-items:center;justify-content:center;font-family:system-ui,sans-serif;color:#fff}
#sload.on{display:flex}
#sload .d{font-size:64px;animation:slspin 1.1s linear infinite}
#sload.w .d{animation:slspin 2.4s linear infinite}
@keyframes slspin{to{transform:rotate(360deg)}}
#sload b{margin-top:18px;font:900 22px system-ui}
#sload i{margin-top:6px;font:700 13px system-ui;font-style:normal;color:#bfe8c8}
#mmcnt{margin:-2px 0 8px;text-align:center;font:800 13px system-ui;color:#bfe8c8}
#mmcnt .g{display:inline-block;width:9px;height:9px;border-radius:50%;background:#3fd16a;margin-right:6px;box-shadow:0 0 8px #3fd16a}
</style>
<div id="sload"><div class="d">❄️</div><b>Ładuję zimę…</b><i>chwilka, rysuję pola</i></div>
<script>/* P218 */
(function(){try{
 /* ---------- 1. zmiana pory roku: ekran ładowania zamiast zamrożonego menu ---------- */
 const SL=document.getElementById('sload');const TXT={winter:['❄️','Ładuję zimę…'],autumn:['🍂','Ładuję jesień…'],summer:['☀️','Ładuję lato…']};
 const ix=wn=>typeof bgIdx=='function'?bgIdx(wn):(wn?1:0);
 let gen=0;
 const _mb=menuBg;
 menuBg=function(){const h=ZL&&ZL[0];if(!h||!window.__prebuild||(window.__MBG&&window.__MBG[season])||BGC.get(h)?.[ix(season=='winter')])return _mb.apply(this,arguments);
  const my=++gen,se=season;const t=TXT[se]||TXT.summer;SL.querySelector('.d').textContent=t[0];SL.querySelector('b').textContent=t[1];const bt=document.getElementById('boot');const bootOn=bt&&bt.isConnected&&getComputedStyle(bt).display!='none'&&getComputedStyle(bt).opacity!='0';if(!bootOn)SL.classList.add('on');window.__sBusy=1;
  (async()=>{try{for(let n=0;n<200&&my===gen&&!BGC.get(h)?.[ix(se=='winter')];n++){await window.__prebuild(h);if(!BGC.get(h)?.[ix(se=='winter')])await new Promise(r=>setTimeout(r,150))}}catch(e){}
   if(my!==gen)return;try{_mb()}catch(e){}setTimeout(()=>{if(my===gen){SL.classList.remove('on');window.__sBusy=0}},250)})()};
 /* gra nie może ruszyć, póki miniatura w tle buduje ten sam dołek */
 const _ens=ensureBG;ensureBG=function(h,cb){if(window.__thbH&&window.__thbH===h){try{$('ld').style.display='flex'}catch(e){}const w=()=>{if(window.__thbH===h)return setTimeout(w,80);_ens(h,cb)};setTimeout(w,80);return false}return _ens.apply(this,arguments)};
 /* ---------- 2. ilu graczy jest online (przy „Szukaj gracza”) ---------- */
 const ON=window.__ON,X=window.__ONX;if(!ON||!X)return;
 const DBx=()=>{try{return typeof DB!='undefined'?DB:null}catch(e){return null}};
 let cnt=null,pub=0,lastQ=0;
 async function count(){const D=DBx();if(!D)return;lastQ=Date.now();const lim=Date.now()-100000,ids=new Set();let p=0;
  try{const q=await D.collection('pokoje').where('pt','>',lim).get();q.forEach(d=>{if(d.id.startsWith('on-'))ids.add(d.id)})}catch(e){}
  try{const q=await D.collection('kariera').where('kind','==','on').get();q.forEach(d=>{const v=d.data();if(v&&+v.pt>lim)ids.add(d.id)})}catch(e){}
  try{const q=await D.collection('pokoje').where('pub','==',true).get();q.forEach(d=>{const v=d.data();if(v&&Date.now()-(+v.at||0)<75000&&d.id!==ON.code)p++})}catch(e){}
  ids.add('on-'+X.me());cnt=ids.size;pub=p;show()}
 function show(){const b=document.getElementById('mmbtn');if(!b)return;let e=document.getElementById('mmcnt');if(!e){e=document.createElement('div');e.id='mmcnt';b.after(e)}
  if(!DBx()){e.textContent='licznik graczy działa w wersji z GitHuba';return}
  if(cnt==null){e.textContent='sprawdzam, kto gra…';return}
  const os=n=>n==1?'osoba':(n%10>=2&&n%10<=4&&(n%100<12||n%100>14))?'osoby':'osób';
  e.innerHTML='<span class="g"></span>'+cnt+' '+os(cnt)+' online'+(pub?' · '+pub+' '+(pub==1?'czeka':'czekają')+' na grę':'')}
 setInterval(()=>{try{if(!document.getElementById('mmbtn'))return;show();if(Date.now()-lastQ>15000)count()}catch(e){}},700);
}catch(e){console.warn('P218',e)}})();
</script>
