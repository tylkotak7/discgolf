import sys
f=sys.argv[1];s=open(f,encoding='utf8').read()
a="/* P207: wydeptane miejsca"
assert s.count(a)==1
s=s.replace(a,"if(window.__g19)window.__g19({AR,AG,AB,HT,WAm,RDm,FWm,SEm,TW,TH,h,wn});\n"+a)
a2="/* --- światło --- */"
assert s.count(a2)==1
s=s.replace(a2,"if(window.__g19t)window.__g19t({AR,AG,AB,TREEM,h,wn,S,TW,TH});\n"+a2)
open(f,'w',encoding='utf8').write(s);print('g19 ok')
