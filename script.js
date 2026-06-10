
//armazena as sessoes busca e resultado em duas variáveis
const busca = document.getElementById("busca");
const resultado = document.getElementById("resultado")

//armazeno o elemento input da caixa de busca central
  let input = document.getElementById("busca-search-box")


//armazena o elemento botao na sessao busca
let buscar_botao= document.getElementById("busca-search-button")

//representa o estado da página, a sessão que está sendo exibida inicialmente
let estadoDaPagina = "buscar"




//crio uma função global para buscar o resultado da pesquisa
async function buscar() {
    async function chamar_API(){
    
        //armazeno o valor digitado  pelo usuario no campo de pesquisa na sessao busca
        let cidade_pesquisada = document.getElementById("busca-search-box").value;
        let cidade_formatada = encodeURIComponent(cidade_pesquisada)
        

        //crio a rede de segurança para monitorar
        try {
            //crio uma variavel para armazenar a chave da api nescessaria para receber os dados!
            const chaveApi = "df519a56"

            //monto a url com as informações. Detalhe, city_name= e Key=  são obrigatorios e padronizados pelo site da api
            const url = `https://corsproxy.io/?https://api.hgbrasil.com/weather?city_name=${cidade_formatada}&key=${chaveApi}`;

            //disparo o pedido http e aguarda o envelope da resposta
            const resposta = await fetch(url)

            //converto a resposta bruta em um objeto manipulavel
            const dados = await resposta.json()

            console.log(dados.results)
            
    
        }
        catch(erro){      
            console.log(erro)      
        }}
        await chamar_API();

        //condição para alternar a visualização da sessão busca e resultado
        if(estadoDaPagina ==="buscar"){

            busca.style.display="none";

            estadoDaPagina = "resultado";

            resultado.style.display="block";

        }
           
        
        
}

    //quando o botão é clicado, a função faz com que o html oculte a sessao buscar e exiba a sessao resultado
    buscar_botao.addEventListener("click",buscar)
    input.addEventListener("keydown", (event)=>{
        if(event.key==="Enter") buscar()
    })
    
    




















