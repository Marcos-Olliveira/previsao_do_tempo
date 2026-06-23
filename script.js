
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
      

        // Atribuo a constantes os valores recebidos de latitude e longitude
        const latitude = resp_tratada.results[0].latitude;

        const longitude =resp_tratada.results[0].longitude;
       

        //monto a url com as informações de latitude e longitude recebidas pela API acima e busco os dados em tempo real
       const url =`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto&forecast_days=7`

        //armazeno a resposta da requisição em uma constante
        const resposta = await fetch(url)

        //converto a resposta bruta em um objeto manipulavel
        const dados = await resposta.json()
        console.log(dados)
        

        //capturo o elemento html e altero os dias do mês
        //segunda
        let diaDoMesSegunda=document.getElementById("dia-mes-segunda")
        diaDoMesSegunda.textContent=dados.daily.time[0].split("-")[2]
        //terça
        let diaDoMesTerca=document.getElementById("dia-mes-terca")
        diaDoMesTerca.textContent=dados.daily.time[1].split("-")[2]
        //quarta
        let diaDoMesQuarta=document.getElementById("dia-mes-quarta")
        diaDoMesQuarta.textContent=dados.daily.time[2].split("-")[2]
        //quinta
        let diaDoMesQuinta=document.getElementById("dia-mes-quinta")
        diaDoMesQuinta.textContent=dados.daily.time[3].split("-")[2]
        //sexta
        let diaDoMesSexta=document.getElementById("dia-mes-sexta")
        diaDoMesSexta.textContent=dados.daily.time[4].split("-")[2]
        //sábado
        let diaDoMesSabado=document.getElementById("dia-mes-sabado")
        diaDoMesSabado.textContent=dados.daily.time[5].split("-")[2]
        //domingo
        let diaDoMesDomingo=document.getElementById("dia-mes-domingo")
        diaDoMesDomingo.textContent=dados.daily.time[6].split("-")[2]
        
        //atribuo os elementos html em variaveis
        //dia_do_mes=document.getElementById()














          //pego o elemento span no paragrafo acima da tabela do tempo
    let nome_da_cidade_acima_da_tabela = document.getElementById("cidade-nome")


    //atribuo ao span o nome da cidade digitada pelo usuario
    nome_da_cidade_acima_da_tabela.textContent = cidade_pesquisada; 




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
    
    




















