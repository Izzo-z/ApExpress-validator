document.addEventListener('DOMContentLoaded', function() {
    const menuHamburguer = document.getElementById('menuHamburguer');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeMobileMenu = document.querySelector('.close-mobile-menu');

    function openMenu() {
        mobileMenu.classList.add('open');
        menuOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenu.classList.remove('open');
        menuOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (menuHamburguer) {
        menuHamburguer.addEventListener('click', function(e) {
            e.preventDefault();
            openMenu();
        });
    }

    if (closeMobileMenu) {
        closeMobileMenu.addEventListener('click', function(e) {
            e.preventDefault();
            closeMenu();
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            closeMenu();
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
});
