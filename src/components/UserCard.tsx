import type { User } from '../types/users';
interface UserCardProps {
  user: User;
  onDelete: (id: number) => void;
}

const UserCard = ({ user, onDelete }: UserCardProps) => {
  return (
    <article className="card" aria-labelledby={`user-card-heading-${user.id}`}>
      <div className="card-header">
        <h2 id={`user-card-heading-${user.id}`}> {user.name}</h2>
      </div>
      <div className="card-body">
        <dl className="card-content">
          <dt>Username:</dt>
          <dd>{user.username}</dd>
          <dt>Email:</dt>
          <dd>{user.email}</dd>
          <dt>Phone:</dt>
          <dd>{user.phone}</dd>
        </dl>
      </div>
      <div className="card-footer">
        <button
          type="button"
          className="btn-outline"
          aria-disabled="true"
          disabled
        >
          Edit
        </button>
        <button
          type="button"
          className="btn-danger"
          onClick={() => onDelete(user.id)}
          aria-label={`Delete user ${user.name}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default UserCard;
