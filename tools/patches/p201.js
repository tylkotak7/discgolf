<script>/* P201: Street – dysk nie utknie w budynku/przy ścianie (wypchnięcie na zewnątrz) */
(function(){try{let last=null;
setInterval(()=>{try{if(!playing||disc||drag||!lie||!holes)return;const h=holes[hi];if(!h||!h.sw||!h.U)return;if(last&&last.x===lie.x&&last.y===lie.y)return;
 let moved=false;for(let it=0;it<6;it++){let hit=false;
  for(const B of h.U.bld){const px=lie.x-B.c[0],py=lie.y-B.c[1],du=px*B.u[0]+py*B.u[1],dv=px*B.v[0]+py*B.v[1],m=6;
   if(B.wig){const r=Math.hypot(px,py);if(r<B.a+m){const k=(B.a+m+1)/(r||1);lie={x:B.c[0]+px*k,y:B.c[1]+py*k};hit=true}continue}
   if(Math.abs(du)<B.a+m&&Math.abs(dv)<B.b+m){const ea=B.a+m-Math.abs(du),eb=B.b+m-Math.abs(dv);let nu=du,nv=dv;if(ea<eb)nu=Math.sign(du||1)*(B.a+m+1);else nv=Math.sign(dv||1)*(B.b+m+1);lie={x:B.c[0]+B.u[0]*nu+B.v[0]*nv,y:B.c[1]+B.u[1]*nu+B.v[1]*nv};hit=true}}
  if(!hit)break;moved=true}
 lie.x=Math.max(8,Math.min(W-8,lie.x));lie.y=Math.max(8,Math.min(H-8,lie.y));last={x:lie.x,y:lie.y};if(moved){try{hud()}catch(e){}}}catch(e){}},150);
}catch(e){console.warn('P201',e)}})();
</script>
