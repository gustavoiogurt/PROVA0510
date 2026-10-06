// Notícias usadas pela página. O array deixa o conteúdo separado da estrutura do HTML.
const noticias = [
    {
        titulo: "O vinil voltou, o album Confessions 2, de Madonna comprova isso",
        categoria: "Musica",
        preco: "R$2,59",
        data: "5 out",
        tempo: "14 min",
        inicial: "V"
    },
    {
        titulo: "Pequenas casas de show reinventam a relação com o público gen Z",
        categoria: "Cultura",
        preco: "R$2,59",
        data: "4 out",
        tempo: "1 min",
        inicial: "C"
    },
    {
        titulo: "Como a tecnologia está mudando os bastidores dos festivais",
        categoria: "Tecnologia",
        preco: "R$2,59",
        data: "4 out",
        tempo: "6 min",
        inicial: "T"
    },
    {
        titulo: "Cinco discos brasileiros para descobrir neste fim de semana",
        categoria: "Música",
        preco: "R$2,59",
        data: "3 out",
        tempo: "13 min",
        inicial: "D"
    },
    {
        titulo: "Feiras criativas ocupam novos espaços no centro da cidade",
        categoria: "Cultura",
        preco: "R$2,59",
        data: "R$2,59",
        tempo: "20 min",
        inicial: "F"
    },
    {
        titulo: "Ingressos digitais ganham recursos para facilitar a entrada em eventos",
        categoria: "Tecnologia",
        preco: "R$2,59",
        data: "2 out",
        tempo: "13 min",
        inicial: "I"
    },
    {
        titulo: "Agenda de outubro reúne shows gratuitos em diferentes bairros",
        categoria: "Agenda",
        preco: "R$2,59",
        data: "2 out",
        tempo: "12 min",
        inicial: "A"
    },
    {
        titulo: "O que esperar da nova geração de produtores independentes",
        categoria: "Música",
        preco: "R$2,59",
        data: "1 out",
        tempo: "15 min",
        inicial: "P"
    },
    {
        titulo: "Museus e músicos criam experiências híbridas para o público",
        categoria: "Cultura",
        preco: "R$2,59",
        data: "30 set",
        tempo: "14 min",
        inicial: "M"
    },
    {
        titulo: "Novas ferramentas ajudam artistas a organizar seus lançamentos",
        categoria: "Tecnologia",
        preco: "R$2,59",
        data: "29 set",
        tempo: "15 min",
        inicial: "N"
    },
    {
        titulo: "Programação cultural gratuita para o primeiro domingo do mês",
        categoria: "Agenda",
        preco: "R$2,59",
        data: "28 set",
        tempo: "13 min",
        inicial: "P"
    },
    {
        titulo: "Por dentro dos estúdios que estão apostando no som analógico",
        categoria: "Música",
        preco: "R$2,59",
        data: "27 set",
        tempo: "16 min",
        inicial: "S"
    }
];

const gradeProdutos = document.querySelector("#gradeNoticias");
const filtros = document.querySelectorAll(".filtro");
const campoBusca = document.querySelector("#campoBusca");
const resultadoBusca = document.querySelector("#resultadoBusca");
const botaoCarregar = document.querySelector("#botaoCarregar");
const botaoTema = document.querySelector("#botaoTema");
const relogio = document.querySelector("#relogio");
const formNewsletter = document.querySelector("#formNewsletter");
const mensagemNewsletter = document.querySelector("#mensagemNewsletter");

let categoriaAtual = "Todas";
let quantidadeVisivel = 6;

