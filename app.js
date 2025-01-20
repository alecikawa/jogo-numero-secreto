let listaDeNumerosSorteados = [];
let numeroLimite = 10; // limite de numeros que podem ser sorteados
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10. Tente adivinhar';

// em baixo tem a forma abreviada dos cod a cima
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); // fala o texto não suportada no navegador opera
    if ('speechSynthesis' in window) {  // verifica se o navegador suporta a API de fala
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");  
    }
}

function exibirMensagemIncial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemIncial();

// function: trexo de cod responsavel por uma função
function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Parabéns! Você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o Número Secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); // habilita o botão
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'Você errou! O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'Você errou! O número secreto é maior');
        }
        tentativas++;
        limparCampo(); // limpa o campo de inserir o numero
    }
};

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);  // gera um numero aleatorio entre 1 e 10
    let quantidaDeElementosNaLista = listaDeNumerosSorteados.length; // pega a quantidade de elementos na lista

    if (quantidaDeElementosNaLista == numeroLimite) {  // verifica se a lista de numeros sorteados está cheia
        listaDeNumerosSorteados = []; // limpa a lista de numeros sorteados
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { // verifica se o numero sorteado já foi sorteado
        return gerarNumeroAleatorio(); 
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); // adiciona o numero sorteado na lista
        return numeroEscolhido;
    }
}

// função para limpar o campo de inserir o numero
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemIncial();
    document.getElementById('reiniciar').setAttribute('disabled', 'true'); // desabilita o botão quando começar um novo jogo
}
