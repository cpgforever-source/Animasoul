/* Playable chapters extend the existing simulation and save format. */
(() => {
  'use strict';
  const C = AnimaCore, V = AnimaContent, A = Anima, P = AnimaSpirit;
  const pick = (id, label) => ({id, label});
  const places = {
    ancient: {sound:'Antes de ver um rosto, você ouve o gotejar de um canal. Alguém torce um pano fresco e o pousa na sua testa.', morning:'o sol alcança as vasilhas de barro no pátio', task:'separar os juncos mais retos', trade:'Há uma roda de oleiro para aprender a mover e, junto ao canal, um escriba que aceita ensinar depois do trabalho.', walk:'A água desce um degrau entre as hortas. Do outro lado do canal, uma porta acaba de abrir.', object:'uma tigela de barro', landmark:'o caminho dos canais'},
    medieval: {sound:'Chove nas telhas de ardósia. Entre duas badaladas, uma voz para de cantar para escutar a sua respiração.', morning:'a primeira carroça sacode as pedras da rua', task:'separar as maçãs que ainda estão boas', trade:'Na oficina da vila, a bancada mais baixa ficou livre. Um mestre da feira também oferece lições quando as portas se fecham.', walk:'As bancas recolhem os toldos. A rua cheira a pão tostado, e alguém chama de dentro de uma oficina.', object:'uma maçã embrulhada em linho', landmark:'a ponte da feira'},
    maritime: {sound:'A maré bate nos pilares da casa. Quando uma corda estala no cais, duas mãos cobrem suas orelhas até que passe o susto.', morning:'a maré descobre os degraus do cais', task:'desatar os nós de uma rede pequena', trade:'Quem conserta os barcos precisa de mãos pacientes. O escrivão do cais deixa sua porta aberta depois da descarga.', walk:'O cais cheira a corda molhada. As gaivotas acompanham uma embarcação que acaba de entrar na enseada.', object:'uma pequena concha lisa', landmark:'os degraus do cais'},
    industrial: {sound:'O primeiro trem passa antes do amanhecer. O vidro da janela vibra. Uma mão, aquecida junto ao fogão, se fecha em torno da sua.', morning:'o apito da estação acorda os quintais', task:'separar os botões de um casaco', trade:'A oficina de reparos precisa de uma pessoa aprendiz. Há também uma turma que se reúne à noite, no antigo armazém.', walk:'Uma nuvem de vapor atravessa a plataforma. No intervalo entre dois trens, dá para ouvir as conversas do outro lado dos trilhos.', object:'um botão de madrepérola', landmark:'a escada da estação'}
  };
  const place = s => places[s.life?.setting] || places.medieval;
  const historic = s => s.lives.slice().reverse().find(l => l.legacyTrace && l.legacyTrace !== 'kept');
  const traces = {
    shelter:'um caderno com nomes de famílias acolhidas durante uma enchente',
    route:'um desenho que ensina a reconhecer a passagem segura quando a água sobe',
    marks:'uma folha com as marcas de nível copiadas de uma velha parede',
    students:'um caderno copiado a várias mãos, com espaço nas margens para correções',
    archive:'um pequeno inventário público, anotado por gente do bairro',
    school:'uma cartilha para ensinar a assinar o próprio nome', registry:'uma lista de famílias que puderam testemunhar umas pelas outras', chest:'um estojo com papéis de quem precisou recomeçar longe de casa'
  };
  const books = {
    chapter_flood(s) {
      const h=historic(s);
      const note=h&&traces[h.legacyTrace]?'No posto de passagem você encontra '+traces[h.legacyTrace]+'. O papel veio de '+h.place+' e ninguém ali sabe dizer quem o escreveu.':'O degrau mais baixo desapareceu. Uma criança deixou ali o par de sapatos enquanto ajudava a mãe a carregar um saco.';
      if(s.life.number%2===0){
        const proof=h&&traces[h.legacyTrace]?'Entre os papéis da hospedaria há '+traces[h.legacyTrace]+'. Veio de '+h.place+'. Para você, a letra é de alguém que nunca conheceu.':'Na hospedaria, uma mulher abre uma caixa forrada com tecido. O espaço de um documento está vazio.';
        return ['Um nome sem papel',proof+'\n\nUma família recém-chegada precisa assinar o livro para ter onde passar a noite. A mulher conhece as letras do seu nome, mas sua mão treme quando o porteiro aproxima a pena.',[pick('lesson','Sentar ao lado dela e praticar a assinatura em um retalho.'),pick('witness','Chamar quem viajou com a família para testemunhar.'),pick('safekeep','Oferecer um lugar para guardar os papéis que restaram.')]];
      }
      return ['A marca da água', note+'\n\nA chuva parou, mas o rio continua subindo. Uma família precisa de um lugar seco. Na margem oposta, outra espera saber por onde atravessar antes da noite.',[pick('shelter','Abrir a sala de casa para quem precisa dormir.'),pick('route','Percorrer a margem alta e desenhar a passagem.'),pick('marks','Anotar até onde a água chegou, para quem vier depois.')]];
    },
    chapter_archive(s) {
      const chosen=s.life.legacyTrace;
      if(s.life.number%2===0){
        const memory=chosen==='lesson'?'Aquela assinatura incerta agora aparece, firme, no rodapé de uma carta.':chosen==='witness'?'O livro da hospedaria voltou com os nomes de seis testemunhas.':'A caixa de papéis permaneceu bem fechada. Hoje uma filha vem buscar o documento da mãe.';
        return ['As letras de outra mão',memory+'\n\nGente nova chega toda semana. Quem cuida da hospedaria pergunta se há algo que possam deixar pronto para a próxima família.',[pick('school','Abrir a sala uma tarde por semana para ensinar a escrever.'),pick('registry','Organizar um registro de testemunhas do bairro.'),pick('chest','Consertar o armário e entregar uma chave a cada família.')]];
      }
      const opening=chosen==='shelter'?'Uma das crianças que se abrigaram na sua sala volta já adulta. Traz a lista de nomes que a mãe guardou durante a enchente.':chosen==='route'?'Seu desenho da passagem reaparece nas mãos de uma jovem. Há correções a lápis em três pontos onde o rio mudou de curso.':chosen==='marks'?'Uma moça reconhece suas anotações sobre a cheia. Ela acrescentou, ano após ano, uma nova linha às suas.':'Uma jovem bate à porta com um caderno que passou de casa em casa. Há marcas de chuva nas primeiras folhas.';
      return ['O caderno que voltou',opening+'\n\n“Quando este papel se desfizer, quem vai saber ler o rio?” Ela pousa o caderno na mesa. Não tem dinheiro para mandar copiá-lo.',[pick('students','Reunir aprendizes para fazer e corrigir cópias.'),pick('archive','Levar o caderno ao acervo público da região.'),pick('kept','Guardar o original até poder preservá-lo melhor.')]];
    },
    chapter_letter(s) {
      const shared=s.life.legacyTrace!=='kept';
      if(s.life.number%2===0){
        const imprint={school:'Uma antiga aluna lhe trouxe um bilhete. Foi escrito pelo primeiro neto que ela ensinou a ler.',registry:'Uma mulher chega com a folha onde o bairro reconheceu sua família. A lista passou por três gerações.',chest:'Uma família volta para devolver a chave. O armário já tem muitas marcas, mas a fechadura ainda gira.'};
        return ['A porta da hospedaria',(imprint[s.life.legacyTrace]||'Uma pessoa com quem você cruzou na hospedaria volta para lhe fazer uma visita.')+'\n\nNa soleira, a conversa dura até as sombras crescerem. Antes de ir, a visita pergunta o que você gostaria de deixar naquela casa.',[pick('dedication','Escrever algumas palavras para quem chegar depois.'),pick('listen_house','Pedir para ouvir a história da família até o fim.'),pick('rest_house','Guardar a lembrança e descansar junto à porta.')]];
      }
      return ['A carta dobrada',shared?'Chega uma carta com três caligrafias diferentes. Na margem do rio, alguém usou as anotações que você ajudou a preservar. Uma das crianças quis lhe escrever de próprio punho.':'Ao arrumar uma gaveta, você reencontra o caderno. Entre as folhas, uma criança guardou uma flor que já perdeu a cor. Há espaço para uma última anotação.',[pick('answer','Contar por escrito o que ainda lembra daquela noite.'),pick('visit','Levar o caderno até a margem e ouvir quem vive lá.'),pick('quiet','Dobrar o papel e passar a tarde em silêncio.')]];
    }
  };
  const consequences={
    lesson:['care','Você ajudou uma viajante a ensaiar a própria assinatura.','Na vez seguinte, ela pediu o livro por iniciativa própria e escreveu sem precisar de testemunha.'],
    witness:['help','Você reuniu os companheiros da viagem para testemunhar.','O porteiro abriu um lugar no livro para anotar os nomes de quem podia reconhecer uma família.'],
    safekeep:['care','Você guardou os papéis que sobreviveram à viagem.','Uma filha pôde recuperar o documento da mãe quando precisou dele.'],
    school:['legacy','Você abriu uma sala de escrita na hospedaria.','Uma das alunas passou a ensinar seus filhos depois do jantar.'],
    registry:['legacy','Você organizou o registro de testemunhas do bairro.','Um novo morador foi reconhecido por duas pessoas cujos nomes estavam naquele registro.'],
    chest:['legacy','Você recuperou o armário de documentos da hospedaria.','Os papéis de viagem sobreviveram a uma mudança de endereço.'],
    dedication:['legacy','Você deixou uma dedicatória no livro de chegadas.','Uma pessoa leu suas palavras na primeira noite longe de casa.'],
    listen_house:['care','Você escutou a história da família até o fim.','A pessoa que contou a história decidiu registrá-la para os próprios filhos.'],
    rest_house:['rest','Você passou a tarde junto à porta da hospedaria.','As visitas se lembraram do banco onde podiam sentar em silêncio.'],
    shelter:['care','Você abriu sua casa às famílias da margem.','Duas famílias dormiram em segurança naquela noite. Uma delas guardou os nomes de quem estava ali.'],
    route:['legacy','Você traçou a passagem pela margem alta.','Uma barqueira usou o desenho para conduzir um grupo até terra firme.'],
    marks:['legacy','Você registrou a altura da enchente.','Uma jovem começou a registrar as cheias seguintes, ao lado da primeira marca.'],
    students:['legacy','Aprendizes fizeram cópias do caderno da margem.','As cópias circularam. Anotações de mãos diferentes corrigiram um trecho que já não era seguro.'],
    archive:['legacy','Você confiou o caderno ao acervo da região.','As folhas ganharam abrigo. Uma cópia chegou a uma comunidade rio abaixo.'],
    kept:['choice','Você guardou o caderno para protegê-lo.','O original se conservou. Durante um inverno, a comunidade teve de se orientar por relatos falados.'],
    answer:['legacy','Você escreveu à margem da carta.','Alguém leu sua resposta em voz alta para uma criança.'],
    visit:['care','Você voltou à margem para ouvir os moradores.','Uma moradora contou pela primeira vez por que havia saído de casa naquela noite.'],
    quiet:['rest','Você reservou a tarde para ficar em silêncio.','A carta permaneceu dobrada entre suas coisas.']
  };
  const originalScene=V.scene;
  function scene(s) {
    if(books[s.scene]){
      const [title,text,options]=books[s.scene](s);
      return {title,text,options,presented:options,phase:s.phase,alert:null};
    }
    const v=originalScene(s), l=s.life;
    if(!l)return v;
    const e=place(s), person=l.npcs.family.name, colleague=l.npcs.colleague.name;
    if(s.scene==='child'&&l.month===0){
      v.title='O primeiro fôlego';
      v.text=e.sound+'\n\n“'+l.name+'.” '+person+' experimenta o som do seu nome. Você abre os dedos e segura um dos dela.';
      v.options=v.presented=[pick('observe_childhood','Acompanhar os primeiros anos')];
    }else if(s.scene==='child'){
      v.title='Do lado de fora';
      v.text='Você tem seis anos e já sabe quando '+e.morning+'. Hoje, '+person+' lhe pede ajuda para '+e.task+'.\n\nDo outro lado da porta, alguém chama para brincar. Um vizinho acompanha a rua da soleira, com a cabeça baixa.';
    }else if(s.scene==='trade'){
      v.title='Uma bancada livre';
      const history=l.pathHistory||[], past=history.findLast(x=>x.scene==='child')?.id;
      const callbacks={learn:'Você ainda se lembra da primeira vez em que lhe deixaram fazer perguntas durante o trabalho.',help_child:'Em casa, já contam com suas mãos nas pequenas tarefas.',comfort_child:'O vizinho ainda acena da soleira, como naquela manhã.',play:'As crianças com quem você brincava começam a passar as manhãs nas oficinas.',refuse_child:'Agora é você quem decide a que vai dedicar as manhãs.'};
      v.text=(callbacks[past]||'Os anos mudaram o tamanho das coisas. Hoje você já alcança a bancada.')+'\n\n'+e.trade;
    }else if(s.scene==='choice'){
      v.title='Três moedas a mais';
      v.text='O pagamento chega no fim da tarde. Na sua mão há três moedas a mais. Ao lado, '+colleague+' conta a própria parte duas vezes e volta a apalpar os bolsos.\n\nQuem fez a divisão já está fechando a porta.';
    }else if(s.scene==='encounter'){
      v.title='Um gesto conhecido';
      v.text='O salário de '+colleague+' veio curto. A pessoa que fez o pagamento já desce a rua. Você reconhece o som de alguém recontando moedas antes mesmo de se virar.\n\n'+colleague+' hesita junto à porta. Ainda dá tempo de alcançar quem pode conferir as contas.';
    }else if(s.scene==='hub'&&!l.society.detention){
      v.title='Um dia em '+l.place.replace(/^(Margens de |Vila de |Enseada de |Estação de |Vale de |Porto de )/,'');
      const recent=C.truth(s).filter(event=>['honesty','harm','repair','care','study','practice','legacy','work','talk','choice'].includes(event.type)).at(-1);
      v.text=(recent?recent.text+'\n\n':'')+e.walk;
    }else if(s.scene==='family'){
      v.title='Mais um lugar à mesa';
      v.text=person+' ajeita duas cadeiras, embora a refeição já tenha acabado. Há '+e.object+' sobre a mesa. “Você pode ficar mais um pouco?”';
    }else if(s.scene==='last'){
      v.title='A última visita';
      v.text='Uma pessoa que aprendeu com você puxa uma cadeira para perto da janela. Lá fora, '+e.morning+'. “Qual foi a coisa que você levou mais tempo para aprender?”\n\nEla deixa a pergunta descansar entre vocês.';
    }else if(s.scene==='death'){
      v.title='Quando a casa silencia';
      v.text='Por um instante você ainda distingue os ruídos de '+l.place+'. Depois, até o som mais próximo parece vir de outra sala.';
    }
    if(s.phase!=='material')v.presented=v.options;
    return v;
  }
  V.scene=scene;
  function resolve(s,action){
    if(!books[s.scene])return false;
    const entry=consequences[action];
    if(!entry)return false;
    if(s.scene!=='chapter_letter')s.life.legacyTrace=action;
    C.fact(s,entry[0],entry[1],entry[2]);
    s.life.chaptersDone=[...new Set([...(s.life.chaptersDone||[]),s.scene])];
    s.scene='hub';return true;
  }
  const milestones=[{age:28,id:'chapter_flood'},{age:44,id:'chapter_archive'},{age:60,id:'chapter_letter'}];
  function next(s){return milestones.find(m=>!(s.life.chaptersDone||[]).includes(m.id)&&m.age*12<s.life.deathMonth);}
  function travel(input){
    if(input.phase!=='material'||input.scene!=='hub')return {status:'rejected',state:input};
    const mark=next(input), goal=mark?Math.max(input.life.month,mark.age*12):input.life.deathMonth;
    let s=input;
    for(let guard=0;guard<2200;guard++){
      if(books[s.scene]||s.scene==='death'||s.scene==='last'||s.phase!=='material')break;
      if(s.scene==='hub'&&s.life.month>=goal&&mark)break;
      let id;
      if(s.scene==='hub'){
        const remaining=Math.max(1,goal-s.life.month);
        id='advance'+([60,12,6,1].find(n=>n<=remaining)||1);
      }else{
        const available=V.scene(s).options;
        id=C.rank(s,available)[0]?.id;
      }
      if(!id)break;
      const r=A.apply(s,{version:s.version,id:'passagem-'+s.seed+'-'+s.version,action:id});
      if(r.status!=='accepted')break;
      s=r.state;
    }
    if(mark&&s.scene==='hub'&&s.life.month>=goal){
      s=C.fork(s);s.scene=mark.id;s.version++;s.seen.push('marco-'+s.seed+'-'+s.version);
      s.life.latestAlert=null;
    }
    return {status:'accepted',state:s};
  }
  const fullRecord=P.record;
  P.fullRecord=fullRecord;
  P.record=s=>{
    if(s.life.edition!==18)return fullRecord(s);
    const facts=C.truth(s);
    const groups=[
      facts.filter(e=>['birth','childhood'].includes(e.type)),
      facts.filter(e=>['harm','honesty','repair','apology','help'].includes(e.type)&&(!e.text.includes('caravana'))).slice(0,3),
      facts.filter(e=>Object.values(consequences).some(c=>c[1]===e.text)),
      facts.filter(e=>['legacy','death'].includes(e.type)&&!Object.values(consequences).some(c=>c[1]===e.text)).slice(-2)
    ];
    const pages=groups.filter(group=>group.length).map(group=>({type:'chapter',truth:group.map(e=>e.truth).join('\n\n')}));
    return pages.concat(fullRecord(s).filter(e=>['mission_review','missionary_review'].includes(e.type)));
  };
  window.AnimaJourney={resolve,travel,next,places,chronicle:s=>C.truth(s)};
})();
