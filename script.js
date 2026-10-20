import { aleatorio, nome } from './aleatorio.js';
import { perguntas } from './perguntas.js';

const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoJogarNovamente = document.querySelector(".novamente-btn");
const botaoIniciar = document.querySelector(".iniciar-btn");
const telaInicial = document.querySelector(".tela-inicial");

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

botaoIniciar.addEventListener('click', iniciaJogo);
botaoJogarNovamente.addEventListener('click', reiniciaJogo);

function iniciaJogo() {
    atual = 0;
    historiaFinal = "";
    telaInicial.style.display = 'none'; 
    
    caixaPerguntas.classList.remove("esconder");
    caixaAlternativas.classList.remove("esconder");
    caixaResultado.classList.add("esconder");
    
    substituiNome();
    mostraPergunta();
}

function reiniciaJogo() {
    telaInicial.style.display = 'block';
    caixaPerguntas.classList.add("esconder");
    caixaAlternativas.classList.add("esconder");
    caixaResultado.classList.add("esconder");
}

function substituiNome() {
    // Exemplo básico de substituição se necessário
    console.log(`Jogador ativo: ${nome}`);
}

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacao = aleatorio(opcaoSelecionada.afirmacao);
    historiaFinal += afirmacao + " ";
    atual++;
    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.classList.add("esconder");
    caixaAlternativas.classList.add("esconder");
    caixaResultado.classList.remove("esconder");
    textoResultado.textContent = historiaFinal;
}
