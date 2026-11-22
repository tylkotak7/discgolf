import sys
import os
HERE=os.path.dirname(os.path.abspath(__file__))
s=open(os.path.join(HERE,'base_v214.html'),encoding='utf8').read()
i=s.find('function build3_(');j=s.find('\nfunction ',i+20);b=s[i:j]
R=[('if(wn)continue;rectFn','if(wn||h.urb)continue;rectFn'),
('{const R=rnd(sd0*3+11),ok=(x,y)=>{if(x<10','{const R=rnd(sd0*3+11),ok=(x,y)=>{if(h.urb)return false;if(x<10'),
('if(!wn){const R=rnd(sd0*9+5),near=','if(!wn&&!h.urb){const R=rnd(sd0*9+5),near='),
('/* --- teepad','/* pole miejskie (P196) */\nif(h.urb)try{h.urb({HT,AR,AG,AB,SPEC,SIDE,TW,TH,S,setA,blendA,rectFn,wn,WAm})}catch(e){console.warn(\'urb\',e)}\n/* --- teepad'),
('{const cx=h.tee[0]*S,cy=h.tee[1]*S,au=AUT3;rectFn(cx-22','if(h.teeA==null){const cx=h.tee[0]*S,cy=h.tee[1]*S,au=AUT3;rectFn(cx-22'),
('if(!wn)for(let i=0;i<N;i++){if(SHb[i]<.6','if(!wn&&!h.urb)for(let i=0;i<N;i++){if(SHb[i]<.6'),
('else if(sd==6)',"else if(sd>=7&&sd<=12){const FC=[[.86,.8,.66],[.9,.82,.55],[.9,.89,.85],[.86,.72,.68],[.72,.73,.72],[.8,.62,.38]][sd-7],fl=f*3,fi=Math.floor(fl),ff=fl-fi;cr=FC[0];cg=FC[1];cb=FC[2];dk=1-f*.2;if(f<.06){cr=.24;cg=.2;cb=.17;dk=1}else if(fi<2){const wx=(x+sd*5)%15;if(wx>=4&&wx<11&&ff>.28&&ff<.8){cr=.15;cg=.19;cb=.25;if(ff<.4){cr=.32;cg=.36;cb=.42}}else if(ff>.9){cr*=.88;cg*=.88;cb*=.88}}else{const wx=(x+sd*7)%26;if(wx>=3&&wx<22&&ff>.15&&ff<.86){cr=.12;cg=.15;cb=.19;if(ff<.24){cr=.6;cg=.22;cb=.18}}}if(wn&&f<.09){cr=cg=.92;cb=.96}}\nelse if(sd==6)")]
for a,c in R:
  assert b.count(a)==1,a; b=b.replace(a,c)
s=s[:i]+b+s[j:]
G=[("function treeFX(x,y){const t=treeAt(x,y),","function treeFX(x,y){try{const hh=holes[hi];if(hh&&hh.sw&&window.__wallHit){let bt=null,bd=1e9,td=1e9;for(const c of hh._col||[]){const d=Math.hypot(c[0]-x,c[1]-y)-c[2];if(d<bd){bd=d;bt=c}}for(const t of hh.trees||[])td=Math.min(td,Math.hypot(t[0]-x,t[1]-y)-t[2]);if(bt&&bd<6&&bd<td&&(bt.w||bt.lamp||bt.umb||bt.nep)){window.__wallHit(x,y,bt);return}}}catch(e){}const t=treeAt(x,y),"),("['noc','🌙 Świetlista noc','dg_topn']];","['noc','🌙 Świetlista noc','dg_topn'],['wrc','🏙️ WRC Street','dg_topwrc']];"),("const bad=(px,py)=>{if(px<4","const bad=(px,py)=>{if(h.urb)return true;if(px<4"),
("if(!win)for(let i=0;i<120*","if(!win&&!h.urb)for(let i=0;i<120*"),
("g.fillText(holes===MZ?'Międzybłocie':h===TRN?'Przysieczyn':'Złotów',r.x+5,r.y+2);g.fillText('DiscGolfPark®',r.x+5,r.y+4.2);","g.fillText(h.sw?'Wągrowiec':h.orle?'Orle':holes===MZ?'Międzybłocie':h===TRN?'Przysieczyn':'Złotów',r.x+5,r.y+2);g.fillText(h.sw?'Street':h.orle?'Wągrowiec':'DiscGolfPark®',r.x+5,r.y+4.2);"),
("layout=='lubon'?'Luboń':'Złotów DiscGolfPark'","layout=='lubon'?'Luboń':layout=='wrc'?'Street Wągrowiec':layout=='orle'?'Orle Wągrowiec':'Złotów DiscGolfPark'"),
("x.fillText(nm,160,72);x.fillText('DiscGolfPark®',160,124);","x.fillText(nm,160,72);x.fillText(h.sw?'Street':h.orle?'Wągrowiec':'DiscGolfPark®',160,124);")]
for a,c in G:
  assert s.count(a)==1,a; s=s.replace(a,c)
add=''.join(open(f,encoding='utf8').read() for f in sys.argv[2:])
k=s.rfind('</body>');s=s[:k]+add+s[k:]
open(sys.argv[1],'w',encoding='utf8').write(s)
