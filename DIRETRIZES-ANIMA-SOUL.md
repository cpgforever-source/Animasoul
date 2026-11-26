# Anima Soul — especificação vinculante da experiência

Esta especificação consolida as decisões do usuário. Não substituir por convenções de design genéricas. Alterações de implementação não revogam as diretrizes aprovadas.

## Requisitos
1. Uma existência completa como escopo inicial, sem história fixa. Nascimento, família, circunstâncias, eventos e trajetórias procedurais; mundo e NPCs autônomos.
2. Nenhum limite artificial de decisões ou ações. Modos variam no ritmo, nunca por orçamento de cliques.
3. Tempo coerente com atividades; períodos condensados simulam mudanças concretas. Sem saltos genéricos, marcos obrigatórios ou decisões importantes tomadas automaticamente.
4. Cinco opções narrativas legítimas em toda situação jogável. Oração e controles de navegação não contam. Não inventar opções impossíveis, duplicatas ou menus disfarçados.
5. Cada ação deve ser vivenciada: sensações plausíveis, diálogos, desenvolvimento e resultado. O narrador continua a história anterior em vez de substituir por fragmentos ou relatórios.
6. A vida cotidiana tem valor próprio. Pequenos acontecimentos, afeto, conhecimento e objetos podem formar memórias autobiográficas sem recompensa artificial ou dilema moral obrigatório.
7. Persistência e causalidade: escolhas consolidadas não se repetem indevidamente. Atividades recorrentes dependem de contexto, disponibilidade, necessidade, fadiga e autonomia dos NPCs.
8. Navegação não avança a existência. Ações livres e escolhas narrativas são diferentes, mas ambas obedecem ao contexto. Inventário real, relações persistentes, perfil, conhecimento e crônicas.
9. Narrador progressivo: revelar texto palavra por palavra, pausas de frases/parágrafos, novas opções somente após concluir, velocidade configurável, opção de revelar tudo, nenhuma dependência de IA em tempo real. Não acelerar o conteúdo para reduzir a sessão.
10. Imagens associadas às ações e situações narradas, não somente à época; continuidade da aparência das pessoas, ambientes e objetos.
11. Tela vertical única, inclusive no desktop. Área de leitura com rolagem própria; menu fixo, cinco opções acessíveis e oração flutuante. Arte cinematográfica e composição editorial distintiva, azul-noturno e prata.
12. Preservar abertura, Minhas Animas, diários individualizados, nome editável, loja, vídeos/recompensas, assinatura, suporte, versão e demais funções aprovadas. Deus existe como pressuposto cosmológico, sem citação explícita pelo narrador ou apresentação do jogo.
13. Testar comportamento e legibilidade em viewport de celular real antes de considerar concluído. Não confundir commit, implantação e validação de gameplay.

## Estado da versão 0.19
- Implementado no ramo main: narrador local, pausas e velocidade, bloqueio de ações durante revelação, rodapé de RPG, oração direta flutuante, layout vertical compacto, abertura sem referência explícita a Deus, apresentação direta de até cinco escolhas existentes, remoção do atalho de capítulo da leitura.
- Implementado no ramo motor-procedural-v1: narrador compartilhado, laboratório vertical, ações cotidianas adicionais, persistência básica e retorno sensorial experimental.
- Pendente: substituir integralmente o motor legado, eliminar saltos de idade implícitos, garantir cinco escolhas em todos os estados, aprofundar storytelling procedural e autonomia/saturação dos NPCs, memórias associativas, imagens por ação e continuidade visual, inventário completo no motor novo, cosmologia não expositiva em todas as cenas, testes de navegador real e validação da publicação. O motor experimental ainda tem catálogo finito e pode oferecer menos de cinco escolhas. Não declarar a existência completa pronta.

## Validação efetuada
Seis verificações automatizadas do narrador (primeira palavra, pausa, finalização, cancelamento, retomada e modo instantâneo); sintaxe dos scripts principais validada. No motor experimental, sessenta ações aceitas em um percurso de teste, mas a garantia de cinco opções falhou em estados de catálogo insuficiente. Não houve teste end-to-end em celular nesta atualização.
