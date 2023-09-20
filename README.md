# Finanças em Dia

Esta aplicação tem por finalidade auxiliar na organização e controle das finanças pessoais. São apresentados inicialmente, de forma resumida, os dados consolidados de receitas, despesas e rendimentos, referentes a cada mês, calculados a partir dos lançamentos individuais realizados pelo usuário.

---
## Como executar o projeto


1. Configurar a Api (back-end) do projeto. Siga as instruções aqui: [back-end](https://github.com/dnz-sara/financasemdia-backend/blob/main/README.md)

2. Clonar ou fazer download do projeto.

3. Abrir o arquivo index.html - localizado na pasta src - no seu navegador.

---
## Como registrar um lançamento

1. Clicar no botão "Novo Lançamento"
2. O sistema irá apresentar um popup com os campos a serem preenchidos:
![](documentacao/Screenshot_popup_lancamentos.png)

3. Preencher os campos e clicar no botão "Salvar"

4. Após o lançamento dos dados, eles serão apresentados na listagem da tela principal, no respectivo mês selecionado no momento do registro:
 ![](documentacao/Screenshot_listagem.png)

---
## Como excluir um lançamento

1. Clicar no botão "Visualizar" de um lançamento existente. O sistema apresentará um popup com os dados relativos ao lançamento.

2. Clicar no botão "Excluir".

3. O usuário será redirecionado para a página principal que apresentará a atualização dos resumos relativos ao mês.

---
## Como editar um lançamento

1. Clicar no botão "Visualizar" de um lançamento existente. O sistema apresentará um popup editável com os dados relativos ao lançamento.

2. Efetuar as devidas alterações nos campos apresentados e clicar no botão "Salvar".

3. Logo após o usuário será redirecionado para a página principal que apresentará a atualização dos resumos relativos ao mês.

---
## Resumo de Dados Consolidados do mês
O Resumo do mês é a composição da soma de receitas, despesas e rendimentos, que pode resultar em um saldo positivo ou negativo. Toda vez que um lançamento é incluído, alterado ou removido, o sistema efetua o cálculo automaticamente.