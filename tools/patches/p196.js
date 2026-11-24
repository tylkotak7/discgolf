<script>/* P196: WRC Street Wągrowiec (od v225 bez bety, ranking) – pole miejskie: bruk, asfalt, kamienice z oknami, samochody, fontanna; dołek 1: Rynek po przekątnej, kosz w rogu przy zejściu na Bydgoską. Runda beta nie liczy się do rekordów. */
(function(){try{
const TAU=6.2832;
/* ---------- geometria: współrzędne ze zrzutu mapy (px) → świat (1 m = 5 j.) ---------- */
const mkP=(K,X0,Y0)=>(x,y)=>[(x-X0)/K,(y-Y0)/K];
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1]],nrm=v=>{const l=Math.hypot(v[0],v[1])||1;return[v[0]/l,v[1]/l]};
const dseg=(p,a,e)=>{const vx=e[0]-a[0],vy=e[1]-a[1],l2=vx*vx+vy*vy||1,f=Math.max(0,Math.min(1,((p[0]-a[0])*vx+(p[1]-a[1])*vy)/l2));return Math.hypot(p[0]-a[0]-vx*f,p[1]-a[1]-vy*f)};
const dpl=(p,P)=>{let m=1e9;for(let i=1;i<P.length;i++)m=Math.min(m,dseg(p,P[i-1],P[i]));return m};
const inPoly=(x,y,P)=>{let c=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const[a,b]=P[i],[e,f]=P[j];if(((b>y)!=(f>y))&&(x<(e-a)*(y-b)/(f-b)+a))c=!c}return c};
function line(h,T,B,w){const n=40,q=[];for(let i=0;i<=n;i++)q.push([T[0]+(B[0]-T[0])*i/n,T[1]+(B[1]-T[1])*i/n]);const L=Math.hypot(B[0]-T[0],B[1]-T[1]),ux=(B[0]-T[0])/L,uy=(B[1]-T[1])/L,nx=-uy,ny=ux;
 h.path=q;h.pf=q.map((_,i)=>i/n);h.cwf=()=>w;h.cw=w;h.L=L;h.rel=(u,l)=>[T[0]+ux*u+nx*l,T[1]+uy*u+ny*l];h.lat=p=>(p[0]-T[0])*nx+(p[1]-T[1])*ny;h.along=p=>(p[0]-T[0])*ux+(p[1]-T[1])*uy}
/* kamienice wzdłuż pierzei: a→b oś ulicy, side=+1/-1 strona, off = odległość frontu od osi */
function rowHouses(U,a,b,side,off,seed,s0,s1){const R=rnd(seed),u=nrm(sub(b,a)),v=[-u[1]*side,u[0]*side],L=Math.hypot(b[0]-a[0],b[1]-a[1]);let s=s0==null?0:s0;const e=s1==null?L:s1;
 while(s<e){const sc=U.sc||1,w=(44+R()*30)*sc,d=(56+R()*22)*sc,c=[a[0]+u[0]*(s+w/2)+v[0]*(off+d/2),a[1]+u[1]*(s+w/2)+v[1]*(off+d/2)];
  U.bld.push({row:1,c,u,v,a:w/2-.3,b:d/2,h:(58+R()*30)*Math.max(.6,sc),rf:(R()*6)|0,fc:(R()*6)|0,fl:R()<.25});s+=w}}
