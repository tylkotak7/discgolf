import sys
f=sys.argv[1];s=open(f,encoding='utf8').read()
i=s.find('/* P90');e=s.find('</script>',i);b=s[i:e]
R=[("const hw=2.3,sw=P.sw,hb=P.hd>0?1:-1,rot=cl(Math.abs(sw),0,1),shW=4.6*(1-.3*rot);","const hw=fem?2.5:2.3,sw=P.sw,hb=P.hd>0?1:-1,rot=cl(Math.abs(sw),0,1),shW=(fem?4.0:4.7)*(1-.3*rot),ss=c.ss|0;"),
("g.lineTo(wb/2,hipY-1.2);g.lineTo(-wb/2,hipY-1.2);g.closePath();g.fill();\n  g.strokeStyle='rgba(0,0,0,.18)'",
 "if(fem){const my=(shY+hipY)/2;g.quadraticCurveTo(SH[0]+tw/2-1.1,my+1,wb/2-.7,my+2.2);g.quadraticCurveTo(wb/2+.8,hipY-2.4,wb/2+.6,hipY-1.2+(ss==2?1:0));g.lineTo(-wb/2-.6,hipY-1.2+(ss==2?1:0));g.quadraticCurveTo(-wb/2-.8,hipY-2.4,-wb/2+.7,my+2.2);g.quadraticCurveTo(SH[0]-tw/2+1.1,my+1,SH[0]-tw/2,shY+1.4)}else{g.lineTo(wb/2,hipY-1.2+(ss==2?1:0));g.lineTo(-wb/2,hipY-1.2+(ss==2?1:0))}g.closePath();g.fill();\n  g.strokeStyle='rgba(0,0,0,.18)'"),
("limb([S,A[0],A[1]],2.6,2.1,armC(back),shd(sk,back?.85:1));g.strokeStyle=shd(sk,back?.85:1);g.lineWidth=2.1;",
 "limb([S,A[0],A[1]],2.6,2.1,armC(back),ss==2?armC(back):shd(sk,back?.85:1));g.strokeStyle=ss==2?armC(back):shd(sk,back?.85:1);g.lineWidth=2.1;"),
("  /* szyja i głowa */","  {if(!front&&ss==3){g.save();g.scale(mx<0?-1:1,1);g.fillStyle='rgba(255,255,255,.92)';g.font='900 4.6px system-ui';g.textAlign='center';g.textBaseline='middle';g.fillText(String(c.num==null?7:c.num),(mx<0?-1:1)*SH[0],shY+6.8);g.restore()}\n   if(!front&&ss==2){g.fillStyle=shd(sr,.78);g.beginPath();g.moveTo(SH[0]-2.6,shY-.8);g.quadraticCurveTo(SH[0],shY-2,SH[0]+2.6,shY-.8);g.lineTo(SH[0]+1.9,shY+4);g.quadraticCurveTo(SH[0],shY+5,SH[0]-1.9,shY+4);g.closePath();g.fill();g.strokeStyle='rgba(0,0,0,.2)';g.lineWidth=.25;g.stroke()}\n   if(ss==1){g.fillStyle=shd(sr,.8);g.fillRect(SH[0]-2.2,shY-1.1,4.4,1.1)}\n   if(front&&ss==3){g.strokeStyle='#fff';g.lineWidth=.4;g.beginPath();g.moveTo(SH[0]-1.6,shY-.4);g.lineTo(SH[0],shY+2);g.lineTo(SH[0]+1.6,shY-.4);g.stroke()}}\n  /* szyja i głowa */"),
("if(fem||c.hair==2){g.beginPath();g.ellipse(HX+(front?0:.2),HY+3.6,.9,2.1,.1,0,7);g.fill()}",
 "if(fem&&(c.hair==1||c.hair==null)){g.beginPath();g.moveTo(HX-2.6,HY);g.quadraticCurveTo(HX-3.1,HY+4.5,HX-2.2,HY+7.2);g.quadraticCurveTo(HX,HY+8,HX+2.2,HY+7.2);g.quadraticCurveTo(HX+3.1,HY+4.5,HX+2.6,HY);g.closePath();g.fill();g.strokeStyle='rgba(0,0,0,.15)';g.lineWidth=.2;for(let k=-1;k<=1;k++){g.beginPath();g.moveTo(HX+k*1.1,HY+1);g.quadraticCurveTo(HX+k*1.3,HY+4,HX+k*.9,HY+7);g.stroke()}}else if(fem&&c.hair==3){for(let k=0;k<7;k++){const a=Math.PI*(.1+k/6*.8);g.beginPath();g.arc(HX+Math.cos(a)*2.9,HY+1.2+Math.sin(a)*2.8,1.25,0,7);g.fill()}}else if(fem||c.hair==2){g.beginPath();g.ellipse(HX+(front?0:.2),HY+3.6,.9,2.1,.1,0,7);g.fill()}"),
("g.strokeStyle='#8a4a3a';g.lineWidth=.3;g.beginPath();g.moveTo(HX-.6,HY+1.5);","g.strokeStyle=fem?'#c24a5a':'#8a4a3a';g.lineWidth=fem?.45:.3;g.beginPath();g.moveTo(HX-.6,HY+1.5);")]
R.append(("g.translate(0,-(P.jump||0));","g.translate(0,-(P.jump||0));if(window.__draw2v&&!window.__old2){try{window.__draw2v(g,c,P,hold,t,sn,cs,front);g.restore();return}catch(e){console.warn('d2',e)}}"))
for a,c in R:
  assert b.count(a)==1,(a[:60],b.count(a)); b=b.replace(a,c)
s=s[:i]+b+s[e:]
open(f,'w',encoding='utf8').write(s);print('p90 ok')
