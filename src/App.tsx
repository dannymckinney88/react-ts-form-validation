import { useFetchUsers } from './hooks/useFetchUsers';
import UserList from './components/UserList';
import { useState, useRef } from 'react';
import Modal from './components/Modal';
import type { User } from './types/users';
import './index.css';
import UserForm from './components/UserForm';

function App() {
  const { users, setUsers, isLoading, fetchError } = useFetchUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const closeAndFocus = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      addButtonRef.current?.focus();
    }, 0);
  };

  const handleUserCreated = (newUser: Omit<User, 'id'>) => {
    const userWithId = { ...newUser, id: Date.now() };
    setUsers((prev) => [userWithId, ...prev]);
    setSuccessMessage(`${newUser.name} has been successfully added.`);
    // Clear after announcement
    setTimeout(() => setSuccessMessage(''), 3000);
  };

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
        <UserList
          users={users}
          onDelete={handleDelete}
          onAddUser={() => setIsModalOpen(true)}
          addButtonRef={addButtonRef}
        />
      )}
      <p role="status" aria-live="polite" className="sr-only">
        {successMessage}
      </p>
      {isModalOpen && (
        <Modal onClose={closeAndFocus}>
          <UserForm onClose={closeAndFocus} onUserCreated={handleUserCreated} />
        </Modal>
      )}
    </main>
  );
}

export default App;
