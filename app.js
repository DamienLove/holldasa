/*
 * Marketing Planner
 *
 * This JavaScript file powers the simple checklist webapp.  It defines
 * the tasks for each project (PulseLink, UC4E/Universe Connected, and
 * other projects like the art persona, Holldasa, and DamienNichols.com),
 * renders them into the DOM, and persists completion state in
 * localStorage.  When a user toggles a checkbox, the change is saved
 * immediately so progress is remembered across page reloads.
 */

// Define task lists for each section. Each task object contains a
// unique id (used for persistence), a human‑readable description, and
// an optional completed flag which defaults to false. Feel free to
// modify these lists or extend them to suit additional tasks.
const tasks = {
  pulselink: [
    {
      id: "pl1",
      text:
        "Define a unique brand identity and tagline for PulseLink (e.g., “PulseLink SOS: Silent Safety Alerts” and include your name)",
      completed: false,
    },
    {
      id: "pl2",
      text:
        "Build a dedicated landing page for PulseLink with CTAs, a beta sign‑up form, screenshots, and story",
      completed: false,
    },
    {
      id: "pl3",
      text:
        "Reach out to your personal network and target communities (solo travelers, campus groups, LGBTQ+) to recruit beta testers",
      completed: false,
    },
    {
      id: "pl4",
      text:
        "Set up official social media accounts (Instagram, TikTok, Twitter, Facebook) and post short explainer videos and scenarios demonstrating the app",
      completed: false,
    },
    {
      id: "pl5",
      text:
        "Optimize the Google Play listing: clear title with “personal safety / silent SOS” keywords, detailed description and screenshots",
      completed: false,
    },
    {
      id: "pl6",
      text:
        "Launch micro ad campaigns: test small budgets on Facebook/Instagram, TikTok, and Google Ads targeting parents, solo travelers and personal safety keywords",
      completed: false,
    },
    {
      id: "pl7",
      text:
        "Collect user feedback, iterate the product, and prepare for a wider launch",
      completed: false,
    },
  ],
  uc4e: [
    {
      id: "uc1",
      text:
        "Create a Universe Connected / UC4E landing page with a book summary, sample chapter, purchase links, and email sign‑up",
      completed: false,
    },
    {
      id: "uc2",
      text:
        "Optimize bookstore listings (Amazon, Goodreads, etc.) with accurate categories and keywords; encourage reviews",
      completed: false,
    },
    {
      id: "uc3",
      text:
        "Produce short video or animated explainers of key concepts (quantum entanglement, fungal networks, AI) for TikTok, YouTube, Instagram",
      completed: false,
    },
    {
      id: "uc4",
      text:
        "Engage communities (Reddit, Facebook groups) with interesting facts and discussions drawn from your book to spark interest",
      completed: false,
    },
    {
      id: "uc5",
      text:
        "Run targeted ads on Amazon, BookBub, and Facebook aimed at science‑curious readers and fans of pop‑science books",
      completed: false,
    },
    {
      id: "uc6",
      text:
        "Solicit reviews from early readers and reach out to influencers or blogs for features",
      completed: false,
    },
  ],
  other: [
    {
      id: "ot1",
      text:
        "Fix the D’Immortalio/DND Artistry website and create a dedicated portfolio with high‑quality images",
      completed: false,
    },
    {
      id: "ot2",
      text:
        "Establish social media presence for your art (Instagram, TikTok) and share finished pieces and work‑in‑progress videos",
      completed: false,
    },
    {
      id: "ot3",
      text:
        "List your art on marketplaces like Etsy or Saatchi Art and run small targeted ads",
      completed: false,
    },
    {
      id: "ot4",
      text:
        "Develop an official website for Holldasa LLC describing services and linking to your projects; claim your Google Business profile",
      completed: false,
    },
    {
      id: "ot5",
      text:
        "Expand DamienNichols.com into a central hub that links to PulseLink, UC4E, your art, and your 3D printing business",
      completed: false,
    },
    {
      id: "ot6",
      text:
        "Create an online presence for your 3D printing business: launch a local service page, claim a Google Business listing, and run local ads",
      completed: false,
    },
  ],
};

/**
 * Load tasks from localStorage and render them into the DOM. If
 * previously saved completion states exist, they will be merged with
 * the default task definitions so that checkboxes reflect prior user
 * interaction.
 */
function loadTasks() {
  // Retrieve saved state from localStorage (if any)
  const saved = JSON.parse(localStorage.getItem("marketingTasks")) || {};
  // For each section (pulselink, uc4e, other), build list items
  ["pulselink", "uc4e", "other"].forEach((section) => {
    const listElement = document.getElementById(section + "-tasks");
    listElement.innerHTML = "";
    tasks[section].forEach((task) => {
      const li = document.createElement("li");
      li.className = "task-item";
      // Determine saved status
      const isChecked = Boolean(saved[task.id]);
      if (isChecked) {
        li.classList.add("completed");
      }
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = isChecked;
      checkbox.id = task.id;
      // Update state on change
      checkbox.addEventListener("change", () => toggleTask(task.id, li));
      const label = document.createElement("label");
      label.setAttribute("for", task.id);
      label.textContent = task.text;
      // Append to DOM
      li.appendChild(checkbox);
      li.appendChild(label);
      listElement.appendChild(li);
    });
  });
}

/**
 * Toggle completion state for a given task id and update both the
 * visual representation and the persisted state in localStorage.
 *
 * @param {string} id The unique id of the task to toggle
 * @param {HTMLElement} li The list item element corresponding to the task
 */
function toggleTask(id, li) {
  // Fetch existing state or initialize an empty object
  const saved = JSON.parse(localStorage.getItem("marketingTasks")) || {};
  // Toggle the saved state for this id
  saved[id] = !saved[id];
  // Save back to localStorage
  localStorage.setItem("marketingTasks", JSON.stringify(saved));
  // Reflect in UI
  li.classList.toggle("completed");
}

// Initialize when the DOM has loaded
document.addEventListener("DOMContentLoaded", loadTasks);