/* ---------- malowanie pola miejskiego (wywoływane z build3) ---------- */
const ROOF=[[.56,.24,.16],[.44,.2,.14],[.36,.36,.38],[.27,.26,.26],[.5,.32,.22],[.6,.58,.55]];
const CARC=[[.92,.92,.9],[.72,.74,.76],[.12,.12,.13],[.3,.31,.33],[.66,.12,.1],[.16,.24,.42],[.5,.52,.48],[.86,.86,.82]];
function urbPaint(h,E){const{HT,SPEC,SIDE,TW,TH,S,setA,wn,WAm}=E,au=typeof AUT3!='undefined'&&AUT3,U=h.U;
 const cm=fn=>{const c=document.createElement('canvas');c.width=TW;c.height=TH;const x=c.getContext('2d',{willReadFrequently:true});x.scale(S,S);x.fillStyle=x.strokeStyle='#fff';x.lineJoin='round';fn(x);const d=x.getImageData(0,0,TW,TH).data,a=new Float32Array(TW*TH);for(let i=0;i<a.length;i++)a[i]=d[i*4+3]/255;c.width=c.height=0;return a};
 const st=(x,r,w)=>{x.lineWidth=w;x.beginPath();r.p.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.stroke()};
 const PLm=cm(x=>{for(const P of U.plaza||[]){x.beginPath();P.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.closePath();x.fill()}});h._PLm=PLm;
 const RDm=cm(x=>{x.lineCap='butt';for(const r of U.roads)st(x,r,r.w)}),CBm=cm(x=>{x.lineCap='butt';for(const r of U.roads)st(x,r,r.w+2.6)});
 const LNm=cm(x=>{x.lineCap='butt';x.setLineDash([7,7]);for(const r of U.roads)if(r.c)st(x,r,.8)});
 const PKm=cm(x=>{x.lineWidth=.7;for(const o of U.cars){if(o.road)continue;const f=[Math.sin(o.a),-Math.cos(o.a)],r=[Math.cos(o.a),Math.sin(o.a)],hw=7.6*(U.sc||1)*(U.cs||1),hl=13*(U.sc||1)*(U.cs||1);for(const sd of[-1,1]){x.beginPath();x.moveTo(o.x+r[0]*hw*sd-f[0]*hl,o.y+r[1]*hw*sd-f[1]*hl);x.lineTo(o.x+r[0]*hw*sd+f[0]*hl,o.y+r[1]*hw*sd+f[1]*hl);x.stroke()}}});
 const LTm=U.lots&&U.lots.length?cm(x=>{for(const P of U.lots){x.beginPath();P.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.closePath();x.fill()}}):null,GRm=U.grass&&U.grass.length?cm(x=>{for(const P of U.grass){x.beginPath();P.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.closePath();x.fill()}}):null;
 const RA=U.rails||[],um=1/(h.M||.2),BAm=RA.length?cm(x=>{x.lineCap='butt';for(const r of RA){x.lineWidth=um*4.2;x.beginPath();r.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.stroke()}}):null,
  SLm=RA.length?cm(x=>{x.lineWidth=um*.26;for(const r of RA)for(let i=1;i<r.length;i++){const a=r[i-1],e=r[i],L=Math.hypot(e[0]-a[0],e[1]-a[1]),u=[(e[0]-a[0])/L,(e[1]-a[1])/L],n=[-u[1],u[0]];for(let t=0;t<L;t+=um*.62){const c=[a[0]+u[0]*t,a[1]+u[1]*t];x.beginPath();x.moveTo(c[0]-n[0]*um*1.3,c[1]-n[1]*um*1.3);x.lineTo(c[0]+n[0]*um*1.3,c[1]+n[1]*um*1.3);x.stroke()}}}):null,
  RLm=RA.length?cm(x=>{x.lineWidth=Math.max(.35,um*.12);for(const r of RA)for(const sd of[-1,1]){x.beginPath();for(let i=0;i<r.length;i++){const a=r[Math.max(0,i-1)],e=r[Math.min(r.length-1,i+1)],L=Math.hypot(e[0]-a[0],e[1]-a[1])||1,n=[-(e[1]-a[1])/L,(e[0]-a[0])/L],q=[r[i][0]+n[0]*sd*um*.72,r[i][1]+n[1]*sd*um*.72];i?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1])}x.stroke()}}):null;
 const pm=(L,fn)=>L&&L.length?cm(fn):null,polyF=L=>x=>{for(const P of L){x.beginPath();P.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.closePath();x.fill()}};
 const PAm=pm(U.paths,x=>{x.lineCap='round';for(const r of U.paths)st(x,r,r.w)}),DIm=pm(U.dirt,polyF(U.dirt||[])),CTm=pm(U.courts,polyF(U.courts||[])),CLm=pm(U.courts,x=>{x.lineWidth=.6;x.strokeStyle='#fff';for(const P of U.courts){x.beginPath();P.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.closePath();x.stroke();const c=P.reduce((a,p)=>[a[0]+p[0]/P.length,a[1]+p[1]/P.length],[0,0]);x.beginPath();x.arc(c[0],c[1],7,0,7);x.stroke();const m1=[(P[0][0]+P[1][0])/2,(P[0][1]+P[1][1])/2],m2=[(P[2][0]+P[3][0])/2,(P[2][1]+P[3][1])/2];x.beginPath();x.moveTo(m1[0],m1[1]);x.lineTo(m2[0],m2[1]);x.stroke();
   for(const[A,B2,s1]of[[P[0],P[3],1],[P[1],P[2],-1]]){const mid=[(A[0]+B2[0])/2,(A[1]+B2[1])/2],u=[(B2[0]-A[0]),(B2[1]-A[1])],L=Math.hypot(u[0],u[1]),uu=[u[0]/L,u[1]/L],n=[-uu[1]*s1,uu[0]*s1];const tp=(a,d)=>[mid[0]+uu[0]*a-n[0]*d,mid[1]+uu[1]*a-n[1]*d];x.beginPath();[[-6,0],[-6,17],[6,17],[6,0]].forEach((q,i)=>{const p=tp(q[0],q[1]);i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1])});x.stroke();const kc=tp(0,17);x.beginPath();x.arc(kc[0],kc[1],6,0,7);x.stroke();x.beginPath();for(let a=0;a<=20;a++){const an=-Math.PI/2+Math.PI*a/20,p=tp(Math.sin(an)*24,Math.cos(an)*24*.0+Math.max(0,Math.cos(an))*22);a?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1])}x.stroke()}}});
 const LKm=U.lake?cm(polyF([U.lake])):null,LKb=LKm?bl3(bl3(LKm,6),4):null;
 const SDd=U.stad||null;
 const TKm=U.track?cm(x=>{x.beginPath();U.track.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.closePath();x.fill()}):null;
 const BKm=U.roads.some(r=>r.bike)?cm(x=>{x.lineCap='butt';for(const r of U.roads)if(r.bike)st(x,r,r.w)}):null,BSm=BKm?cm(x=>{x.lineWidth=.5;for(const r of U.roads)if(r.bike){const A=r.p[0],B2=r.p[r.p.length-1],L=Math.hypot(B2[0]-A[0],B2[1]-A[1]);for(let d=30;d<L;d+=60){const c=[A[0]+(B2[0]-A[0])*d/L,A[1]+(B2[1]-A[1])*d/L];x.beginPath();x.arc(c[0]-2.4,c[1]+.8,1.6,0,7);x.arc(c[0]+2.4,c[1]+.8,1.6,0,7);x.stroke();x.beginPath();x.moveTo(c[0]-2.4,c[1]+.8);x.lineTo(c[0]-.6,c[1]-1.2);x.lineTo(c[0]+1.4,c[1]-1.2);x.lineTo(c[0]+2.4,c[1]+.8);x.stroke()}}}):null;
 const FR=U.fount.map(f=>[f.x*S,f.y*S,f.r*S]),TR=h.trees.map(t=>[t[0]*S,t[1]*S,t[2]*S*1.7]);
 const UMa=h._UM=new Uint8Array(TW*TH);
 for(let y=0;y<TH;y++)for(let x=0;x<TW;x++){const i=y*TW+x;if(WAm[i]>.55)continue;const pl=PLm[i],rd=RDm[i],cb=CBm[i];let r,g,b,ht;
  /* chodnik: płyty 50×50 */
  {const row=(y/6)|0,off=(row&1)*6,col=((x+off)/12)|0,ex=(x+off)%12,ey=y%6,j=ex==0||ey==0,bev=ex==1||ey==1,v=hs3(col,row,5),st=fb3(x*.02,y*.02,6,3),t=.47+v*.09+(st-.5)*.08+hs3(x,y,7)*.02;r=t;g=t*.985;b=t*.95;if(v>.88){r*=.82;g*=.82;b*=.84}else if(v<.06){r*=1.06;g*=.97;b*=.92}if(j){r*=.68;g*=.68;b*=.68}else if(bev){r*=1.08;g*=1.08;b*=1.08}ht=j?0:bev?.45:.8}
  if(U.park){const n=fb3(x*.03,y*.03,81,3),bl=vn3(x*.9,y*.22,82),cl=vn3(x*.3,y*.3,83);r=.27+n*.08+(bl-.5)*.05;g=.42+n*.08+(bl-.5)*.06;b=.16+n*.03;if(cl<.3){r+=.04;g-=.02}if(typeof AUT3!='undefined'&&AUT3){r+=.08;g-=.02}ht=bl*1.6+n*1.2}
  if(DIm&&DIm[i]>0){const k=DIm[i],n=fb3(x*.06,y*.06,84,3),s=hs3(x,y,85);let dr=.46+n*.1+s*.04,dg=.38+n*.08+s*.03,db=.25+n*.05;r+=(dr-r)*k;g+=(dg-g)*k;b+=(db-b)*k;ht=ht*(1-k)+(n*1.2)*k}
  if(TKm&&TKm[i]>0&&!(CTm&&CTm[i]>.5)){const k=TKm[i],ln=((x+y)%9)<1;r+=(.72-r)*k;g+=(.33-g)*k;b+=(.22-b)*k;if(ln&&k>.5){r=.9;g=.88;b=.84}ht=ht*(1-k)}
  let sdk=0;if(SDd){const wx=x/S-SDd.c[0],wy=y/S-SDd.c[1],du=wx*SDd.u[0]+wy*SDd.u[1],dv=-wx*SDd.u[1]+wy*SDd.u[0],tt=Math.max(-SDd.a,Math.min(SDd.a,du)),d=Math.hypot(du-tt,dv),lw=Math.max(.32,.75/S);
   if(d<=SDd.r+SDd.w){sdk=1;if(d>=SDd.r){const f=(d-SDd.r)/SDd.w,ln=(f*6)%1,n=hs3(x>>1,y>>1,78)*.04;r=.68+n;g=.26+n*.6;b=.2+n*.5;if(ln<.06||f<.03||f>.97){r=.93;g=.92;b=.9}ht=.3}
    else{const m=SDd.m,st=(((du+SDd.pl)/(SDd.pl/6))|0)&1,n=fb3(x*.04,y*.04,79,2)*.05+hs3(x,y,80)*.03;r=.2+n+(st?.035:0);g=.44+n+(st?.05:0);b=.16+n*.6;ht=.5+hs3(x,y,81)*.4;
     const ad=Math.abs(du),av=Math.abs(dv),P=SDd.pl,Q=SDd.pw;let L=0;
     if(ad<=P+lw&&av<=Q+lw){if(Math.abs(ad-P)<lw||Math.abs(av-Q)<lw||ad<lw*.9||Math.abs(Math.hypot(du,dv)-9.15*m)<lw||Math.hypot(du,dv)<lw*1.4)L=1;
      const pb=16.5*m,pq=20.15*m,gb=5.5*m,gq=9.16*m;if((Math.abs(ad-(P-pb))<lw&&av<=pq)||(Math.abs(av-pq)<lw&&ad>=P-pb&&ad<=P)||(Math.abs(ad-(P-gb))<lw&&av<=gq)||(Math.abs(av-gq)<lw&&ad>=P-gb&&ad<=P))L=1;
      if(Math.hypot(ad-(P-11*m),dv)<lw*1.4)L=1;if(ad<P-pb&&Math.abs(Math.hypot(ad-(P-11*m),dv)-9.15*m)<lw)L=1}
     if(L){r=.93;g=.94;b=.9;ht=.6}}}}
  if(CTm&&CTm[i]>0){const k=CTm[i],gs=hs3(x>>2,y>>2,77)*.03;r+=(.66+gs-r)*k;g+=(.27+gs-g)*k;b+=(.22+gs-b)*k;ht=ht*(1-k);if(CLm[i]>.3){r=.92;g=.92;b=.9}}
  if(PAm&&PAm[i]>0){const k=PAm[i],n=hs3(x,y,86)*.08+fb3(x*.05,y*.05,87,2)*.06;r+=(.68+n-r)*k;g+=(.6+n-g)*k;b+=(.45+n-b)*k;ht=ht*(1-k)+.2*k}
  /* rynek: kostka granitowa, rzędy z przesunięciem */
  if(pl>0){const row=(y/4)|0,off=(row&1)*3,col=((x+off)/6)|0,jx=((x+off)%6)==0,jy=(y%4)==0,v=hs3(col,row,11),n=fb3(x*.03,y*.03,12,3)*.1+v*.09;let pr=.6+n,pg=.56+n,pb=.5+n*.9;if(v>.93){pr-=.08;pg-=.07;pb-=.05}if(jx||jy){pr*=.74;pg*=.74;pb*=.74}for(const F of FR){const d=Math.hypot(x-F[0],y-F[1]);if((d>F[2]+14&&d<F[2]+20)||(d>F[2]+34&&d<F[2]+37)){pr*=.8;pg*=.82;pb*=.86}}const pk=PKm[i];if(pk>0){pr+=(.92-pr)*pk;pg+=(.92-pg)*pk;pb+=(.9-pb)*pk}r+=(pr-r)*pl;g+=(pg-g)*pl;b+=(pb-b)*pl;ht=ht*(1-pl)+(jx||jy?0:.6+v*.5)*pl}
  /* trawa / nieużytek */
  if(GRm&&GRm[i]>0){const k=GRm[i],n=fb3(x*.03,y*.03,41,3),bl=vn3(x*.9,y*.25,42),dr=fb3(x*.08,y*.08,43,2);let gr=.5+n*.1,gg=.46+n*.08,gb=.28;if(n<.45){gr=.34;gg=.43;gb=.19}if(dr>.64){gr=.47;gg=.39;gb=.27}gr+=(bl-.5)*.07;gg+=(bl-.5)*.07;r+=(gr-r)*k;g+=(gg-g)*k;b+=(gb-b)*k;ht=ht*(1-k)+(bl*1.8+n*1.4)*k}
  /* parking (asfalt + linie) */
  if(LTm&&LTm[i]>0){const k=LTm[i],n=hs3(x,y,24)*.05+fb3(x*.04,y*.04,25,3)*.06;let ar=.31+n,ag=.32+n,ab=.34+n;const pk=PKm[i];if(pk>0){ar+=(.9-ar)*pk;ag+=(.9-ag)*pk;ab+=(.88-ab)*pk}r+=(ar-r)*k;g+=(ag-g)*k;b+=(ab-b)*k;ht=ht*(1-k)-.3*k}
  /* jezioro */
  if(LKm){const lk=LKm[i],lb=LKb[i];if(lk<.5&&lb>.04&&!wn){const k=Math.min(1,lb*2.2);r+=(.36-r)*k;g+=(.33-g)*k;b+=(.2-b)*k;ht=ht*(1-k)-k*.5}if(lk>0){const dp=Math.min(1,Math.max(0,(lb-.5)*2.2)),n=vn3(x*.05,y*.22,95)*.5+vn3(x*.21,y*.05,96)*.5;let wr=.2-.1*dp+(n-.5)*.04,wg=.33-.1*dp+(n-.5)*.05,wb=.34+.02*dp+(n-.5)*.04;if(wn){wr=.66;wg=.76;wb=.84}r+=(wr-r)*lk;g+=(wg-g)*lk;b+=(wb-b)*lk;ht=ht*(1-lk)-2*lk;SPEC[i]=.9*lk}}
  /* tory: tłuczeń, podkłady, szyny */
  if(BAm&&BAm[i]>0){const k=BAm[i],n=hs3(x,y,71)*.14+fb3(x*.1,y*.1,72,2)*.06;r+=(.42+n-r)*k;g+=(.39+n-g)*k;b+=(.36+n-b)*k;ht=ht*(1-k)+(1+hs3(x,y,73)*.8)*k;if(SLm[i]>.3){r=.3;g=.22;b=.15;ht+=.8}if(RLm[i]>.3){r=.6;g=.6;b=.63;ht+=1.6}}
  /* krawężnik */
  if(cb>0&&rd<.6){const k=cb*(1-rd);r+=(.76-r)*k;g+=(.75-g)*k;b+=(.72-b)*k;ht+=1.4*k}
  /* asfalt */
  if(rd>0){const n=hs3(x,y,21)*.05+fb3(x*.04,y*.04,22,3)*.06,pt=fb3(x*.015,y*.015,23,2);let ar=.24+n,ag=.25+n,ab=.27+n;if(pt>.62){ar+=.04;ag+=.04;ab+=.04}const ln=LNm[i];if(ln>0){ar+=(.86-ar)*ln;ag+=(.86-ag)*ln;ab+=(.8-ab)*ln}r+=(ar-r)*rd;g+=(ag-g)*rd;b+=(ab-b)*rd;ht=ht*(1-rd)-.6*rd;SPEC[i]=.1*rd}else if(!(LKm&&LKm[i]>0))SPEC[i]=0;UMa[i]=(rd>.5||(LTm&&LTm[i]>.5))?2:(!sdk&&pl<.3&&!U.park&&!(GRm&&GRm[i]>.3)&&!(DIm&&DIm[i]>.3)&&!(BAm&&BAm[i]>.3)&&!(LKm&&LKm[i]>0)&&cb<.3&&!(TKm&&TKm[i]>.3)&&!(CTm&&CTm[i]>.3))?1:0;
  if(BKm&&BKm[i]>0){const k=BKm[i],n=hs3(x,y,26)*.05;r+=(.62+n-r)*k;g+=(.26+n*.6-g)*k;b+=(.22+n*.6-b)*k;if(BSm[i]>.4){r=.92;g=.9;b=.88}}
  /* liście jesienią pod drzewami, śnieg zimą */
  if(wn){const sn=fb3(x*.05,y*.05,31,3),k=rd>.5?(.35+sn*.3):(.72+sn*.25);r+=(.9-r)*k;g+=(.92-g)*k;b+=(.96-b)*k;ht+=.4}
  else if(au){for(const t of TR){const d=Math.hypot(x-t[0],y-t[1]);if(d<t[2]){const lf=hs3(x>>1,y>>1,91);if(lf>.78+d/t[2]*.2){const c=hs3(x>>1,y>>1,92);r=c<.4?.82:c<.75?.9:.6;g=c<.4?.42:c<.75?.66:.24;b=.1;ht+=.5}break}}}
  setA(i,r,g,b);HT[i]=ht;SIDE[i]=0}
 /* donice / kwietniki */
 for(const o of U.pots){const cx=o[0]*S,cy=o[1]*S,hw=o[2]*S;E.rectFn(cx-hw,cy-hw,cx+hw,cy+hw,(i,x,y)=>{const e=Math.min(x-(cx-hw),(cx+hw)-x,y-(cy-hw),(cy+hw)-y);if(e<2.2){HT[i]=6;setA(i,.58,.56,.52)}else{const n=fb3(x*.3,y*.3,44,2),bush=n>.35;HT[i]=bush?8+n*7:5;if(wn)setA(i,.9,.92,.96);else if(bush)au?setA(i,.7+n*.2,.38,.1):setA(i,.17+n*.1,.36+n*.12,.1);else setA(i,.25,.18,.12)}})}
 /* ławki */
 for(const o of U.bench||[]){const cx=o[0]*S,cy=o[1]*S,vert=o[2];E.rectFn(cx-(vert?5:14),cy-(vert?14:5),cx+(vert?5:14),cy+(vert?14:5),(i,x,y)=>{const sl=vert?((x-cx+5)%4)<1:((y-cy+5)%4)<1;HT[i]=sl?5:7;if(wn&&!sl)setA(i,.9,.92,.96);else setA(i,sl?.2:.52,sl?.16:.36,sl?.12:.22)})}
 /* fontanna: kamienne obrzeże + kolumna z czaszą */
 for(const f of U.fount){const cx=f.x*S,cy=f.y*S,ro=f.r*S+5,ri=f.r*S-1.5;E.rectFn(cx-ro-2,cy-ro-2,cx+ro+2,cy+ro+2,(i,x,y)=>{const d=Math.hypot(x-cx,y-cy);if(d<=ro&&d>=ri){const n=hs3(x>>1,y>>1,51)*.06;HT[i]=5+(d>ri+1.5&&d<ro-1.5?1:0);setA(i,.68+n,.66+n,.62+n);SPEC[i]=.1;if(wn&&d<ro-1)setA(i,.92,.94,.97)}else if(d<6){HT[i]=16-d;setA(i,.66,.64,.6);SPEC[i]=.2}else if(d<13&&d>10){HT[i]=Math.max(HT[i],9);setA(i,.62,.6,.56)}})}
 /* kamienice: dach dwuspadowy, elewacja (SIDE 7–12) */
 for(const B of U.bld){const{c,u,v,a,b}=B,ext=Math.hypot(a,b)+1,col=B.rc?B.rc:B.paczka?[.95,.78,.15]:B.train?[.9,.9,.88]:B.canopy?[.85,.86,.86]:ROOF[B.rf],x0=(c[0]-ext)*S,y0=(c[1]-ext)*S,x1=(c[0]+ext)*S,y1=(c[1]+ext)*S;
  E.rectFn(x0,y0,x1,y1,(i,x,y)=>{const px=x/S-c[0],py=y/S-c[1],du=px*u[0]+py*u[1],dv=px*v[0]+py*v[1];if(Math.abs(du)>a||Math.abs(dv)>b)return;const qv=Math.abs(dv)/b,qu=Math.abs(du)/a;
   if(B.spire){const fx=Math.abs(du)/a,fy=Math.abs(dv)/b,m=Math.max(fx,fy);if(m>1)return;let hh=12+B.h*Math.pow(1-m,1.15);const face=fx>fy?(du>0?0:1):(dv>0?2:3),sh=[1.05,.62,.8,.55][face],c=ROOF[B.rf]||ROOF[0];let r=c[0]*sh,g=c[1]*sh,bb=c[2]*sh;{const T=(window.__TX2||{}).rcop;if(T&&!wn){const t=((((dv+b)*S*2)&255)*256+(((du+a)*S*2)&255))*3;r=T.R[t]*T.m[0]*sh*1.1;g=T.R[t+1]*T.m[1]*sh*1.1;bb=T.R[t+2]*T.m[2]*sh*1.1}}
    if(m>.9){r=.55;g=.3;bb=.22;hh=12+B.h*.06}if(m<.07){r=.95;g=.8;bb=.3;hh+=8}if(Math.abs(fx-fy)<.025&&m>.1){r*=.75;g*=.75;bb*=.75}if(hh<=HT[i])return;HT[i]=hh;setA(i,r,g,bb);SPEC[i]=.15;SIDE[i]=0;return}
   if(B.cone){const rd=Math.hypot(du,dv)/a;if(rd>1)return;const an=Math.atan2(dv,du),c=ROOF[B.rf]||ROOF[0],sh=.8+Math.cos(an+2.4)*.25;let hh=8+B.h*(1-rd),r=c[0]*sh,g=c[1]*sh,bb=c[2]*sh;if(Math.abs(Math.sin(an*6))<.05){r*=.8;g*=.8;bb*=.8}if(rd>.92){r=.55;g=.3;bb=.22;hh=10}if(hh<=HT[i])return;HT[i]=hh;setA(i,r,g,bb);SPEC[i]=.12;SIDE[i]=0;return}
   if(B.circus){const rd=Math.hypot(du,dv)/a;if(rd>1)return;const an=Math.atan2(dv,du),sg=(((an/6.2832+1)*B.circus)|0)&1;let hh=6+B.h*Math.pow(1-rd,.75),r,g,bb;if(sg){r=.84;g=.12;bb=.14}else{r=.96;g=.94;bb=.88}const sh=Math.cos(an+.8)*.08;r+=sh;g+=sh;bb+=sh;
    if(rd>.9){const sc=Math.abs(Math.sin(an*B.circus))<.35;r=.98;g=.78;bb=.16;hh=6+(sc?2:0)}if(rd<.06){r=.95;g=.78;bb=.2;hh+=4}if(hh<=HT[i])return;HT[i]=hh;setA(i,r,g,bb);SPEC[i]=.1;SIDE[i]=0;return}
   if(B.wig){const rd=Math.hypot(du,dv)/a;if(rd>1)return;const an=Math.atan2(dv,du),sm=Math.abs(Math.sin(an*9));let hh=5+B.h*Math.pow(1-rd,1.05),r=.86,g=.78,bb=.62;const n=fb3(x*.08,y*.08,91,2)*.06;r+=n;g+=n;bb+=n;if(sm<.07){r*=.72;g*=.72;bb*=.72}if(Math.abs(Math.sin(rd*18))<.06){r*=.9;g*=.9;bb*=.9}if(rd<.07){r=.16;g=.12;bb=.1;hh-=6}else if(rd<.16&&sm<.25){r=.42;g=.28;bb=.16;hh+=7}if(an>1.2&&an<1.95&&rd>.7){r=.22;g=.16;bb=.1}if(wn&&rd>.07){r=.92;g=.94;bb=.97}if(hh<=HT[i])return;HT[i]=hh;setA(i,r,g,bb);SPEC[i]=.04;SIDE[i]=0;return}
   if(B.pyr){const qm=Math.max(qu,qv);let hh,r,g,bb;if(qm>.94){hh=4;r=.74;g=.72;bb=.68}else{const N=8,f=(1-qm/.94),L=Math.min(N-1,(f*N)|0);hh=6+(L+1)*(B.h/N)-((f*N)%1<.12?2:0);const tn=hs3(L,7,93)*.06;r=.82+tn;g=.76+tn;bb=.62+tn;const jx=((du*S*.7+L*3)|0)%7==0,jy=((f*N)%1)<.12;if(jx||jy){r*=.78;g*=.78;bb*=.78}if(L==N-1){r=.92;g=.88;bb=.78}if(dv>0&&Math.abs(du)<a*.13&&qm>.6){r=.12;g=.1;bb=.09;hh=Math.min(hh,6+B.h*.25)}if(dv>0&&Math.abs(du)<a*.2&&qm>.5&&qm<.6){r=.9;g=.88;bb=.8}}if(wn&&qm<.94){r=.92;g=.94;bb=.97}if(hh<=HT[i])return;HT[i]=hh;setA(i,r,g,bb);SPEC[i]=.06;SIDE[i]=0;return}
   if(B.pump){let hh=B.h,r=.8,g=.82,bb=.82;if(qu<.3){r=.85;g=.12;bb=.12;hh+=4}else if(qu>.7&&qu<.85){r=.95;g=.78;bb=.1;hh+=4}if(hh<=HT[i])return;HT[i]=hh;setA(i,r,g,bb);SPEC[i]=.3;SIDE[i]=0;return}
   if(B.pyr||B.col||B.statue){let hh,r,g,bb;const qm=Math.max(qu,qv),rd=Math.hypot(du/a,dv/b);if(B.pyr){hh=2+B.h*(1-qm);const bl=((hh*1.1)|0)%3==0;r=.76;g=.72;bb=.62;if(bl){r*=.84;g*=.84;bb*=.84}if(du>0){r*=.95;g*=.95}}else{if(rd>1)return;if(rd<.34){hh=B.h;r=B.statue?.36:.84;g=B.statue?.48:.82;bb=B.statue?.42:.76}else{hh=7;r=.66;g=.65;bb=.62}}if(wn&&(B.pyr||rd>=.34)){r=.92;g=.94;bb=.97}if(hh<=HT[i])return;HT[i]=hh;setA(i,r,g,bb);SPEC[i]=.1;SIDE[i]=0;return}
   let hh=B.fl?B.h-6+(qu>.96||qv>.96?2:0):B.h+16*(1-qv);const tile=((Math.abs(dv)*S*1.3)|0)%3==0,n=hs3(x>>1,y>>1,61)*.07+fb3(x*.06,y*.06,62,2)*.06;let r=col[0]+n,g=col[1]+n,bb=col[2]+n;
   if(B.stand){const rw=((dv+b)*S/2.2)|0;r=rw%2?.75:.62;g=rw%2?.2:.18;bb=rw%2?.2:.18;hh=B.h*(.4+.6*(dv+b)/(2*b))}else if(B.glass){const gx=((du*S)/9|0)%2,gy=((dv*S)/9|0)%2,e=((du*S)%9)<1||((dv*S)%9)<1;r=.55+gx*.08;g=.75+gy*.06;bb=.86;if(e){r=.9;g=.92;bb=.94}if(qu>.95||qv>.95){r=.3;g=.55;bb=.75}}else if(B.stall){const st=((du*S*.55)|0)%2,c1=hexf(B.stall[0]),c2=hexf(B.stall[1]);hh=B.h+5*(1-qv);const cc=st?c1:c2;r=cc[0];g=cc[1];bb=cc[2];if(qv>.94||qu>.96){r*=.7;g*=.7;bb*=.7}}else if(B.train){if(qu>.985||Math.abs(qv-.7)<.12){r=.75;g=.12;bb=.12}else if(((du*S)|0)%14<1){r=g=bb=.6}}else if(B.wash){const f=(du+a)/(2*a)*4,e=f%1;r=.84;g=.86;bb=.9;if(e<.1||qv>.92){r=.16;g=.42;bb=.78}else if(qv<.1){r=.95;g=.95;bb=.97}}else if(B.paczka){if(((du*S*1.2)|0)%4<1){r=.35;g=.3;bb=.1}}else if(B.fl){if(qu>.96||qv>.96){r=g=bb=.5}else if(hs3((du/6)|0,(dv/6)|0,63)>.94){r=g=bb=.42;hh+=3}}else{if(tile){r*=.8;g*=.8;bb*=.8}if(qv<.04){r*=.75;g*=.75;bb*=.75}if(qu>.97){r*=.85;g*=.85;bb*=.85;hh+=1.5}}
   if(!B.fl&&hs3(B.rf*7+(du>0?1:0),(c[0]|0),64)>.7&&Math.abs(du-a*.4)<3&&Math.abs(dv-b*.4)<2.5){hh+=8;r=.5;g=.36;bb=.3}
   if(!wn&&window.__G9!==false&&window.__TX&&window.__TX.roofr&&!B.stand&&!B.glass&&!B.stall&&!B.train&&!B.wash&&!B.paczka&&!B.canopy){const red=col[0]>col[2]*1.35,X2=window.__TX2||{},hb=hs3(c[0]|0,c[1]|0,301),T0=B.fl?(X2.rbit||window.__TX.roofg):(!red&&hb>.72&&a<18&&X2.rsol)?X2.rsol:(B.rf==5&&X2.rcor)?X2.rcor:red&&X2.rtile?X2.rtile:(red?window.__TX.roofr:window.__TX.roofg),T=T0.R,sc0=T0===X2.rsol?2.2:B.fl?3:5,t=((((dv+b)*S*sc0)&255)*256+(((du+a)*S*sc0)&255))*3;if(T0===X2.rsol){const L=(T[t]+T[t+1]+T[t+2])/3;r=r*.25+T[t]*T0.m[0]*.75;g=g*.25+T[t+1]*T0.m[1]*.75;bb=bb*.25+T[t+2]*T0.m[2]*.75}else if(t>=0){const K=T0===X2.rbit||T0===X2.rtile?.9:.75;r*=1+(T[t]-1)*K;g*=1+(T[t+1]-1)*K;bb*=1+(T[t+2]-1)*K}}
   if(wn){const k=tile?.82:.93;r=k;g=k+.02;bb=k+.05}
   if(hh<=HT[i])return;HT[i]=hh;setA(i,r,g,bb);SPEC[i]=B.fl?.05:.12;SIDE[i]=7+B.fc})}
 /* schody do przejścia podziemnego */
 for(const B of U.stairs||[]){const{c,u,v,a,b}=B,ext=Math.hypot(a,b)+1;E.rectFn((c[0]-ext)*S,(c[1]-ext)*S,(c[0]+ext)*S,(c[1]+ext)*S,(i,x,y)=>{const px=x/S-c[0],py=y/S-c[1],du=px*u[0]+py*u[1],dv=px*v[0]+py*v[1];if(Math.abs(du)>a||Math.abs(dv)>b)return;if(Math.abs(dv)>b-1.4||du<-a+1.4){HT[i]=7;setA(i,.62,.62,.6);return}const f=(du+a)/(2*a),st=((f*9)|0);HT[i]=-1-st*.9;const l=.5-st*.035;setA(i,l,l,l*.98);if(((f*9)%1)<.12)setA(i,l*.7,l*.7,l*.7)})}
 /* pomosty */
 for(const pr of U.piers||[]){E.rectFn(pr[0]*S,pr[1]*S,pr[2]*S,pr[3]*S,(i,x,y)=>{const pl=(x%4)==0,po=((x%22)<2)&&((y-pr[1]*S)<2||(pr[3]*S-y)<2);let r=.55,g=.4,b=.25;const n=hs3(x>>2,y,97)*.08;r+=n;g+=n;b+=n*.6;if(pl){r*=.7;g*=.7;b*=.7}if(po){r=.32;g=.22;b=.14}if(wn&&!pl)setA(i,.9,.92,.96);else setA(i,r,g,b);HT[i]=po?5:3;SPEC[i]=.04;SIDE[i]=0})}
 /* miejsce na ognisko */
 for(const F of U.fire||[]){const cx=F[0]*S,cy=F[1]*S,R0=F[2]*S;E.rectFn(cx-R0-3,cy-R0-3,cx+R0+3,cy+R0+3,(i,x,y)=>{const d=Math.hypot(x-cx,y-cy);if(d>R0+2)return;if(d>R0-2.4){const st=hs3((Math.atan2(y-cy,x-cx)*6)|0,3,98);HT[i]=3+st*1.5;const l=.5+st*.15;setA(i,l,l*.97,l*.92)}else{HT[i]=.2;const n=hs3(x,y,99);setA(i,.18+n*.1,.16+n*.08,.14+n*.06)}SIDE[i]=0})}
 /* płotki i bramki (nisko – dysk przelatuje) */
 for(const F of U.fences||[]){for(let i=1;i<F.length;i++){const A=F[i-1],B2=F[i],L=Math.hypot(B2[0]-A[0],B2[1]-A[1]),ux=(B2[0]-A[0])/L,uy=(B2[1]-A[1])/L;for(let d=0;d<=L;d+=.25){const px=(A[0]+ux*d)*S,py=(A[1]+uy*d)*S,post=(d%3)<.35;E.rectFn(px-(post?1.2:.6),py-(post?1.2:.6),px+(post?1.2:.6),py+(post?1.2:.6),(ii)=>{const hgt=post?7:5.5;if(HT[ii]>hgt)return;HT[ii]=hgt;if(wn&&!post)setA(ii,.92,.94,.97);else setA(ii,post?.36:.52,post?.24:.36,post?.14:.22);SIDE[ii]=0})}}}
 for(const G of U.gates||[]){const cx=G[0]*S,cy=G[1]*S,vert=!G[2];for(const s2 of[-1,1]){const px=cx+(vert?0:s2*8*S/5),py=cy+(vert?s2*8*S/5:0);E.rectFn(px-1.6,py-1.6,px+1.6,py+1.6,ii=>{HT[ii]=11;setA(ii,.32,.2,.12);SIDE[ii]=0})}E.rectFn(cx-(vert?1:8*S/5),cy-(vert?8*S/5:1),cx+(vert?1:8*S/5),cy+(vert?8*S/5:1),ii=>{if(HT[ii]<10){HT[ii]=10;setA(ii,.45,.3,.17);SIDE[ii]=0}})}
 /* latarnie */
 for(const L of U.lamps||[]){const cx=L[0]*S,cy=L[1]*S;E.rectFn(cx-4,cy-4,cx+4,cy+4,(i,x,y)=>{const d=Math.hypot(x-cx,y-cy);if(d<1.3){HT[i]=Math.max(HT[i],42);setA(i,.95,.92,.7);SPEC[i]=.3;SIDE[i]=0}else if(d<2.4){HT[i]=Math.max(HT[i],38);setA(i,.15,.16,.17);SIDE[i]=0}else if(d<3.6&&HT[i]<3){HT[i]=2;setA(i,.35,.36,.38)}})}
 /* parasole ogródka */
 for(const Q of U.umb||[]){const cx=Q[0]*S,cy=Q[1]*S,R=Q[2]*S,col=hexf(Q[3]);E.rectFn(cx-R-1,cy-R-1,cx+R+1,cy+R+1,(i,x,y)=>{const d=Math.hypot(x-cx,y-cy);if(d>R)return;const a=Math.atan2(y-cy,x-cx),seg=((a/6.2832*8+8)|0)%2,hh=22-d/R*6;if(hh<=HT[i])return;HT[i]=hh;const k=seg?1:.86;setA(i,col[0]*k,col[1]*k,col[2]*k);SPEC[i]=.08;SIDE[i]=0;if(wn)setA(i,.92,.94,.97)})}
 /* teepad obrócony wzdłuż pierwszego rzutu */
 if(h.teeA!=null){const cx=h.tee[0],cy=h.tee[1],f=[Math.sin(h.teeA),-Math.cos(h.teeA)],rr=[Math.cos(h.teeA),Math.sin(h.teeA)];E.rectFn((cx-30)*S,(cy-30)*S,(cx+30)*S,(cy+30)*S,(i,x,y)=>{const px=x/S-cx,py=y/S-cy,al=px*f[0]+py*f[1],sd=px*rr[0]+py*rr[1];if(al>7||al<-26||Math.abs(sd)>11)return;const ed=Math.min(7-al,al+26,11-Math.abs(sd))*S,n=hs3(x,y,7),q=fb3(x*.08,y*.08,12,3);let r=.21+n*.05,g=.42+n*.06+q*.06,b=.16+n*.03;if(ed<1.5){r*=.7;g*=.7;b*=.7}if(wn&&(hs3(x>>2,y>>2,15)>.18||ed<3)){r=.9;g=.93;b=.97}HT[i]=ed<1.5?2.2:2.6+n*.3;SPEC[i]=.05;setA(i,r,g,b)})}
 /* samochody */
 for(const o of U.cars){const cx=o.x*S,cy=o.y*S,hw=11.5*(U.sc||1)*(U.cs||1),hh=27*(U.sc||1)*(U.cs||1),ext=hh+2,col=o.c,f=[Math.sin(o.a),-Math.cos(o.a)],rr=[Math.cos(o.a),Math.sin(o.a)];
  E.rectFn(cx-ext,cy-ext,cx+ext,cy+ext,(i,x,y)=>{const ex=x-cx,ey=y-cy,lx=ex*rr[0]+ey*rr[1],ly=-(ex*f[0]+ey*f[1]),dx=lx/hw,dy=ly/hh,q=Math.pow(Math.abs(dx),4)+Math.pow(Math.abs(dy),4);if(q>1)return;
   let hg=12*(1-Math.pow(q,3)),c=col.map(v=>v*.8);const cab=Math.abs(dx)<.8&&dy>-.4&&dy<.45;if(cab){hg+=9*(1-Math.pow(Math.abs(dx)/.8,4));if(dy<-.16||dy>.28||Math.abs(dx)>.64){c=[.08,.11,.15];SPEC[i]=.7}else SPEC[i]=.4}else SPEC[i]=.45;
   if(Math.abs(dy)>.9&&Math.abs(dx)>.4&&Math.abs(dx)<.8)c=dy<0?[.95,.93,.78]:[.75,.1,.1];if(wn&&!(cab&&(dy<-.16||dy>.28||Math.abs(dx)>.64))&&hs3(x>>1,y>>1,71)>.15)c=[.92,.94,.98];
   HT[i]=Math.max(HT[i],hg*Math.max(.6,U.sc||1));setA(i,c[0],c[1],c[2])})}
}
/* kolizja ze ścianami (kapsuły po obwodzie budynku) + OB: ulica i budynki */
function urbCol(h){const C=[];for(const L of h.U.lamps||[]){const t=[L[0],L[1],1.4,0];t.lamp=1;C.push(t)}for(const Q of h.U.umb||[]){const t=[Q[0],Q[1]-2,Q[2]*.9,0];t.umb=1;C.push(t)}if(h.U.neptun){const t=[h.U.neptun[0],h.U.neptun[1],6,0];t.nep=1;C.push(t)}for(const B of h.U.bld){const{c,u,v,a,b}=B;const pts=[];if(B.wig||B.circus||B.cone){for(let k2=0;k2<28;k2++){const an=k2/28*6.2832;pts.push([Math.cos(an)*a*.92,Math.sin(an)*a*.92])}}else{const st=5;for(let s=-a;s<=a;s+=st){pts.push([s,-b],[s,b])}for(let s=-b;s<=b;s+=st){pts.push([-a,s],[a,s])}}
  for(const[p,q]of pts){const x=c[0]+u[0]*p+v[0]*q,y=c[1]+u[1]*p+v[1]*q;if(x<-10||x>W+10||y<-10||y>H+10)continue;const t=[x,y,3.4*Math.max(.6,h.U.sc||1),0];t.w=1;C.push(t)}}return C}
