function buscaPersonagem(event) {
    event.preventDefault();

    const personagem = document.getElementById('personagem').value; /* variaveis*/ 
    const nome = document.getElementById('nome');
    const fotoPersonagem = document.getElementById('fotoPersonagem');
    const idPersonagem = document.getElementById('idPersonagem');
    const quadrinhosList = document.getElementById('quadrinhos');

    const keys = "ts=1670913383902&apikey=edc9531ea872c74a2855ed93a5903229&hash=bbb581dcf34e4752243b361daa960fb1";
    const limit10 = "limit=10&"; 
    const offset = "offset=5&";       
    const API = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${personagem}`;
    const URL = `${API}&${limit10}${offset}${keys}`; /*link da api e chaves necessárias para usar*/

    fetch(URL)
    
        .then((response) => response.json())
        .then((data) => {
            if (data.data.results.length > 0) {/* Chamando as informações da api*/
                nome.value = data.data.results[0].name;
                fotoPersonagem.src = data.data.results[0].thumbnail.path + '.' + data.data.results[0].thumbnail.extension;
                idPersonagem.textContent = data.data.results[0].id;
          
                quadrinhosList.innerHTML = ""; // Limpar a lista antes de adicionar os quadrinhos
          
                data.data.results[0].comics.items.forEach((comic) => {
                  const li = document.createElement("li");
                  li.textContent = comic.name;
                  quadrinhosList.appendChild(li);
                });
              } else { // Se nenhum resultado for encontrado
                alert("Personagem não encontrado");
              }
            })
        }          