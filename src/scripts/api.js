
const api_url = "http://127.0.0.1:5000"

/*
  --------------------------------------------------------------------------------------
  Função carregar a lista de lançamentos da api
  --------------------------------------------------------------------------------------
*/

const getListagemDeLancamentos = async (mesAnoReferencia) => {

    let url = api_url.concat('/api/lancamentos?')
        .concat("mes_ano_referencia=")
        .concat(mesAnoReferencia);

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
  Função para buscar um lançamento
  --------------------------------------------------------------------------------------
*/

const getLancamento = async (idlancamento) => {

    let url = api_url.concat('/api/lancamento/')
        .concat(idlancamento);

    return fetch(url, {
        method: 'get',
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
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
const postLancamento = async (mesAnoReferencia, inputTipo, inputDescricao, inputValor, inputComentario) => {
    let data = {
        'mes_ano_referencia': mesAnoReferencia,
        'tipo_lancamento': inputTipo,
        'descricao': inputDescricao,
        'valor_lancamento': inputValor,
        'comentario': inputComentario
    };

    let url = api_url + '/api/lancamento';

    return fetch(url, {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

/*
  -----------------------------------hehe---------------------------------------------------
  Função salvar um lançamento através da api
  --------------------------------------------------------------------------------------
*/
const putLancamento = async (idlancamento, inputMesAno, inputTipo, inputDescricao, inputValor, inputComentario) => {
    let data = {
        'mes_ano_referencia': inputMesAno,
        'tipo_lancamento': inputTipo,
        'descricao': inputDescricao,
        'valor_lancamento': inputValor,
        'comentario': inputComentario
    };

    let url = api_url + '/api/lancamento/' + idlancamento;
    return fetch(url, {
        method: 'put',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


/*
  --------------------------------------------------------------------------------------
  Função excluir um lançamento
  --------------------------------------------------------------------------------------
*/

const deleteLancamento = async (idlancamento) => {

    let url = api_url + '/api/lancamento/'.concat(idlancamento);

    return fetch(url, {
        method: 'delete'
    })
        .then((response) => response.json())
        .then((data) => { return data})
        .catch((error) => {
            console.error('Error:', error);
        });
}


/*
  --------------------------------------------------------------------------------------
  Função carregar resultado consolidados
  --------------------------------------------------------------------------------------
*/

const getConsolidado = async (mesAnoReferencia) => {

    let url = api_url.concat('/api/lancamento/consolidado?')
        .concat("mes_ano_referencia=")
        .concat(mesAnoReferencia);

    return fetch(url, {
        method: 'get',
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
            return []
        });
}