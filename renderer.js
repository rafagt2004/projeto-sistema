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
    const maximizeIcon = $('#maximizeButton img'); // Seleciona a imagem do botão de maximizar

    // Adiciona eventos aos botões
    if (minimizeBtn.length) minimizeBtn.on('click', () => window.electronRemote.minimizeWindow());
    if (maximizeBtn.length) maximizeBtn.on('click', () => window.electronRemote.maximizeWindow());
    if (closeBtn.length) closeBtn.on('click', () => window.electronRemote.closeWindow());

    // Ouve o evento de maximização enviado pelo main.js
    window.electronRemote.onMaximized(() => {
        maximizeIcon.attr('src', './icons/unmax.svg');
        maximizeIcon.attr('alt', 'Unmaximize');
    });

    // Ouve o evento de restauração enviado pelo main.js
    window.electronRemote.onRestored(() => {
        maximizeIcon.attr('src', './icons/max.svg');
        maximizeIcon.attr('alt', 'Maximize');
    });

    // Carregar conteúdo dinâmico na div #content
    loadContent('pages/home');

    // Quando clica no menu-hamburguer
    $('.menu-hamburguer').click(function (event) {
        event.stopPropagation(); // Impede que o clique se propague para o documento
        $('#menu').animate({ width: 'toggle' }, 350);
        $('.titles-list').animate({ width: 'toggle' }, 350);
        $(this).toggleClass("active");

        // Voltar ao estado inicial após um tempo
        setTimeout(() => {
            $(this).removeClass("active");
        }, 200); // Tempo em milissegundos
    });

    // Fecha o menu se clicar em qualquer outra área
    $(document).click(function () {
        $('#menu').animate({ width: 'hide' }, 350);
        $('.titles-list').animate({ width: 'hide' }, 350);
        $('.menu-hamburguer').removeClass("active");
    });
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
