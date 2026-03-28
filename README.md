# LinkedIn Puzzle Dashboard

A personal portfolio site that showcases daily automated solves of LinkedIn's daily puzzles — with solve recordings and performance metrics.

## Puzzles Tracked

- **ZIP** — connect the dots
- **Sudoku** — classic number placement
- **Tango** — logic grid puzzle
- **Queens** — non-attacking queens placement
- **Pinpoint** — word category guessing

## Tech Stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [Recharts](https://recharts.org/) for solve-time charts
- CloudFront CDN for serving video recordings and metadata

## Project Structure

```
src/
  components/
    PuzzleDashboard.jsx   # Tab navigation across puzzle types
    PuzzleTab.jsx         # Per-puzzle entry list + chart
    SolveTimeChart.jsx    # Recharts line chart of solve times
    VideoPlayer.jsx       # Embedded video player for recordings
  hooks/
    useMetadata.js        # Fetches metadata.json from CloudFront
  config.js               # CloudFront URL + puzzle type list
```

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the project root:

```
VITE_CLOUDFRONT_URL=https://your-cloudfront-domain.cloudfront.net
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
