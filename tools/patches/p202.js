<script>/* P202: Street – uderzenie w budynek: zamiast ptaków mieszkaniec krzyczy z okna (dymek) */
(function(){try{
const TX=['Nie po oknach!','Hej! Talerzami w ścianę?!','Panie, to nie jest boisko!','Zaraz dzwonię po straż miejską!','Moje okno! Uważaj!','Kto tu rzuca tymi talerzami?!','Dziecko mi obudzisz!','Idź pan na Łakin z tym dyskiem!','Następnym razem dysk zostaje u mnie!','Ej! Ściana świeżo malowana!','Co to, frisbee? Nie pod blokiem!','Drugi raz i biorę dysk!'],
 TXL={lamp:['Latarnia jest tu od 1970, a Ty?','Uważaj na latarnię!'],umb:['Kawa mi się wylała!','Ej, to nasz parasol!','Kelner! Ktoś rzuca talerzami!'],nep:['Neptun nie łapie dysków!','Zostaw Neptuna w spokoju!']};
let B=null,lastT=0;
window.__wallHit=function(x,y,c){const t=performance.now()/1000;if(t-lastT<1.2)return;lastT=t;const L=c&&c.lamp?TXL.lamp:c&&c.umb?TXL.umb:c&&c.nep?TXL.nep:TX;B={x,y:y-10,txt:L[(Math.random()*L.length)|0],t0:t,win:!!(c&&c.w)};
 try{const C=aud();if(C&&SND.on){const t0=C.currentTime;noise(t0,.08,'lowpass',600,1,.18)}}catch(e){}};
window.__say=function(x,y,txt){B={x,y,txt,t0:performance.now()/1000,win:false}};
const _dw=drawWorld;drawWorld=function(){_dw.apply(this,arguments);try{if(!B||!playing)return;const t=performance.now()/1000,e=t-B.t0;if(e>3.2){B=null;return}const h=holes[hi];if(!h||!h.sw){B=null;return}
 const a=Math.min(1,e*4,(3.2-e)*2);g.save();worldT();g.globalAlpha=a;
 if(B.win){g.save();g.translate(B.x,B.y+6);const op=Math.min(1,e*3);g.fillStyle='rgba(0,0,0,.3)';g.fillRect(-7,-14,14,17);g.fillStyle='#ffe9a8';g.fillRect(-6,-13,12,15);try{PERSON(0,4,{s:.75,shirt:['#c0392b','#2f7be5','#8e44ad','#39b54a'][(B.t0*10|0)%4],talk:1})}catch(x){}g.fillStyle='#3b4252';g.fillRect(-6,-13,12*(1-op*.8)/2,15);g.fillRect(6-12*(1-op*.8)/2,-13,12*(1-op*.8)/2,15);g.fillStyle='#f4f1ea';g.fillRect(-7,2,14,1.5);g.restore()}
 g.font='800 6px system-ui';const w=g.measureText(B.txt).width+8,bx=Math.max(6,Math.min(W-w-6,B.x-w/2)),by=Math.max(14,B.y-38);
 g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.roundRect(bx+1,by+1.5,w,11,4);g.fill();g.fillStyle='#fff';g.beginPath();g.roundRect(bx,by,w,11,4);g.fill();
 g.beginPath();g.moveTo(B.x-2,by+11);g.lineTo(B.x,by+15);g.lineTo(B.x+2,by+11);g.fill();g.fillStyle='#c0392b';g.textAlign='center';g.textBaseline='middle';g.fillText(B.txt,bx+w/2,by+5.8);g.restore()}catch(e){}};
}catch(e){console.warn('P202',e)}})();
</script>
