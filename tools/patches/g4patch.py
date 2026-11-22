import sys
f=sys.argv[1];s=open(f,encoding='utf8').read()
R=[("function land(x,y){if(low())return;const wn=season=='winter',au=season=='autumn';",
    "function land(x,y){if(low())return;const SF=window.__surf?window.__surf(x,y):null,hard=!!(SF&&(SF.kind=='asph'||SF.kind=='dust'));const wn=season=='winter'&&!hard,au=season=='autumn'&&!hard;"),
   ("c:wn?null:(au?['#b98b4a','#d2a25a','#8d6a38'][i%3]:['#b8c98a','#d8cfa0','#9bb86a'][i%3])})}",
    "c:wn?null:hard?SF.dc[i%3]:(au?['#b98b4a','#d2a25a','#8d6a38'][i%3]:['#b8c98a','#d8cfa0','#9bb86a'][i%3])})}"),
   ("if(!wn)for(let i=0;i<5;i++){const a=R(0,6.28);FX.push({k:au?'leaf':'blade'","if(!wn&&!hard)for(let i=0;i<5;i++){const a=R(0,6.28);FX.push({k:au?'leaf':'blade'")]
for a,b in R:
  assert s.count(a)==1,a[:60];s=s.replace(a,b)
open(f,'w',encoding='utf8').write(s);print('g4 ok')
