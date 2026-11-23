<script>/* P213: następny dołek budowany w tle w małych kawałkach (bez zacinania) – przejście na kolejny dołek od razu */
(function(){try{
 let src=build3_.toString();if(!/^function build3_\(h,wn\)\{/.test(src))return;
 const Y='(performance.now()-__t>45&&(await __yl()))';
 const pre="async function(h,wn){let __t=performance.now();const __A=AUT3;const __yl=()=>{TTF=null;AUT3=false;return new Promise(r=>{const go=()=>{if(window.__p213wait&&window.__p213wait())return setTimeout(go,150);requestAnimationFrame(()=>setTimeout(()=>{TTF=h.tt||null;AUT3=__A;__t=performance.now();r()},0))};go()})};";
 const top=(s,YF)=>{let out='',d=0,p=0,i=0,q=null;const n=s.length;
  while(i<n){const c=s[i];
   if(q){out+=c;if(c=='\\'){out+=s[i+1]||'';i+=2;continue}if(c==q)q=null;i++;continue}
   if(c=="'"||c=='"'||c=='`'){q=c;out+=c;i++;continue}
   if(c=='/'&&s[i+1]=='*'){const e=s.indexOf('*/',i+2);const k=e<0?n:e+2;out+=s.slice(i,k);i=k;continue}
   if(c=='/'&&s[i+1]=='/'){const e=s.indexOf('\n',i);const k=e<0?n:e;out+=s.slice(i,k);i=k;continue}
   if(c=='{')d++;else if(c=='}')d--;else if(c=='(')p++;else if(c==')')p--;
   out+=c;i++;
   if(d==1&&p==0&&(c==';'||c=='}')){let j=i;while(j<n&&/\s/.test(s[j]))j++;const rest=s.slice(j,j+8);if(j<n&&/[A-Za-z_$\/]/.test(s[j])&&!/^(else|catch|finally|while)\b/.test(rest)&&!(s[j]=='/'&&s[j+1]!='*'&&s[j+1]!='/')){out+=YF()+';'}}
  }return out};
 const vars=[
  s=>top(s,()=>Y).replace(/for\(let n=0;n<cnt;n\+\+\)/g,'for(let n=0;n<cnt;n++,((n&1023)||'+Y+'))').replace(/for\(let y=1;y<TH-1;y\+\+\)/g,()=>'for(let y=1;y<TH-1;y++,'+Y+')').replace(/for\(const t of srt\)\{/g,()=>'for(const t of srt){'+Y+';').replace(/for\(let y=0;y<TH;y\+\+\)/g,'for(let y=0;y<TH;y++,'+Y+')').replace(/for\(let x=0;x<TW;x\+\+\)\{let ymin/g,'for(let x=0;x<TW;x++,'+Y+'){let ymin').replace(/for\(let i=0;i<N;i\+\+\)/g,'for(let i=0;i<N;i++,((i&4095)||'+Y+'))'),
  s=>s.replace(/^(for\(let y=0;y<TH;y\+\+\))/gm,'for(let y=0;y<TH;y++,'+Y+')').replace(/^(for\(let i=0;i<N;i\+\+\))/gm,'for(let i=0;i<N;i++,((i&4095)||'+Y+'))'),
  s=>s.replace(/\n(?=[a-zA-Z\/])/g,'\n'+Y+';')
 ];
 let A=null;for(const v of vars){try{A=(0,eval)('('+v(src).replace(/^function build3_\(h,wn\)\{/,pre)+')');break}catch(e){A=null}}
 if(!A){console.warn('P213: brak wersji w tle');return}window.__p213v=vars.findIndex(v=>{try{(0,eval)('('+v(src).replace(/^function build3_\(h,wn\)\{/,pre)+')');return true}catch(e){return false}});
 const F=['_col','_fill','_sil','_PLm','_UM','_live','_pud'];
 const _B=build3_;build3_=function(h,wn){const C=window.__p213c;if(C&&C.h===h&&C.wn===wn&&C.aut===AUT3&&C.atm===(typeof ATM!='undefined'?ATM:null)&&C.se===season&&C.c&&C.c.width){window.__p213c=null;for(const k of F)h[k]=C.f[k];TTF=null;return C.c}return _B.apply(this,arguments)};
 let lastT=0;['pointerdown','pointermove','touchstart','touchmove'].forEach(e=>addEventListener(e,()=>{lastT=performance.now()},{passive:true,capture:true}));window.__p213wait=()=>document.hidden;
 let busy=false,busyH=null,tLoad=0,lastHi=-1;
 const ix=wn=>typeof bgIdx=='function'?bgIdx(wn):(wn?1:0);
 async function prebuild(h){if(busy||!h)return;const wn=season=='winter',k=ix(wn);if(BGC.get(h)?.[k])return;busy=true;busyH=h;const T0=performance.now();window.__p213s='start';const se=season,atm=typeof ATM!='undefined'?ATM:null,aut=se=='autumn';
  const lake=!!(h.U&&h.U.lake),RV=h.rivers;let c=null;
  try{if(lake)h.rivers=[];AUT3=aut;const p=A(h,wn);AUT3=false;TTF=null;c=await p}catch(e){console.warn('P213 tło',e);c=null}finally{if(lake)h.rivers=RV;AUT3=false;TTF=null}
  try{if(c&&c.width&&season===se&&(typeof ATM=='undefined'||ATM===atm)&&!BGC.get(h)?.[k]){const f={};for(const q of F)f[q]=h[q];window.__p213c={h,wn,aut,atm,se,c,f};AUT3=aut;let c2=null;try{c2=build3(h,wn)}finally{AUT3=false}window.__p213c=null;
   if(c2&&c2.width&&!c2._fb&&!c2._fallback){const e=BGC.get(h)||[];e[k]=c2;BGC.set(h,e);const cur=holes&&holes[hi];while(BGC.size>3){const kk=BGC.keys().next().value;if(kk===cur||kk===h)break;try{(BGC.get(kk)||[]).forEach(x=>{if(x&&x.width){x.width=x.height=0}})}catch(x){}BGC.delete(kk)}}}}catch(e){console.warn('P213',e)}
  window.__p213c=null;busy=false;busyH=null;window.__p213s='done '+Math.round(performance.now()-T0)+' '+(c?'ok':'null')}
 window.__prebuild=prebuild;
 /* sam obraz tła w kawałkach (np. miniatura karty w menu) – bez zamrażania */
 window.__b3aS=async(h,wn,aut)=>{const keep={};for(const q of F)keep[q]=h[q];const a0=AUT3;try{AUT3=!!aut;const p=A(h,wn);AUT3=a0;TTF=null;return await p}finally{for(const q of F)h[q]=keep[q];TTF=null}};
 window.__b3a=async(h,wn)=>{const keep={};for(const q of F)keep[q]=h[q];const a0=AUT3;try{AUT3=false;const p=A(h,wn);AUT3=a0;TTF=null;return await p}finally{for(const q of F)h[q]=keep[q];TTF=null}};
 const _ens=ensureBG;ensureBG=function(h,cb){if(busy&&busyH===h&&!BGC.get(h)?.[ix(season=='winter')]){try{LDH=h}catch(e){}try{ldDraw(h)}catch(e){}try{$('ld').style.display='flex'}catch(e){}const w=()=>{if(busy&&busyH===h)return setTimeout(w,60);try{$('ld').style.display='none'}catch(e){}_ens(h,cb)};setTimeout(w,60);return false}return _ens.apply(this,arguments)};
 /* budujemy dopiero po skończeniu dołka (w czasie gratulacji), żeby nie zabierać płynności w trakcie gry */
 /* (v258) bez budowania po trafieniu – gratulacje mają być płynne; dołek buduje się na ekranie ładowania */
}catch(e){console.warn('P213',e)}})();
</script>
