/* modal lançamentos */
var modalInstance = null;
var modelElem = document.querySelector('#modalLancamentos');

modelElem.addEventListener('shown.bs.modal', function () {
  modalInstance = bootstrap.Modal.getInstance(modelElem);
});

const hideModal = () => {
  btnExcluir.style.display = "none";
  modalInstance.hide();
  limparModal();
}

/* variáveis página principal */
let selectMesAnoReferencia = document.getElementById("selectMesAnoReferencia");
var tableLancamentos = document.getElementById('table-lancamentos');

/* variáveis modal lançamentos */

let inputMesAno = document.getElementById("txtMesAno");
let inputTipoLancamento = document.getElementById("txtTipoLancamento");
let inputDescricao = document.getElementById("txtDescricao");
let inputValor = document.getElementById("txtValor");
let inputComentario = document.getElementById("txtComentario");
let hiddenTxtIdLancamento = document.getElementById("hiddenTxtIdLancamento");
let btnExcluir = document.getElementById("btnExcluir");

const limparModal = () => {
  inputMesAno.value = "Selecione";
  inputTipoLancamento.value = "Selecione";
  inputDescricao.value = "";
  inputValor.value = "";
  inputComentario.value = "";
  hiddenTxtIdLancamento.value = "";
  btnExcluir.style.display = "none";
}

const iniciaModal = () => {
  inputMesAno.value = "Selecione";
  inputTipoLancamento.value = "Selecione";
  inputDescricao.value = "";
  inputValor.value = "";
  inputComentario.value = "";
  hiddenTxtIdLancamento.value = "";
  btnExcluir.style.display = "none";
}


const carregarConsolidacao = (consolidacao) => {
  var spanReceita = document.getElementById("spanReceita");
  var spanDespesas = document.getElementById("spanDespesas");
  var spanRendimentos = document.getElementById("spanRendimentos");
  var spanSaldo = document.getElementById("spanSaldo");

  spanReceita.innerHTML = formatarValorMoeda(consolidacao.total_receitas);
  spanDespesas.innerHTML = formatarValorMoeda(consolidacao.total_despesas);
  spanRendimentos.innerHTML = formatarValorMoeda(consolidacao.total_rendimentos);
  spanSaldo.innerHTML = formatarValorMoeda(consolidacao.saldo);
}

const carregarListagemDeLancamentos = async () => {

  tableLancamentos.getElementsByTagName('tbody').innerHTML = "";

  var tb = document.getElementById('table-lancamentos');

  while (tb.rows.length > 1) {
    tb.deleteRow(1);
  }

  return await getListagemDeLancamentos(selectMesAnoReferencia.value)
    .then(lancamentos => { lancamentos.forEach(item => inserirLancamentoNaListagem(item)); })
    .then((r) => { return getConsolidado(selectMesAnoReferencia.value)})
    .then((consolidacao) => { return carregarConsolidacao(consolidacao)})

}

carregarListagemDeLancamentos();

const salvar = async () => {

  if (inputMesAno.value === 'Selecione') {
    alert("Selecione um valor no campo Mês / Ano.")
  } else if (inputTipoLancamento.value === 'Selecione') {
    alert("Selecione um valor no campo Tipo lancamento.")
  } else if (inputDescricao.value === '') {
    alert("O campo descrição deve ser preenchido.")
  } else if (isNaN(inputValor.value)) {
    alert("O campo deve ser preenchido com um valor válido.")
  } else {

    if (hiddenTxtIdLancamento.value === "") {
        await postLancamento(inputMesAno.value,
          inputTipoLancamento.value,
          inputDescricao.value,
          inputValor.value,
          inputComentario.value).then((r) => {
            hideModal()
          }).then(() => { return carregarListagemDeLancamentos() });

    } else {
      await putLancamento(hiddenTxtIdLancamento.value,
          inputMesAno.value,
          inputTipoLancamento.value,
          inputDescricao.value,
          inputValor.value,
          inputComentario.value).then((r) => {
            hideModal()
          }).then(() => { return carregarListagemDeLancamentos() });
    }
  }
}

const excluir = async () => {
  await deleteLancamento(hiddenTxtIdLancamento.value)
    .then(() => { hideModal()})
    .then(() => { return carregarListagemDeLancamentos()});
}


const inserirLancamentoNaListagem = (lancamentoItem) => {
  var item = [lancamentoItem.tipo_lancamento.descricao, lancamentoItem.descricao, formatarValorMoeda(lancamentoItem.valor_lancamento), lancamentoItem.comentario]
  var table = document.getElementById('table-lancamentos');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);

    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1), lancamentoItem.id)
}

const carregaDetalhes = async (idLancamento) => {

  var modal = new bootstrap.Modal(document.getElementById('modalLancamentos'))
  var lancamento = await getLancamento(idLancamento);
  if (lancamento != null) {
    inputMesAno.value = lancamento.mes_ano_referencia;
    inputTipoLancamento.value = lancamento.tipo_lancamento.id;
    inputDescricao.value = lancamento.descricao;
    inputValor.value = lancamento.valor_lancamento;
    inputComentario.value = lancamento.comentario;
    hiddenTxtIdLancamento.value = lancamento.id
  }

  btnExcluir.style.display = "block";
  modal.toggle();
}


const insertButton = (parent, idLancamento) => {
  let button = document.createElement("button");

  button.innerHTML = "Visualizar"
  button.onclick = function () {
    carregaDetalhes(idLancamento);
  }
  parent.appendChild(button);
}