const REVIEWS = [
  {
    title: "Gerstein Library Public Toilet",
    location: "9 King's College Circle",
    area: "Downtown",
    neighborhood: "University of Toronto",
    suitableFor: "No. 1 & No. 2",
    accessibility: "Limited",
    passwordRequired: false,
    password: "",
    featured: false,
    cleanliness: 3.5,
    aesthetics: 3.0,
    facilities: 3.5,
    overall: 3.0,
    date: "2026-03-25",
    summary:
      "Decently clean, although could use more lighting. Spacious urinals. Requires a walk down a flight of stairs.",
    otherNotes: ""
  },
  {
    title: "Cafe Landwer on Bloor",
    location: "33 Bloor Street East",
    area: "Downtown",
    neighborhood: "Church-Wellesley Village",
    suitableFor: "No. 1 & No. 2",
    accessibility: "Limited",
    passwordRequired: true,
    password: "531",
    featured: false,
    cleanliness: 5.0,
    aesthetics: 4.5,
    facilities: 3.5,
    overall: 4.5,
    date: "2026-03-24",
    summary:
      "Very clean, very accessible (with password). A thick door and music playing from speakers on the ceiling prevent noise leakage while you're doing your business. Could be more spacious.",
    otherNotes: ""
  }
];

const reviewGrid = document.getElementById("reviewGrid");
const searchInput = document.getElementById("searchInput");
const areaFilter = document.getElementById("areaFilter");
const neighborhoodFilter = document.getElementById("neighborhoodFilter");
const sortSelect = document.getElementById("sortSelect");
const resultsCount = document.getElementById("results-count");

const statCount = document.getElementById("stat-count");
const statAverage = document.getElementById("stat-average");
const statNeighborhoods = document.getElementById("stat-neighborhoods");
const statPasswordFree = document.getElementById("stat-password-free");

