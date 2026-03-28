import { useState, useEffect } from 'react';
import { CLOUDFRONT_URL } from '../config';

export function useMetadata() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${CLOUDFRONT_URL}/metadata.json`, { cache: 'no-store' })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(data => setEntries(data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { entries, loading, error };
}
