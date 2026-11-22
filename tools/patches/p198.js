<script>/* P198: nowy model postaci (menu Postać) – dopracowana sylwetka męska i kobieca, twarz, fryzury, style koszulek (T-shirt, polo, bluza, koszulka meczowa), kolor oczu */
(function(){try{
const cl=(v,a,b)=>Math.max(a,Math.min(b,v)),lerp=(a,b,t)=>a+(b-a)*t,L2=(p,q,t)=>[lerp(p[0],q[0],t),lerp(p[1],q[1],t)],ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
const sd=(c,k)=>shd(c,k);
const EYE=['#5a3a22','#3f7fbf','#4f8a4a','#7a6a52'];
const SS=['👕 T-shirt','👔 Polo','🧥 Bluza','🎽 Meczowa'];
function ik(S,H,l1,l2,bend){let dx=H[0]-S[0],dy=H[1]-S[1],d=Math.hypot(dx,dy)||.01;const mx=l1+l2-.01;if(d>mx){H=[S[0]+dx/d*mx,S[1]+dy/d*mx];dx=H[0]-S[0];dy=H[1]-S[1];d=mx}const a=Math.atan2(dy,dx),c=cl((l1*l1+d*d-l2*l2)/(2*l1*d),-1,1),b=Math.acos(c)*bend;return[[S[0]+Math.cos(a+b)*l1,S[1]+Math.sin(a+b)*l1],H]}
function kf(T,e){for(let i=1;i<T.length;i++)if(e<=T[i][0]){const f=(e-T[i-1][0])/(T[i][0]-T[i-1][0]);return lerp(T[i-1][1],T[i][1],ease(cl(f,0,1)))}return T[T.length-1][1]}
/* kończyna jako zwężający się kształt z cieniowaniem */
function limb(x,A,B,w1,w2,col,dark){const dx=B[0]-A[0],dy=B[1]-A[1],l=Math.hypot(dx,dy)||.01,nx=-dy/l,ny=dx/l;
 const g=x.createLinearGradient(A[0]+nx*w1,A[1]+ny*w1,A[0]-nx*w1,A[1]-ny*w1);g.addColorStop(0,sd(col,dark?.92:1.12));g.addColorStop(.5,sd(col,dark?.82:1));g.addColorStop(1,sd(col,dark?.66:.74));
 x.fillStyle=g;x.beginPath();x.moveTo(A[0]+nx*w1,A[1]+ny*w1);x.lineTo(B[0]+nx*w2,B[1]+ny*w2);x.arc(B[0],B[1],w2,Math.atan2(ny,nx),Math.atan2(ny,nx)+Math.PI*(dx*ny-dy*nx>0?1:-1)*-1,dx*ny-dy*nx<0);x.lineTo(A[0]-nx*w1,A[1]-ny*w1);x.arc(A[0],A[1],w1,Math.atan2(-ny,-nx),Math.atan2(ny,nx),dx*ny-dy*nx<0);x.closePath();x.fill()}
function seg(x,A,B,w1,w2,col,dark){/* prostsza wersja – kapsuła */const dx=B[0]-A[0],dy=B[1]-A[1],l=Math.hypot(dx,dy)||.01,nx=-dy/l,ny=dx/l;
 const g=x.createLinearGradient(A[0]+nx*w1,A[1]+ny*w1,A[0]-nx*w1,A[1]-ny*w1);g.addColorStop(0,sd(col,dark?.95:1.14));g.addColorStop(.45,sd(col,dark?.84:1));g.addColorStop(1,sd(col,dark?.64:.72));
 x.fillStyle=g;x.beginPath();x.moveTo(A[0]+nx*w1,A[1]+ny*w1);x.lineTo(B[0]+nx*w2,B[1]+ny*w2);x.lineTo(B[0]-nx*w2,B[1]-ny*w2);x.lineTo(A[0]-nx*w1,A[1]-ny*w1);x.closePath();x.fill();
 x.beginPath();x.arc(A[0],A[1],w1,0,7);x.fill();x.beginPath();x.arc(B[0],B[1],w2,0,7);x.fill()}
function draw2(x,c,yaw,P,t){
 const sk=SKIN[c.skin]||SKIN[0],sr=SHIRT[c.shirt]||SHIRT[0],cp=CAP[c.cap]||CAP[0],hc=HAIRC[c.hc]||HAIRC[0],pc=PANTS[c.pants]||PANTS[0],fem=c.g=='f',ss=c.ss|0,eye=EYE[c.eye|0]||EYE[0];
 const cs=Math.cos(yaw),sn=Math.sin(yaw),front=P.front!=null?P.front:cs>=-.05,back=!front,side=Math.abs(cs)<.4,mx=P.mx!=null?P.mx:(sn>=0?1:-1),sq=P.sq!=null?P.sq:.6+.4*Math.abs(cs),br=P.idle?Math.sin(t*2)*.18:0,cel=P.cel||null,walk=P.walk==null?null:P.walk,wb2=walk!=null?Math.abs(Math.sin(walk))*.9:0,inG=P.mx!=null;
 const longSl=ss==2,hood=ss==2,jersey=ss==3,polo=ss==1;
 x.save();
 if(!P.noShadow){x.fillStyle='rgba(0,0,0,.32)';x.beginPath();x.ellipse(0,.5,9.5,2.4,0,0,7);x.fill()}
 x.scale(mx,1);
 const hipY=-17.6+2.4*P.cr+br*.25-wb2,shY=-29.6+2.6*P.cr+br-wb2+(cel=='down'?.8:0),sw=P.sw,hb=P.hb,rot=cl(Math.abs(sw),0,1);
 const shW=(fem?4.05:4.85)*(1-.22*rot)*sq,waW=(fem?2.65:3.3)*sq,hpW=(fem?3.85:3.45)*sq,tl=P.lean*6*(front?-1:1),SX=tl+sw*hb*1.1*(inG?1:(back?1:-1));
 /* --- włosy z tyłu (długie, za tułowiem) --- */
 const hair=c.hair==null?(fem?1:0):c.hair,HX=SX+tl*.4,HY=shY-5.3+(cel=='down'?.9:0);
 const backHair=()=>{x.fillStyle=sd(hc,.85);
  if(hair==1){x.beginPath();x.moveTo(HX-3.2,HY-1);x.quadraticCurveTo(HX-4.2,HY+5,HX-3.6*(fem?1:.85),HY+(fem?9.5:6));x.quadraticCurveTo(HX,HY+(fem?10.6:7),HX+3.6*(fem?1:.85),HY+(fem?9.5:6));x.quadraticCurveTo(HX+4.2,HY+5,HX+3.2,HY-1);x.closePath();x.fill()}
  if(hair==3&&fem){for(let k=0;k<9;k++){const a=Math.PI*(.05+k/8*.9);x.beginPath();x.arc(HX+Math.cos(a)*3.4,HY+1.6+Math.sin(a)*3.6,1.5,0,7);x.fill()}}};
 if(front)backHair();
 /* --- nogi --- */
 const spread=P.putt?2.9:(fem?1.9:2.2);let footL=[-spread*sq-.3*P.step,P.step*-1.4],footR=[spread*sq+.5*P.step,P.heel?-1.6:0];if(walk!=null){const s=Math.sin(walk);footL=[-1.9*sq,-s*3.4-(s>0?.9*s:0)];footR=[1.9*sq,s*3.4+(s<0?.9*s:0)]}const hipL=[-(hpW-1.3),hipY],hipR=[hpW-1.3,hipY];
 const legL=ik(hipL,footL,8.6,8.4,-.25),legR=ik(hipR,footR,8.6,8.4,.25),shorts=!c.pl;
 const leg=(H,K,bk)=>{const s=bk?.86:1,Kn=K[0],F=K[1],thigh=fem?1.95:2.05,knee=fem?1.3:1.45,ankle=fem?.75:.85;
  if(shorts){const m=L2(H,Kn,.82);seg(x,Kn,[F[0],F[1]-1.4],knee*.95,ankle,sd(sk,s),bk);seg(x,H,m,thigh*1.05,knee*1.25,sd(pc,s),bk);x.strokeStyle='rgba(0,0,0,.25)';x.lineWidth=.18;x.beginPath();x.moveTo(m[0]-knee*1.25,m[1]);x.lineTo(m[0]+knee*1.25,m[1]);x.stroke()}
  else{seg(x,Kn,[F[0],F[1]-1.3],knee,ankle*1.25,sd(pc,s*.96),bk);seg(x,H,Kn,thigh,knee,sd(pc,s),bk);x.strokeStyle='rgba(0,0,0,.12)';x.lineWidth=.16;x.beginPath();x.moveTo(Kn[0]-.4,Kn[1]-.3);x.quadraticCurveTo(Kn[0],Kn[1]+.2,Kn[0]+.4,Kn[1]-.3);x.stroke()}
  /* skarpetka + but */
  x.fillStyle='#f2f2f0';x.fillRect(F[0]-ankle*.95,F[1]-2.1,ankle*1.9,.9);
  const sh=c.pl&&c.pants==5?'#d8382c':'#2b3140';x.fillStyle=sd(sh,s);x.beginPath();x.ellipse(F[0]+(side?.7:0),F[1]-.75,front||back?1.75:2.4,1.15,0,0,7);x.fill();
  x.fillStyle='#f4f4f2';x.beginPath();x.roundRect(F[0]-(side?1.5:1.85),F[1]-.25,side?4.2:3.7,.7,.3);x.fill();
  x.strokeStyle='rgba(255,255,255,.7)';x.lineWidth=.14;x.beginPath();x.moveTo(F[0]-.6,F[1]-1.5);x.lineTo(F[0]+.6,F[1]-1.5);x.moveTo(F[0]-.6,F[1]-1.1);x.lineTo(F[0]+.6,F[1]-1.1);x.stroke()};
 leg(hipR,legR,true);leg(hipL,legL,false);
 /* --- ramiona: przygotowanie --- */
 const LS=[SX-shW+.7,shY+1.1],RS=[SX+shW-.7,shY+1.1];let lh,tg;
 if(P.idle){const s2=Math.sin(t*1.3)*.25;lh=[LS[0]-1.2+s2,shY+12.3];tg=[RS[0]+1.2-s2,shY+12.3];
  if(walk!=null){const s=Math.sin(walk);lh=[LS[0]-1.3,shY+10.8+s*1.8];tg=[RS[0]+1.3,shY+10.8-s*1.8]}
  else if(cel=='up'){const j=Math.abs(Math.sin(t*7.5))*1.2;lh=[LS[0]-2.6,shY-9.8-j];tg=[RS[0]+2.6,shY-9.8-j]}
  else if(cel=='fist'){const k=Math.abs(Math.sin(t*6.2));tg=[RS[0]+1.2,shY-2-k*3.6]}
  else if(cel=='down'){lh=[-3.4,hipY-.6];tg=[3.4,hipY-.6]}
  else if(cel=='head'){lh=[HX-1.9,HY-2.7];tg=[HX+1.9,HY-2.7]}}
 else if(P.putt){lh=[LS[0]-.4,shY+4.6];tg=sw<0?L2([RS[0]-2.2,shY+5],[RS[0]-1,shY+9.5],-sw):L2([RS[0]-2.2,shY+5],[RS[0]-2.6,shY+.5],sw)}
 else{lh=[LS[0]-3-4*Math.max(0,sw)*hb+2*Math.min(0,sw)*hb,shY+6.5-2*rot];if(hb>0){const rel=[RS[0]-4.2,shY+2.6],bk=[RS[0]-13,shY+3.6],ext=[RS[0]+9.6,shY+4.6],wrap=[RS[0]+8.6,shY-1.8];tg=sw<0?L2(rel,bk,-sw):sw<.62?L2(rel,ext,sw/.62):L2(ext,wrap,(sw-.62)/.38)}else{const rel=[RS[0]-.4,shY+3.6],bk=[RS[0]+7,shY+5.4],ext=[RS[0]-9,shY+3.4],fin=[RS[0]-12.5,shY+5.8];tg=sw<0?L2(rel,bk,-sw):sw<.62?L2(rel,ext,sw/.62):L2(ext,fin,(sw-.62)/.38)}}
 const aL=ik(LS,lh,5.7,5.5,P.idle?((cel=='head'||cel=='up')?-1:1):-1),aR=ik(RS,tg,5.8,5.6,(cel=='down'||(!P.idle&&!P.putt&&sw>0&&hb>0))?1:-1);
 const arm=(S,A,bk,disc)=>{const s=bk?.84:1,E=A[0],Hd=A[1],ua=fem?1.05:1.2,fa=fem?.85:.98;
  if(longSl){seg(x,E,Hd,fa*1.1,fa*.95,sd(sr,s),bk);seg(x,S,E,ua*1.1,fa*1.1,sd(sr,s),bk);x.fillStyle=sd(sr,.7*s);x.beginPath();x.arc(Hd[0],Hd[1],fa*.95,0,7);x.fill()}
  else{seg(x,E,Hd,fa,fa*.72,sd(sk,s),bk);const mid=L2(S,E,.55);seg(x,mid,E,ua*.95,fa,sd(sk,s),bk);seg(x,S,mid,ua*1.25,ua*1.15,sd(sr,s),bk);
   if(jersey){const dx=E[0]-S[0],dy=E[1]-S[1],l=Math.hypot(dx,dy)||1,nx=-dy/l*ua*1.2,ny=dx/l*ua*1.2;x.strokeStyle='#fff';x.lineWidth=.35;x.beginPath();x.moveTo(mid[0]+nx,mid[1]+ny);x.lineTo(mid[0]-nx,mid[1]-ny);x.stroke()}}
  /* dłoń */x.fillStyle=sd(sk,s*1.02);x.beginPath();x.ellipse(Hd[0],Hd[1]+.25,fem?.72:.85,fem?.95:1.08,0,0,7);x.fill();x.fillStyle=sd(sk,.85*s);x.beginPath();x.ellipse(Hd[0]+.55,Hd[1]-.1,.28,.5,.5,0,7);x.fill();
  if(disc){const dc=P.dcol||(typeof discs!='undefined'&&discs[2]&&discs[2].col)||'#e2483d',hx=Hd[0]+.6,hy=Hd[1]+.3;x.fillStyle=sd(dc,.55);x.beginPath();x.ellipse(hx+.3,hy+.45,3.9,1.55,-.1,0,7);x.fill();const gr=x.createLinearGradient(hx-3.6,hy,hx+3.6,hy);gr.addColorStop(0,sd(dc,1.35));gr.addColorStop(1,sd(dc,.85));x.fillStyle=gr;x.beginPath();x.ellipse(hx,hy,3.7,1.35,-.1,0,7);x.fill();x.strokeStyle='rgba(255,255,255,.55)';x.lineWidth=.3;x.beginPath();x.ellipse(hx,hy-.15,2.4,.75,-.1,Math.PI,2*Math.PI);x.stroke()}};
 const behind=!P.idle&&sw<-.35&&hb>0;
 if(back)arm(LS,aL,false,false);else arm(LS,aL,true,false);
 if(behind)arm(RS,aR,true,P.disc!=null?P.disc:true);
 /* --- kaptur z tyłu (widok z przodu: za szyją) --- */
 if(hood&&front){x.fillStyle=sd(sr,.62);x.beginPath();x.ellipse(SX,shY-.6,3.2,1.7,0,Math.PI,2*Math.PI);x.fill()}
 /* --- tułów --- */
 const top=shY-.4,wy=lerp(shY,hipY,.62),hem=hipY+(longSl?1.2:.6),bust=fem&&front;
 const tg2=x.createLinearGradient(SX-shW,0,SX+shW,0);tg2.addColorStop(0,sd(sr,1.16));tg2.addColorStop(.5,sr);tg2.addColorStop(1,sd(sr,.68));
 x.fillStyle=tg2;x.beginPath();x.moveTo(SX-shW,top+1.6);x.quadraticCurveTo(SX-shW,top,SX-shW+1.8,top-.1);x.lineTo(SX+shW-1.8,top-.1);x.quadraticCurveTo(SX+shW,top,SX+shW,top+1.6);
 x.quadraticCurveTo(SX+shW-.25,lerp(top,wy,.55),waW,wy);x.quadraticCurveTo(hpW+.15,lerp(wy,hem,.6),hpW+(longSl?.3:0),hem);x.lineTo(-hpW-(longSl?.3:0),hem);x.quadraticCurveTo(-hpW-.15,lerp(wy,hem,.6),-waW,wy);x.quadraticCurveTo(SX-shW+.25,lerp(top,wy,.55),SX-shW,top+1.6);x.closePath();x.fill();
 x.save();x.clip();
 /* fałdy i światło */
 x.strokeStyle='rgba(0,0,0,.12)';x.lineWidth=.22;x.beginPath();x.moveTo(SX-1.4,shY+5.5);x.quadraticCurveTo(SX-.6,shY+8,-1.2,hipY-1.5);x.moveTo(SX+2.1,shY+7);x.quadraticCurveTo(SX+1.5,shY+9.5,1.6,hipY-2);x.stroke();
 if(bust){}
 if(jersey){x.fillStyle=sd(sr,.55);x.fillRect(-hpW-1,hem-1,hpW*2+2,.8)}
 if(hood&&front){x.fillStyle=sd(sr,.82);x.beginPath();x.moveTo(-2.4,hipY-4.4);x.lineTo(2.4,hipY-4.4);x.lineTo(3,hipY-.6);x.lineTo(-3,hipY-.6);x.closePath();x.fill();x.strokeStyle='rgba(0,0,0,.18)';x.lineWidth=.18;x.stroke();x.fillStyle=sd(sr,.6);x.fillRect(-hpW-1,hem-1.3,hpW*2+2,1.3)}
 if(!longSl&&!jersey){x.fillStyle=sd(sr,.8);x.fillRect(-hpW-1,hem-.55,hpW*2+2,.55)}
 x.restore();
 x.strokeStyle='rgba(0,0,0,.22)';x.lineWidth=.2;x.stroke();
 /* pasek spodni */
 if(!longSl&&!hood){x.fillStyle=sd(pc,.85);x.beginPath();x.moveTo(-hpW-.1,hem);x.lineTo(hpW+.1,hem);x.lineTo(hpW+.2,hem+1.4);x.lineTo(-hpW-.2,hem+1.4);x.closePath();x.fill()}
 /* --- szyja --- */
 const NX=SX+tl*.4;x.fillStyle=sd(sk,.8);x.beginPath();x.moveTo(NX-(fem?.85:1.05),shY-2.2);x.lineTo(NX+(fem?.85:1.05),shY-2.2);x.lineTo(NX+(fem?.95:1.2),shY+.3);x.lineTo(NX-(fem?.95:1.2),shY+.3);x.closePath();x.fill();
 /* --- dekolt / kołnierz --- */
 if(front){const bt=(typeof BRS!='undefined'&&SV.brand&&BRS[SV.brand])||'';
  if(polo){x.fillStyle=sd(sr,.92);x.beginPath();x.moveTo(NX-2.3,shY-.6);x.lineTo(NX,shY+1.4);x.lineTo(NX-1.2,shY+1.9);x.lineTo(NX-2.6,shY+.6);x.closePath();x.moveTo(NX+2.3,shY-.6);x.lineTo(NX,shY+1.4);x.lineTo(NX+1.2,shY+1.9);x.lineTo(NX+2.6,shY+.6);x.closePath();x.fill();x.strokeStyle='rgba(0,0,0,.25)';x.lineWidth=.15;x.stroke();x.fillStyle=sd(sr,.7);x.fillRect(NX-.35,shY+1.3,.7,3);x.fillStyle='#f3f3f3';x.beginPath();x.arc(NX,shY+2.2,.22,0,7);x.arc(NX,shY+3.4,.22,0,7);x.fill()}
  else if(jersey){x.fillStyle=sd(sk,.85);x.beginPath();x.moveTo(NX-1.6,shY-.4);x.lineTo(NX,shY+2.2);x.lineTo(NX+1.6,shY-.4);x.closePath();x.fill();x.strokeStyle='#fff';x.lineWidth=.35;x.beginPath();x.moveTo(NX-1.8,shY-.4);x.lineTo(NX,shY+2.4);x.lineTo(NX+1.8,shY-.4);x.stroke();x.save();x.scale(mx,1);x.fillStyle='rgba(255,255,255,.92)';x.font='900 2.6px system-ui';x.textAlign='center';x.textBaseline='middle';x.fillText(String(c.num==null?7:c.num),mx*SX,shY+5.6);x.restore()}
  else if(hood){x.fillStyle=sd(sk,.85);x.beginPath();x.ellipse(NX,shY-.2,1.4,1,0,0,Math.PI);x.fill();x.strokeStyle='#f1f1f1';x.lineWidth=.2;x.beginPath();x.moveTo(NX-.7,shY+.6);x.lineTo(NX-.8,shY+3.2);x.moveTo(NX+.7,shY+.6);x.lineTo(NX+.8,shY+3.2);x.stroke()}
  else{x.fillStyle=sd(sk,.85);x.beginPath();x.ellipse(NX,shY-.35,1.5,1.05,0,0,Math.PI);x.fill();x.strokeStyle=sd(sr,.7);x.lineWidth=.35;x.beginPath();x.ellipse(NX,shY-.35,1.6,1.15,0,0,Math.PI);x.stroke()}
  if(bt&&!jersey){x.save();x.scale(mx,1);const bx=mx*(SX-1.9);x.fillStyle='rgba(255,255,255,.9)';x.beginPath();x.arc(bx,shY+3.6,.8,0,7);x.fill();x.fillStyle=sr;x.font='900 1.1px system-ui';x.textAlign='center';x.textBaseline='middle';x.fillText(bt[0],bx,shY+3.65);x.restore()}}
 else{ if(jersey){x.save();x.scale(mx,1);x.fillStyle='rgba(255,255,255,.92)';x.font='900 1.5px system-ui';x.textAlign='center';x.textBaseline='middle';x.fillText(String(pname||'GRACZ').toUpperCase().slice(0,10),mx*SX,shY+2.6);x.font='900 5px system-ui';x.fillText(String(c.num==null?7:c.num),mx*SX,shY+7);x.restore()}
  if(hood){x.fillStyle=sd(sr,.8);x.beginPath();x.moveTo(SX-2.8,shY-1);x.quadraticCurveTo(SX,shY-2.2,SX+2.8,shY-1);x.lineTo(SX+2,shY+4.4);x.quadraticCurveTo(SX,shY+5.6,SX-2,shY+4.4);x.closePath();x.fill();x.strokeStyle='rgba(0,0,0,.2)';x.lineWidth=.2;x.stroke()}
  if(polo){x.fillStyle=sd(sr,.85);x.fillRect(NX-2.3,shY-1.2,4.6,1.1)}}
 /* --- głowa --- */
 const hw=fem?2.45:2.65,hh=fem?3.05:3.15;
 const ear=()=>{x.fillStyle=sd(sk,.88);if(!side){x.beginPath();x.ellipse(HX-hw-.05,HY+.4,.5,.85,0,0,7);x.ellipse(HX+hw+.05,HY+.4,.5,.85,0,0,7);x.fill()}else{x.beginPath();x.ellipse(HX-.6,HY+.4,.6,.95,0,0,7);x.fill()}
  if(fem&&front&&!side&&hair!=1){x.fillStyle='#f2c230';x.beginPath();x.arc(HX-hw-.05,HY+1.35,.28,0,7);x.arc(HX+hw+.05,HY+1.35,.28,0,7);x.fill()}};
 ear();
 const hg=x.createRadialGradient(HX-.9,HY-1.2,.3,HX,HY,hh*1.2);hg.addColorStop(0,sd(sk,1.12));hg.addColorStop(.7,sk);hg.addColorStop(1,sd(sk,.8));x.fillStyle=hg;
 x.beginPath();x.moveTo(HX-hw,HY-.6);x.quadraticCurveTo(HX-hw,HY-hh,HX,HY-hh);x.quadraticCurveTo(HX+hw,HY-hh,HX+hw,HY-.6);
 if(fem){x.quadraticCurveTo(HX+hw-.1,HY+1.9,HX+.9,HY+hh-.1);x.quadraticCurveTo(HX,HY+hh+.25,HX-.9,HY+hh-.1);x.quadraticCurveTo(HX-hw+.1,HY+1.9,HX-hw,HY-.6)}
 else{x.lineTo(HX+hw-.15,HY+1.4);x.quadraticCurveTo(HX+hw-.5,HY+hh-.2,HX+1,HY+hh);x.lineTo(HX-1,HY+hh);x.quadraticCurveTo(HX-hw+.5,HY+hh-.2,HX-hw+.15,HY+1.4);x.closePath()}
 x.fill();
 /* --- twarz --- */
 if(front){const fx=HX+sn*1.1*(side?1:.6),ew=side?.7:1;
  /* oczy */
  const blink=((t+(c.skin|0)*.7)%4.3)<.13||cel=='down';for(const s of[-1,1]){if(side&&s<0)continue;const ex=fx+s*1.02*ew,ey=HY+.05;if(blink){x.strokeStyle=sd(sk,.45);x.lineWidth=.2;x.beginPath();x.moveTo(ex-.5*ew,ey+.05);x.quadraticCurveTo(ex,ey+(cel=='down'?.25:.2),ex+.5*ew,ey+.05);x.stroke();x.strokeStyle=sd(hc,fem?.85:.75);x.lineWidth=fem?.17:.3;x.beginPath();x.moveTo(ex-s*.55*ew,ey-.72+(cel=='down'?-.15*s:0));x.quadraticCurveTo(ex,ey-.95,ex+s*.62*ew,ey-.78+(cel=='down'?.25:0));x.stroke();continue}x.fillStyle='#fbfbf8';x.beginPath();x.ellipse(ex,ey,.55*ew,.36,0,0,7);x.fill();x.fillStyle=eye;x.beginPath();x.arc(ex+sn*.12,ey+.02,.3,0,7);x.fill();x.fillStyle='#120c08';x.beginPath();x.arc(ex+sn*.12,ey+.02,.15,0,7);x.fill();x.fillStyle='rgba(255,255,255,.9)';x.beginPath();x.arc(ex+sn*.12+.1,ey-.1,.07,0,7);x.fill();
   x.strokeStyle=sd(sk,.55);x.lineWidth=fem?.17:.12;x.beginPath();x.ellipse(ex,ey,.58*ew,.39,0,Math.PI*1.05,Math.PI*1.95);x.stroke();
   if(fem){x.strokeStyle='#1a120c';x.lineWidth=.12;x.beginPath();x.moveTo(ex+s*.45*ew,ey-.18);x.lineTo(ex+s*.78*ew,ey-.45);x.moveTo(ex+s*.25*ew,ey-.32);x.lineTo(ex+s*.45*ew,ey-.62);x.stroke()}
   /* brwi */x.strokeStyle=sd(hc,fem?.85:.75);x.lineWidth=fem?.17:.3;x.lineCap='round';x.beginPath();x.moveTo(ex-s*.55*ew,ey-.72+(fem?.05:0));x.quadraticCurveTo(ex,ey-(fem?1.02:.95),ex+s*.62*ew,ey-.78);x.stroke()}
  /* nos */x.strokeStyle=sd(sk,.66);x.lineWidth=.17;x.beginPath();x.moveTo(fx+.12,HY+.35);x.quadraticCurveTo(fx+.45,HY+1.15,fx+.05,HY+1.3);x.stroke();x.fillStyle=sd(sk,.78);x.beginPath();x.ellipse(fx-.3,HY+1.32,.18,.1,0,0,7);x.ellipse(fx+.3,HY+1.32,.18,.1,0,0,7);x.fill();
  /* policzki */x.fillStyle=fem?'rgba(230,110,120,.26)':'rgba(220,110,100,.16)';x.beginPath();x.arc(fx-1.45*ew,HY+1.2,.6,0,7);if(!side)x.arc(fx+1.45*ew,HY+1.2,.6,0,7);x.fill();
  /* usta */if(cel=='up'||cel=='fist'){x.fillStyle='#5a1a1a';x.beginPath();x.moveTo(fx-.85,HY+1.9);x.quadraticCurveTo(fx,HY+3.1,fx+.85,HY+1.9);x.closePath();x.fill();x.fillStyle='#fff';x.fillRect(fx-.6,HY+1.92,1.2,.3)}else if(cel=='down'){x.strokeStyle='#7a3a2e';x.lineWidth=.22;x.beginPath();x.moveTo(fx-.6,HY+2.35);x.quadraticCurveTo(fx,HY+1.95,fx+.6,HY+2.35);x.stroke()}else if(fem){x.fillStyle='#c24a5a';x.beginPath();x.moveTo(fx-.75,HY+2.02);x.quadraticCurveTo(fx-.3,HY+1.78,fx,HY+1.92);x.quadraticCurveTo(fx+.3,HY+1.78,fx+.75,HY+2.02);x.quadraticCurveTo(fx,HY+2.6,fx-.75,HY+2.02);x.fill();x.fillStyle='rgba(255,255,255,.35)';x.beginPath();x.ellipse(fx+.15,HY+2.2,.22,.07,0,0,7);x.fill()}
  else{x.strokeStyle='#7a3a2e';x.lineWidth=.22;x.lineCap='round';x.beginPath();x.moveTo(fx-.75,HY+2.0);x.quadraticCurveTo(fx,HY+2.45,fx+.75,HY+2.0);x.stroke();x.strokeStyle=sd(sk,.8);x.lineWidth=.12;x.beginPath();x.moveTo(fx-.4,HY+2.6);x.quadraticCurveTo(fx,HY+2.75,fx+.4,HY+2.6);x.stroke()}
  if(c.beard&&!fem){x.fillStyle=sd(hc,.95);x.globalAlpha=c.beard==1?.42:.95;x.beginPath();x.moveTo(HX-hw+.1,HY+.4);x.quadraticCurveTo(HX-hw+.2,HY+(c.beard==2?3.9:3.1),HX,HY+(c.beard==2?4.3:3.35));x.quadraticCurveTo(HX+hw-.2,HY+(c.beard==2?3.9:3.1),HX+hw-.1,HY+.4);x.quadraticCurveTo(HX+1.3,HY+1.6,HX+.7,HY+1.75);x.quadraticCurveTo(HX,HY+1.55,HX-.7,HY+1.75);x.quadraticCurveTo(HX-1.3,HY+1.6,HX-hw+.1,HY+.4);x.fill();
   x.globalAlpha=1;if(c.beard==2){x.fillStyle=sk;x.beginPath();x.ellipse(fx,HY+2.25,.75,.35,0,0,7);x.fill();x.strokeStyle='#7a3a2e';x.lineWidth=.22;x.beginPath();x.moveTo(fx-.6,HY+2.1);x.quadraticCurveTo(fx,HY+2.45,fx+.6,HY+2.1);x.stroke()}}}
 /* --- włosy (wierzch) --- */
 const hcg=x.createLinearGradient(HX-hw,HY-hh,HX+hw,HY);hcg.addColorStop(0,sd(hc,1.25));hcg.addColorStop(1,sd(hc,.8));
 if(hair!=4&&hair<5){x.fillStyle=hcg;
  if(front){
   if(hair==3){for(let k=-3;k<=3;k++){x.beginPath();x.arc(HX+k*.82,HY-hh+.55+Math.abs(k)*.18,1.05,0,7);x.fill()}x.beginPath();x.arc(HX-hw+.2,HY-.9,.9,0,7);x.arc(HX+hw-.2,HY-.9,.9,0,7);x.fill()}
   else{x.beginPath();x.moveTo(HX-hw-.15,HY+.2);x.quadraticCurveTo(HX-hw-.3,HY-hh-.4,HX,HY-hh-.45);x.quadraticCurveTo(HX+hw+.3,HY-hh-.4,HX+hw+.15,HY+.2);
    if(fem&&hair!=2&&hair!=0){x.quadraticCurveTo(HX+hw-.4,HY-1.6,HX+.6,HY-1.9);x.quadraticCurveTo(HX-1.2,HY-1.2,HX-hw+.2,HY-.6);x.lineTo(HX-hw-.15,HY+.2)}
    else if(fem){x.quadraticCurveTo(HX+hw-.3,HY-1.8,HX+.4,HY-2.1);x.quadraticCurveTo(HX-1.4,HY-1.5,HX-hw+.1,HY-.9)}
    else{x.lineTo(HX+hw-.1,HY-1.1);x.quadraticCurveTo(HX+1.2,HY-2.05,HX-.6,HY-1.95);x.quadraticCurveTo(HX-1.8,HY-1.9,HX-hw+.1,HY-1.1)}
    x.closePath();x.fill();
    x.strokeStyle='rgba(255,255,255,.18)';x.lineWidth=.14;x.beginPath();x.moveTo(HX-1.4,HY-hh+.2);x.quadraticCurveTo(HX-.2,HY-hh-.1,HX+1.2,HY-hh+.5);x.stroke();
    if(fem&&hair==1){x.fillStyle=hcg;x.beginPath();x.moveTo(HX-hw-.15,HY);x.quadraticCurveTo(HX-hw-.6,HY+3.5,HX-hw+.3,HY+6.5);x.lineTo(HX-hw+.9,HY+6);x.quadraticCurveTo(HX-hw+.2,HY+3,HX-hw+.35,HY);x.closePath();x.moveTo(HX+hw+.15,HY);x.quadraticCurveTo(HX+hw+.6,HY+3.5,HX+hw-.3,HY+6.5);x.lineTo(HX+hw-.9,HY+6);x.quadraticCurveTo(HX+hw-.2,HY+3,HX+hw-.35,HY);x.closePath();x.fill()}
    if(fem&&hair==0){x.beginPath();x.moveTo(HX-hw-.2,HY-.5);x.quadraticCurveTo(HX-hw-.5,HY+2,HX-hw+.5,HY+2.6);x.lineTo(HX-hw+.6,HY);x.closePath();x.moveTo(HX+hw+.2,HY-.5);x.quadraticCurveTo(HX+hw+.5,HY+2,HX+hw-.5,HY+2.6);x.lineTo(HX+hw-.6,HY);x.closePath();x.fill()}}
   if(hair==2){x.fillStyle=sd(hc,.9);x.beginPath();x.ellipse(HX+(side?-2.6:0),HY-hh+(side?.8:-.3),side?1.6:1.1,side?1.9:.8,side?.6:0,0,7);x.fill()}}
  else{/* od tyłu */x.beginPath();x.ellipse(HX,HY-.4,hw+.25,hh+.2,0,Math.PI,2*Math.PI);x.lineTo(HX+hw+.2,HY+(hair==1?(fem?6:3.2):1.6));x.quadraticCurveTo(HX,HY+(hair==1?(fem?7.4:3.8):2.4),HX-hw-.2,HY+(hair==1?(fem?6:3.2):1.6));x.closePath();x.fill();
   if(hair==3)for(let k=0;k<8;k++){const a=Math.PI*(1+k/7);x.beginPath();x.arc(HX+Math.cos(a)*hw,HY-.3+Math.sin(a)*hh,1,0,7);x.fill()}
   if(hair==2){x.fillStyle=sd(hc,.85);x.beginPath();x.ellipse(HX,HY+(fem?3.8:2.6),.85,fem?2.6:1.2,0,0,7);x.fill();x.fillStyle='#d8382c';x.fillRect(HX-.6,HY+1.2,1.2,.5)}
   x.strokeStyle='rgba(0,0,0,.18)';x.lineWidth=.12;for(let k=-2;k<=2;k++){x.beginPath();x.moveTo(HX+k*.8,HY-hh+.3);x.quadraticCurveTo(HX+k*.9,HY,HX+k*.7,HY+1.4);x.stroke()}}}
 /* --- nowe fryzury: 5 kok, 6 warkocz, 7 grzywka, 8 undercut --- */
 if(hair>=5&&hair<=8){x.fillStyle=hcg;
  if(hair==7){if(front){x.beginPath();x.moveTo(HX-hw-.5,HY+2.6);x.quadraticCurveTo(HX-hw-.7,HY-hh-.5,HX,HY-hh-.5);x.quadraticCurveTo(HX+hw+.7,HY-hh-.5,HX+hw+.5,HY+2.6);x.lineTo(HX+hw-.3,HY+2.6);x.lineTo(HX+hw-.35,HY-1.1);x.lineTo(HX-hw+.35,HY-1.1);x.lineTo(HX-hw+.3,HY+2.6);x.closePath();x.fill();x.fillStyle=sd(hc,.75);for(let k=-2;k<=2;k++){x.beginPath();x.moveTo(HX+k*.95-.5,HY-1.8);x.lineTo(HX+k*.95,HY-.75);x.lineTo(HX+k*.95+.5,HY-1.8);x.fill()}}else{x.beginPath();x.ellipse(HX,HY-.3,hw+.5,hh+.1,0,Math.PI,2*Math.PI);x.lineTo(HX+hw+.5,HY+2.6);x.lineTo(HX-hw-.5,HY+2.6);x.closePath();x.fill()}}
  else{if(front){x.beginPath();x.moveTo(HX-hw-.1,HY-.2);x.quadraticCurveTo(HX-hw-.2,HY-hh-.4,HX,HY-hh-.4);x.quadraticCurveTo(HX+hw+.2,HY-hh-.4,HX+hw+.1,HY-.2);x.quadraticCurveTo(HX+1,HY-2.3,HX-hw+.2,HY-.9);x.closePath();x.fill()}else{x.beginPath();x.ellipse(HX,HY-.3,hw+.2,hh,0,Math.PI,2*Math.PI);x.lineTo(HX+hw+.2,HY+1.2);x.lineTo(HX-hw-.2,HY+1.2);x.closePath();x.fill()}
   if(hair==5){x.fillStyle=sd(hc,.95);x.beginPath();x.arc(HX,HY-hh-1.1,1.35,0,7);x.fill();x.strokeStyle='rgba(0,0,0,.2)';x.lineWidth=.15;x.beginPath();x.arc(HX,HY-hh-1.1,.8,0,5);x.stroke()}
   if(hair==6){x.fillStyle=sd(hc,.9);const bx=front?HX+hw*.8:HX,by=HY+.8;for(let k=0;k<5;k++){x.beginPath();x.ellipse(bx+(front?.2*k:0),by+k*1.25,.75-.06*k,.7,k%2?.4:-.4,0,7);x.fill()}x.fillStyle='#d8382c';x.fillRect(bx-.45+(front?.9:0),by+6.1,.9,.4)}
   if(hair==8){x.fillStyle=sd(hc,1.1);x.beginPath();x.moveTo(HX-hw+.6,HY-hh+.4);x.quadraticCurveTo(HX-1,HY-hh-1.6,HX+2.4,HY-hh-.6);x.quadraticCurveTo(HX+1.2,HY-hh+.6,HX-hw+.6,HY-hh+.4);x.fill();if(front){x.fillStyle='rgba(0,0,0,.18)';x.fillRect(HX-hw-.1,HY-1.6,.6,1.5);x.fillRect(HX+hw-.5,HY-1.6,.6,1.5)}}}}
 /* --- nakrycie głowy --- */
 const hat=c.hat==null?0:c.hat;
 if(hat==0){const cg=x.createRadialGradient(HX-.9,HY-hh,.2,HX,HY-1.3,3.6);cg.addColorStop(0,sd(cp,1.3));cg.addColorStop(1,sd(cp,.75));x.fillStyle=cg;x.beginPath();x.ellipse(HX,HY-1.25,hw+.35,hh-.4,0,Math.PI,2*Math.PI);x.lineTo(HX+hw+.35,HY-.75);x.lineTo(HX-hw-.35,HY-.75);x.closePath();x.fill();
  x.strokeStyle='rgba(0,0,0,.18)';x.lineWidth=.12;x.beginPath();x.moveTo(HX,HY-hh-.5);x.lineTo(HX,HY-.8);x.stroke();x.fillStyle=sd(cp,1.3);x.beginPath();x.arc(HX,HY-hh-.55,.35,0,7);x.fill();
  if(front&&!side){x.fillStyle=sd(cp,.6);x.beginPath();x.ellipse(HX,HY-.75,3.4,.75,0,0,Math.PI);x.fill();x.fillStyle='rgba(0,0,0,.16)';x.beginPath();x.ellipse(HX,HY-.15,2.4,.3,0,0,Math.PI);x.fill();x.fillStyle='rgba(255,255,255,.85)';x.beginPath();x.arc(HX,HY-2.2,.55,0,7);x.fill()}
  else if(side){x.fillStyle=sd(cp,.6);x.beginPath();x.ellipse(HX+hw+.8,HY-.75,1.9,.55,0,0,7);x.fill()}
  else{x.fillStyle='rgba(0,0,0,.35)';x.fillRect(HX-.9,HY-1.05,1.8,.5)}}
 else if(hat==1){x.fillStyle=sd(cp,.95);x.beginPath();x.ellipse(HX,HY-1.05,hw+.35,hh-.1,0,Math.PI,2*Math.PI);x.fill();x.fillStyle=sd(cp,.78);x.fillRect(HX-hw-.35,HY-1.4,(hw+.35)*2,1.25);x.strokeStyle='rgba(0,0,0,.15)';x.lineWidth=.16;for(let k=-hw;k<=hw;k+=.75){x.beginPath();x.moveTo(HX+k,HY-1.4);x.lineTo(HX+k,HY-.15);x.stroke()}x.fillStyle=sd(cp,1.3);x.beginPath();x.arc(HX,HY-hh-1,1,0,7);x.fill()}
 else if(hat==2){x.fillStyle=sd(cp,.7);x.beginPath();x.ellipse(HX,HY-.95,4.9,1.45,0,0,7);x.fill();x.fillStyle=sd(cp,1.02);x.beginPath();x.ellipse(HX,HY-1.55,hw-.05,hh-.7,0,Math.PI,2*Math.PI);x.fill();x.fillStyle=sd(cp,.5);x.fillRect(HX-hw,HY-1.95,hw*2,.6)}
 try{const st=window.CAPST&&CAPST[c.cap];if(st&&hat!=3){const Y=HY-(hat==1?3.7:hat==2?3.8:3.5);x.save();x.translate(HX,Y);x.scale(1.25,1.25);
  if(st=='crown'){x.fillStyle='#f2c230';x.strokeStyle='#b8860b';x.lineWidth=.2;x.beginPath();x.moveTo(-2.6,.6);x.lineTo(-2.6,-1.8);x.lineTo(-1.3,-.6);x.lineTo(0,-2.4);x.lineTo(1.3,-.6);x.lineTo(2.6,-1.8);x.lineTo(2.6,.6);x.closePath();x.fill();x.stroke()}
  else if(st=='basket'){x.fillStyle='#c8ced4';x.fillRect(-.2,-3.6,.4,3.8);x.strokeStyle='#ffd23f';x.lineWidth=.35;x.beginPath();x.ellipse(0,-3,2,.6,0,0,7);x.stroke();x.fillStyle='#9aa5ae';x.beginPath();x.ellipse(0,-.8,1.7,.45,0,0,7);x.fill()}
  else if(st=='turkey'){const cc=['#c8551d','#e0902a','#f2c14e','#e0902a','#c8551d'];cc.forEach((q,k)=>{x.fillStyle=q;x.beginPath();x.ellipse((k-2)*1.05,-1.4,.6,1.8,(k-2)*.35,0,7);x.fill()})}
  else if(st=='eagle'){x.fillStyle='#4a3018';x.beginPath();x.moveTo(-2.8,.4);x.lineTo(-4.2,-1.6);x.lineTo(-1.6,-.2);x.closePath();x.moveTo(2.8,.4);x.lineTo(4.2,-1.6);x.lineTo(1.6,-.2);x.closePath();x.fill()}
  else if(st=='ushanka'){x.fillStyle='#cbb79a';x.beginPath();x.roundRect(-3.3,1,1.2,3.4,.6);x.roundRect(2.1,1,1.2,3.4,.6);x.fill()}
  x.restore()}}catch(e){}
 if(back)backHair();
 if(!behind)arm(RS,aR,back,P.disc!=null?P.disc:!(!P.idle&&!P.putt&&sw>.2));
 x.restore()}
window.__draw2=draw2;
window.__draw2v=function(x,c,P,hold,t,sn,cs,front){const mx=(sn<-.12?-1:1)*(front?-1:1);draw2(x,c,P.A+Math.PI,{sw:P.sw,cr:P.cr,lean:P.lean,step:P.step,heel:P.heel,idle:P.idle,putt:P.putt,hb:P.hd>0?1:-1,walk:P.walk,cel:P.cel,mx,front,sq:.86+.14*Math.abs(cs),noShadow:1,disc:!P.cel&&P.walk==null&&!!(hold||P.idle||(!P.idle&&P.showDisc)),dcol:(typeof discs!='undefined'&&typeof di!='undefined'&&discs[di])?discs[di].col:null},t)};
/* ---------- podgląd w menu ---------- */
const ST={yaw:.3,ty:.3,anim:null,t0:0,drag:null,raf:0,cv:null};
function pose(now){let sw=.15,cr=0,lean=0,step=0,heel=0,idle=true,putt=false,hb=1;const A=ST.anim;
 if(A){const e=(now-ST.t0)/1000;if(A=='putt'){putt=true;idle=false;sw=kf([[0,0],[.6,-.7],[.9,-.7],[1.05,.45],[1.8,.45],[2.3,.1]],e);cr=.55}
  else{idle=false;sw=kf([[0,.1],[.7,-1],[1.0,-1],[1.12,.1],[1.42,1],[2.1,.15]],e);cr=e<1.4?.22:lerp(.22,0,cl((e-1.4)/.6,0,1));lean=e>1.05&&e<1.6?.18:0;step=e>.4&&e<2?1:0;heel=e>1.1&&e<1.9?1:0}
  if(e>2.5){ST.anim=null;btns()}}
 return{sw,cr,lean,step,heel,idle,putt,hb}}
function frame(){const cv=ST.cv;if(!cv||!document.body.contains(cv)){ST.raf=0;return}const v=$('v-chr');if(v&&v.hidden){ST.raf=requestAnimationFrame(frame);return}
 const x=cv.getContext('2d'),w=cv.width,h=cv.height,now=performance.now(),t=now/1000;ST.yaw+=(ST.ty-ST.yaw)*.12;
 x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,w,h);const k=w/320;x.save();x.scale(k,k);
 /* scena: trawa, światło, kosz w tle */
 const sky=x.createRadialGradient(160,120,10,160,160,260);sky.addColorStop(0,'rgba(255,240,190,.18)');sky.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=sky;x.fillRect(0,0,320,330);
 x.fillStyle='rgba(255,255,255,.05)';for(let i=0;i<60;i++){const gx=(i*53)%320,gy=245+((i*37)%80);x.fillRect(gx,gy,1,3)}
 x.save();x.translate(266,226);x.globalAlpha=.5;x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(0,2,14,3,0,0,7);x.fill();x.fillStyle='#9aa4ad';x.fillRect(-1.4,-62,2.8,64);x.strokeStyle='#d8dee3';x.lineWidth=1;for(let i=-5;i<=5;i++){x.beginPath();x.moveTo(i*2.6,-56);x.quadraticCurveTo(i*1.6,-44,i*.6,-36);x.stroke()}x.fillStyle='#f6b90c';x.beginPath();x.ellipse(0,-57,16,4.5,0,0,7);x.fill();x.strokeStyle='#f6b90c';x.lineWidth=2;x.beginPath();x.ellipse(0,-28,14,4,0,0,7);x.stroke();x.restore();
 x.fillStyle='rgba(0,0,0,.2)';x.beginPath();x.ellipse(150,284,92,14,0,0,7);x.fill();
 x.translate(150,282);x.scale(6.9,6.9);draw2(x,SV.char||{},ST.yaw,pose(now),t);x.restore();
 ST.raf=requestAnimationFrame(frame)}
function btns(){const b=$('avsvg')&&$('avsvg').querySelector('.hbtn');if(!b)return;b.querySelectorAll('[data-an]').forEach(e=>e.classList.toggle('on',e.dataset.an===ST.anim))}
function mount(){const el=$('avsvg');if(!el)return;el.classList.add('hero');
 if(!ST.cv){ST.cv=document.createElement('canvas');const d=Math.min(2.5,window.devicePixelRatio||1);ST.cv.width=320*d;ST.cv.height=330*d;
  ST.cv.style.cssText='display:block;margin:0 auto;width:auto!important;max-width:100%;height:min(46vh,330px)!important;aspect-ratio:320/330;touch-action:pan-y';ST.cv.addEventListener('pointerdown',e=>{ST.drag={x:e.clientX,y:e.clientY,y0:ST.ty,h:null}});addEventListener('pointermove',e=>{const D=ST.drag;if(!D)return;const dx=e.clientX-D.x,dy=e.clientY-D.y;if(D.h==null&&Math.hypot(dx,dy)>8)D.h=Math.abs(dx)>Math.abs(dy);if(D.h)ST.ty=D.y0+dx*.025;else if(D.h===false)ST.drag=null});addEventListener('pointerup',()=>{ST.drag=null});addEventListener('pointercancel',()=>{ST.drag=null})}
 el.innerHTML='';el.appendChild(ST.cv);const hh=document.createElement('div');hh.className='hhint';hh.textContent='⟲ przesuń palcem, żeby obrócić';el.appendChild(hh);
 const b=document.createElement('div');b.className='hbtn';b.innerHTML='<button data-v="0.3">Przód</button><button data-v="1.45">Bok</button><button data-v="3.14">Tył</button><button data-an="bh">🥏 Rzut</button><button data-an="putt">⛳ Putt</button>';el.appendChild(b);
 b.querySelectorAll('[data-v]').forEach(e=>e.onclick=()=>{ST.ty=+e.dataset.v});
 b.querySelectorAll('[data-an]').forEach(e=>e.onclick=()=>{ST.anim=e.dataset.an;ST.t0=performance.now();ST.ty=e.dataset.an=='putt'?.3:1.2;btns()});
 if(!ST.raf)ST.raf=requestAnimationFrame(frame)}
/* dodatkowe opcje w menu: styl koszulki, numer, kolor oczu */
function extraOpts(){const box=$('chopts');if(!box||box.querySelector('#p198o'))return;const c=SV.char;
 try{const HN=['Krótkie','Długie','Kucyk','Kręcone','Łysy','Kok','Warkocz','Grzywka','Undercut'];const row=[...box.querySelectorAll('.opt')].find(o=>/Fryzura/.test(o.querySelector('span')&&o.querySelector('span').textContent||''));if(row){const ch=row.querySelector('.chips');ch.innerHTML=HN.map((n,i)=>'<button class="'+((c.hair|0)==i?'on':'')+'" data-k8="hair" data-i="'+i+'">'+n+'</button>').join('')}}catch(e){}
 const d=document.createElement('div');d.id='p198o';
 const chips=(l,k,arr)=>'<div class="opt"><span>'+l+'</span><div class="chips">'+arr.map((n,i)=>'<button class="'+((c[k]|0)==i?'on':'')+'" data-k8="'+k+'" data-i="'+i+'">'+n+'</button>').join('')+'</div></div>';
 const sws=(l,k,arr)=>'<div class="opt"><span>'+l+'</span><div class="sw">'+arr.map((col,i)=>'<button class="'+((c[k]|0)==i?'on':'')+'" style="background:'+col+'" data-k8="'+k+'" data-i="'+i+'"></button>').join('')+'</div></div>';
 d.innerHTML=chips('Styl koszulki','ss',SS)+((c.ss|0)==3?'<div class="opt"><span>Numer na koszulce</span><div class="nick"><input id="p198num" inputmode="numeric" maxlength="2" value="'+(c.num||7)+'"></div></div>':'')+sws('Kolor oczu','eye',EYE);
 const anchor=[...box.querySelectorAll('.opt')].find(o=>/Koszulka/.test(o.textContent));if(anchor)anchor.before(d);else box.appendChild(d);
 box.querySelectorAll('[data-k8]').forEach(b=>b.onclick=()=>{SV.char[b.dataset.k8]=+b.dataset.i;try{persist()}catch(e){}renderChr()});
 const ni=d.querySelector('#p198num');if(ni){ni.onclick=e=>e.stopPropagation();ni.onchange=()=>{const v=Math.max(0,Math.min(99,parseInt(ni.value)||0));SV.char.num=v;try{persist()}catch(e){}}}}
const _rc=renderChr;renderChr=function(){const r=_rc.apply(this,arguments);try{mount();extraOpts()}catch(e){console.warn('P198',e)}return r};
window.__chrPic=function(ch,W,H){const d=Math.min(2.5,window.devicePixelRatio||1),c=document.createElement('canvas');c.width=W*d;c.height=H*d;c.style.width=W+'px';c.style.height=H+'px';const x=c.getContext('2d');x.scale(d,d);x.translate(W/2,H-6);const k=(H-12)/39;x.scale(k,k);draw2(x,ch||{},.3,{sw:.15,cr:0,lean:0,step:0,heel:0,idle:true,putt:false,hb:1},0);return c};
}catch(e){console.warn('P198',e)}})();
</script>
