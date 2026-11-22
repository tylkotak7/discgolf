import sys
f=sys.argv[1];s=open(f,encoding='utf8').read()
R=[
("cwf:()=>10},0)},5);","cwf:()=>window.__G5!==false?15:10},0)},5);"),
("const wr=WRm[i]*fw;if(wr>0){const k=wr*.3*(.6+fb3(x*.05,y*.05,51,3)*.8);r+=(.40-r)*k;gg+=(.42-gg)*k;b+=(.20-b)*k}",
 "const wr=WRm[i]*fw;if(wr>0){const k=wr*(window.__G5!==false?.5:.3)*(.6+fb3(x*.05,y*.05,51,3)*.8);r+=(.42-r)*k;gg+=(.42-gg)*k;b+=(.22-b)*k}"),
("/* P204: źdźbła trawy */",
 "/* P207: wydeptane miejsca przy koszu i przed tee */\nif(window.__G5!==false&&!h.urb){const MM=h.M||.2,u=S/MM,bx=h.b[0]*S,by=h.b[1]*S,tx=h.tee[0]*S,ty=h.tee[1]*S,an=Math.atan2(bx-tx,-(by-ty)),fx=Math.sin(an),fy=-Math.cos(an);"
 "const W1=(i,x,y,k)=>{if(k<=0||RDm[i]>.1||WAm[i]>.1)return;k=Math.min(.85,k);if(wn){blendA(i,.8,.83,.9,k*.45);HT[i]*=1-k*.6}else{const n=hs3(x,y,61)*.07;blendA(i,.42+n,.38+n,.22+n*.5,k*.7);HT[i]*=1-k*.7}};"
 "{const R=9.5*u;rectFn(bx-R,by-R,bx+R,by+R,(i,x,y)=>{const d=Math.hypot(x-bx,y-by)/u;if(d>9.5)return;const ring=d<1.4?0:Math.min(1,(d-1.4)/1.6)*Math.max(0,1-(d-3.5)/6);W1(i,x,y,ring*(.3+.75*fb3(x*.06,y*.06,62,3))-.12)})}"
 "{const L=8.5*u;rectFn(tx-L,ty-L,tx+L,ty+L,(i,x,y)=>{const rx=x-tx,ry=y-ty,a=rx*fx+ry*fy,b=Math.abs(rx*fy-ry*fx);if(a<-1.5*u||a>7.5*u)return;const k=(1-Math.max(0,a)/(7.5*u))*Math.max(0,1-b/(2.4*u))*(.45+.7*fb3(x*.07,y*.07,63,3));W1(i,x,y,k-.05)})}}\n"
 "/* P204: źdźbła trawy */"),
("for(let i=0;i<N;i++){for(let k=0;k<3;k++){let v=O[i*3+k];",
 "if(window.__G5!==false){const Lm=new Float32Array(N);for(let i=0;i<N;i++)Lm[i]=O[i*3]*.3+O[i*3+1]*.59+O[i*3+2]*.11;const Bm=bl3(Lm,1);for(let i=0;i<N;i++){const dd=(Lm[i]-Bm[i])*.75;O[i*3]=Math.max(0,O[i*3]+dd);O[i*3+1]=Math.max(0,O[i*3+1]+dd);O[i*3+2]=Math.max(0,O[i*3+2]+dd)}}\n"
 "for(let i=0;i<N;i++){for(let k=0;k<3;k++){let v=O[i*3+k];"),
("x2.putImageData(id,0,0);h._sil={m:SILM,tw:TW,th:TH,s:S,tl:TL};",
 "x2.putImageData(id,0,0);h._sil={m:SILM,tw:TW,th:TH,s:S,tl:TL};if(window.__G5!==false&&!wn&&!h.urb){try{const q=4,mw=TW/q|0,mh=TH/q|0,mc=document.createElement('canvas');mc.width=mw;mc.height=mh;const mx=mc.getContext('2d'),md=mx.createImageData(mw,mh);for(let y=0;y<mh;y++)for(let x=0;x<mw;x++){const i=(y*q)*TW+x*q,j=(y*mw+x)*4,r=d[i*4],gg=d[i*4+1],b=d[i*4+2];md.data[j+3]=(!SILM[i]&&!TREEM[i]&&gg>r*1.1&&gg>b*1.3&&HT[i]<6)?255:0}mx.putImageData(md,0,0);c._gm=mc}catch(e){}}"),
("g.drawImage(bg,0,0,W,H);water3(h,wn);",
 "g.imageSmoothingQuality='high';g.drawImage(bg,0,0,W,H);try{window.__gw&&window.__gw(h,bg)}catch(e){}water3(h,wn);"),
]
for a,b in R:
  assert s.count(a)==1,(a[:70],s.count(a))
  s=s.replace(a,b)
open(f,'w',encoding='utf8').write(s);print('g5 ok')
