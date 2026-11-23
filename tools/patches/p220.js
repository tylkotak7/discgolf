<script>/* P220: ROLLER ACE – osobny napis, gdy roller wtoczy się do kosza z pierwszego rzutu */
(function(){try{
 const _h=hole;hole=function(){const rin=window.__rollIn&&Date.now()-window.__rollIn<1500;window.__rollIn=0;
  const ace=rin&&throws==1;let s1=null,s2=null;
  if(rin){try{if(typeof RESD!='undefined'&&RESD.ace){s1={t:RESD.ace.t,t2:RESD.ace.t2};if(ace){RESD.ace.t='ROLLER ACE!';RESD.ace.t2='🛞 Z ROLLERA'}}}catch(e){}
   try{if(typeof RXS!='undefined'&&RXS.ace){s2={t:RXS.ace.t,p:RXS.ace.p};if(ace){RXS.ace.t='ROLLER ACE!';RXS.ace.p='🛞 Z ROLLERA'}}}catch(e){}
   if(ace)window.__rollAceT=Date.now()}
  const sp0=window.__SP;if(rin)window.__SP=1;let r;try{r=_h.apply(this,arguments)}finally{if(rin)window.__SP=sp0}
  if(rin){try{if(!ace)say('🛞 Roller do kosza!','wtoczył się prosto do koszyka','#ffb300',110)}catch(e){}
   setTimeout(()=>{try{if(s1){RESD.ace.t=s1.t;RESD.ace.t2=s1.t2}if(s2){RXS.ace.t=s2.t;RXS.ace.p=s2.p}}catch(e){}},4000)}
  return r};
}catch(e){console.warn('P220',e)}})();
</script>
