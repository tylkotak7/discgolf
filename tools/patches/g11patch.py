import sys
f=sys.argv[1];s=open(f,encoding='utf8').read()
R=[("re:ON.re||null};","re:ON.re||null,rv:ON.rv||null};"),
   ("st.re&&st.re.t,st.sc.length]","st.re&&st.re.t,st.sc.length,st.rv&&(st.rv.t+st.rv.s)]"),
   ("c.x+=.18*c.s;c.y-=.05*c.s;","c.x+=.045*c.s;c.y-=.012*c.s;")]
for a,b in R:
  assert s.count(a)==1,a
  s=s.replace(a,b)
open(f,'w',encoding='utf8').write(s);print('g11 ok')
