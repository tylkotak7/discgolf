#!/usr/bin/env python3
"""Automatyczny test gry (Playwright, bez sieci). Użycie: python3 tools/test.py ścieżka/do/index.html
Sprawdza: start bez błędów JS, lista „Co nowego”, każde pole i każdy dołek ładuje się bez błędu,
tło dołka buduje się na każdym polu (lato i zima), rzut leci tyle co zawsze (fizyka bez zmian), okno pokoju online się otwiera."""
import asyncio,sys,os
from playwright.async_api import async_playwright
F=os.path.abspath(sys.argv[1]) if len(sys.argv)>1 else os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'index.html')
INIT="localStorage.setItem('dg_onb','1');localStorage.setItem('dg_tut','1');localStorage.setItem('dg_tut2','1');localStorage.setItem('dg_name','Test');Math.random=(()=>{let s=1;return()=>{s=(s*16807)%2147483647;return s/2147483647}})()"
fails=[]
def chk(ok,msg):
  print(('  ✅ ' if ok else '  ❌ ')+msg)
  if not ok:fails.append(msg)
async def page(b):
  ctx=await b.new_context(viewport={'width':390,'height':845});pg=await ctx.new_page();await pg.add_init_script(INIT)
  errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
  await pg.goto('file://'+F);await pg.wait_for_timeout(3000);return ctx,pg,errs
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch()
    print('1. Start gry');ctx,pg,errs=await page(b)
    r=await pg.evaluate("()=>[typeof CHG,Array.isArray(CHG)&&CHG.length,typeof start,typeof CARDS!='undefined'&&CARDS.map(c=>c.k)]")
    chk(r[0]=='object' and r[1]>0,'lista „Co nowego” ('+str(r[1])+' wpisów)');chk(r[2]=='function','funkcja start');chk(not errs,'brak błędów JS przy starcie '+str(errs[:2]))
    lays=r[3] or []
    print('2. Wszystkie pola i dołki');
    for L in lays:
      res=await pg.evaluate("(L)=>{const e=[];let n=0;try{selLayout(L);const H=CARDS.find(c=>c.k==L).hl();holes=H;document.getElementById('menu').style.display='none';playing=true;start();holes=H;for(let i=0;i<H.length;i++){try{hi=i;load();n++}catch(x){e.push((i+1)+': '+x.message)}}}catch(x){e.push(x.message)}return [n,e]}",L)
      chk(not res[1],f'{L}: {res[0]} dołków ładuje się '+(str(res[1][:2]) if res[1] else ''))
    print('3. Budowanie tła (lato/zima)')
    for L in lays:
      for se in ('summer','winter'):
        res=await pg.evaluate("([L,se])=>{try{const H=CARDS.find(c=>c.k==L).hl(),h=H[Math.min(1,H.length-1)];const s0=season;season=se;holes=H;hi=H.indexOf(h);delete h._fill;const c=build3(h,se=='winter');season=s0;return c&&c.width>0?'ok':'puste'}catch(x){return x.message}}",[L,se])
        chk(res=='ok',f'{L} {se}: tło '+res)
    chk(not errs,'brak błędów JS po teście pól '+str(errs[:2]));await ctx.close()
    print('4. Fizyka rzutu');ctx,pg,errs=await page(b)
    await pg.evaluate("()=>{season='summer';selLayout('zlotow');document.getElementById('menu').style.display='none';playing=true;fitScreen();start();hi=0;load()}");await pg.wait_for_timeout(4000)
    await pg.evaluate("()=>{try{wind.s=0;wind.v=0}catch(e){};const D=discs[di];const v0=1*D.v*KSf()*SLK();throws++;disc={x:lie.x,y:lie.y,a:0,v:v0,v0,D,h:1,trail:[]};window.__L0={x:lie.x,y:lie.y}}")
    await pg.wait_for_timeout(9000)
    d=await pg.evaluate("()=>disc?-1:Math.round(Math.hypot(lie.x-__L0.x,lie.y-__L0.y))")
    chk(360<=d<=440,f'ten sam rzut co zawsze: {d} j. (wzorzec 403)')
    print('5. Okno pokoju online')
    r=await pg.evaluate("()=>{try{const ON=window.__ON,X=window.__ONX;quitToMenu&&quitToMenu()}catch(e){}try{const ON=window.__ON,X=window.__ONX;ON.code='TEST';ON.host=true;X.view();X.sh.classList.add('on');return 'ok'}catch(e){return e.message}}")
    await pg.wait_for_timeout(800)
    r2=await pg.evaluate("()=>!!document.querySelector('#onsh .rm2 .slots')")
    chk(r=='ok' and r2,'okno pokoju z miejscami graczy')
    print('6. Budowanie następnego dołka w tle')
    r=await pg.evaluate("""async()=>{try{if(typeof window.__prebuild!='function')return 'brak';season='summer';selLayout('zlotow');const H=CARDS.find(c=>c.k=='zlotow').hl();holes=H;hi=0;const hs=c=>{const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data;let s=0;for(let i=0;i<d.length;i+=53)s=(s*31+d[i])>>>0;return s};const h=H[2],k=bgIdx(false);playing=false;BGC.delete(h);for(let i=0;i<120&&!(BGC.get(h)&&BGC.get(h)[k]);i++){await window.__prebuild(h);if(!(BGC.get(h)&&BGC.get(h)[k]))await new Promise(r=>setTimeout(r,500))}const c1=BGC.get(h)&&BGC.get(h)[k];if(!c1)return 'nie zbudowano';const a=hs(c1);BGC.delete(h);const c2=build3(h,false);return a===hs(c2)?'ok':'inne tło'}catch(e){return e.message}}""")
    chk(r=='ok','tło zbudowane w tle = tło zbudowane normalnie ('+str(r)+')')
    chk(not errs,'brak błędów JS '+str(errs[:2]));await ctx.close();await b.close()
  print('\nWYNIK: '+('✅ wszystko OK' if not fails else '❌ błędy: '+str(len(fails))));sys.exit(1 if fails else 0)
asyncio.run(main())
