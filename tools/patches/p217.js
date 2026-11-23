<style>/* P217: karta wyniku do wysłania, szybka gra z losowym graczem */
#shcard{display:block;width:100%;margin:8px 0 0;padding:13px 10px;border:0;border-radius:16px;background:linear-gradient(135deg,#2f7be5,#1e5ec2);color:#fff;font:900 16px system-ui;box-shadow:0 6px 16px rgba(0,0,0,.3)}
#mmbtn{display:block;width:100%;margin:8px 0;padding:13px 10px;border:0;border-radius:16px;background:linear-gradient(135deg,#ff9a2e,#e5533c)!important;color:#fff!important;font:900 16px system-ui}
#mmbtn small{display:block;font:700 11.5px system-ui;opacity:.9}
#mmst{margin:6px 0;font:700 13px system-ui;color:#ffd35a;text-align:center}
#mmst button{margin-left:6px;border:0;border-radius:10px;padding:4px 10px;background:rgba(255,255,255,.15);color:#fff;font:800 12px system-ui}
</style>
<script>/* P217: karta wyniku (obrazek do wysłania), szybka gra z losowym graczem, podpis pod logo */
(function(){try{
 const esc=s=>String(s==null?'':s);
 const ON=window.__ON,X=window.__ONX;
 const myN=()=>{try{return String(localStorage.getItem('dg_name')||(typeof pname!='undefined'&&pname)||'Ty').slice(0,12)}catch(e){return'Ty'}};
 /* ---------- 1. karta wyniku ---------- */
 function rows(){const H=holes||[],P=H.map(h=>h.par||3),R=[{n:myN(),me:1,sc:(scores||[]).slice(),tot:typeof total=='number'?total:0}];
  try{if(ON&&ON.code)for(const p of Object.values(ON.peers||{})){if(p&&p.c&&p.c!==layout)continue;R.push({n:p.n||'?',sc:(p.sc||[]).slice(),tot:+p.tot||0})}}catch(e){}
  R.forEach(r=>{r.done=r.sc.length;r.rel=r.sc.reduce((a,v,i)=>a+v-(P[i]||3),0)});R.sort((a,b)=>(b.done>=P.length)-(a.done>=P.length)||a.rel-b.rel);return{R,P}}
 function card(){const {R,P}=rows(),n=P.length,cw=1080,top=300,rowH=Math.max(110,Math.min(170,640/R.length)),ch=top+R.length*rowH+260;const c=document.createElement('canvas');c.width=cw;c.height=ch;const g=c.getContext('2d');
  const bg=g.createLinearGradient(0,0,0,ch);bg.addColorStop(0,'#1f5a34');bg.addColorStop(1,'#0b2316');g.fillStyle=bg;g.fillRect(0,0,cw,ch);
  const crd=(typeof CARDS!='undefined'&&CARDS.find(x=>x.k==layout))||{};const nm=(crd.n||layout||'').replace(/<[^>]*>/g,'');
  g.fillStyle='#fff';g.font='900 64px system-ui';g.textAlign='left';g.fillText('DISC',60,110);g.fillStyle='#7dff9a';g.fillText('GOLF',60+g.measureText('DISC ').width,110);g.fillStyle='#fff';g.fillText('PL',60+g.measureText('DISC GOLF ').width,110);
  g.font='800 44px system-ui';g.fillStyle='#ffd35a';g.fillText('🥏 '+nm,60,180);g.font='700 30px system-ui';g.fillStyle='#bfe8c8';const d=new Date();g.fillText(d.toLocaleDateString('pl-PL')+' · '+n+' dołków · par '+P.reduce((a,b)=>a+b,0)+(ON&&ON.code?' · online':''),60,230);
  const gx=60,gw=cw-120,nameW=300,totW=150,cellW=(gw-nameW-totW)/Math.max(n,1);
  R.forEach((r,ri)=>{const y=top+ri*rowH;g.fillStyle=r.me?'rgba(125,255,154,.14)':'rgba(255,255,255,.06)';g.beginPath();g.roundRect?g.roundRect(gx,y,gw,rowH-14,22):g.rect(gx,y,gw,rowH-14);g.fill();
   const mid=y+(rowH-14)/2;g.fillStyle=ri==0&&r.done>=n?'#ffd35a':'#fff';g.font='900 '+Math.round(rowH*.3)+'px system-ui';g.textAlign='left';g.fillText((ri==0&&r.done>=n?'🏆 ':(ri+1)+'. ')+esc(r.n),gx+22,mid+rowH*.11);
   for(let i=0;i<n;i++){const v=r.sc[i],x=gx+nameW+i*cellW,w=cellW-4,h=Math.min(rowH*.5,cellW*1.3);if(v==null){g.fillStyle='rgba(255,255,255,.07)'}else{const df=v-P[i];g.fillStyle=v==1?'#ffd35a':df<=-2?'#a77bff':df==-1?'#3fd16a':df==0?'rgba(255,255,255,.2)':df==1?'#ff9a2e':'#e5533c'}g.fillRect(x,mid-h/2,w,h);if(v!=null&&cellW>26){g.fillStyle=v==1||(v-P[i])<0?'#08210f':'#fff';g.font='800 '+Math.round(Math.min(cellW*.55,h*.6))+'px system-ui';g.textAlign='center';g.fillText(v,x+w/2,mid+h*.2)}}
   const rel=r.rel,txt=r.done?(rel>0?'+'+rel:rel==0?'E':String(rel)):'–';g.font='900 '+Math.round(rowH*.36)+'px system-ui';g.textAlign='right';g.fillStyle=rel<0?'#7dff9a':rel>0?'#ff9a8a':'#fff';g.fillText(txt+(r.done<n&&r.done?'*':''),gx+gw-22,mid+rowH*.13)});
  const ly=top+R.length*rowH+40;g.textAlign='left';g.font='700 26px system-ui';[['#ffd35a','ace'],['#a77bff','eagle'],['#3fd16a','birdie'],['rgba(255,255,255,.35)','par'],['#ff9a2e','bogey'],['#e5533c','2+']].forEach(([cl,t],i)=>{const x=60+i*165;g.fillStyle=cl;g.fillRect(x,ly,30,30);g.fillStyle='#d6efdc';g.fillText(t,x+40,ly+25)});
  if(R.some(r=>r.done&&r.done<n)){g.fillStyle='#a9c9b1';g.font='600 24px system-ui';g.fillText('* runda jeszcze trwa',60,ly+75)}
  g.fillStyle='#e8ffe9';g.font='800 30px system-ui';g.textAlign='center';g.fillText('Zagraj ze mną: tylkotak7.github.io/discgolf',cw/2,ch-50);return c}
 window.__scoreCard=card;
 async function shareCard(){try{const c=card();const blob=await new Promise(r=>c.toBlob(r,'image/png'));const f=new File([blob],'discgolf-wynik.png',{type:'image/png'});
  if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:'Mój wynik – Discgolf PL',text:'Zagraj ze mną w Discgolf PL! https://tylkotak7.github.io/discgolf/'});return}
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='discgolf-wynik.png';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},2000);toast('📥 Zapisano obrazek z wynikiem')}catch(e){if(e&&e.name=='AbortError')return;toast('Nie udało się udostępnić – spróbuj jeszcze raz')}}
 setInterval(()=>{try{const end=document.getElementById('end');if(!end||end.style.display=='none')return;const w=end.querySelector('.ewrap');if(!w||document.getElementById('shcard'))return;const b=document.createElement('button');b.id='shcard';b.textContent='📤 Wyślij kartę wyniku';b.onclick=e=>{e.stopPropagation();shareCard()};const er=document.getElementById('er');(er&&er.nextSibling)?w.insertBefore(b,er.nextSibling):w.appendChild(b)}catch(e){}},500);
 /* ---------- 2. szybka gra z losowym graczem ---------- */
 if(ON&&X){let mm=null;const live=()=>Object.values(ON.peers||{}).filter(p=>Date.now()-(+p.at||0)<90000);
  const DBx=()=>{try{return typeof DB!='undefined'?DB:null}catch(e){return null}};
  const _rs=X.RS.roomSet;X.RS.roomSet=function(c,d){if(mm&&mm.creating)d=Object.assign({},d,{pub:true});if(mm&&mm.code===c)mm.data=d;return _rs.apply(this,[c,d])};
  async function list(){const D=DBx();if(!D)return[];const out=[];const add=(id,v)=>{if(v&&v.pub&&Date.now()-(+v.at||0)<75000&&id!==(ON.code||''))out.push({id,v})};
   try{const q=await D.collection('pokoje').where('pub','==',true).get();q.forEach(d=>add(d.id,d.data()))}catch(e){}
   try{const q=await D.collection('kariera').where('kind','==','room').where('pub','==',true).get();q.forEach(d=>{const v=d.data();add(v.room,v)})}catch(e){}
   return out.sort((a,b)=>(+a.v.at0||+a.v.at)-(+b.v.at0||+b.v.at))}
  const st=(t,cancel)=>{let e=document.getElementById('mmst');const c=X.sh&&X.sh.querySelector('.c');if(!c)return;if(!e){e=document.createElement('div');e.id='mmst';c.appendChild(e)}e.innerHTML=t+(cancel?'<button>Anuluj</button>':'');const b=e.querySelector('button');if(b)b.onclick=stop};
  function stop(){if(!mm)return;const m=mm;mm=null;clearInterval(m.iv);if(m.code&&ON.code===m.code&&ON.host){try{_rs(m.code,Object.assign({},m.data||{},{pub:false,at:Date.now()}))}catch(e){}}const e=document.getElementById('mmst');if(e)e.remove()}
  async function join(code){X.view();X.sh.classList.add('on');await new Promise(r=>setTimeout(r,120));const i=document.getElementById('oncode');if(i){i.value=code;X.act('join')}}
  async function search(){if(mm)return;if(!DBx()){toast('⏳ Brak połączenia z serwerem – szybka gra działa w wersji z GitHuba');return}mm={t0:Date.now()};st('🔎 Szukam gracza…',true);
   const L=await list();if(!mm)return;const free=L.find(r=>!r.v.full);if(free){const m=mm;mm=null;st('✅ Znaleziono gracza – dołączam…');await join(free.id);return}
   /* nikt nie czeka – tworzymy publiczny pokój i czekamy */
   mm.creating=true;try{await X.act('new')}catch(e){}mm&&(mm.creating=false);if(!mm)return;mm.code=ON.code;mm.at0=Date.now();if(mm.data)mm.data.at0=mm.at0;st('⏳ Czekam na losowego gracza… (pole: '+((CARDS.find(c=>c.k==layout)||{}).n||layout)+')',true);
   mm.iv=setInterval(async()=>{try{if(!mm||!ON.code||ON.code!==mm.code){stop();return}
     if(live().length){const m=mm;st('🎉 Gracz dołączył – start za 3 s…');clearInterval(m.iv);setTimeout(()=>{try{_rs(m.code,Object.assign({},m.data||{},{pub:false,at:Date.now()}))}catch(e){}mm=null;const e=document.getElementById('mmst');if(e)e.remove();X.act('play')},3000);return}
     _rs(mm.code,Object.assign({},mm.data||{},{pub:true,at:Date.now(),at0:mm.at0}));
     /* dwa szukające naraz: wcześniejszy pokój wygrywa */
     const L2=await list();const older=L2.find(r=>(+r.v.at0||+r.v.at)<mm.at0&&r.id!==mm.code);if(older){const code=older.id;stop();try{X.act('leave')}catch(e){}st('✅ Znaleziono gracza – dołączam…');setTimeout(()=>join(code),400)}
     if(Date.now()-mm.t0>180000){stop();st('Nikt teraz nie szuka gry – spróbuj później albo zaproś znajomego kodem.')}}catch(e){}},5000)}
  window.__mmSearch=search;
  setInterval(()=>{try{const c=X.sh&&X.sh.querySelector('.c');if(!c||ON.code&&!mm)return;if(ON.code)return;if(c.querySelector('#mmbtn'))return;const b=document.createElement('button');b.id='mmbtn';b.innerHTML='🎲 Szukaj gracza<small>szybka gra z kimś losowym – bez kodu</small>';b.onclick=()=>search();const h3=c.querySelector('h3');h3&&h3.nextSibling?c.insertBefore(b,h3.nextSibling.nextSibling||null):c.prepend(b)}catch(e){}},400)}
 /* ---------- 3. podpis pod logo ---------- */
 setInterval(()=>{try{const p=document.querySelector('#v-main .logo p');if(!p)return;const n=(typeof CARDS!='undefined'?CARDS.filter(c=>!c.lock&&c.k!='noc'&&!c.ev).length:5);const t=n+' PÓL · SEZON 2026';if(p.textContent!==t)p.textContent=t}catch(e){}},1500);
}catch(e){console.warn('P217',e)}})();
</script>
