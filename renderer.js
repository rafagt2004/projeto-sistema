const janelaCache = {}; // Armazena a janela para cada aba principal

$(document).ready(function () {
    if (!window.electronRemote) {
        console.error("electronRemote não está definido.");
        return;
    }

    console.log("electronRemote carregado com sucesso.");

    // Botões de controle da janela
    const minimizeBtn = $('#minimizeButton');
    const maximizeBtn = $('#maximizeButton');
    const closeBtn = $('#closeButton');
    const maximizeIcon = $('#maximizeButton img');

    minimizeBtn.on('click', () => window.electronRemote.minimizeWindow());
    maximizeBtn.on('click', () => window.electronRemote.maximizeWindow());
    closeBtn.on('click', () => window.electronRemote.closeWindow());

    window.electronRemote.onMaximized(() => {
        maximizeIcon.attr('src', './icons/unmax.svg').attr('alt', 'Restaurar');
    });

    window.electronRemote.onRestored(() => {
        maximizeIcon.attr('src', './icons/max.svg').attr('alt', 'Maximizar');
    });

    // Carrega a página inicial
    loadContent('pages/home');
    loadJanela('pages/janelas/clientes.html')

    // Animação do menu hambúrguer
    $('.menu-hamburguer').on('click', function (event) {
        event.stopPropagation();
        $('#menu').toggleClass('active');
        $('.titles-list').toggleClass('active');
        $(this).toggleClass('active');
        setTimeout(() => {
            $(this).removeClass("active");
        }, 200);
    });

    $('#menu').on('click', function (event) {
        event.stopPropagation();
    });

    $(document).on('click', function (event) {
        if (!$(event.target).closest('#menu').length) {
            $('#menu').removeClass('active');
            $('.titles-list').removeClass('active');
        }
    });

    // Captura de cliques para abrir janelas
    $(document).on('click', '[data-janela]', function (e) {
        e.preventDefault();
        const page = $(this).data('janela');
        loadJanela(page);
    });

    // Captura de cliques para carregar páginas
    $(document).on('click', '[data-page]', function (e) {
        e.preventDefault();
        const page = $(this).data('page');
        loadContent(page);
    });

    // Função para ativar visualmente o item do menu lateral (para páginas)
    function setActiveMenu(selector, page) {
        $(selector).removeClass('active');
        $(`${selector}[data-page="${page}"]`).addClass('active');
    }

    // Função específica para destacar o item de menu de janelas
    function setActiveJanelaMenu(page) {
        $('.menu-item-list').removeClass('active');
        $(`.menu-item-list[data-janela="${page}"]`).addClass('active');
    }

    window.setActiveMenu = setActiveMenu;
    window.setActiveJanelaMenu = setActiveJanelaMenu;
});

// Função para carregar conteúdo no #content e restaurar a janela se houver cache
function loadContent(page) {
    $.get(`${page}.html`)
        .done(data => {
            $('#content').html(data);
            setActiveMenu('.menu-item', page, '#menu');

            // Verifica se existe janela salva para essa aba
            if (janelaCache[page]) {
                $('#janela').html(janelaCache[page].data);
                setActiveJanelaMenu(janelaCache[page].page);
            } else {
                $('#janela').empty();
            }
        })
        .fail(error => {
            console.error('Erro ao carregar página:', error.statusText);
            $('#content').html('<p>Erro ao carregar conteúdo.</p>');
        });
}

// Função para carregar conteúdo no #janela e salvar no cache
function loadJanela(page) {
    $.get(page)
        .done(data => {
            $('#janela').html(data);
            setActiveJanelaMenu(page);

            // Descobre qual aba principal está ativa
            const activeContent = $('.menu-item.active').data('page');
            if (activeContent) {
                // Salva o conteúdo da janela no cache vinculado à aba atual
                janelaCache[activeContent] = { page, data };
            }
        })
        .fail(error => {
            console.error('Erro ao carregar janela:', error.statusText);
            $('#janela').html('<p>Erro ao carregar janela.</p>');
        });
}
