<script>/* P223: bez driverów Kronos i Weles – znikają ze sklepu; kto je kupił, dostaje zwrot monet */
(function(){try{
 const GONE=['d90','d80'];
 for(let i=LTD.length-1;i>=0;i--)if(GONE.includes(LTD[i].id))LTD.splice(i,1);
 SV.ltd=SV.ltd||[];let back=0;for(const id of GONE){const k=SV.ltd.indexOf(id);if(k>=0){SV.ltd.splice(k,1);back+=40}}
 if(SV.ltdEq)for(const s in SV.ltdEq)if(GONE.includes(SV.ltdEq[s]))delete SV.ltdEq[s];
 if(SV.bag3)for(const s in SV.bag3){const v=SV.bag3[s];if(Array.isArray(v))SV.bag3[s]=v.filter(id=>!GONE.includes(id))}
 if(back){SV.coins=(SV.coins||0)+back;persist();try{applyBrand()}catch(e){}try{ltdApply()}catch(e){}try{for(let i=0;i<3;i++)if(!discs[i].ltd){discs[i].m=BASE[i].m;discs[i].col=BASE[i].col}applyBrand();buildBar()}catch(e){}setTimeout(()=>{try{toast('🪙 Zwrot '+back+' monet – drivery Kronos i Weles wycofane ze sklepu')}catch(e){}},2500)}
}catch(e){console.warn('P223',e)}})();
</script>
