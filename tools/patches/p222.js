<script>/* P222: domy jednorodzinne na Międzybłociu 2 w stylu WRC Street – trawnik z fakturą, żywopłoty, podjazd z kostki, dach z dachówką/blachą, cienie, ogrody */
(function(){try{
 const PC={};const pat=(k,base)=>{const key=k+base.join();if(PC[key])return PC[key];const T=window.__TX&&window.__TX[k];if(!T)return null;const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d'),im=x.createImageData(256,256);
  for(let i=0;i<65536;i++){im.data[i*4]=Math.min(255,base[0]*T.R[i*3]);im.data[i*4+1]=Math.min(255,base[1]*T.R[i*3+1]);im.data[i*4+2]=Math.min(255,base[2]*T.R[i*3+2]);im.data[i*4+3]=255}x.putImageData(im,0,0);return PC[key]=c};
 const hex=c=>[parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)];
 function fillP(x,k,base,fallback,sc){const c=pat(k,base);if(!c){x.fillStyle=fallback;return}const p=x.createPattern(c,'repeat');try{const t=x.getTransform();p.setTransform(new DOMMatrix().scale((sc||1)/t.a))}catch(e){}x.fillStyle=p}
 function hedge(x,x0,y0,x1,y1,w){const L=Math.hypot(x1-x0,y1-y0),n=Math.max(2,L/2.6|0);for(let i=0;i<=n;i++){const t=i/n,px=x0+(x1-x0)*t,py=y0+(y1-y0)*t,r=1.5+((i*7)%3)*.3;x.fillStyle='rgba(0,0,0,.22)';x.beginPath();x.arc(px+.9,py+1.1,r,0,7);x.fill()}
  for(let i=0;i<=n;i++){const t=i/n,px=x0+(x1-x0)*t,py=y0+(y1-y0)*t,r=1.5+((i*7)%3)*.3;x.fillStyle=w?'#e4eaee':(i%3?'#2f6a26':'#3b7a2e');x.beginPath();x.arc(px,py,r,0,7);x.fill();if(!w){x.fillStyle='rgba(170,220,120,.35)';x.beginPath();x.arc(px-.5,py-.6,r*.45,0,7);x.fill()}}}
 function car(x,cx,cy,col){x.save();x.translate(cx,cy);x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.roundRect(-3.6+1,-7.2+1.4,7.2,14.4,2);x.fill();x.fillStyle=col;x.beginPath();x.roundRect(-3.6,-7.2,7.2,14.4,2);x.fill();x.fillStyle='rgba(15,22,32,.85)';x.fillRect(-3,-4,6,2.4);x.fillRect(-3,2.4,6,2);x.fillStyle='rgba(255,255,255,.25)';x.fillRect(-2.6,-1.4,1.2,3.4);x.restore()}
 window.__mzHouses=function(x,w,rx,HS,h){x.save();
  /* trawnik: cały pas za drogą */
  if(w){x.fillStyle='#e9eef0'}else fillP(x,'fair',[96,134,62],'#6f9c4c',.55);x.fillRect(-6,-6,rx+6,H+12);
  for(let i=0;i<HS.length;i++){const[hx,hy,rc]=HS[i],hw=rx-hx-8,hh=34,LX=hx-4,LY=hy-14,LW=rx-hx+2,LH=hh+40;
   /* działka: przystrzyżony trawnik w pasy */
   if(w){x.fillStyle='#f2f5f7'}else fillP(x,'fair',[112,158,72],'#7fae58',.45);x.fillRect(LX,LY,LW,LH);
   if(!w){x.fillStyle='rgba(255,255,255,.07)';for(let k=0;k<LW;k+=5)if((k/6|0)%2)x.fillRect(LX+k,LY,3,LH)}
   /* podjazd z kostki do drogi */
   const dY=hy+hh*.42,dH=9;if(w)x.fillStyle='#dde3e7';else fillP(x,'slab',[168,164,156],'#c9c1ad',.5);x.fillRect(hx+hw-2,dY,rx-hx-hw+3,dH);x.strokeStyle='rgba(0,0,0,.18)';x.lineWidth=.5;x.strokeRect(hx+hw-2,dY,rx-hx-hw+3,dH);
   /* taras z desek za domem i ścieżka */
   if(!w){x.fillStyle='#9a7048';x.fillRect(hx+2,hy+hh+3,hw*.55,7);x.strokeStyle='rgba(60,35,15,.45)';x.lineWidth=.4;for(let k=hx+2;k<hx+2+hw*.55;k+=1.6){x.beginPath();x.moveTo(k,hy+hh+3);x.lineTo(k,hy+hh+10);x.stroke()}
    x.fillStyle='rgba(230,225,210,.9)';for(let k=0;k<4;k++)x.fillRect(hx+hw*.55+4+k*2.4,hy+hh+5+(k%2),1.8,1.8)}
   /* żywopłot dookoła działki */
   hedge(x,LX,LY,LX+LW,LY,w);hedge(x,LX,LY+LH,LX+LW,LY+LH,w);hedge(x,LX,LY,LX,LY+LH,w);
   /* cień domu (słońce z południowego zachodu, jak na Street) */
   const ov=3,X0=hx-ov,Y0=hy-ov,RW=hw+ov*2,RH=hh+ov*2,mid=X0+RW/2;
   x.fillStyle='rgba(10,25,10,.32)';x.beginPath();x.moveTo(X0+RW,Y0+3);x.lineTo(X0+RW+7,Y0-2);x.lineTo(X0+RW+7,Y0+RH-6);x.lineTo(X0+RW,Y0+RH);x.closePath();x.fill();x.beginPath();x.moveTo(X0,Y0);x.lineTo(X0+5,Y0-5);x.lineTo(X0+RW+7,Y0-5);x.lineTo(X0+RW,Y0);x.closePath();x.fill();
   /* ściana frontowa (widoczna krawędź elewacji od południa) */
   x.fillStyle=w?'#d6dade':['#efe6d2','#e8e2d6','#f1ebe0','#e4d6bd','#ece4d8'][i%5];x.fillRect(X0+1,Y0+RH-1,RW-2,3.2);x.fillStyle='rgba(60,70,90,.7)';for(let k=X0+4;k<X0+RW-4;k+=7)x.fillRect(k,Y0+RH,2.6,1.6);
   /* dach dwuspadowy z fakturą dachówki / blachy */
   const red=rc=='#a5432f'||rc=='#7a5a3a'||rc=='#6b4a3a',b0=hex(rc);
   if(w){x.fillStyle='#f6f9fb';x.fillRect(X0,Y0,RW/2,RH);x.fillStyle='#dfe7ec';x.fillRect(mid,Y0,RW/2,RH)}
   else{fillP(x,red?'roofr':'roofg',b0.map(v=>v*1.12),rc,.28);x.fillRect(X0,Y0,RW/2,RH);fillP(x,red?'roofr':'roofg',b0.map(v=>v*.74),rc,.28);x.fillRect(mid,Y0,RW/2,RH)}
   x.fillStyle=w?'#c8d2d8':'rgba(30,12,6,.7)';x.fillRect(mid-.9,Y0,1.8,RH);x.strokeStyle=w?'#c5ced4':'rgba(30,12,6,.5)';x.lineWidth=.9;x.strokeRect(X0+.45,Y0+.45,RW-.9,RH-.9);
   /* panele słoneczne na niebieskim dachu, okno dachowe na pozostałych */
   if(!w&&rc=='#3f5f7a'){x.fillStyle='#1d2c44';for(let r=0;r<3;r++)for(let c=0;c<2;c++){x.fillRect(X0+2.5+c*6.4,Y0+4+r*9,5.6,8);x.strokeStyle='rgba(160,190,230,.5)';x.lineWidth=.3;x.strokeRect(X0+2.5+c*6.4,Y0+4+r*9,5.6,8)}}
   else if(!w){x.fillStyle='#e9eef2';x.fillRect(X0+RW*.14,Y0+RH*.55,5,4);x.fillStyle='#7aa4c4';x.fillRect(X0+RW*.14+.8,Y0+RH*.55+.8,3.4,2.4)}
   /* komin */
   const cx=mid+RW*.16,cy=Y0+RH*.2;x.fillStyle='rgba(0,0,0,.3)';x.fillRect(cx+2,cy+1.6,5,6);x.fillStyle=w?'#eef2f4':'#8d5a44';x.fillRect(cx,cy,5,6);x.fillStyle='#3a2a22';x.fillRect(cx+1,cy+1,3,2);
   /* auto na podjeździe (co drugi dom) */
   /* rabata z kwiatami przy żywopłocie */
   if(!w){const fy=LY+LH-4;for(let k=0;k<7;k++){x.fillStyle=k%2?'#3d7a2a':'#4c8c34';x.beginPath();x.arc(LX+5+k*4.2,fy,2,0,7);x.fill();x.fillStyle=['#e85a8a','#f2d14a','#ffffff','#b06ad8'][k%4];x.fillRect(LX+4.4+k*4.2,fy-1,1.4,1.4)}}
   /* trampolina albo domek narzędziowy */
   if(!w&&i==1){x.fillStyle='rgba(0,0,0,.25)';x.beginPath();x.arc(LX+LW*.6+1,LY+7,5.5,0,7);x.fill();x.fillStyle='#2a6fd0';x.beginPath();x.arc(LX+LW*.6,LY+6,5.5,0,7);x.fill();x.fillStyle='#1c1c1c';x.beginPath();x.arc(LX+LW*.6,LY+6,4.3,0,7);x.fill()}
   if(!w&&i==3){x.fillStyle='rgba(0,0,0,.28)';x.fillRect(LX+LW*.62+1.5,LY+3.5,8,7);x.fillStyle='#7a5530';x.fillRect(LX+LW*.62,LY+2,8,7);x.fillStyle='#5a3c20';x.fillRect(LX+LW*.62+4,LY+2,.8,7)}}
  x.restore()};

 /* pojedynczy dom (Międzybłocie 14 i inne) w tym samym stylu */
 window.__mzHouse=function(x,X,Y,w,h,win){x.save();const ov=3,X0=X-ov,Y0=Y-ov,RW=w+ov*2,RH=h+ov*2,mid=X0+RW/2;
  if(win)x.fillStyle='#eef2f4';else fillP(x,'fair',[112,158,72],'#7fae58',.45);x.beginPath();x.roundRect(X-8,Y-7,w+16,h+20,4);x.fill();
  if(!win){x.fillStyle='rgba(255,255,255,.07)';for(let k=0;k<w+16;k+=5)if((k/5|0)%2)x.fillRect(X-8+k,Y-7,3,h+20)}
  x.fillStyle='rgba(10,25,10,.32)';x.beginPath();x.moveTo(X0+RW,Y0+3);x.lineTo(X0+RW+7,Y0-2);x.lineTo(X0+RW+7,Y0+RH-6);x.lineTo(X0+RW,Y0+RH);x.closePath();x.fill();x.beginPath();x.moveTo(X0,Y0);x.lineTo(X0+5,Y0-5);x.lineTo(X0+RW+7,Y0-5);x.lineTo(X0+RW,Y0);x.closePath();x.fill();
  x.fillStyle=win?'#d6dade':'#efe6d2';x.fillRect(X0+1,Y0+RH-1,RW-2,3.2);x.fillStyle='rgba(60,70,90,.7)';for(let k=X0+4;k<X0+RW-4;k+=7)x.fillRect(k,Y0+RH,2.6,1.6);
  if(win){x.fillStyle='#f6f9fb';x.fillRect(X0,Y0,RW/2,RH);x.fillStyle='#dfe7ec';x.fillRect(mid,Y0,RW/2,RH)}
  else{fillP(x,'roofr',[207,93,65],'#b9533a',.28);x.fillRect(X0,Y0,RW/2,RH);fillP(x,'roofr',[137,62,43],'#8e3a27',.28);x.fillRect(mid,Y0,RW/2,RH)}
  x.fillStyle=win?'#c8d2d8':'rgba(30,12,6,.7)';x.fillRect(mid-.9,Y0,1.8,RH);x.strokeStyle=win?'#c5ced4':'rgba(30,12,6,.5)';x.lineWidth=.9;x.strokeRect(X0+.45,Y0+.45,RW-.9,RH-.9);
  if(!win){x.fillStyle='#e9eef2';x.fillRect(X0+RW*.14,Y0+RH*.5,5,4);x.fillStyle='#7aa4c4';x.fillRect(X0+RW*.14+.8,Y0+RH*.5+.8,3.4,2.4)}
  const cx=mid+RW*.18,cy=Y0+RH*.22;x.fillStyle='rgba(0,0,0,.3)';x.fillRect(cx+2,cy+1.6,5,6);x.fillStyle=win?'#eef2f4':'#8d5a44';x.fillRect(cx,cy,5,6);x.fillStyle='#3a2a22';x.fillRect(cx+1,cy+1,3,2);
  if(!win){fillP(x,'slab',[168,164,156],'#cfc6b4',.5);x.fillRect(X+w*.2,Y+h+ov+2,5,9);x.fillStyle='#9a7048';x.fillRect(X+w*.55,Y+h+ov+2.5,w*.35,6);x.strokeStyle='rgba(60,35,15,.45)';x.lineWidth=.4;for(let k=X+w*.55;k<X+w*.9;k+=1.6){x.beginPath();x.moveTo(k,Y+h+ov+2.5);x.lineTo(k,Y+h+ov+8.5);x.stroke()}}
  x.restore()};
}catch(e){console.warn('P222',e)}})();
</script>
