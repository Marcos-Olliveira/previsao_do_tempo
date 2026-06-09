
//armazena as sessoes busca e resultado em duas variáveis
const busca = document.getElementById("busca");
const resultado = document.getElementById("resultado")

//armazena o elemento botao na sessao busca
let buscar_botao= document.getElementById("busca-search-button")

//representa o estado da página, a sessão que está sendo exibida inicialmente
let estadoDaPagina = "buscar"



//quando o botão é clicado, a função faz com que o html oculte a sessao buscar e exiba a sessao resultado
buscar_botao.addEventListener("click",() => {
    
    async function chamar_API(){
        console.log("entrou na função")

        //armazena o valor digitado  pelo usuario no campo de pesquisa na sessao busca
        let cidade_pesquisada = document.getElementById("busca-search-box").value;
        let cidade_formatada = encodeURIComponent(cidade_pesquisada)
        console.log("cidade:", cidade_formatada)

        //cria a rede de segurança para monitorar
        try {
            //cria uma variavel para armazenar a chave da api nescessaria para receber os dados!
            const chaveApi = "df519a56"

            //montar a url com as informações. Detalhe, city_name= e Key=  são obrigatorios e padronizados pelo site da api
            const url = `https://corsproxy.io/?https://api.hgbrasil.com/weather?city_name=${cidade_formatada}&key=${chaveApi}`;

            //dispara o pedido http e aguarda o envelope da resposta
            const resposta = await fetch(url)

            //converter a resposta bruta em um objeto manipulavel
            const dados = await resposta.json()
            
            return
        }
        catch(erro){      
            console.log(erro)      
        }
    }
    chamar_API();
           
        
        //condição para alternar a visualização da sessão busca e resultado
        if(estadoDaPagina ==="buscar"){

            busca.style.display="none";

            estadoDaPagina = "resultado";

            resultado.style.display="block";

        }
    })




















