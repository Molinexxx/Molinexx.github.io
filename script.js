const githubUser = "Molinexxx";
const projectsGrid = document.querySelector("#projects-grid");
const featuredProjectsGrid = document.querySelector("#projects-featured-grid");
const projectsStatus = document.querySelector("#projects-status");
const projectsRefreshButton = document.querySelector("#projects-refresh-button");
const repoCount = document.querySelector("#repo-count");
const imageLightbox = document.querySelector("#image-lightbox");
const imageLightboxImage = document.querySelector("#image-lightbox-image");
const imageLightboxClose = document.querySelector("#image-lightbox-close");

const hiddenRepositories = ["Portfolio.dev", "Molinexxx", "Jogo_da_memoria"];
const cacheKey = `portfolio-cache-v2-${githubUser}`;
const cacheTtlMs = 1000 * 60 * 5;
const repositoryAliases = {
  "Assistencia Gtech": [
    "Assistencia-Gtech",
    "Assistencia_Gtech",
    "AssistenciaGtech",
    "assistencia-gtech",
    "assistencia_gtech",
    "assistenciagtech",
    "Assistencia Gtech",
  ],
};

const customProjects = [
  {
    name: "Jogo_da_memoria",
    title: "Jogo da Memoria",
    type: "Projeto em PHP",
    cover: "GAME",
    status: "Logica e sessao",
    description:
      "Jogo da memoria desenvolvido em PHP com emojis, controle por sessao, comparacao de pares, contador de tentativas e reinicio da partida.",
    stack: ["PHP", "HTML", "CSS", "Bootstrap", "Session"],
    imageCandidates: [
      "assets/projects/Jogo_da_memoria-uml.svg",
      "assets/projects/imagem_jogo-da_memoria.png",
      "assets/projects/Jogo_da_memoria.svg",
    ],
    repository: "https://github.com/Molinexxx/Jogo_da_memoria",
    demo: null,
    updatedAt: "2026-03-23T22:05:00Z",
    stars: 0,
    forks: 0,
    year: 2026,
    repoName: "Jogo_da_memoria",
    language: "PHP",
    problem:
      "Criar um jogo de memoria funcional no navegador com controle de estado, contagem de tentativas e reinicio da partida.",
    built:
      "Desenvolvi a logica de comparacao de pares, persistencia por sessao, fluxo de partida e interface web para acompanhar o jogo.",
    result:
      "O projeto mostra dominio de PHP para regras de negocio, controle de sessao e entrega de uma experiencia interativa completa.",
  },
];

