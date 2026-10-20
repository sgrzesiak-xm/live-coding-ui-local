"use strict";

const PAGE_SIZE = 5;
const CONSENT_KEY = "abc-careers-local-consent";
const jobs = [
  {
    title: "Senior Product Designer",
    team: "Product Design",
    location: "Limassol",
    schedule: "Full time",
    description: "Shape clear, thoughtful experiences for people using our digital products."
  },
  {
    title: "Client Support Specialist",
    team: "Customer Experience",
    location: "Limassol",
    schedule: "Full time",
    description: "Help clients find answers and make every support interaction a positive one."
  },
  {
    title: "Finance Operations Analyst",
    team: "Finance",
    location: "Limassol",
    schedule: "Full time",
    description: "Support accurate reporting and improve the way financial operations run."
  },
  {
    title: "People Experience Partner",
    team: "People",
    location: "Limassol",
    schedule: "Full time",
    description: "Work with teams to make everyday work more welcoming and effective."
  },
  {
    title: "Content Marketing Specialist",
    team: "Marketing",
    location: "Limassol",
    schedule: "Full time",
    description: "Create useful content that helps people understand our products and services."
  },
  {
    title: "Backend Engineer",
    team: "Technology",
    location: "Limassol",
    schedule: "Full time",
    description: "Build dependable services and APIs for our customer-facing products."
  },
  {
    title: "QA Automation Engineer",
    team: "Quality Engineering",
    location: "Limassol",
    schedule: "Full time",
    description: "Develop automated quality assurance checks for web applications."
  },
  {
    title: "Data Analyst",
    team: "Business Intelligence",
    location: "Limassol",
    schedule: "Full time",
    description: "Turn business questions into clear analysis and practical recommendations."
  },
  {
    title: "Product Manager",
    team: "Product",
    location: "Limassol",
    schedule: "Full time",
    description: "Coordinate product plans with design, engineering, and business teams."
  },
  {
    title: "Talent Acquisition Partner",
    team: "People",
    location: "Limassol",
    schedule: "Full time",
    description: "Help teams meet future colleagues and build thoughtful hiring processes."
  },
  {
    title: "QA Analyst",
    team: "Quality Engineering",
    location: "Limassol",
    schedule: "Full time",
    description: "Review product workflows and document clear, repeatable test scenarios."
  },
  {
    title: "Platform Engineer",
    team: "Infrastructure",
    location: "Limassol",
    schedule: "Full time",
    description: "Improve the tools and services that help engineering teams deliver software."
  },
  {
    title: "Compliance Officer",
    team: "Compliance",
    location: "Limassol",
    schedule: "Full time",
    description: "Support clear processes and careful regulatory reporting."
  },
  {
    title: "UX Researcher",
    team: "Product Design",
    location: "Limassol",
    schedule: "Full time",
    description: "Learn from customer research and help teams make informed product decisions."
  },
  {
    title: "Data Platform Developer",
    team: "Technology",
    location: "Limassol",
    schedule: "Full time",
    description: "Create reliable data tools that support analytics across the organization."
  },
  {
    title: "QA Engineer",
    team: "Quality Engineering",
    location: "Limassol",
    schedule: "Full time",
    description: "Partner with product teams to check releases and improve product quality."
  },
  {
    title: "Internal Communications Specialist",
    team: "Communications",
    location: "Limassol",
    schedule: "Full time",
    description: "Make important updates easy to understand and useful to colleagues."
  },
  {
    title: "Finance Manager",
    team: "Finance",
    location: "Limassol",
    schedule: "Full time",
    description: "Coordinate financial planning and support informed business decisions."
  },
  {
    title: "Mobile Application Developer",
    team: "Technology",
    location: "Limassol",
    schedule: "Full time",
    description: "Build polished mobile experiences for our digital services."
  },
  {
    title: "Account Manager",
    team: "Client Services",
    location: "Limassol",
    schedule: "Full time",
    description: "Build long-term client relationships through responsive, practical support."
  },
  {
    title: "Technical Writer",
    team: "Product",
    location: "Limassol",
    schedule: "Full time",
    description: "Write clear product documentation for customers and internal teams."
  },
  {
    title: "QA Team Lead",
    team: "Quality Engineering",
    location: "Limassol",
    schedule: "Full time",
    description: "Guide quality assurance planning across several product teams."
  },
  {
    title: "Operations Coordinator",
    team: "Operations",
    location: "Limassol",
    schedule: "Full time",
    description: "Coordinate daily workflows and help teams keep projects moving."
  },
  {
    title: "Security Engineer",
    team: "Information Security",
    location: "Limassol",
    schedule: "Full time",
    description: "Strengthen the systems and practices that protect our digital services."
  }
];

