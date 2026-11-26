# Anima Soul — Experiência vivencial

## Diretriz central

A ação deve ser vivenciada, não apenas executada. O objetivo é experimentar uma existência humana e suas sensações, não percorrer menus de decisões.

## Contrato de resolução de ações

1. Validar a iniciativa contra o contexto, idade, localização, capacidade e estado do mundo.
2. Simular o desenvolvimento da atividade, incluindo os personagens presentes, o ambiente, suas reações e os acontecimentos possíveis.
3. Registrar fatos, efeitos e tempo efetivamente transcorrido no estado persistente.
4. Apresentar a experiência ao jogador antes de qualquer nova escolha: percepções sensoriais plausíveis, desenvolvimento, reação e resultado concreto. Evitar mensagens genéricas de confirmação.
5. Quando houver uma interação ainda em curso, apresentar apenas as possibilidades daquela interação, sem redirecionamento automático para um acontecimento principal.
6. Após conclusão, permitir continuar a rotina com as consequências preservadas. Navegação de interface não constitui escolha narrativa.

## Regras narrativas

- A narrativa emerge da simulação; não é um roteiro fixo. Pessoas, objetos, acontecimentos e consequências devem corresponder ao estado gerado. Sensações devem ser coerentes com idade, capacidades e contexto; não impor emoções, crenças ou julgamentos ao jogador.
- Nem toda atividade precisa gerar um conflito, teste moral, missão ou acontecimento extraordinário. O cotidiano tem valor próprio.
- Aprender significa entrar em contato com conhecimento concreto e utilizável; conversar implica conteúdo e reação individualizados; deslocar-se implica chegar a um ambiente que pode ser explorado.
- Uma interação pode exigir várias escolhas internas ou nenhuma escolha adicional. Não há limite artificial de ações.
- A oração é transversal e flutuante, sem menu dedicado nem benefícios explícitos. Não expor a cosmologia na narração.
- O retorno de uma ação deve permanecer acessível no diário quando relevante; novas ocorrências não devem apagar o resultado imediatamente.
- Períodos condensados também são experiências: simular mudanças e narrar fatos concretos, interrompendo diante de decisões relevantes.

## Critérios de aceitação

- Após cada ação significativa, o jogador consegue explicar o que vivenciou, o que ocorreu e o que mudou, quando houver mudanças.
- Repetições plausíveis respeitam histórico e contexto, sem copiar indefinidamente uma mesma cena nem inventar consequências não simuladas.
- Ações incompatíveis, concluídas ou fora do contexto não são oferecidas.
- A narrativa distingue percepção do personagem, fatos observáveis e consequências ainda desconhecidas.
- Testar cada atividade e seus desdobramentos isoladamente antes de expandir o catálogo.

Status: diretriz de implementação. O motor experimental atual ainda utiliza retornos resumidos e não satisfaz integralmente estes critérios.

## Cinco possibilidades em cada situação jogável — diretriz aprovada

- Apresentar sempre exatamente cinco opções narrativas válidas e contextuais em cada situação jogável. Não preencher vagas com navegação, ações impossíveis, duplicatas ou escolhas artificialmente relevantes. Controles de interface e oração flutuante ficam fora dessa contagem.
- As cinco opções não precisam progredir uma missão, produzir recompensa, alterar atributos ou gerar um dilema moral. Observar, contemplar, conversar, brincar, demonstrar afeto e compartilhar momentos cotidianos são experiências legítimas por si mesmas.
- A percepção de importância de uma vivência depende da idade, do contexto social, dos vínculos, da história e das circunstâncias da pessoa. Uma filha de costureira pode guardar a lembrança de estar ao lado da mãe trabalhando.
- Registrar memórias autobiográficas contextualizadas: pessoas presentes, circunstâncias, percepções e fatos vivenciados. Permitir que sejam evocadas posteriormente por associações coerentes, como reencontrar uma música ou um tecido, sem impor sentimentos ao jogador nem atribuir recompensas artificiais.
- A geração procedural deve compor cinco possibilidades a partir do ambiente e das capacidades atuais. Caso o catálogo não ofereça cinco possibilidades legítimas, aprofundar o catálogo e o contexto, não inventar opções incompatíveis.

