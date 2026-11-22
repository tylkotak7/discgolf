import sys
f=sys.argv[1];s=open(f,encoding='utf8').read()
a="md:[md([214,452],[390,452],null),md([150,224],[-30,224],[176,262])],t:[[214,452,11,0],[150,224,11,0],[170,360,7,6],[205,300,6,0],[160,300,6,2],[196,170,7,6]],\n   txt:'podwójne mando: pierwsze drzewo omiń z lewej, drugie z prawej · wysoka trawa na fairwayu',\n   art:(h,x,w)=>{grassArt(x,w,175,330,40,40,51);grassArt(x,w,205,250,26,20,52);grassArt(x,w,160,170,22,16,53)}},"
assert s.count(a)==1
RD="[[20,650],[72,567],[121,490],[152,440],[191,404],[217,383],[256,352],[295,331],[316,320],[400,280]]"
b=("md:[md([214,452],[390,452],null),md([150,224],[-30,224],[176,262])],t:[[214,452,11,0],[150,224,11,0],[170,360,7,6],[160,300,6,2],[196,170,7,6]],\n"
 "   roads:[{pts:"+RD+",w:8}],\n"
 "   txt:'podwójne mando: pierwsze drzewo omiń z lewej, drugie z prawej · przez dołek przechodzi droga · po lewej kosz i kłoda z innego dołka',\n"
 "   o:h=>{const RP="+RD+",near=(p,P)=>{let m=1e9;for(let i=1;i<P.length;i++)m=Math.min(m,dseg(p,P[i-1],P[i]));return m};h.trees=h.trees.filter(t=>near(t,RP)>6+t[2]*.9&&Math.hypot(t[0]-58,t[1]-432)>t[2]+16&&dseg(t,[110,328],[103,372])>t[2]+5&&Math.hypot(t[0]-46,t[1]-100)>t[2]+14&&(()=>{const d=dseg(t,[46,112],[58,418]),q=((t[0]*73.1+t[1]*31.7)%1+1)%1;return d>16+t[2]*.4&&(d>30||q<.45)})());h.deco.push({k:'bkx',x:58,y:432});const oN=h.noF;h.noF=(x,y,r)=>{if(oN&&oN(x,y,r))return true;const d=dseg([x,y],[46,112],[58,418]),q=((x*73.1+y*31.7)%1+1)%1;return d<18+r*.5||(d<32&&q>.4)||dseg([x,y],[110,328],[103,372])<r+6||Math.hypot(x-46,y-100)<r+16}},\n"
 "   art:(h,x,w)=>{grassArt(x,w,175,330,40,40,51);grassArt(x,w,205,250,26,20,52);grassArt(x,w,160,170,22,16,53);logArt(x,w,[110,328],[103,372]);oldTee(x,w,46,100,[40,0])}},")
s=s.replace(a,b)
open(f,'w',encoding='utf8').write(s);print('g6 ok')
