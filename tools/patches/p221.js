<script>/* P221: asfalt na Międzybłociu (i Luboniu) z teksturą jak na WRC Street */
(function(){try{
 let PAT=null;const pc=()=>{if(PAT)return PAT;const T=window.__TX&&window.__TX.asph;if(!T)return null;const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d'),im=x.createImageData(256,256),B=[74,77,82];
  for(let i=0;i<65536;i++){im.data[i*4]=Math.min(255,B[0]*T.R[i*3]);im.data[i*4+1]=Math.min(255,B[1]*T.R[i*3+1]);im.data[i*4+2]=Math.min(255,B[2]*T.R[i*3+2]);im.data[i*4+3]=255}x.putImageData(im,0,0);return PAT=c};
 const _bk=window.__bk3;if(typeof _bk!='function')return;
 window.__bk3=function(h,bg){const fresh=bg&&!bg._d3;const r0=_bk.apply(this,arguments);try{if(!fresh||season=='winter')return r0;const R=(h.roads||[]).filter(r=>r.asph);if(!R.length)return r0;const P=pc();if(!P)return r0;
  const x=bg.getContext('2d'),k=bg.width/W;x.save();x.scale(k,k);const pat=x.createPattern(P,'repeat');try{pat.setTransform(new DOMMatrix().scale(1/k))}catch(e){}
  for(const r of R){x.lineCap='round';x.lineJoin='round';const path=()=>{x.beginPath();r.pts.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]))};
   x.strokeStyle='#b9b8b2';x.lineWidth=r.w;path();x.stroke();
   x.strokeStyle=pat;x.lineWidth=r.w-2.4;path();x.stroke();
   x.strokeStyle='rgba(235,235,225,.85)';x.lineWidth=.9;x.setLineDash([6,6]);path();x.stroke();x.setLineDash([])}
  x.restore()}catch(e){console.warn('P221',e)}return r0};
}catch(e){console.warn('P221',e)}})();
</script>
