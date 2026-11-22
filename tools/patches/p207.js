<script>/* P207: fale wiatru na trawie (tylko obraz – kolizje bez zmian) */
(function(){try{
let tex=null,oc=null;
function mkTex(){const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d'),id=x.createImageData(256,256),d=id.data;
 for(let y=0;y<256;y++)for(let X=0;X<256;X++){const u=X/256,v=y/256;const w=Math.sin((u*2+Math.sin(v*6.283*2)*.06+Math.sin(v*6.283)*.05)*6.283*2);let a=Math.max(0,w);a=a*a*a;a*=.65+.35*Math.sin(v*6.283*3+u*9);const j=(y*256+X)*4;d[j]=255;d[j+1]=250;d[j+2]=205;d[j+3]=Math.max(0,Math.min(255,a*255))}
 x.putImageData(id,0,0);return c}
window.__gw=function(h,bg){if(!bg||!bg._gm||GFXLOW()||season=='winter')return;const atm=typeof ATM!='undefined'?ATM:'';if(atm=='wieczór'||atm=='zmierzch'||(typeof layout!='undefined'&&layout=='noc'))return;
 if(!tex)tex=mkTex();const m=bg._gm;if(!oc){oc=document.createElement('canvas')}if(oc.width!==m.width||oc.height!==m.height){oc.width=m.width;oc.height=m.height}
 const x=oc.getContext('2d'),t=performance.now()/1000,wsv=Math.max(.5,window.ws||1),wa=window.wa||0,sc=m.width/W;
 x.globalCompositeOperation='source-over';x.clearRect(0,0,oc.width,oc.height);
 const p=x.createPattern(tex,'repeat');const k=sc*(1.1+wsv*.05),sp=(6+wsv*4)*t;
 const M=new DOMMatrix().translate(Math.sin(wa)*sp*sc,-Math.cos(wa)*sp*sc).rotate(wa*180/Math.PI+90).scale(k*.9,k*.9);p.setTransform(M);
 x.fillStyle=p;x.fillRect(0,0,oc.width,oc.height);x.globalCompositeOperation='destination-in';x.drawImage(m,0,0);
 g.save();g.globalCompositeOperation='soft-light';g.globalAlpha=Math.min(.55,.16+wsv*.07);g.drawImage(oc,0,0,W,H);g.restore()};
}catch(e){console.warn('P207',e)}})();
</script>
