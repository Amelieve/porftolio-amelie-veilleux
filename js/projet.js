// Charge les projets depuis le fichier JSON
async function loadProjects() {
    const response = await fetch('./data/projets.json');
    const projects = await response.json();
    return projects;
}

// Crée la section des différentes étapes de la démarche créative du projet
function createProjectStory(project) {
   // Permet de l'afficher
    const storyFields = [
        project.image_creation01,
        project.image_creation02,
        project.image_creation03,
        project.description01,
        project.description02,
        project.description03
    ];

    if (storyFields.some(field => !field)) {
        return '';
    }
// Génère la section HTML pour la démarche créative du projet
    return `
        <section class="project-story" aria-labelledby="story-title">
            <header class="project-story-header">
                <p class="eyebrow">${project.title02}</p>
                <h2 id="story-title"> ${project.name}</h2>
                <p>${project.title03}</p>
            </header>

            <div class="project-story-grid">
                <article class="project-story-item">
                    <figure>
                        <img
                            src="${project.image_creation01}"
                            alt="Image de la démarche créative de ${project.name} - étape 1"
                        >
                    </figure>
                    <div>
                        <p class="story-number">01</p>
                        <h3>${project.etape01}</h3>
                        <p>${project.description01}</p>
                    </div>
                </article>

                <article class="project-story-item">
                    <figure>
                        <img
                            src="${project.image_creation02}"
                            alt="${project.title04} ${project.name} - étape 2"
                        >
                    </figure>
                    <div>
                        <p class="story-number">02</p>
                        <h3>${project.etape02}</h3>
                        <p>${project.description02}</p>
                    </div>
                </article>

                <article class="project-story-item">
                    <figure>
                        <img
                            src="${project.image_creation03}"
                            alt="Image de la démarche créative de ${project.name} - étape 3"
                        >
                    </figure>
                    <div>
                        <p class="story-number">03</p>
                        <h3>${project.etape03}</h3>
                        <p>${project.description03}</p>
                    </div>
                </article>
            </div>
        </section>
    `;
}
// Crée la page du projet avec les informations principales
function createProjectPage(project) {
    return `
        <a class="project-back-link" href="projet_page.html" aria-label="Retour à la page des projets">← Retour à la page projet</a>
        <section class="project-header" aria-labelledby="project-title">
            <h1 id="project-title">${project.name}</h1>
            <p class="eyebrow">${project.category.join(' • ')}</p>
            <p class="project-intro">
                ${project.intro || project.description}
            </p>
        </section>

        <figure class="project-visual${project.detailImageSize === 'small' ? ' project-visual--small' : ''}">
            ${project.youtube
                ? `<iframe
                    class="project-video"
                    src="${project.youtube}"
                    title="Vidéo du projet ${project.name}"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                ></iframe>`
                : `<img
                    class="project-image"
                    src="${project.image}"
                    alt="Image du projet ${project.name}"
                >`
            }
        </figure>

        <section class="project-info" aria-label="Informations sur le projet">
            <article class="project-info-item">
                <h2>Logiciel${project.software.length > 1 ? 's' : ''}</h2>
                <p>${project.software.join(' • ')}</p>
            </article>
            <article class="project-info-item">
                <h2>Type de projet</h2>
                <p>${project.projectType}</p>
            </article>
        </section>

        ${createProjectStory(project)}
    `;
}

// Fonction qui initalise la page du projet
async function init() {
// Cherche l'élément HTML dans lequel le contenu du projet sera affiché
    const content = document.querySelector('#project-content');
  // Récupère tous les projets du fichier JSON
    const projects = await loadProjects();

    const projectName = new URLSearchParams(window.location.search).get('project');
    const project = projects.find(
        project => (project.name || project.title) === projectName
    );

    if (!project) {
        content.innerHTML = '<p>Projet introuvable.</p>';
        return;
    }
// Génère et affiche la page du projet
    content.innerHTML = createProjectPage(project);
}

// Lance le programme
init();