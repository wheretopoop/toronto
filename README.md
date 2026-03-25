# Review Shelf

A simple multi-file review site built for GitHub Pages.

## Files

- `index.html` — page structure
- `style.css` — site styling
- `script.js` — review data and site behavior

## How to add a new review

1. Open `script.js`.
2. Find the `REVIEWS` array near the top.
3. Add a new review object.
4. Commit and push to GitHub.

Example:

```js
{
  title: "Interstellar",
  category: "Movie",
  rating: 5,
  date: "2026-03-25",
  summary: "Ambitious, visually strong, and emotionally effective."
},
```

## Publish with GitHub Pages

1. Create a GitHub repository.
2. Upload all files from this folder.
3. Push to your default branch.
4. In GitHub, open **Settings → Pages**.
5. Set the source to your default branch and root folder.

GitHub Pages will then publish the site.