const featuredOverrides = {
  "Tcc-avanchtech-php": {
    title: "TCC Avanch Tech PHP",
    type: "Projeto academico",
    cover: "PHP",
    status: "Em destaque",
    description:
      "Projeto de TCC em PHP com foco em estrutura web, organizacao de sistema, banco de dados e evolucao pratica no backend.",
    stack: ["PHP", "MySQL", "PDO", "Bootstrap"],
    problem:
      "Estruturar um projeto academico maior, com necessidade de organizacao, persistencia e clareza na camada web.",
    built:
      "Trabalhei a base do sistema com PHP e banco de dados, organizando componentes e fluxo para sustentar o projeto academico.",
    result:
      "O repositorio reforca consistencia em projetos mais extensos, com foco em estrutura e evolucao pratica no backend.",
  },
  "project-barbearia": {
    title: "Projeto SaaS Barbearia",
    type: "Sistema web",
    cover: "PHP",
    status: "Projeto SaaS",
    description:
      "Sistema web para barbearia com foco em gestao, organizacao de atendimento, cadastros e experiencia administrativa.",
    stack: ["PHP", "MySQL", "CRUD", "Web"],
    problem:
      "Organizar atendimentos, cadastros e operacao administrativa de uma barbearia em um fluxo web mais centralizado.",
    built:
      "Modelei a estrutura do sistema, telas de gestao e operacoes essenciais de cadastro e acompanhamento do atendimento.",
    result:
      "O repositorio evidencia capacidade de pensar produto, fluxo administrativo e organizacao de codigo em um contexto real.",
  },
  "Crud-em-java": {
    title: "CRUD em Java",
    type: "Aplicacao Java",
    cover: "CRUD",
    status: "Estudo pratico",
    description:
      "Projeto para praticar cadastro, listagem, edicao e exclusao em uma estrutura simples e objetiva.",
    stack: ["Java", "HTML"],
    problem:
      "Consolidar os fundamentos de operacoes CRUD e a organizacao de dados em uma base clara para estudo backend.",
    built:
      "Implementei fluxo de cadastro, consulta, edicao e exclusao para reforcar logica, estrutura e responsabilidade das operacoes.",
    result:
      "O projeto mostra entendimento de fluxo de dados, regras basicas de sistema e dominio inicial de backend com Java.",
  },
  "Assistencia-Gtech": {
    title: "Assistencia Gtech",
    type: "Sistema web",
    cover: "GTECH",
    status: "Projeto em destaque",
    description:
      "Projeto voltado para atendimento, organizacao operacional e estrutura de sistema web com foco em solucao pratica.",
    stack: ["PHP", "MySQL", "Web"],
    problem:
      "Organizar o fluxo de atendimento e gestao em uma estrutura digital mais clara e funcional.",
    built:
      "Modelei a base do sistema, estrutura de operacao e componentes principais para sustentar o fluxo da assistencia.",
    result:
      "O projeto reforca repertorio em sistemas web com contexto mais proximo de uso real e organizacao operacional.",
  },
  "Assistencia_Gtech": {
    title: "Assistencia Gtech",
    type: "Sistema web",
    cover: "GTECH",
    status: "Projeto em destaque",
    description:
      "Projeto voltado para atendimento, organizacao operacional e estrutura de sistema web com foco em solucao pratica.",
    stack: ["PHP", "MySQL", "Web"],
    problem:
      "Organizar o fluxo de atendimento e gestao em uma estrutura digital mais clara e funcional.",
    built:
      "Modelei a base do sistema, estrutura de operacao e componentes principais para sustentar o fluxo da assistencia.",
    result:
      "O projeto reforca repertorio em sistemas web com contexto mais proximo de uso real e organizacao operacional.",
  },
  AssistenciaGtech: {
    title: "Assistencia Gtech",
    type: "Sistema web",
    cover: "GTECH",
    status: "Projeto em destaque",
    description:
      "Projeto voltado para atendimento, organizacao operacional e estrutura de sistema web com foco em solucao pratica.",
    stack: ["PHP", "MySQL", "Web"],
    problem:
      "Organizar o fluxo de atendimento e gestao em uma estrutura digital mais clara e funcional.",
    built:
      "Modelei a base do sistema, estrutura de operacao e componentes principais para sustentar o fluxo da assistencia.",
    result:
      "O projeto reforca repertorio em sistemas web com contexto mais proximo de uso real e organizacao operacional.",
  },
  "TCC-avanca-tech-Java": {
    title: "TCC Avanca Tech Java",
    type: "Projeto academico",
    cover: "TCC",
    status: "TCC",
    description:
      "Repositorio academico que reforca minha base em Java e minha evolucao em desenvolvimento backend.",
    stack: ["Java"],
    problem:
      "Aplicar fundamentos de Java em um contexto academico que exigisse estrutura e continuidade de desenvolvimento.",
    built:
      "Organizei a base do projeto e exercitei implementacoes em Java para consolidar repertorio tecnico e clareza de codigo.",
    result:
      "Funciona como prova de evolucao academica e maturidade crescente no uso da linguagem.",
  },
  "Back-end---Mercado-List": {
    title: "Back-end Mercado List",
    type: "Backend",
    cover: "API",
    status: "Backend",
    description:
      "Projeto voltado para organizacao de codigo e fundamentos de aplicacoes backend para gerenciamento.",
    stack: ["Java"],
    problem:
      "Praticar organizacao de uma aplicacao backend voltada para gerenciamento de informacoes e regras centrais.",
    built:
      "Estruturei o repositorio com foco em fundamentos backend, separacao de responsabilidades e base para evolucao da aplicacao.",
    result:
      "Mostra preocupacao com arquitetura inicial e base consistente para sistemas de gerenciamento.",
  },
  Aula_PHP: {
    title: "Aula PHP",
    type: "Estudos em PHP",
    cover: "PHP",
    status: "Laboratorio",
    description:
      "Repositorio com exercicios e praticas em PHP, HTML, CSS e JavaScript para consolidar fundamentos web.",
    stack: ["PHP", "HTML", "CSS", "JavaScript"],
    problem:
      "Consolidar fundamentos web em um ambiente de pratica continua, reunindo frontend e backend em exemplos aplicados.",
    built:
      "Desenvolvi exercicios e pequenas implementacoes para reforcar sintaxe, estrutura e integracao entre tecnologias web.",
    result:
      "O repositorio evidencia disciplina de estudo e ampliacao constante do repertorio tecnico.",
  },
  aula_java: {
    title: "Aula Java",
    type: "Estudos em Java",
    cover: "JAVA",
    status: "Fundamentos",
    description:
      "Projeto focado no aprendizado da linguagem Java, com exercicios e estruturas para reforcar logica.",
    stack: ["Java"],
    problem:
      "Fortalecer fundamentos de Java e logica por meio de exercicios praticos e pequenas estruturas reutilizaveis.",
    built:
      "Implementei exercicios e organizacoes simples para treinar sintaxe, logica e clareza na resolucao de problemas.",
    result:
      "Serve como base de evolucao e prova de consistencia no estudo da linguagem.",
  },
};

