import { useFetchUsers } from './hooks/useFetchUsers';
import UserList from './components/UserList';
import { useState, useRef } from 'react';
import Modal from './components/Modal';

import './index.css';
import UserForm from './components/UserForm';

function App() {
  const { users, setUsers, isLoading, fetchError } = useFetchUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addButtonRef = useRef<HTMLButtonElement>(null);

  const closeAndFocus = () => {
    setIsModalOpen(false);
    // Using a timeout of 0 ensures the Modal is fully unmounted
    // before we try to move focus back to the button.
    setTimeout(() => {
      addButtonRef.current?.focus();
    }, 0);
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
        <>
          <UserList
            users={users}
            onDelete={handleDelete}
            onAddUser={() => setIsModalOpen(true)}
            addButtonRef={addButtonRef}
          />
        </>
      )}
      {/* Only render if isModalOpen is true */}
      {isModalOpen && (
        <Modal onClose={closeAndFocus}>
          <UserForm onClose={closeAndFocus} />
        </Modal>
      )}
    </main>
  );
}

export default App;
