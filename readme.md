# Tagmar 3ER Oficial para Foundry VTT 14

Implementação comunitária do **Tagmar 3** para o Foundry Virtual Tabletop 14, acompanhada de compêndios oficiais sincronizados com as fontes públicas do projeto Tagmar.

Este guia apresenta a instalação, o primeiro personagem, o conteúdo dos compêndios e as integrações da edição oficial. A referência desta documentação é a versão **2.7.0-v14.1-official.38**, com identificador **`tagmar3er-oficial`**.

## Índice

- [Instalação e primeiro mundo](#instalação-e-primeiro-mundo)
- [Primeiros passos com as fichas](#primeiros-passos-com-as-fichas)
- [Compêndios incluídos](#compêndios-incluídos)
- [Módulos obrigatórios](#módulos-obrigatórios)
- [Como usar os módulos Tagmar](#como-usar-os-módulos-tagmar)
- [Integrações opcionais](#integrações-opcionais)
- [Tesouros em Tagmar](#tesouros-em-tagmar)
- [Atualização e solução de problemas](#atualização-e-solução-de-problemas)
- [Autoria e histórico](#autoria-e-histórico)
- [Licenciamento e conteúdo](#licenciamento-e-conteúdo)

## Instalação e primeiro mundo

### 1. Confira os requisitos

- Foundry VTT **14**, verificado pelo pacote na compilação **14.368**. Esta versão do sistema não declara suporte às gerações anteriores nem à V15.
- Acesso de administrador para instalar pacotes e de Mestre para configurar o mundo.
- Uma instalação licenciada do Foundry. O sistema Tagmar é gratuito; a licença do Foundry é separada.
- Backup dos mundos e dos arquivos de campanha antes de atualizar qualquer instalação existente.

**Já possui um mundo antigo?** O identificador anterior, `tagmar3er_oficial`, é diferente do atual, `tagmar3er-oficial`. Instalar o novo pacote não converte mundos antigos. Mantenha a instalação anterior para esses mundos e não renomeie pastas nem edite somente o `world.json`. Consulte o [plano de transição](docs/transicao-identificador.md).

### 2. Instale o sistema

1. Na tela inicial do Foundry, abra **Sistemas de Jogo / Game Systems**.
2. Clique em **Instalar Sistema / Install System**.
3. Em **URL do Manifesto / Manifest URL**, cole o endereço abaixo.
4. Clique em **Instalar** e aceite a instalação das dependências oferecidas.

```text
https://raw.githubusercontent.com/piratabarba-blip/tagmar3er-oficial/main/system.json
```

Use esse endereço para acompanhar as atualizações do oficial. Ele é um manifesto JSON, não o endereço da página do GitHub nem um ZIP. A instalação por manifesto pode ser usada independentemente de o sistema já aparecer na busca do catálogo.

Para instalar especificamente a versão que serve de referência a este guia, use o [manifesto da official.38](https://github.com/piratabarba-blip/tagmar3er-oficial/releases/download/v2.7.0-v14.1-official.38/system.json). Não use `releases/latest` como atalho para esta edição: esse endereço foi mantido para a distribuição com o identificador anterior.

### 3. Crie e abra um mundo

1. Vá a **Mundos de Jogo / Game Worlds → Criar Mundo / Create World**.
2. Informe um nome e selecione **Tagmar 3ER Oficial** como sistema. Se houver duas instalações com o mesmo título, confira o identificador `tagmar3er-oficial` antes de continuar.
3. Crie o mundo, inicie-o e entre como Mestre.
4. Um mundo sem cenas recebe uma **Cena Inicial** neutra. Ela não é um mapa de aventura: serve de área inicial para colocar tokens e testar as fichas.

### 4. Ative os módulos no mundo

Abra **Configurações do Jogo → Gerenciamento de Módulos**, confira os oito [módulos obrigatórios](#módulos-obrigatórios), ative-os e salve. Aceite a recarga solicitada.

Instalar um módulo e ativá-lo em um mundo são etapas diferentes. Se faltar alguma dependência, volte à tela inicial, entre em **Módulos Complementares → Instalar Módulo** e use o manifesto da tabela abaixo. Os nomes dos menus podem variar conforme a tradução do Foundry.

Os procedimentos gerais também estão nos guias do Foundry: [instalar sistemas e criar mundos](https://foundryvtt.com/article/tutorial/) e [gerenciar módulos](https://foundryvtt.com/article/modules/).

## Primeiros passos com as fichas

### Crie um personagem

1. Na aba **Atores**, clique em criar um ator e escolha o tipo **Personagem**.
2. Abra **Compêndios → Tagmar — Criação de Fichas (Edição Sincronizada)**.
3. Localize a raça e a profissão desejadas e arraste os itens para a ficha.
4. Acrescente habilidades, grupos/armas de combate, técnicas, magias, defesas e pertences conforme as escolhas permitidas pelas regras.
5. Confira atributos, estágio, níveis, recursos e equipamento. As somas e rolagens automatizadas auxiliam o preenchimento; não substituem as escolhas de criação nem a conferência do Mestre.
6. Nas permissões do ator, dê ao jogador controle de sua ficha. Nas configurações do usuário, atribua o personagem correspondente.
7. Arraste o ator da lista para a cena para criar seu token.

As fichas organizam atributos e recursos na parte básica e possuem áreas de **Habilidades, Combate, Magia, Pertences e Efeitos**, além das informações de interpretação. Use os controles de rolagem da ficha para enviar os resultados ao chat.

Para uma criatura pronta, importe uma ficha do compêndio **Criaturas de Tagmar** para Atores e arraste-a para a cena. Há também os tipos de ator **NPC** e **Inventario**; este último é destinado a fichas de inventário, não a personagens de jogador.

### Quantidade e inventário

Um pertence pode representar várias unidades: por exemplo, um único item **Tochas** com **Quant: 10**. A quantidade fica no campo `system.quant`. Altere a cópia que pertence ao personagem, não apenas o item de referência no compêndio.

Não confunda quantidade, peso e texto descritivo. Escrever “10 unidades” na descrição não altera o campo Quant. O consumo por módulos precisa apontar para o campo numérico correto.

### Ajustes úteis do sistema

Em **Configurações do Jogo → Configurar o Jogo → Tagmar 3ER Oficial**, confira:

- **Ficha:** aparência da ficha, incluindo as opções Sem Imagem, Tema Escuro e Tema Foundry.
- **Barras automáticas (Bar Brawl):** cria barras ao criar tokens de Personagem, NPC ou ambos. Alterar essa opção não equivale a reconstruir os tokens já existentes.
- **Setar Def. Oponente ao marcar target:** com seu token controlado, marcar um oponente como alvo permite preencher sua defesa automaticamente.
- **Modificar ajuste manualmente:** quando ativado, desliga o cálculo automático dos ajustes da ficha de Personagem. Deixe desativado se quiser esse cálculo automático.
- **Tamanho da fonte do chat**, **Dados coloridos (Dice So Nice)** e **PopOut TurnOrder automático:** preferências de apresentação.

Algumas opções são individuais por usuário; outras, como as barras automáticas e o ajuste manual, são do mundo.

## Compêndios incluídos

O pacote contém **nove compêndios**. As quantidades abaixo foram conferidas nos bancos da official.38 e contam documentos principais, sem somar pastas, páginas de diários ou itens internos das criaturas.

| Compêndio | Conteúdo e finalidade | Quantidade |
| --- | --- | ---: |
| **Tagmar — Criação de Fichas (Edição Sincronizada)** | Raças, profissões, habilidades, combate, defesas, técnicas, magias, pertences, transportes e material de apoio para criaturas. | 1.568 itens |
| **Reino de Tagmar — Referências Oficiais (Edição Sincronizada)** | Reinos, regiões, povos, culturas, deuses, calendário, história, cronologias e organizações. | 46 diários |
| **Objetos Mágicos — Itens Oficiais (Edição Sincronizada)** | Objetos para adicionar às fichas: joias, vestimentas, armas, proteções, cetros, cajados, poções, elixires e outros objetos. | 137 itens |
| **Objetos Mágicos — Guia e Regras (Edição Sincronizada)** | Introdução, orientações e referências do catálogo de objetos mágicos. | 10 diários |
| **O Império — Referências Oficiais (Edição Sincronizada)** | Povos, cidades-estado, Império Aktar, deuses, cronologia, tradições mágicas, organizações e guias de criação de personagem. | 26 diários |
| **Criaturas de Tagmar — Edição Oficial Sincronizada** | Fichas de NPCs organizadas por famílias de criaturas, prontas para importar e adaptar à aventura. | 414 atores |
| **Registro de Datas** | Datas sagradas e profanas para consulta durante a campanha. | 56 diários |
| **Terras Selvagens — Criação de Fichas (Edição Sincronizada)** | Raças, profissões, magias, combate, defesas, pertences e técnicas dessa região. | 963 itens |
| **Terras Selvagens — Regras (Edição Sincronizada)** | Criação de personagens, caracterizações, regiões mágicas, equipamentos e novas armas. | 5 diários |

### Onde procurar cada tipo de conteúdo

**Criação de Fichas** está dividido em pastas de Raças, Profissões, Habilidades, Combate, Defesa, Técnicas de Combate, Magias, Magias Ancestrais, Magias Perdidas, Pertences e Afins e material de apoio à criação de criaturas. Seus documentos são:

- 6 raças e 6 profissões;
- 42 habilidades e 132 técnicas de combate;
- 210 itens de combate e 35 defesas;
- 776 documentos de magia;
- 320 pertences e 41 transportes.

**Terras Selvagens** acrescenta 7 raças, 7 profissões, 321 documentos de magia, 127 itens de combate, 86 defesas, 413 pertences e 2 técnicas. Os números são registros do compêndio: não significam necessariamente magias diferentes, pois podem existir entradas por nível ou variação.

**Criaturas** reúne animais, animais gigantes e sombrios, dragões, dragões imperiais, hidras, elementais, licantropos, mortos-vivos, monstros, raças civilizadas, selvagens e gigantes, além de criaturas artificiais, vegetais, divinas, infernais, místicas e de Dartel. O pacote utiliza ícones/representações genéricas do Foundry; não inclui uma coleção de retratos ilustrados exclusivos para cada criatura.

Os diários são material de consulta. Arrastar um diário do Império para a ficha não o transforma em uma raça ou magia utilizável: para isso, procure o documento do tipo Item nos compêndios de criação.

### Como usar sem alterar o material de referência

- Abra um compêndio e pesquise o nome do conteúdo desejado.
- Para equipar um personagem, arraste o item para a ficha. Para uma criatura, importe o ator para o mundo.
- Para personalizar conteúdo, trabalhe na cópia importada no mundo. Evite desbloquear e editar os compêndios distribuídos com o sistema: uma atualização pode substituir esses arquivos.
- Importe somente o necessário. Não é preciso copiar todos os compêndios para começar uma aventura.
- **Criaturas** e **Registro de Datas** são inicialmente restritos ao Mestre no manifesto. Compartilhe apenas o conteúdo que desejar disponibilizar aos jogadores.

Consulte também o [guia de compêndios do Foundry](https://foundryvtt.com/article/compendium/).

## Módulos obrigatórios

Estes **oito módulos são declarados como dependências pelo sistema**, não apenas sugestões. Os links abrem os manifestos usados na distribuição compatível; copie o endereço do link para **Instalar Módulo → URL do Manifesto** quando precisar instalar manualmente.

| Módulo | Função | Versão de referência | Manifesto |
| --- | --- | --- | --- |
| **Bar Brawl** | Barras de recursos nos tokens; integração com a criação automática de barras do Tagmar. | **1.9.3.1**, mínimo exigido | [Instalar](https://raw.githubusercontent.com/piratabarba-blip/modulos_foundry/v14/barbrawl/module.json) |
| **libWrapper** | Biblioteca de integração entre recursos e módulos. | 1.13.5.1 | [Instalar](https://raw.githubusercontent.com/piratabarba-blip/modulos_foundry/v14/lib-wrapper/module.json) |
| **Dice So Nice** | Dados 3D e cores dos resultados nas rolagens do sistema. | 6.2.9 | [Instalar](https://raw.githubusercontent.com/piratabarba-blip/modulos_foundry/v14/dice-so-nice/module.json) |
| **socketlib** | Biblioteca de comunicação utilizada por módulos. | v1.1.4 | [Instalar](https://raw.githubusercontent.com/piratabarba-blip/modulos_foundry/v14/socketlib/module.json) |
| **Polyglot** | Idiomas no chat, com provedor de línguas registrado pelo Tagmar. | 2.9.2 | [Instalar](https://raw.githubusercontent.com/piratabarba-blip/modulos_foundry/v14/polyglot/module.json) |
| **Tagmar Gestão de Munições** | Cadastro e compartilhamento de reservas de munição entre armas. | **1.2.2-v14.1**, mínimo exigido | [Instalar](https://raw.githubusercontent.com/piratabarba-blip/modulos_foundry/v14/tagmar-ammu-nation/module.json) |
| **Tagmar Transações** | Envio de pertences para outro jogador conectado e com personagem atribuído. | **1.2.3-v14.1**, mínimo exigido | [Instalar](https://raw.githubusercontent.com/piratabarba-blip/modulos_foundry/v14/tagmartrade/module.json) |
| **Tagmar — Grande Calendário** | Calendário, relógio, festividades e fases das três luas. | **0.7.6**, mínimo exigido | [Instalar](https://raw.githubusercontent.com/piratabarba-blip/modulos_foundry/v14/tagmar-calendario/module.json) |

Versões de referência não são uma promessa de compatibilidade com qualquer versão futura. Use os manifestos declarados pelo sistema e confira as notas antes de trocar uma distribuição. A edição indicada do **Bar Brawl** inclui uma correção para atualizações parciais de token, relevante para efeitos de iluminação.

Os módulos de terceiros preservam seus autores e suas licenças originais. Estar nesta tabela não transfere sua autoria aos mantenedores do sistema.

## Como usar os módulos Tagmar

### Gestão de Munições

1. Na ficha de **Personagem**, abra **Combate → Gestão de munições**.
2. Cadastre o nome da munição e a quantidade disponível, por exemplo, “Flechas comuns” e `20`.
3. Abra a edição de uma arma da ficha e selecione a munição no campo acrescentado pelo módulo.
4. Armas vinculadas ao mesmo cadastro compartilham a reserva. Confira o desconto ao realizar um ataque que use essa munição.
5. Para corrigir ou repor o estoque, cadastre o mesmo nome com o **novo total**. Esse valor substitui o saldo; não é um acréscimo automático.

Esse cadastro de munição é separado da quantidade dos pertences usada pelo Light Sources.

### Transações

1. Os jogadores precisam estar conectados, com seus personagens atribuídos nas configurações dos usuários.
2. Na aba **Pertences**, use o ícone **Mandar para amigo** ao lado do item.
3. Escolha o jogador destinatário e uma quantidade positiva, sem exceder o estoque, e clique em **Enviar**.
4. Confira as duas fichas. A quantidade enviada é retirada da origem e incluída no personagem atribuído ao destinatário. Ao enviar todo o estoque, o item é removido da ficha de origem.

O seletor de destinatários não inclui usuários offline, sem personagem atribuído ou Mestres. Teste inicialmente com um item comum de baixo valor e não use esta função como substituto de um backup.

### Grande Calendário

- Abra pelo botão do calendário nas ferramentas de Token. Como alternativa, uma macro do tipo Script pode usar:

  ```js
  game.modules.get("tagmar-calendario").api.open();
  ```

- O Mestre pode definir a data e avançar o relógio; os jogadores acompanham o calendário e podem solicitar avisos públicos.
- Consulte festividades e fases de **Agmarim, Armina e Denégria**. O módulo contempla os meses de Tagmar e o Dia de Cruine.
- O relógio é sincronizado com o tempo do mundo do Foundry. Avançá-lo pode afetar outros módulos que contam duração por esse mesmo relógio, como o Light Sources quando configurado dessa maneira.
- O painel pode ser movido, redimensionado e minimizado. Confira as mensagens agendadas e a velocidade do relógio antes de deixar o avanço automático ligado.

## Integrações opcionais

Os módulos abaixo **não são instalados como dependências obrigatórias**. Ative-os somente se quiser esses recursos. Esta lista documenta integrações específicas; não certifica todos os módulos do catálogo nem todas as combinações possíveis.

### Light Sources — luzes e consumo de tochas

Referência conferida: **Light Sources 0.8.0**, de Mestre Digital. Instale o módulo original pelo seu [manifesto](https://github.com/brunocalado/light-sources/releases/latest/download/module.json) ou consulte seu [repositório](https://github.com/brunocalado/light-sources). Esse manifesto acompanha as versões do autor; se receber uma versão posterior, confira as mudanças antes de usar o tutorial.

O sistema fornece a tradução pt-BR da interface e dos cartões de chat, sem alterar os arquivos originais do módulo. Selecione Português (Brasil) no Foundry e recarregue os clientes depois de atualizar.

**Configuração inicial pelo Mestre:**

1. Ative Light Sources no mundo e abra suas configurações.
2. Entre em **Configurar Compatibilidade do Sistema / Configure System Compatibility**.
3. Em tipos de item, habilite **Pertence**; habilite **Magia** também se quiser cadastrar luzes mágicas.
4. Em tipos de ator, habilite **Personagem** e, se desejado, **NPC**.
5. Em **Quantidade e Cargas / Quantity**, preencha o caminho da quantidade com **`system.quant`** e salve. Não use `system.quantity`, pois esse não é o campo de quantidade dos pertences do Tagmar.
6. Em **Configurar Fontes de Luz / Configure Light Sources**, arraste o item que será cadastrado, como **Tochas**.
7. Configure o padrão: raio de penumbra, luz plena, cor e animação. Os raios devem respeitar a escala e a unidade de distância da cena.
8. Na aba **Consumo**, para tochas empilhadas, selecione **Acender Consome → Uma unidade do item**. Defina a duração conforme as regras adotadas; por exemplo, `60` minutos para uma tocha de uma hora.
9. Escolha se a duração conta pelo **tempo do mundo** ou pelo **tempo real**. Salve e coloque o item no inventário do personagem com Quant maior que zero.
10. Abra os controles do token (HUD, normalmente com clique direito), escolha a fonte cadastrada e acenda-a pelo controle do módulo.

**Exemplo:** Tochas com Quant `10` passa a `9` ao acender uma nova unidade. A luz acesa é a unidade já consumida, separada do estoque: trocar seu padrão, deixá-la no chão e recolhê-la não deve gastar outra unidade. Com estoque zero, não há outra unidade para acender; a luz já acesa pode permanecer até ser apagada ou terminar sua duração.

Nas versões antigas do módulo, a opção de consumo aparecia como **Consume on Use**. Na 0.8.0 há modos de consumo diferentes. Para esse exemplo, não escolha cargas nem **Livre para todos / Free for All**, pois não representam o estoque de tochas do personagem. Configure luzes mágicas e lanternas separadamente, sem presumir que devam consumir uma cópia do item.

Se a luz não aparecer, confira o item no ator, a quantidade, os tipos habilitados, os raios, os efeitos ativos e a iluminação da cena. O módulo pode aplicar luz por efeitos; olhar apenas os valores básicos da aba Luz do token não basta para concluir que não existe uma fonte ativa. Se usar tempo do mundo, o contador depende do avanço desse relógio.

### Theatre Inserts — retratos no palco

Referência da integração: **Theatre Inserts original 3.4.2**, com libWrapper e PIXI 7. O sistema contém um adaptador para vídeo WebM no palco, mantendo imagens estáticas nas miniaturas e no editor do chat.

Instale e configure o [Theatre original](https://github.com/League-of-Foundry-Developers/fvtt-module-theatre). O vídeo escolhido para a ficha Tagmar e o retrato escolhido no Theatre são configurações independentes. Não é necessário substituir o módulo por uma cópia modificada.

Em versões não reconhecidas, o adaptador não é aplicado; isso não garante a compatibilidade do Theatre com a instalação. Consulte os [detalhes e limites da integração](docs/theatre-compat.md).

## Tesouros em Tagmar

O gerador de tesouros é um recurso do **próprio sistema**, não outro módulo obrigatório.

1. Como Mestre, abra **Configurar o Jogo → Tagmar 3ER Oficial → Tesouros em Tagmar → Abrir gerador**, ou use o botão de gema nas ferramentas de Token.
2. Confira a aba **Propriedades** e as opções da aba **Gerar tesouro**.
3. Escolha a modalidade desejada: moedas, objetos comuns, mágicos ou mistos, e ajuste os filtros de objetos e propriedades.
4. Clique em **Gerar prévia** e revise os resultados. Opções de história e maldição devem ser conferidas pelo Mestre antes de compartilhar o conteúdo.
5. Só depois clique em **Criar este tesouro no Foundry** para gravar os documentos. Gerar uma prévia não equivale a entregar um item a um personagem.

Os resultados gerados precisam de revisão e adaptação à aventura; não devem ser confundidos com as entradas de referência dos livros. O gerador também possui rolagem participativa pelo chat, preparada pelo Mestre, para que um jogador revele o tesouro.

## Atualização e solução de problemas

### Atualizar com segurança

1. Faça backup do mundo e dos arquivos associados à campanha.
2. Retorne à tela inicial do Foundry e verifique atualizações do sistema e dos módulos.
3. Confira as [notas de versão](https://github.com/piratabarba-blip/tagmar3er-oficial/releases), especialmente dependências e mudanças de identificador.
4. Teste em uma cópia da campanha antes de atualizar a mesa principal e recarregue os clientes após a atualização.

As cópias de itens e atores já importadas no mundo não devem ser tratadas como automaticamente sincronizadas com os novos compêndios. Compare as alterações antes de substituir conteúdo personalizado.

### Problemas frequentes

| Sintoma | O que conferir |
| --- | --- |
| O mundo antigo acusa sistema ausente | Ele pode usar o ID anterior. Reinstale a edição correspondente; não altere o ID do mundo às pressas. Veja o plano de transição. |
| Um botão de módulo não aparece | Confira instalação, ativação no mundo, versão e tipo de ficha. Munições e Transações acrescentam controles nas fichas de Personagem. |
| Barras não aparecem num token existente | Ative Bar Brawl, confira a opção de barras automáticas e teste criando um token novo. |
| Tocha não desconta quantidade | Configure `system.quant`, consumo de uma unidade e um pertence dentro da ficha, com estoque disponível. |
| Luz não termina no tempo esperado | Confira minutos e o modo de contagem. Tempo do mundo e tempo real são diferentes. |
| Troca não oferece destinatários | É necessário outro jogador online, não Mestre, com personagem atribuído. |
| Jogador não vê a cena sem token | Em uma cena de apresentação, desative Visão do Token se quiser visibilidade sem depender de tokens. Isso mostra a cena inteira; não use em mapas onde deseja limitar exploração. |
| Erro 404 em imagem de um mundo | O caminho aponta para arquivo ausente ou movido. Reinstalar o sistema não recupera imagens particulares da campanha. |

Ao pedir ajuda, informe a versão do Foundry, a versão do sistema, os módulos ativos, o passo a passo e a mensagem de erro. Em uma cópia de teste, desative primeiro os módulos opcionais e reative-os um a um para localizar conflitos. Não compartilhe senhas, tokens de publicação ou dados privados.

Relate problemas no [repositório oficial](https://github.com/piratabarba-blip/tagmar3er-oficial/issues).

## Autoria e histórico

Para a alteração do identificador do pacote e os cuidados com mundos existentes, consulte o [plano de transição](docs/transicao-identificador.md). A versão com novo identificador é uma instalação separada; não converte mundos automaticamente.

O sistema original para Foundry VTT foi desenvolvido por **Marcos Walker** e **Vinicius Fernandez**. Esta edição preserva essa autoria e deriva diretamente do trabalho original.

O trabalho desta atualização compreende principalmente:

- migração e compatibilidade com o Foundry VTT 14;
- criação, organização e sincronização dos compêndios atuais;
- correções de integração e manutenção técnica;
- atualização e compatibilização dos módulos auxiliares necessários;
- documentação, auditoria e preparação do pacote para distribuição.

O projeto original de Marcos Walker está disponível em: https://github.com/marcoswalker/tagmar_rpg

## Licenciamento e conteúdo

O código original permanece sob a licença aplicável indicada em [LICENSE.md](LICENSE.md). Textos, regras, nomes e demais conteúdos derivados do Tagmar seguem a licença oficial **CC BY-NC-SA 3.0 Brasil**.

- Projeto Tagmar: https://tagmar.com.br/
- Licenciamento oficial: https://tagmar.com.br/Licenciamento.aspx
- Foundry Virtual Tabletop: https://foundryvtt.com/

Recursos pertencentes ao Foundry são apenas referenciados pelos caminhos fornecidos pela própria plataforma e não são redistribuídos neste repositório. Imagens e componentes de terceiros somente poderão permanecer quando sua licença e atribuição forem verificadas.

## Apoio ao projeto

Este é um projeto comunitário e gratuito. Para apoiar voluntariamente a manutenção, os testes e a evolução da integração com o Foundry VTT: https://apoia.se/vfl

O apoio não representa venda nem licenciamento comercial do conteúdo do Tagmar.

## Atualização assistida por inteligência artificial

A atualização, a organização técnica, a documentação e parte das auditorias foram realizadas com auxílio de ferramentas da OpenAI, incluindo ChatGPT e Codex. As decisões, os testes e a validação final permanecem sob responsabilidade dos mantenedores humanos.
