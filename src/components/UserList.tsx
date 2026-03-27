import type { User } from '../types/users';
import UserCard from './UserCard';
interface UserListProps {
  users: User[];
  onDelete: (id: number) => void;
}

const UserList = ({ users, onDelete }: UserListProps) => {
  if (users.length === 0) {
    return (
      <p aria-live="polite" role="status">
        No users found.
      </p>
    );
  }
  return (
    <ul className="users-list">
      {users.map((user) => {
        return (
          <li key={user.id}>
            <UserCard user={user} onDelete={onDelete} />
          </li>
        );
      })}
    </ul>
  );
};

export default UserList;