const featuredOrder = [
  "project-barbearia",
  "Assistencia Gtech",
  "Jogo_da_memoria",
  "TCC-avanca-tech-Java",
  "Back-end---Mercado-List",
  "Aula_PHP",
  "aula_java",
];

const localImageCandidates = [".svg", ".png", ".jpg", ".jpeg", ".webp"];

function formatDate(dateString) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function formatRepoName(name) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function normalizeRepositoryKey(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[\s_-]+/g, "");
}

function getRepositoryCandidates(requestedName) {
  return repositoryAliases[requestedName] || [requestedName];
}

function getFeaturedRank(repositoryName) {
  const normalizedRepositoryName = normalizeRepositoryKey(repositoryName);

  for (let index = 0; index < featuredOrder.length; index += 1) {
    const featuredName = featuredOrder[index];
    const candidates = getRepositoryCandidates(featuredName);

    if (candidates.some((candidate) => normalizeRepositoryKey(candidate) === normalizedRepositoryName)) {
      return index;
    }
  }

  return Number.MAX_SAFE_INTEGER;
}

function getOverrideForRepositoryName(repositoryName) {
  const normalizedRepositoryName = normalizeRepositoryKey(repositoryName);

  return (
    Object.entries(featuredOverrides).find(([key]) => {
      if (normalizeRepositoryKey(key) === normalizedRepositoryName) {
        return true;
      }

      return Object.entries(repositoryAliases).some(([aliasKey, candidates]) => {
        if (normalizeRepositoryKey(aliasKey) !== normalizedRepositoryName) {
          return false;
        }

        return candidates.some((candidate) => normalizeRepositoryKey(candidate) === normalizeRepositoryKey(key));
      });
    })?.[1] || {}
  );
}

function resolveRepositoryName(requestedName, repositories) {
  const candidates = getRepositoryCandidates(requestedName);
  const normalizedCandidates = candidates.map((candidate) => normalizeRepositoryKey(candidate));

  return (
    repositories.find((repository) =>
      normalizedCandidates.includes(normalizeRepositoryKey(repository.name))
    ) || null
  );
}

