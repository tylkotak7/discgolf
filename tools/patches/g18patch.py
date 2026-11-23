import sys
f=sys.argv[1];s=open(f,encoding='utf8').read()
a="if(ci<0){setA(i,.11,.08,.05);return}const c=pal[ci%pal.length],lv=fb3(x*.25,y*.25,sd+5,2)-.5,v=(1+hue*.45+lv*.3)*(1-dark);setA(i,c[0]*v*TWr,c[1]*v*TWg,c[2]*v*(1+lv*.2)*TWb)})}"
assert s.count(a)==1
b="if(ci<0){setA(i,.11,.08,.05);return}const c=pal[ci%pal.length],lv=fb3(x*.25,y*.25,sd+5,2)-.5,v=(1+hue*.45+lv*.3)*(1-dark);let cr=c[0]*v*TWr,cg=c[1]*v*TWg,cb=c[2]*v*(1+lv*.2)*TWb;"\
  "const TS=window.__TS;if(TS&&!wn){const cl=TS.cell(ty,t[2]);if(cl>=0){const col=cl%3,row=((cl/3)|0)+(AUT3?2:0),u=Math.round(col*128+64+dx/R0*60),w2=Math.round(row*128+64+dy/R0*60);if(u>=col*128&&u<col*128+128&&w2>=row*128&&w2<row*128+128){const o=(w2*384+u)*4,al=TS.d[o+3]/255;if(al>.25){const kk=TS.k[row*3+col]*(1-dark*.85)*(1+hue*.3+lv*.12),m=.78*al;cr=cr*(1-m)+TS.d[o]/255*kk*m;cg=cg*(1-m)+TS.d[o+1]/255*kk*m;cb=cb*(1-m)+TS.d[o+2]/255*kk*m}}}}"\
  "setA(i,cr,cg,cb)})}"
s=s.replace(a,b)
open(f,'w',encoding='utf8').write(s);print('g18 ok')
