// ------------ CARROSSEL ------------
// Seleciona itens do carrossel
const items = document.querySelectorAll(".carrossel_item");
let index = 0;
let bloqueado = false; // Bloqueia click até a animação acabar

// Atualiza classes corretamente
function atualizarCarrossel() {
    items.forEach((item, i) => {
        item.classList.remove("ativo", "esquerda", "direita");

        if (i === index) {
            item.classList.add("ativo");
        } else if (i === (index - 1 + items.length) % items.length) {
            item.classList.add("esquerda");
        } else if (i === (index + 1) % items.length) {
            item.classList.add("direita");
        }
    });
}

// Primeira atualização
atualizarCarrossel();

// Função para trocar imagem
function mudarImagem(direcao) {
    if (bloqueado) return; // evita bug de clicar rápido

    bloqueado = true;
    setTimeout(() => bloqueado = false, 600); // libera após animação

    if (direcao === "next") {
        index = (index + 1) % items.length;
    } else {
        index = (index - 1 + items.length) % items.length;
    }

    atualizarCarrossel();
}

// Botões do carrosel para passar as imagens

//carrosel 1
document.getElementById("nextBtn").addEventListener("click", () => mudarImagem("next"));
document.getElementById("prevBtn").addEventListener("click", () => mudarImagem("prev"));


// Seleção dos heróis
const cards_heroi = document.querySelectorAll(".card_heroi");
const input_heroi = document.getElementById("heroi_escolhido");

cards_heroi.forEach((card, i) => {
    card.addEventListener("click", () => {

        // Mover o carrossel até que o card clicado vire o central
        solIndex = i;
        atualizarCarrossel2();

        // Atualizar seleção corretamente
        cards_heroi.forEach(c => c.classList.remove("selecionado"));
        card.classList.add("selecionado");

        input_heroi.value = card.dataset.hero;
    });
});




// Formulário
const form = document.getElementById("form_solicitacao");
const mensagem_final = document.getElementById("mensagem_final");

form.addEventListener("submit", (e) => {
    e.preventDefault(); // evita reload da página

    const nome = document.getElementById("nome").value;
    const endereco = document.getElementById("endereco").value;
    const problema = document.getElementById("problema").value;
    const heroi = input_heroi.value;

    if (!heroi) {
        alert("Escolha um herói antes de enviar!");
    } else if (nome || endereco || problema || heroi) {
        alert(`Seu herói está a caminho,${nome}!`);
    }

    // Guarda no navegador
    const dados = {
        nome,
        endereco,
        problema,
        heroi
    };

    localStorage.setItem("solicitacaoODH", JSON.stringify(dados));
    /**
    
    // Exibe mensagem final
    mensagem_final.innerText = `Seu herói está a caminho, ${nome}!`;
    mensagem_final.style.display = "block";

    // Esconde depois de 5 segundos
    setTimeout(() => {
        mensagem_final.style.display = "none";
    }, 3000);

    **/

    form.reset();
});



//GRAFICO

const ctx = document.getElementById('grafico_entrada');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2021', '2022', '2023', '2024', '2025'],
        datasets: [{
            label: 'Eficiência (%)',
            data: [87, 91, 90, 93, 96],
            borderWidth: 4,
            borderColor: '#28a745',   // verde
            backgroundColor: 'rgba(40, 167, 69, 0.15)', // preenchimento suave
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: '#28a745',
            pointHoverBackgroundColor: '#fff',
            tension: 0.35, // curva suave
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 1500, // animação de entrada da linha
            easing: 'easeOutQuart'
        },
        plugins: {
            legend: {
                labels: { 
                    color: '#333',
                    font: {
                        size: 14,
                        family: "Montserrat"
                    }
                }
            },
            tooltip: {
                backgroundColor: "#333",
                borderColor: "#28a745",
                borderWidth: 1,
                titleColor: "#fff",
                bodyColor: "#eee",
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                max: 100,
                grid: { color: '#ccc' },
                ticks: { color: "#333" }
            },
            x: {
                grid: { color: '#ccc' },
                ticks: { color: "#333" }
            }
        }
    }
});









let solIndex = 0;
const heroes = document.querySelectorAll(".card_heroi");
const totalHeroes = heroes.length;

function atualizarCarrossel2() {
    // Remove classes
    heroes.forEach(h => h.classList.remove("ativo2", "esquerda2", "direita2"));

    // Índices circular (loop infinito)
    let centro = solIndex;
    let esquerda = (solIndex - 1 + totalHeroes) % totalHeroes;
    let direita = (solIndex + 1) % totalHeroes;

    // Aplica classes
    heroes[centro].classList.add("ativo2");
    heroes[esquerda].classList.add("esquerda2");
    heroes[direita].classList.add("direita2");
}

// Eventos dos botões
document.getElementById("solNext").addEventListener("click", () => {
    solIndex = (solIndex + 1) % totalHeroes;
    atualizarCarrossel2();
});

document.getElementById("solPrev").addEventListener("click", () => {
    solIndex = (solIndex - 1 + totalHeroes) % totalHeroes;
    atualizarCarrossel2();
});

// Inicializa
atualizarCarrossel2();


function atualizarSelecaoAutomatica() {
    // remove seleção antiga
    heroes.forEach(c => c.classList.remove("selecionado"));

    // seleciona automaticamente o card do centro
    const cardAtual = heroes[solIndex];
    cardAtual.classList.add("selecionado");

    // atualiza input hidden com o nome do herói
    input_heroi.value = cardAtual.dataset.hero;
}




document.getElementById("solNext").addEventListener("click", () => {
    solIndex = (solIndex + 0) % totalHeroes;
    atualizarCarrossel2();
    atualizarSelecaoAutomatica(); // <--- AQUI
});

document.getElementById("solPrev").addEventListener("click", () => {
    solIndex = (solIndex - 0 + totalHeroes) % totalHeroes;
    atualizarCarrossel2();
    atualizarSelecaoAutomatica(); // <--- AQUI
});




document.addEventListener('DOMContentLoaded', () => {
    const toggleMenu = document.querySelector('.toggle_menu');
    const menuArea = document.querySelector('.menu_area');
    const navLinks = document.querySelectorAll('.nav_coisas a');

    if (toggleMenu && menuArea) {
        toggleMenu.addEventListener('click', () => {
            menuArea.classList.toggle('aberto');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (menuArea.classList.contains('aberto')) {
                    menuArea.classList.remove('aberto');
                }
            });
        });
    }
    // Restante da sua lógica de carrossel...
});




// ==================================
// Lógica do Menu Hambúrguer
// ==================================
const toggleMenu = document.querySelector('.toggle_menu');
const navCoisas = document.querySelector('.nav_coisas');
const navLinks = document.querySelectorAll('.nav_coisas ul');

// Função para abrir/fechar o menu
function toggleMobileMenu() {
    navCoisas.classList.toggle('open');
    // Se o menu estiver aberto, ajusta o ícone
    if (navCoisas.classList.contains('open')) {
        toggleMenu.querySelector('.barras').innerHTML = '&#x2715;'; // Ícone de 'X' (fechar)
    } else {
        toggleMenu.querySelector('.barras').innerHTML = '&#8801;'; // Ícone de Hambúrguer
    }
}

// Adiciona o evento de clique ao botão do menu
toggleMenu.addEventListener('click', toggleMobileMenu);

// Fecha o menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Verifica se o menu está aberto para fechar (útil apenas em telas pequenas)
        if (navCoisas.classList.contains('open')) {
            toggleMobileMenu(); // Chama a função para fechar o menu e reverter o ícone
        }
    });
});