function setProjectsStatus(message = "", tone = "info") {
  if (!projectsStatus) {
    return;
  }

  projectsStatus.textContent = message;
  projectsStatus.className = message ? `projects-status is-${tone}` : "projects-status";
}

function renderMessage(message) {
  if (featuredProjectsGrid) {
    featuredProjectsGrid.innerHTML = "";
  }

  projectsGrid.innerHTML = `<article class="project-empty">${escapeHtml(message)}</article>`;
}

function readCache() {
  try {
    const rawCache = localStorage.getItem(cacheKey);

    if (!rawCache) {
      return null;
    }

    const parsedCache = JSON.parse(rawCache);

    if (!parsedCache?.timestamp || !Array.isArray(parsedCache?.projects)) {
      return null;
    }

    return parsedCache;
  } catch {
    return null;
  }
}

function writeCache(payload) {
  try {
    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        timestamp: Date.now(),
        ...payload,
      })
    );
  } catch {
    // Ignora erro de armazenamento para nao interromper a experiencia.
  }
}

function clearCache() {
  try {
    localStorage.removeItem(cacheKey);
  } catch {
    // Mantem o fluxo mesmo se o navegador bloquear armazenamento.
  }
}

function isCacheFresh(cache) {
  return Date.now() - cache.timestamp < cacheTtlMs;
}

function getProjectImage(repoName) {
  const safeRepoName = encodeURIComponent(repoName);
  const localCandidates = localImageCandidates.map(
    (extension) => `assets/projects/${safeRepoName}${extension}`
  );

  return [...localCandidates, `https://opengraph.githubassets.com/1/${githubUser}/${safeRepoName}`];
}

function detectStack(repo, override) {
  const stack = new Set(override?.stack || []);

  if (repo.language) {
    stack.add(repo.language);
  }

  if (/php/i.test(repo.name) || /php/i.test(repo.description || "")) {
    stack.add("PHP");
  }

  if (/java/i.test(repo.name) || /java/i.test(repo.description || "")) {
    stack.add("Java");
  }

  if (/html/i.test(repo.description || "")) {
    stack.add("HTML");
  }

  if (/css/i.test(repo.description || "")) {
    stack.add("CSS");
  }

  return [...stack].slice(0, 5);
}

function isValidUrl(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
}

function normalizeDemoUrl(homepage, repositoryUrl) {
  if (!homepage || !isValidUrl(homepage)) {
    return null;
  }

  const parsedHomepage = new URL(homepage);

  if (parsedHomepage.hostname.includes("github.com")) {
    return null;
  }

  return homepage || repositoryUrl;
}

function buildProjectData(repo) {
  const override = getOverrideForRepositoryName(repo.name);
  const imageCandidates = getProjectImage(repo.name);
  const stack = detectStack(repo, override);
  const repositoryUrl = repo.html_url;
  const demoUrl = normalizeDemoUrl(repo.homepage, repositoryUrl);

  return {
    title: override.title || formatRepoName(repo.name),
    type: override.type || (repo.language ? `${repo.language} project` : "Repositorio"),
    cover: override.cover || (repo.language ? repo.language.slice(0, 4).toUpperCase() : "DEV"),
    status: override.status || (repo.archived ? "Arquivado" : "Atualizado"),
    description:
      override.description ||
      repo.description ||
      "Repositorio publico do meu GitHub com foco em pratica, estudo ou construcao de solucao.",
    stack,
    imageCandidates,
    repository: repositoryUrl,
    demo: demoUrl,
    updatedAt: repo.updated_at,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    year: new Date(repo.updated_at).getFullYear(),
    repoName: repo.name,
    language: repo.language || "Code",
    problem:
      override.problem ||
      "Organizar uma solucao funcional a partir de uma necessidade pratica registrada no repositorio.",
    built:
      override.built ||
      "Estruturei a implementacao com foco em logica, codigo legivel e evolucao consistente da solucao.",
    result:
      override.result ||
      "O resultado mostra repertorio tecnico aplicado e evidencia pratica real de desenvolvimento.",
  };
}

