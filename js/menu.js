const menuToggle = document.querySelector('.menu-toggle');
const siteNavigation = document.querySelector('#site-navigation');

if (menuToggle && siteNavigation) {
    const closeMenu = () => {
        menuToggle.classList.remove('is-open');
        siteNavigation.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
    };

    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.classList.toggle('is-open');
        siteNavigation.classList.toggle('is-open', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });

    siteNavigation.addEventListener('click', (event) => {
        if (event.target.matches('a')) {
            closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 700) {
            closeMenu();
        }
    });
}