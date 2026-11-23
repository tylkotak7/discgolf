import sys
f=sys.argv[1];s=open(f,encoding='utf8').read()
a="function house(x,X,Y,w,h,win){"
assert s.count(a)==1
s=s.replace(a,a+"if(window.__mzHouse)try{return window.__mzHouse(x,X,Y,w,h,win)}catch(e){}")
open(f,'w',encoding='utf8').write(s);print('g16 ok')
