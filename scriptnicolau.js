// ==========================================
// 1. GRADIENTE GIRATÓRIO DA TELA (AZUL NEON)
// ==========================================
let cor1 = '#00f2fe'; 
let cor2 = '#005baa'; 
let angulo = 0;

function girarDegradeJS() {
    angulo = (angulo + 0.5) % 360;
    document.body.style.background = `linear-gradient(${angulo}deg, ${cor1}, ${cor2})`;
    requestAnimationFrame(girarDegradeJS);
}
girarDegradeJS();


// ==========================================
// 2. EFEITO DE DIGITAÇÃO NA BIO
// ==========================================
const textoBio = document.querySelector('.card p') || document.querySelector('p');

if (textoBio) {
    const mensagem = textoBio.textContent;
    textoBio.textContent = ''; 
    let i = 0;

    function digitar() {
        if (i < mensagem.length) {
            textoBio.textContent += mensagem.charAt(i);
            i++;
            setTimeout(digitar, 30);
        }
    }
    digitar();
}


// ==========================================
// 3. ESTILO UNIVERSAL DO MODO ESCURO (APENAS O CARD)
// ==========================================
const estiloGlobal = document.createElement('style');
estiloGlobal.textContent = `
    /* Transição suave no card universal */
    .card, 
    body > div:not(#menuCores):not(#themeBtn):not(#cardThemeBtn) {
        transition: background-color 0.3s ease !important;
    }

    /* MUDA APENAS O FUNDO DO CARD NO MODO ESCURO (UNIVERSAL) */
    /* NÃO ALTERA ABSOLUTAMENTE NENHUM TEXTO OU CAIXA INTERNA */
    body.modo-escuro .card,
    body.modo-escuro body > div:not(#menuCores):not(#themeBtn):not(#cardThemeBtn) {
        background-color: #181818 !important;
    }

    /* Ajuste visual apenas dos dois botões fixos no topo */
    body.modo-escuro #themeBtn,
    body.modo-escuro #cardThemeBtn {
        background-color: #2d2d2d !important;
        color: #ffffff !important;
    }

    body.modo-escuro #menuCores {
        background-color: rgba(30, 30, 30, 0.95) !important;
    }
`;
document.head.appendChild(estiloGlobal);


// ==========================================
// 4. TILT 3D GLOBAL E BOTÕES
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    // Seleciona o card universalmente
    const cartao = document.querySelector('.card') || document.querySelector('body > div:not(#menuCores):not(#themeBtn):not(#cardThemeBtn)');

    // 4.1 Tilt 3D
    window.addEventListener('mousemove', (e) => {
        if (!cartao) return;

        const larguraTela = window.innerWidth;
        const alturaTela = window.innerHeight;

        const xRelativo = (e.clientX - larguraTela / 2) / (larguraTela / 2);
        const yRelativo = (e.clientY - alturaTela / 2) / (alturaTela / 2);

        const rotX = -yRelativo * 18;
        const rotY = xRelativo * 18;

        cartao.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });

    // 4.2 Botão da paleta (🎨)
    const themeBtn = document.createElement('button');
    themeBtn.id = 'themeBtn';
    themeBtn.innerHTML = '🎨';
    themeBtn.type = 'button';

    Object.assign(themeBtn.style, {
        position: 'fixed',
        top: '20px',
        right: '75px',
        background: '#ffffff',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        padding: '10px 12px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        zIndex: '999999'
    });

    // 4.3 Botão do Modo Escuro (🌗)
    const cardThemeBtn = document.createElement('button');
    cardThemeBtn.id = 'cardThemeBtn';
    cardThemeBtn.innerHTML = '🌗';
    cardThemeBtn.type = 'button';

    Object.assign(cardThemeBtn.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: '#ffffff',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        padding: '10px 12px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        zIndex: '999999'
    });

    // Hover
    [themeBtn, cardThemeBtn].forEach(btn => {
        btn.addEventListener('mouseenter', () => btn.style.transform = 'scale(1.1)');
        btn.addEventListener('mouseleave', () => btn.style.transform = 'scale(1)');
    });

    // Toggle do modo escuro
    cardThemeBtn.addEventListener('click', () => {
        document.body.classList.toggle('modo-escuro');
    });

    // 4.4 Menu de Cores de Fundo
    const menuCores = document.createElement('div');
    menuCores.id = 'menuCores';
    Object.assign(menuCores.style, {
        position: 'fixed',
        top: '70px',
        right: '75px',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '10px 14px',
        borderRadius: '12px',
        display: 'flex',
        gap: '10px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.25)',
        zIndex: '999999',
        opacity: '0',
        visibility: 'hidden',
        transform: 'translateY(-10px)',
        transition: 'all 0.25s ease'
    });

    const listaCores = [
        { c1: '#00f2fe', c2: '#005baa' }, // Azul Neon
        { c1: '#FF0000', c2: '#FFFF00' }, // Vermelho & Amarelo
        { c1: '#008177', c2: '#38ef7d' }, // Verde
        { c1: '#4c0094', c2: '#FF1493' }  // Roxo & Pink
    ];

    listaCores.forEach(opcao => {
        const bolinha = document.createElement('span');
        Object.assign(bolinha.style, {
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            cursor: 'pointer',
            border: '2px solid #ffffff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
            display: 'inline-block',
            background: `linear-gradient(135deg, ${opcao.c1}, ${opcao.c2})`,
            transition: 'transform 0.2s ease'
        });

        bolinha.addEventListener('mouseenter', () => bolinha.style.transform = 'scale(1.25)');
        bolinha.addEventListener('mouseleave', () => bolinha.style.transform = 'scale(1)');

        bolinha.addEventListener('click', (e) => {
            e.stopPropagation();
            cor1 = opcao.c1;
            cor2 = opcao.c2;
        });

        menuCores.appendChild(bolinha);
    });

    document.body.appendChild(themeBtn);
    document.body.appendChild(cardThemeBtn);
    document.body.appendChild(menuCores);

    let tempoFechar = null;

    function abrirMenu() {
        menuCores.style.opacity = '1';
        menuCores.style.visibility = 'visible';
        menuCores.style.transform = 'translateY(0)';
        iniciarContagem();
    }

    function fecharMenu() {
        menuCores.style.opacity = '0';
        menuCores.style.visibility = 'hidden';
        menuCores.style.transform = 'translateY(-10px)';
        clearTimeout(tempoFechar);
    }

    function iniciarContagem() {
        clearTimeout(tempoFechar);
        tempoFechar = setTimeout(() => {
            fecharMenu();
        }, 2500);
    }

    themeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (menuCores.style.visibility === 'visible') {
            fecharMenu();
        } else {
            abrirMenu();
        }
    });

    [themeBtn, menuCores].forEach(el => {
        el.addEventListener('mouseenter', () => clearTimeout(tempoFechar));
        el.addEventListener('mouseleave', () => {
            if (menuCores.style.visibility === 'visible') {
                iniciarContagem();
            }
        });
    });
});