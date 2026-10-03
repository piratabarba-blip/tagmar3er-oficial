# Lista de validação para publicação oficial

Este arquivo acompanha a preparação do **Tagmar 3ER Oficial** para distribuição no diretório de pacotes do Foundry VTT.

## Identidade e autoria

- [x] Identificador próprio `tagmar3er-oficial`, permitindo instalação paralela ao sistema original.
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
- [ ] Repetir o teste de instalação limpa no Foundry VTT 14 com o novo identificador (o teste anterior foi feito com o identificador legado).
- [ ] Confirmar a criação e abertura de um mundo isolado com o novo identificador, os módulos obrigatórios atualizados e os nove compêndios.
- [ ] Confirmar instalação limpa com o identificador `tagmar3er-oficial` e os módulos auxiliares atualizados.
- [ ] Testar criação de personagem, criaturas, combate, itens e calendário.
- [x] Gerar ZIP contendo `system.json` na raiz.
- [ ] Publicar manifesto e ZIP da versão com identificador hifenizado, preservando a distribuição anterior conforme [plano de transição](docs/transicao-identificador.md).
- [ ] Enviar o pacote ao diretório oficial do Foundry somente após concluir toda a auditoria.