function escapeHtml(text) {
  return String(text ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

function formatPassword(review) {
  if (!review.passwordRequired) return "No";
  if (review.password && review.password.trim()) return `Yes — ${review.password}`;
  return "Yes";
}

function starPercentage(value) {
  return `${Math.max(0, Math.min(5, value)) * 20}%`;
}

function starMeter(value) {
  return `
    <div class="star-meter" style="--fill:${starPercentage(value)}" aria-label="${value} out of 5 stars">
      <span class="star-base" aria-hidden="true">★★★★★</span>
      <span class="star-fill" aria-hidden="true">★★★★★</span>
    </div>
  `;
}

function populateSelect(selectEl, values, allLabel) {
  const current = selectEl.value;
  selectEl.innerHTML =
    `<option value="all">${allLabel}</option>` +
    values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("");
  selectEl.value = values.includes(current) ? current : "all";
}

function renderFilters() {
  const areas = [...new Set(REVIEWS.map((review) => review.area))].sort((a, b) => a.localeCompare(b));
  const neighborhoods = [...new Set(REVIEWS.map((review) => review.neighborhood))].sort((a, b) => a.localeCompare(b));
  populateSelect(areaFilter, areas, "All areas");
  populateSelect(neighborhoodFilter, neighborhoods, "All neighborhoods");
}

function updateStats(items) {
  const total = items.length;
  const average = total ? (items.reduce((sum, item) => sum + item.overall, 0) / total).toFixed(1) : "0.0";
  const neighborhoods = new Set(items.map((item) => item.neighborhood));
  const passwordFree = items.filter((item) => !item.passwordRequired).length;

  statCount.textContent = total;
  statAverage.textContent = average;
  statNeighborhoods.textContent = neighborhoods.size;
  statPasswordFree.textContent = passwordFree;
}

function getVisibleReviews() {
  const query = searchInput.value.trim().toLowerCase();
  const area = areaFilter.value;
  const neighborhood = neighborhoodFilter.value;
  const sort = sortSelect.value;

  const filtered = REVIEWS.filter((review) => {
    const searchable = [
      review.title,
      review.location,
      review.area,
      review.neighborhood,
      review.suitableFor,
      review.accessibility,
      review.passwordRequired ? "yes" : "no",
      review.password,
      review.summary,
      review.otherNotes
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = !query || searchable.includes(query);
    const matchesArea = area === "all" || review.area === area;
    const matchesNeighborhood = neighborhood === "all" || review.neighborhood === neighborhood;
    return matchesQuery && matchesArea && matchesNeighborhood;
  });

  filtered.sort((a, b) => {
    if (sort === "featured") {
      if (a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
      return new Date(b.date) - new Date(a.date);
    }
    if (sort === "newest") return new Date(b.date) - new Date(a.date);
    if (sort === "oldest") return new Date(a.date) - new Date(b.date);
    if (sort === "highest") return b.overall - a.overall || new Date(b.date) - new Date(a.date);
    if (sort === "lowest") return a.overall - b.overall || new Date(b.date) - new Date(a.date);
    if (sort === "area") return a.area.localeCompare(b.area) || new Date(b.date) - new Date(a.date);
    if (sort === "neighborhood") return a.neighborhood.localeCompare(b.neighborhood) || new Date(b.date) - new Date(a.date);
    if (sort === "suitable") return a.suitableFor.localeCompare(b.suitableFor) || new Date(b.date) - new Date(a.date);
    return 0;
  });

  return filtered;
}

function renderRatings(review) {
  const ratings = [
    ["Cleanliness", review.cleanliness],
    ["Aesthetics", review.aesthetics],
    ["Facilities", review.facilities],
    ["Overall", review.overall]
  ];

  return ratings
    .map(
      ([label, value]) => `
        <div class="rating-row">
          <div class="rating-label">${label}</div>
          ${starMeter(value)}
          <div class="rating-number">${value.toFixed(1)}</div>
        </div>
      `
    )
    .join("");
}

function renderMeta(review) {
  const items = [
    ["Location", review.location],
    ["Area", review.area],
    ["Neighborhood", review.neighborhood],
    ["Suitable for", review.suitableFor],
    ["Accessibility", review.accessibility],
    ["Password?", formatPassword(review)],
    ["Review Date", formatDate(review.date)]
  ];

  return items
    .map(
      ([label, value]) => `
        <div class="review-meta-item">
          <span class="review-meta-label">${escapeHtml(label)}</span>
          <div class="review-meta-value">${escapeHtml(value)}</div>
        </div>
      `
    )
    .join("");
}

function renderReviews() {
  const visibleReviews = getVisibleReviews();
  resultsCount.textContent = `${visibleReviews.length} result${visibleReviews.length === 1 ? "" : "s"}`;

  if (!visibleReviews.length) {
    reviewGrid.innerHTML = `
      <div class="empty-state">
        No reviews match the current search and filter settings.
      </div>
    `;
    return;
  }

  reviewGrid.innerHTML = visibleReviews
    .map(
      (review) => `
        <article class="review-card" tabindex="0" data-review-card>
          <div class="review-badge-row">
            ${review.featured ? '<span class="badge badge-featured">Featured Toilet</span>' : ""}
            <span class="badge badge-expand">Hover or tap to expand</span>
          </div>
          <h3 class="review-title">${escapeHtml(review.title)}</h3>
          <div class="review-meta-grid">
            ${renderMeta(review)}
          </div>
          <div class="rating-grid">
            ${renderRatings(review)}
          </div>
          <div class="expand-body">
            <p class="review-summary">${escapeHtml(review.summary)}</p>
            ${review.otherNotes && review.otherNotes.trim()
              ? `
                <div class="other-notes">
                  <span class="other-notes-title">Other Notes</span>
                  <div class="other-notes-text">${escapeHtml(review.otherNotes)}</div>
                </div>
              `
              : '<div class="other-notes"></div>'}
          </div>
        </article>
      `
    )
    .join("");

  attachReviewInteractions();
}

function attachReviewInteractions() {
  document.querySelectorAll("[data-review-card]").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("a, button, input, select, label")) return;
      card.classList.toggle("is-expanded");
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.classList.toggle("is-expanded");
      }
    });
  });
}

[searchInput, areaFilter, neighborhoodFilter, sortSelect].forEach((element) => {
  element.addEventListener("input", renderReviews);
  element.addEventListener("change", renderReviews);
});

renderFilters();
updateStats(REVIEWS);
renderReviews();
