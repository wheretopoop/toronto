const REVIEWS = [
  {
    title: "Gerstein Library Public Toilet",
    location: "9 King's College Circle",
    area: "Downtown",
    neighborhood: "University of Toronto",
    suitableFor: "No. 1",
    accessibility: "Limited",
    passwordRequired: false,
    password: "",
    featured: false,
    cleanliness: 3.5,
    aesthetics: 3.0,
    facilities: 3.5,
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
    date: "2026-03-24",
    summary:
      "Very clean, very accessible (with password). A thick door and music playing from speakers on the ceiling prevent noise leakage while you're doing your business. Could be more spacious.",
    otherNotes: "The code pad is easy to miss when the café is crowded."
  }
];

const reviewGrid = document.getElementById("reviewGrid");
const reviewPages = document.getElementById("reviewPages");
const reviewLinks = document.getElementById("reviewLinks");
const searchInput = document.getElementById("searchInput");
const areaFilter = document.getElementById("areaFilter");
const neighborhoodFilter = document.getElementById("neighborhoodFilter");
const suitableFilter = document.getElementById("suitableFilter");
const sortSelect = document.getElementById("sortSelect");
const resultsCount = document.getElementById("results-count");

const statCount = document.getElementById("stat-count");
const statAverage = document.getElementById("stat-average");
const statNeighborhoods = document.getElementById("stat-neighborhoods");
const statPasswordFree = document.getElementById("stat-password-free");

const menuButton = document.getElementById("menuButton");
const sideMenu = document.getElementById("sideMenu");
const menuClose = document.getElementById("menuClose");
const menuScrim = document.getElementById("menuScrim");

