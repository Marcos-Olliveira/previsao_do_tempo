const tabela_previsao = document.querySelector(".hidden")

// Função responsável por alternar manualmente a visibilidade do container
// de resultados, mostrando a tabela quando necessário e ocultando-a quando
// a busca não estiver ativa.
function remover_hidden() {
    if (tabela_previsao.hidden === true) {
        tabela_previsao.hidden = false
    } else {
        tabela_previsao.hidden = true
     }
}

// Função vinculada ao botão de busca que exibe a tabela de previsão de tempo
// para a cidade pesquisada, alternando a visibilidade do container de resultados.
function buscar_previsao() {
    remover_hidden()
}
