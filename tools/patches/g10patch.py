import sys
f=sys.argv[1];s=open(f,encoding='utf8').read()
SPL=r'''<div id="boot" style="position:fixed;inset:0;z-index:2147483000;background:radial-gradient(circle at 50% 38%,#24593a,#0b2316 75%);display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:system-ui,sans-serif;transition:opacity .35s">
<style>@keyframes bootdisc{0%{transform:translate(0,0) rotate(0) scale(1);opacity:1}10%{transform:translate(-6px,4px) rotate(0)}52%{transform:translate(78px,-58px) rotate(540deg)}86%{transform:translate(152px,8px) rotate(900deg);opacity:1}92%{transform:translate(152px,14px) rotate(900deg);opacity:1}100%{transform:translate(152px,14px) rotate(900deg);opacity:0}}
@keyframes bootarm{0%,8%{transform:rotate(30deg)}22%{transform:rotate(-70deg)}32%,100%{transform:rotate(20deg)}}
@keyframes bootch{0%,80%{transform:skewX(0)}86%{transform:skewX(8deg)}92%{transform:skewX(-6deg)}100%{transform:skewX(0)}}
@keyframes bootdot{0%{opacity:.2}50%{opacity:1}100%{opacity:.2}}
#boot .bd{position:absolute;left:66px;top:86px;width:22px;height:9px;border-radius:50%;background:#ff5a4e;box-shadow:inset 0 0 0 2px rgba(255,255,255,.7);animation:bootdisc 2.2s cubic-bezier(.3,.6,.4,1) infinite;will-change:transform}
#boot .arm{position:absolute;left:52px;top:96px;width:26px;height:8px;border-radius:5px;background:#2f7be5;transform-origin:2px 4px;animation:bootarm 2.2s ease-in-out infinite;will-change:transform}
#boot .ch{animation:bootch 2.2s linear infinite;transform-origin:50% 0;will-change:transform}
#boot .dt i{animation:bootdot 1.2s infinite;font-style:normal}#boot .dt i:nth-child(2){animation-delay:.2s}#boot .dt i:nth-child(3){animation-delay:.4s}</style>
<div style="font:900 44px/1 system-ui;color:#fff;letter-spacing:1px;text-align:center;margin-bottom:22px">DISC <span style="color:#7dff9a">GOLF</span> PL</div>
<div style="position:relative;width:270px;height:200px;border-radius:22px;overflow:hidden;background:linear-gradient(#8fd3ff,#d8f1ff 55%,#5fae4a 55%,#3f8a35);box-shadow:0 12px 30px rgba(0,0,0,.4)">
<svg width="270" height="200" viewBox="0 0 270 200" style="position:absolute;left:0;top:0"><g fill="#2f6e2a"><circle cx="20" cy="112" r="20"/><circle cx="70" cy="112" r="22"/><circle cx="125" cy="112" r="18"/><circle cx="175" cy="112" r="22"/><circle cx="230" cy="112" r="20"/></g><rect y="110" width="270" height="90" fill="#4f9c3f"/>
<ellipse cx="60" cy="176" rx="18" ry="5" fill="rgba(0,0,0,.2)"/><path d="M52 132 L46 174 M64 132 L70 174" stroke="#2b3340" stroke-width="9" stroke-linecap="round"/><rect x="44" y="94" width="30" height="42" rx="9" fill="#2f7be5"/><circle cx="58" cy="80" r="13" fill="#e6b48a"/><path d="M45 79 A13 13 0 0 1 71 79 Z" fill="#d7332b"/><rect x="58" y="74" width="20" height="5" rx="2" fill="#d7332b"/>
<ellipse cx="215" cy="178" rx="24" ry="6" fill="rgba(0,0,0,.2)"/><rect x="213" y="86" width="4" height="92" fill="#9aa4ad"/><rect x="193" y="82" width="44" height="6" fill="#ffd23f"/><g class="ch" stroke="#cfd6dc" stroke-width="1.5" fill="none"><path d="M197 88 Q200 110 207 126 M204 88 Q206 110 210 126 M211 88 Q212 110 213 126 M219 88 Q218 110 217 126 M226 88 Q224 110 220 126 M233 88 Q230 110 223 126"/></g><path d="M190 126 L240 126 L235 142 L195 142 Z" fill="#ffd23f"/></svg>
<div class="arm"></div><div class="bd"></div></div>
<div class="dt" style="margin-top:22px;font:900 24px system-ui;color:#fff">Ładowanie<i>.</i><i>.</i><i>.</i></div>
<div style="margin-top:4px;font:700 14px system-ui;color:#a9d9b6">Proszę czekać</div></div>
<script>(function(){var done=false;function hide(){if(done)return;done=true;var b=document.getElementById('boot');if(!b)return;b.style.opacity='0';setTimeout(function(){b.remove()},380)}/* ekran startowy znika dopiero, gdy menu ma gotowe tło (bez stopklatki z tabliczką 1. dołka) */var t00=Date.now();function busy(){try{var l=document.getElementById('ld');if(l&&getComputedStyle(l).display!='none')return true;if(typeof bgBusy!='undefined'&&bgBusy)return true;if(window.__sBusy||window.__ensBusy)return true;if(!(window.__TX2ok&&window.__TSok)&&Date.now()-t00<9000)return true;if(typeof playing!='undefined'&&playing)return false;var mn=document.getElementById('menu');if(mn&&!/url\(/.test(mn.style.backgroundImage||''))return true}catch(e){}return false}addEventListener('load',function(){var t0=Date.now(),ok=0;var iv=setInterval(function(){if(Date.now()-t0<600)return;if(busy()){ok=0;return}if(++ok>=3){clearInterval(iv);requestAnimationFrame(function(){requestAnimationFrame(hide)})}},120)});setTimeout(hide,45000)})();</script>
'''
a='<body>'
assert s.count(a)==1
s=s.replace(a,a+SPL)
open(f,'w',encoding='utf8').write(s);print('g10 ok')
