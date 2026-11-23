import sys
f=sys.argv[1];s=open(f,encoding='utf8').read()
R=[(" function make(c,se){const H0="," async function make(c,se){const H0="),
   ("try{AUT3=se=='autumn';bg=build3(H0,wn)}catch(e){}finally{try{AUT3=a0}catch(e){}}",
    "try{if(window.__b3aS){window.__thbH=H0;bg=await window.__b3aS(H0,wn,se=='autumn')}else{AUT3=se=='autumn';bg=build3(H0,wn)}}catch(e){}finally{window.__thbH=null;try{AUT3=a0}catch(e){}}"),
   ("let i=0;const nx=()=>{if(i>=todo.length","let i=0;const nx=async()=>{if(i>=todo.length"),
   ("try{const u=make(c,se);","try{const u=await make(c,se);")]
for a,b in R:
  assert s.count(a)==1,a
  s=s.replace(a,b)
open(f,'w',encoding='utf8').write(s);print('g12 ok')
