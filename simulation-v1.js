/* Anima Soul — isolated procedural simulation foundation v1; not connected to production UI. */
(function(root) {
'use strict';
const DAY=1440,YEAR=365*DAY;
const eras=[
 {id:'ancient',places:['Margens de Néria','Vale de Aram'],jobs:['oleiro','agricultor','pescador'],sites:['horta','oficina','mercado']},
 {id:'medieval',places:['Vila de Lúmen','Vale de Edras'],jobs:['carpinteiro','tecelão','agricultor'],sites:['oficina','feira','escola comunitária']},
 {id:'maritime',places:['Enseada de Néria','Porto de Varen'],jobs:['pescador','artesão','comerciante'],sites:['cais','mercado','oficina']},
 {id:'industrial',places:['Estação de Lúmen','Vale de Orin'],jobs:['operário','costureiro','ferroviário'],sites:['oficina','mercado','escola']}
];
const names=['Ari','Lia','Noa','Ivo','Mira','Nilo','Lena','Téo','Eva','Dara','Rui','Iara','Caio','Nara','Elio','Mila'];
const clone=x=>JSON.parse(JSON.stringify(x));
const rand=s=>{s.rng=(Math.imul(s.rng,1664525)+1013904223)>>>0;return s.rng/4294967296};
const int=(s,a,b)=>a+Math.floor(rand(s)*(b-a+1));
const pick=(s,a)=>a[int(s,0,a.length-1)];
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const age=s=>Math.floor(s.clock/YEAR);
const stage=s=>age(s)<2?'bebê':age(s)<6?'primeira infância':age(s)<12?'infância':age(s)<18?'adolescência':age(s)<65?'vida adulta':'velhice';
const hour=s=>Math.floor(s.clock%DAY/60);
const day=s=>Math.floor(s.clock/DAY);
const stamp=s=>({day:day(s),minute:s.clock%DAY,age:age(s)});
const fact=(s,type,text,extra={})=>{const f={id:s.log.length+1,...stamp(s),type,text,...extra};s.log.push(f);s.last=text;return f};
const person=(s,role,years,job)=>({id:'p'+(++s.serial),name:pick(s,names),role,ageDays:years*365+int(s,0,364),alive:true,occupation:job,health:int(s,65,100),bond:role==='responsável'?int(s,30,80):int(s,5,40),memory:[],temperament:pick(s,['reservado','sociável','impaciente','paciente']),funds:int(s,0,12)});
const living=s=>s.people.filter(p=>p.alive);
const carers=s=>living(s).filter(p=>p.role==='responsável');
const era=s=>eras.find(e=>e.id===s.world.era);
const inDay=s=>hour(s)>=7&&hour(s)<19;
const make=(seed)=>{
 if(!Number.isInteger(seed)||seed<0||seed>0xffffffff)throw Error('Seed inválida');
 const s={schema:1,seed,rng:seed,revision:0,clock:0,serial:0,alive:true,world:{},people:[],player:{name:'',health:100,energy:100,knowledge:{},money:0,occupation:null},household:{funds:0},location:'casa',log:[],pending:null,used:{},last:'',prayers:[],commands:[]};
 const e=pick(s,eras);s.world={era:e.id,place:pick(s,e.places),economy:int(s,70,125),harvest:int(s,70,125),year:int(s,100,900),population:int(s,200,18000)};
 s.player.name=pick(s,names);s.player.health=int(s,72,100);s.household.funds=int(s,0,80);
 const count=rand(s)<.16?1:2;for(let i=0;i<count;i++)s.people.push(person(s,'responsável',int(s,18,45),pick(s,e.jobs)));
 for(let i=0,n=int(s,0,3);i<n;i++)s.people.push(person(s,'irmão',int(s,1,12),null));
 if(rand(s)<.35)s.people.push(person(s,'familiar',int(s,45,70),pick(s,e.jobs)));
 for(let i=0;i<3;i++)s.people.push(person(s,'vizinho',int(s,8,65),pick(s,e.jobs)));
 fact(s,'birth','Você nasceu em '+s.world.place+'.',{people:s.people.filter(p=>p.role!=='vizinho').map(p=>p.id)});
 return s;
};
const option=(s,key,label,minutes=0,extra={})=>({id:key,label,minutes,token:s.revision+':'+key,...extra});
const dailyOnce=(s,k)=>s.used[k]!==day(s);
const near=s=>s.location==='casa'?living(s).filter(p=>p.role!=='vizinho'):living(s).filter(p=>p.role==='vizinho');
const choices=s=>{
 if(!s.alive)return [];
 const a=age(s),o=(k,l,m,x)=>option(s,k,l,m,x);
 if(s.pending)return s.pending.options.map(x=>o(x.id,x.label,x.minutes));
 let out=[];
 if(a<2){if(dailyOnce(s,'observe'))out.push(o('observe','Perceber o que acontece ao redor',15));}
 else {
  if(s.player.energy<95)out.push(o('rest','Descansar',60));
  if(s.location==='casa'&&dailyOnce(s,'play')&&a<18)out.push(o('play','Brincar',45));
  if(s.location==='casa'&&a>=6&&dailyOnce(s,'help')&&inDay(s)&&carers(s).length)out.push(o('help','Ajudar nas tarefas de casa',60));
  if(a>=6&&inDay(s)&&s.player.energy>=20){
   if(s.location==='casa')era(s).sites.forEach(p=>out.push(o('go:'+p,'Ir até '+p,20)));
   else {
    out.push(o('home','Voltar para casa',20));
    if(dailyOnce(s,'learn:'+s.location))out.push(o('learn','Observar e aprender neste lugar',45));
    if(a>=14&&dailyOnce(s,'work')&&['oficina','horta','cais','mercado','feira'].includes(s.location))out.push(o('work',a<18?'Ajudar no trabalho':'Procurar trabalho remunerado',120));
   }
  }
  if(s.location!=='casa'&&!out.some(x=>x.id==='home'))out.push(o('home','Voltar para casa',20));
  for(const p of near(s))if(inDay(s)&&dailyOnce(s,'talk:'+p.id))out.push(o('talk:'+p.id,'Conversar com '+p.name,20));
 }
 if(a>=6)out.push(o('pray','Orar',5,{floating:true}));
 if(s.location==='casa')out.push(o('sleep','Acompanhar até a próxima manhã',0));
 return out;
};
function trigger(s){
 if(s.pending||!s.alive)return;
 const a=age(s),people=carers(s);
 if(a<6||s.location!=='casa')return;
 const p=people.length?pick(s,people):null;
 if(!p)return;
 if(s.household.funds<5&&rand(s)<.12){
  s.pending={id:'shortage:'+day(s),person:p.id,text:p.name+' conta as moedas restantes e diz que os mantimentos estão acabando.',options:[{id:'event:help',label:'Oferecer ajuda para encontrar uma solução',minutes:30},{id:'event:listen',label:'Escutar o que aconteceu',minutes:20},{id:'event:leave',label:'Não se envolver neste momento',minutes:5}]};
 }else if(rand(s)<.025){
  s.pending={id:'opportunity:'+day(s),person:p.id,text:p.name+' recebeu notícia de uma oportunidade de aprender um ofício e quer conversar.',options:[{id:'event:learn',label:'Pedir mais informações',minutes:20},{id:'event:listen',label:'Ouvir sem assumir compromisso',minutes:15},{id:'event:leave',label:'Deixar para outro momento',minutes:5}]};
 }
 if(s.pending)fact(s,'event',s.pending.text,{event:s.pending.id});
}
function daily(s){
 s.player.energy=clamp(s.player.energy+20,0,100);
 if(day(s)%30===0){s.world.economy=clamp(s.world.economy+int(s,-4,4),35,160);s.world.harvest=clamp(s.world.harvest+int(s,-6,6),30,160);}
 let income=0;
 for(const p of living(s)){
  p.ageDays++;
  if(p.occupation&&p.ageDays>=18*365&&p.health>30&&rand(s)<.7){p.funds++;if(p.role==='responsável')income+=1;}
  if(p.ageDays>=60*365&&rand(s)<.004)p.health=clamp(p.health-int(s,1,5),0,100);
  if(p.health===0||rand(s)<(p.ageDays>=75*365?.0006:.000012)){
   p.alive=false;fact(s,'loss',p.name+' faleceu.',{person:p.id});
  }
 }
 if(!carers(s).length&&age(s)<18){
  let p=living(s).find(x=>x.role==='familiar'&&x.ageDays>=18*365);
  if(!p){p=person(s,'responsável',int(s,25,60),pick(s,era(s).jobs));s.people.push(p);}
  p.role='responsável';fact(s,'care',p.name+' passou a assumir os cuidados da casa.',{person:p.id});
 }
 s.household.funds=Math.max(0,s.household.funds+income-(day(s)%2===0?1:0));
 if(s.household.funds===0&&rand(s)<.04)s.player.health=clamp(s.player.health-1,0,100);
 if(age(s)>=65&&rand(s)<.025)s.player.health=clamp(s.player.health-int(s,1,2),0,100);
 if(s.player.health===0||rand(s)<(age(s)<2?.000035:age(s)<65?.000007:age(s)<85?.00025:.002)){
  s.alive=false;s.pending=null;fact(s,'death','Sua existência material chegou ao fim.');return;
 }
 if(s.clock%YEAR===0)fact(s,'birthday','Você completou '+age(s)+' anos.');
 trigger(s);
}
function advance(s,minutes,interrupt=true){
 const end=s.clock+minutes;
 while(s.alive&&s.clock<end){
  const boundary=(day(s)+1)*DAY;
  s.clock=Math.min(end,boundary);
  if(s.clock===boundary){
   const n=s.log.length;daily(s);
   if(interrupt&&(s.pending||s.log.slice(n).some(f=>['loss','care','death','birthday'].includes(f.type))))break;
  }
 }
}
function view(s){
 const d=stamp(s);
 const intro=age(s)<2?'Vozes, movimentos e sensações ainda difíceis de distinguir.':s.location==='casa'?'Você está em casa. '+carers(s).map(p=>p.name+' vive nesta residência.').join(' '):'Você está em '+s.location+', em '+s.world.place+'.';
 return {revision:s.revision,age:age(s),stage:stage(s),day:d.day,minute:d.minute,alive:s.alive,location:s.location,place:s.world.place,era:s.world.era,text:s.pending?.text||s.last||intro,context:intro,options:choices(s),canCondense:s.alive&&!s.pending&&s.location==='casa',people:near(s).map(({id,name,role,bond})=>({id,name,role,bond})),journal:s.log.slice()};
}
function apply(input,cmd){
 const reject=reason=>({status:'rejected',reason,state:input});
 if(!cmd||cmd.revision!==input.revision||typeof cmd.token!=='string'||typeof cmd.id!=='string')return reject('Ação desatualizada.');
 if(input.commands.includes(cmd.id)||!input.alive)return reject('Ação indisponível.');
 const op=choices(input).find(o=>o.token===cmd.token);
 if(!op)return reject('Ação fora do contexto.');
 const s=clone(input),k=op.id;
 if(k==='pray'){s.prayers.push(stamp(s));fact(s,'prayer','Você reservou um momento para orar.');}
 else if(k==='observe'){s.used.observe=day(s);fact(s,'perception','Você percebeu '+(carers(s).length?'a voz de '+carers(s)[0].name:'sons próximos')+'.');}
 else if(k==='rest'){s.player.energy=clamp(s.player.energy+30,0,100);fact(s,'rest','Você descansou por um tempo.');}
 else if(k==='play'){s.used.play=day(s);s.player.energy=clamp(s.player.energy-8,0,100);fact(s,'play','Você brincou e experimentou novas formas de movimento.');}
 else if(k==='help'){s.used.help=day(s);s.player.energy=clamp(s.player.energy-10,0,100);const p=carers(s)[0];p.bond=clamp(p.bond+1,-100,100);fact(s,'help','Você ajudou '+p.name+' com as tarefas da casa.',{person:p.id});}
 else if(k.startsWith('go:')){s.location=k.slice(3);fact(s,'travel','Você chegou a '+s.location+'.');}
 else if(k==='home'){s.location='casa';fact(s,'travel','Você retornou para casa.');}
 else if(k==='learn'){const topic=s.location;s.used['learn:'+topic]=day(s);s.player.knowledge[topic]=(s.player.knowledge[topic]||0)+1;s.player.energy=clamp(s.player.energy-5,0,100);fact(s,'study','Você observou as atividades em '+topic+' e aprendeu algo sobre esse ambiente.',{topic});}
 else if(k==='work'){s.used.work=day(s);s.player.energy=clamp(s.player.energy-18,0,100);const wage=int(s,1,4);s.player.money+=wage;s.player.occupation=s.location;fact(s,'work','Você realizou uma tarefa em '+s.location+' e recebeu '+wage+' moedas.');}
 else if(k.startsWith('talk:')){const p=s.people.find(x=>x.id===k.slice(5));s.used[k]=day(s);p.bond=clamp(p.bond+1,-100,100);const f=fact(s,'talk',p.name+' conversou com você sobre '+(p.occupation?'seu trabalho.':'o dia.'),{person:p.id});p.memory.push(f.id);}
 else if(k.startsWith('event:')){const p=s.people.find(x=>x.id===s.pending.person);const event=s.pending.id;let text;
 if(k==='event:help'){p.bond=clamp(p.bond+2,-100,100);text='Vocês conversaram sobre a falta de mantimentos e combinaram procurar alternativas.';}
 else if(k==='event:learn'){s.player.knowledge.oficios=(s.player.knowledge.oficios||0)+1;text=p.name+' explicou o que sabia sobre a oportunidade.';}
 else if(k==='event:listen'){p.bond=clamp(p.bond+1,-100,100);text='Você escutou '+p.name+' até o fim.';}
 else text='Você deixou a conversa para outro momento.';
 const f=fact(s,'decision',text,{event,person:p.id});p.memory.push(f.id);s.pending=null;}
 else if(k==='sleep'){fact(s,'routine','Você acompanhou a rotina até a próxima manhã.');}
 else return reject('Ação sem implementação.');
 const outcome=s.last;
 advance(s,k==='sleep'?DAY-s.clock%DAY+7*60:op.minutes);
 s.revision++;s.commands.push(cmd.id);
 return {status:'accepted',state:s,outcome};
}
function condense(input,days,revision){
 if(revision!==input.revision||!input.alive||input.pending||input.location!=='casa'||!Number.isInteger(days)||days<1||days>365)return {status:'rejected',state:input,reason:'Passagem de tempo indisponível.'};
 const s=clone(input),before=s.clock;advance(s,days*DAY);const elapsed=s.clock-before;
 fact(s,'time','Transcorreram '+Math.floor(elapsed/DAY)+' dias e '+Math.floor(elapsed%DAY/60)+' horas de rotina.',{elapsed});
 s.revision++;return {status:'accepted',state:s,elapsed};
}
function save(s){return JSON.stringify(s);}
function load(raw){const s=JSON.parse(raw);if(s.schema!==1||!Number.isInteger(s.revision)||!Number.isInteger(s.clock)||s.clock<0||!Array.isArray(s.log)||!Array.isArray(s.people)||!Array.isArray(s.commands)||!eras.some(e=>e.id===s.world?.era))throw Error('Progresso inválido.');return s;}
root.AnimaSimulationV1={make,view,apply,condense,save,load};
})(globalThis);
