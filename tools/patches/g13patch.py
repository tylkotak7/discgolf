import sys
f=sys.argv[1];s=open(f,encoding='utf8').read()
a="bgBusy=true;$('ld').style.display='flex';\n setTimeout(()=>{try{AUT3=season=='autumn';const c=build3(h,wn);"
b="bgBusy=true;$('ld').style.display='flex';if(window.__ensA&&window.__ensA(h,wn,ix,cb))return false;\n setTimeout(()=>{try{AUT3=season=='autumn';const c=build3(h,wn);"
assert s.count(a)==1
s=s.replace(a,b)
a2='if(++miss<3)return;miss=0;bgBusy=false;let c=null;'
assert s.count(a2)==1
s=s.replace(a2,'if(window.__ensBusy){miss=0;return}'+a2);open(f,'w',encoding='utf8').write(s);print('g13 ok')