function getProjectHighlights(project, variant) {
  const highlights = [];

  if (variant === "featured") {
    highlights.push("Mais relevante");
  }

  if (/academico/i.test(project.type) || /tcc/i.test(project.title) || /tcc/i.test(project.status)) {
    highlights.push("Projeto academico");
  }

  if (project.demo) {
    highlights.push("Com demo");
  }

  if (/sistema|saas|web/i.test(project.type) || /web/i.test(project.description)) {
    highlights.push("Sistema web");
  }

  if (/backend|crud/i.test(project.type) || /crud/i.test(project.description)) {
    highlights.push("Estudo backend");
  }

  if (project.language && !highlights.includes(project.language)) {
    highlights.push(project.language);
  }

  return highlights.slice(0, 3);
}

function createProjectCard(project, variant = "default") {
  const card = document.createElement("article");
  card.className = variant === "featured" ? "project-card project-card-featured" : "project-card";

  const stackItems = project.stack
    .map((item) => `<span>${escapeHtml(item)}</span>`)
    .join("");

  const demoLink = project.demo
    ? `<a class="project-link" href="${project.demo}" target="_blank" rel="noreferrer" aria-label="Abrir demo do projeto ${escapeHtml(project.title)}">Live demo</a>`
    : "";
  const highlightBadges = getProjectHighlights(project, variant)
    .map((item) => `<span>${escapeHtml(item)}</span>`)
    .join("");

  const featuredCaseStudy =
    variant === "featured"
      ? `
      <div class="project-case-study">
        <article>
          <span>Problema</span>
          <p>${escapeHtml(project.problem)}</p>
        </article>
        <article>
          <span>O que eu construi</span>
          <p>${escapeHtml(project.built)}</p>
        </article>
        <article>
          <span>Resultado</span>
          <p>${escapeHtml(project.result)}</p>
        </article>
      </div>
    `
      : "";

  card.innerHTML = `
    <div class="project-cover">
      <button
        class="project-cover-trigger"
        type="button"
        aria-label="Ampliar imagem do projeto ${escapeHtml(project.title)}"
      >
        Ver imagem ampliada
      </button>
      <img
        class="project-cover-image"
        src="${project.imageCandidates[0]}"
        alt="Capa do projeto ${escapeHtml(project.title)}"
        loading="lazy"
        decoding="async"
      >
      <div class="project-cover-overlay"></div>
      <span class="project-cover-badge">${escapeHtml(project.cover)}</span>
      <div class="project-cover-meta">
        <span class="project-year">${project.year}</span>
        <span class="project-status">${escapeHtml(project.status)}</span>
      </div>
    </div>
    <div class="project-body">
      <span class="project-type">${escapeHtml(project.type)}</span>
      <h3>${escapeHtml(project.title)}</h3>
      <p>${escapeHtml(project.description)}</p>
      <div class="project-highlights">${highlightBadges}</div>
      <div class="project-metrics">
        <span>Atualizado em ${escapeHtml(formatDate(project.updatedAt))}</span>
        <span>${project.stars} estrela(s)</span>
        <span>${project.forks} fork(s)</span>
        <span>Linguagem: ${escapeHtml(project.language)}</span>
      </div>
      ${featuredCaseStudy}
      <div class="project-stack">${stackItems}</div>
      <div class="project-links">
        ${demoLink}
        <a class="project-link" href="${project.repository}" target="_blank" rel="noreferrer" aria-label="Abrir repositorio do projeto ${escapeHtml(project.title)}">Repositorio</a>
      </div>
    </div>
  `;

  const image = card.querySelector(".project-cover-image");
  const imageTrigger = card.querySelector(".project-cover-trigger");
  let imageIndex = 0;

  imageTrigger.addEventListener("click", () => {
    openImageLightbox(image.currentSrc || image.src, image.alt);
  });

  image.addEventListener("error", () => {
    imageIndex += 1;

    if (imageIndex < project.imageCandidates.length) {
      image.src = project.imageCandidates[imageIndex];
      return;
    }

    image.closest(".project-cover").classList.add("project-cover-fallback");
    imageTrigger.remove();
    image.remove();
  });

  return card;
}

