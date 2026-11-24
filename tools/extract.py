#!/usr/bin/env python3
"""Wynosi duże grafiki/czcionki zapisane w kodzie (data:...;base64) do osobnych plików w katalogu a/ obok HTML.
Nazwa pliku = skrót zawartości, więc ten sam obrazek ma zawsze ten sam adres (telefon trzyma go w pamięci między wersjami).
Użycie: python3 tools/extract.py plik.html   (pliki trafiają do <katalog pliku>/a/)"""
import sys,os,re,base64,hashlib
EXT={'image/webp':'webp','image/jpeg':'jpg','image/png':'png','font/woff':'woff','font/woff2':'woff2','image/svg+xml':'svg'}
MIN=6000
def main():
  f=os.path.abspath(sys.argv[1]);d=os.path.join(os.path.dirname(f),'a');os.makedirs(d,exist_ok=True)
  s=open(f,encoding='utf8').read();n=[0,0]
  def rep(m):
    mt,b=m.group(1),m.group(2)
    if len(b)<MIN or mt not in EXT:return m.group(0)
    raw=base64.b64decode(b);name=hashlib.sha1(raw).hexdigest()[:12]+'.'+EXT[mt]
    p=os.path.join(d,name)
    if not os.path.exists(p):open(p,'wb').write(raw)
    n[0]+=1;n[1]+=len(b);return 'a/'+name
  s=re.sub(r'data:([a-z0-9/+.-]+);base64,([A-Za-z0-9+/=]+)',rep,s)
  open(f,'w',encoding='utf8').write(s)
  print(f'wyniesiono {n[0]} plików ({n[1]//1024} KB base64), HTML teraz {len(s.encode())//1024} KB')
if __name__=='__main__':main()
