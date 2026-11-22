<script>/* P206: lądowanie – rodzaj podłoża (trawa/śnieg/asfalt/ziemia), bez konfetti, większy plusk z kręgami, ślad sunięcia */
(function(){try{
const P2=[],MK=[];
function px(x,y){try{const h=holes[hi],c=bgOf(h,season=='winter');if(!c||!c.width)return null;const S=c.width/W,X=Math.max(0,Math.min(c.width-1,Math.round(x*S))),Y=Math.max(0,Math.min(c.height-1,Math.round(y*S)));const d=c.getContext('2d',{willReadFrequently:true}).getImageData(X,Y,1,1).data;return[d[0],d[1],d[2]]}catch(e){return null}}
window.__surf=function(x,y){const c=px(x,y);if(!c)return null;const[r,g,b]=c,l=r*.3+g*.59+b*.11,grass=g>r*1.08&&g>b*1.2;const kind=season=='winter'&&l>150?'snow':grass?'grass':(Math.abs(r-b)<28&&Math.abs(r-g)<28)?'asph':'dust';const lt=l>140,t=k=>lt?'rgb('+(r*k*.62|0)+','+(g*k*.6|0)+','+(b*k*.56|0)+')':'rgb('+Math.min(255,r*k+30|0)+','+Math.min(255,g*k+26|0)+','+Math.min(255,b*k+20|0)+')';return{kind,c,dc:[t(1),t(.85),t(1.15)]}};
function splash2(x,y){if(GFXLOW())return;for(let i=0;i<20;i++){const an=Math.random()*6.28,sp=.3+Math.random()*.9;P2.push({k:'drop',x,y,vx:Math.cos(an)*sp*.7,vy:Math.sin(an)*sp*.45,z:0,vz:1.3+Math.random()*1.8,life:40})}for(let i=0;i<3;i++)P2.push({k:'ripple',x,y,life:60+i*18,L:60+i*18,dl:i*10})}
const _b=burst;burst=function(x,y,k){try{if(k=='puff'){try{sfx.land()}catch(e){}return}if(k=='splash')splash2(x,y)}catch(e){}return _b.apply(this,arguments)};
const _s=step;step=function(){const d=disc,x0=d&&d.x,y0=d&&d.y;const r=_s.apply(this,arguments);try{if(d&&d.gnd&&!GFXLOW()&&isFinite(d.x)){MK.push({x0,y0,x1:d.x,y1:d.y,t:performance.now()});if(MK.length>200)MK.shift()}}catch(e){}return r};
const _l=load;load=function(){P2.length=0;MK.length=0;return _l.apply(this,arguments)};
function draw2(){if(GFXLOW()){P2.length=0;MK.length=0;return}const now=performance.now();
 if(MK.length){g.save();g.lineCap='round';const wn=season=='winter';for(let i=MK.length-1;i>=0;i--){const m=MK[i],age=(now-m.t)/1000;if(age>8){MK.splice(i,1);continue}const a=(1-age/8)*(wn?.45:.3);g.strokeStyle=wn?'rgba(110,130,165,'+a+')':'rgba(38,30,16,'+a+')';g.lineWidth=wn?1.8:1.3;g.beginPath();g.moveTo(m.x0,m.y0);g.lineTo(m.x1,m.y1);g.stroke()}g.restore()}
 for(let i=P2.length-1;i>=0;i--){const p=P2[i];p.life--;if(p.life<=0){P2.splice(i,1);continue}
  if(p.k=='ripple'){const age=p.L-p.life;if(age<p.dl)continue;const f=(age-p.dl)/(p.L-p.dl);g.strokeStyle='rgba(235,248,255,'+(.75*(1-f))+')';g.lineWidth=.9;g.beginPath();g.ellipse(p.x,p.y,2+f*15,(2+f*15)*.55,0,0,7);g.stroke();continue}
  p.x+=p.vx;p.y+=p.vy;p.vx*=.97;p.vy*=.97;p.z+=p.vz;p.vz-=.12;if(p.z<0){P2.splice(i,1);continue}
  g.globalAlpha=Math.min(1,p.life/12);g.fillStyle='#e6f6ff';g.beginPath();g.arc(p.x,p.y-p.z*.6,.6,0,7);g.fill();g.globalAlpha=1}}
const _dp=drawParts;drawParts=function(){const r=_dp.apply(this,arguments);try{draw2()}catch(e){}return r};
}catch(e){console.warn('P206',e)}})();
</script>
