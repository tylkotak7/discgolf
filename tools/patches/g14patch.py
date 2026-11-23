import sys
f=sys.argv[1];s=open(f,encoding='utf8').read()
R=[("if(R.sp<1.6&&Math.random()<.3){R.done=true;return hole()}",
    "if(Math.random()<(window.__rollP||.05)){R.done=true;window.__rollIn=Date.now();return hole()}"),
   ("g.strokeText('ACE!',0,0);g.fillStyle='#ffe066';g.fillText('ACE!',0,0);g.font='72px serif';g.fillText('🏆',0,-78);",
    "const AT=window.__rollAceT&&Date.now()-window.__rollAceT<9000;if(AT)g.font='900 46px system-ui';g.strokeText(AT?'ROLLER ACE!':'ACE!',0,0);g.fillStyle='#ffe066';g.fillText(AT?'ROLLER ACE!':'ACE!',0,0);g.font='72px serif';g.fillText(AT?'🛞':'🏆',0,-78);")]
for a,b in R:
  assert s.count(a)==1,a
  s=s.replace(a,b)
open(f,'w',encoding='utf8').write(s);print('g14 ok')