function openImageLightbox(src, alt) {
  if (!imageLightbox || !imageLightboxImage || !src) {
    return;
  }

  imageLightboxImage.src = src;
  imageLightboxImage.alt = alt || "Imagem ampliada do projeto";
  imageLightbox.hidden = false;
  imageLightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
}

function closeImageLightbox() {
  if (!imageLightbox || !imageLightboxImage) {
    return;
  }

  imageLightbox.hidden = true;
  imageLightbox.setAttribute("aria-hidden", "true");
  imageLightboxImage.removeAttribute("src");
  imageLightboxImage.alt = "";
  document.body.classList.remove("lightbox-open");
}

function getRecencyScore(updatedAt) {
  const daysSinceUpdate = (Date.now() - new Date(updatedAt).getTime()) / (1000 * 60 * 60 * 24);

  if (daysSinceUpdate <= 30) {
    return 120;
  }

  if (daysSinceUpdate <= 90) {
    return 85;
  }

  if (daysSinceUpdate <= 180) {
    return 55;
  }

  if (daysSinceUpdate <= 365) {
    return 25;
  }

  return 0;
}

function getRepositoryRelevanceScore(repository) {
  let score = 0;

  score += repository.stargazers_count * 120;
  score += repository.forks_count * 80;
  score += getRecencyScore(repository.updated_at);

  if (repository.homepage && isValidUrl(repository.homepage)) {
    score += 50;
  }

  if (repository.description) {
    score += 35;
  }

  if (repository.language) {
    score += 18;
  }

  if (Array.isArray(repository.topics)) {
    score += repository.topics.length * 8;
  }

  if (Object.keys(getOverrideForRepositoryName(repository.name)).length > 0) {
    score += 40;
  }

  return score;
}

function sortRepositories(repositories) {
  return [...repositories].sort((first, second) => {
    const secondScore = getRepositoryRelevanceScore(second);
    const firstScore = getRepositoryRelevanceScore(first);

    if (secondScore !== firstScore) {
      return secondScore - firstScore;
    }

    if (second.stargazers_count !== first.stargazers_count) {
      return second.stargazers_count - first.stargazers_count;
    }

    if (second.forks_count !== first.forks_count) {
      return second.forks_count - first.forks_count;
    }

    return new Date(second.updated_at) - new Date(first.updated_at);
  });
}

function selectRepositories(repositories) {
  const featuredRepositories = featuredOrder
    .map((repoName) => resolveRepositoryName(repoName, repositories))
    .filter(Boolean);

  const remainingRepositories = repositories.filter(
    (repo) => !featuredRepositories.some((featuredRepository) => featuredRepository.name === repo.name)
  );

  const recentRepositories = sortRepositories(remainingRepositories);

  return [...featuredRepositories, ...recentRepositories];
}

function renderProjects(projects) {
  const featuredProjects = projects.slice(0, 3);
  const secondaryProjects = projects.slice(3);

  if (featuredProjectsGrid) {
    featuredProjectsGrid.innerHTML = "";
    featuredProjects.forEach((project) =>
      featuredProjectsGrid.appendChild(createProjectCard(project, "featured"))
    );
  }

  projectsGrid.innerHTML = "";
  secondaryProjects.forEach((project) => projectsGrid.appendChild(createProjectCard(project)));

  if (!secondaryProjects.length) {
    projectsGrid.innerHTML = `<article class="project-empty">Novos repositorios publicados no GitHub vao aparecer aqui.</article>`;
  }
}

function renderProjectsFromCache(cache, message) {
  repoCount.textContent = String(cache.totalPublicRepositories ?? "--");
  renderProjects(cache.projects);
  setProjectsStatus(message, "warning");
}

