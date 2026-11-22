<style>/* P208: okno pokoju i znajomi – nowy układ, bilans */
#onsh .c.rm2{position:relative;padding-top:14px;box-sizing:border-box;max-width:100vw;overflow-x:hidden}
#onsh .rm2 h3{display:flex;align-items:center;gap:8px;padding-right:44px}
#onsh .rm2 .cx{position:absolute;top:10px;right:12px;width:36px!important;height:36px;margin:0!important;padding:0!important;border-radius:50%!important;background:rgba(255,255,255,.1)!important;color:#fff!important;font:900 16px system-ui!important}
#onsh .rm2 .sub{margin:0 0 6px!important;font:600 12.5px system-ui!important;color:#a9c9b1}
#onsh .rm2 .crow{display:flex;align-items:center;justify-content:center;gap:10px;margin:2px 0 8px}
#onsh .rm2 .crow .code{margin:0!important;font-size:36px!important}
#onsh .rm2 .crow button{width:auto!important;margin:0!important;padding:8px 10px!important;border-radius:12px!important;background:rgba(255,255,255,.1)!important;color:#fff!important;font:800 12px system-ui!important;line-height:1.2}
#onsh .rm2 .slots{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin:4px 0 10px}
#onsh .rm2 .sl{display:flex;flex-direction:column;align-items:center;gap:3px;font:800 11.5px system-ui;color:#fff;min-width:0}
#onsh .rm2 .sl .av{width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;overflow:hidden;border:2px solid rgba(125,255,154,.7);font:900 20px 'Baloo 2',system-ui;color:#7dff9a}
#onsh .rm2 .sl .av svg{width:100%;height:100%}
#onsh .rm2 .sl.e .av{border:2px dashed rgba(255,255,255,.22);color:rgba(255,255,255,.3)}
#onsh .rm2 .sl.e{color:rgba(255,255,255,.4)}
#onsh .rm2 .sl span{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#onsh .rm2 #onplay2.off{background:rgba(255,255,255,.12)!important;color:rgba(255,255,255,.55)!important;opacity:1!important}
#onsh .rm2 #onplay2 small{display:block;font:700 11.5px system-ui;opacity:.85}
#onfr .f{position:relative}
#onfr .f .who{display:flex;align-items:center;gap:8px;min-width:0;flex:1}#onfr .f .who>span:last-child{min-width:0}#onfr .f .who small{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#onfr .f>span:last-child{flex:0 0 auto}#onfr .f [data-i]{white-space:nowrap}
#onfr .f .fa{position:relative;flex:0 0 34px;width:34px;height:34px;border-radius:50%;background:#2a4a36;display:flex;align-items:center;justify-content:center;font:900 15px 'Baloo 2',system-ui;color:#7dff9a}
#onfr .f .fa i{position:absolute;right:-1px;bottom:-1px;width:11px;height:11px;border-radius:50%;background:#6c7a72;border:2px solid #17301f}
#onfr .f .fa i.on{background:#3fd16a}#onfr .f .fa i.pl{background:#ffd35a}
#onfr .f.off .who{opacity:.6}
#onfr .f .bl{display:inline-block;margin-left:6px;padding:1px 7px;border-radius:8px;font:900 11.5px system-ui;background:rgba(255,255,255,.1);color:#fff;vertical-align:1px}
#onfr .f .bl.w{background:rgba(63,209,106,.22);color:#7dff9a}#onfr .f .bl.l{background:rgba(229,57,47,.22);color:#ff9a8a}
#onfr .f [data-d]{display:none!important}#onfr .f.del [data-d]{display:inline-block!important}
#onfr .f [data-m]{padding:6px 8px!important}
#onfr .hint{font:600 11px system-ui;color:#7f9c88;margin:4px 2px 0}
#frs .bl{margin-left:6px;padding:1px 6px;border-radius:8px;font:900 11px system-ui;background:rgba(255,255,255,.1)}
#frs .bl.w{background:rgba(63,209,106,.22);color:#7dff9a}#frs .bl.l{background:rgba(229,57,47,.22);color:#ff9a8a}
</style>
<script>/* P208: okno pokoju – kod z kopiuj/udostępnij, 4 miejsca, start z licznikiem; znajomi z bilansem, zaproś, usuwanie przytrzymaniem; link ?pokoj=KOD */
(function(){try{const ON=window.__ON,X=window.__ONX;if(!ON||!X)return;const sh=X.sh,esc=s=>String(s==null?'':s).replace(/[<>&"]/g,'');
 const HI=()=>{try{return JSON.parse(localStorage.getItem('dg_ohist')||'{}')}catch(e){return{}}};
 const bil=id=>{const h=HI()[id];if(!h||!(h.w+h.l+h.d))return null;return{t:h.w+'–'+h.l,c:h.w>h.l?'w':h.w<h.l?'l':''}};
 const live=()=>Object.values(ON.peers||{}).filter(p=>Date.now()-(+p.at||0)<90000);
 const link=c=>location.origin+location.pathname+'?pokoj='+c;
 function myAv(){try{if(typeof avatarSVG=='function'&&SV&&SV.char)return avatarSVG(SV.char,1)}catch(e){}return esc(String(pname||'T')).slice(0,1).toUpperCase()}
 function slots(c){let el=c.querySelector('.slots');if(!el){el=document.createElement('div');el.className='slots';const cr=c.querySelector('.crow');(cr||c.querySelector('.code')).after(el)}
  const P=live(),h=['<div class="sl"><div class="av">'+myAv()+'</div><span>Ty'+(ON.host?' · host':'')+'</span></div>'].concat(P.slice(0,3).map(p=>'<div class="sl"><div class="av">'+esc(p.n).slice(0,1).toUpperCase()+'</div><span>'+esc(p.n)+'</span></div>'));while(h.length<4)h.push('<div class="sl e"><div class="av">+</div><span>wolne</span></div>');const s=h.join('');if(el._h!==s){el._h=s;el.innerHTML=s}}
 function room(){const c=sh.querySelector('.c');if(!c||!ON.code||!sh.classList.contains('on'))return;
  if(!c.classList.contains('rm2')){c.classList.add('rm2');const h3=c.querySelector('h3'),x=c.querySelector('[data-a=x]');if(x){x.style.display='none';const b=document.createElement('button');b.className='cx';b.textContent='✕';b.onclick=()=>x.click();c.appendChild(b)}
   const ps=c.querySelectorAll(':scope > p');if(ps[0]&&!ps[0].id){ps[0].className='sub';ps[0].textContent=ON.tour?'Turniej do 4 graczy – podaj kod albo wyślij link.':'Do 4 graczy, ten sam dołek dla wszystkich. Podaj kod albo wyślij link.'}
   const cd=c.querySelector('.code');if(cd){const row=document.createElement('div');row.className='crow';cd.before(row);row.appendChild(cd);const k=document.createElement('button');k.innerHTML='📋<br>Kopiuj';const u=document.createElement('button');u.innerHTML='📤<br>Wyślij';row.prepend(k);row.appendChild(u);
    k.onclick=async()=>{try{await navigator.clipboard.writeText(ON.code);X.stat('📋 Skopiowano kod '+ON.code)}catch(e){X.stat('Kod: '+ON.code)}};
    u.onclick=async()=>{const t='Zagraj ze mną w Discgolf PL! Kod pokoju: '+ON.code;try{if(navigator.share){await navigator.share({title:'Discgolf PL',text:t,url:link(ON.code)});return}}catch(e){if(e&&e.name=='AbortError')return}try{await navigator.clipboard.writeText(t+' '+link(ON.code));X.stat('📋 Skopiowano link do pokoju')}catch(e){X.stat(t)}}}
   const pp=c.querySelector('#onppl');if(pp)pp.style.display='none'}
  slots(c);
  const st=c.querySelector('#onst');if(st)st.style.display=/podaj kod|Czekam na/.test(st.textContent)?'none':'';
  const w=c.querySelector('#onwt'),b0=c.querySelector('#onplay');if(b0&&ON.host){b0.style.setProperty('display','none','important');let b=c.querySelector('#onplay2');if(!b){b=document.createElement('button');b.id='onplay2';b0.after(b);b.onclick=()=>{if(live().length)b0.click();else X.stat('⏳ Poczekaj, aż ktoś dołączy',true)}}const n=live().length,h=(ON.tour?'🏁 Start turnieju':'🏁 Start rundy')+' ('+(n+1)+'/4)'+(n?'':'<small>czekam, aż ktoś dołączy</small>');if(b._h!==h){b._h=h;b.innerHTML=h}b.classList.toggle('off',!n);if(w)w.style.display='none'}else if(w)w.style.display=''}
 function friends(){const box=document.getElementById('onfr');if(!box)return;
  box.querySelectorAll('.f').forEach(f=>{if(f.dataset.p208)return;f.dataset.p208=1;const btI=f.querySelector('[data-i]'),id=btI&&btI.dataset.i;if(!id)return;const sp=f.querySelector('span');const st=sp&&sp.querySelector('i.st');const cls=st?st.className.replace('st','').trim():'';
   if(sp&&!sp.classList.contains('who')){const nm=sp.childNodes;let name='';nm.forEach(n=>{if(n.nodeType==3)name+=n.textContent});const sm=sp.querySelector('small');const B=bil(id);sp.className='who';sp.innerHTML='<span class="fa">'+esc(name.trim()).slice(0,1).toUpperCase()+'<i class="'+cls+'"></i></span><span><b>'+esc(name.trim())+'</b>'+(B?'<span class="bl '+B.c+'" title="bilans: wygrane–przegrane">'+B.t+'</span>':'')+'<small>'+(sm?sm.textContent:'')+(B?'':' · jeszcze bez meczu')+'</small></span>'}
   f.classList.toggle('off',!(cls=='on'||cls=='pl'));
   if(ON.code&&btI)btI.textContent='➕ Zaproś';
   let tm=0;f.addEventListener('pointerdown',()=>{tm=setTimeout(()=>{f.classList.toggle('del')},550)});['pointerup','pointerleave','pointercancel'].forEach(e=>f.addEventListener(e,()=>clearTimeout(tm)))});
  if(box.querySelector('.f')&&!box.querySelector('.hint')){const h=document.createElement('div');h.className='hint';h.textContent='Bilans = wygrane–przegrane z tym graczem · przytrzymaj, żeby usunąć';box.appendChild(h)}}
 function frs(){const s=document.getElementById('frs');if(!s||!s.classList.contains('on'))return;s.querySelectorAll('.it[data-f]').forEach(it=>{if(it.querySelector('.bl'))return;const B=bil(it.dataset.f),b=it.querySelector('.tx b');if(B&&b)b.insertAdjacentHTML('beforeend','<span class="bl '+B.c+'">'+B.t+'</span>')})}
 setInterval(()=>{try{room();friends();frs()}catch(e){}},300);
 /* link z kodem: ?pokoj=KOD */
 try{const q=new URLSearchParams(location.search).get('pokoj');if(q&&/^[A-Z0-9]{4}$/i.test(q)){setTimeout(()=>{try{if(!ON.code){X.view();sh.classList.add('on');setTimeout(()=>{const i=document.getElementById('oncode');if(i){i.value=q.toUpperCase();X.act('join')}},150)}history.replaceState(null,'',location.pathname)}catch(e){}},2500)}}catch(e){}
}catch(e){console.warn('P208',e)}})();
</script>
