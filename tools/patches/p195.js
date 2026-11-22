<script>/* P195: kałuże jesienią jak woda – nieregularny kształt, mokry ciemny brzeg, odbicie nieba, połysk, liście na wodzie, delikatne kręgi (w deszczu częściej); kałuże nie leżą pod koronami drzew */
(function(){try{
const S=6,TAU=6.2832;
puddles=function(h){if(h._pud)return h._pud;if(!h.rel||!h.L)return h._pud=[];
 const R=rnd(((h.b[0]|0)*31+(h.b[1]|0))|0),P=[],T=h.trees||[];
 for(let k=0;k<48&&P.length<6;k++){const u=h.L*(.2+R()*.68),[x,y]=h.rel(u,(R()-.5)*h.cw*.85),rx=8+R()*8,ry=rx*(.5+R()*.18);
  if(x<rx+4||x>W-rx-4||y<ry+30||y>H-ry-30)continue;let ok=1;
  for(const t of T){const m=(t[2]||8)*1.1+rx,dx=x-t[0];if(dx*dx+(y-t[1])**2<m*m||dx*dx+(y-t[1]+(t[2]||8)*.9)**2<m*m){ok=0;break}}
  if(ok)for(const q of P)if((x-q.x)**2+(y-q.y)**2<(rx+q.rx+5)**2){ok=0;break}
  if(ok&&h.b&&(x-h.b[0])**2+(y-h.b[1])**2<32*32)ok=0;
  if(ok&&h.tee&&(x-h.tee[0])**2+(y-h.tee[1])**2<30*30)ok=0;
  if(ok)P.push({x,y,rx,ry,a:R()*TAU,s:R(),f:[R()*TAU,R()*TAU,R()*TAU,R()]})}
 return h._pud=P};
/* obrys: promień zależny od kąta (gładkie wybrzuszenia), max = elipsa kolizji */
function ring(p,k){const n=36,o=[];for(let i=0;i<n;i++){const a=i/n*TAU,r=1-.13*(.5+.5*Math.sin(2*a+p.f[0]))-.09*(.5+.5*Math.sin(3*a+p.f[1]))-.05*(.5+.5*Math.sin(5*a+p.f[2]));o.push([Math.cos(a)*p.rx*r*k,Math.sin(a)*p.ry*r*k])}return o}
function path(c,pts,dx,dy,keep){dx=dx||0;dy=dy||0;const n=pts.length;if(!keep)c.beginPath();const m=(i)=>{const A=pts[i%n],B=pts[(i+1)%n];return[(A[0]+B[0])/2+dx,(A[1]+B[1])/2+dy]};let q=m(n-1);c.moveTo(q[0],q[1]);for(let i=0;i<n;i++){q=m(i);c.quadraticCurveTo(pts[i][0]+dx,pts[i][1]+dy,q[0],q[1])}c.closePath()}
function sky(){return ATM=='deszcz'||ATM=='mgła'?['#9aa4a9','#6f7a80','#465055']:ATM=='złota godzina'?['#d2bb8e','#8f8a78','#4d5450']:ATM=='wieczór'||ATM=='zmierzch'?['#a493a3','#626780','#383d4e']:['#a9c2cf','#7590a0','#435b69']}
function sprite(p){const key=ATM;if(p._c&&p._k==key)return p._c;const pad=10,w=(p.rx+pad)*2,hh=(p.ry+pad)*2,c=document.createElement('canvas');c.width=Math.ceil(w*S);c.height=Math.ceil(hh*S);const x=c.getContext('2d');x.scale(S,S);x.translate(w/2,hh/2);
 const R=rnd((p.s*1e6)|0);
 /* mokra ziemia wokół – miękkie, ciemne halo */
 x.save();x.shadowColor='rgba(46,28,12,.85)';x.shadowBlur=S*6;x.fillStyle='rgba(50,31,13,.55)';path(x,ring(p,1.3),.3,.5);x.fill();x.shadowBlur=S*2;x.fillStyle='rgba(50,31,13,.4)';path(x,ring(p,1.12),.2,.4);x.fill();x.restore();
 /* błotny brzeg */
 x.fillStyle='rgba(48,30,14,.75)';path(x,ring(p,1.06));x.fill();
 const pts=ring(p,1);x.save();path(x,pts);x.clip();
 /* woda: odbicie nieba */
 const C=sky(),gr=x.createLinearGradient(0,-p.ry,0,p.ry);gr.addColorStop(0,C[2]);gr.addColorStop(.45,C[1]);gr.addColorStop(1,C[0]);x.fillStyle=gr;x.fillRect(-p.rx-2,-p.ry-2,p.rx*2+4,p.ry*2+4);
 /* odbicie koron drzew przy górnym brzegu */
 const tr=x.createRadialGradient(-p.rx*.3,-p.ry*.9,0,-p.rx*.3,-p.ry*.9,p.rx*1.1);tr.addColorStop(0,'rgba(20,38,30,.6)');tr.addColorStop(1,'rgba(22,40,30,0)');x.fillStyle=tr;x.fillRect(-p.rx-2,-p.ry-2,p.rx*2+4,p.ry*2+4);
 /* cień brzegu wewnątrz (głębia) */
 x.fillStyle='rgba(34,22,10,.55)';x.beginPath();x.rect(-p.rx-6,-p.ry-6,p.rx*2+12,p.ry*2+12);const sh=ring(p,1.02);path(x,sh,0,1.4,1);x.fill('evenodd');
 x.fillStyle='rgba(34,22,10,.28)';x.beginPath();x.rect(-p.rx-6,-p.ry-6,p.rx*2+12,p.ry*2+12);path(x,sh,0,2.6,1);x.fill('evenodd');
 /* połysk nieba */
 x.save();x.translate(p.rx*.18,p.ry*.2);x.rotate(-.18);x.scale(1,.32);const gl=x.createRadialGradient(0,0,0,0,0,p.rx*.55);gl.addColorStop(0,'rgba(255,255,255,.45)');gl.addColorStop(.5,'rgba(255,255,255,.18)');gl.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=gl;x.beginPath();x.arc(0,0,p.rx*.55,0,TAU);x.fill();x.restore();
 /* liście na wodzie */
 const nl=R()<.75?1+(R()*2|0):0;for(let i=0;i<nl;i++){const lx=(R()-.5)*p.rx*1.1,ly=(R()-.5)*p.ry*1.0,la=R()*TAU,col=['#c8661f','#d9922b','#a8471c','#b98a3a'][R()*4|0];x.save();x.translate(lx,ly);x.rotate(la);x.fillStyle='rgba(0,0,0,.18)';x.beginPath();x.ellipse(.2,.3,1.2,.6,0,0,TAU);x.fill();x.fillStyle=col;x.beginPath();x.ellipse(0,0,1.2,.6,0,0,TAU);x.fill();x.strokeStyle='rgba(80,35,10,.6)';x.lineWidth=.18;x.beginPath();x.moveTo(-1.2,0);x.lineTo(1.4,0);x.stroke();x.restore()}
 x.restore();
 /* jasna linia wody przy dolnym brzegu (światło na krawędzi) */
 x.save();x.beginPath();x.rect(-p.rx-4,p.ry*.15,p.rx*2+8,p.ry+6);x.clip();x.strokeStyle='rgba(235,245,255,.16)';x.lineWidth=.35;path(x,ring(p,.97));x.stroke();x.restore();
 p._c=c;p._k=key;p._w=w;p._h=hh;p._p=pts;return c}
drawPud=function(h){const t=performance.now()/1000,rain=ATM=='deszcz';for(const p of puddles(h)){let sv=0;try{const c=sprite(p);g.save();sv=1;g.translate(p.x,p.y);g.drawImage(c,-p._w/2,-p._h/2,p._w,p._h);
 path(g,p._p);g.clip();g.lineWidth=.35;
 /* kręgi: spokojnie co kilka sekund, w deszczu ciągle */
 const n=rain?4:1;for(let i=0;i<n;i++){const per=rain?1.1:5.5,ph=((t+p.s*per*7+i*per/n)%per)/per;if(!rain&&ph>.45)continue;const f=rain?ph:ph/.45,R2=rnd(((p.s*1e5)|0)+i*97+Math.floor((t+p.s*per*7+i*per/n)/per)),cx=(R2()-.5)*p.rx*1.1,cy=(R2()-.5)*p.ry*1.0,rr=.5+f*(rain?3.2:p.rx*.45);g.strokeStyle='rgba(240,248,255,'+(.45*(1-f))+')';g.beginPath();g.ellipse(cx,cy,rr,rr*.62,0,0,TAU);g.stroke();if(f>.25){g.strokeStyle='rgba(240,248,255,'+(.25*(1-f))+')';g.beginPath();g.ellipse(cx,cy,rr*.6,rr*.37,0,0,TAU);g.stroke()}}
 /* lekkie migotanie połysku */
 g.globalAlpha=.10+.08*Math.sin(t*1.3+p.s*9);g.fillStyle='#fff';g.beginPath();g.ellipse(p.rx*.1,p.ry*.18,p.rx*.3,p.ry*.09,-.18,0,TAU);g.fill();
 g.restore()}catch(e){if(sv)try{g.restore()}catch(_){}}}};
}catch(e){console.warn('P195',e)}})();
</script>
