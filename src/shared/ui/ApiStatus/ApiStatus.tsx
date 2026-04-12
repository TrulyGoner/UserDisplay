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

export function ApiStatus() {
  const [status, setStatus] = useState<Status>('checking');

  useEffect(() => {
    checkApi().then((ok) => setStatus(ok ? 'online' : 'offline'));
  }, []);

  const label = status === 'checking' ? 'Checking…' : status === 'online' ? 'API online' : 'API offline';

  return (
    <div className={`api-status api-status--${status}`} title={label}>
      <span className="api-status__dot" />
      <span className="api-status__label">{label}</span>
    </div>
  );
}
