import sys
# G24: nowy sezon rankingu od 26.11.2026 05:00 (rekordy do Archiwum), kariera na dowolnym polu z EVS, noc liczona od startu eventu
f=sys.argv[1];s=open(f,encoding='utf8').read()
T2='Date.UTC(2026,10,26,4)'
R=[("const ARCH_T=Date.UTC(2026,10,17,7,40,0);","const ARCH_T=Date.now()>="+T2+"?"+T2+":Date.UTC(2026,10,17,7,40,0);"),
 ("hel.textContent='📦 Archiwum · wyniki sprzed 17.11.2026'","hel.textContent='📦 Archiwum · wyniki sprzed '+(d=>String(d.getDate()).padStart(2,'0')+'.'+String(d.getMonth()+1).padStart(2,'0')+'.'+d.getFullYear())(new Date(ARCH_T))"),
 ("const L=srt((r.on||r.loc).filter(isNew)).slice(0,5)","const L=srt((r.on||r.loc).filter(T[0]=='noc'?e=>tOf(e)>=(window.NOC_T0||0):isNew)).slice(0,5)"),
 ("return l?l.filter(isNew):l}","return l?l.filter(typeof layout!='undefined'&&layout=='noc'?e=>tOf(e)>=(window.NOC_T0||0):isNew):l}"),
 ("holes=ev.c=='miedzy'?MZ:ev.c=='z22'?Z22:ZL;","holes=(()=>{try{const cc=CARDS.find(x=>x.k==ev.c);const H=cc&&cc.hl&&cc.hl();if(H&&H.length)return H}catch(e){}return ev.c=='miedzy'?MZ:ev.c=='z22'?Z22:ZL})();"),
 ("<h4>📅 Turnieje tygodnia · Złotów</h4>","<h4>📅 Turnieje tygodnia · '+({zlotow:'Złotów',z22:'Złotów 22',miedzy:'Międzybłocie',lubon:'Luboń',wrc:'WRC Street'}[EVS[0]&&EVS[0].c]||'Złotów')+'</h4>"),
 ("(EVS[n].c=='z22'?'Złotów 22 · 22 dołki':'Złotów · 12 dołków')","(EVS[n].c=='z22'?'Złotów 22 · 22 dołki':EVS[n].c=='lubon'?'Luboń · 18 dołków':EVS[n].c=='miedzy'?'Międzybłocie · 18 dołków':'Złotów · 12 dołków')"),
 ("<small>Nowy sezon w poniedziałek</small>","<small>Nowy sezon w czwartek</small>"),
 ("nowy sezon w poniedziałek')","nowy sezon w czwartek')")]
for a,b in R:
  n=s.count(a);assert n==1,(n,a[:60]);s=s.replace(a,b)
open(f,'w',encoding='utf8').write(s);print('g24 ok')