function urbOB(h){const U=h.U;return(x,y)=>{for(const r of U.roads)if(!r.noOB&&dpl([x,y],r.p)<r.w/2)return true;for(const B of U.bld){if(B.noOB)continue;const px=x-B.c[0],py=y-B.c[1];if(B.wig||B.circus||B.cone){if(Math.hypot(px,py)<B.a)return true;continue}if(Math.abs(px*B.u[0]+py*B.u[1])<B.a&&Math.abs(px*B.v[0]+py*B.v[1])<B.b)return true}for(const P of U.obp||[])if(inPoly(x,y,P))return true;return false}}
function cleanRows(U){const corners=B=>[[-1,-1],[1,-1],[1,1],[-1,1],[0,-1],[0,1],[-1,0],[1,0]].map(([p,q])=>[B.c[0]+B.u[0]*B.a*p*.95+B.v[0]*B.b*q*.95,B.c[1]+B.u[1]*B.a*p*.95+B.v[1]*B.b*q*.95]);
 const inB=(B,x,y)=>{const px=x-B.c[0],py=y-B.c[1];return Math.abs(px*B.u[0]+py*B.u[1])<B.a&&Math.abs(px*B.v[0]+py*B.v[1])<B.b};const big=U.bld.filter(B=>!B.row);
 const keep=[];U.bld=U.bld.filter(B=>{if(!B.row||B.lbl){if(B.row)keep.push(B);return true}const C=corners(B);for(const r of U.roads)for(const q of C)if(dpl(q,r.p)<r.w/2+2)return false;for(const O of big)for(const q of C.concat([B.c]))if(inB(O,q[0],q[1]))return false;const sh={c:B.c,u:B.u,v:B.v,a:B.a*.8,b:B.b*.8};for(const O of keep){const O2={c:O.c,u:O.u,v:O.v,a:O.a*.85,b:O.b*.85};if(inB(O2,B.c[0],B.c[1]))return false;let n=0;for(const q of corners(sh))if(inB(O2,q[0],q[1]))n++;if(n>=2)return false}keep.push(B);return true})}
function mkU(o){cleanRows(o.U);const h={tee:o.tee,b:o.b,par:o.par||3,trees:o.trees||[],water:[],roads:[],mead:[],rivers:[],extra:[],deco:o.deco||[],name:'Street Wągrowiec',M:o.M||.2,noFill:1,_fill:[],noSil:1,urb:null,U:o.U,txt:o.txt};if(o.U.sc&&o.U.cs==null)o.U.cs=1/o.U.sc;if(o.teeA!=null)h.teeA=o.teeA;else if(o.U.park)h.teeA=Math.atan2(o.b[0]-o.tee[0],-(o.b[1]-o.tee[1]));
 if(o.U.lake){for(let y=-10;y<H+10;y+=6){const xs=[];const P=o.U.lake;for(let i=0,j=P.length-1;i<P.length;j=i++){const[a,b]=P[i],[e,f]=P[j];if((b>y)!=(f>y))xs.push(a+(y-b)/(f-b)*(e-a))}xs.sort((p,q)=>p-q);for(let k=0;k+1<xs.length;k+=2){let iv=[[xs[k],xs[k+1]]];for(const pr of o.U.piers||[])if(y+7>pr[1]&&y<pr[3])iv=iv.flatMap(([p,q])=>[[p,Math.min(q,pr[0])],[Math.max(p,pr[2]),q]]).filter(([p,q])=>q-p>1);for(const[p,q]of iv)h.rivers.push([p,y,q,y+7])}}}
 if(o.U.park){h.noFill=0;delete h._fill;const U=o.U;h.thinF=(x,y)=>typeof U.thin=='function'?U.thin(x,y,h):(U.thin==null?.4:U.thin);h.noF=(x,y,r)=>{for(const P of(U.lots||[]).concat(U.plaza||[],U.dirt||[],U.courts||[],U.clear||[]))if(inPoly(x,y,P))return true;for(const p of(U.paths||[]).concat(U.roads||[]))if(dpl([x,y],p.p)<p.w/2+r+3)return true;for(const B of U.bld){const px=x-B.c[0],py=y-B.c[1];if(Math.abs(px*B.u[0]+py*B.u[1])<B.a+r&&Math.abs(px*B.v[0]+py*B.v[1])<B.b+r)return true}if(U.lake)for(const[dx,dy]of[[0,0],[r,0],[-r,0],[0,r],[0,-r]])if(inPoly(x+dx,y+dy,U.lake))return true;for(const w of h.rivers)if(x>w[0]-r&&x<w[2]+r&&y>w[1]-r&&y<w[3]+r)return true;return false}}
 line(h,o.tee,o.b,o.w||70);h.camDx=o.camDx!=null?o.camDx:Math.max(-40,Math.min(40,(o.b[0]-o.tee[0])*.12));for(const f of o.U.fount)h.water.push([f.x-f.r,f.y-f.r,f.r*2,f.r*2]);h.urb=E=>urbPaint(h,E);h.obF=urbOB(h);h.sw=1;return h}
/* ================= DOŁEK 1 – RYNEK ================= */
const H1=(()=>{const P=mkP(2.09,200,520),PA=a=>a.map(p=>P(p[0],p[1]));
 const top=PA([[150,612],[300,655],[940,762],[1090,700]]),lft=PA([[200,200],[200,1900]]),rgt=PA([[905,770],[733,1560]]),bot=PA([[150,1545],[1100,1545]]);
 const U={roads:[{p:top,w:56/2.09,c:1,noOB:1},{p:lft,w:116/2.09,c:1,noOB:1},{p:rgt,w:56/2.09,c:1,noOB:1},{p:bot,w:56/2.09,c:1,noOB:1}],lamps:[],umb:[],walk:[PA([[300,1320],[720,900]]),PA([[420,770],[600,1460]])],plaza:[PA([[268,688],[854,783],[706,1509],[268,1509]])],bld:[],cars:[],pots:[],bench:[],fount:[]};
 const k=1/2.09;
 rowHouses(U,P(262,649),P(1000,770),-1,50*k,11,0);
 rowHouses(U,rgt[0],rgt[1],-1,48*k,23,40*k);
 rowHouses(U,P(262,1545),P(1100,1545),1,50*k,37,0);
 /* fontanna */
 {const f=P(525,935);U.fount.push({x:f[0],y:f[1],r:21})}
 /* kwietniki po lewej stronie rynku i ławki */
 for(let y=900;y<=1330;y+=62){const p=P(288,y);U.pots.push([p[0],p[1],4])}
 for(const y of[960,1145,1270]){const p=P(312,y);U.bench.push([p[0],p[1],1])}
 /* auta: górny rząd (prostopadle do krawężnika), prawy rząd, dolny rząd */
 const R=rnd(4242),cc=()=>CARC[(R()*CARC.length)|0];
 const eT=(x)=>[x,692+(x-294)*.164];for(let x=372;x<=724;x+=30){if(R()<.12)continue;const e=eT(x),p=P(e[0]-.162*27,e[1]+.987*27);U.cars.push({x:p[0],y:p[1],a:Math.atan2(-.162,-.987)+Math.PI+(R()-.5)*.08,c:cc()})}
 const eR=y=>[857-.204*(y-770),y];for(let y=880;y<=1440;y+=29){if(y>985&&y<1105)continue;if(R()<.12)continue;const e=eR(y),p=P(e[0]-.98*27,e[1]-.2*27);U.cars.push({x:p[0],y:p[1],a:Math.atan2(-.98,.2)+(R()-.5)*.08+(R()<.5?Math.PI:0),c:cc()})}
 for(let x=388;x<=620;x+=29){if(R()<.12)continue;const p=P(x,1509-27);U.cars.push({x:p[0],y:p[1],a:(R()<.5?0:Math.PI)+(R()-.5)*.08,c:cc()})}
 /* auta na ulicach (zaparkowane wzdłuż) */
 for(let y=760;y<=1480;y+=64){if(R()<.3)continue;const p=P(236,y);U.cars.push({x:p[0],y:p[1],a:R()<.5?0:Math.PI,c:cc(),road:1})}
 /* ogródek kawiarni – parasole */
 for(const[x,y,c]of[[680,905,'#f4ead2'],[728,936,'#c0392b'],[700,975,'#2e8b57'],[650,945,'#f4ead2']]){const p=P(x,y);U.umb.push([p[0],p[1],6.5,c])}
 const trees=[[...P(285,725),17,0],[...P(782,818),12,6],[...P(715,1050),15,0],[...P(226,640),11,6]];
 const tee=P(330,1452),bk=P(838,795);
 return mkU({tee,b:bk,par:3,trees,U,w:72,txt:'Rynek – po przekątnej obok fontanny i ogródka kawiarni. Fontanna to woda, ulica nie jest OB.'})})();
