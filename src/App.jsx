import PuzzleDashboard from './components/PuzzleDashboard';
import './App.css';

function App() {
  return (
    <>
      <header className="site-header">
        <h1>LinkedIn Puzzle Dashboard</h1>
        <p>Daily automated solves — recordings &amp; performance metrics</p>
      </header>
      <main className="site-main">
        <PuzzleDashboard />
      </main>
    </>
  );
}

export default App;
