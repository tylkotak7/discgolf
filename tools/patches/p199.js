<script>/* P199: mały avatar z nowego modelu, pasek „Aktualizacja” nad dolnym menu, emblemat WRC na tabliczce Street */
(function(){try{
/* pasek aktualizacji – nie zasłania tytułu */
const st=document.createElement('style');st.textContent='#chgchip{top:auto!important;bottom:calc(env(safe-area-inset-bottom,0px) + 84px)!important}';document.head.appendChild(st);
/* mały avatar */
const AC={};
function headPic(ch){const key=JSON.stringify(ch)+(typeof SV!='undefined'&&SV.brand||'');if(AC[key])return AC[key];
 const c=document.createElement('canvas');c.width=c.height=200;const x=c.getContext('2d');
 const bg=x.createRadialGradient(100,150,10,100,120,150);bg.addColorStop(0,'#4f9a48');bg.addColorStop(1,'#1c4a26');x.fillStyle=bg;x.fillRect(0,0,200,200);
 x.save();x.translate(100,620);x.scale(15,15);
 window.__draw2(x,ch,0,{sw:.15,cr:0,lean:0,step:0,heel:0,idle:true,putt:false,hb:1,noShadow:1,disc:false},1.5);x.restore();
 return AC[key]=c.toDataURL('image/png')}
const _av=avatarSVG;avatarSVG=function(ch,head){if(!head||!window.__draw2)return _av.apply(this,arguments);try{return '<img alt="" src="'+headPic(ch||{})+'" style="width:100%;height:100%;display:block;object-fit:cover;border-radius:inherit">'}catch(e){return _av.apply(this,arguments)}};
const refresh=()=>{try{const p=document.getElementById('pav');if(p)p.innerHTML=avatarSVG(SV.char,1)}catch(e){}};refresh();
const _rc=renderChr;renderChr=function(){const r=_rc.apply(this,arguments);refresh();return r};
/* tabliczka przy tee na Street */
const _ds=drawSign;drawSign=function(h){const r=_ds.apply(this,arguments);try{if(h&&h.sw){const R=signRect(h),cx=R.x+2.6,cy=R.y+2.8;g.save();g.fillStyle='#fbfcf6';g.fillRect(R.x+.3,R.y+.3,4.6,5.2);
 g.fillStyle='#1f3a5f';g.beginPath();g.arc(cx,cy,2,0,7);g.fill();g.strokeStyle='#f2c230';g.lineWidth=.35;g.beginPath();g.arc(cx,cy,1.8,0,7);g.stroke();
 g.fillStyle='#ffb347';g.beginPath();g.arc(cx,cy,1.45,Math.PI,0);g.fill();g.fillStyle='#2b2f3a';g.fillRect(cx-1.2,cy-.6,.6,.9);g.fillRect(cx-.4,cy-1,.5,1.3);g.fillRect(cx+.3,cy-.7,.7,1);
 g.strokeStyle='#f2c230';g.lineWidth=.25;g.beginPath();g.moveTo(cx,cy+.3);g.lineTo(cx,cy+1.4);g.stroke();g.fillStyle='#f2c230';g.beginPath();g.ellipse(cx,cy+.3,.8,.25,0,0,7);g.fill();g.restore()}}catch(e){}return r};
}catch(e){console.warn('P199',e)}})();
</script>
