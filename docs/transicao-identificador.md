# Transição do identificador da edição oficial

A versão 2.7.0-v14.1-official.38 prepara o identificador `tagmar3er-oficial`, exigido pelo formulário de cadastro do Foundry. Ela é uma instalação separada da edição anterior, identificada como `tagmar3er_oficial`. Esta mudança não converte mundos automaticamente.

## Mundos existentes

Mantenha a instalação anterior e seus mundos. Não renomeie a pasta do sistema, não altere apenas o campo `system` de um `world.json` e não importe fichas antigas presumindo que configurações e retratos serão convertidos. O identificador também aparece em flags, configurações, macros e referências aos compêndios.

Uma conversão de mundo requer backup completo, cópia isolada e validação específica de atores, tokens, itens, diários, links, configurações e módulos. Essa conversão não faz parte desta versão. Não apague a instalação anterior para testar o novo pacote.

## Instalação nova

Após a publicação, a nova edição terá seu manifesto em:

https://raw.githubusercontent.com/piratabarba-blip/tagmar3er-oficial/main/system.json

Crie um mundo novo selecionando Tagmar 3ER Oficial e confira o identificador `tagmar3er-oficial`. As dependências que acrescentam suporte ao novo identificador são Gestão de Munições 1.2.2-v14.1, Transações 1.2.3-v14.1 e Grande Calendário 0.7.6. Elas preservam o suporte à edição oficial anterior.

O cadastro novo deve usar `tagmar3er-oficial`. O endereço acima só será válido para esse identificador depois que os arquivos preparados forem publicados. Enquanto isso, não o apresente como uma atualização já disponível.

## Publicação sem interromper a edição anterior

1. Publicar primeiro as três dependências, incluindo seus ZIPs e os manifestos correspondentes. Não publicar só o JSON com um ZIP antigo.
2. Gerar e conferir o ZIP oficial com `system.json` na raiz. Publicar a release 2.7.0-v14.1-official.38 sem torná-la a release latest. A release latest deve continuar sendo a oficial.37 enquanto houver instalações usando o manifesto antigo.
3. Atualizar o manifesto da branch main para o pacote com hífen, somente depois que seu ZIP estiver disponível.
4. Conferir separadamente os dois manifestos públicos: `releases/latest/download/system.json` deve continuar com o ID antigo; `main/system.json`, com o novo.
5. Testar a instalação em um mundo novo antes de informar o manifesto no cadastro. Na lista de versões do Foundry, usar o manifesto específico da release, não um endereço mutável.

O endpoint `releases/latest` não separa identificadores. Marcar uma release nova como latest sem planejamento pode oferecer o pacote errado às instalações antigas. Para manutenção futura, manter esta separação ou preparar previamente uma atualização ponte do pacote antigo para um endereço legado fixo.

## Compêndios

Os IDs dos documentos são preservados. A ferramenta `tools/release/migrate-pack-system-id.mjs` converte apenas cópias dos nove compêndios para uma pasta nova, reescreve referências ao identificador anterior e verifica cada registro gravado. Ela não migra bancos de mundos.

Defina `TAGMAR_FOUNDRY_MODULES` para o diretório node_modules da sua instalação do Foundry. Execute a ferramenta com `--root=<pasta do sistema>` e `--output=<pasta nova fora do sistema>`. A saída precisa estar ausente: a ferramenta recusa sobrescrever uma pasta existente.

## Limites da preparação

Testes automatizados de compêndios e funções não comprovam a migração de mundos nem substituem uma sessão de teste dentro do Foundry. A preparação do novo identificador também não representa aprovação do pacote no catálogo.
