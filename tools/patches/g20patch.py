import sys
f=sys.argv[1];s=open(f,encoding='utf8').read()
a="const t=treeAt(x,y),wn=season=='winter',au=season=='autumn',c=t&&conif(t);const cx=t?t[0]:x"
assert s.count(a)==1
s=s.replace(a,"if(window.__nearBld&&window.__nearBld(x,y))return;"+a)
a="burst=function(x,y,k){if(k=='leaf'){treeHit(x,y);"
assert s.count(a)==1
s=s.replace(a,"burst=function(x,y,k){if(k=='leaf'&&window.__nearBld&&window.__nearBld(x,y))return;if(k=='leaf'){treeHit(x,y);")
open(f,'w',encoding='utf8').write(s);print('g20 ok')
