document.addEventListener('DOMContentLoaded', () => {
    if (!window.electronRemote) {
        console.error("electronRemote não está definido.");
        return;
    }

    console.log("electronRemote carregado com sucesso.");

    // Seleciona os botões pelo ID
    const minimizeBtn = document.querySelector('#minimizeButton');
    const maximizeBtn = document.querySelector('#maximizeButton');
    const closeBtn = document.querySelector('#closeButton');

    // Adiciona eventos aos botões, se existirem na página
    if (minimizeBtn) minimizeBtn.addEventListener('click', () => window.electronRemote.minimizeWindow());
    if (maximizeBtn) maximizeBtn.addEventListener('click', () => window.electronRemote.maximizeWindow());
    if (closeBtn) closeBtn.addEventListener('click', () => window.electronRemote.closeWindow());

    // Carregar conteúdo dinâmico na div com ID "content"
    loadContent('pages/home');
});

// Função para carregar páginas dentro da div #content
function loadContent(page) {
    fetch(`${page}.html`)
        .then(response => response.ok ? response.text() : Promise.reject(response.statusText))
        .then(data => document.getElementById('content').innerHTML = data)
        .catch(error => console.error('Erro ao carregar página:', error));
}

// Função para carregar janelas dentro da div #janela
function loadJanela(page) {
    fetch(page)
        .then(response => response.ok ? response.text() : Promise.reject(response.statusText))
        .then(data => document.getElementById('janela').innerHTML = data)
        .catch(error => console.error('Erro ao carregar janela:', error));
}
