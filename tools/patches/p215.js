<style>/* P215: rewanż z akceptacją */
#onrv{position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom) + 92px);transform:translateX(-50%);z-index:9500;width:min(92vw,380px);background:rgba(12,30,20,.96);border:2px solid #3fd16a;border-radius:20px;padding:12px 14px;color:#fff;box-shadow:0 12px 30px rgba(0,0,0,.45);font:700 14px system-ui;display:none}
#onrv.on{display:block}
#onrv h4{margin:0 0 6px;font:900 18px 'Baloo 2',system-ui}
#onrv .pl{display:flex;flex-wrap:wrap;gap:6px;margin:4px 0 10px}
#onrv .pl span{padding:3px 9px;border-radius:10px;background:rgba(255,255,255,.08);font:800 12.5px system-ui}
#onrv .pl span.ok{background:rgba(63,209,106,.22);color:#7dff9a}#onrv .pl span.no{background:rgba(229,57,47,.22);color:#ff9a8a}
#onrv .bt{display:flex;gap:8px}#onrv .bt button{flex:1;border:0;border-radius:14px;padding:11px 8px;font:900 15px system-ui;color:#08210f;background:#3fd16a}
#onrv .bt button.n{background:rgba(255,255,255,.12);color:#fff}
#onrv small{display:block;margin-top:6px;color:#a9d9b6;font:700 12px system-ui}
</style>
<script>/* P215: rewanż – każdy może zaproponować, reszta akceptuje albo odrzuca; start, gdy wszyscy chcą */
(function(){try{const ON=window.__ON,X=window.__ONX;if(!ON||!X)return;
 const esc=s=>String(s==null?'':s).replace(/[<>&"]/g,'');
 const live=()=>Object.entries(ON.peers||{}).filter(([id,p])=>Date.now()-(+p.at||0)<90000);
 const myN=()=>{try{return String(pname||SV.nick||'Ty').slice(0,12)}catch(e){return'Ty'}};
 /* aktualna propozycja = najnowsza (t) wśród graczy */
 function req(){let r=null;const all=[['me',{n:myN(),rv:ON.rv}]].concat(live());for(const [id,p] of all){const v=p.rv;if(v&&v.s=='want'&&v.by&&(!r||v.t>r.t))r={t:v.t,by:v.by,id}}if(r&&Date.now()-r.t>10*60000)return null;return r}
 function st(p,t){const v=p&&p.rv;if(!v||v.t!==t)return'wait';return v.s=='want'?'ok':v.s=='no'?'no':'wait'}
 let started=0,hid=0;
 function propose(){ON.rv={t:Date.now(),s:'want',by:myN(),mine:1};try{X.send()}catch(e){}ui()}
 function answer(yes){const r=req();if(!r)return;ON.rv={t:r.t,s:yes?'want':'no',by:r.by,mine:(ON.rv&&ON.rv.t===r.t&&ON.rv.mine)?1:0};try{X.send()}catch(e){}ui()}
 const el=document.createElement('div');el.id='onrv';document.body.appendChild(el);
 function ui(){try{if(!ON.code||playing){el.classList.remove('on');return}const r=req();const endOn=(()=>{const e=document.getElementById('end');return e&&e.style.display!='none'})();
  /* przycisk na karcie końca rundy */
  const ox=document.querySelector('#end .onx');if(ox){ox.querySelectorAll('.rv,p').forEach(b=>{if(/Rewanż/.test(b.textContent))b.style.display='none'});let b=ox.querySelector('.rv2');if(!b){b=document.createElement('button');b.className='rv rv2';b.onclick=e=>{e.stopPropagation();propose()};ox.prepend(b)}b.style.display=r?'none':'';b.textContent='🔁 Rewanż – zaproponuj kolejną rundę'}
  if(!r||hid===r.t){el.classList.remove('on');return}
  const mine=st({rv:ON.rv},r.t),L=live();const ppl=[[myN()+' (Ty)',mine]].concat(L.map(([id,p])=>[p.n||'?',st(p,r.t)]));
  const okN=ppl.filter(x=>x[1]=='ok').length,noN=ppl.filter(x=>x[1]=='no').length,wait=ppl.filter(x=>x[1]=='wait').length;
  const hostOk=ON.host?mine=='ok':true;
  const iAm=!!(ON.rv&&ON.rv.mine&&ON.rv.t===r.t);const noList=ppl.filter(x=>x[1]=='no').map(x=>x[0]);let h='<h4>🔁 '+(iAm?'Proponujesz rewanż':esc(r.by)+' chce rewanż!')+'</h4><div class="pl">'+ppl.map(([n,s])=>'<span class="'+s+'">'+(s=='ok'?'✅ ':s=='no'?'❌ ':'⏳ ')+esc(n)+'</span>').join('')+'</div>';
  if(mine=='wait')h+='<div class="bt"><button data-y>✅ Gram</button><button class="n" data-n>❌ Nie tym razem</button></div>';
  else if(mine=='no')h+='<small>Odrzuciłeś rewanż.</small><div class="bt"><button data-y>Jednak gram</button></div>';
  else if(noN)h+='<small>❌ '+esc(noList.join(', '))+' '+(noN>1?'odrzucili':'odrzucił(a)')+' rewanż.</small><div class="bt"><button data-p>🔁 Zaproponuj ponownie</button><button class="n" data-c>Zamknij</button></div>';else h+='<small>'+(wait?'⏳ Czekam, aż reszta kliknie… ('+okN+'/'+(okN+wait)+')':ON.host?'🏁 Wszyscy grają – startuję rundę…':'🏁 Wszyscy grają – host zaczyna rundę')+'</small><div class="bt"><button class="n" data-n>Wycofaj się</button></div>';
  if(el._h!==h){el._h=h;el.innerHTML=h;const y=el.querySelector('[data-y]'),n=el.querySelector('[data-n]');if(y)y.onclick=()=>answer(true);if(n)n.onclick=()=>answer(false);const pp=el.querySelector('[data-p]'),cc=el.querySelector('[data-c]');if(pp)pp.onclick=()=>propose();if(cc)cc.onclick=()=>{hid=r.t;el.classList.remove('on')}}
  el.classList.add('on');
  /* start: wszyscy odpowiedzieli, co najmniej 2 chcą, host chce */
  if(ON.host&&!wait&&!noN&&okN>=2&&hostOk&&started!==r.t){started=r.t;setTimeout(()=>{try{el.classList.remove('on');try{quitToMenu()}catch(x){}setTimeout(()=>X.act('play'),150)}catch(e){}},900)}
 }catch(e){}}
 setInterval(ui,500);
 /* po starcie nowej rundy kasujemy propozycję */
 let wasP=false;setInterval(()=>{try{if(playing&&!wasP){ON.rv=null}wasP=!!playing}catch(e){}},400);
 window.__rvUI=ui;
}catch(e){console.warn('P215',e)}})();
</script>
