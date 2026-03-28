import { useState } from 'react';
import { PUZZLE_TYPES } from '../config';
import { useMetadata } from '../hooks/useMetadata';
import PuzzleTab from './PuzzleTab';

export default function PuzzleDashboard() {
  const { entries, loading, error } = useMetadata();
  const [activeTab, setActiveTab] = useState('ZIP');

  if (loading) return <p className="status-message">Loading...</p>;
  if (error) return <p className="status-message error">Failed to load data: {error}</p>;

  const byPuzzle = PUZZLE_TYPES.reduce((acc, p) => {
    acc[p] = entries
      .filter(e => e.puzzleType === p)
      .sort((a, b) => b.date.localeCompare(a.date));
    return acc;
  }, {});

  return (
    <div className="dashboard">
      <nav className="tabs">
        {PUZZLE_TYPES.map(p => (
          <button
            key={p}
            className={p === activeTab ? 'active' : ''}
            onClick={() => setActiveTab(p)}
          >
            {p}
            {byPuzzle[p].length > 0 && (
              <span className="tab-count">{byPuzzle[p].length}</span>
            )}
          </button>
        ))}
      </nav>
      <PuzzleTab puzzleType={activeTab} entries={byPuzzle[activeTab]} />
    </div>
  );
}