/* budynek prostokątny (px mapy): środek, szerokość, głębokość, kąt */
function bRect(U,P,K,x,y,w,d,ang,o){const c=P(x,y),u=[Math.cos(ang),Math.sin(ang)],v=[-u[1],u[0]];U.bld.push(Object.assign({c,u,v,a:w/2/K,b:d/2/K,h:60,rf:2,fc:2,fl:0},o||{}))}
/* rząd miejsc parkingowych: oś a→b (px), auta prostopadle, offs = przesunięcia od osi */
function parkRow(U,P,K,a,b,offs,R,step){const L=Math.hypot(b[0]-a[0],b[1]-a[1]),u=[(b[0]-a[0])/L,(b[1]-a[1])/L],n=[-u[1],u[0]];for(let s=step/2;s<L;s+=step)for(const of of offs){if(R()<.16)continue;const p=P(a[0]+u[0]*s+n[0]*of,a[1]+u[1]*s+n[1]*of),an=Math.atan2(n[0],-n[1])+(R()<.5?Math.PI:0)+(R()-.5)*.08;U.cars.push({x:p[0],y:p[1],a:an,c:CARC[(R()*CARC.length)|0]})}}
/* ================= DOŁEK 2 – Z BYDGOSKIEJ NA PARKING BIEDRONKI (par 4) ================= */
const H2=(()=>{const K=2.6,P=mkP(K,140,420),PA=a=>a.map(p=>P(p[0],p[1])),M=K/7.5,k=1/K;
 const byd=PA([[40,1615],[100,1560],[300,1405],[500,1285],[700,1120],[900,1020],[1120,945]]);
 const U={sc:.2/M,flyOB:null,obp:[PA([[-30,440],[445,440],[468,505],[300,1020],[235,1095],[-30,1095]]),PA([[235,1095],[300,1020],[430,1065],[480,1200],[300,1330],[170,1420],[120,1500],[-30,1580],[-30,1095]])],roads:[{p:byd,w:50*k,c:1,noOB:1}],plaza:[],lots:[PA([[468,505],[905,530],[990,500],[1120,470],[1120,880],[900,965],[760,1015],[650,1075],[560,1095],[430,1065],[300,1020]])],grass:[PA([[-30,440],[445,440],[468,505],[300,1020],[235,1095],[-30,1095]]),PA([[235,1095],[300,1020],[430,1065],[480,1200],[300,1330],[150,1420],[-30,1420],[-30,1095]]),PA([[-30,1700],[200,1560],[400,1460],[600,1340],[800,1200],[1000,1110],[1120,1080],[1120,1900],[-30,1900]])],bld:[],cars:[],pots:[],bench:[],fount:[]};
 for(let i=0;i<byd.length-1;i++)rowHouses(U,byd[i],byd[i+1],1,36*k,61+i*7);
 rowHouses(U,P(262,1440),P(470,1300),-1,36*k,91);
 for(let i=0;i<byd.length-1;i++)rowHouses(U,byd[i],byd[i+1],1,36*k+150*k,131+i*7);
 bRect(U,P,K,655,445,540,125,.05,{fl:1,rc:[.96,.8,.14],fc:1,h:66,lbl:{t:'🐞 Biedronka',bg:'#d4161c',c:'#ffe066',s:7}});
 bRect(U,P,K,330,410,220,70,0,{fl:1,rf:3,fc:4,h:56});
 bRect(U,P,K,150,620,300,300,.0,{fl:1,rf:3,fc:4,h:64});bRect(U,P,K,140,930,280,300,0,{rf:1,fc:2,h:66});bRect(U,P,K,160,1180,300,200,0,{fl:1,rf:5,fc:4,h:60});bRect(U,P,K,50,1390,170,190,0,{rf:0,fc:3,h:62});bRect(U,P,K,330,1170,150,150,-.65,{rf:2,fc:1,h:58});
 bRect(U,P,K,665,955,150,80,-.42,{rf:0,fc:1,h:52});
 const R=rnd(777);
 parkRow(U,P,K,[468,525],[312,1000],[-37],R,36);
 parkRow(U,P,K,[595,575],[485,925],[0],R,36);
 parkRow(U,P,K,[725,590],[645,870],[0],R,36);
 parkRow(U,P,K,[870,680],[862,900],[-37],R,36);
 parkRow(U,P,K,[1045,480],[1045,720],[0],R,36);
 const T=(x,y,r,ty)=>[...P(x,y),r,ty];
 const trees=[T(340,1030,9,6),T(250,1310,13,0),T(825,770,9,2),T(828,835,9,2),T(832,900,9,2),T(565,540,8,6),T(1065,770,9,0),T(180,640,11,0),T(90,900,10,6),T(260,820,8,2)];
 return mkU({tee:P(200,1484),b:P(643,640),par:4,trees,U,M,w:60,teeA:.91,txt:'Pierwszy rzut w dół Bydgoskiej, potem w lewo na parking Biedronki. Budynki, podwórka i nieużytek to OB.'})})();

/* ================= DOŁEK 3 – JANOWIECKA: OD ŁĄKOWEJ, KOSZ PRZY NETTO ================= */
const H3=(()=>{const K=3,P=mkP(K,0,120),PA=a=>a.map(p=>P(p[0],p[1])),M=K/9,k=1/K,R=rnd(303);
 const jan=PA([[380,1760],[440,1520],[520,1350],[620,1220],[760,1090],[880,950],[940,800],[950,660],[930,520],[880,445],[760,405],[500,400],[180,400],[-30,400]]),laka=PA([[-30,1745],[990,1718]]),RC=P(1065,1715),rond=[];for(let i=0;i<=24;i++){const a=i/24*6.2832;rond.push([RC[0]+Math.cos(a)*62*k,RC[1]+Math.sin(a)*62*k])}const isl=[];for(let i=0;i<20;i++){const a=i/20*6.2832;isl.push([RC[0]+Math.cos(a)*40*k,RC[1]+Math.sin(a)*40*k])}
 const U={sc:.2/M,roads:[{p:jan,w:60*k,c:1,noOB:1},{p:laka,w:70*k,c:1},{p:rond,w:44*k},{p:PA([[1065,1650],[1110,1300]]),w:56*k}],plaza:[],
  lots:[PA([[-30,330],[1000,330],[1000,440],[870,450],[840,545],[495,545],[495,880],[430,900],[-30,900]]),PA([[790,960],[1000,830],[1110,960],[1110,1210],[880,1320],[800,1200]])],
  grass:[isl,PA([[495,545],[840,545],[930,640],[920,820],[850,960],[700,1070],[560,1190],[495,1260]]),PA([[820,1440],[1110,1290],[1110,1660],[700,1680]]),PA([[100,1420],[430,1420],[400,1690],[100,1700]])],
  obp:[PA([[-30,1700],[1110,1670],[1110,1900],[-30,1900]])],bld:[],cars:[],pots:[],bench:[],fount:[],labels:[]};
 bRect(U,P,K,765,190,640,160,0,{fl:1,rc:[.97,.83,.12],fc:1,h:60,lbl:{t:'Netto',bg:'#ffd200',c:'#111',s:8}});
 bRect(U,P,K,275,1080,340,160,0,{fl:1,rf:3,fc:4,h:62});
 bRect(U,P,K,130,860,140,230,0,{fl:1,wash:1,fc:2,h:40,lbl:{t:'🚿 Myjnia',bg:'#1a6fb5',c:'#fff',s:5}});
 bRect(U,P,K,40,1300,110,600,0,{rf:2,fc:3,h:60});
 bRect(U,P,K,330,1470,120,140,0,{rf:3,fc:4,h:48});
 bRect(U,P,K,720,1320,200,150,-.78,{fl:1,rc:[.93,.93,.9],fc:2,h:44,lbl:{t:'Shell',bg:'#f6c21c',c:'#c8102e'}});
 bRect(U,P,K,655,1250,52,18,-.78,{fl:1,rf:5,fc:1,h:22,paczka:1,lbl:{t:'Paczkomat',bg:'#f2c230',c:'#222',s:5}});
 U.lots.push(PA([[1042,1059],[922,939],[758,1101],[878,1221]]));for(const o of[-55,0,55]){const x=900+.711*o,y=1080-.703*o;bRect(U,P,K,x,y,70,16,-.78,{pump:1,h:14,noOB:1})}
 {const c1=P(870,1140),c2=P(940,1090);U.cars.push({x:c1[0],y:c1[1],a:-.78+Math.PI/2,c:[.66,.12,.1]},{x:c2[0],y:c2[1],a:-.78-Math.PI/2,c:[.92,.92,.9]})}
 bRect(U,P,K,675,950,50,40,0,{fl:1,rf:3,fc:4,h:26});
 parkRow(U,P,K,[440,490],[810,490],[0],R,42);
 parkRow(U,P,K,[110,400],[110,660],[0],R,42);
 parkRow(U,P,K,[460,560],[460,840],[0],R,42);
 parkRow(U,P,K,[200,825],[350,825],[0],R,42);
 const T=(x,y,r,ty)=>[...P(x,y),r,ty];
 const trees=[T(190,950,11,0),T(380,1240,13,0),T(550,1500,14,0),T(625,1540,11,6),T(980,1330,11,0),T(680,600,8,3),T(630,880,9,3),T(990,1630,10,6),T(560,1600,10,0)];
 U.labels.push({x:RC[0],y:RC[1],t:'Rondo',bg:'#2f6b3a',c:'#fff',s:5});
 return mkU({tee:P(420,1600),b:P(300,600),par:3,trees,U,M,w:60,teeA:.24,camDx:40,txt:'Od Łąkowej w górę Janowiecką obok Shella, kosz na parkingu przy Netto. Łąkowa, rondo i budynki to OB.'})})();
/* ================= DOŁEK 4 – PKP: RZUT NAD TORAMI, KOSZ PRZY MAKARONOWYM RAJU ================= */
const H4=(()=>{const K=3,P=mkP(K,0,150),PA=a=>a.map(p=>P(p[0],p[1])),M=K/9,k=1/K,R=rnd(404);
 const sre=PA([[-30,674],[1110,466]]),low=PA([[-30,890],[1110,766]]);
 const tr=[[1012,937],[1112,1037],[1232,1157],[1328,1253]].map(([a,b])=>PA([[-30,a+2],[1110,b-2]]));
 const U={sc:.2/M,roads:[{p:sre,w:70*k,c:1},{p:low,w:30*k,bike:1}],rails:tr,
  plaza:[PA([[480,1078],[1110,1032],[1110,1108],[480,1150]]),PA([[520,1300],[1110,1250],[1110,1330],[520,1380]]),PA([[150,1500],[1110,1440],[1110,1560],[150,1580]])],
  lots:[PA([[-30,712],[1110,508],[1110,752],[-30,870]]),PA([[700,330],[1110,300],[1110,430],[700,450]])],
  grass:[PA([[-30,905],[1110,780],[1110,880],[-30,985]]),PA([[-30,1380],[1110,1310],[1110,1440],[-30,1500]]),PA([[-30,230],[300,230],[300,640],[-30,660]])],
  obp:[PA([[-30,965],[1110,880],[1110,1300],[-30,1380]])],bld:[],cars:[],pots:[],bench:[],fount:[],labels:[]};
 bRect(U,P,K,880,180,360,150,0,{rf:0,fc:3,h:66});
 bRect(U,P,K,470,180,300,130,0,{rf:1,fc:1,h:62});
 bRect(U,P,K,120,520,240,130,0,{rf:3,fc:4,h:56});
 U.stairs=[{c:P(500,470),u:[Math.cos(-.18),Math.sin(-.18)],v:[-Math.sin(-.18),Math.cos(-.18)],a:200*k,b:55*k}];U.labels.push({x:P(500,470)[0],y:P(500,470)[1]-12,t:'⬇ Tunel na perony',bg:'#1f4e8c',c:'#fff',s:5});for(const[x,y]of[[640,1070],[960,1047],[700,1322],[990,1301]]){const c=P(x,y),an=-.07;U.stairs.push({c,u:[Math.cos(an),Math.sin(an)],v:[-Math.sin(an),Math.cos(an)],a:46*k,b:12*k})}
 U.labels.push({x:P(640,1040)[0],y:P(640,1040)[1],t:'⬇ przejście',bg:'#1f4e8c',c:'#fff',s:4},{x:P(700,1292)[0],y:P(700,1292)[1],t:'⬇ przejście',bg:'#1f4e8c',c:'#fff',s:4});
 bRect(U,P,K,930,955,300,30,-.07,{fl:1,rf:5,fc:2,h:26,train:1,noOB:1});
 bRect(U,P,K,890,1175,380,30,-.07,{fl:1,rf:5,fc:3,h:26,train:1,noOB:1});
 bRect(U,P,K,680,1665,580,190,0,{rf:3,fc:0,h:66});
 bRect(U,P,K,220,1610,300,90,0,{rf:1,fc:1,h:50});
 parkRow(U,P,K,[500,632],[1080,527],[0],R,42);
 parkRow(U,P,K,[90,826],[1080,727],[0],R,42);
 parkRow(U,P,K,[740,370],[1060,350],[0],R,42);
 const T=(x,y,r,ty)=>[...P(x,y),r,ty];
 const trees=[T(481,925,12,0),T(360,945,12,0),T(900,1445,12,6),T(634,878,12,0),T(849,856,12,6),T(70,1460,11,0),T(190,1450,10,6),T(470,1430,10,6),T(610,1420,11,0),T(330,880,8,2),T(200,300,10,0)];
 U.labels.push({x:P(880,250)[0],y:P(880,250)[1]-4,t:'Makaronowy Raj',bg:'#c0392b'},{x:P(680,1580)[0],y:P(680,1580)[1]-8,t:'PKP Wągrowiec',bg:'#1f4e8c',c:'#fff'});
 return mkU({tee:P(330,1525),b:P(880,345),par:4,trees,U,M,w:60,txt:'Przy starym dworcu PKP – rzut nad torami i pociągami, kosz przy Makaronowym Raju. Tory i ulica Średnia to OB.'})})();
/* ================= DOŁEK 5 – KOŚCIUSZKI → BAR LATAJĄCY SMOK ================= */
const H5=(()=>{const K=3,P=mkP(K,0,200),PA=a=>a.map(p=>P(p[0],p[1])),M=K/9,k=1/K,R=rnd(505);
 const kos=PA([[410,1900],[450,1725],[560,1300],[690,900],[772,375],[800,150]]),wach=PA([[640,875],[1110,805]]);
 const U={sc:.2/M,roads:[{p:kos,w:120*k,c:1,noOB:1},{p:wach,w:52*k,c:1,noOB:1},{p:PA([[-30,1815],[1110,1790]]),w:52*k,c:1,noOB:1}],
  plaza:[PA([[700,940],[880,900],[880,1060],[960,1150],[960,1260],[850,1260],[780,1060]])],
  lots:[PA([[820,700],[1110,690],[1110,780],[820,790]]),PA([[860,860],[1110,830],[1110,975],[860,985]])],
  grass:[PA([[-30,300],[520,300],[560,620],[470,960],[-30,980]]),PA([[820,380],[1110,380],[1110,680],[820,690]])],
  bld:[],cars:[],pots:[],bench:[],fount:[],labels:[]};
 bRect(U,P,K,1010,1060,170,150,0,{rf:0,fc:3,h:56});
 bRect(U,P,K,390,690,340,430,0,{rf:0,fc:3,h:74,lbl:{t:'🏛️ Urząd Miasta',bg:'#1f4e8c',c:'#fff',s:7}});
 bRect(U,P,K,950,530,250,260,0,{fl:1,rf:3,fc:4,h:68,lbl:{t:'🏦 Bank',bg:'#34495e',c:'#fff',s:6}});
 U.lots.push(PA([[200,950],[600,950],[650,1010],[630,1190],[200,1190]]));U.labels.push({x:P(420,1070)[0],y:P(420,1070)[1],t:'Parking Urzędu',bg:'#1f4e8c',c:'#fff',s:4.5});
 const n0=U.bld.length;rowHouses(U,kos[2],kos[0],1,64*k,511);if(0){const tp=P(455,1700),E=U.bld.slice(n0).sort((A,B)=>Math.hypot(A.c[0]-tp[0],A.c[1]-tp[1])-Math.hypot(B.c[0]-tp[0],B.c[1]-tp[1]));if(E[2]){E[2].lbl={t:'🍩 Pączkarnia',bg:'#e86aa0',c:'#fff',s:5};E[2].rf=4}}
 rowHouses(U,kos[2],kos[0],1,64*k+70,517);
 const n1=U.bld.length;rowHouses(U,kos[3],kos[1],-1,64*k,523,60);{const tp=P(704,1571),E=U.bld.slice(n1).sort((A,B)=>Math.hypot(A.c[0]-tp[0],A.c[1]-tp[1])-Math.hypot(B.c[0]-tp[0],B.c[1]-tp[1]));if(E[0]){E[0].lbl={t:'🍩 Pączkarnia',bg:'#e86aa0',c:'#fff',s:5};E[0].rf=4;U.queue=E[0]}}
 {const q0=P(230,1220),q1=P(530,1480);U.bld=U.bld.filter(B=>!(B.c[0]>q0[0]&&B.c[0]<q1[0]&&B.c[1]>q0[1]&&B.c[1]<q1[1])||B.lbl);bRect(U,P,K,359,1355,300,190,Math.atan2(425,-110),{fl:1,rf:3,fc:2,h:62});bRect(U,P,K,290,1610,220,170,Math.atan2(425,-110),{rf:1,fc:1,h:58})}
 rowHouses(U,P(600,1790),P(1110,1790),-1,30*k,541);
 bRect(U,P,K,1000,1300,220,140,0,{rf:2,fc:4,h:54});
 bRect(U,P,K,960,1480,260,160,0,{fl:1,rf:3,fc:2,h:50});
 parkRow(U,P,K,[840,742],[1100,742],[0],R,42);
 parkRow(U,P,K,[965,905],[1100,905],[0],R,42);
 parkRow(U,P,K,[250,1010],[580,1010],[0],R,42);parkRow(U,P,K,[250,1135],[560,1135],[0],R,42);
 U.bench.push(P(905,1235).concat([0]));U.pots.push([...P(870,1110),4]);
 const T=(x,y,r,ty)=>[...P(x,y),r,ty];
 const trees=[T(150,1050,12,0),T(130,620,10,3),T(170,420,11,0)];
 const sm=P(1010,1000);U.labels.push({x:sm[0],y:sm[1]-6,t:'🐉 Latający Smok',bg:'#b0262b'},{x:P(960,745)[0],y:P(960,745)[1]-12,t:'Parking Urzędu Miasta',bg:'#1f4e8c',c:'#fff',s:4.5});
 return mkU({tee:P(455,1700),b:P(905,940),par:3,trees,U,M,w:60,teeA:.25,txt:'Z Kościuszki w górę, w prawo w Wachowiaka i do baru Latający Smok. Budynki to OB.'})})();

