import { useFetchUsers } from './hooks/useFetchUsers';
import UserList from './components/UserList';

import './index.css';

function App() {
  const { users, setUsers, isLoading, fetchError } = useFetchUsers();

  const handleDelete = async (id: number) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      });
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <main className="container" aria-labelledby="users-page-heading">
      <h1 id="users-page-heading">User Management</h1>

      {isLoading && (
        <p role="status" aria-live="polite">
          Fetching users...
        </p>
      )}

      {fetchError && (
        <p role="alert" className="error" aria-live="polite">
          {fetchError}
        </p>
      )}

      {!isLoading && !fetchError && (
        <>
          <UserList users={users} onDelete={handleDelete} />
        </>
      )}
    </main>
  );
}

export default App;
