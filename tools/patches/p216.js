<script>/* P216: zapamiętywanie zbudowanych dołków w telefonie (IndexedDB) – opcja, domyślnie wyłączona */
(function(){try{
 const ON_=()=>{try{return localStorage.getItem('dg_mapcache')=='on'}catch(e){return false}};
 const V=(document.querySelector('meta[name=dgv]')||{}).content||'';
 let dbp=null;const db=()=>dbp||(dbp=new Promise((res,rej)=>{try{const r=indexedDB.open('dg_maps',1);r.onupgradeneeded=()=>{const d=r.result;if(!d.objectStoreNames.contains('m'))d.createObjectStore('m')};r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)}catch(e){rej(e)}}));
 const tx=(mode,fn)=>db().then(d=>new Promise((res,rej)=>{const t=d.transaction('m',mode),s=t.objectStore('m');let out;Promise.resolve(fn(s,v=>out=v)).catch(rej);t.oncomplete=()=>res(out);t.onerror=()=>rej(t.error)}));
 const idx=h=>{try{const L=(typeof CARDS!='undefined'&&CARDS.find(c=>c.k==layout));const H=L&&L.hl?L.hl():holes;const i=(holes||[]).indexOf(h);return i}catch(e){return -1}};
 const key=(h,wn)=>{const i=idx(h);if(i<0)return null;return [V,layout,i,wn?1:0,season,(typeof ATM!='undefined'?ATM:'')].join('|')};
 /* SILM: proste RLE */
 function rle(a){const o=[];let i=0;const n=a.length;while(i<n){const v=a[i];let j=i+1;while(j<n&&a[j]===v&&j-i<65535)j++;o.push(v,j-i);i=j}return Int32Array.from(o)}
 function unrle(r,n){const a=new Int16Array(n);let p=0;for(let i=0;i<r.length;i+=2){const v=r[i],c=r[i+1];if(v)a.fill(v,p,p+c);p+=c}return a}
 async function save(h,wn,c){if(!ON_()||!c||!c.width||c._fb||c._fallback||c._notx||c._p216)return;const k=key(h,wn);if(!k||!h._sil)return;c._p216=1;
  try{const blob=await new Promise(r=>c.toBlob(r,'image/webp',.9));if(!blob)return;const s=h._sil;
   const rec={v:V,at:Date.now(),img:blob,w:c.width,hh:c.height,atm:c._atm,col:JSON.stringify(h._col||[]),fill:JSON.stringify(h._fill||[]),forest:h._forest||0,sil:{tw:s.tw,th:s.th,s:s.s,tl:JSON.stringify(s.tl||[]),m:rle(s.m),n:s.m.length}};
   await tx('readwrite',st=>{st.put(rec,k)});prune()}catch(e){console.warn('P216 zapis',e)}}
 let pr=0;async function prune(){if(++pr%5)return;try{const all=[];await tx('readonly',st=>new Promise(res=>{const q=st.openCursor();q.onsuccess=()=>{const cu=q.result;if(!cu)return res();all.push([cu.key,cu.value.at,cu.value.v]);cu.continue()}}));const del=all.filter(x=>x[2]!==V);const ok=all.filter(x=>x[2]===V).sort((a,b)=>b[1]-a[1]).slice(100);await tx('readwrite',st=>{for(const x of del.concat(ok))st.delete(x[0])})}catch(e){}}
 async function load(h,wn){const k=key(h,wn);if(!k)return null;let r=null;try{r=await tx('readonly',(st,set)=>new Promise(res=>{const q=st.get(k);q.onsuccess=()=>{set(q.result);res()};q.onerror=()=>res()}))}catch(e){return null}
  if(!r||r.v!==V)return null;try{const bm=await createImageBitmap(r.img);const c=document.createElement('canvas');c.width=r.w;c.height=r.hh;c.getContext('2d').drawImage(bm,0,0);try{bm.close()}catch(e){}c._atm=r.atm;c._p216=1;
   h._col=JSON.parse(r.col);h._fill=JSON.parse(r.fill);if(r.forest)h._forest=r.forest;h._sil={m:unrle(r.sil.m,r.sil.n),tw:r.sil.tw,th:r.sil.th,s:r.sil.s,tl:JSON.parse(r.sil.tl)};return c}catch(e){console.warn('P216 odczyt',e);return null}}
 window.__mapCache={save,load,key};
 /* wczytanie przy wejściu na dołek */
 let pend=null;const ix=wn=>typeof bgIdx=='function'?bgIdx(wn):(wn?1:0);
 const _ens=ensureBG;ensureBG=function(h,cb){const wn=season=='winter',k=ix(wn);if(!ON_()||BGC.get(h)?.[k]||!playing)return _ens.apply(this,arguments);
  if(pend&&pend.h===h)return false;if(pend)return _ens.apply(this,arguments);
  pend={h};try{LDH=h}catch(e){}try{ldDraw(h)}catch(e){}try{$('ld').style.display='flex'}catch(e){}const T0=performance.now();
  load(h,wn).then(c=>{if(c&&!BGC.get(h)?.[k]){const e=BGC.get(h)||[];e[k]=c;BGC.set(h,e);window.__p216hit=Math.round(performance.now()-T0)}}).catch(()=>{}).finally(()=>{pend=null;try{$('ld').style.display='none'}catch(e){}_ens(h,cb)});return false};
 /* zapis zbudowanych teł (bieżący i przygotowany następny) */
 setInterval(()=>{try{if(!ON_()||!holes)return;for(const h of [holes[hi],holes[hi+1]]){if(!h)continue;const e=BGC.get(h);if(!e)continue;e.forEach((c,i)=>{if(c&&!c._p216)save(h,i===ix(true),c)})}}catch(e){}},3000);
 /* przełącznik w Opcjach */
 const _ro=renderOpt;renderOpt=function(){const r=_ro.apply(this,arguments);try{const t=document.getElementById('otog');if(t&&!t.querySelector('.p216')){const on=ON_();const b=document.createElement('button');b.className='otb p216'+(on?' on':'');b.innerHTML='<span>💾 Zapamiętuj mapy w telefonie<small style="display:block;font:600 11px system-ui;opacity:.7">szybsze ładowanie · do 100 dołków, ok. 60 MB</small></span><i>'+(on?'WŁ':'WYŁ')+'</i>';b.onclick=()=>{const n=!ON_();try{localStorage.setItem('dg_mapcache',n?'on':'off')}catch(e){}if(!n){try{indexedDB.deleteDatabase('dg_maps');dbp=null}catch(e){}toast('🗑️ Zapisane mapy usunięte')}else toast('💾 Dołki będą zapamiętywane – drugi raz wczytają się od razu');b.remove();renderOpt()};t.appendChild(b)}}catch(e){}return r};
}catch(e){console.warn('P216',e)}})();
</script>