// Define a classe de cor da categoria para manter a aparência dos cards organizada.
function classeCategoria(categoria) {
    return categoria.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Monta um card de notícia com os dados de cada objeto do array.
function criarCard(noticia) {
    const classe = classeCategoria(noticia.categoria);

    return `
        <article class="card">
            <div class="card__imagem card__imagem--${classe}">
                <img src="imagens/${classe}.svg" alt="Ilustração da notícia: ${noticia.titulo}">
            </div>
            <span class="card__categoria card__categoria--${classe}">${noticia.categoria}</span>
            <h3>${noticia.titulo}</h3>
            <p class="card__meta">${noticia.preco} · ${noticia.data} · ${noticia.tempo}</p>
        </article>
    `;
}

// Aplica simultaneamente o filtro de categoria e a busca digitada pelo usuário.
function noticiasFiltradas() {
    const termo = campoBusca.value.trim().toLowerCase();

    return noticias.filter((noticia) => {
        const pertenceCategoria =
            categoriaAtual === "Todas" || noticia.categoria === categoriaAtual;

        const correspondeBusca =
            noticia.titulo.toLowerCase().includes(termo);

        return pertenceCategoria && correspondeBusca;
    });
}

// Atualiza a grade e controla a quantidade de cards que aparece na tela.
function renderizarNoticias() {
    const lista = noticiasFiltradas();
    const noticiasVisiveis = lista.slice(0, quantidadeVisivel);

    gradeNoticias.innerHTML = noticiasVisiveis.map(criarCard).join("");

    if (lista.length === 0) {
        gradeNoticias.innerHTML = "<p>Nenhuma notícia encontrada.</p>";
        resultadoBusca.textContent = "";
    } else if (campoBusca.value.trim()) {
        resultadoBusca.textContent = `${lista.length} notícia(s) encontrada(s) para sua busca.`;
    } else {
        resultadoBusca.textContent = "";
    }

    botaoCarregar.classList.toggle("oculto", produtosVisiveis.length >= lista.length);
}

// Cada botão altera a categoria ativa e volta a exibir os primeiros resultados.
filtros.forEach((botao) => {
    botao.addEventListener("click", () => {
        categoriaAtual = botao.dataset.categoria;
        quantidadeVisivel = 6;

        filtros.forEach((item) => item.classList.remove("ativo"));
        botao.classList.add("ativo");

        renderizarNoticias();
    });
});

// A busca é atualizada enquanto o usuário digita.
campoBusca.addEventListener("input", () => {
    quantidadeVisivel = 6;
    renderizarNoticias();
});

// Revela mais notícias sem recarregar a página.
botaoCarregar.addEventListener("click", () => {
    quantidadeVisivel += 3;
    renderizarNoticias();
});

// Atualiza o relógio da página a cada segundo.
function atualizarRelogio() {
    const agora = new Date();

    const data = agora.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long"
    });

    const hora = agora.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    relogio.textContent = `${data} · ${hora}`;
}

atualizarRelogio();
setInterval(atualizarRelogio, 1000);

// Recupera o tema salvo no navegador. Se não houver escolha, usa a preferência do sistema.
function definirTemaInicial() {
    const temaSalvo = localStorage.getItem("tema-frequencia");

    if (temaSalvo) {
        document.documentElement.dataset.theme = temaSalvo;
        return;
    }

    const prefereEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (prefereEscuro) {
        document.documentElement.dataset.theme = "escuro";
    }
}

function atualizarTextoBotaoTema() {
    const temaEscuro = document.documentElement.dataset.theme === "escuro";

    botaoTema.innerHTML = temaEscuro
        ? '<span aria-hidden="true">☀</span><span>Tema claro</span>'
        : '<span aria-hidden="true">☾</span><span>Tema escuro</span>';

    botaoTema.setAttribute(
        "aria-label",
        temaEscuro ? "Ativar tema claro" : "Ativar tema escuro"
    );
}

// Alterna o tema e guarda a escolha para a próxima visita.
botaoTema.addEventListener("click", () => {
    const temaAtual = document.documentElement.dataset.theme;
    const novoTema = temaAtual === "escuro" ? "claro" : "escuro";

    if (novoTema === "escuro") {
        document.documentElement.dataset.theme = "escuro";
    } else {
        document.documentElement.removeAttribute("data-theme");
    }

    localStorage.setItem("tema-frequencia", novoTema);
    atualizarTextoBotaoTema();
});

// Valida o e-mail da newsletter e mostra uma mensagem sem recarregar a página.
formNewsletter.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValido) {
        mensagemNewsletter.textContent = "Digite um e-mail válido para assinar.";
        return;
    }

    mensagemNewsletter.textContent = "Inscrição realizada. Obrigado!";
    formNewsletter.reset();
});

definirTemaInicial();
atualizarTextoBotaoTema();
renderizarNoticias();