/* ================= DOŁEK 6 – NAD JEZIOREM: OD BRZEGU, KOSZ MIĘDZY NEPTUNEM A CLUB WENUS ================= */
const H6=(()=>{const K=3,P=mkP(K,0,120),PA=a=>a.map(p=>P(p[0],p[1])),M=K/10,k=1/K;
 const U={park:1,thin:.5,piers:[[...P(195,880),...P(275,895)],[...P(130,1150),...P(212,1165)],[...P(335,505),...P(412,520)]].map(a=>a),neptun:P(600,790),ducks:[P(240,720),P(190,960),P(150,1180),P(110,1420)],roads:[],paths:[{p:PA([[600,450],[470,700],[380,900],[345,1150],[325,1400],[300,1700],[290,1900]]),w:26*k},{p:PA([[470,740],[560,950],[640,1200],[740,1450],[870,1800]]),w:24*k},{p:PA([[620,540],[530,700],[560,900]]),w:22*k},{p:PA([[310,1650],[480,1560],[640,1520]]),w:22*k}],
  lake:PA([[-30,-200],[720,-200],[650,120],[580,300],[430,470],[340,640],[275,850],[225,1050],[195,1250],[160,1450],[150,1650],[150,1950],[-30,1950]]),
  plaza:[PA([[590,520],[690,420],[770,500],[670,600]])],clear:[PA([[470,560],[760,560],[760,900],[470,900]]),PA([[300,1200],[520,1200],[520,1450],[300,1450]])],
  bld:[],cars:[],pots:[],bench:[],fount:[],labels:[]};
 bRect(U,P,K,775,380,210,290,-.6,{fl:1,rf:3,fc:2,h:48,lbl:{t:'Club Wenus',bg:'#7b2d8e',c:'#fff'}});
 bRect(U,P,K,960,330,150,120,0,{rf:0,fc:0,h:52});
 U.bench.push(P(420,980).concat([1]),P(560,1000).concat([0]));
 const T=(x,y,r,ty)=>[...P(x,y),r,ty];
 const trees=[T(620,1100,11,6),T(507,1050,11,0),T(430,1300,10,0),T(560,1350,12,0),T(470,1480,10,6),T(410,1150,9,0)];
 return mkU({tee:P(305,1600),b:P(700,560),par:3,trees,U,M,w:60,txt:'Nad jeziorem – od brzegu do kosza między Neptunem a Club Wenus. Jezioro to woda, budynki to OB.'})})();
/* ================= DOŁEK 7 – Z AQUAPARKU NAD PARKINGIEM, KOSZ PRZY RONDZIE ================= */
const H7=(()=>{const K=3,P=mkP(K,0,200),PA=a=>a.map(p=>P(p[0],p[1])),M=K/5.5,k=1/K,R=rnd(707);
 const RC=P(1035,1150),rond=[],isl=[];for(let i=0;i<=24;i++){const a=i/24*6.2832;rond.push([RC[0]+Math.cos(a)*55*k,RC[1]+Math.sin(a)*55*k])}for(let i=0;i<20;i++){const a=i/20*6.2832;isl.push([RC[0]+Math.cos(a)*35*k,RC[1]+Math.sin(a)*35*k])}
 const U={park:1,thin:.45,roads:[{p:PA([[270,280],[255,700],[230,985]]),w:30*k,c:1,noOB:1},{p:PA([[230,985],[600,1040],[985,1110]]),w:30*k,c:1,noOB:1},{p:PA([[380,270],[700,320],[1090,420]]),w:30*k,c:1},{p:PA([[1045,250],[1040,1100]]),w:44*k,c:1},{p:PA([[1030,1205],[990,1950]]),w:44*k,c:1},{p:rond,w:36*k}],
  paths:[{p:PA([[150,1450],[330,1520],[620,1560],[800,1640]]),w:20*k},{p:PA([[700,1420],[760,1600],[820,1900]]),w:18*k}],
  lots:[PA([[150,1030],[985,1125],[985,1390],[560,1420],[150,1340]])],courts:[PA([[320,600],[700,670],[690,800],[310,740]])],grass:[isl],track:PA([[290,570],[730,650],[715,835],[280,770]]),goals:[[...P(330,672),.18],[...P(690,736),.18+Math.PI]],
  plaza:[PA([[330,1560],[600,1560],[580,1700],[350,1700]]),PA([[225,1020],[245,1020],[245,1060],[225,1060]])],clear:[PA([[300,380],[640,380],[640,600],[300,600]]),PA([[230,540],[780,580],[780,880],[220,860]])],
  bld:[],cars:[],pots:[],bench:[],fount:[],labels:[]};
 bRect(U,P,K,800,560,330,160,.25,{rf:0,fc:1,h:66});
 bRect(U,P,K,930,830,150,420,.1,{rf:0,fc:1,h:66});
 bRect(U,P,K,620,960,480,130,.08,{rf:4,fc:1,h:64,lbl:{t:'Zespół Szkół nr 2',bg:'#1f4e8c',c:'#fff',s:5}});
 bRect(U,P,K,105,760,230,620,0,{fl:1,rc:[.78,.86,.9],fc:2,h:62,glass:1,lbl:{t:'🌊 Aquapark Wągrowiec',bg:'#1a8fc7',c:'#fff',s:6}});
 bRect(U,P,K,520,450,140,60,0,{fl:1,rf:3,fc:4,h:36});
 bRect(U,P,K,470,1500,150,110,0,{fl:1,rf:5,fc:4,h:40,lbl:{t:'Amfiteatr',bg:'#2f6b3a',c:'#fff',s:5}});
 bRect(U,P,K,505,880,300,26,.17,{fl:1,rf:5,fc:2,h:18,stand:1,noOB:1});
 parkRow(U,P,K,[260,1105],[940,1172],[0],R,62);
 parkRow(U,P,K,[220,1235],[900,1290],[0],R,62);
 parkRow(U,P,K,[230,1350],[760,1385],[0],R,62);
 U.labels.push({x:RC[0],y:RC[1],t:'Rondo',bg:'#2f6b3a',c:'#fff',s:5});
 const T=(x,y,r,ty)=>[...P(x,y),r,ty];
 const trees=[T(260,1420,10,0),T(950,1270,9,0),T(600,1650,11,0),T(765,1465,11,0),T(640,1460,10,6),T(880,1450,10,0)];
 return mkU({tee:P(800,1790),b:P(505,705),par:4,trees,U,M,w:60,txt:'Z parku przy amfiteatrze nad parkingiem, kosz na boisku przy szkole. Kościuszki, rondo i budynki to OB.'})})();
/* ================= DOŁEK 8 – LEŚNICZÓWKA: Z PARKINGU W STRONĘ LEŚNICZÓWKI ================= */
const H8=(()=>{const K=3,P=mkP(K,0,200),PA=a=>a.map(p=>P(p[0],p[1])),M=K/9,k=1/K,R=rnd(808);
 const wc=P(600,650),ell=[];for(let i=0;i<18;i++){const a=i/18*6.2832;ell.push([wc[0]+Math.cos(a)*100,wc[1]+Math.sin(a)*68])}
 const U={park:1,thin:.12,roads:[],fire:[[...P(673,1118),5]],fences:[PA([[452,995],[452,1085]]),PA([[452,1135],[452,1308],[560,1306]]),PA([[620,1305],[912,1298]])],gates:[[...P(452,1110),0],[...P(590,1306),1]],
  paths:[{p:PA([[233,-30],[233,278],[192,932],[111,1853],[600,1880],[876,1919],[1110,1940]]),w:22*k},{p:PA([[200,1109],[420,1109],[560,1050]]),w:16*k}],
  dirt:[PA([[-30,1075],[275,1075],[275,1315],[-30,1315]]),PA([[400,1470],[800,1460],[810,1760],[400,1760]]),PA([[190,1640],[400,1640],[400,1770],[190,1770]]),PA([[460,990],[900,975],[915,1300],[450,1310]])],
  clear:[ell,PA([[700,820],[900,820],[900,980],[700,980]]),PA([[680,1150],[1090,1150],[1090,1560],[780,1520],[640,1300]]),PA([[520,1330],[760,1330],[760,1470],[520,1470]])],
  bld:[],cars:[],pots:[],bench:[],fount:[],labels:[]};
 bRect(U,P,K,460,1570,80,110,0,{rf:2,fc:0,h:46});
 bRect(U,P,K,725,1600,100,240,.05,{rf:2,fc:0,h:50,lbl:{t:'🌲 Leśniczówka',bg:'#2f6b3a',c:'#fff',s:6}});
 bRect(U,P,K,540,1705,110,80,0,{rf:1,fc:0,h:44});
 bRect(U,P,K,610,1515,50,40,0,{rf:4,fc:5,h:30});
 bRect(U,P,K,590,1405,80,50,0,{rf:4,fc:5,h:34,lbl:{t:'Wiata',bg:'#6b4524',c:'#fff',s:5}});
 parkRow(U,P,K,[205,1745],[290,1745],[0],R,44);parkRow(U,P,K,[70,1095],[70,1300],[0],R,46);parkRow(U,P,K,[250,1095],[250,1300],[0],R,52);
 U.bld.push({c:wc,u:[1,0],v:[0,1],a:45,b:45,h:96,wig:1,lbl:{t:'⛺ Ośrodek Edukacji Leśnej',bg:'#2f6b3a',c:'#fff',s:5}});
 {const fc=P(673,1118);for(let i=0;i<6;i++){const a=i/6*6.2832+.3,x=fc[0]+Math.cos(a)*24,y=fc[1]+Math.sin(a)*20;U.bench.push([x,y,Math.abs(Math.cos(a))>.6?1:0])}}
 const T=(x,y,r,ty)=>[...P(x,y),r,ty];
 const trees=[T(1000,1420,10,6),T(470,1250,10,0)];{const PT=[[233,-30],[233,278],[192,932],[111,1853]];const at=y=>{for(let i=1;i<PT.length;i++)if(y<=PT[i][1]){const f=(y-PT[i-1][1])/(PT[i][1]-PT[i-1][1]);return PT[i-1][0]+(PT[i][0]-PT[i-1][0])*f}return PT[PT.length-1][0]};let k2=0;for(let y=60;y<1640;y+=95){const px=at(y);for(const sd of[-1,1]){k2++;const off=46+((k2*37)%18);trees.push(T(px+sd*off,y+((k2*29)%30),9+((k2*13)%4),k2%3==0?6:0))}}}
 {const a=P(-30,1060),b2=P(290,1330);for(let i=trees.length-1;i>=0;i--){const t=trees[i];if(t[0]>a[0]-t[2]&&t[0]<b2[0]+t[2]&&t[1]>a[1]-t[2]&&t[1]<b2[1]+t[2])trees.splice(i,1)}}
 return mkU({tee:P(262,1665),b:P(645,914),par:3,trees,U,M,w:60,txt:'Z parkingu w stronę Ośrodka – kosz między wigwamem a placem z ogniskiem.'})})();
/* ================= DOŁEK 9 – ŁAKIN: OBOK PIRAMIDY ŁAKIŃSKIEGO I GROBU KONIA ================= */
const H9=(()=>{const K=3,P=mkP(K,0,200),PA=a=>a.map(p=>P(p[0],p[1])),M=K/10,k=1/K;
 const U={park:1,thin:(x,y,h)=>{const d=dpl([x,y],[h.tee,h.b]);return d<75?.8:d<140?.6:d<200?.4:.2},roads:[],paths:[{p:PA([[-30,1420],[200,1330],[450,1120],[650,880],[820,630],[890,550]]),w:22*k}],
  dirt:[PA([[300,1060],[760,1000],[810,1480],[330,1600]])],clear:[PA([[60,1380],[360,1380],[360,1620],[60,1620]]),PA([[700,380],[960,380],[960,760],[700,760]])],
  bld:[],cars:[],pots:[],bench:[],fount:[],labels:[]};
 bRect(U,P,K,600,1250,210,210,0,{pyr:1,h:120,lbl:{t:'🔺 Piramida Łakińskiego',bg:'#6b4524',c:'#fff',s:6}});
 bRect(U,P,K,790,470,34,34,0,{col:1,h:74,lbl:{t:'🐴 Grób konia',bg:'#6b4524',c:'#fff',s:5}});
 const T=(x,y,r,ty)=>[...P(x,y),r,ty];
 const trees=[T(380,1150,10,0),T(760,1420,11,0)];
 return mkU({tee:P(165,1455),b:P(830,690),par:3,trees,U,M,w:60,txt:'Łakin – obok piramidy Łakińskiego, kosz przed grobem konia.'})})();
/* ================= DOŁEK 10 – OSiR: NAD BIEŻNIĄ, KOSZ NA ŚRODKU BOISKA ================= */
const H10=(()=>{const K=3,P=mkP(K,0,240),PA=a=>a.map(p=>P(p[0],p[1])),pxm=7.8,M=K/pxm,k=1/K,R=rnd(1010);
 const uA=[.182,-.983],vA=[.983,.182],C=[585,995],at=(du,dv)=>[C[0]+uA[0]*du+vA[0]*dv,C[1]+uA[1]*du+vA[1]*dv];
 const sa=230,sr=300,sw=85,cap=(rr)=>{const o=[];for(let i=0;i<=16;i++){const an=-Math.PI/2+Math.PI*i/16;o.push(at(sa+Math.cos(an)*rr,Math.sin(an)*rr))}for(let i=0;i<=16;i++){const an=Math.PI/2+Math.PI*i/16;o.push(at(-sa+Math.cos(an)*rr,Math.sin(an)*rr))}return o};
 const stad={c:P(...C),u:uA,a:sa*k,r:sr*k,w:sw*k,pl:375*k,pw:242*k,m:pxm*k};
 const U={park:1,thin:.42,stad,roads:[{p:PA([[880,1420],[1000,1010],[1040,700]]),w:20*k,noOB:1},{p:PA([[880,1400],[1110,1380]]),w:20*k,noOB:1}],
  lots:[PA([[1020,840],[1110,840],[1110,1170],[1020,1170]])],courts:[PA([[935,1690],[1085,1690],[1085,1925],[935,1925]]),PA([[-60,1380],[95,1390],[70,1560],[-60,1555]])],
  dirt:[PA([[300,1420],[440,1400],[430,1500],[330,1520]])],sandP:1,clear:[PA(cap(sr+sw+18)),PA([[610,1680],[780,1680],[780,1950],[610,1950]]),PA([[600,1900],[790,1900],[700,1480],[540,1480]]),PA([[252,292],[392,292],[392,432],[252,432]])],paths:[{p:PA([[-30,1215],[120,1250],[175,1480],[330,1640],[560,1705],[790,1610],[880,1420]]),w:20*k}],
  kids:PA([at(-215,-70),at(-150,60),at(-290,30)]),
  bld:[],cars:[],pots:[],bench:[],fount:[],labels:[]};
 bRect(U,P,K,...at(0,-440),520,46,Math.atan2(uA[1],uA[0]),{fl:1,rf:5,fc:2,h:22,stand:1});
 for(const sg of[1,-1]){const g=at(sg*375,0);bRect(U,P,K,g[0],g[1],57,14,Math.atan2(vA[1],vA[0]),{fl:1,rc:[.97,.97,.97],fc:2,h:14,noOB:1})}
 bRect(U,P,K,1060,1225,130,110,0,{fl:1,rf:3,fc:4,h:52,lbl:{t:'OSiR',bg:'#1f4e8c',c:'#fff',s:5}});
 parkRow(U,P,K,[1062,860],[1062,1160],[0],R,40);
 U.labels.push({x:P(1010,1808)[0],y:P(1010,1808)[1],t:'Korty tenisowe',bg:'#2f6b3a',c:'#fff',s:4.5},{x:P(60,1470)[0],y:P(60,1470)[1],t:'Boisko im. Stephena Curry',bg:'#2f6b3a',c:'#fff',s:4});
 const T=(x,y,r,ty)=>[...P(x,y),r,ty];
 const trees=[T(880,1540,10,6),T(240,1580,10,0),T(578,1617,10,0),T(752,1565,9,6),T(428,396,11,0),T(256,532,12,6),T(634,1632,9,0),T(630,1765,10,6),T(794,1691,11,0),T(812,1740,9,6)];
 const h=mkU({tee:P(692,1860),b:P(322,362),par:4,trees,U,M,w:60,txt:'OSiR – długi rzut przez cały stadion, kosz w lesie za bieżnią. Trybuna i budynki to OB.'});h.cwf=()=>.01;h.noFw=1;return h})();
