#!/usr/bin/env python3
"""Buduje index.html z base_v214.html + łatek, dopisuje wpis „Co nowego”, ustawia wersję, testuje.
Użycie (z katalogu repo):
  python3 tools/release.py 250 "Tytuł aktualizacji" "🔧 linia 1" "🎯 linia 2"
  python3 tools/release.py 250 --no-chg      # bez nowego wpisu (np. sama poprawka)
Po udanym teście nadpisuje index.html i sw.js oraz poprawia „Ostatnia: vNNN” w HANDOFF.md. Commit/push robisz sam.
"""
import os,sys,subprocess,datetime,re,shutil
HERE=os.path.dirname(os.path.abspath(__file__));ROOT=os.path.dirname(HERE);P=os.path.join(HERE,'patches')
JS=['p195.js','p196.js','p197.js','p198.js','p199.js','p200.js','p201.js','p202.js','p203.js','p204.js','p206.js','p207.js','p208.js','p210.js','p212.js','p213.js','p215.js','p216.js','p217.js','p218.js','p219.js','p220.js','p221.js','p222.js','p223.js','p224.js','p225.js','p226.js','p227.js']
PY=['p90patch.py','g2patch.py','g3patch.py','g4patch.py','g5patch.py','g6patch.py','g7patch.py','g8patch.py','g10patch.py','g11patch.py','g12patch.py','g13patch.py','g14patch.py','g15patch.py','g16patch.py','g17patch.py','g18patch.py','g19patch.py','g20patch.py','g21patch.py']
def main():
  a=sys.argv[1:]
  if not a or not a[0].isdigit():print(__doc__);sys.exit(1)
  ver=a[0];nochg='--no-chg' in a;rest=[x for x in a[1:] if x!='--no-chg']
  out=os.path.join(HERE,'out.html')
  subprocess.run([sys.executable,os.path.join(HERE,'build.py'),out]+[os.path.join(P,f) for f in JS],check=True,stdout=subprocess.DEVNULL)
  for f in PY:subprocess.run([sys.executable,os.path.join(P,f),out],check=True,stdout=subprocess.DEVNULL)
  s=open(out,encoding='utf8').read();old=open(os.path.join(ROOT,'index.html'),encoding='utf8').read()
  i=old.find('const CHG=[')+11;j=s.find('const CHG=[')+11;k=old.find(s[j:j+60],i)
  if k<0:sys.exit('Nie znalazłem starej listy CHG w index.html')
  extra=old[i:k];new=''
  if not nochg:
    if len(rest)<2:sys.exit('Podaj tytuł i co najmniej jedną linię „Co nowego”, albo --no-chg')
    esc=lambda t:t.replace('\\\\','\\\\\\\\').replace("'","\\\\'")
    d=datetime.date.today().strftime('%d.%m.%Y')
    new="['Aktualizacja "+d+" – "+esc(rest[0])+"',["+",".join("'"+esc(x)+"'" for x in rest[1:])+"]],"
  s=s[:j]+new+extra+s[j:]
  d=datetime.date.today().strftime('%d.%m.%Y')
  s=re.sub(r'<meta name="dgv" content="[^"]*">','<meta name="dgv" content="'+ver+' · '+d+'">',s,count=1)
  open(out,'w',encoding='utf8').write(s)
  r=subprocess.run([sys.executable,os.path.join(HERE,'test.py'),out])
  if r.returncode:sys.exit('❌ Test nie przeszedł – index.html NIE został zmieniony (wynik w tools/out.html)')
  shutil.copy(out,os.path.join(ROOT,'index.html'))
  sw=os.path.join(ROOT,'sw.js');t=open(sw).read();t=re.sub(r'discgolf-v\d+','discgolf-v'+ver,t);open(sw,'w').write(t)
  h=os.path.join(ROOT,'HANDOFF.md');t=open(h,encoding='utf8').read();t=re.sub(r'Ostatnia: \*\*v\d+\*\*\.','Ostatnia: **v'+ver+'**.',t);open(h,'w',encoding='utf8').write(t)
  os.remove(out);print('✅ v'+ver+' gotowe – teraz git add/commit/push')
main()