Status: requisito de implementação, ainda não aplicado ao motor experimental.

## Saturação contextual e autonomia dos personagens — diretriz aprovada

- Não oferecer incessantemente a mesma ação. Distinguir atividades concluídas, atividades recorrentes, interações em curso e iniciativas que perderam viabilidade.
- Cada NPC possui disponibilidade, necessidades, fadiga, compromissos, limites pessoais, personalidade e memória. A repetição de uma interação pode alterar sua disposição ou fazê-lo encerrar a atividade por iniciativa própria.
- A disponibilidade é recalculada conforme o tempo, a situação, o relacionamento e a reação dos envolvidos; não impor um limite global de repetições nem um cooldown arbitrário.
- Renovar as cinco opções narrativas com alternativas genuínas e contextualizadas. Não preencher com duplicatas semânticas da mesma ação. Uma possibilidade esgotada poderá retornar quando as circunstâncias mudarem.
- A narrativa explica organicamente por que a situação mudou. Não punir automaticamente a demonstração de afeto nem transformar limites humanos em pontuação moral.
- Exemplo: após acolher a filha por algum tempo, uma costureira pode precisar liberar o braço para terminar uma encomenda. As opções passam a contemplar outras experiências possíveis naquele ambiente.
- O mundo e os NPCs seguem vivendo independentemente do jogador; a cena não permanece congelada enquanto o tempo avança.

Status: requisito de implementação; a amostragem anterior ainda permitia repetição excessiva.

## Narrador literário contínuo e imagens — direção aprovada

- Uma existência é uma narrativa contínua, não uma coleção de histórias ou descrições isoladas. Cada decisão deve continuar organicamente o parágrafo, diálogo ou acontecimento anterior.
- Usar linguagem literária envolvente, diálogos naturais, ritmo sem pressa, curiosidade e continuidade de vínculos. Não reiniciar a apresentação do ambiente após cada clique nem encerrar artificialmente cada interação.
- O motor procedural determina os fatos; o narrador os transforma em literatura sem inventar mudanças não simuladas, impor sentimentos ou criar um destino roteirizado.
- Associar imagens às situações e ações narradas. Preservar a identidade visual dos personagens, objetos, locais, época e continuidade entre cenas. Imagens complementam a narrativa, inclusive nos pequenos momentos cotidianos.
- Preservar a interface vertical aprovada em azul-noturno e prata, cinco opções contextuais e oração flutuante independente. Não expor a cosmologia por explicações diretas.
- Referência aprovada: uma filha pergunta sobre a melodia que sua mãe costureira cantarola. A resposta revela uma lembrança da avó e continua a conversa, despertando curiosidade sem transformar a experiência em missão.

Status: direção narrativa aprovada pelo usuário; implementação integral ainda pendente.

## Narrativa central e sistemas de RPG

Diretriz do usuário: a história é o principal, mas elementos mecânicos determinantes devem existir. O menu inferior deve incluir Ações e Inventário, preservando as funções previamente definidas. As cinco escolhas narrativas são distintas das iniciativas livres contextuais e da navegação. Abrir ou fechar uma interface não deve avançar o tempo ou interromper a continuidade narrativa. Inventário e patrimônio devem representar bens efetivamente possuídos e utilizáveis quando apropriado. A oração segue flutuante e independente.

Proposta de organização a validar: cinco atalhos inferiores — Ações, Perfil, Relações, Inventário e Crônicas — com existência como tela principal e menu geral no cabeçalho. A disposição exata ainda não foi aprovada. Não substituir funcionalidades anteriores nem confundir esse menu com Minhas Animas ou seu rodapé institucional.
