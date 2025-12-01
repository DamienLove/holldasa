/*
 * Marketing Planner - Project-Based Daily Workflow
 */

// Define projects and their daily tasks
const projects = {
  pulselink: {
    name: "PulseLink / PulseLink Pro",
    color: "#4a90e2",
    tasks: [
      {
        id: "pl_brand",
        text: "Define brand identity and tagline (e.g., 'PulseLink SOS: Silent Safety Alerts')",
        phase: "Foundation",
        day: 1
      },
      {
        id: "pl_landing",
        text: "Build dedicated landing page with CTAs, beta sign-up form, screenshots, and story",
        phase: "Foundation",
        day: 2
      },
      {
        id: "pl_network",
        text: "Reach out to personal network and target communities (solo travelers, campus groups, LGBTQ+) to recruit beta testers",
        phase: "Community",
        day: 3
      },
      {
        id: "pl_play",
        text: "Optimize Google Play listing: clear title with 'personal safety / silent SOS' keywords, detailed description and screenshots",
        phase: "Optimization",
        day: 4
      },
      {
        id: "pl_ads",
        text: "Launch micro ad campaigns: test small budgets on Facebook/Instagram, TikTok, and Google Ads targeting parents, solo travelers and personal safety keywords",
        phase: "Advertising",
        day: 5
      },
      {
        id: "pl_feedback",
        text: "Collect user feedback, iterate the product, and prepare for a wider launch",
        phase: "Iteration",
        day: 6
      }
    ]
  },
  uc4e: {
    name: "UC4E / Universe Connected",
    color: "#9b59b6",
    tasks: [
      {
        id: "uc_landing",
        text: "Create a Universe Connected / UC4E landing page with a book summary, sample chapter, purchase links, and email sign-up",
        phase: "Foundation",
        day: 1
      },
      {
        id: "uc_bookstores",
        text: "Optimize bookstore listings (Amazon, Goodreads, etc.) with accurate categories and keywords; encourage reviews",
        phase: "Optimization",
        day: 2
      },
      {
        id: "uc_video",
        text: "Produce short video or animated explainers of key concepts (quantum entanglement, fungal networks, AI) for TikTok, YouTube, Instagram",
        phase: "Content",
        day: 3
      },
      {
        id: "uc_communities",
        text: "Engage communities (Reddit, Facebook groups) with interesting facts and discussions drawn from your book to spark interest",
        phase: "Community",
        day: 4
      },
      {
        id: "uc_ads",
        text: "Run targeted ads on Amazon, BookBub, and Facebook aimed at science-curious readers and fans of pop-science books",
        phase: "Advertising",
        day: 5
      },
      {
        id: "uc_influencers",
        text: "Solicit reviews from early readers and reach out to influencers or blogs for features",
        phase: "Outreach",
        day: 6
      }
    ]
  },
  dimortalio: {
    name: "D'Imortalio Art & Persona",
    color: "#e74c3c",
    tasks: [
      {
        id: "di_portfolio",
        text: "Set up online portfolio/gallery showcasing D'Imortalio artwork with purchasing options",
        phase: "Foundation",
        day: 1
      },
      {
        id: "di_social",
        text: "Create social media presence (Instagram, TikTok) posting artwork, behind-the-scenes content, and artistic process",
        phase: "Social Media",
        day: 2
      },
      {
        id: "di_story",
        text: "Develop the D'Imortalio persona story and narrative across platforms",
        phase: "Branding",
        day: 3
      },
      {
        id: "di_collaborations",
        text: "Reach out to art communities and potential collaborators",
        phase: "Community",
        day: 4
      }
    ]
  }
};

// Shared tasks that apply to multiple projects
const sharedTasks = [
  {
    id: "shared_social",
    text: "Set up and post to social media accounts (Instagram, TikTok, Twitter, Facebook)",
    projects: ["pulselink", "uc4e", "dimortalio"],
    phase: "Social Media"
  },
  {
    id: "shared_analytics",
    text: "Review analytics and metrics across all platforms",
    projects: ["pulselink", "uc4e"],
    phase: "Analysis"
  }
];

