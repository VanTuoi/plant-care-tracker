import { getItem, setItem } from '@/lib/storage';

import { type ResponseData } from '../types';
import type { User } from './types';

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

const KEY = 'mock_users';

const mockUsers: User[] = Array.from({ length: 20 }, (_, i) => {
  const index = i + 1;
  const id = `B12345${(index + 60).toString().padStart(2, '0')}`;

  const baseNames = ['Nguyen Van A', 'Tran Thi B', 'Le Van C'];
  const genders = ['male', 'female', 'male'];
  const statuses = ['active', 'graduated', 'block'];

  const name = baseNames[i % 3].replace(/[A-C]/, String.fromCharCode(65 + i));
  const gender = genders[i % 3] as 'male' | 'female';
  const status = statuses[i % 3] as 'active' | 'graduated' | 'block';

  return {
    id,
    name,
    gender,
    email: `${name.split(' ').join('').toLowerCase()}@example.com`,
    phone: `0900${(100000 + i).toString().slice(0, 6)}`,
    status,
  };
});

export async function getUsersMock({
  search,
}: {
  search?: string;
}): Promise<ResponseData<User[]>> {
  await delay(1000);

  let users = getItem<User[]>(KEY);

  if (!Array.isArray(users) || users.length === 0) {
    users = mockUsers;
    await setItem(KEY, users);
  }

  const filteredUsers = search
    ? users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      )
    : users;

  return {
    message: 'Mocked user list',
    success: true,
    data: filteredUsers,
  };
}

export async function getUserMock(id: string): Promise<ResponseData<User>> {
  await delay(1000);

  const users = getItem<User[]>(KEY) || [];

  const user = users.find((u) => u.id === id) || null;

  return {
    message: user ? 'Found user' : 'User not found',
    success: !!user,
    data: user,
  };
}

export async function createUserMock(user: User): Promise<ResponseData<User>> {
  await delay(1000);

  let users = getItem<User[]>(KEY) || [];

  if (users.some((u) => u.id === user.id)) {
    return {
      message: 'User ID already exists',
      success: false,
      data: null,
    };
  }

  users.push(user);
  await setItem(KEY, users);

  return {
    message: 'User created successfully',
    success: true,
    data: user,
  };
}

export async function updateUserMock(
  update: Partial<User> & { id: string }
): Promise<ResponseData<User>> {
  await delay(1000);

  let users = getItem<User[]>(KEY) || [];
  const index = users.findIndex((u) => u.id === update.id);

  if (index === -1) {
    return {
      message: 'User not found',
      success: false,
      data: null,
    };
  }

  const updatedUser = { ...users[index], ...update };
  users[index] = updatedUser;

  await setItem(KEY, users);

  return {
    message: 'User updated successfully',
    success: true,
    data: updatedUser,
  };
}

export async function changeStatusUserMock(
  id: string,
  status: 'active' | 'block' | 'graduated'
): Promise<ResponseData<User>> {
  await delay(1000);

  let users = getItem<User[]>(KEY) || [];
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return {
      message: 'User not found',
      success: false,
      data: null,
    };
  }

  const updatedUser = { ...users[index], status };
  users[index] = updatedUser;

  await setItem(KEY, users);

  return {
    message: 'User status changed',
    success: true,
    data: updatedUser,
  };
}

export async function deleteUserMock(id: string): Promise<ResponseData<null>> {
  await delay(1000);

  let users = getItem<User[]>(KEY) || [];
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return {
      message: 'User not found',
      success: false,
      data: null,
    };
  }

  users.splice(index, 1);
  await setItem(KEY, users);

  return {
    message: 'User deleted successfully',
    success: true,
    data: null,
  };
}