function escapeHtml(text) {
  return String(text ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function slugify(text) {
  return String(text ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "review";
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

function roundToHalf(value) {
  return Math.round(value * 2) / 2;
}

function overallRating(review) {
  const average = (Number(review.cleanliness) + Number(review.aesthetics) + Number(review.facilities)) / 3;
  return roundToHalf(average);
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
  const average = total ? (items.reduce((sum, item) => sum + overallRating(item), 0) / total).toFixed(1) : "0.0";
  const neighborhoods = new Set(items.map((item) => item.neighborhood));
  const passwordFree = items.filter((item) => !item.passwordRequired).length;

  statCount.textContent = total;
  statAverage.textContent = average;
  statNeighborhoods.textContent = neighborhoods.size;
  statPasswordFree.textContent = passwordFree;
}

function matchesSuitable(review, suitable) {
  if (suitable === "all") return true;
  if (suitable === "No. 1") return review.suitableFor === "No. 1";
  if (suitable === "No. 1 & No. 2") {
    return review.suitableFor === "No. 1 & No. 2" || review.suitableFor === "No. 1";
  }
  return review.suitableFor === suitable;
}

function getVisibleReviews() {
  const query = searchInput.value.trim().toLowerCase();
  const area = areaFilter.value;
  const neighborhood = neighborhoodFilter.value;
  const suitable = suitableFilter.value;
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
    return matchesQuery && matchesArea && matchesNeighborhood && matchesSuitable(review, suitable);
  });

  filtered.sort((a, b) => {
    if (sort === "featured") {
      if (a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
      return new Date(b.date) - new Date(a.date);
    }
    if (sort === "newest") return new Date(b.date) - new Date(a.date);
    if (sort === "oldest") return new Date(a.date) - new Date(b.date);
    if (sort === "highest") return overallRating(b) - overallRating(a) || new Date(b.date) - new Date(a.date);
    if (sort === "lowest") return overallRating(a) - overallRating(b) || new Date(b.date) - new Date(a.date);
    if (sort === "area") return a.area.localeCompare(b.area) || new Date(b.date) - new Date(a.date);
    if (sort === "neighborhood") return a.neighborhood.localeCompare(b.neighborhood) || new Date(b.date) - new Date(a.date);
    return 0;
  });

  return filtered;
}

function renderRatings(review, compact = false) {
  const overall = overallRating(review);
  const secondaryRatings = [
    ["Cleanliness", review.cleanliness],
    ["Aesthetics", review.aesthetics],
    ["Facilities", review.facilities]
  ];

  const secondaryHtml = secondaryRatings
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

  return `
    <div class="overall-rating-card${compact ? ' compact-overall' : ''}">
      <div class="overall-rating-label">Overall</div>
      ${starMeter(overall)}
      <div class="rating-number">${overall.toFixed(1)}</div>
    </div>
    <div class="secondary-ratings">${secondaryHtml}</div>
  `;
}

function renderTags(review) {
  const tags = [
    ["Location", review.location],
    ["Area", review.area],
    ["Neighborhood", review.neighborhood],
    ["Suitable for", review.suitableFor],
    ["Accessibility", review.accessibility],
    ["Password?", formatPassword(review)],
    ["Review Date", formatDate(review.date)]
  ];

  return tags
    .map(
      ([label, value]) => `
        <span class="review-tag"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</span>
      `
    )
    .join("");
}

function renderOverviewCards(visibleReviews) {
  reviewGrid.innerHTML = visibleReviews
    .map((review) => {
      const slug = `review-${slugify(review.title)}`;
      return `
        <a class="review-card" href="#${slug}">
          <div class="review-title-row">
            <h3 class="review-title">${escapeHtml(review.title)}</h3>
            <span class="review-link-label">Open review</span>
          </div>
          <div class="rating-block">
            ${renderRatings(review, true)}
          </div>
          <div class="review-summary-wrap">
            <p class="review-summary">${escapeHtml(review.summary)}</p>
          </div>
          ${review.otherNotes && review.otherNotes.trim()
            ? `
              <div class="other-notes">
                <span class="other-notes-title">Other Notes</span>
                <div class="other-notes-text">${escapeHtml(review.otherNotes)}</div>
              </div>
            `
            : ""}
          <div class="review-tags">${renderTags(review)}</div>
        </a>
      `;
    })
    .join("");
}

function renderDetailPages(visibleReviews) {
  reviewPages.innerHTML = visibleReviews
    .map((review) => {
      const slug = `review-${slugify(review.title)}`;
      return `
        <article class="review-page" id="${slug}">
          <div class="review-page-header">
            <h3>${escapeHtml(review.title)}</h3>
          </div>
          <div class="rating-block">
            ${renderRatings(review)}
          </div>
          <div class="review-summary-wrap">
            <p class="review-summary">${escapeHtml(review.summary)}</p>
          </div>
          ${review.otherNotes && review.otherNotes.trim()
            ? `
              <div class="other-notes">
                <span class="other-notes-title">Other Notes</span>
                <div class="other-notes-text">${escapeHtml(review.otherNotes)}</div>
              </div>
            `
            : ""}
          <div class="review-tags">${renderTags(review)}</div>
          <div class="review-page-actions">
            <a class="inline-button" href="#reviews">Back to reviews</a>
            <a class="inline-button" href="#${slug}">Copyable anchor target</a>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderReviewLinks() {
  reviewLinks.innerHTML = REVIEWS.map((review) => {
    const slug = `review-${slugify(review.title)}`;
    return `<a href="#${slug}">${escapeHtml(review.title)}</a>`;
  }).join("");
}

function renderReviews() {
  const visibleReviews = getVisibleReviews();
  resultsCount.textContent = `${visibleReviews.length} result${visibleReviews.length === 1 ? "" : "s"}`;
  updateStats(REVIEWS);

  if (!visibleReviews.length) {
    const empty = `
      <div class="empty-state">
        No reviews match the current search and filter settings.
      </div>
    `;
    reviewGrid.innerHTML = empty;
    reviewPages.innerHTML = empty;
    return;
  }

  renderOverviewCards(visibleReviews);
  renderDetailPages(visibleReviews);
}

function openMenu() {
  sideMenu.classList.add("open");
  menuButton.setAttribute("aria-expanded", "true");
  menuScrim.hidden = false;
}

function closeMenu() {
  sideMenu.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuScrim.hidden = true;
}

menuButton.addEventListener("click", openMenu);
menuClose.addEventListener("click", closeMenu);
menuScrim.addEventListener("click", closeMenu);
sideMenu.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

[searchInput, areaFilter, neighborhoodFilter, suitableFilter, sortSelect].forEach((element) => {
  element.addEventListener("input", renderReviews);
  element.addEventListener("change", renderReviews);
});

renderFilters();
renderReviewLinks();
renderReviews();
