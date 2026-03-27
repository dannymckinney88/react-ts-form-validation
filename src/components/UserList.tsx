import type { User } from '../types/users';
import UserCard from './UserCard';

interface UserListProps {
  users: User[];
  onDelete: (id: number) => void;
  onAddUser: () => void;
  addButtonRef: React.RefObject<HTMLButtonElement | null>;
}

const UserList = ({
  users,
  onDelete,
  onAddUser,
  addButtonRef,
}: UserListProps) => {
  if (users.length === 0) {
    return (
      // role="status" + aria-live="polite" announces the empty state
      // to screen readers without interrupting current speech.
      // Used instead of role="alert" because this is non-critical info.

      <p aria-live="polite" role="status">
        No users found.
      </p>
    );
  }
  return (
    <>
      <div className="list-header">
        <h2>Users</h2>
        <button
          type="button"
          className="btn-primary"
          onClick={onAddUser}
          ref={addButtonRef}
        >
          Add User
        </button>
      </div>
      <ul className="users-list">
        {users.map((user) => {
          return (
            <li key={user.id}>
              <UserCard user={user} onDelete={onDelete} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default UserList;
