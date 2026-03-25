const REVIEWS = [
  {
    title: "Union Station Concourse Relief Stop",
    location: "Union Station, West Concourse",
    area: "Downtown",
    neighborhood: "Financial District",
    accessibility: "Easily Accessible",
    passwordRequired: false,
    password: "",
    rating: 4,
    date: "2026-03-22",
    summary:
      "Large, easy to find, and usually cleaned often enough to avoid regret. Strong emergency value because it is close to major transit flow and clearly signed."
  },
  {
    title: "Reference Library Upper Floor Washroom",
    location: "Toronto Reference Library, Yonge Street",
    area: "Midtown",
    neighborhood: "Yorkville",
    accessibility: "Limited",
    passwordRequired: false,
    password: "",
    rating: 5,
    date: "2026-03-18",
    summary:
      "Quiet, generally clean, and much calmer than the average downtown option. Best when you want privacy and are already inside the building."
  },
  {
    title: "Market Basement Bathroom",
    location: "St. Lawrence Market South Building",
    area: "Downtown",
    neighborhood: "St. Lawrence",
    accessibility: "Limited",
    passwordRequired: false,
    password: "",
    rating: 4,
    date: "2026-03-15",
    summary:
      "Solid traffic-to-cleanliness ratio and a dependable option during market hours. Crowding can be an issue, but turnover is fast enough to keep it useful."
  },
  {
    title: "Coffee Shop Washroom With Code",
    location: "Queen Street West café strip",
    area: "West End",
    neighborhood: "Queen West",
    accessibility: "Difficult to Access",
    passwordRequired: true,
    password: "Ask staff",
    rating: 3,
    date: "2026-03-09",
    summary:
      "Usable in a crisis, but the code requirement and tight layout reduce the score. It works best if you are already buying something and can move quickly."
  },
  {
    title: "Atrium Food Court Washroom",
    location: "Atrium on Bay",
    area: "Downtown",
    neighborhood: "Discovery District",
    accessibility: "Easily Accessible",
    passwordRequired: false,
    password: "",
    rating: 4,
    date: "2026-03-03",
    summary:
      "Convenient, central, and relatively easy to reach without awkward detours. Not luxurious, but good enough when the main objective is immediate success."
  },
  {
    title: "Mall Corridor Backup Option",
    location: "CF Toronto Eaton Centre",
    area: "Downtown",
    neighborhood: "Yonge-Dundas",
    accessibility: "Easily Accessible",
    passwordRequired: false,
    password: "",
    rating: 3,
    date: "2026-02-24",
    summary:
      "Very easy to locate, though the volume of foot traffic can make the experience hit-or-miss. Reliable as a backup rather than a destination choice."
  },
  {
    title: "Community Centre Ground Floor Washroom",
    location: "North York Civic Centre area",
    area: "North York",
    neighborhood: "Willowdale",
    accessibility: "Limited",
    passwordRequired: false,
    password: "",
    rating: 5,
    date: "2026-02-10",
    summary:
      "One of the better balanced options: clean, roomy, and usually less chaotic than downtown equivalents. Worth remembering if you are in the area."
  },
  {
    title: "Waterfront Lobby Restroom",
    location: "Harbourfront office tower lobby",
    area: "Downtown",
    neighborhood: "Harbourfront",
    accessibility: "Difficult to Access",
    passwordRequired: true,
    password: "Ask concierge",
    rating: 2,
    date: "2026-01-28",
    summary:
      "The facilities themselves are fine, but getting in can be awkward enough to defeat the purpose. Better as a planned stop than a panic stop."
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
const statNeighborhoods = document.getElementById("stat-areas");
const statPasswordFree = document.getElementById("stat-password-free");

function escapeHtml(text) {
  return String(text)
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

function stars(rating) {
  const filled = "★".repeat(rating);
  const empty = "☆".repeat(5 - rating);
  return `${filled}${empty}`;
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
  const average = total ? (items.reduce((sum, item) => sum + item.rating, 0) / total).toFixed(1) : "0.0";
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
      review.accessibility,
      review.passwordRequired ? "yes" : "no",
      review.password,
      review.summary
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = !query || searchable.includes(query);
    const matchesArea = area === "all" || review.area === area;
    const matchesNeighborhood = neighborhood === "all" || review.neighborhood === neighborhood;
    return matchesQuery && matchesArea && matchesNeighborhood;
  });

  filtered.sort((a, b) => {
    if (sort === "newest") return new Date(b.date) - new Date(a.date);
    if (sort === "oldest") return new Date(a.date) - new Date(b.date);
    if (sort === "highest") return b.rating - a.rating || new Date(b.date) - new Date(a.date);
    if (sort === "lowest") return a.rating - b.rating || new Date(b.date) - new Date(a.date);
    if (sort === "area") return a.area.localeCompare(b.area) || a.neighborhood.localeCompare(b.neighborhood) || a.location.localeCompare(b.location);
    if (sort === "neighborhood") return a.neighborhood.localeCompare(b.neighborhood) || a.location.localeCompare(b.location);
    return 0;
  });

  return filtered;
}

function renderPassword(review) {
  if (!review.passwordRequired) {
    return "No";
  }

  if (review.password && review.password.trim()) {
    return `Yes — ${escapeHtml(review.password)}`;
  }

  return "Yes";
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
        <article class="review-card">
          <div class="review-top">
            <div>
              <div class="review-title">${escapeHtml(review.title)}</div>
              <div class="chip-row">
                <span class="chip chip-location">Location: ${escapeHtml(review.location)}</span>
                <span class="chip chip-area">Area: ${escapeHtml(review.area)}</span>
                <span class="chip chip-neighborhood">Neighborhood: ${escapeHtml(review.neighborhood)}</span>
                <span class="chip">${formatDate(review.date)}</span>
              </div>
            </div>
            <div class="stars" aria-label="${review.rating} out of 5 stars">${stars(review.rating)}</div>
          </div>
          <div class="review-body">${escapeHtml(review.summary)}</div>
          <div class="meta-grid">
            <div class="meta-item">
              <div class="meta-label">Location</div>
              <div class="meta-value">${escapeHtml(review.location)}</div>
            </div>
            <div class="meta-item">
              <div class="meta-label">Area</div>
              <div class="meta-value">${escapeHtml(review.area)}</div>
            </div>
            <div class="meta-item">
              <div class="meta-label">Neighborhood</div>
              <div class="meta-value">${escapeHtml(review.neighborhood)}</div>
            </div>
            <div class="meta-item">
              <div class="meta-label">Accessibility</div>
              <div class="meta-value">${escapeHtml(review.accessibility)}</div>
            </div>
            <div class="meta-item">
              <div class="meta-label">Password?</div>
              <div class="meta-value">${renderPassword(review)}</div>
            </div>
          </div>
          <div class="review-footer">
            <span>Rating: ${review.rating}/5</span>
            <span>${review.passwordRequired ? "Code or staff check required" : "Walk-in friendly"}</span>
          </div>
        </article>
      `
    )
    .join("");
}

[searchInput, areaFilter, neighborhoodFilter, sortSelect].forEach((element) => {
  element.addEventListener("input", renderReviews);
  element.addEventListener("change", renderReviews);
});

renderFilters();
updateStats(REVIEWS);
renderReviews();
