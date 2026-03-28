import { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import SolveTimeChart from './SolveTimeChart';
import { CLOUDFRONT_URL } from '../config';

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
              <span>Solve time: <strong>{(selectedEntry.solveTimeMs / 1000).toFixed(1)}s</strong></span>
            )}
          </div>
        </div>
      )}

      <SolveTimeChart puzzleType={puzzleType} entries={entries} />
    </div>
  );
}
