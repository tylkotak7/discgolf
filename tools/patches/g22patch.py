import sys
f=sys.argv[1];s=open(f,encoding='utf8').read()
R=[("const MZT=statL=='miedzy'||statL=='lubon',KN=","const MZT=ct.some(h=>h.par>=4),HAS5=ct.some(h=>h.par>=5),KN="),
   ("let EA=0,AL=0;\n let A=0,B=0,P=0,G=0,D=0,rows='';","let EA=0,AL=0;if(MZT&&!HAS5){const j=KN.indexOf('al');if(j>=0){KN.splice(j,1);KL.splice(j,1);KC.splice(j,1)}}\n let A=0,B=0,P=0,G=0,D=0,rows='';"),
   ("'<th>Ace</th><th>Alb.</th><th>Eag.</th><th>Bird.</th>'","'<th>Ace</th>'+(HAS5?'<th>Alb.</th>':'')+'<th>Eag.</th><th>Bird.</th>'"),
   ("(MZT?'<div><b>'+AL+'</b>albatros</div>","(MZT?(HAS5?'<div><b>'+AL+'</b>albatros</div>':'')+'")]
for a,b in R:
  assert s.count(a)==1,a
  s=s.replace(a,b)
open(f,'w',encoding='utf8').write(s);print('g22 ok')