let currentProject = null;
let taskStates = {};

// Load saved state from localStorage
function loadState() {
  const saved = localStorage.getItem('marketingPlannerState');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      taskStates = parsed.taskStates || {};
      currentProject = parsed.currentProject || null;
    } catch (e) {
      console.error('Failed to load state:', e);
    }
  }
}

// Save state to localStorage
function saveState() {
  localStorage.setItem('marketingPlannerState', JSON.stringify({
    taskStates,
    currentProject
  }));
}

// Initialize the app
function init() {
  loadState();
  if (currentProject && projects[currentProject]) {
    showProject(currentProject);
  } else {
    showProjectSelection();
  }
}

// Show project selection screen
function showProjectSelection() {
  const container = document.getElementById('app-container');
  container.innerHTML = `
    <div class="project-selection">
      <h1>Marketing Planner</h1>
      <p class="subtitle">Select a project to work on today</p>
      <div class="project-cards">
        ${Object.entries(projects).map(([key, project]) => `
          <div class="project-card" style="border-left: 4px solid ${project.color}" onclick="selectProject('${key}')">
            <h2>${project.name}</h2>
            <div class="project-stats">
              <span>${getCompletedCount(key)} / ${project.tasks.length} tasks completed</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Get count of completed tasks for a project
function getCompletedCount(projectKey) {
  const project = projects[projectKey];
  return project.tasks.filter(task => taskStates[task.id]).length;
}

// Select a project
function selectProject(projectKey) {
  currentProject = projectKey;
  saveState();
  showProject(projectKey);
}

// Show project tasks organized by day/phase
function showProject(projectKey) {
  const project = projects[projectKey];
  const container = document.getElementById('app-container');
  
  // Group tasks by phase
  const phases = {};
  project.tasks.forEach(task => {
    if (!phases[task.phase]) phases[task.phase] = [];
    phases[task.phase].push(task);
  });
  
  // Get relevant shared tasks
  const relevantShared = sharedTasks.filter(task => 
    task.projects.includes(projectKey)
  );
  
  container.innerHTML = `
    <div class="project-view">
      <div class="project-header">
        <button class="back-btn" onclick="backToProjects()">← Back to Projects</button>
        <h1 style="color: ${project.color}">${project.name}</h1>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${(getCompletedCount(projectKey) / project.tasks.length * 100).toFixed(0)}%; background: ${project.color}"></div>
        </div>
        <p class="progress-text">${getCompletedCount(projectKey)} of ${project.tasks.length} tasks completed</p>
      </div>
      
      ${Object.entries(phases).map(([phase, tasks]) => `
        <div class="phase-section">
          <h2 class="phase-title">${phase}</h2>
          <div class="task-list">
            ${tasks.map(task => `
              <div class="task-item ${taskStates[task.id] ? 'completed' : ''}">
                <label class="task-label">
                  <input 
                    type="checkbox" 
                    ${taskStates[task.id] ? 'checked' : ''}
                    onchange="toggleTask('${task.id}')"
                  >
                  <span class="task-text">
                    <strong>Day ${task.day}:</strong> ${task.text}
                  </span>
                </label>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
      
      ${relevantShared.length > 0 ? `
        <div class="phase-section">
          <h2 class="phase-title">Shared Tasks</h2>
          <p class="phase-description">These tasks apply across multiple projects</p>
          <div class="task-list">
            ${relevantShared.map(task => `
              <div class="task-item ${taskStates[task.id] ? 'completed' : ''}">
                <label class="task-label">
                  <input 
                    type="checkbox" 
                    ${taskStates[task.id] ? 'checked' : ''}
                    onchange="toggleTask('${task.id}')"
                  >
                  <span class="task-text">
                    ${task.text}
                    <span class="project-tags">${task.projects.map(p => projects[p].name).join(', ')}</span>
                  </span>
                </label>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

// Go back to project selection
function backToProjects() {
  currentProject = null;
  saveState();
  showProjectSelection();
}

// Toggle task completion
function toggleTask(taskId) {
  taskStates[taskId] = !taskStates[taskId];
  saveState();
  if (currentProject) {
    showProject(currentProject);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