function requireElement(id) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Required page element #${id} was not found.`);
  }
  return element;
}

const searchInput = requireElement("position-search");
const jobList = requireElement("job-list");
const resultsSummary = requireElement("results-summary");
const emptyState = requireElement("empty-state");
const pagination = requireElement("pagination");
const cookieBanner = requireElement("cookie-banner");
const acceptAllButton = requireElement("accept-all");
let currentPage = 1;

function getFilteredJobs() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    return jobs;
  }

  return jobs.filter((job) =>
    [job.title, job.team, job.location, job.schedule, job.description]
      .join(" ")
      .toLowerCase()
      .includes(query)
  );
}

function createMetaItem(text) {
  const item = document.createElement("span");
  const dot = document.createElement("span");
  dot.className = "meta-dot";
  dot.setAttribute("aria-hidden", "true");
  item.append(dot, document.createTextNode(text));
  return item;
}

function createJobCard(job, index) {
  const card = document.createElement("article");
  card.className = "job-card";
  card.setAttribute("role", "listitem");
  card.style.setProperty("--stagger-delay", `${index * 45}ms`);

  const title = document.createElement("h3");
  title.textContent = job.title;

  const description = document.createElement("p");
  description.className = "job-description";
  description.textContent = job.description;

  const metadata = document.createElement("div");
  metadata.className = "job-meta";
  metadata.append(
    createMetaItem(job.team),
    createMetaItem(job.location),
    createMetaItem(job.schedule)
  );

  card.append(title, description, metadata);
  return card;
}

function createPageButton(label, page, options = {}) {
  const button = document.createElement("button");
  button.className = "pagination-button";
  button.type = "button";
  button.textContent = label;
  button.disabled = Boolean(options.disabled);
  button.setAttribute("aria-label", options.ariaLabel || `Page ${page}`);
  button.dataset.page = String(page);

  if (options.current) {
    button.setAttribute("aria-current", "page");
  }

  button.addEventListener("click", () => {
    currentPage = page;
    renderJobs();
    pagination.querySelector(`[data-page="${page}"]`)?.focus();
  });

  return button;
}

function renderPagination(pageCount) {
  pagination.replaceChildren();
  pagination.hidden = pageCount <= 1;
  if (pageCount <= 1) {
    return;
  }

  pagination.append(
    createPageButton("Previous", Math.max(1, currentPage - 1), {
      ariaLabel: "Previous page",
      disabled: currentPage === 1
    })
  );

  for (let page = 1; page <= pageCount; page += 1) {
    pagination.append(
      createPageButton(String(page), page, {
        current: page === currentPage,
        ariaLabel: `Page ${page}`
      })
    );
  }

  pagination.append(
    createPageButton("Next", Math.min(pageCount, currentPage + 1), {
      ariaLabel: "Next page",
      disabled: currentPage === pageCount
    })
  );
}

function renderJobs() {
  const filteredJobs = getFilteredJobs();
  const pageCount = Math.ceil(filteredJobs.length / PAGE_SIZE);
  if (pageCount > 0) {
    currentPage = Math.min(currentPage, pageCount);
  } else {
    currentPage = 1;
  }

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + PAGE_SIZE);
  jobList.replaceChildren(...currentJobs.map(createJobCard));
  jobList.hidden = filteredJobs.length === 0;
  emptyState.hidden = filteredJobs.length !== 0;

  if (filteredJobs.length === 0) {
    resultsSummary.textContent = "No positions found.";
  } else {
    const noun = filteredJobs.length === 1 ? "position" : "positions";
    resultsSummary.textContent = `${filteredJobs.length} ${noun} found`;
  }

  renderPagination(pageCount);
}

function initializeConsent() {
  if (window.localStorage.getItem(CONSENT_KEY) === "accepted") {
    cookieBanner.hidden = true;
    return;
  }

  cookieBanner.addEventListener("cancel", (event) => {
    event.preventDefault();
  });
  cookieBanner.addEventListener("close", () => {
    document.body.classList.remove("cookie-dialog-open");
  });
  acceptAllButton.addEventListener("click", () => {
    window.localStorage.setItem(CONSENT_KEY, "accepted");
    cookieBanner.close();
  });

  cookieBanner.showModal();
  document.body.classList.add("cookie-dialog-open");
}

searchInput.addEventListener("input", () => {
  currentPage = 1;
  renderJobs();
});

initializeConsent();
renderJobs();
