
//armazena as sessoes busca e resultado em duas variáveis


    
        //crio uma função global para buscar o resultado da pesquisa
        async function buscar() {


            
                //armazeno o valor digitado pelo usuario no campo de pesquisa na sessao busca
                let cidade_pesquisada = document.getElementById("input").value;

                //Trato o texto digitado pelo usuário para ter compatibilidade nos navegadores
                let cidade_formatada = encodeURIComponent(cidade_pesquisada)

                if(cidade_formatada== ""){
                    console.log(`Por favor digite uma cidade valida`)
                }else{

                    //crio a rede de segurança para monitorar
                    try {
                        //atribuo uma constante com a url para usar como parametro
                        const geo_url =`https://geocoding-api.open-meteo.com/v1/search?name=${cidade_formatada}&count=1`

                        // solicito os dados brutos da api de geolocalização com a intenção de extrair a latitude e longitude
                        const localizaçao = await fetch(geo_url)
                        const resp_tratada = await localizaçao.json()



                    // teste no html através do id result (apapgar depois)
                       let resul = document.querySelector("#resul")
                        



                    

                        // Atribuo a constantes os valores recebidos de latitude e longitude
                        const latitude = resp_tratada.results[0].latitude;

                        const longitude =resp_tratada.results[0].longitude;
                    

                        //monto a url com as informações de latitude e longitude recebidas pela API acima e busco os dados em tempo real
                        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&timezone=auto&forecast_days=7`;
                        //armazeno a resposta da requisição em uma constante
                        const resposta = await fetch(url)

                        //converto a resposta bruta em um objeto manipulavel
                        const dados = await resposta.json()
                        console.log(dados);

                        
                        dados.daily.time.forEach(()=> {

                        resul.innerHTML= dados.daily.time[1]
                        
                            
                            
                        });
                        


                            

                        
                    }
                    catch(erro){      
                        console.log(erro)      
                    }
                } }
