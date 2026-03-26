const REVIEWS = [
  {
    "title": "Gerstein Library Public Toilet",
    "slug": "gerstein-library-public-toilet",
    "location": "9 King's College Circle",
    "area": "Downtown",
    "neighborhood": "University of Toronto",
    "suitableFor": "No. 1",
    "accessibility": "Limited",
    "passwordRequired": false,
    "password": "",
    "featured": false,
    "cleanliness": 3.5,
    "aesthetics": 3.0,
    "facilities": 3.5,
    "date": "2026-03-25",
    "summary": "Decently clean, although could use more lighting. Spacious urinals. Requires a walk down a flight of stairs.",
    "otherNotes": ""
  },
  {
    "title": "Cafe Landwer on Bloor",
    "slug": "cafe-landwer-on-bloor",
    "location": "33 Bloor Street East",
    "area": "Downtown",
    "neighborhood": "Church-Wellesley Village",
    "suitableFor": "No. 1 & No. 2",
    "accessibility": "Limited",
    "passwordRequired": true,
    "password": "531",
    "featured": false,
    "cleanliness": 5.0,
    "aesthetics": 4.5,
    "facilities": 3.5,
    "date": "2026-03-24",
    "summary": "Very clean, very accessible (with password). A thick door and music playing from speakers on the ceiling prevent noise leakage while you're doing your business. Could be more spacious.",
    "otherNotes": ""
  }
];

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
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric" }).format(date);
}

function roundToHalf(value) {
  return Math.round(value * 2) / 2;
}

function overallRating(review) {
  return roundToHalf((Number(review.cleanliness) + Number(review.aesthetics) + Number(review.facilities)) / 3);
}

function formatPassword(review) {
  if (!review.passwordRequired) return "No";
  return review.password && review.password.trim() ? `Yes — ${review.password}` : "Yes";
}

function buildStars(value) {
  const rounded = roundToHalf(Number(value));
  let html = '<div class="stars" aria-label="' + rounded.toFixed(1) + ' out of 5 stars">';
  for (let i = 1; i <= 5; i += 1) {
    let cls = 'empty';
    if (rounded >= i) cls = 'full';
    else if (rounded >= i - 0.5) cls = 'half';
    html += `<span class="star ${cls}">★</span>`;
  }
  html += '</div>';
  return html;
}

function renderTopRating(review) {
  const overall = overallRating(review);
  return `
    <div class="overall-line">
      <div>
        <div class="rating-kicker">Overall</div>
        ${buildStars(overall)}
      </div>
      <div class="rating-score">${overall.toFixed(1)}</div>
    </div>
    <div class="sub-ratings">
      ${renderSubRating('Cleanliness', review.cleanliness)}
      ${renderSubRating('Aesthetics', review.aesthetics)}
      ${renderSubRating('Facilities', review.facilities)}
    </div>
  `;
}

function renderSubRating(label, value) {
  return `
    <div class="sub-rating-row">
      <span class="sub-rating-label">${escapeHtml(label)}</span>
      ${buildStars(value)}
      <span class="sub-rating-score">${Number(value).toFixed(1)}</span>
    </div>
  `;
}

function reviewTags(review) {
  const tags = [
    ['Location', review.location],
    ['Area', review.area],
    ['Neighborhood', review.neighborhood],
    ['Suitable for', review.suitableFor],
    ['Accessibility', review.accessibility],
    ['Password?', formatPassword(review)],
    ['Review Date', formatDate(review.date)]
  ];
  return tags.map(([label, value]) => `<span class="tag"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</span>`).join('');
}

function matchesSuitable(review, suitable) {
  if (suitable === 'all') return true;
  if (suitable === 'No. 1') return review.suitableFor === 'No. 1';
  if (suitable === 'No. 1 & No. 2') return review.suitableFor === 'No. 1 & No. 2' || review.suitableFor === 'No. 1';
  return review.suitableFor === suitable;
}

