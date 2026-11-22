import sys
f=sys.argv[1];s=open(f,encoding='utf8').read()
a="/* tylko cień dysku – wyraźny */const r=5.5;g.fillStyle='rgba(0,0,0,.18)';g.beginPath();g.ellipse(L.sx,L.sy,r*1.7,r*1.15,0,0,7);g.fill();g.fillStyle='rgba(10,20,15,.55)';g.beginPath();g.ellipse(L.sx,L.sy,r,r*.68,0,0,7);g.fill()}"
assert s.count(a)==1
b=("/* P209: dysk kolegi w jego kolorze + smuga + nick */{const PC=['#ff5a4e','#3d8bff','#ffd23f','#b06bff','#ff9a2e','#2fd3c8'],pe=(ON.peers&&ON.peers[id])||{},ks=Object.keys(ON.peers||{}),col=PC[Math.max(0,ks.indexOf(id))%PC.length];const TM=window.__PTR||(window.__PTR={});let TR=TM[id];if(!TR||TR.t0!==L.t0)TR=TM[id]=Object.assign([],{t0:L.t0});const lp=TR[TR.length-1];if(lp&&Math.hypot(lp[0]-L.sx,lp[1]-L.sy)>60)TR.length=0;if(!lp||Math.hypot(lp[0]-L.sx,lp[1]-L.sy)>1.2){TR.push([L.sx,L.sy]);if(TR.length>22)TR.shift()}L.tr=TR;"
 "const fl=L.end?0:1,hz=fl*6;g.lineCap='round';for(let k=1;k<L.tr.length;k++){const a=k/L.tr.length;g.strokeStyle=col;g.globalAlpha=a*.8;g.lineWidth=1.4+a*2.2;g.beginPath();g.moveTo(L.tr[k-1][0],L.tr[k-1][1]-hz*a);g.lineTo(L.tr[k][0],L.tr[k][1]-hz*a);g.stroke()}g.globalAlpha=1;"
 "const r=5.6;g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(L.sx,L.sy,r*1.25,r*.8,0,0,7);g.fill();const dy=L.sy-hz;g.fillStyle=col;g.beginPath();g.ellipse(L.sx,dy,r,r*.62,0,0,7);g.fill();g.strokeStyle='rgba(255,255,255,.85)';g.lineWidth=.8;g.beginPath();g.ellipse(L.sx,dy,r*.62,r*.38,0,0,7);g.stroke();g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=.6;g.beginPath();g.ellipse(L.sx,dy,r,r*.62,0,0,7);g.stroke();"
 "if(pe.n){const t=String(pe.n).replace(/[<>&\"]/g,'').slice(0,10);g.font='800 6.5px system-ui';const tw=g.measureText(t).width+6;g.fillStyle='rgba(10,25,18,.8)';g.beginPath();g.roundRect?g.roundRect(L.sx-tw/2,dy-15,tw,9,4):g.rect(L.sx-tw/2,dy-15,tw,9);g.fill();g.fillStyle=col;g.textAlign='center';g.fillText(t,L.sx,dy-8.4)}}}")
s=s.replace(a,b)
open(f,'w',encoding='utf8').write(s);print('g7 ok')
