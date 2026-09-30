
async function loadProjects() {
    const response = await fetch('./data/projets.json');
    const projects = await response.json();
    return projects;
}



function createProjectCard(project) {
    return `
<article class="project-card project-card--featured" aria-label="Projet phare">
    <div class="project-visual project-visual--space">
        <img src=${project.image} alt="Mysto - projet stop motion" class="project-image">
        <span class="project-year">${project.year}</span>
    </div>

    <div class="project-content">
        <div class="project-tags">
            <span>${project.category}</span>
            <span>Stop motion</span>
        </div>

        <h1>${project.title}</h1>
        <p class="project-description">${project.description}</p>
        <a href="#" class="project-link">Voir le projet <span>→</span></a>
    </div>
</article>
    `;
}


async function init() {
    const projects = await loadProjects();
    console.table(projects);
    const card = createProjectCard(projects);

    console.log(card);

    projects.forEach(project => {
        createProjectCard(project);
    });
}

/*projects.forEach(project => {
    console.log(project.title);
});*/




init();

