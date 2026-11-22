import sys
f=sys.argv[1];s=open(f,encoding='utf8').read()
R=[
("const TID=new Int16Array(N),TL=[];let TI=0;for(const t of srt){TI++;const TIc=TI;{const dm0=treeDims(t);TL[TIc]=[t[0],t[1]-(dm0.base+dm0.top)/2*RK/S,t[2],t]}",
 "const TID=new Int16Array(N),TL=[];let TI=0;const G3=window.__G3!==false,NT=srt.length+2,TBa=G3?new Float32Array(NT):null,TCXa=G3?new Float32Array(NT):null,TCYa=G3?new Float32Array(NT):null,TTWa=G3?new Float32Array(NT):null,TTYa=G3?new Uint8Array(NT):null,G0=G3?[AR.slice(),AG.slice(),AB.slice()]:null;"
 "for(const t of srt){TI++;const TIc=TI;{const dm0=treeDims(t);TL[TIc]=[t[0],t[1]-(dm0.base+dm0.top)/2*RK/S,t[2],t];if(G3){const ty0=dm0.ty,q={willow:.32,spruce:.42,fir:.4,larch:.5,poplar:.62,pine:.97,birch:.9,oak:.84,maple:.84}[ty0]||.84;TBa[TIc]=dm0.base*q;TCXa[TIc]=t[0]*S;TCYa[TIc]=t[1]*S;TTWa[TIc]=Math.max(1.6,dm0.R0*(ty0=='pine'||ty0=='birch'?.075:ty0=='oak'||ty0=='maple'?.1:.085));TTYa[TIc]=ty0=='birch'?1:ty0=='pine'?2:0}}"),
("if(side){if(TREEM[i]){const f=(yy-sy)/(hh*RK+1);dk=(.7+.42*vn3(x*.38,yy*.3,88)+.12*hs3(x,yy,89))*(1-f*.42)}",
 "if(side){if(TREEM[i]){const f=(yy-sy)/(hh*RK+1);"
 "if(G3){const id=TID[i],z=(y-yy)/RK,bot=Math.min(hh*.8,TBa[id]*(.8+.32*vn3(x*.23,yy*.07,id*3.1)));"
 "if(z<bot){const zt=(TCYa[id]-yy)/RK,tw=TTWa[id],dx=x-TCXa[id];if(Math.abs(dx)<=tw){const u=(dx+tw)/(2*tw),lit=wn?.8:.62,sh=(1.15-u*.75)*lit*(.55+.45*Math.min(1,(bot-z)/(bot*.6+1)));let br,bg,bb;if(TTYa[id]==1){const mk=hs3(x,(yy*.6)|0,id)>.8||hs3(x>>1,(yy*.35)|0,id+9)>.9;br=mk?.12:.86;bg=mk?.11:.84;bb=mk?.1:.8}else if(TTYa[id]==2){const n=hs3(x,yy>>1,id);br=.46+n*.08;bg=.3+n*.05;bb=.2}else{const n=hs3(x,yy>>1,id)*.08+vn3(x*.6,yy*.15,id)*.06;br=.26+n;bg=.2+n*.8;bb=.15+n*.5}O[o]=br*sh;O[o+1]=bg*sh;O[o+2]=bb*sh*1.04;SILM[yy*TW+x]=0;continue}"
 "const gi=yy*TW+x,amb=wn?.6:.5,fade=Math.min(1,(bot-z)/6);O[o]=G0[0][gi]*amb*.92;O[o+1]=G0[1][gi]*amb;O[o+2]=G0[2][gi]*amb*1.12+.012;if(fade<1){const k=1-fade,cr2=COL[j]*.55,cg2=COL[j+1]*.55,cb2=COL[j+2]*.55;O[o]+=(cr2-O[o])*k;O[o+1]+=(cg2-O[o+1])*k;O[o+2]+=(cb2-O[o+2])*k}SILM[yy*TW+x]=0;continue}"
 "dk=(.62+.5*vn3(x*.55,yy*.5,88)+.2*hs3(x,yy,89))*(1-f*.3)*(z<bot+5?.7+.3*(z-bot)/5:1)}else dk=(.7+.42*vn3(x*.38,yy*.3,88)+.12*hs3(x,yy,89))*(1-f*.42)}"),
]
for a,b in R:
  assert s.count(a)==1,a[:70]
  s=s.replace(a,b)
open(f,'w',encoding='utf8').write(s);print('g3 ok')
