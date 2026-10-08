// Charge les projets depuis le fichier JSON
async function loadProjects() {
    const response = await fetch('./data/projets.json');
    const projects = await response.json();
    return projects;
}
// Crée les différentes sections de la page du projet
function createProjectCard(project) {
    
    return `

        <article class="project-card project-card--featured">

            <div class="project-visual project-visual--space">

                <img
                    src="${project.image}"
                    alt="${project.title}"
                    class="project-image"
                >

                <span class="project-year">
                    ${project.year}
                </span>

            </div>

            <div class="project-content">

                <div class="project-tags">
                ${project.category.map(category => `<span>${category}</span>`).join('')}
                </div>

                <h1>${project.title}</h1>

                <p class="project-description">
                    ${project.description}
                </p>

                <a
                    href="01_projet.html?project=${encodeURIComponent(project.name || project.title)}"
                    class="project-link"
                >
                    Voir le projet <span>→</span>
                </a>

            </div>

        </article>
    `;
}
// Fonction qui initalise la page du projet
async function init() {
// Cherche l'élément HTML dans lequel le contenu du projet sera affiché
    const grid = document.querySelector('.projects-grid');
// Récupère tous les projets du fichier JSON
    const projects = await loadProjects();

    grid.innerHTML = projects
        .map(project => createProjectCard(project))
        .join('');
}

// Lance le programme
init();
