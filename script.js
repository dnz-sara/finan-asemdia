/* modal lançamentos */
var modalInstance = null;
var modelElem = document.querySelector('#modalLancamentos');
modelElem.addEventListener('shown.bs.modal', function () {
  modalInstance = bootstrap.Modal.getInstance(modelElem);
});

const hideModal = () => {
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

const limparModal = () => {
  inputMesAno.value = "Selecione";
  inputTipoLancamento.value = "Selecione";
  inputDescricao.value = "";
  inputValor.value = "";
  inputComentario.value = "";
}

const carregarListagemDeLancamentos = async () => {

  tableLancamentos.getElementsByTagName('tbody').innerHTML = "";

  var tb = document.getElementById('table-lancamentos');

  while (tb.rows.length > 1) {
    tb.deleteRow(1);
  }

  var lancamentos = await getListagemDeLancamentos(selectMesAnoReferencia.value);
  lancamentos.forEach(item => inserirLancamentoNaListagem(item));
}

carregarListagemDeLancamentos();

const salvarLancamento = () => {

  if (inputMesAno.value === 'Selecione') {
    alert("Selecione um valor no campo Mês / Ano.")
  } else if (inputTipoLancamento.value === 'Selecione') {
    alert("Selecione um valor no campo Tipo lancamento.")
  } else if (inputDescricao.value === '') {
    alert("O campo descrição deve ser preenchido.")
  } else if (isNaN(inputValor.value)) {
    alert("O campo deve ser preenchido com um valor válido.")
  } else {
    postLancamento(inputMesAno.value, inputTipoLancamento.value, inputDescricao.value, inputValor.value, inputComentario.value)
    hideModal()
  }
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
  // removeElement()
}


const insertButton = (parent, idLancamento) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  // div.className = "icon-visualizar"
  // <img src="icons/search.svg" alt="" width="32" height="32"/>

  let button = document.createElement("button");
  button.innerHTML = "Visualizar"
  // button.onclick = lancamentoDetails(idLancamento);

  span.className = "close";
  // span.appendChild(button);
  parent.appendChild(button);
}