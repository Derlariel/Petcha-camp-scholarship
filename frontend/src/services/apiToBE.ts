import type { RegistrationRequest } from '../types/api';

const API_BASE = 'http://localhost:3000/api';

export const submitRegistration = async (data: RegistrationRequest) => {
  const response = await fetch(`${API_BASE}/registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};