/* ================= DOŁEK 11 – OSIEDLE WSCHÓD: PRZEZ PLAC, OBOK CYRKU ================= */
const H11=(()=>{const K=3,P=mkP(K,0,260),PA=a=>a.map(p=>P(p[0],p[1])),M=K/10,k=1/K,R=rnd(1111);
 const top=PA([[-30,470],[600,470],[850,478],[990,545],[1110,630]]),up=PA([[590,180],[590,470]]),bot=PA([[-30,1440],[560,1440],[760,1515],[870,1630],[905,1760],[880,1893]]),back=PA([[880,1893],[-30,1893]]),mainR=PA([[1110,1330],[985,1520],[915,1750]]);
 const U={sc:.2/M,roads:[{p:top,w:44*k,c:1},{p:up,w:44*k,c:1},{p:bot,w:44*k,c:1},{p:back,w:40*k,c:1},{p:mainR,w:62*k,c:1}],plaza:[],
  lots:[PA([[-30,495],[560,495],[560,540],[-30,540]]),PA([[-30,1380],[400,1380],[400,1418],[-30,1418]])],
  dirt:[PA([[520,500],[760,500],[740,700],[700,1080],[880,1330],[900,1460],[620,1425],[430,1385],[420,1300],[560,920]])],
  grass:[PA([[760,500],[990,560],[1110,640],[1110,1400],[900,1460],[880,1330],[700,1080],[740,700]]),PA([[-30,610],[380,610],[380,860],[-30,860]]),PA([[-30,1010],[470,1010],[470,1160],[-30,1160]]),PA([[-30,1300],[400,1300],[400,1380],[-30,1380]]),PA([[290,1170],[420,1170],[410,1300],[290,1300]]),PA([[1110,1400],[1110,2000],[952,2000],[952,1762],[1042,1560]]),PA([[-30,262],[560,262],[560,440],[-30,440]]),PA([[620,262],[1110,262],[1110,595],[990,520],[850,452],[620,446]])],
  paths:[{p:PA([[560,910],[480,1120],[420,1300]]),w:14*k}],
  bld:[],cars:[],pots:[],bench:[],fount:[],labels:[]};
 for(const[x,y,rf,fc,an]of[[70,340,0,1,0],[205,330,4,2,0],[345,345,1,0,0],[480,335,3,3,0],[690,330,0,2,0],[830,345,4,1,0],[975,380,1,0,.25]]){bRect(U,P,K,x,y,76,62,an,{rf,fc,h:40});const d=P(x+50,y+60);U.cars.push({x:d[0],y:d[1],a:Math.PI/2,c:CARC[(x*7)%CARC.length]})}
 bRect(U,P,K,175,565,410,60,0,{fl:1,rf:2,fc:3,h:30});
 bRect(U,P,K,450,750,120,300,0,{fl:1,rf:2,fc:2,h:66});
 bRect(U,P,K,220,945,500,110,0,{fl:1,rf:2,fc:3,h:66,lbl:{t:'Osiedle Wschód',bg:'#1f4e8c',c:'#fff',s:5}});
 bRect(U,P,K,130,1235,320,120,0,{fl:1,rf:3,fc:1,h:62});
 bRect(U,P,K,390,1600,840,120,.07,{fl:1,rf:2,fc:4,h:66});
 bRect(U,P,K,755,1140,40,130,.22,{fl:1,rc:[.95,.95,.92],fc:2,h:30,noOB:1});
 U.bld.push({c:P(905,985),u:[1,0],v:[0,1],a:118*k,b:118*k,h:88,circus:16,lbl:{t:'🎪 Cyrk',bg:'#c0392b',c:'#fff',s:6}});
 U.bld.push({c:P(990,1225),u:[1,0],v:[0,1],a:42*k,b:42*k,h:46,circus:10});
 for(const[x,y,an,c]of[[800,760,.4,[.95,.85,.2]],[1040,690,-.3,[.2,.45,.8]],[1040,880,1.5,[.95,.95,.9]],[830,1260,.9,[.8,.2,.2]],[1060,1080,1.4,[.3,.6,.35]]]){bRect(U,P,K,x,y,80,30,an,{fl:1,rc:c,fc:2,h:30})}
 parkRow(U,P,K,[612,560],[612,940],[0],R,52);parkRow(U,P,K,[712,640],[712,870],[0],R,56);
 parkRow(U,P,K,[470,1210],[600,1330],[0],R,60);parkRow(U,P,K,[660,1428],[820,1480],[0],R,44);
 for(let x=20;x<560;x+=46){if(R()<.3)continue;const p=P(x,517);U.cars.push({x:p[0],y:p[1],a:Math.PI/2*(R()<.5?1:3)+(R()-.5)*.06,c:CARC[(R()*CARC.length)|0]})}
 {const p=P(560,1880);U.cars.push({x:p[0],y:p[1],a:Math.PI/2,c:CARC[2]})}
 U.labels.push({x:P(330,1430)[0],y:P(330,1430)[1]+4,t:'Basia – salon fryzjerski',bg:'#e86aa0',c:'#fff',s:4});
 const T=(x,y,r,ty)=>[...P(x,y),r,ty];
 const trees=[T(120,700,11,0),T(300,780,10,6),T(60,1080,12,0),T(380,1080,10,6),T(200,1340,9,0),T(1080,520,10,6),T(1090,1350,11,0),T(960,1400,10,6),T(140,290,9,0),T(410,290,10,6),T(760,300,9,0),T(1065,1730,12,0),T(990,1760,11,6),T(1060,1900,10,0)];
 return mkU({tee:P(300,1340),b:P(965,740),par:3,trees,U,M,w:60,teeA:.86,txt:'Osiedle Wschód – przez plac pełen aut, obok cyrku. Namiot cyrku, wozy i bloki to OB.'})})();
/* ================= DOŁEK 12 – LICEUM: DOGLEG KOŁO KOŚCIOŁA, KOSZ PRZY BOISKU ================= */
const H12=(()=>{const K=3,P=mkP(K,235,330),PA=a=>a.map(p=>P(p[0],p[1])),M=K/8.55,k=1/K,R=rnd(1212);
 const U={park:1,thin:.5,roads:[{p:PA([[90,880],[1300,880]]),w:46*k,c:1},{p:PA([[540,320],[1060,850],[1120,880]]),w:50*k,c:1},{p:PA([[890,900],[890,1085]]),w:30*k,noOB:1}],
  lots:[PA([[728,1078],[962,1078],[962,1172],[728,1172]])],
  plaza:[PA([[240,1000],[490,1000],[490,1160],[240,1160]])],
  dirt:[PA([[215,1175],[305,1175],[305,1245],[215,1245]]),PA([[385,1385],[505,1385],[505,1455],[385,1455]]),PA([[1000,1450],[1240,1450],[1240,1595],[1000,1595]])],
  courts:[PA([[715,1405],[985,1412],[978,1548],[708,1540]])],
  paths:[{p:PA([[1000,905],[1004,1150],[1010,1440]]),w:15*k}],
  clear:[PA([[150,890],[1110,890],[1110,975],[150,975]]),PA([[955,975],[1065,975],[1065,1445],[955,1445]]),PA([[150,1280],[1065,1280],[1065,1445],[870,1500],[110,1492]]),PA([[920,740],[1000,740],[1000,860],[920,860]])],
  bld:[],cars:[],pots:[],bench:[],fount:[],labels:[]};
 bRect(U,P,K,560,965,170,80,0,{rf:0,fc:4,h:58,lbl:{t:'SP nr 3',bg:'#1f4e8c',c:'#fff',s:4.5}});
 bRect(U,P,K,565,1060,100,80,0,{fl:1,rf:2,fc:2,h:44});
 bRect(U,P,K,700,1125,85,240,0,{fl:1,rf:2,fc:3,h:56});
 bRect(U,P,K,780,1040,150,90,0,{fl:1,rf:3,fc:2,h:50});
 bRect(U,P,K,440,1215,190,58,0,{fl:1,rf:3,fc:1,h:30});
 bRect(U,P,K,615,1272,300,58,0,{fl:1,rf:2,fc:2,h:40});
 bRect(U,P,K,870,1262,205,140,0,{rf:0,fc:4,h:70,lbl:{t:'I Liceum',bg:'#8c1f2a',c:'#fff',s:5}});
 bRect(U,P,K,885,1355,52,38,0,{fl:1,rf:3,fc:1,h:28});
 bRect(U,P,K,1190,1252,200,100,0,{rf:1,fc:0,h:118,lbl:{t:'⛪ Fara – Kościół św. Jakuba',bg:'#6b4a2a',c:'#fff',s:4.5}});
 {const c=P(1292,1252);U.bld.push({c,u:[1,0],v:[0,1],a:52*k,b:52*k,h:96,cone:1,rf:1})}
 bRect(U,P,K,1070,1252,76,76,0,{rf:1,fc:0,h:250,spire:1});
 for(const[x,y,w,d,an,rf]of[[300,710,90,70,0,2],[590,620,70,60,.75,0],[650,710,70,60,.75,4],[712,795,68,54,.75,1],[880,565,80,60,.75,3],[955,655,80,60,.75,2],[1050,770,76,56,.75,0],[420,640,80,64,0,1],[380,430,84,62,.75,3],[300,520,76,60,0,0],[700,420,74,58,.75,2],[200,720,80,60,0,4]])bRect(U,P,K,x,y,w,d,an,{rf,fc:(x>>3)%5,h:40});
 parkRow(U,P,K,[742,1104],[950,1104],[0],R,32);parkRow(U,P,K,[742,1148],[950,1148],[0],R,32);
 parkRow(U,P,K,[1040,1500],[1240,1500],[0],R,30);parkRow(U,P,K,[1020,1548],[1240,1548],[0],R,34);
 U.labels.push({x:P(845,1478)[0],y:P(845,1478)[1],t:'Boisko',bg:'#2f6b3a',c:'#fff',s:4.5},{x:P(700,872)[0],y:P(700,872)[1]+4,t:'Klasztorna',bg:'#555',c:'#fff',s:4});
 const T=(x,y,r,ty)=>[...P(x,y),r,ty];
 const trees=[T(240,1110,14,0),T(380,1228,9,6),T(1050,1010,12,0),T(1110,1100,11,6),T(1110,1400,10,6),T(400,760,10,0),T(520,750,9,6),T(1150,1000,12,0)];
 for(let i=0;i<=11;i++){const t=i/11;trees.push(T(110+760*t,1500+150*t+(i%2?6:-6),7+(i%3),i%2?6:0))}
 const h=mkU({tee:P(968,800),b:P(440,1395),par:4,trees,U,M,w:60,teeA:3.05,txt:'Liceum – z parkingu w dół koło kościoła, potem w lewo wzdłuż boiska. Budynki to OB.'});
 /* dogleg: tor gry po łamanej */
 const Q=[h.tee,P(1005,1130),P(1008,1395),h.b],seg=[];let L=0;for(let i=1;i<Q.length;i++){const l=Math.hypot(Q[i][0]-Q[i-1][0],Q[i][1]-Q[i-1][1]);seg.push(l);L+=l}
 const pts=[],pf=[];let acc=0;for(let i=1;i<Q.length;i++){const n=Math.max(4,Math.round(seg[i-1]/6));for(let j=(i==1?0:1);j<=n;j++){const f=j/n;pts.push([Q[i-1][0]+(Q[i][0]-Q[i-1][0])*f,Q[i-1][1]+(Q[i][1]-Q[i-1][1])*f]);pf.push((acc+seg[i-1]*f)/L)}acc+=seg[i-1]}
 h.path=pts;h.pf=pf;h.L=L;
 h.along=p=>{let best=1e9,ba=0,a0=0;for(let i=1;i<Q.length;i++){const A=Q[i-1],B=Q[i],dx=B[0]-A[0],dy=B[1]-A[1],l=seg[i-1],t=Math.max(0,Math.min(1,((p[0]-A[0])*dx+(p[1]-A[1])*dy)/(l*l))),d=Math.hypot(p[0]-A[0]-dx*t,p[1]-A[1]-dy*t);if(d<best){best=d;ba=a0+l*t}a0+=l}return ba};
 h.lat=p=>{let best=1e9,sg=0;for(let i=1;i<Q.length;i++){const A=Q[i-1],B=Q[i],dx=B[0]-A[0],dy=B[1]-A[1],l=seg[i-1],t=Math.max(0,Math.min(1,((p[0]-A[0])*dx+(p[1]-A[1])*dy)/(l*l))),d=Math.hypot(p[0]-A[0]-dx*t,p[1]-A[1]-dy*t);if(d<best){best=d;sg=((p[0]-A[0])*(-dy)+(p[1]-A[1])*dx)/l}}return sg};
 h.rel=(u,l)=>{let a0=0;for(let i=1;i<Q.length;i++){const sl=seg[i-1];if(u<=a0+sl||i==Q.length-1){const A=Q[i-1],B=Q[i],ux=(B[0]-A[0])/sl,uy=(B[1]-A[1])/sl,t=u-a0;return[A[0]+ux*t-uy*l,A[1]+uy*t+ux*l]}a0+=sl}return h.b};
 h.camDx=-25;return h})();
const SW=[H1,H2,H3,H4,H5,H6,H7,H8,H9,H10,H11,H12];window.SW=SW;
[1,3,6,10].forEach((k,j)=>{const h=SW[k];if(!h||!h.U)return;let best=null,bl=0;for(const r of h.U.roads||[]){const P=r.p;if(!P||P.length<2)continue;let l=0;for(let i=1;i<P.length;i++)l+=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);if(l>bl){bl=l;best=P}}if(best&&bl>120){h.U.scoot=best;h.U.scootPh=j*7}});
/* ---------- życie na ulicach: przechodnie, rowerzyści, jadące auta, pociąg (dołek 4), kaczki (dołek 6) ---------- */
const offL=(P,o)=>P.map((p,i)=>{const a=P[Math.max(0,i-1)],e=P[Math.min(P.length-1,i+1)],L=Math.hypot(e[0]-a[0],e[1]-a[1])||1;return[p[0]-(e[1]-a[1])/L*o,p[1]+(e[0]-a[0])/L*o]});
const plenW=P=>{let l=0;for(let i=1;i<P.length;i++)l+=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);return l};
const atL=(P,s)=>{for(let i=1;i<P.length;i++){const l=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);if(s<=l||i==P.length-1){const f=Math.min(1,s/(l||1));return[P[i-1][0]+(P[i][0]-P[i-1][0])*f,P[i-1][1]+(P[i][1]-P[i-1][1])*f,Math.atan2(P[i][0]-P[i-1][0],-(P[i][1]-P[i-1][1]))]}s-=l}return[P[0][0],P[0][1],0]};
const SHIRTS=['#3b82f6','#e5533c','#f2c230','#2e8b57','#8e44ad','#ecf0f1','#34495e','#e67e22'];
function liveOf(h){if(h._live)return h._live;const U=h.U,R=rnd(((h.b[0]|0)*17+(h.tee[1]|0))|0),L={ped:[],bike:[],car:[],duck:[],train:null};
 for(const r of U.roads||[]){const P=r.p,len=plenW(P);if(len<60)continue;if(r.bike){for(let q=0;q<2;q++)L.bike.push({P:q?P.slice().reverse():P,len,v:10+R()*4,ph:R()*999,sh:SHIRTS[(R()*SHIRTS.length)|0],path:r});continue}const closed=Math.hypot(P[0][0]-P[P.length-1][0],P[0][1]-P[P.length-1][1])<5;if(closed)continue;
  for(const sd of[-1,1]){const lane=offL(sd>0?P:P.slice().reverse(),r.w*.22);if(R()<.85)L.car.push({P:lane,len,v:16+R()*10,ph:R()*999,gap:len*.8+R()*200,c:CARC[(R()*CARC.length)|0]});
   const sw=offL(P,sd*(r.w/2+3.5));const n=1+(R()*2|0);for(let k=0;k<n;k++)L.ped.push({P:R()<.5?sw:sw.slice().reverse(),len,v:3+R()*2.5,ph:R()*999,sh:SHIRTS[(R()*SHIRTS.length)|0]})}
  if(R()<.45)L.bike.push({P:offL(P,r.w*.38),len,v:9+R()*4,ph:R()*999,sh:SHIRTS[(R()*SHIRTS.length)|0]})}
 for(const r of U.paths||[]){const len=plenW(r.p);const n=1+(R()*2|0);for(let k=0;k<n;k++)L.ped.push({P:R()<.5?r.p:r.p.slice().reverse(),len,v:2.5+R()*2,ph:R()*999,sh:SHIRTS[(R()*SHIRTS.length)|0]});if(R()<.4)L.bike.push({P:r.p,len,v:7+R()*3,ph:R()*999,sh:SHIRTS[(R()*SHIRTS.length)|0]})}
 for(const W of U.walk||[]){L.ped.push({P:W,len:plenW(W),v:3+R()*2,ph:R()*999,sh:SHIRTS[(R()*SHIRTS.length)|0]})}
 if(U.rails&&U.rails[1]){const P=U.rails[1];L.train={P,len:plenW(P)}}
 if(U.ducks)for(const d of U.ducks)L.duck.push({x:d[0],y:d[1],ph:R()*6.28});
 return h._live=L}