function getFilteredReviews() {
  const searchInput = document.getElementById('searchInput');
  const areaFilter = document.getElementById('areaFilter');
  const neighborhoodFilter = document.getElementById('neighborhoodFilter');
  const suitableFilter = document.getElementById('suitableFilter');
  const sortSelect = document.getElementById('sortSelect');
  const query = (searchInput?.value || '').trim().toLowerCase();
  const area = areaFilter?.value || 'all';
  const neighborhood = neighborhoodFilter?.value || 'all';
  const suitable = suitableFilter?.value || 'all';
  const sort = sortSelect?.value || 'featured';

  const filtered = REVIEWS.filter((review) => {
    const searchable = [
      review.title,
      review.location,
      review.area,
      review.neighborhood,
      review.suitableFor,
      review.accessibility,
      review.passwordRequired ? 'yes' : 'no',
      review.password,
      review.summary,
      review.otherNotes
    ].join(' ').toLowerCase();

    return (!query || searchable.includes(query)) &&
      (area === 'all' || review.area === area) &&
      (neighborhood === 'all' || review.neighborhood === neighborhood) &&
      matchesSuitable(review, suitable);
  });

  filtered.sort((a, b) => {
    if (sort === 'featured') {
      if (a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
      return new Date(b.date) - new Date(a.date);
    }
    if (sort === 'newest') return new Date(b.date) - new Date(a.date);
    if (sort === 'oldest') return new Date(a.date) - new Date(b.date);
    if (sort === 'highest') return overallRating(b) - overallRating(a) || new Date(b.date) - new Date(a.date);
    if (sort === 'lowest') return overallRating(a) - overallRating(b) || new Date(b.date) - new Date(a.date);
    if (sort === 'area') return a.area.localeCompare(b.area) || new Date(b.date) - new Date(a.date);
    if (sort === 'neighborhood') return a.neighborhood.localeCompare(b.neighborhood) || new Date(b.date) - new Date(a.date);
    return 0;
  });

  return filtered;
}

function populateSelect(selectEl, values, allLabel) {
  if (!selectEl) return;
  const current = selectEl.value;
  selectEl.innerHTML = `<option value="all">${allLabel}</option>` +
    values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join('');
  selectEl.value = values.includes(current) ? current : 'all';
}

function renderFilters() {
  populateSelect(document.getElementById('areaFilter'), [...new Set(REVIEWS.map(r => r.area))].sort((a,b)=>a.localeCompare(b)), 'All areas');
  populateSelect(document.getElementById('neighborhoodFilter'), [...new Set(REVIEWS.map(r => r.neighborhood))].sort((a,b)=>a.localeCompare(b)), 'All neighborhoods');
}

function updateStats(items) {
  const total = items.length;
  const average = total ? (items.reduce((sum, item) => sum + overallRating(item), 0) / total).toFixed(1) : '0.0';
  const neighborhoods = new Set(items.map(item => item.neighborhood)).size;
  const passwordFree = items.filter(item => !item.passwordRequired).length;

  const sc = document.getElementById('stat-count');
  const sa = document.getElementById('stat-average');
  const sn = document.getElementById('stat-neighborhoods');
  const sp = document.getElementById('stat-password-free');
  if (sc) sc.textContent = total;
  if (sa) sa.textContent = average;
  if (sn) sn.textContent = neighborhoods;
  if (sp) sp.textContent = passwordFree;
}

function renderHomePreview() {
  const root = document.getElementById('latestReviews');
  if (!root) return;
  const latest = [...REVIEWS].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 2);
  root.innerHTML = latest.map(review => `
    <a class="preview-card" href="reviews/${review.slug}/">
      <div class="preview-top">
        <h3>${escapeHtml(review.title)}</h3>
        <span class="open-pill">Open</span>
      </div>
      <p class="preview-copy">${escapeHtml(review.summary)}</p>
      <div class="preview-tags">${reviewTags(review)}</div>
    </a>
  `).join('');
}

function renderReviewsIndex() {
  const grid = document.getElementById('reviewGrid');
  if (!grid) return;
  const resultsCount = document.getElementById('results-count');
  const visible = getFilteredReviews();
  if (resultsCount) resultsCount.textContent = `${visible.length} result${visible.length === 1 ? '' : 's'}`;
  updateStats(visible);

  if (!visible.length) {
    grid.innerHTML = '<div class="empty-state">No reviews match the current search and filter settings.</div>';
    return;
  }

  grid.innerHTML = visible.map(review => `
    <a class="review-card" href="./${review.slug}/">
      <div class="review-card-head">
        <h3>${escapeHtml(review.title)}</h3>
        <span class="open-pill">Full review</span>
      </div>
      ${renderTopRating(review)}
      <div class="review-text-panel">${escapeHtml(review.summary)}</div>
      ${review.otherNotes && review.otherNotes.trim() ? `
        <div class="other-notes">
          <span class="other-notes-title">Other Notes</span>
          <div class="other-notes-text">${escapeHtml(review.otherNotes)}</div>
        </div>
      ` : ''}
      <div class="review-tags">${reviewTags(review)}</div>
    </a>
  `).join('');
}

function renderReviewDetail() {
  const root = document.getElementById('reviewDetail');
  if (!root) return;
  const slug = document.body.dataset.reviewSlug;
  const review = REVIEWS.find(item => item.slug === slug);
  if (!review) {
    root.innerHTML = '<div class="empty-state">Review not found.</div>';
    return;
  }
  const pageTitle = document.getElementById('detailTitle');
  if (pageTitle) pageTitle.textContent = review.title;
  document.title = `${review.title} | Where to Poop: Toronto`;
  root.innerHTML = `
    <article class="detail-card">
      <div class="detail-header">
        <div>
          <div class="eyebrow">Toronto toilet review</div>
          <h1>${escapeHtml(review.title)}</h1>
        </div>
        <a class="inline-button" href="../">Back to reviews</a>
      </div>
      ${renderTopRating(review)}
      <div class="review-text-panel detail-copy">${escapeHtml(review.summary)}</div>
      ${review.otherNotes && review.otherNotes.trim() ? `
        <div class="other-notes detail-notes">
          <span class="other-notes-title">Other Notes</span>
          <div class="other-notes-text">${escapeHtml(review.otherNotes)}</div>
        </div>
      ` : ''}
      <div class="review-tags detail-tags">${reviewTags(review)}</div>
    </article>
  `;
}

function setupMenu() {
  const button = document.getElementById('menuButton');
  const close = document.getElementById('menuClose');
  const menu = document.getElementById('sideMenu');
  const scrim = document.getElementById('menuScrim');
  if (!button || !close || !menu || !scrim) return;

  const openMenu = () => {
    menu.classList.add('is-open');
    scrim.hidden = false;
    button.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  };
  const closeMenu = () => {
    menu.classList.remove('is-open');
    scrim.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };
  button.addEventListener('click', openMenu);
  close.addEventListener('click', closeMenu);
  scrim.addEventListener('click', closeMenu);
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
}

function bindReviewControls() {
  ['searchInput', 'areaFilter', 'neighborhoodFilter', 'suitableFilter', 'sortSelect'].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', renderReviewsIndex);
    el.addEventListener('change', renderReviewsIndex);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  setupMenu();
  renderFilters();
  updateStats(REVIEWS);
  renderHomePreview();
  bindReviewControls();
  renderReviewsIndex();
  renderReviewDetail();
});
