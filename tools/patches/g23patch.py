import sys,os
# G23: tło menu z gotowego obrazka (bez budowania mapy przy starcie)
f=sys.argv[1];s=open(f,encoding='utf8').read()
A=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','assets')
M={se:open(os.path.join(A,'mbg_'+se+'.w64')).read().strip() for se in ['summer','autumn','winter']}
js='<script>window.__MBG='+'{'+','.join("%s:'%s'"%(k,v) for k,v in M.items())+'};</script>'
old="function menuBg(){ensureBG(ZL[0],"
new="function menuBg(){const mu=window.__MBG&&__MBG[season];if(mu){try{const ms=$('menu').style;ms.setProperty('background-image','linear-gradient(rgba(6,16,10,.4),rgba(6,16,10,0) 26%,rgba(6,16,10,.5) 58%,rgba(6,16,10,.9)),url('+mu+')','important');ms.setProperty('background-size','cover','important');ms.setProperty('background-position','center','important');thumbs()}catch(e){}return}ensureBG(ZL[0],"
assert s.count(old)==1
s=s.replace(old,new)
i=s.find('</head>');assert i>0
s=s[:i]+js+s[i:]
open(f,'w',encoding='utf8').write(s);print('g23 ok')
