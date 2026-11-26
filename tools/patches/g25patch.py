import sys
# G25: w Archiwum przy każdym wyniku data zdobycia
f=sys.argv[1];s=open(f,encoding='utf8').read()
a="""'</b><small style="color:#8fae98;font-weight:600"> ('+(+e.t||0)+')</small><i class="t5x">'"""
b="""'</b><small style="color:#8fae98;font-weight:600"> ('+(+e.t||0)+')</small>'+((t=>t>1e12?(d=>'<small style="display:block;width:100%;color:#7d9886;font-size:10px;font-weight:600;margin-top:-2px">📅 '+String(d.getDate()).padStart(2,'0')+'.'+String(d.getMonth()+1).padStart(2,'0')+'.'+d.getFullYear()+'</small>')(new Date(t)):'')(+e.at||+e.id||0))+'<i class="t5x">'"""
assert s.count(a)==1;s=s.replace(a,b);open(f,'w',encoding='utf8').write(s);print('g25 ok')
