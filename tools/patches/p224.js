<script>/* P224: tabelka online i przycisk emotek nie zasłaniają kosza – gdy kosz jest pod nimi, robią się przezroczyste */
(function(){try{
 let MT=null;const _wt=worldT;worldT=function(){const r=_wt.apply(this,arguments);try{MT=g.getTransform()}catch(e){}return r};
 const ov=(el,X,Y,m)=>{if(!el||el.offsetParent===null&&getComputedStyle(el).position!='fixed')return false;const r=el.getBoundingClientRect();if(!r.width)return false;return X>r.left-m&&X<r.right+m&&Y>r.top-m&&Y<r.bottom+m};
 setInterval(()=>{try{if(!MT||!playing||!holes||!holes[hi])return;const h=holes[hi],cr=cv.getBoundingClientRect(),sx=cr.width/cv.width,sy=cr.height/cv.height;
  const pts=[h.b];const p=disc||lie;if(p)pts.push([p.x,p.y]);
  for(const id of['onchip','onre','onrep']){const el=document.getElementById(id);if(!el)continue;let hit=false;
   for(const q of pts){const X=cr.left+(MT.a*q[0]+MT.c*q[1]+MT.e)*sx,Y=cr.top+(MT.b*q[0]+MT.d*q[1]+MT.f)*sy;if(ov(el,X,Y,30)){hit=true;break}}
   const o=hit?'.22':'';if(el.style.opacity!==o){el.style.transition='opacity .25s';el.style.opacity=o}}}catch(e){}},200);
}catch(e){console.warn('P224',e)}})();
</script>
