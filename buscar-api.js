//essa comando avisa ao node.js, olha, essa função vai fazer uma viagem para a internet, prepare o comando para buscar a informação
//mas nao fique aguardando, vá realizar outras tarefas e execute o resto dessa função somente quando a informação requerida estiver disponivel.
async function buscarClima() {

    //cria a rede de segurança para monitorar
    try {
        //cria uma variavel para armazenar a chave da api nescessaria para receber os dados!
        const chaveApi = "df519a56"

        //cria uma variavel para armazenar a cidade digitada pelo usuário
        const cidade=document.getElementById("city").value;

        //formata texto para evitar erros com espaços ou acentos na url
        const cidadeFormatada = encodeURIComponent(cidade)

        //montar a url com as informações. Detalhe, city_name= e Key=  são obrigatorios e padronizados pelo site da api
        const url = `https://corsproxy.io/?https://api.hgbrasil.com/weather?city_name=${cidadeFormatada}&key=${chaveApi}`;

        //dispara o pedido http e aguarda o envelope da resposta
        const resposta = await fetch(url)

        //converter a resposta bruta em um objeto manipulavel
        const dados = await resposta.json()

        console.log(dados.results)
        
        return
        }

        catch{}
}