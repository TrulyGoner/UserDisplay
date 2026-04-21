import { useEffect, useState } from 'react';
import { API_NINJAS_KEY } from '../../config/env';
import './ApiStatus.css';

type Status = 'checking' | 'online' | 'offline';

async function checkApi(): Promise<boolean> {
  if (!API_NINJAS_KEY) return false;
  try {
    const res = await fetch('https://api.api-ninjas.com/v1/randomuser', {
      headers: { 'X-Api-Key': API_NINJAS_KEY },
    });
    return res.ok;
  } catch {
    return false;
  }
}

const STATUS_LABELS: Record<Status, string> = {
  checking: 'Checking…',
  online:   'API online',
  offline:  'API offline',
};

export function ApiStatus() {
  const [status, setStatus] = useState<Status>('checking');

  useEffect(() => {
    async function updateStatus() {
      const ok = await checkApi();
      setStatus(ok ? 'online' : 'offline');
    }
    updateStatus();
  }, []);

  const label = STATUS_LABELS[status];

  return (
    <div className={`api-status api-status--${status}`} title={label}>
      <span className="api-status__dot" />
      <span className="api-status__label">{label}</span>
    </div>
  );
}
