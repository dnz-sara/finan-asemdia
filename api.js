
const api_url = "http://127.0.0.1:5000"

/*
  --------------------------------------------------------------------------------------
  Função carregar a lista de lançamentos da api
  --------------------------------------------------------------------------------------
*/

const getListagemDeLancamentos = async (inputMesAno) => {

    let url = api_url.concat('/api/lancamentos?')
        .concat("mes_ano_referencia=")
        .concat(inputMesAno);

    return fetch(url, {
        method: 'get',
    })
        .then((response) => response.json())
        .then((data) => {
            return data.lancamentos;
        })
        .catch((error) => {
            console.error('Error:', error);
            return []
        });
}


/*
  --------------------------------------------------------------------------------------
  Função salvar um lançamento através da api
  --------------------------------------------------------------------------------------
*/
const postLancamento = async (inputMesAno, inputTipo, inputDescricao, inputValor, inputComentario) => {
    const formData = new FormData();
    formData.append('mes_ano_referencia', inputMesAno);
    formData.append('tipo_lancamento', inputTipo);
    formData.append('descricao', inputDescricao);
    formData.append('valor_lancamento', inputValor);
    formData.append('comentario', inputComentario);

    let url = api_url + '/api/lancamento';
    fetch(url, {
        method: 'post',
        body: formData
    })
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });
}