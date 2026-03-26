const REVIEWS = [
  {
    title: "Gerstein Library Public Toilet",
    location: "9 King's College Circle",
    area: "Downtown",
    neighborhood: "University of Toronto",
    gender: "Male",
    suitableFor: "Campus emergency",
    accessibility: "Limited",
    passwordRequired: false,
    password: "",
    featured: true,
    cleanliness: 3.5,
    aesthetics: 3.0,
    facilities: 3.5,
    overall: 3.0,
    date: "2026-03-25",
    summary:
      "Decently clean, although could use more lighting. Spacious urinals. Requires a walk down a flight of stairs.",
    otherNotes: "Best as a backup if you are already in the building."
  },
  {
    title: "Cafe Landwer on Bloor",
    location: "33 Bloor Street East",
    area: "Downtown",
    neighborhood: "Church-Wellesley Village",
    gender: "All Genders",
    suitableFor: "Sit-down emergency",
    accessibility: "Limited",
    passwordRequired: true,
    password: "531",
    featured: true,
    cleanliness: 4.5,
    aesthetics: 4.0,
    facilities: 4.0,
    overall: 4.0,
    date: "2026-03-24",
    summary:
      "Very clean, very accessible (with password). A thick door and music playing from speakers on the ceiling prevent noise leakage while you're doing your business. Could be more spacious.",
    otherNotes: "The code pad is easy to miss when the café is crowded."
  },
  {
    title: "Union Station Concourse Relief Stop",
    location: "Union Station lower concourse",
    area: "Downtown",
    neighborhood: "Financial District",
    gender: "Male",
    suitableFor: "Transit emergency",
    accessibility: "Easily Accessible",
    passwordRequired: false,
    password: "",
    featured: true,
    cleanliness: 4.0,
    aesthetics: 3.5,
    facilities: 4.0,
    overall: 4.0,
    date: "2026-03-21",
    summary:
      "Clean enough to trust in a hurry, easy to reach, and usually fast-moving even when the station is busy. A strong default choice for transit flow and clearly signed.",
    otherNotes: "Rush hour lowers the serenity but not the reliability."
  },
  {
    title: "Reference Library Upper Floor Washroom",
    location: "Toronto Reference Library, Yonge Street",
    area: "Midtown",
    neighborhood: "Yorkville",
    gender: "Male",
    suitableFor: "Quiet reset",
    accessibility: "Limited",
    passwordRequired: false,
    password: "",
    featured: true,
    cleanliness: 4.5,
    aesthetics: 4.5,
    facilities: 4.0,
    overall: 4.5,
    date: "2026-03-18",
    summary:
      "Quiet, generally clean, and much calmer than the average downtown option. Best when you want privacy and are already inside the building.",
    otherNotes: "Worth the detour if your priority is avoiding chaos."
  },
  {
    title: "Market Basement Bathroom",
    location: "St. Lawrence Market South Building",
    area: "Downtown",
    neighborhood: "St. Lawrence",
    gender: "Male",
    suitableFor: "Weekend errands",
    accessibility: "Limited",
    passwordRequired: false,
    password: "",
    featured: false,
    cleanliness: 4.0,
    aesthetics: 3.5,
    facilities: 4.0,
    overall: 4.0,
    date: "2026-03-15",
    summary:
      "Solid traffic-to-cleanliness ratio and a dependable option during market hours. Crowding can be an issue, but turnover is fast enough to keep it useful.",
    otherNotes: "Go before the lunch rush."
  },
  {
    title: "Coffee Shop Washroom With Code",
    location: "Queen Street West café strip",
    area: "West End",
    neighborhood: "Queen West",
    gender: "All Genders",
    suitableFor: "Code-access backup",
    accessibility: "Difficult to Access",
    passwordRequired: true,
    password: "Ask staff",
    featured: false,
    cleanliness: 3.0,
    aesthetics: 3.5,
    facilities: 2.5,
    overall: 3.0,
    date: "2026-03-09",
    summary:
      "Usable in a crisis, but the code requirement and tight layout reduce the score. It works best if you are already buying something and can move quickly.",
    otherNotes: "Not ideal if the ordering line is long."
  },
  {
    title: "Atrium Food Court Washroom",
    location: "Atrium on Bay",
    area: "Downtown",
    neighborhood: "Discovery District",
    gender: "All Genders",
    suitableFor: "Downtown emergency",
    accessibility: "Easily Accessible",
    passwordRequired: false,
    password: "",
    featured: false,
    cleanliness: 3.5,
    aesthetics: 3.0,
    facilities: 3.5,
    overall: 4.0,
    date: "2026-03-03",
    summary:
      "Convenient, central, and relatively easy to reach without awkward detours. Not luxurious, but good enough when the main objective is immediate success.",
    otherNotes: "Closer to the practical end of the spectrum than the atmospheric one."
  },
  {
    title: "Mall Corridor Backup Option",
    location: "CF Toronto Eaton Centre",
    area: "Downtown",
    neighborhood: "Yonge-Dundas",
    gender: "Male",
    suitableFor: "Shopping detour",
    accessibility: "Easily Accessible",
    passwordRequired: false,
    password: "",
    featured: false,
    cleanliness: 3.0,
    aesthetics: 3.0,
    facilities: 3.0,
    overall: 3.0,
    date: "2026-02-24",
    summary:
      "Very easy to locate, though the volume of foot traffic can make the experience hit-or-miss. Reliable as a backup rather than a destination choice.",
    otherNotes: "A classic 'good enough' stop."
  },
  {
    title: "Community Centre Ground Floor Washroom",
    location: "North York Civic Centre area",
    area: "North York",
    neighborhood: "Willowdale",
    gender: "Male",
    suitableFor: "Spacious stop",
    accessibility: "Limited",
    passwordRequired: false,
    password: "",
    featured: false,
    cleanliness: 4.5,
    aesthetics: 3.5,
    facilities: 4.5,
    overall: 4.5,
    date: "2026-02-10",
    summary:
      "One of the better balanced options: clean, roomy, and usually less chaotic than downtown equivalents. Worth remembering if you are in the area.",
    otherNotes: "Especially good when you need space rather than speed."
  },
  {
    title: "Waterfront Lobby Restroom",
    location: "Harbourfront office tower lobby",
    area: "Downtown",
    neighborhood: "Harbourfront",
    gender: "Male",
    suitableFor: "Last resort",
    accessibility: "Difficult to Access",
    passwordRequired: true,
    password: "Ask concierge",
    featured: false,
    cleanliness: 2.5,
    aesthetics: 4.0,
    facilities: 3.0,
    overall: 2.5,
    date: "2026-01-28",
    summary:
      "The facilities themselves are fine, but getting in can be awkward enough to defeat the purpose. Better as a planned stop than a panic stop.",
    otherNotes: "High vibes, low urgency value."
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
    <div class="star-meter" aria-label="${value} out of 5 stars">
      <span class="star-base">★★★★★</span>
      <span class="star-fill" style="width:${starPercentage(value)}">★★★★★</span>
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
      review.gender,
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
    if (sort === "gender") return a.gender.localeCompare(b.gender) || new Date(b.date) - new Date(a.date);
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
    ["Gender", review.gender],
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
