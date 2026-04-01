import { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import SolveTimeChart from './SolveTimeChart';
import { CLOUDFRONT_URL } from '../config';

const ALGORITHM_BLURBS = {
  ZIP: (
    <>
      Solved with DFS backtracking. A branch is pruned as soon as any of these conditions are detected:
      <ul>
        <li>No path exists between two consecutive numbered nodes. Paths are checked via multiple threads and to avoid re-running this check from scratch on every step, found paths are cached.</li>
        <li>A BFS island check on unvisited cells reveals more than one disconnected region</li>
        <li>An available cell other than the last node is left with only one available neighbour</li>
      </ul>
    </>
  ),
  SUDOKU: (
    <>
      Solved purely through constraint propagation. The solver repeatedly scans for two patterns:
      <ul>
        <li>A cell where all possible numbers have been eliminated except one</li>
        <li>A cell has multiple possible numbers, but is the only cell in grid/row/column with a specific number (e.g. A cell can be {5, 1}, but it's the only cell in a grid, row, or column that has 5 as a possible value so it must be 5)</li>
      </ul>
    </>
  ),
  TANGO: (
    <>
      Solved through iterative logical deduction. The solver repeatedly applies three types of rules until no empty cells remain:
      <ul>
        <li>Pattern matching — e.g. two identical adjacent values force the cell between them to be the opposite symbol. These patterns are checked on a wrapping grid, so the rightmost cell treats the leftmost cell as its neighbour (and likewise top-to-bottom)</li>
        <li>Explicit constraints — some pairs of cells are linked by an = or ✕ marker, forcing them to be the same or opposite symbol. There is also a derived rule: if two cells share an = constraint and one is empty, but the cell on the far side of the empty cell is already filled, the empty cell cannot match that filled neighbour (no two consecutive identical values), so it must be the opposite. This neighbour lookup also uses the wrapping grid, so edge cells check across to the other side</li>
        <li>Quota constraints — once a row or column has its full share of suns, all remaining cells in that line must be moons, and vice versa</li>
      </ul>
    </>
  ),
  QUEENS: 'Solved with backtracking DFS. Queens are placed row by row, and a reference-counted conflict map tracks which cells are blocked by each placement. If any row, column, or colour region becomes fully blocked, the branch is pruned.',
  PINPOINT: 'Solved by the Claude API. Each round, the current clue words are sent to Claude, which reasons about what single word could link them all as a category. Incorrect guesses are added to a rejection list so Claude never repeats them.',
};

export default function PuzzleTab({ puzzleType, entries }) {
  const [selectedDate, setSelectedDate] = useState(entries[0]?.date ?? null);
  const selectedEntry = entries.find(e => e.date === selectedDate);

  if (entries.length === 0) {
    return <p className="empty-state">No recordings yet for {puzzleType}.</p>;
  }

  return (
    <div className="puzzle-tab">
      <div className="date-selector">
        {entries.map(e => (
          <button
            key={e.date}
            className={e.date === selectedDate ? 'active' : ''}
            onClick={() => setSelectedDate(e.date)}
          >
            {e.date}
          </button>
        ))}
      </div>

      {selectedEntry && (
        <div className="video-wrapper">
          <VideoPlayer src={`${CLOUDFRONT_URL}/${selectedEntry.recordingKey}`} />
          <div className="solve-meta">
            {puzzleType === 'PINPOINT' ? (
              <span>Guesses: <strong>{selectedEntry.guessCount}</strong></span>
            ) : (
              <span>
              Solve time: <strong>{(selectedEntry.solveTimeMs / 1000).toFixed(1)}s</strong>
              <span className="info-icon" aria-label="Solve time is measured until the automation finishes, which is slightly after LinkedIn registers completion">
                &#x24D8;
              </span>
            </span>
            )}
          </div>
        </div>
      )}

      <SolveTimeChart puzzleType={puzzleType} entries={entries} />
      <div className="algorithm-blurb">{ALGORITHM_BLURBS[puzzleType]}</div>
    </div>
  );
}
