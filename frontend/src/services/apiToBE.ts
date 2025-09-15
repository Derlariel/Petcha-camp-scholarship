import type { RegistrationRequest } from '../types/api';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const submitRegistration = async (data: RegistrationRequest) => {
  const response = await fetch(`${API_BASE}/registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

  return response.json();
};
