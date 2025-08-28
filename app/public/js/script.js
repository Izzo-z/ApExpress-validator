// função do menu hamburguer funcional

const menuHamburguer = document.getElementById('menuHamburguer');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');

menuHamburguer.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  menuOverlay.classList.toggle('open');
});

menuOverlay.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  menuOverlay.classList.remove('open');
});

//função de fechar o menu hambuguer
const closeMobileMenu = document.querySelector('.close-mobile-menu');
if (closeMobileMenu) {
  closeMobileMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuOverlay.classList.remove('open');
  });
}



// função do botão vagas/cursos (ver como fazer para alternar a página)
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.toggle-button');
    const buttonGroup = document.querySelector('.button-group');

    if (buttonGroup) {
        buttonGroup.addEventListener('click', (event) => {
            const clickedButton = event.target;

            if (clickedButton.classList.contains('toggle-button')) {
                buttons.forEach(button => {
                    button.classList.remove('active');
                    button.setAttribute('aria-pressed', 'false');
                });
                clickedButton.classList.add('active');
                clickedButton.setAttribute('aria-pressed', 'true');
                const target = clickedButton.dataset.target;
            }
        });
    }
});

// filtrar

document.addEventListener('DOMContentLoaded', () => {
  const btnFiltrar = document.querySelector('.btn-filtrar');
  const filterBox = document.querySelector('.filter-box');
  const closeBtn = document.querySelector('.close-btn');

  if (btnFiltrar && filterBox) {
    btnFiltrar.addEventListener('click', () => {
      filterBox.classList.toggle('visivel');
    });
  }

  if (closeBtn && filterBox) {
    closeBtn.addEventListener('click', () => {
      filterBox.classList.remove('visivel');
    });
  }
});