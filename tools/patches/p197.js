<script>/* P197: Orle Wągrowiec (BETA, kod 6666) – 13 dołków w lesie wg mapy discmap (WRC111): 1 lekko forhandowy, 3 pod górkę (kosz na wzniesieniu), 4 z górki, kosz pod dużym drzewem, 7 wzdłuż szerokiej drogi z mando, 13 bramka z dwóch mando. Runda beta nie liczy się do rekordów. */
(function(){try{
const plen=P=>{let l=0;for(let i=1;i<P.length;i++)l+=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);return l};
/* p – punkty z mapy (px), len – długość z discmap (po linii), wm – szerokość fairwaya w metrach */
const OD=[
 {len:65,par:3,p:[[327,1066],[520,1090],[640,1180],[760,1310],[884,1424]],wm:20,txt:'Lekko forhandowy – linia zawija w prawo'},
 {len:78,par:3,p:[[240,1247],[560,1285],[840,1303]],wm:18,open:9},
 {len:89,par:3,p:[[240,1352],[420,1335],[600,1290],[840,1198]],wm:20,slope:1,mound:1,txt:'Pod górkę – kosz stoi na wzniesieniu'},
 {len:140,par:4,p:[[483,1760],[540,1500],[590,1250],[580,1000],[515,790]],wm:20,slope:-1,bigTree:1,txt:'Z górki w dół – kosz pod dużym drzewem'},
 {len:93,par:3,p:[[840,1432],[240,1117]],wm:18,lone:1},
 {len:105,par:3,p:[[840,1190],[240,1360]],wm:20,lone:-1},
 {len:181,par:4,p:[[437,1760],[380,1530],[365,1270],[420,1050],[560,880],[703,790]],wm:30,md:[{a:86,l:13.6,side:1}],txt:'Szeroki tor · mando po prawej – mijaj je z lewej'},
 {len:245,par:5,p:[[240,1295],[806,1265]],wm:18,road:1,txt:'Długi par 5 wzdłuż leśnej drogi'},
 {len:77,par:3,p:[[560,790],[545,1300],[540,1760]],wm:18,lone:1},
 {len:122,par:4,p:[[840,1230],[500,1290],[240,1320]],wm:20},
 {len:103,par:3,p:[[330,790],[390,980],[380,1150],[310,1350],[340,1480],[450,1620],[600,1755]],wm:20},
 {len:78,par:3,p:[[627,1760],[560,1450],[500,1100],[452,790]],wm:18},
 {len:120,par:4,p:[[627,1105],[760,1220],[835,1285],[700,1345],[450,1400],[240,1445]],wm:16,md:[{a:21.8,l:-8.6,side:-1,len:12},{a:20.4,l:5.8,side:1,len:12}],txt:'Bramka z dwóch mando na zakręcie'}];
const OR=OD.map((o,i)=>{const st=Math.hypot(o.p[0][0]-o.p[o.p.length-1][0],o.p[0][1]-o.p[o.p.length-1][1]),d=Math.round(o.len*st/plen(o.p)),k=Math.min(1.3,380/(d*5)),M=.2/k;
 const h=mk({d,p:o.p,k,w:o.wm/M},5101+i*13);h.par=o.par;h.name='Orle Wągrowiec';h._forest=1;h.needles=1;h.orle=1;h.txt=o.txt;if(o.slope){h.slope=o.slope>0?.93:1.06;h.slopeTxt=(o.slope>0?'⬆ ':'⬇ ')+o.txt;h.txt=null}
 const um=m=>m/M;
 h.tt=t=>{const r=hs3(t[0]|0,t[1]|0,57);return r<.6?1:r<.75?3:r<.88?0:2};
 if(o.mound)h.mound=1;
 /* luźniejszy las przy torze: miejsce na rzut z rough-u, polanki przy tee i koszu */
 {const T0=h.tee,B0=h.b,cw=h.cw,o0=h.noF;h.thinF=(px,py)=>{const l=Math.abs(h.lat([px,py])),al=h.along([px,py]);if(al<-um(6)||al>h.L+um(8))return .25;return l<cw/2+um(14)?.6:l<cw/2+um(30)?.35:.12};
  h.noF=(x,y,r)=>(o0&&o0(x,y,r))||Math.hypot(x-T0[0],y-T0[1])<um(7)+r||Math.hypot(x-B0[0],y-B0[1])<um(8)+r;
  h.trees=h.trees.filter(t=>Math.hypot(t[0]-B0[0],t[1]-B0[1])>um(6)+t[2]*.5);
  if(o.lone){const p=h.rel(h.L*.55,o.lone*cw*.22);h.trees=h.trees.filter(t=>Math.hypot(t[0]-p[0],t[1]-p[1])>t[2]+14);h.trees.push([p[0],p[1],12,0])}}
 if(o.open){const B=h.b,R=um(o.open);h.trees=h.trees.filter(t=>Math.hypot(t[0]-B[0],t[1]-B[1])>R+t[2]*.6);const o1=h.noF;h.noF=(x,y,r)=>(o1&&o1(x,y,r))||Math.hypot(x-B[0],y-B[1])<R+r}
 if(o.bigTree){const B=h.b;h.trees=h.trees.filter(t=>Math.hypot(t[0]-B[0],t[1]-B[1])>40);h.trees.push([B[0]+13,B[1]-16,22,0])}
 if(o.road){const P=h.path.map(q=>[q[0]+um(3),q[1]]);h.roads.push({pts:P,w:um(4),f:1});h.trees=h.trees.filter(t=>Math.min(...P.map(q=>Math.hypot(t[0]-q[0],t[1]-q[1])))>um(5)/2+t[2]+4)}
 if(o.md){h.md=[];for(const m of o.md){const u=um(m.a),pm=h.rel(u,um(m.l)),pe=h.rel(u,um(m.l)+m.side*um(m.len||30));h.md.push({m:pm,e:pe,dz:null});h.trees=h.trees.filter(t=>Math.hypot(t[0]-pm[0],t[1]-pm[1])>t[2]+8);h.trees.push([pm[0],pm[1],8,1])}}
 return h});
window.OR=OR;
/* pod górkę / z górki: wbudowany spadek terenu (SLK, poziomice, opis) */
const _ld=load;load=function(){const r=_ld.apply(this,arguments);try{const h=holes[hi];if(h&&h.orle&&h.txt&&throws==0)setTimeout(()=>pill('🌲 '+h.txt),900)}catch(e){}return r};
/* wpięcie w grę */
const _st=start;start=function(){if(layout=='orle')holes=OR;return _st.apply(this,arguments)};
const okO=()=>{try{return localStorage.getItem('dg_orleok')==='1'}catch(e){return false}};
const card={k:'orle',n:'Orle Wągrowiec',d:'🧪 beta · las · 13 dołków',hl:()=>OR,bp:'50% 40%',pw:1,pwok:okO,pwask:()=>{const o=document.createElement('div');o.style.cssText='position:fixed;inset:0;z-index:96;background:rgba(0,8,4,.65);display:flex;align-items:center;justify-content:center';
 o.innerHTML='<div style="width:min(86vw,320px);background:linear-gradient(180deg,#1d3a28,#0e1d15);border-radius:20px;padding:18px;color:#fff;font-family:Baloo 2,system-ui;text-align:center"><div style="font-size:34px">🔒</div><h3 style="margin:4px 0">Orle Wągrowiec · BETA</h3><p style="margin:0 0 10px;color:#a9c9b1;font:600 13px system-ui">Wpisz kod, żeby odblokować pole</p><input id="orpw" type="password" inputmode="numeric" maxlength="8" style="width:100%;box-sizing:border-box;padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,.25);background:rgba(0,0,0,.3);color:#fff;font:900 22px system-ui;text-align:center;letter-spacing:.3em"><p id="orst" style="min-height:16px;margin:6px 0;color:#ff9a8a;font:700 12px system-ui"></p><button id="orok" style="width:100%;padding:12px;border:0;border-radius:12px;background:#3fd16a;color:#08210f;font:900 15px system-ui">Odblokuj</button><button id="orx" style="width:100%;margin-top:6px;padding:10px;border:0;border-radius:12px;background:rgba(255,255,255,.1);color:#fff;font:800 14px system-ui">Anuluj</button></div>';
 document.body.appendChild(o);const I=o.querySelector('#orpw');setTimeout(()=>I.focus(),50);const go=()=>{if(I.value.trim()==='777'){try{localStorage.setItem('dg_orleok','1')}catch(e){}o.remove();selLayout('orle');renderCards();toast('🔓 Orle Wągrowiec odblokowane')}else{o.querySelector('#orst').textContent='Zły kod';I.value=''}};o.querySelector('#orok').onclick=go;I.onkeydown=e=>{if(e.key==='Enter')go()};o.querySelector('#orx').onclick=()=>o.remove()}};
/* Orle ukryte (v225) */try{const ix=CARDS.findIndex(c=>c.k=='orle');if(ix>=0)CARDS.splice(ix,1)}catch(e){}if(typeof layout!='undefined'&&layout=='orle')layout='zlotow';

try{renderCards()}catch(e){}
const _fi=finish;finish=function(){if(layout!='orle')return _fi.apply(this,arguments);let keep=null;try{keep=localStorage.getItem('dg_topz')}catch(e){}
 const r=_fi.apply(this,arguments);try{if(keep==null)localStorage.removeItem('dg_topz');else localStorage.setItem('dg_topz',keep)}catch(e){}
 try{const er=$('er');if(er)er.insertAdjacentHTML('afterbegin','<div style="background:#5a3a12;color:#ffd35a;border-radius:10px;padding:6px 10px;margin:0 0 8px;font:800 12px system-ui">🧪 Orle Wągrowiec (beta) – runda nie liczy się do rekordów</div>')}catch(e){}return r};
try{const _so=sendOnline;sendOnline=function(){if(layout=='orle')return;return _so.apply(this,arguments)}}catch(e){}
}catch(e){console.warn('P197',e)}})();
</script>