async function fetchRepositories() {
  const response = await fetch(
    `https://api.github.com/users/${githubUser}/repos?per_page=100&sort=updated`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!response.ok) {
    const error = new Error(`Falha ao buscar repositorios: ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

function createErrorMessage(error, hasCache) {
  if (error?.status === 403) {
    return hasCache
      ? "Limite da GitHub API atingido. Exibindo a ultima versao em cache."
      : "Limite da GitHub API atingido. Tente novamente em alguns minutos.";
  }

  return hasCache
    ? "Nao foi possivel atualizar agora. Exibindo a ultima versao salva localmente."
    : "Nao foi possivel carregar os repositorios agora. Tente novamente em instantes.";
}

async function loadProjects(options = {}) {
  const forceRefresh = options.forceRefresh || false;
  const cachedProjects = readCache();

  renderMessage("Carregando repositorios do GitHub...");
  setProjectsStatus("");

  if (!forceRefresh && cachedProjects?.projects?.length && isCacheFresh(cachedProjects)) {
    renderProjectsFromCache(cachedProjects, "Exibindo versao em cache enquanto busco atualizacoes.");
  }

  try {
    const repositories = await fetchRepositories();
    const allPublicRepositories = repositories.filter(
      (repo) =>
        !repo.fork &&
        repo.name !== `${githubUser}.github.io` &&
        !hiddenRepositories.includes(repo.name)
    );

    repoCount.textContent = String(allPublicRepositories.length);

    if (allPublicRepositories.length === 0) {
      setProjectsStatus("");
      renderMessage("Nenhum repositorio publico encontrado para exibir no portfolio.");
      return;
    }

    const selectedRepositories = selectRepositories(allPublicRepositories);
    const sortedProjects = [
      ...customProjects,
      ...selectedRepositories
        .filter((repo) => !customProjects.some((project) => project.repoName === repo.name))
        .map(buildProjectData),
    ].sort((first, second) => {
      const firstFeatured = getFeaturedRank(first.repoName);
      const secondFeatured = getFeaturedRank(second.repoName);

      if (firstFeatured !== secondFeatured) {
        return firstFeatured - secondFeatured;
      }

      return new Date(second.updatedAt) - new Date(first.updatedAt);
    });

    renderProjects(sortedProjects);
    setProjectsStatus(
      forceRefresh
        ? `${sortedProjects.length} projeto(s) sincronizado(s) manualmente com o GitHub.`
        : `${sortedProjects.length} projeto(s) exibido(s) a partir dos repositorios publicos do GitHub.`,
      "success"
    );
    writeCache({
      projects: sortedProjects,
      totalPublicRepositories: allPublicRepositories.length,
    });
  } catch (error) {
    console.error(error);

    if (cachedProjects?.projects?.length) {
      renderProjectsFromCache(cachedProjects, createErrorMessage(error, true));
      return;
    }

    repoCount.textContent = "--";
    setProjectsStatus(createErrorMessage(error, false), "error");
    renderMessage("Nao foi possivel carregar os repositorios agora. Tente novamente em instantes.");
  }
}

loadProjects();

if (projectsRefreshButton) {
  projectsRefreshButton.addEventListener("click", async () => {
    projectsRefreshButton.disabled = true;
    projectsRefreshButton.textContent = "Atualizando...";
    clearCache();

    try {
      await loadProjects({ forceRefresh: true });
    } finally {
      projectsRefreshButton.disabled = false;
      projectsRefreshButton.textContent = "Atualizar projetos";
    }
  });
}

if (imageLightbox) {
  imageLightbox.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.hasAttribute("data-lightbox-close")) {
      closeImageLightbox();
    }
  });
}

if (imageLightboxClose) {
  imageLightboxClose.addEventListener("click", closeImageLightbox);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && imageLightbox && !imageLightbox.hidden) {
    closeImageLightbox();
  }
});
