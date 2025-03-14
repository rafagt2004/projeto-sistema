const remote = require('@electron/remote');

function minimizeWindow() {
    remote.getCurrentWindow().minimize();
}

function maximizeWindow() {
    const window = remote.getCurrentWindow();
    if (window.isMaximized()) {
        window.unmaximize();
    } else {
        window.maximize();
    }
}

function closeWindow() {
    remote.getCurrentWindow().close();
}

// Função existente para carregar conteúdo
function loadContent(page) {
    fetch(page + '.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
        });
}

function loadJanela(page) {
    fetch(page)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar a página: ' + response.statusText);
        }
        return response.text();
    })
    .then(data => {
        document.getElementById('janela').innerHTML = data;
    })
    .catch(error => console.error('Erro ao carregar a página:', error));
}

// Carregar a página "Home" automaticamente ao iniciar
document.addEventListener('DOMContentLoaded', (event) => {
    loadContent('pages/home');
});