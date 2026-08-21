# Lista de validação para publicação oficial

Este arquivo acompanha a preparação do **Tagmar 3ER Oficial** para distribuição no diretório de pacotes do Foundry VTT.

## Identidade e autoria

- [x] Identificador próprio `tagmar3er_oficial`, permitindo instalação paralela ao sistema original.
- [x] Marcos Walker e Vinicius Fernandez identificados como autores do sistema original.
- [x] Escopo da atualização e dos compêndios sincronizados descrito sem atribuir indevidamente a autoria original.
- [x] Identidade e documentação limitadas ao escopo desta edição oficial.

## Conteúdo e licenças

- [x] Licença do código e licença do conteúdo do Tagmar documentadas por escopo.
- [x] Remover imagens sem autorização ou licença comprovada.
- [x] Referenciar recursos nativos do Foundry sem copiá-los para o repositório.
- [x] Substituir imagens de criaturas pelo token genérico nativo do Foundry.
- [x] Remover recursos externos não verificados e documentar as licenças aplicáveis.

## Pacote

- [x] Compêndios antigos e desatualizados excluídos do manifesto oficial.
- [x] Validar todos os bancos LevelDB e suas referências.
- [x] Confirmar que nenhum arquivo usado pelo sistema está ausente.
- [x] Testar uma instalação limpa no Foundry VTT 14 (Build 367).
- [x] Confirmar a criação e abertura de um mundo isolado com os módulos obrigatórios e os nove compêndios.
- [x] Confirmar instalação paralela com `tagmar_rpg` e `tagmar3er_oficial` exibidos como sistemas distintos.
- [ ] Testar criação de personagem, criaturas, combate, itens e calendário.
- [x] Gerar ZIP contendo `system.json` na raiz.
- [x] Publicar manifesto e ZIP em uma versão do GitHub Releases.
- [ ] Enviar o pacote ao diretório oficial do Foundry somente após concluir toda a auditoria.
