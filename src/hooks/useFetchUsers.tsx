// hooks/useFetchUsers.ts
import { useState, useEffect } from 'react';
import type { User } from '../types/users';

export const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    //  Define the internal async function
    const loadUsers = async () => {
      setIsLoading(true);
      setFetchError(null);

      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );

        if (!response.ok) {
          throw new Error(`Status: ${response.status} - Failed to fetch users`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setFetchError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  return { users, setUsers, isLoading, fetchError };
};
