//Chamar a elementos do DOM para o js
const imagemPokemon = document.querySelector('img.pokemon');
const tiposDiv = document.querySelector('.tipos');
let inputTentativa = document.querySelector('#input-tentativas');
const msg = document.querySelector('.msg');
const again = document.querySelector('.again');


//Criar a variável e randomizar a id do pokemon

let idPokemon;

const randomId = () =>{
  idPokemon = parseInt((Math.random()*890)+1);
}


//Criação das variáveis do pokémon e função que realiza as requisições para a pokeapi que chama e monta o pokémon atual.

let pkmName;
let pkmTypes = [];

const getPokemon = () =>{
  imagemPokemon.classList.add('escondido');
  randomId();
  fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
  .then((res) => res.json())
  .then((data) =>{
    pokemonAtual(data);
  })
  tiposDiv.innerHTML = '';
}

getPokemon();


// Função para tratar os dados requisitados e pegar apenas os necessários (Nome e tipos do pokemon) 


const pokemonAtual = (pokemon) =>{
  pkmName = (pokemon.species.name).replace("-", ' ');

  for(let type of pokemon.types){
    pkmTypes.push(type.type.name);
  }

  pkmSprite(idPokemon);
}


// Função para mudar a imagem do pokemon, ele está escondido por padrão por conta das classes de CSS atribuídas no html

const pkmSprite = (id) =>{
  
  imagemPokemon.src = `https://serebii.net/pokemon/art/${('000'+id).slice(-3)}.png`
}

// Criar variável de tentativas e fazer a função que checa se o chute foi certo ou errado

let tentativas = 10;


const chutar = (nome) =>{

  // Transformei o pkmName em capitalName, onde o nome do pokemon fica com a primeira letra capitalizada

  let capitalName = ((nome).charAt(0).toUpperCase()+(nome).slice(1));

  // Checa se tem alguma coisa no input ao clicar no botão de chute, se não tiver, informa o usuário 

  if(inputTentativa.value == ''){
    msg.innerText = 'Por favor, insira um nome'
  }else{
    msg.innerText = ''

    // Checa se o nome que o usuário chutou é o mesmo do pokémon, pensei em 3 casos, no primeiro onde ele responde exatamente como veio da api (tudo em minúsculo), no segundo onde está tudo capitalizado e no último caso onde o nome está com a primeira letra em maiúsculo

    if(inputTentativa.value == nome || inputTentativa.value == (nome).toUpperCase() || inputTentativa.value == capitalName){
      msg.innerText = `Parabéns! Você descobriu que era um ${capitalName}! 🥳🎉`
      imagemPokemon.classList.remove('escondido');
      again.innerText = 'Jogar novamente!'
    } else{
      tentativas--;
      msg.innerText = `Infelizmente você errou e lhe restam ${tentativas} tentativas.`
    }

    if(tentativas == 0){
      msg.innerText = `Infelizmente você não acertou em 10 tentativas e o nome do pokemon era ${capitalName}! 😭`
      imagemPokemon.classList.remove('escondido');
      again.innerText = 'Tentar novamente!'
    }
  }
}

// Fazer as mudanças necessárias para resetar o jogo quando clicar no "jogar novamente" ou "tentar novamente"

again.onclick = () =>{
  tentativas = 10;
  tiposDiv.innerHTML = ''
  msg.innerText = '';
  inputTentativa.value = '';
  again.innerText = '';
  getPokemon();
}

// Função para mostrar a dica de tipos do pokémon

const chamarDica = (tipos) => {
  tiposDiv.innerHTML = '';
  for(let tipo of tipos){
    let tagTipo = `<p class="${tipo}">${tipo}</p>`

    tiposDiv.insertAdjacentHTML('beforeend', tagTipo);
  }
}

