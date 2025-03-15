$(document).ready(function () {
    if (!window.electronRemote) {
        console.error("electronRemote não está definido.");
        return;
    }

    console.log("electronRemote carregado com sucesso.");

    // Seleciona os botões pelo ID
    const minimizeBtn = $('#minimizeButton');
    const maximizeBtn = $('#maximizeButton');
    const closeBtn = $('#closeButton');

    // Adiciona eventos aos botões, se existirem na página
    if (minimizeBtn.length) minimizeBtn.on('click', () => window.electronRemote.minimizeWindow());
    if (maximizeBtn.length) maximizeBtn.on('click', () => window.electronRemote.maximizeWindow());
    if (closeBtn.length) closeBtn.on('click', () => window.electronRemote.closeWindow());

    // Carregar conteúdo dinâmico na div com ID "content"
    loadContent('pages/home');
});

// Função para carregar páginas dentro da div #content
function loadContent(page) {
    $.get(`${page}.html`)
        .done(data => $('#content').html(data))
        .fail(error => console.error('Erro ao carregar página:', error.statusText));
}

// Função para carregar janelas dentro da div #janela
function loadJanela(page) {
    $.get(page)
        .done(data => $('#janela').html(data))
        .fail(error => console.error('Erro ao carregar janela:', error.statusText));
}

$(document).ready(function () {
    console.log($("button"));
});