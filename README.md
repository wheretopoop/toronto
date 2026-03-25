# Toronto Toilet Reviews

This site is organized into three files:

- `index.html` — page structure
- `style.css` — design and layout
- `script.js` — review data and filtering logic

## Adding a new review

Open `script.js` and add a new object to the `REVIEWS` array near the top.

Use this format:

```js
{
  title: "Short review title",
  location: "Specific place or venue",
  area: "Neighbourhood or district",
  accessibility: "Easily Accessible",
  passwordRequired: false,
  password: "",
  rating: 4,
  date: "2026-03-25",
  summary: "Your written review"
}
```

### Accessibility options

Use one of these exact values:

- `Easily Accessible`
- `Limited`
- `Difficult to Access`

### Password field

- If no password is needed, use:
  - `passwordRequired: false`
  - `password: ""`
- If a password or staff check is needed, use:
  - `passwordRequired: true`
  - `password: "Ask staff"` or another note/code

## Sorting and search

The site supports:

- full-text search across title, location, area, accessibility, password status, and review text
- filtering by area
- sorting by newest, oldest, rating, area, or location
