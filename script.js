
//armazena as sessoes busca e resultado em duas variáveis
const busca = document.getElementById("busca");
const resultado = document.getElementById("resultado")

//armazeno o elemento input da caixa de busca central
let input = document.getElementById("busca-search-box")


//armazena o elemento botao na sessao busca
let buscar_botao= document.getElementById("busca-search-button")

//representa o estado da página, a sessão que está sendo exibida inicialmente
let estadoDaPagina = "buscar"

//altero o nome da cidade no paragrafo acima da tabela do tempo





//crio uma função global para buscar o resultado da pesquisa
async function buscar() {
    //armazeno o valor digitado pelo usuario no campo de pesquisa na sessao busca
    let cidade_pesquisada = document.getElementById("busca-search-box").value;

    //Trato o texto digitado pelo usuário para ter compatibilidade nos navegadores
    let cidade_formatada = encodeURIComponent(cidade_pesquisada)

  


    //crio a rede de segurança para monitorar
    try {
        //atribuo uma constante com a url para usar como parametro
        const geo_url =`https://geocoding-api.open-meteo.com/v1/search?name=${cidade_formatada}&count=1`

        // solicito os dados brutos da api de geolocalização com a intenção de extrair a latitude e longitude
        const localizaçao = await fetch(geo_url)
        const resp_tratada = await localizaçao.json()
        console.log(resp_tratada.results[0].latitude)
        console.log(resp_tratada.results[0].longitude)


    }
    catch(erro){      
        console.log(erro)      
    }

    //condição para alternar a visualização da sessão busca e resultado
    if(estadoDaPagina === "buscar"){
        busca.style.display = "none";
        estadoDaPagina = "resultado";
        resultado.style.display = "block";
    }
}

    //quando o botão é clicado, a função faz com que o html oculte a sessao buscar e exiba a sessao resultado
    buscar_botao.addEventListener("click",buscar)
    input.addEventListener("keydown", (event)=>{
        if(event.key==="Enter") buscar()
    })
    
    




















