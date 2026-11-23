import sys
f=sys.argv[1];s=open(f,encoding='utf8').read()
a="const oa=h.art;h.art=(x,w)=>{if(oa)oa(x,w);x.save();x.fillStyle=w?'#e9eef0':'#6f9c4c';x.fillRect(-6,-6,rx+6,H+12);"
b="  x.restore()};\n h.trees.push([79,22,11],[80,62,12],[78,112,11],[94,150,10],[79,178,11]);"
i=s.find(a);j=s.find(b,i)
assert s.count(a)==1 and j>i
new=r"""const oa=h.art;h.art=(x,w)=>{if(oa)oa(x,w);try{window.__mzHouses(x,w,rx,HS,h)}catch(e){console.warn('domy',e)}};
 h.trees.push([79,22,11],[80,62,12],[78,112,11],[94,150,10],[79,178,11]);"""
s=s[:i]+new+s[j+len(b):]
open(f,'w',encoding='utf8').write(s);print('g15 ok')
