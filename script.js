document.addEventListener('DOMContentLoaded', function() {
    const botaoAcessibilidade = document.getElementById('botao-acessibilidade');
    const submenuAcessibilidade = document.getElementById('submenu-acessibilidade');
    const aumentarFonteBtn = document.getElementById('aumentar-fonte');
    const diminuirFonteBtn = document.getElementById('diminuir-fonte');
    const botaoContraste = document.getElementById('contraste');
    const seletorContraste = document.getElementById('seletor-contraste');
    const corContrasteInput = document.getElementById('cor-contraste');
    const aplicarContrasteBtn = document.getElementById('aplicar-contraste');
    const elementosParaAlterarFonte = document.querySelectorAll('body, h1, h2, p, a, label, input, textarea, button');
    let tamanhoFonteAtual = parseFloat(getComputedStyle(document.body).fontSize);
    let contrasteAtivo = false;
    let corTextoContrasteAtual = '#ffffff'; // Cor padrão do texto para o contraste (branco)
    let corFundoContrasteAtual = '#000000'; // Cor padrão do fundo para o contraste (preto)
    const corFundoPadrao = getComputedStyle(document.body).backgroundColor;
    const corTextoPadrao = getComputedStyle(document.body).color;

    function atualizarTamanhoFonte() {
        elementosParaAlterarFonte.forEach(elemento => {
            elemento.style.fontSize = `${tamanhoFonteAtual}px`;
        });
    }

    function aplicarContrasteCor(corTexto, corFundo) {
        document.body.style.backgroundColor = corFundo;
        document.body.style.color = corTexto;
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            link.style.color = corTexto;
        });
        const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headers.forEach(header => {
            header.style.color = corTexto;
        });
        const labels = document.querySelectorAll('label');
        labels.forEach(label => {
            label.style.color = corTexto;
        });
    }

    function resetContraste() {
        document.body.style.backgroundColor = corFundoPadrao;
        document.body.style.color = corTextoPadrao;
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            link.style.color = getComputedStyle(link).getPropertyValue('color');
        });
        const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headers.forEach(header => {
            header.style.color = getComputedStyle(header).getPropertyValue('color');
        });
        const labels = document.querySelectorAll('label');
        labels.forEach(label => {
            label.style.color = getComputedStyle(label).getPropertyValue('color');
        });
        contrasteAtivo = false;
        corTextoContrasteAtual = '#ffffff';
        corFundoContrasteAtual = '#000000';
        corContrasteInput.value = '#000000';
        seletorContraste.classList.remove('aberto');
    }

    botaoAcessibilidade.addEventListener('click', function() {
        submenuAcessibilidade.classList.toggle('aberto');
        seletorContraste.classList.remove('aberto');
        resetContraste();
    });

    aumentarFonteBtn.addEventListener('click', function() {
        tamanhoFonteAtual += 2;
        atualizarTamanhoFonte();
    });

    diminuirFonteBtn.addEventListener('click', function() {
        tamanhoFonteAtual -= 2;
        if (tamanhoFonteAtual < 12) {
            tamanhoFonteAtual = 12;
        }
        atualizarTamanhoFonte();
    });

    botaoContraste.addEventListener('click', function(event) {
        event.stopPropagation();
        submenuAcessibilidade.classList.add('aberto');
        seletorContraste.classList.toggle('aberto');
        contrasteAtivo = !contrasteAtivo;
        if (!contrasteAtivo) {
            resetContraste();
        } else {
            // Aplica o contraste padrão ao abrir o seletor
            aplicarContrasteCor(corTextoContrasteAtual, corFundoContrasteAtual);
        }
    });

    corContrasteInput.addEventListener('input', function() {
        const corSelecionada = this.value;
        aplicarContrasteCor(corTextoContrasteAtual, corSelecionada);
        corFundoContrasteAtual = corSelecionada;
    });

    aplicarContrasteBtn.addEventListener('click', function() {
        // A cor já foi aplicada no evento 'input' do seletor
        contrasteAtivo = true; // Mantém o estado de contraste ativo
        seletorContraste.classList.remove('aberto'); // Opcional: fechar o seletor ao clicar em aplicar
    });

    document.addEventListener('click', function(event) {
        if (!botaoAcessibilidade.contains(event.target) && !submenuAcessibilidade.contains(event.target)) {
            submenuAcessibilidade.classList.remove('aberto');
            seletorContraste.classList.remove('aberto');
            resetContraste();
        }
    });

    submenuAcessibilidade.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});