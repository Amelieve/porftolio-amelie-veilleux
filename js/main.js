async function loadProjects() {
    const response = await fetch('./data/projets.json');
    const projects = await response.json();
    return projects;
}

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

                <a href="#" class="project-link">
                    Voir le projet <span>→</span>
                </a>

            </div>

        </article>
    `;
}

async function init() {

    const grid = document.querySelector('.projects-grid');

    const projects = await loadProjects();

    grid.innerHTML = projects
        .map(project => createProjectCard(project))
        .join('');
}

init();

