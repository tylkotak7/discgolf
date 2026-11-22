import sys
f=sys.argv[1];s=open(f,encoding='utf8').read()
R=[
("if(h.urb)try{h.urb({HT,AR,AG,AB,SPEC,SIDE,TW,TH,S,setA,blendA,rectFn,wn,WAm})}catch(e){console.warn('urb',e)}",
 "if(h.urb)try{h.urb({HT,AR,AG,AB,SPEC,SIDE,TW,TH,S,setA,blendA,rectFn,wn,WAm})}catch(e){console.warn('urb',e)}\n"
 "/* P204: źdźbła trawy */\nif(!wn&&window.__G2!==false){const R=rnd(sd0*13+7),cnt=(N*.6)|0;for(let n=0;n<cnt;n++){const x0=(R()*TW)|0,y0=(R()*TH)|0,i0=y0*TW+x0,r0=AR[i0],g0=AG[i0],b0=AB[i0];if(!(g0>r0*1.1&&g0>b0*1.45&&HT[i0]<5))continue;if(RDm[i0]>.05||WAm[i0]>.05)continue;const mow=FWm[i0]>.4;if(mow&&R()<.75)continue;const me=MEm[i0]>.3,L=mow?1.3+R()*1.4:me?3+R()*4:2+R()*2.8,a=-1.5708+(R()-.5)*.8+.25,ca=Math.cos(a),sa=Math.sin(a),c=R(),dry=c>.95,tp=.02+c*.03,h0=HT[i0];"
 "for(let t=0;t<=1.001;t+=1/L){const px=Math.round(x0+ca*L*t),py=Math.round(y0+sa*L*t);if(px<0||py<0||px>=TW||py>=TH)break;const j=py*TW+px;if(RDm[j]>.1||WAm[j]>.1)break;if(!(AG[j]>AR[j]*1.04&&AG[j]>AB[j]*1.3))continue;const s=(mow?.9:.82)+t*.26;let nr=r0*s+tp*t*.3,ng=g0*s+tp*t,nb=b0*(.88+t*.12);if(dry&&t>.4){nr+=.08;ng+=.05;nb+=.02}AR[j]=nr;AG[j]=ng;AB[j]=nb;HT[j]=Math.max(HT[j],h0+t*(mow?0:me?1.4:.8))}}}"),
("if(TREEM[i]&&!wn){const tl=lam*SHb[i];",
 "if(window.__G2!==false&&!TREEM[i]){const sq=1-SHb[i]*Math.min(1,lam*1.3);r*=1-sq*.07;gg*=1-sq*.015;b*=1+sq*.12}if(TREEM[i]&&!wn){const tl=lam*SHb[i];"),
("for(let i=0;i<N;i++){for(let k=0;k<3;k++){let v=O[i*3+k];",
 "if(window.__G2!==false)for(let i=0;i<N;i++){let r=O[i*3],g2=O[i*3+1],b=O[i*3+2];const l=r*.3+g2*.59+b*.11,sat=wn?1.03:1.1;r=l+(r-l)*sat;g2=l+(g2-l)*sat;b=l+(b-l)*sat;const sh=Math.max(0,.34-l)*1.5,hi=Math.max(0,l-.55);r+=-sh*.015+hi*.05;g2+=sh*.004+hi*.02;b+=sh*.025-hi*.05;O[i*3]=Math.max(0,r);O[i*3+1]=Math.max(0,g2);O[i*3+2]=Math.max(0,b)}\n"
 "for(let i=0;i<N;i++){for(let k=0;k<3;k++){let v=O[i*3+k];"),
("g.fillStyle='rgba(255,140,30,.75)';g.fillRect(0,0,W,H);g.globalCompositeOperation='source-over';",
 "g.fillStyle=window.__G2!==false?'rgba(255,145,45,.64)':'rgba(255,140,30,.75)';g.fillRect(0,0,W,H);g.globalCompositeOperation='source-over';"),
]
for a,b in R:
  assert s.count(a)==1,a[:60]
  s=s.replace(a,b)
open(f,'w',encoding='utf8').write(s);print('g2 ok')
