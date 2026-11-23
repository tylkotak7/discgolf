<script>/* P203: Street – miejska mini mapka (tabliczka, ekran ładowania, karta w menu) */
(function(){try{
function urbMap(x,h,mx,my,mw,mh,sm){const U=h.U,sx=mw/W,sy=mh/H;x.save();x.beginPath();x.roundRect?x.roundRect(mx,my,mw,mh,sm?.8:8):x.rect(mx,my,mw,mh);x.clip();x.translate(mx,my);x.scale(sx,sy);
 const poly=(P,c)=>{x.fillStyle=c;x.beginPath();P.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.closePath();x.fill()};
 const st=(r,c,w)=>{x.strokeStyle=c;x.lineWidth=w;x.lineCap='round';x.lineJoin='round';x.beginPath();r.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.stroke()};
 x.fillStyle=U.park?'#6fae5a':'#c9c4ba';x.fillRect(0,0,W,H);
 for(const P of U.grass||[])poly(P,'#86b35e');for(const P of U.dirt||[])poly(P,'#b99a6a');for(const P of U.plaza||[])poly(P,'#ddd3bf');for(const P of U.lots||[])poly(P,'#8b8f96');for(const P of U.courts||[])poly(P,'#c0533e');
 if(U.lake)poly(U.lake,'#4f8fc0');for(const f of U.fount||[]){x.fillStyle='#4f8fc0';x.beginPath();x.arc(f.x,f.y,f.r,0,7);x.fill()}
 for(const r of U.rails||[])st(r,'#7a6f66',6);
 for(const r of U.roads||[])st(r.p,'#5a5f68',r.w);for(const r of U.paths||[])st(r.p,'#e2d3b0',r.w);
 for(const B of U.bld){x.save();x.translate(B.c[0],B.c[1]);x.rotate(Math.atan2(B.u[1],B.u[0]));const col=B.rc||(B.wig?[.86,.78,.62]:[[.56,.24,.16],[.44,.2,.14],[.36,.36,.38],[.27,.26,.26],[.5,.32,.22],[.6,.58,.55]][B.rf||0]);x.fillStyle='rgb('+col.map(v=>Math.round(v*255)).join(',')+')';if(B.wig){x.beginPath();x.arc(0,0,B.a,0,7);x.fill()}else x.fillRect(-B.a,-B.b,B.a*2,B.b*2);x.restore()}
 for(const t of h.trees||[]){x.fillStyle='#2f6b34';x.beginPath();x.arc(t[0],t[1],t[2],0,7);x.fill()}
 if(h.path){x.setLineDash([6,6]);st(h.path,'#fff',2.4);x.setLineDash([])}
 x.fillStyle='#3fae3a';x.fillRect(h.tee[0]-5,h.tee[1]-3,10,6);x.fillStyle='#fff';x.strokeStyle='#222';x.lineWidth=1.5;x.beginPath();x.arc(h.b[0],h.b[1],5,0,7);x.fill();x.stroke();
 x.restore()}
window.__urbMap=urbMap;
const _dm=drawDGPMap;drawDGPMap=function(x,h){if(h&&h.sw&&h.U)return urbMap.apply(this,arguments);return _dm.apply(this,arguments)};
let TH=null,REAL=null,busy=false;function thumb(){if(REAL)return REAL;if(TH)return TH;const c=document.createElement('canvas');c.width=360;c.height=560;urbMap(c.getContext('2d'),SW[0],0,0,360,560,false);return TH=c.toDataURL('image/jpeg',.85)}
function real(){if(REAL||busy)return;busy=true;setTimeout(async()=>{try{const h=SW[0];let bg=null;try{bg=bgOf(h,false)}catch(e){}if(!bg&&window.__b3a){try{bg=await window.__b3a(h,false)}catch(e){bg=null}}if(!bg){const a=AUT3;AUT3=false;try{bg=build3(h,false)}finally{AUT3=a}}if(bg&&bg.width){const c=document.createElement('canvas');c.width=360;c.height=560;const x=c.getContext('2d');x.drawImage(bg,0,0,bg.width,bg.height,0,0,360,560);
 const sx=360/W,sy=560/H;x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.ellipse(h.b[0]*sx+3,h.b[1]*sy+4,6,2.5,0,0,7);x.fill();x.fillStyle='#9aa4ad';x.fillRect(h.b[0]*sx-.8,h.b[1]*sy-14,1.6,14);x.fillStyle='#f6b90c';x.beginPath();x.ellipse(h.b[0]*sx,h.b[1]*sy-14,7,2.4,0,0,7);x.fill();x.strokeStyle='#f6b90c';x.lineWidth=1.4;x.beginPath();x.ellipse(h.b[0]*sx,h.b[1]*sy-6,6,2,0,0,7);x.stroke();
 REAL=c.toDataURL('image/jpeg',.85);document.querySelectorAll('.ccard .th[data-urb]').forEach(t=>{delete t.dataset.urb});paint()}}catch(e){console.warn('P203 real',e)}busy=false},2500)}
const paint=()=>{try{real();const i=CARDS.findIndex(c=>c.k=='wrc');if(i<0)return;const t=document.querySelector('.ccard[data-ci="'+i+'"] .th');if(t&&!t.dataset.urb){t.style.backgroundImage='url('+thumb()+')';t.style.backgroundPosition='50% 40%';t.style.backgroundSize='cover';t.style.filter='none';t.dataset.urb=1}}catch(e){}};
const _rc=renderCards;renderCards=function(){const r=_rc.apply(this,arguments);paint();return r};paint();setInterval(paint,1500);
}catch(e){console.warn('P203',e)}})();
</script>