function walkPos(o,t){const per=o.len/o.v;const f=((t+o.ph)%(2*per))/per;const s=f<1?f*o.len:(2-f)*o.len;const q=atL(o.P,s);return[q[0],q[1],f<1?q[2]:q[2]+Math.PI]}
function drawCarTop(x,y,a,col){g.save();g.translate(x,y);g.rotate(a);g.fillStyle='rgba(0,0,0,.28)';g.beginPath();g.roundRect(-5.2+1.5,-13+2,10.4,26,3);g.fill();g.fillStyle=col;g.beginPath();g.roundRect(-5.4,-13.2,10.8,26.4,3.4);g.fill();g.fillStyle='rgba(15,22,32,.85)';g.beginPath();g.roundRect(-4.4,-7.5,8.8,4.6,1.5);g.fill();g.beginPath();g.roundRect(-4.4,4.6,8.8,3.6,1.5);g.fill();g.fillStyle='rgba(255,255,255,.18)';g.fillRect(-4.2,-2.6,8.4,7);g.fillStyle='#fff6c8';g.fillRect(-4.6,-13.2,2.4,1.2);g.fillRect(2.2,-13.2,2.4,1.2);g.fillStyle='#b8221c';g.fillRect(-4.6,12.2,2.4,1);g.fillRect(2.2,12.2,2.4,1);g.restore()}
function drawBike(x,y,a,sh,t){g.save();g.translate(x,y);g.rotate(a);g.strokeStyle='#222';g.lineWidth=.9;g.beginPath();g.ellipse(0,-4.2,.8,2.3,0,0,7);g.stroke();g.beginPath();g.ellipse(0,4.2,.8,2.3,0,0,7);g.stroke();g.beginPath();g.moveTo(0,-4.2);g.lineTo(0,4.2);g.stroke();g.fillStyle=sh;g.beginPath();g.ellipse(0,.4,2.6,2,0,0,7);g.fill();g.fillStyle='#5a3a22';g.beginPath();g.arc(0,-.6,1.4,0,7);g.fill();g.restore()}
function drawDuck(x,y,t,ph){const bob=Math.sin(t*2+ph)*.3;g.save();g.translate(x+Math.sin(t*.3+ph)*6,y+Math.cos(t*.25+ph)*3+bob);g.fillStyle='rgba(255,255,255,.35)';g.beginPath();g.ellipse(0,1,4.5,1.6,0,0,7);g.fill();g.fillStyle='#8a6a44';g.beginPath();g.ellipse(0,0,3,1.8,0,0,7);g.fill();g.fillStyle='#1f6b3a';g.beginPath();g.arc(2.4,-1,1.1,0,7);g.fill();g.fillStyle='#f2a33a';g.fillRect(3.3,-1.2,1,.5);g.restore()}
window.__trainOn=h=>{try{return !!trainRect(h,performance.now()/1000)}catch(e){return false}};
function trainRect(h,t){const L=liveOf(h);if(!L.train)return null;const per=26,run=9,tt=t%per;if(tt>run)return null;const len=110,s=-len+(L.train.len+len*2)*(tt/run);return{s,len,P:L.train.P}}
const _dwL=drawWorld;drawWorld=function(){_dwL.apply(this,arguments);try{const h=holes&&holes[hi];if(!h||!h.sw||!playing)return;const t=performance.now()/1000,L=liveOf(h);g.save();worldT();
 for(const d of L.duck)drawDuck(d.x,d.y,t,d.ph);
 for(const c of L.car){const per=(c.len+c.gap)/c.v,tt=((t+c.ph)%per)*c.v;if(tt>c.len)continue;const q=atL(c.P,tt);drawCarTop(q[0],q[1],q[2],c.c)}
 const tr=trainRect(h,t);if(tr){for(let k=0;k<3;k++){const s0=tr.s+k*37;if(s0<-40||s0>tr.len*0+plenW(tr.P)+40)continue;const q=atL(tr.P,Math.max(0,s0));g.save();g.translate(q[0],q[1]);g.rotate(q[2]+Math.PI/2);g.fillStyle='rgba(0,0,0,.3)';g.fillRect(-17,-4,36,10);g.fillStyle='#f4f4f2';g.beginPath();g.roundRect(-18,-5.5,35,11,3);g.fill();g.fillStyle='#c0392b';g.fillRect(-18,2.2,35,2.2);g.fillStyle='rgba(20,30,40,.75)';for(let w=-15;w<14;w+=5)g.fillRect(w,-3.6,3.4,2.2);g.restore()}}
 for(const b of L.bike){const q=walkPos(b,t);drawBike(q[0],q[1],q[2],b.sh,t)}
 for(const p of L.ped){const q=walkPos(p,t);try{PERSON(q[0],q[1]-2,{s:.62,shirt:p.sh,ph:p.ph})}catch(e){}}
 g.restore()}catch(e){}};
/* pomnik Neptuna, ognisko, kolejka do pączkarni */
function drawNeptun(x,y,t){g.save();g.translate(x,y);g.scale(.62,.62);
 g.fillStyle='rgba(0,0,0,.28)';g.beginPath();g.ellipse(14,3,22,7,0,0,7);g.fill();
 g.fillStyle='#8f8a80';g.fillRect(-13,-9,26,11);g.fillStyle='#bdb7aa';g.fillRect(-13,-14,26,6);
 g.fillStyle='#7d786f';g.fillRect(-9,-25,18,12);g.fillStyle='#d2ccbe';g.fillRect(-9,-28,18,4);
 g.fillStyle='#3a3a36';g.font='900 4px system-ui';g.textAlign='center';g.fillText('NEPTUN',0,-16);
 const B='#4f8a76',Bd='#356455',Bl='#86c2ab';g.lineCap='round';
 g.fillStyle=Bd;g.fillRect(-5,-46,4,19);g.fillRect(1,-46,4,19);
 g.fillStyle=Bl;g.beginPath();g.moveTo(-7,-48);g.lineTo(7,-48);g.lineTo(6,-41);g.lineTo(-6,-41);g.closePath();g.fill();
 g.fillStyle=B;g.beginPath();g.moveTo(-7,-48);g.lineTo(7,-48);g.lineTo(6,-64);g.lineTo(-6,-64);g.closePath();g.fill();
 g.fillStyle=Bl;g.fillRect(-4,-62,2.4,12);
 g.strokeStyle=B;g.lineWidth=3.2;g.beginPath();g.moveTo(-6,-62);g.lineTo(-11,-50);g.lineTo(-9,-44);g.stroke();
 g.beginPath();g.moveTo(6,-62);g.lineTo(11,-72);g.stroke();
 g.strokeStyle='#d4ad2c';g.lineWidth=1.6;g.beginPath();g.moveTo(12,-34);g.lineTo(12,-92);g.stroke();
 g.beginPath();g.moveTo(7,-86);g.lineTo(7,-94);g.moveTo(17,-86);g.lineTo(17,-94);g.moveTo(7,-86);g.lineTo(17,-86);g.moveTo(12,-92);g.lineTo(12,-99);g.stroke();
 g.fillStyle=B;g.beginPath();g.arc(0,-70,5,0,7);g.fill();g.fillStyle=Bl;g.beginPath();g.arc(-1.5,-71.5,1.6,0,7);g.fill();
 g.fillStyle=Bd;g.beginPath();g.moveTo(-4,-68);g.lineTo(4,-68);g.lineTo(0,-60);g.closePath();g.fill();
 g.fillStyle='#d4ad2c';g.beginPath();g.moveTo(-5,-73);g.lineTo(-4,-79);g.lineTo(-2,-75);g.lineTo(0,-80);g.lineTo(2,-75);g.lineTo(4,-79);g.lineTo(5,-73);g.closePath();g.fill();
 const sh=(Math.sin(t*.7)+1)*.5;g.fillStyle='rgba(255,255,255,'+(.15+.2*sh)+')';g.fillRect(3,-63,1.5,14);
 g.restore()}
function drawFire(x,y,t){g.save();g.translate(x,y);g.fillStyle='#4a2e18';g.save();g.rotate(.5);g.fillRect(-4,-.8,8,1.6);g.restore();g.save();g.rotate(-.6);g.fillRect(-4,-.8,8,1.6);g.restore();
 for(let k=0;k<5;k++){const ph=t*7+k*1.7,hgt=5+Math.sin(ph)*1.6+k%2*1.5,w=1.6+Math.sin(ph*1.3)*.4,xo=(k-2)*1.1;g.fillStyle=k%2?'rgba(255,150,30,.85)':'rgba(255,210,60,.9)';g.beginPath();g.moveTo(xo-w,0);g.quadraticCurveTo(xo-w*.6,-hgt*.6,xo+Math.sin(ph)*.6,-hgt);g.quadraticCurveTo(xo+w*.6,-hgt*.6,xo+w,0);g.closePath();g.fill()}
 for(let k=0;k<3;k++){const f=((t*.6+k/3)%1);g.fillStyle='rgba(120,120,120,'+(.25*(1-f))+')';g.beginPath();g.arc(Math.sin(t+k)*2,-8-f*14,1.5+f*3,0,7);g.fill()}
 const gl=g.createRadialGradient(0,-2,0,0,-2,12);gl.addColorStop(0,'rgba(255,180,60,.25)');gl.addColorStop(1,'rgba(255,180,60,0)');g.fillStyle=gl;g.beginPath();g.arc(0,-2,12,0,7);g.fill();g.restore()}
const QTXT=['Ile jeszcze stoimy?','Biorę z różą!','Mówią, że świeże o 10','Ja tylko dwa…','Są jeszcze z budyniem?','Uwaga, leci dysk!','Wągrowiec ma najlepsze pączki','Dla mnie sześć, rodzina czeka','Ten pan gra w golfa?','Kiedyś kolejka była dłuższa'];
function drawQueue(B,t){const n=5,ux=B.u[0],uy=B.u[1],fx=-B.v[0],fy=-B.v[1],bx=B.c[0]+fx*(B.b+6),by=B.c[1]+fy*(B.b+6),spk=((t/3.2)|0)%n,line=QTXT[((t/3.2)|0)%QTXT.length];
 const P=[];for(let i=0;i<n;i++)P.push([bx+ux*(i*7-14)+fx*(i%2?1:-.5),by+uy*(i*7-14)+fy*(i%2?1:-.5)]);P.sort((a,b)=>a[1]-b[1]);
 for(let i=0;i<n;i++){try{PERSON(P[i][0],P[i][1],{s:.62,shirt:SHIRTS[(i*3+1)%SHIRTS.length],ph:i*1.3,talk:i==spk})}catch(e){}}
 const q=P[spk];g.save();g.font='800 5px system-ui';const w=g.measureText(line).width+6,x=q[0]-w/2,y=q[1]-30;g.fillStyle='rgba(255,255,255,.95)';g.beginPath();g.roundRect(x,y,w,9,3);g.fill();g.beginPath();g.moveTo(q[0]-2,y+9);g.lineTo(q[0],y+12);g.lineTo(q[0]+2,y+9);g.fill();g.fillStyle='#222';g.textAlign='center';g.textBaseline='middle';g.fillText(line,q[0],y+4.8);g.restore()}
/* rzeczy na ulicach: latarnie, kosze, hydranty, przystanek, znaki, rowery, hulajnogi, donice, stoliki */
function propPlan(h){if(h._props)return h._props;const U=h.U,R=rnd(Math.round(h.tee[0]*13+h.b[1]*7)),out=[];
 const inB=(x,y,r)=>{for(const B of U.bld){const px=x-B.c[0],py=y-B.c[1];if(Math.abs(px*B.u[0]+py*B.u[1])<B.a+r+4&&Math.abs(px*B.v[0]+py*B.v[1])<B.b+r+4)return true}return false};
 const onRoad=(x,y,r)=>{for(const q of U.roads||[])if(q.p&&dpl([x,y],q.p)<q.w/2+r)return true;return false};
 const bad=(x,y,r)=>x<4||y<4||x>W-4||y>H-4||inB(x,y,r)||onRoad(x,y,r)||Math.hypot(x-h.tee[0],y-h.tee[1])<16||Math.hypot(x-h.b[0],y-h.b[1])<14||(U.lots||[]).some(P=>inPoly(x,y,P))||(U.cars||[]).some(c=>Math.hypot(c.x-x,c.y-y)<7+r)||out.some(o=>Math.hypot(o.x-x,o.y-y)<o.r+r+2)||(h.trees||[]).some(t=>Math.hypot(t[0]-x,t[1]-y)<t[2]*.7+r);
 const UM=h._UM,US=UM?Math.round(Math.sqrt(UM.length/(W*H))):0,side=(x,y)=>{if(!UM||!US)return true;for(const[dx,dy]of[[0,0],[2,0],[-2,0],[0,2],[0,-2]]){const v=UM[(((y+dy)*US)|0)*W*US+(((x+dx)*US)|0)];if(v!==1)return false}return true};
 const add=(k,x,y,an,sz,r)=>{if(bad(x,y,r))return false;if(k!='pot'&&!side(x,y))return false;out.push({k,x,y,an,sz,r});return true};
 let lampN=0,hyd=0;const roads=(U.roads||[]).filter(q=>q.p&&q.p.length>1).map(q=>{let L=0;for(let i=1;i<q.p.length;i++)L+=Math.hypot(q.p[i][0]-q.p[i-1][0],q.p[i][1]-q.p[i-1][1]);return{q,L}}).sort((a,b)=>b.L-a.L);
 const at=(q,u,side,off)=>{const P=q.p;let a0=0;for(let i=1;i<P.length;i++){const l=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);if(u<=a0+l||i==P.length-1){const f=(u-a0)/l,dx=(P[i][0]-P[i-1][0])/l,dy=(P[i][1]-P[i-1][1])/l;return{x:P[i-1][0]+dx*l*f-dy*side*off,y:P[i-1][1]+dy*l*f+dx*side*off,an:Math.atan2(dy,dx)}}a0+=l}return null};
 for(const{q,L}of roads){if(q.noOB&&!q.c)continue;const off=q.w/2+6;for(let u=18,s=1;u<L-10;u+=58,s=-s){const p=at(q,u,s,off);if(!p)continue;if(add('lamp',p.x,p.y,p.an,14,4)){lampN++;if(lampN%3==0){const p2=at(q,u+7,s,off+1);p2&&add('bin',p2.x,p2.y,0,8,3)}}
   if(u%3==1||R()<.18){const p3=at(q,u+24,-s,off);if(p3&&hyd<3&&R()<.45&&add('hyd',p3.x,p3.y,0,7.5,3))hyd++}}}
 if(roads[0]&&roads[0].L>140){const{q,L}=roads[0];for(const f of[.5,.35,.65]){const p=at(q,L*f,1,q.w/2+6);if(p&&add('stop',p.x,p.y,p.an,32,10))break}}
 for(const{q,L}of roads.slice(0,3)){for(const u of[10,L-10]){const p=at(q,u,-1,q.w/2+3);p&&add('sign',p.x,p.y,0,10,3)}}
 for(let n=0,k=0;n<40&&k<4;n++){const r0=roads[(R()*Math.min(3,roads.length))|0];if(!r0)break;const p=at(r0.q,10+R()*(r0.L-20),R()<.5?1:-1,r0.q.w/2+5);if(!p)continue;const bk=R()<.6;if(add(bk?'bike':'scoot',p.x,p.y,p.an+Math.PI/2+(R()-.5)*.3,bk?18:13,5))k++}
 for(const P of U.plaza||[]){let cx=0,cy=0;for(const q of P){cx+=q[0];cy+=q[1]}cx/=P.length;cy/=P.length;for(let n=0,k=0;n<60&&k<6;n++){const q=P[(R()*P.length)|0],f=.55+R()*.3,x=cx+(q[0]-cx)*f,y=cy+(q[1]-cy)*f;if(!inPoly(x,y,P))continue;if(k<2&&add('pot',x,y,0,12,5))k++}}
 return h._props=out}
