/* Anima Soul — local progressive literary narration; no network dependency. */
(function narrator(root){
'use strict';
const speeds={slow:165,normal:95,fast:45,instant:0};
function create(config={}){
 const schedule=config.schedule||((f,t)=>setTimeout(f,t)),cancel=config.cancel||clearTimeout;
 let handle=null,active=null;
 const stop=()=>{if(handle!==null)cancel(handle);handle=null;active=null;};
 function play({text,key,speed='normal',onText,onDone,start=0}){
  stop();const parts=String(text||'').match(/\S+\s*|\s+/g)||[];let i=Math.min(parts.length,Math.max(0,start)),out=parts.slice(0,i).join('');
  let run={key,get index(){return i},finish:()=>{if(active!==run)return;if(handle!==null)cancel(handle);handle=null;i=parts.length;out=parts.join('');onText(out,i);active=null;onDone();}};
  active=run;
  const tick=()=>{handle=null;if(active!==run)return;if(i>=parts.length){run.finish();return;}const word=parts[i++];out+=word;onText(out,i);if(i===parts.length){active=null;onDone();return;}const base=speeds[speed]??speeds.normal;const end=word.trimEnd();const pause=/\n\s*\n/.test(word)?base*3:/[.!?…]$/.test(end)?base*2.5:/[,;:]$/.test(end)?base*1.4:0;handle=schedule(tick,base+pause);};
  if(speed==='instant'||!parts.length||i===parts.length){run.finish();return run;}
  onText(out,i);tick();return run;
 }
 return {play,stop,finish:()=>active?.finish(),get active(){return !!active}};
}
root.AnimaNarration={create,speeds};
})(globalThis);
