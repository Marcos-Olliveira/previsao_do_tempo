

    
        //crio uma função global para buscar o resultado da pesquisa
        async function buscar() {


            
                //armazeno o valor digitado pelo usuario no campo de pesquisa na sessao busca
                let cidade_pesquisada = document.getElementById("buscar_cidade").value;

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
                       let resul = document.querySelector("#proximos_dias")
                        



                    

                        // Atribuo a constantes os valores recebidos de latitude e longitude
                        const latitude = resp_tratada.results[0].latitude;

                        const longitude =resp_tratada.results[0].longitude;
                    

                        //monto a url com as informações de latitude e longitude recebidas pela API acima e busco os dados em tempo real
                        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,is_day,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&timezone=auto&forecast_days=7`;
                        //armazeno a resposta da requisição em uma constante
                        const resposta = await fetch(url)

                        //converto a resposta bruta em um objeto manipulavel
                        const dados = await resposta.json()
                        console.log(dados)

                        // limpo o container antes de desenhar os cards, pra evitar que
                        // buscas repetidas empilhem cards antigos junto com os novos
                        resul.innerHTML = "";

                        // array de tradução número -> nome do dia.
                        // o índice tem que bater com o retorno de getDay(): 0 = Domingo ... 6 = Sábado
                        const dia_da_semana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

                        // tabela simplificada de tradução do weather_code (código WMO) da API
                        // pra uma descrição legível. Não é exaustiva, cobre os códigos mais comuns.
                        const mapaTempo = {
                            0: "Céu limpo",
                            1: "Poucas nuvens",
                            2: "Parcialmente nublado",
                            3: "Nublado",
                            45: "Neblina",
                            48: "Neblina com geada",
                            51: "Garoa fraca",
                            53: "Garoa moderada",
                            55: "Garoa forte",
                            61: "Chuva fraca",
                            63: "Chuva moderada",
                            65: "Chuva forte",
                            71: "Neve fraca",
                            73: "Neve moderada",
                            75: "Neve forte",
                            80: "Pancadas de chuva fracas",
                            81: "Pancadas de chuva moderadas",
                            82: "Pancadas de chuva fortes",
                            95: "Trovoadas"
                        };

                        //constantes que representarão os bocos principais no html 
                        // const elementoDia = document.createElement('h3');
                        //     elementoDia.classList.add('card-dia-semana');
                        //     elementoDia.textContent = nomeDoDia;

                        //seleciona o elemento gora no html
                        const card_agora = document.getElementById('agora')

                        //cria um paragrafo
                        const informacao_atual = document.createElement('p');
                        informacao_atual.id ='informacao_atual'
                        informacao_atual.innerText = "Agora"

                        const temp_atual = document.createElement('span');
                        const celsius = document.createElement('span');
                        temp_atual.id='temp_atual'
                        celsius.id='celsius'                       
                        temp_atual.innerText=`${dados.current.apparent_temperature}`
                        celsius.innerText=`${dados.current_units.temperature_2m }` 

                        const estado_atual = document.createElement('p')
                        estado_atual.id = 'estado_atual'
                        estado_atual.innerText = `${mapaTempo[dados.current.weather_code]}`


                        const temp_max_atual=document.createElement('span');
                        const temp_min_atual=document.createElement('span');
                        temp_max_atual.id='temp_max_atual';
                        temp_min_atual.id='temp_min_atual';
                        temp_max_atual.innerText=`${dados.daily.temperature_2m_max[0]}`
                        temp_min_atual.innerHTML=`<span>${dados.daily.temperature_2m_min[0]}</span><br>`

                        const umidade_atual = document.createElement('span');
                        const vento_atual = document.createElement('span');
                        umidade_atual.id = 'umidade_atual';
                        vento_atual.id = 'vento_atual'
                        umidade_atual.innerText = `${dados.current.relative_humidity_2m}%`
                        vento_atual.innerText = `${dados.current.wind_speed_10m} Km/h`
   




                        
                        card_agora.appendChild(informacao_atual);
                        card_agora.appendChild(temp_atual);
                        card_agora.appendChild(celsius);
                        card_agora.appendChild(estado_atual);
                        card_agora.appendChild(temp_max_atual);
                        card_agora.appendChild(temp_min_atual);
                        card_agora.appendChild(umidade_atual);
                        card_agora.appendChild(vento_atual);


                        

                        // percorro o array de datas (time). Uso "item" pra pegar a data daquele dia,
                        // e "index" pra buscar a MESMA posição nos outros arrays paralelos
                        // (temperature_2m_max, temperature_2m_min, precipitation_sum, weather_code)
                        dados.daily.time.forEach(function (item, index) {

                            // divido a string representada por item em 3 partes (ano, mes, dia)
                            const data_bruta = item.split("-");
                            const ano = data_bruta[0];
                            const mes = data_bruta[1];
                            const dia = data_bruta[2];

                            // construo o objeto Date na ORDEM que o construtor espera: (ano, mes-1, dia).
                            // o "-1" no mês é necessário pq o Date usa índice de mês (0 = Janeiro ... 11 = Dezembro)
                            const data = new Date(ano, mes - 1, dia);

                            // getDay() devolve um número de 0 a 6 (um único número, não um array),
                            // que eu uso como índice pra buscar o nome certo dentro de dia_da_semana
                            const numeroDoDia = data.getDay();
                            const nomeDoDia = dia_da_semana[numeroDoDia];

                            // busco, na mesma posição (index), o valor correspondente em cada
                            // um dos outros arrays paralelos
                            const tempMax = dados.daily.temperature_2m_max[index];
                            const tempMin = dados.daily.temperature_2m_min[index];
                            const precipitacao = dados.daily.precipitation_sum[index];
                            const codigoClima = dados.daily.weather_code[index];
                            const descricaoClima = mapaTempo[codigoClima] || "Não disponível";

                            // ---------- construção do card (createElement + appendChild) ----------

                            // 1. crio o container do card (a "caixa" vazia, ainda isolada em memória)
                            const card = document.createElement('div');
                            card.classList.add('card');

                            // 2. crio e preencho cada pedaço de informação, um elemento por vez
                            const elementoDia = document.createElement('h3');
                            elementoDia.classList.add('card-dia-semana');
                            elementoDia.textContent = nomeDoDia;

                            const elementoData = document.createElement('p');
                            elementoData.classList.add('card-data');
                            elementoData.textContent = `${dia}/${mes}`;

                            const elementoClima = document.createElement('p');
                            elementoClima.classList.add('card-clima');
                            elementoClima.textContent = descricaoClima;

                            const elementoTempMax = document.createElement('p');
                            elementoTempMax.classList.add('card-temp-max');
                            elementoTempMax.textContent = `Máx: ${tempMax}°C`;

                            const elementoTempMin = document.createElement('p');
                            elementoTempMin.classList.add('card-temp-min');
                            elementoTempMin.textContent = `Mín: ${tempMin}°C`;

                            const elementoPrecipitacao = document.createElement('p');
                            elementoPrecipitacao.classList.add('card-precipitacao');
                            elementoPrecipitacao.textContent = `Chuva: ${precipitacao}mm`;

                            // 3. encaixo cada pedaço DENTRO do card (a ordem aqui = ordem visual no card)
                            card.appendChild(elementoDia);
                            card.appendChild(elementoData);
                            card.appendChild(elementoClima);
                            card.appendChild(elementoTempMax);
                            card.appendChild(elementoTempMin);
                            card.appendChild(elementoPrecipitacao);

                            // 4. só depois do card estar montado por completo, encaixo ele
                            // no container principal da página (#resul)
                            resul.appendChild(card);
                        });
                    }
                    catch(erro){      
                        console.log(erro)      
                    }
                } }
