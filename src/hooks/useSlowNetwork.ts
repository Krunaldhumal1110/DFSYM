import { useEffect, useState } from 'react';

type NetworkConnection = {
  effectiveType?: string;
  saveData?: boolean;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
};

export function useSlowNetwork(): boolean {
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: NetworkConnection }).connection;
    if (!conn) return;

    const check = () => {
      const type = conn.effectiveType ?? '';
      setSlow(Boolean(conn.saveData) || type === 'slow-2g' || type === '2g' || type === '3g');
    };

    check();
    conn.addEventListener?.('change', check);
    return () => conn.removeEventListener?.('change', check);
  }, []);

  return slow;
}
