$(document).ready(function () {
    if (!window.electronRemote) {
        console.error("electronRemote não está definido.");
        return;
    }

    console.log("electronRemote carregado com sucesso.");

    // Seleciona os botões de controle da janela
    const minimizeBtn = $('#minimizeButton');
    const maximizeBtn = $('#maximizeButton');
    const closeBtn = $('#closeButton');
    const maximizeIcon = $('#maximizeButton img');

    minimizeBtn.on('click', () => window.electronRemote.minimizeWindow());
    maximizeBtn.on('click', () => window.electronRemote.maximizeWindow());
    closeBtn.on('click', () => window.electronRemote.closeWindow());

    // Atualiza o ícone de maximizar/restaurar conforme o estado da janela
    window.electronRemote.onMaximized(() => {
        maximizeIcon.attr('src', './icons/unmax.svg').attr('alt', 'Restaurar');
    });

    window.electronRemote.onRestored(() => {
        maximizeIcon.attr('src', './icons/max.svg').attr('alt', 'Maximizar');
    });

    // Carrega a página inicial (se necessário, para seu contexto)
    loadContent('pages/home');

    // Animação do menu hamburguer
    $('.menu-hamburguer').on('click', function (event) {
        event.stopPropagation();
        $('#menu').toggleClass('active');
        $('.titles-list').toggleClass('active');
        $(this).toggleClass('active');
    });

    // Impede o fechamento do menu clicando dentro dele
    $('#menu').on('click', function (event) {
        event.stopPropagation();
    });

    // Fecha o menu clicando fora
    $(document).on('click', function () {
        $('#menu').removeClass('active');
        $('.titles-list').removeClass('active');
        $('.menu-hamburguer').removeClass('active');
    });

    // Função para adicionar/remover a classe 'active' nos itens
    function handleMenuItemClick(selector) {
        $(selector).click(function () {
            // Remove a classe 'active' de todos os itens
            $(selector).removeClass('active');
            // Adiciona 'active' no item clicado
            $(this).addClass('active');
        });
    }
    
    handleMenuItemClick('.menu-item');
    handleMenuItemClick('.menu-item-list');
    // Aplica a função nos itens de menu e lista
});

// Função para carregar conteúdo principal sem transição (opcional, se for necessário)
function loadContent(page) {
    $.get(`${page}.html`)
        .done(data => {
            $('#content').html(data);
        })
        .fail(error => {
            console.error('Erro ao carregar página:', error.statusText);
            $('#content').html('<p>Erro ao carregar conteúdo.</p>');
        });
}

function loadJanela(page) {
    $.get(page)
        .done(data => {
            $('#janela').html(data);
        })
        .fail(error => {
            console.error('Erro ao carregar janela:', error.statusText);
            $('#janela').html('<p>Erro ao carregar janela.</p>');
        });
}
