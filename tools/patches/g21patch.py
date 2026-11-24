import sys
f=sys.argv[1];s=open(f,encoding='utf8').read()
a="else if(mode=='wave'){const w=Math.sin(t*6+ph)*1.6;"
assert s.count(a)==1
s=s.replace(a,"else if(mode=='bar'){E=[side*7.2,shY+4.2];Hd=[side*5.6,shY+7.6]}"+a)
open(f,'w',encoding='utf8').write(s);print('g21 ok')
