// Sélectionne le bouton du menu et la navigation du site qui permet d'ouvrir et fermer le menu
const menuToggle = document.querySelector('.menu-toggle');
// Sélectionne la navigation du site
const siteNavigation = document.querySelector('#site-navigation');

if (menuToggle && siteNavigation) {
    // Fonction pour fermer le menu
    const closeMenu = () => {
        menuToggle.classList.remove('is-open');
        siteNavigation.classList.remove('is-open');
        // Met à jour l'état du menu quand le bouton est cliqué
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
    };
// Ouvre ou ferme le menu lorsqu'on clique sur le bouton
    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.classList.toggle('is-open');
        siteNavigation.classList.toggle('is-open', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    // Change le texte du bouton selon l'état du menu
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