import type { User } from '../model/types';
import { API_NINJAS_KEY } from '../../../shared/config/env';

const PREDEFINED_USERS: Omit<User, 'id'>[] = [
  {
    username: 'jsmith92',
    name: 'John Smith',
    sex: 'male',
    address: '123 Main St, New York, NY 10001',
    email: 'john.smith@example.com',
    birthday: '1992-04-15',
  },
  {
    username: 'emilyw',
    name: 'Emily Watson',
    sex: 'female',
    address: '45 Oak Avenue, Los Angeles, CA 90001',
    email: 'emily.watson@example.com',
    birthday: '1988-11-03',
  },
  {
    username: 'mike_jones',
    name: 'Michael Jones',
    sex: 'male',
    address: '78 Pine Road, Chicago, IL 60601',
    email: 'mjones@example.com',
    birthday: '1995-07-22',
  },
  {
    username: 'sara_k',
    name: 'Sara Kim',
    sex: 'female',
    address: '9 Maple Lane, Seattle, WA 98101',
    email: 'sara.kim@example.com',
    birthday: '1990-01-30',
  },
  {
    username: 'davidB',
    name: 'David Brown',
    sex: 'male',
    address: '300 Elm Street, Austin, TX 73301',
    email: 'david.brown@example.com',
    birthday: '1985-09-10',
  },
  {
    username: 'olivia_p',
    name: 'Olivia Parker',
    sex: 'female',
    address: '22 Birch Blvd, Miami, FL 33101',
    email: 'o.parker@example.com',
    birthday: '1998-03-27',
  },
  {
    username: 'lucas_m',
    name: 'Lucas Martinez',
    sex: 'male',
    address: '5 Cedar Court, Denver, CO 80201',
    email: 'lucas.m@example.com',
    birthday: '1993-06-14',
  },
  {
    username: 'ava_t',
    name: 'Ava Taylor',
    sex: 'female',
    address: '88 Willow Way, Boston, MA 02101',
    email: 'ava.taylor@example.com',
    birthday: '1996-12-05',
  },
];

let predefinedIndex = 0;

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getPredefinedUser(): User {
  const user = PREDEFINED_USERS[predefinedIndex % PREDEFINED_USERS.length];
  predefinedIndex++;
  return { ...user, id: generateId() };
}

export async function fetchRandomUser(): Promise<User> {
  if (!API_NINJAS_KEY) {
    return getPredefinedUser();
  }

  try {
    const response = await fetch('https://api.api-ninjas.com/v1/randomuser', {
      headers: { 'X-Api-Key': API_NINJAS_KEY },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    const sexMap: Record<string, string> = { M: 'Male', F: 'Female' };

    return {
      id: generateId(),
      username: data.username ?? 'unknown',
      name: data.name ?? '',
      sex: sexMap[data.sex] ?? data.sex ?? '',
      address: data.address ?? '',
      email: data.email ?? '',
      birthday: data.birthday ?? '',
    };
  } catch {
    return getPredefinedUser();
  }
}
