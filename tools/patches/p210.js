<script>/* P210: dźwięki otoczenia – różne ptaki (kos, zięba, kukułka, dzięcioł, wrony), Street: wróble, gołębie, szum miasta, pociąg; kaczki przy wodzie */
(function(){try{
const env=(C,t,a,d,r,v)=>{const g=C.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+a);g.gain.setValueAtTime(v,t+a+d);g.gain.exponentialRampToValueAtTime(.0001,t+a+d+r);return g};
function osc(C,out,t,type,f0,f1,dur,v,a){const o=C.createOscillator(),g=env(C,t,a||.01,Math.max(0,dur-(a||.01)-.03),.03,v);o.type=type;o.frequency.setValueAtTime(f0,t);if(f1)o.frequency.exponentialRampToValueAtTime(f1,t+dur);o.connect(g);g.connect(out);o.start(t);o.stop(t+dur+.06)}
let NB=null;function nb(C){if(NB&&NB.sampleRate==C.sampleRate)return NB;const b=C.createBuffer(1,C.sampleRate*2,C.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;NB=b;return b}
function nz(C,out,t,dur,type,f,q,v,f2){const s=C.createBufferSource();s.buffer=nb(C);const fl=C.createBiquadFilter();fl.type=type;fl.frequency.setValueAtTime(f,t);if(f2)fl.frequency.exponentialRampToValueAtTime(f2,t+dur);fl.Q.value=q;const g=env(C,t,.01,Math.max(0,dur-.04),.03,v);s.connect(fl);fl.connect(g);g.connect(out);s.start(t,Math.random());s.stop(t+dur+.05)}
const pan=(C,out,p)=>{try{const P=C.createStereoPanner();P.pan.value=p;P.connect(out);return P}catch(e){return out}};
const R=(a,b)=>a+Math.random()*(b-a);
const S={
 blackbird(C,out,t){/* kos: melodyjne frazy */const n=5+(Math.random()*5|0);let tt=t;for(let i=0;i<n;i++){const f=R(1500,2900),d=R(.08,.2);osc(C,out,tt,'sine',f,f*R(.85,1.25),d,.035,.02);tt+=d+R(.02,.07)}},
 finch(C,out,t){/* zięba: szybki tryl zakończony zawijasem */const n=8+(Math.random()*5|0),f=R(4200,5200);for(let i=0;i<n;i++)osc(C,out,t+i*.065,'sine',f*(1-i*.012),f*(1-i*.012)*.9,.05,.022);osc(C,out,t+n*.065+.03,'sine',f*.75,f*1.1,.18,.025,.02)},
 robin(C,out,t){/* rudzik: wysokie, opadające nutki */let tt=t;for(let i=0;i<6;i++){const f=R(3500,6000);osc(C,out,tt,'sine',f,f*R(.7,1.1),R(.06,.14),.018,.01);tt+=R(.1,.2)}},
 cuckoo(C,out,t){osc(C,out,t,'sine',690,660,.28,.045,.04);osc(C,out,t+.36,'sine',560,540,.4,.045,.04)},
 woodpecker(C,out,t){const n=14+(Math.random()*8|0);for(let i=0;i<n;i++)nz(C,out,t+i*.055,.025,'bandpass',1300,3,.06*(1-i/n*.5))},
 crow(C,out,t){const n=2+(Math.random()*2|0);for(let i=0;i<n;i++){const tt=t+i*.42,o=C.createOscillator(),fl=C.createBiquadFilter(),g=env(C,tt,.02,.2,.08,.03);o.type='sawtooth';o.frequency.setValueAtTime(R(560,640),tt);o.frequency.linearRampToValueAtTime(R(420,480),tt+.3);fl.type='bandpass';fl.frequency.value=1300;fl.Q.value=1.4;o.connect(fl);fl.connect(g);g.connect(out);o.start(tt);o.stop(tt+.35)}},
 sparrow(C,out,t){const n=3+(Math.random()*5|0);for(let i=0;i<n;i++){const f=R(3800,5000);osc(C,out,t+i*R(.12,.22),'sine',f,f*1.15,.06,.02)}},
 pigeon(C,out,t){for(let i=0;i<3;i++){const tt=t+i*.5,o=C.createOscillator(),lfo=C.createOscillator(),lg=C.createGain(),g=env(C,tt,.08,.25,.12,.04);o.type='sine';o.frequency.value=R(330,360);lfo.frequency.value=9;lg.gain.value=25;lfo.connect(lg);lg.connect(o.frequency);o.connect(g);g.connect(out);o.start(tt);lfo.start(tt);o.stop(tt+.5);lfo.stop(tt+.5)}},
 duck(C,out,t){const n=2+(Math.random()*3|0);for(let i=0;i<n;i++){const tt=t+i*.24,o=C.createOscillator(),fl=C.createBiquadFilter(),g=env(C,tt,.01,.1,.05,.035);o.type='sawtooth';o.frequency.setValueAtTime(R(520,600),tt);o.frequency.exponentialRampToValueAtTime(380,tt+.15);fl.type='bandpass';fl.frequency.value=1100;fl.Q.value=2.2;o.connect(fl);fl.connect(g);g.connect(out);o.start(tt);o.stop(tt+.2)}},
 horn(C,out,t){osc(C,out,t,'sawtooth',415,415,.35,.012,.02);osc(C,out,t,'sawtooth',520,520,.35,.008,.02)},
 train(C,out,t){/* przejazd pociągu: dudnienie + stukot + sygnał */nz(C,out,t,6,'lowpass',160,.7,.09);for(let i=0;i<24;i++)nz(C,out,t+.4+i*.22+(i%2)*.08,.05,'bandpass',900,2,.035);osc(C,out,t+.3,'square',330,330,.9,.012,.05);osc(C,out,t+.3,'square',392,392,.9,.009,.05)}
};
window.__AMB=S;
/* zastąp prosty ćwierk różnymi ptakami */
const ctxOK=()=>{const C=SND.ctx;return C&&SND.on&&C.state=='running'?C:null};
const city=()=>{try{const h=holes[hi];return !!(h&&(h.sw||h.urb))}catch(e){return false}};
const ob=sfx.bird;sfx.bird=function(){const C=ctxOK();if(!C)return;const t=C.currentTime,o=pan(C,SND.m,R(-.8,.8));if(city()){S.sparrow(C,o,t);return}const au=season=='autumn',r=Math.random();
 if(!au&&r<.06)S.cuckoo(C,pan(C,SND.m,R(-.9,.9)),t);else if(r<.16)S.woodpecker(C,o,t);else if(au&&r<.32)S.crow(C,o,t);else if(r<.5)S.finch(C,o,t);else if(r<.72)S.blackbird(C,o,t);else S.robin(C,o,t)};
/* zima, miasto, pociąg, kaczki – własny zegar */
let nW=0,nC=0,nH=0,nD=0,trOn=false,hum=null;const water=h=>!!((h.rivers&&h.rivers.length)||(h.water&&h.water.length)||(h.U&&(h.U.lake||h.U.ducks)));
setInterval(()=>{try{const C=ctxOK(),h=holes&&holes[hi],now=performance.now();const want=!!(C&&playing&&h&&!document.hidden);
 const ct=want&&city();if(ct&&!hum&&C){const s=C.createBufferSource();s.buffer=nb(C);s.loop=true;const fl=C.createBiquadFilter();fl.type='lowpass';fl.frequency.value=280;const g=C.createGain();g.gain.value=0;s.connect(fl);fl.connect(g);g.connect(SND.m);s.start();hum={s,g}}
 if(hum){hum.g.gain.setTargetAtTime(ct?.035:0,(SND.ctx||{}).currentTime||0,.6);if(!ct&&hum.g.gain.value<.002){try{hum.s.stop()}catch(e){}hum=null}}
 if(!want)return;const t=C.currentTime;
 if(season=='winter'&&!ct&&now>nW){nW=now+9000+Math.random()*12000;(Math.random()<.65?S.crow:S.woodpecker)(C,pan(C,SND.m,R(-.8,.8)),t)}
 if(ct){if(now>nC){nC=now+7000+Math.random()*9000;S.pigeon(C,pan(C,SND.m,R(-.7,.7)),t)}if(now>nH){nH=now+25000+Math.random()*30000;S.horn(C,pan(C,SND.m,R(-.9,.9)),t)}
  const on=!!(window.__trainOn&&window.__trainOn(h));if(on&&!trOn)S.train(C,pan(C,SND.m,-.3),t);trOn=on}
 if(season!='winter'&&water(h)&&now>nD){nD=now+14000+Math.random()*16000;S.duck(C,pan(C,SND.m,R(-.8,.8)),t)}
}catch(e){}},400);
}catch(e){console.warn('P210',e)}})();
</script>
