import { useEffect, useState } from 'react';
import { db } from '../db';

export function useDatabase() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initDB = async () => {
      try {
        await db.connect();
        setIsReady(true);
      } catch (err) {
        setError(err as Error);
      }
    };

    initDB();
  }, []);

  return { isReady, error };
}