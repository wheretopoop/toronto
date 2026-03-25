const REVIEWS = [
  {
    title: "Dune: Part Two",
    category: "Movie",
    rating: 5,
    date: "2026-03-24",
    summary:
      "Large in scale but still tightly controlled. The visual design, pacing, and atmosphere hold together unusually well for a long blockbuster."
  },
  {
    title: "Blue Harbor Cafe",
    category: "Restaurant",
    rating: 4,
    date: "2026-03-18",
    summary:
      "A reliable place to work for an afternoon. Strong coffee, quiet seating, and fast service, though the food menu is limited."
  },
  {
    title: "Notebook Air 14",
    category: "Tech",
    rating: 4,
    date: "2026-03-12",
    summary:
      "Portable, fast, and very good for writing and schoolwork. Battery life is strong, but port selection is narrow."
  },
  {
    title: "The Left Hand of Darkness",
    category: "Book",
    rating: 5,
    date: "2026-02-26",
    summary:
      "Thoughtful, controlled, and unusually durable as a novel of ideas. It stays readable while doing serious conceptual work."
  },
  {
    title: "Metro Garden Hostel",
    category: "Travel",
    rating: 3,
    date: "2026-02-20",
    summary:
      "Good location and fair price. The room was clean enough, but the walls were thin and check-in was disorganized."
  },
  {
    title: "Noise-Canceling Headphones X2",
    category: "Tech",
    rating: 5,
    date: "2026-01-30",
    summary:
      "Very effective noise reduction and comfortable for long study sessions. The case is bulky, but performance justifies it."
  }
];

const reviewGrid = document.getElementById("reviewGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("sortSelect");
const resultsCount = document.getElementById("results-count");
const snippetOutput = document.getElementById("snippetOutput");
const reviewForm = document.getElementById("reviewForm");
const previewButton = document.getElementById("previewButton");
const copyButton = document.getElementById("copyButton");

const statCount = document.getElementById("stat-count");
const statAverage = document.getElementById("stat-average");
const statCategories = document.getElementById("stat-categories");
const statTopCategory = document.getElementById("stat-top-category");

let previewReviews = [];

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
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

function renderFilters() {
  const categories = [...new Set([...REVIEWS, ...previewReviews].map((r) => r.category))].sort((a, b) =>
    a.localeCompare(b)
  );
  const current = categoryFilter.value;
  categoryFilter.innerHTML =
    '<option value="all">All categories</option>' +
    categories
      .map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`)
      .join("");
  if (categories.includes(current)) {
    categoryFilter.value = current;
  } else {
    categoryFilter.value = "all";
  }
}

function updateStats(items) {
  const total = items.length;
  const average = total
    ? (items.reduce((sum, item) => sum + item.rating, 0) / total).toFixed(1)
    : "0.0";
  const categories = [...new Set(items.map((item) => item.category))];
  const counts = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});
  const topCategory = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

  statCount.textContent = total;
  statAverage.textContent = average;
  statCategories.textContent = categories.length;
  statTopCategory.textContent = topCategory;
}

function getVisibleReviews() {
  const allReviews = [...REVIEWS, ...previewReviews];
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const sort = sortSelect.value;

  let filtered = allReviews.filter((review) => {
    const matchesQuery =
      !query ||
      review.title.toLowerCase().includes(query) ||
      review.category.toLowerCase().includes(query) ||
      review.summary.toLowerCase().includes(query);

    const matchesCategory = category === "all" || review.category === category;
    return matchesQuery && matchesCategory;
  });

  filtered.sort((a, b) => {
    if (sort === "newest") return new Date(b.date) - new Date(a.date);
    if (sort === "oldest") return new Date(a.date) - new Date(b.date);
    if (sort === "highest") return b.rating - a.rating || new Date(b.date) - new Date(a.date);
    if (sort === "lowest") return a.rating - b.rating || new Date(b.date) - new Date(a.date);
    if (sort === "title") return a.title.localeCompare(b.title);
    return 0;
  });

  return filtered;
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
              <span class="chip category">${escapeHtml(review.category)}</span>
              <span class="chip">${formatDate(review.date)}</span>
            </div>
          </div>
          <div class="stars" aria-label="${review.rating} out of 5 stars">${stars(review.rating)}</div>
        </div>
        <div class="review-body">${escapeHtml(review.summary)}</div>
        <div class="review-footer">
          <span>Rating: ${review.rating}/5</span>
          <span>${previewReviews.includes(review) ? "Preview only" : "Published"}</span>
        </div>
      </article>
    `
    )
    .join("");
}

function buildSnippet(formData) {
  return `{
  title: ${JSON.stringify(formData.title)},
  category: ${JSON.stringify(formData.category)},
  rating: ${Number(formData.rating)},
  date: ${JSON.stringify(formData.date)},
  summary: ${JSON.stringify(formData.summary)}
},`;
}

function getFormData() {
  return {
    title: document.getElementById("title").value.trim(),
    category: document.getElementById("category").value.trim(),
    rating: document.getElementById("rating").value,
    date: document.getElementById("date").value,
    summary: document.getElementById("summary").value.trim()
  };
}

function formIsValid(data) {
  return data.title && data.category && data.rating && data.date && data.summary;
}

reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = getFormData();
  if (!formIsValid(data)) return;
  snippetOutput.textContent = buildSnippet(data);
});

previewButton.addEventListener("click", () => {
  const data = getFormData();
  if (!formIsValid(data)) {
    alert("Complete all fields before previewing the review.");
    return;
  }

  const previewReview = {
    title: data.title,
    category: data.category,
    rating: Number(data.rating),
    date: data.date,
    summary: data.summary
  };

  previewReviews = [previewReview];
  renderFilters();
  updateStats([...REVIEWS, ...previewReviews]);
  renderReviews();
  snippetOutput.textContent = buildSnippet(data);
  window.location.hash = "reviews";
});

copyButton.addEventListener("click", async () => {
  const text = snippetOutput.textContent;
  try {
    await navigator.clipboard.writeText(text);
    copyButton.textContent = "Copied";
    setTimeout(() => {
      copyButton.textContent = "Copy snippet";
    }, 1200);
  } catch {
    alert("Copy failed. Select and copy the snippet manually.");
  }
});

[searchInput, categoryFilter, sortSelect].forEach((element) => {
  element.addEventListener("input", renderReviews);
  element.addEventListener("change", renderReviews);
});

document.getElementById("date").valueAsDate = new Date();

renderFilters();
updateStats(REVIEWS);
renderReviews();