function drawProps(h){const S=window.__SPR;if(!S||!S.ok())return;const L=propPlan(h),wn=season=='winter';for(const o of L){if(wn&&(o.k=='cafe'||o.k=='pot'))continue;g.save();g.translate(o.x,o.y);g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(o.sz*.12,o.sz*.16,o.sz*.42,o.sz*.3,o.an||0,0,7);g.fill();if(o.k=='lamp'){g.strokeStyle='rgba(0,0,0,.22)';g.lineWidth=1.2;g.beginPath();g.moveTo(.5,.5);g.lineTo(14,11);g.stroke()}g.rotate((o.k=='stop'||o.k=='bike'||o.k=='scoot')?o.an:0);g.drawImage(S.IM,S.M[o.k]*128+2,2,124,124,-o.sz/2,-o.sz/2,o.sz,o.sz);g.restore()}}
/* uderzenie w budynek: bez liści i ptaków */
window.__nearBld=(x,y)=>{try{const h=holes[hi];if(!h||!h.U||!h.U.bld)return false;let td=1e9;for(const t of (h.trees||[]).concat(h._fill||[]))td=Math.min(td,Math.hypot(t[0]-x,t[1]-y)-(t[2]||8));if(td<2)return false;for(const B of h.U.bld){const px=x-B.c[0],py=y-B.c[1],du=Math.abs(px*B.u[0]+py*B.u[1])-B.a,dv=Math.abs(px*B.v[0]+py*B.v[1])-B.b;if(Math.max(du,dv)<6)return true}return false}catch(e){return false}};
/* hulajnogowiec z gangu Kukiriniarzy – jeździ po ulicy i krzyczy */
const SCL=['GANG KUKIRINIARZY RZĄDZI!','Z drogi! Kukirin jedzie!','Kukirin G3, 45 na liczniku!','Odblokowany Kukirin, nie ma limitu!','Bateria 3%… dojadę!','Dysk? Ja wolę Kukirina!','Kukiriniarze, zbiórka pod Biedrą!','Uważaj, bo wjadę w kosz!','Patrz, bez trzymanki!','Kto nie ma Kukirina, ten pieszo!']
const SC={say:'',until:0,next:0};
function drawScoot(h,t){const P=h.U.scoot,n=P.length;let L=0;const seg=[];for(let i=1;i<n;i++){const l=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);seg.push(l);L+=l}
 const sp=26,per=L/sp,ph=(t+h.U.scootPh)%(per*2),fw=ph<per,u=(fw?ph:per*2-ph)*sp;let a0=0,x=P[0][0],y=P[0][1],an=0;
 for(let i=1;i<n;i++){const l=seg[i-1];if(u<=a0+l||i==n-1){const f=Math.min(1,(u-a0)/l);x=P[i-1][0]+(P[i][0]-P[i-1][0])*f;y=P[i-1][1]+(P[i][1]-P[i-1][1])*f;an=Math.atan2(P[i][1]-P[i-1][1],P[i][0]-P[i-1][0])+(fw?0:Math.PI);break}a0+=l}
 const off=6,nx=-Math.sin(an),ny=Math.cos(an);x+=nx*off;y+=ny*off;window.__scP=[x,y];
 if(t>SC.next){SC.say=SCL[(Math.random()*SCL.length)|0];SC.until=t+4;SC.next=t+6+Math.random()*3}
 if(disc&&!SC.d){SC.d=disc;SC.say=['Ej, uważaj z tym talerzem!','Gang Kukiriniarzy widzi twój rzut!','Rzuć w hulajnogę, odważny?'][(Math.random()*3)|0];SC.until=t+3;SC.next=t+8}if(!disc)SC.d=null;
 const S=window.__SPR;g.save();g.fillStyle='rgba(0,0,0,.28)';g.beginPath();g.ellipse(x+1.5,y+2,7,3,an,0,7);g.fill();
 if(S&&S.ok()){g.save();g.translate(x,y);g.rotate(an+Math.PI/2);g.drawImage(S.IM,S.M.scoot*128+2,2,124,124,-10,-10,20,20);g.restore()}
 g.restore();const sk=.8,shY=-28.8;g.save();g.translate(x,y+1);g.scale(sk,sk);g.strokeStyle='#2a2a2a';g.lineCap='round';g.lineWidth=1.4;g.beginPath();g.moveTo(0,-1);g.lineTo(.6,shY+7.6);g.stroke();g.restore();try{PERSON(x,y+1,{s:sk,shirt:'#1b1b1b',pants:'#2c3444',hair:'#222',hat:'cap',arms:'bar',talk:SC.until>t})}catch(e){}g.save();g.translate(x,y+1);g.scale(sk,sk);g.strokeStyle='#111';g.lineCap='round';g.lineWidth=1.5;g.beginPath();g.moveTo(-7,shY+7.6);g.lineTo(7,shY+7.6);g.stroke();g.fillStyle='#c0392b';g.fillRect(-7.8,shY+6.8,1.6,1.6);g.fillRect(6.2,shY+6.8,1.6,1.6);g.restore();
 if(SC.until>t){const line=SC.say;g.save();g.font='900 6px system-ui';const w=g.measureText(line).width+7,bx=x-w/2,by=y-38;g.fillStyle='rgba(20,20,20,.92)';g.beginPath();g.roundRect(bx,by,w,11,3);g.fill();g.beginPath();g.moveTo(x-2,by+11);g.lineTo(x,by+14);g.lineTo(x+2,by+11);g.fill();g.fillStyle='#ffd23f';g.textAlign='center';g.textBaseline='middle';g.fillText(line,x,by+5.8);g.restore()}}
/* dzieciaki grające w piłkę (OSiR) – krzyczą, gdy lecisz dyskiem */
const KTHR=['Ej, rzuć do nas!','Uwaga, leci talerz!','Panie, tu się gra w piłkę!','Trafisz w bramkę?','Co to za frisbee?','Ale poleciał!'],KNEAR=['Prawie w nas!','Gol! A nie, to dysk…','Oddamy, jak wygramy!','Ej, to nasza połowa!','Mój tata też tak rzuca!'];
const KS={d:null,say:null,who:0,until:0,landed:0};
function drawKids(h,t){const K=h.U.kids,sh=['#e5533c','#3b82f6','#f2c230'];const pos=K.map((p,i)=>[p[0]+Math.sin(t*1.3+i*2.1)*4,p[1]+Math.cos(t*1.1+i*1.7)*3]);
 if(disc&&disc!==KS.d){KS.d=disc;KS.landed=0;KS.say=KTHR[(Math.random()*KTHR.length)|0];KS.who=(Math.random()*3)|0;KS.until=t+2.6}
 if(!disc&&KS.d&&!KS.landed){KS.landed=1;const L=lie||{x:-999,y:-999};let near=-1,bd=1e9;pos.forEach((q,i)=>{const d=Math.hypot(q[0]-L.x,q[1]-L.y);if(d<bd){bd=d;near=i}});if(bd<45){KS.say=KNEAR[(Math.random()*KNEAR.length)|0];KS.who=near;KS.until=t+3}}
 const per=1.5,ph=t/per,i0=(ph|0)%3,i1=(i0+1)%3,f=ph%1,A=pos[i0],B=pos[i1],bx=A[0]+(B[0]-A[0])*f,by=A[1]+(B[1]-A[1])*f,bz=Math.sin(f*Math.PI)*5;
 g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(bx+1,by+1,1.6,1,0,0,7);g.fill();
 pos.forEach((q,i)=>{try{PERSON(q[0],q[1],{s:.5,shirt:sh[i],ph:i*1.9+t*.0,talk:KS.until>t&&KS.who==i})}catch(e){}});
 g.fillStyle='#fff';g.beginPath();g.arc(bx,by-bz,1.5,0,7);g.fill();g.fillStyle='#222';g.beginPath();g.arc(bx+.3,by-bz-.2,.55,0,7);g.fill();
 if(KS.say&&KS.until>t){const q=pos[KS.who],line=KS.say;g.save();g.font='800 5px system-ui';const w=g.measureText(line).width+6,x=q[0]-w/2,y=q[1]-26;g.fillStyle='rgba(255,255,255,.95)';g.beginPath();g.roundRect(x,y,w,9,3);g.fill();g.beginPath();g.moveTo(q[0]-2,y+9);g.lineTo(q[0],y+12);g.lineTo(q[0]+2,y+9);g.fill();g.fillStyle='#222';g.textAlign='center';g.textBaseline='middle';g.fillText(line,q[0],y+4.8);g.restore()}}
const _dwX=drawWorld;drawWorld=function(){_dwX.apply(this,arguments);try{const h=holes&&holes[hi];if(!h||!h.sw||!playing)return;const t=performance.now()/1000;g.save();worldT();
 for(const G of h.U.goals||[]){g.save();g.translate(G[0],G[1]);g.rotate(G[2]+Math.PI/2);g.fillStyle='rgba(0,0,0,.3)';g.fillRect(-1,2,3,9);g.fillStyle='#3a3f48';g.fillRect(-.8,-2,1.6,12);g.fillStyle='#f4f4f2';g.fillRect(-7,-3,14,2.2);g.strokeStyle='#d8382c';g.lineWidth=.5;g.strokeRect(-2.4,-3,4.8,2.2);g.strokeStyle='#e8701a';g.lineWidth=.8;g.beginPath();g.ellipse(0,-5.6,2.6,1.6,0,0,7);g.stroke();g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=.25;for(let k=-2;k<=2;k++){g.beginPath();g.moveTo(k*1.1,-5);g.lineTo(k*.6,-2.6);g.stroke()}g.restore()}
 for(const F of h.U.fire||[])drawFire(F[0],F[1],t);
 if(h.U.queue)drawQueue(h.U.queue,t);
 drawProps(h);
 if(h.U.kids)drawKids(h,t);
 if(h.U.scoot&&season!='winter')drawScoot(h,t);
 if(h.U.neptun)drawNeptun(h.U.neptun[0],h.U.neptun[1],t);
 g.restore()}catch(e){}};
/* ekran ładowania Street: tabliczka WRC Wągrowiec z własnym emblematem (bez Złotowa i DiscGolfPark) */
try{const _ldS=ldDraw;ldDraw=function(h){_ldS.apply(this,arguments);if(!h||!h.sw)return;try{const x=$('ldsign').getContext('2d');x.setTransform(1,0,0,1,0,0);
 x.fillStyle='#fbfcf6';x.fillRect(24,22,512,150);for(const[px,py]of[[34,34],[526,34]]){x.fillStyle='#c9ced2';x.beginPath();x.arc(px,py,7,0,7);x.fill();x.fillStyle='#8a9096';x.beginPath();x.arc(px,py,3,0,7);x.fill()}
 const cx=92,cy=96;x.save();x.translate(cx,cy);
 x.fillStyle='#1f3a5f';x.beginPath();x.arc(0,0,56,0,7);x.fill();x.strokeStyle='#f2c230';x.lineWidth=5;x.beginPath();x.arc(0,0,52,0,7);x.stroke();
 x.save();x.beginPath();x.arc(0,0,49,0,7);x.clip();
 const sky=x.createLinearGradient(0,-50,0,20);sky.addColorStop(0,'#ff9f43');sky.addColorStop(1,'#ffd35a');x.fillStyle=sky;x.fillRect(-50,-50,100,70);
 x.fillStyle='#2b2f3a';[[-48,-6,14,26],[-34,-18,12,38],[-22,-10,12,30],[-10,-28,8,48],[-2,-14,14,34],[12,-22,12,42],[24,-8,12,28],[36,-16,14,36]].forEach(r=>x.fillRect(r[0],r[1],r[2],r[3]));
 x.beginPath();x.moveTo(-10,-28);x.lineTo(-6,-40);x.lineTo(-2,-28);x.fill();
 x.fillStyle='#ffe08a';[[-31,-12],[-31,-4],[15,-16],[15,-8],[27,-2],[-19,-4],[39,-10]].forEach(p=>x.fillRect(p[0],p[1],3,4));
 x.fillStyle='#3c4250';x.fillRect(-50,20,100,30);x.fillStyle='#f4f4f2';for(let i=-46;i<50;i+=14)x.fillRect(i,33,8,3);
 x.restore();
 x.strokeStyle='#f2c230';x.lineWidth=3.5;x.lineCap='round';x.beginPath();x.moveTo(0,8);x.lineTo(0,40);x.stroke();
 x.fillStyle='#f2c230';x.beginPath();x.ellipse(0,8,17,5,0,0,7);x.fill();x.strokeStyle='#dfe4e8';x.lineWidth=1.6;for(let i=-12;i<=12;i+=6){x.beginPath();x.moveTo(i,9);x.lineTo(i*.6,24);x.stroke()}
 x.strokeStyle='#f2c230';x.lineWidth=3;x.beginPath();x.ellipse(0,25,11,3.5,0,0,7);x.stroke();
 x.restore();
 x.fillStyle='#222';x.textAlign='left';x.textBaseline='middle';let fs=50;x.font='800 '+fs+'px system-ui';while(x.measureText('WRC Wągrowiec').width>360&&fs>28){fs-=2;x.font='800 '+fs+'px system-ui'}x.fillText('WRC Wągrowiec',160,74);x.font='600 30px system-ui';x.fillStyle='#555';x.fillText('Street Disc Golf',160,126)}catch(e){console.warn('P196 ld',e)}}}catch(e){}
/* rowerzysta krzyczy, gdy dysk wyląduje na ścieżce rowerowej */
{let ld=null;const BTX=['Ej! To ścieżka rowerowa!','Prawie mnie trafiłeś!','Uwaga, jadę!','Talerze na ścieżce?!','Dzwonek nie pomoże na dyski!'];
 setInterval(()=>{try{const h=holes&&holes[hi];if(!h||!h.sw||!playing){ld=null;return}if(disc){ld={x:disc.x,y:disc.y};return}if(ld){const p=ld;ld=null;for(const r of h.U.roads||[])if(r.bike&&dpl([p.x,p.y],r.p)<r.w/2+1){const L=liveOf(h),t=performance.now()/1000;let best=null,bd=1e9;for(const b of L.bike)if(b.path===r){const q=walkPos(b,t),d=Math.hypot(q[0]-p.x,q[1]-p.y);if(d<bd){bd=d;best=q}}const q=best||[p.x,p.y];window.__say&&window.__say(q[0],q[1]-4,BTX[(Math.random()*BTX.length)|0]);break}}}catch(e){}},120)}
/* pociąg: trafienie odbija dysk */
const _stT=step;step=function(){const d=disc,h=holes&&holes[hi];if(d&&h&&h.sw&&h.U.rails&&!d.rol){const tr=trainRect(h,performance.now()/1000);if(tr){for(let s0=Math.max(0,tr.s);s0<tr.s+tr.len;s0+=6){const q=atL(tr.P,s0);if(Math.hypot(d.x-q[0],d.y-q[1])<7){d.a+=Math.PI*(.8+Math.random()*.4);d.v*=.45;pill('🚆 Pociąg!');break}}}}return _stT.apply(this,arguments)};

/* ---------- wpięcie w grę ---------- */
try{if(layout=='street')layout='wrc'}catch(e){}
const _st=start;start=function(){if(layout=='street')layout='wrc';if(layout=='wrc')holes=SW;return _st.apply(this,arguments)};
const okSW=()=>{try{return localStorage.getItem('dg_swok')==='1'}catch(e){return false}};
const card={k:'wrc',n:'WRC Street',d:'🏙️ Wągrowiec · pole miejskie · '+SW.length+' dołków',hl:()=>SW,bp:'50% 50%'};
if(!CARDS.some(c=>c.k=='wrc'))CARDS.push(card);
try{CN2.wrc=['WRC Street',()=>SW,'dg_topwrc']}catch(e){}
try{const st=document.createElement('style');st.textContent='#stabs{display:flex!important;flex-wrap:wrap!important;overflow:visible!important;gap:6px!important}#stabs>button{flex:1 1 30%!important;min-width:0!important;max-width:none!important}';document.head.appendChild(st)}catch(e){}
try{renderCards()}catch(e){}
/* ranking Street: Top 5 na telefonie w osobnym kluczu (dg_topsw), online w kolekcji sc_wrc */
try{const SP=Storage.prototype,_gi=SP.getItem,_si=SP.setItem,_ri=SP.removeItem,mp=k=>(k==='dg_topz'&&typeof layout!='undefined'&&layout=='wrc')?'dg_topwrc':k;SP.getItem=function(k){return _gi.call(this,mp(k))};SP.setItem=function(k,v){return _si.call(this,mp(k),v)};SP.removeItem=function(k){return _ri.call(this,mp(k))}}catch(e){}
/* ściana zamiast drzewa */
try{const _pl=pill;pill=function(m){try{const h=holes&&holes[hi];if(h&&h.sw&&m==='🌲 Drzewo!'&&disc){let bt=null,bd=1e9;for(const t of h._col||[]){const d=Math.hypot(disc.x-t[0],disc.y-t[1])-t[2];if(d<bd){bd=d;bt=t}}if(bt&&bt.nep)m='🔱 Neptun!';else if(bt&&bt.lamp)m='💡 Latarnia!';else if(bt&&bt.umb)m='⛱️ Parasol!';else if(bt&&bt.w)m='🧱 Ściana!'}}catch(e){}return _pl.apply(this,[m].concat([].slice.call(arguments,1)))}}catch(e){}
/* kolizje ze ścianami dokładane po zbudowaniu tła; jesienne kałuże tylko poza miastem */
const _b3=build3;build3=function(h,wn){let r;if(h&&h.U&&h.U.lake){const RV=h.rivers;h.rivers=[];try{r=_b3.apply(this,arguments)}finally{h.rivers=RV}}else r=_b3.apply(this,arguments);try{if(h&&h.sw){h._col=(h._col||[]).filter(t=>!t.w).concat(urbCol(h));
 const L=(h.U.labels||[]).concat((h.U.bld||[]).filter(B=>B.lbl).map(B=>Object.assign({x:B.c[0],y:B.c[1]-B.h*.42/RS*.6},B.lbl)));if(L.length&&r&&r.getContext){const x=r.getContext('2d');x.save();x.scale(RS,RS);for(const o of L){x.font='900 '+(o.s||7)+'px system-ui';const w=x.measureText(o.t).width+8,hh=(o.s||7)+5;x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.roundRect(o.x-w/2+1,o.y-hh/2+1.5,w,hh,2.5);x.fill();x.fillStyle=o.bg||'#b0262b';x.beginPath();x.roundRect(o.x-w/2,o.y-hh/2,w,hh,2.5);x.fill();x.fillStyle=o.c||'#ffe27a';x.textAlign='center';x.textBaseline='middle';x.fillText(o.t,o.x,o.y+.5)}x.restore()}}}catch(e){console.warn('P196 lbl',e)}return r};
try{const _w3s=water3;water3=function(h,wn){if(h&&h.U&&h.U.lake){const RV=h.rivers;h.rivers=[];try{return _w3s.apply(this,arguments)}finally{h.rivers=RV}}return _w3s.apply(this,arguments)}}catch(e){}
/* OB w locie (np. podwórka na 2 – nie da się obejść budynków bokiem) */
const _stF=step;step=function(){const d=disc,h=holes&&holes[hi];if(d&&h&&h.sw&&h.U.flyOB&&!d.rol&&!d.tom&&d.trail&&d.trail.length>2){for(const P of h.U.flyOB)if(inPoly(d.x,d.y,P)){const T=d.trail;for(let i=T.length-1;i>=0;i--)if(!inPoly(T[i][0],T[i][1],P)){lie={x:T[i][0],y:T[i][1]};break}return stop('🚫 OB!','+1 kara · rzut z miejsca wylotu','#c0392b')}}return _stF.apply(this,arguments)};
try{const _pz=puddles;puddles=function(h){if(h&&h.sw)return h._pud=[];return _pz.apply(this,arguments)}}catch(e){}
}catch(e){console.warn('P196',e)}})();
</script>
