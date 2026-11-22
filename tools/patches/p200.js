<script>/* P200: kariera – naprawa starych zapisów (dywizja spoza listy) i bezpieczne rysowanie widoku */
(function(){try{
const fix=C=>{try{const mx=DIVS.length-1;if(!(C.div>=0&&C.div<=mx))C.div=Math.max(0,Math.min(mx,C.div|0));if(C.wk&&!(C.wk.sd>=0&&C.wk.sd<=mx))C.wk.sd=C.div;if(C.pwk&&!(C.pwk.sd>=0&&C.pwk.sd<=mx))C.pwk.sd=0;if(C.wk&&!Array.isArray(C.wk.s))C.wk.s=[null,null,null];if(C.wk&&!Array.isArray(C.wk.t))C.wk.t=[null,null,null];if(C.ev>=EVS.length||C.ev<0)C.ev=0}catch(e){}return C};
const _car=car;car=function(){return fix(_car.apply(this,arguments))};
const _rv=renderCarV;renderCarV=function(){try{fix(car());return _rv.apply(this,arguments)}catch(e){console.warn('P200',e);try{logE&&logE('kariera',e)}catch(x){}
 const el=$('carv');if(el)el.innerHTML='<div class="kcc"><h4>🏅 Kariera</h4><p class="kinfo">Nie udało się wczytać kariery. Spróbuj ponownie.</p><p class="kinfo" style="opacity:.6;font-size:11px">'+String(e&&e.message||e).replace(/[<>]/g,'').slice(0,120)+'</p><button class="pcbtn" id="kretry">🔄 Spróbuj ponownie</button></div>';const b=$('kretry');if(b)b.onclick=()=>renderCarV()}};
try{const _rc=renderCareer;renderCareer=function(){try{fix(car());return _rc.apply(this,arguments)}catch(e){console.warn('P200 rc',e)}}}catch(e){}
try{const _cs=carSync2;carSync2=function(){try{fix(car())}catch(e){}return _cs.apply(this,arguments)}}catch(e){}
try{fix(car());persist()}catch(e){}
}catch(e){console.warn('P200',e)}})();
</script>
