import sys
f=sys.argv[1];s=open(f,encoding='utf8').read()
a="drivery Posejdon, Perun, Swaróg, Kronos, Weles i Hefajstos"
assert s.count(a)==1
s=s.replace(a,"drivery Posejdon, Perun, Swaróg i Hefajstos")
open(f,'w',encoding='utf8').write(s);print('g17 ok')
