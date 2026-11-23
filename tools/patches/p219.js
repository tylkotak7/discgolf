<style>/* P219: ekran ładowania – mapka dołka buduje się na oczach */
#ld.ldb #ldc{display:none!important}
#onsh #onplay{display:none!important}
#ldbx{display:none;flex-direction:column;align-items:center;gap:10px;width:min(86vw,330px)}
#ld.ldb #ldbx{display:flex}
#ldbx .hd{text-align:center;font-family:'Baloo 2',system-ui}
#ldbx .hd small{display:block;font:800 11px system-ui;letter-spacing:.1em;text-transform:uppercase;color:#9fe0b0}
#ldbx .hd b{display:block;font-size:30px;line-height:1.05;color:#fff}
#ldbx .hd em{font-style:normal;font:800 15px 'Baloo 2',system-ui;color:#ffd35a}
#ldbc{width:min(58vw,240px)!important;height:auto!important;aspect-ratio:360/560;position:static!important;flex:0 0 auto!important;transform:none!important;border-radius:18px;border:3px solid rgba(255,255,255,.9);box-shadow:0 14px 34px rgba(0,0,0,.55);background:#2c5c2c}
#ldbx .st{font:800 14px system-ui;color:#e3f7e8;min-height:18px}
#ldbx .bar{width:100%;height:8px;border-radius:4px;background:rgba(255,255,255,.12);overflow:hidden}
#ldbx .bar i{display:block;height:100%;width:0;border-radius:4px;background:linear-gradient(90deg,#a4ffb8,#3fd16a)}
</style>
<script>/* P219: ekran ładowania – mapka dołka buduje się (teren, ścieżka, drzewa, tee, kosz), tło liczone w tle */
(function(){try{
 const LD=document.getElementById('ld');if(!LD)return;
 const bx=document.createElement('div');bx.id='ldbx';bx.innerHTML='<div class="hd"><small></small><b></b><em></em></div><canvas id="ldbc" width="720" height="1120"></canvas><div class="st"></div><div class="bar"><i></i></div>';
 LD.insertBefore(bx,LD.firstChild);
 const cv=bx.querySelector('canvas'),x=cv.getContext('2d'),stE=bx.querySelector('.st'),barE=bx.querySelector('.bar i');
 let S=null,raf=0,done=false;
 /* deterministyczny los */
 const rng=seed=>{let s=seed>>>0||1;return()=>(s=(s*1664525+1013904223)>>>0)/4294967296};
 const dSeg=(px,py,a,b)=>{const dx=b[0]-a[0],dy=b[1]-a[1],l=dx*dx+dy*dy||1;let t=((px-a[0])*dx+(py-a[1])*dy)/l;t=t<0?0:t>1?1:t;return Math.hypot(px-a[0]-t*dx,py-a[1]-t*dy)};
 const dPoly=(px,py,P)=>{let m=1e9;if(!P||P.length<2)return m;for(let i=1;i<P.length;i++){const d=dSeg(px,py,P[i-1],P[i]);if(d<m)m=d}return m};
 const plen=P=>{let l=0;for(let i=1;i<P.length;i++)l+=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);return l};
 const pAt=(P,f)=>{const L=plen(P)*f;let a=0;for(let i=1;i<P.length;i++){const s=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);if(a+s>=L){const t=(L-a)/(s||1);return[P[i-1][0]+(P[i][0]-P[i-1][0])*t,P[i-1][1]+(P[i][1]-P[i-1][1])*t]}a+=s}return P[P.length-1]};
 function prep(h){const wn=season=='winter',au=season=='autumn',U=h.U||{},sw=!!(h.sw||h.urb);
  const path=(h.path&&h.path.length>1)?h.path:[h.tee,h.b];const cw=h.cw||80;
  const roads=[].concat((h.roads||[]).map(r=>({p:r.pts,w:r.w||12})),(U.roads||[]).map(r=>({p:r.p||r.pts,w:r.w||14}))).filter(r=>r.p&&r.p.length>1);
  const mead=h.mead||[],meadA=mead.reduce((a,m)=>a+Math.max(0,m[2]-m[0])*Math.max(0,m[3]-m[1]),0);
  const R=rng(Math.round(h.tee[0]*7+h.tee[1]*13+h.b[0]*3+h.b[1]*17));const T=[];
  const inWater=(px,py)=>(h.water||[]).some(w=>{const rx=w[2]/2,ry=w[3]/2;return((px-w[0]-rx)/rx)**2+((py-w[1]-ry)/ry)**2<1.3})||(h.rivers||[]).some(r=>px>r[0]-6&&px<r[2]+6&&py>r[1]-6&&py<r[3]+6);
  const free=(px,py,r)=>{if(Math.hypot(px-h.tee[0],py-h.tee[1])<28+r||Math.hypot(px-h.b[0],py-h.b[1])<30+r)return false;if(dPoly(px,py,path)<cw*.55+r*.4)return false;for(const q of roads)if(dPoly(px,py,q.p)<q.w/2+r*.6+3)return false;if(inWater(px,py))return false;
   if(meadA<360*560*.4)for(const m of mead)if(px>m[0]-r*.3&&px<m[2]+r*.3&&py>m[1]-r*.3&&py<m[3]+r*.3)return false;return true};
  if(!sw&&(h._forest||h.lub||['zlotow','z22','noc','lubon'].includes(typeof layout!='undefined'?layout:''))){for(let gy=-6;gy<580;gy+=17)for(let gx=-6;gx<372;gx+=17){const px=gx+(R()-.5)*12,py=gy+(R()-.5)*12,r=8+R()*6;if(free(px,py,r))T.push([px,py,r,R()])}}
  for(const t of h.trees||[])if(t&&isFinite(t[0]))T.push([t[0],t[1],Math.max(5,Math.min(26,(t[2]||12)*.9)),R(),1]);
  /* kolejność sadzenia: od dalszych od toru gry do bliższych, z odrobiną losowości */
  T.forEach(t=>t.o=-dPoly(t[0],t[1],path)*.6+R()*120);T.sort((a,b)=>a.o-b.o);
  const B=(U.bld||[]).map(b=>({c:b.c,u:b.u,v:b.v,a:b.a||10,b:b.b||10,fc:b.fc||0}));
  const pal=wn?{g0:'#dfe9ee',g1:'#c6d5dd',fw:'#f6fafc',rd:'#aeb8be',wa:'#9cc8dc',md:'rgba(255,255,255,.55)',tr:['#2c5a44','#335f49','#24503b'],sn:1}
   :au?{g0:'#7c8a3c',g1:'#5c6a2c',fw:'#b9c46e',rd:'#b39a6a',wa:'#3f7fb0',md:'rgba(196,170,80,.45)',tr:['#c86a22','#d9a52b','#8a3a18','#a8501c','#2c5a34']}
   :{g0:'#5f9a48',g1:'#3f7a36',fw:'#9fd27a',rd:'#b59a6a',wa:'#3f7fb0',md:'rgba(170,200,90,.5)',tr:['#1f5a2a','#2a6a32','#174a22','#2f7434']};
  if(sw){pal.g0=wn?'#d8dee2':'#8d9590';pal.g1=wn?'#c4ccd2':'#6f7772';pal.rd=wn?'#9aa3aa':'#4a4f55'}
  return{h,path,cw,roads,T,B,pal,sw,U,len:plen(path),t0:performance.now(),dl:0}}
 const E=t=>t<0?0:t>1?1:1-Math.pow(1-t,3);
 const pop=t=>{if(t<=0)return 0;if(t>=1)return 1;return 1+Math.sin(t*Math.PI)*.35*(1-t)+(E(t)-1)};
 const STG=[[0,'🌱 Sieję trawę…'],[.45,'🛤️ Wysypuję ścieżki…'],[.8,'🌲 Sadzę drzewa…'],[1.75,'🟫 Kładę tee…'],[2.0,'🥏 Stawiam kosz…'],[2.45,'✨ Ostatnie szlify…']];
 function frame(){raf=0;if(!S||LD.style.display=='none'){S=null;return}const now=performance.now();let T=(now-S.t0)/1000*(done?3.5:1)+S.dl;if(done){S.dl=T;S.t0=now}S.lastT=T;
  const {h,path,cw,roads,pal}=S;x.setTransform(2,0,0,2,0,0);
  /* teren */
  const gr=x.createLinearGradient(0,0,0,560);gr.addColorStop(0,pal.g0);gr.addColorStop(1,pal.g1);x.fillStyle='#0d2414';x.fillRect(0,0,360,560);x.globalAlpha=E(T/.35);x.fillStyle=gr;x.fillRect(0,0,360,560);if(!S.sp){const R=rng(7);S.sp=[];for(let i=0;i<420;i++)S.sp.push([R()*360,R()*560,R()<.5])}x.fillStyle=season=='winter'?'rgba(150,175,190,.35)':'rgba(0,0,0,.12)';for(const q of S.sp)if(q[2])x.fillRect(q[0],q[1],2,2);x.fillStyle='rgba(255,255,255,.12)';for(const q of S.sp)if(!q[2])x.fillRect(q[0],q[1],2,2);x.globalAlpha=1;
  const a1=E((T-.15)/.45);
  if(a1>0){x.globalAlpha=a1;x.fillStyle=pal.md;for(const m of h.mead||[])x.fillRect(m[0],m[1],m[2]-m[0],m[3]-m[1]);
   if(S.sw){x.fillStyle=season=='winter'?'#eef3f5':'#6fa457';for(const p of S.U.grass||[]){if(!p||p.length<3)continue;x.beginPath();p.forEach((q,i)=>i?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1]));x.fill()}x.fillStyle=season=='winter'?'#cfd6da':'#a7aaa6';for(const p of S.U.lots||[]){if(!p||p.length<3)continue;x.beginPath();p.forEach((q,i)=>i?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1]));x.fill()}}
   x.fillStyle=pal.wa;for(const r of h.rivers||[])x.fillRect(r[0],r[1],(r[2]-r[0])*a1,r[3]-r[1]);for(const w of h.water||[]){x.beginPath();x.ellipse(w[0]+w[2]/2,w[1]+w[3]/2,w[2]/2*a1,w[3]/2*a1,0,0,7);x.fill()}x.globalAlpha=1}
  /* drogi – rysują się */
  x.lineCap='round';x.lineJoin='round';const a2=E((T-.35)/.6);if(a2>0)for(const r of roads){const L=plen(r.p);x.strokeStyle=pal.rd;x.lineWidth=r.w;x.setLineDash([L*a2,L+10]);x.beginPath();r.p.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.stroke()}x.setLineDash([]);
  /* tor gry od tee do kosza */
  const a3=E((T-.5)/.7);if(a3>0&&!S.sw){x.strokeStyle=pal.fw;x.globalAlpha=.75;x.lineWidth=cw*.8;x.setLineDash([S.len*a3,S.len+cw*2]);x.beginPath();path.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.stroke();x.setLineDash([]);x.globalAlpha=1}
  /* budynki rosną */
  S.B.forEach((b,i)=>{const k=pop((T-.6-i*.05)/.35);if(k<=0)return;x.save();x.translate(b.c[0],b.c[1]);x.transform(b.u[0],b.u[1],b.v[0],b.v[1],0,0);x.scale(k,k);x.fillStyle='rgba(0,0,0,.3)';x.fillRect(-b.a+4,-b.b+4,b.a*2,b.b*2);x.fillStyle=season=='winter'?'#f4f7f9':['#b4563f','#8e8f92','#c9a46a','#6d7b8c','#a33f2f','#9a8b7a'][b.fc%6];x.fillRect(-b.a,-b.b,b.a*2,b.b*2);x.strokeStyle='rgba(0,0,0,.35)';x.lineWidth=1.5;x.strokeRect(-b.a,-b.b,b.a*2,b.b*2);x.restore()});
  if(S.sw){const k=E((T-1.2)/.4);if(k>0){x.globalAlpha=k;for(const c of S.U.cars||[]){x.save();x.translate(c.x,c.y);x.rotate(c.a||0);const q=c.c||[.5,.5,.5];x.fillStyle='rgb('+q.map(v=>Math.round(v*255)).join(',')+')';x.fillRect(-8,-4,16,8);x.restore()}x.globalAlpha=1}}
  /* drzewa wyskakują */
  const n=S.T.length,t0=.8,t1=1.85;S.T.forEach((t,i)=>{const k=pop((T-t0-(i/Math.max(1,n))*(t1-t0))/.28);if(k<=0)return;const r=t[2]*k;x.fillStyle='rgba(0,0,0,.28)';x.beginPath();x.arc(t[0]+r*.28,t[1]+r*.32,r,0,7);x.fill();x.fillStyle=pal.tr[Math.floor(t[3]*pal.tr.length)%pal.tr.length];x.beginPath();x.arc(t[0],t[1],r,0,7);x.fill();x.strokeStyle='rgba(0,0,0,.18)';x.lineWidth=1.2;x.stroke();
   x.fillStyle=pal.sn?'rgba(255,255,255,.85)':'rgba(255,255,255,.16)';x.beginPath();x.arc(t[0]-r*.3,t[1]-r*.3,r*(pal.sn?.5:.42),0,7);x.fill()});
  /* tee spada z góry */
  const kt=E((T-1.75)/.25);if(kt>0){const s=1+(1-kt)*1.2;x.save();x.translate(h.tee[0],h.tee[1]-(1-kt)*30);x.scale(s,s);x.globalAlpha=kt;x.fillStyle='rgba(0,0,0,.3)';x.fillRect(-10,-5,24,16);x.fillStyle=S.sw?'#9aa0a6':'#e8c07a';x.strokeStyle='#3a2a10';x.lineWidth=2;x.fillRect(-12,-8,24,16);x.strokeRect(-12,-8,24,16);x.restore();x.globalAlpha=1}
  /* kosz z odbiciem */
  const kb=(T-2.0)/.4;if(kb>0){const bb=kb>=1?0:Math.abs(Math.cos(kb*Math.PI*1.5))*(1-kb)*40;const by=h.b[1]-bb;const glow=.25+.15*Math.sin(now/220);x.fillStyle='rgba(255,210,63,'+glow+')';x.beginPath();x.arc(h.b[0],h.b[1],22,0,7);x.fill();
   x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(h.b[0]+3,h.b[1]+4,10,6,0,0,7);x.fill();x.fillStyle='#ffd23f';x.strokeStyle='#3a2a00';x.lineWidth=3;x.beginPath();x.arc(h.b[0],by,10,0,7);x.fill();x.stroke();x.strokeStyle='rgba(58,42,0,.7)';x.lineWidth=1.4;for(let i=0;i<6;i++){const a=i/6*Math.PI*2;x.beginPath();x.moveTo(h.b[0],by);x.lineTo(h.b[0]+Math.cos(a)*9,by+Math.sin(a)*9);x.stroke()}}
  /* potem dysk lata z tee do kosza */
  if(T>2.45){const f=((T-2.45)%1.5)/1.2;if(f<=1){const p=pAt(path,E(f)),z=Math.sin(f*Math.PI)*.6+1;x.fillStyle='rgba(0,0,0,.25)';x.beginPath();x.ellipse(p[0]+6*z,p[1]+8*z,6,4,0,0,7);x.fill();x.fillStyle='#ff5a3c';x.strokeStyle='#fff';x.lineWidth=2;x.beginPath();x.arc(p[0],p[1],6*z,0,7);x.fill();x.stroke()}}
  let st='';for(const s of STG)if(T>=s[0])st=s[1];if(stE.textContent!==st)stE.textContent=st;barE.style.width=Math.min(done?100:94,T/2.6*94)+'%';
  raf=requestAnimationFrame(frame)}
 function start(h){try{if(!h||!h.tee||!h.b)return;if(!S||S.h!==h){done=false;S=prep(h)}const idx=holes?holes.indexOf(h):-1;const c=(typeof CARDS!='undefined'&&CARDS.find(q=>q.k==layout))||{};
  const SN={summer:'☀️ lato',winter:'❄️ zima',autumn:'🍂 jesień'}[season]||'';const M0=h.M||.2,dist=Math.round(Math.hypot(h.tee[0]-h.b[0],h.tee[1]-h.b[1])*M0);
  bx.querySelector('small').textContent=((typeof TRN!='undefined'&&h===TRN)?'Trening':(c.n||h.name||''))+' · '+SN;bx.querySelector('b').textContent=holes&&holes.length>1&&idx>=0?'Dołek '+(idx+1):'Pole treningowe';bx.querySelector('em').textContent='par '+(h.par||3)+' · '+dist+' m';
  LD.classList.add('ldb');if(!raf)raf=requestAnimationFrame(frame)}catch(e){console.warn('P219',e);LD.classList.remove('ldb')}}
 const _ld=ldDraw;ldDraw=function(h){try{_ld.apply(this,arguments)}catch(e){}start(h)};
 window.__ldbAnim=start;
 /* zbudowane tło -> szybkie dokończenie animacji (max ~0,7 s) i schowanie */
 window.__ensA=function(h,wn,ix,cb){window.__ensAn=(window.__ensAn||0)+1;if(!window.__prebuild)return false;if(!S||S.h!==h)start(h);
  window.__ensBusy=h;(async()=>{const T0=performance.now();try{await window.__prebuild(h)}catch(e){}
   if(!BGC.get(h)?.[ix]){try{AUT3=season=='autumn';const c=build3(h,wn);AUT3=false;const e=BGC.get(h)||[];e[ix]=c;BGC.set(h,e)}catch(e){AUT3=false;console.error(e)}}
   try{while(BGC.size>3){const k=BGC.keys().next().value;if(k===h)break;try{(BGC.get(k)||[]).forEach(c=>{if(c&&c.width){c.width=c.height=0}})}catch(x){}BGC.delete(k)}}catch(e){}
   if(S&&S.h===h){S.dl=S.lastT||0;S.t0=performance.now()}done=true;const w0=performance.now();while(S&&S.h===h&&S.dl<2.45&&performance.now()-w0<700)await new Promise(r=>setTimeout(r,30));
   window.__ensBusy=null;bgBusy=false;LD.style.display='none';LD.classList.remove('ldb');S=null;try{cb&&cb()}catch(e){console.error(e)}})();return true};
}catch(e){console.warn('P219',e)}})();
</script>
