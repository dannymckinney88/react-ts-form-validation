import { useState } from 'react';
import type { User } from '../types/users';

interface UserFormProps {
  onUserCreated?: (user: Omit<User, 'id'>) => void;
  onClose: () => void;
}

const UserForm = ({ onUserCreated, onClose }: UserFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';

    // Basic email validation regex: ensures @ and at least one dot
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    // Phone regex: allows 7-15 digits, spaces, dashes, and parentheticals
    else if (!/^\+?[\d\s\-().]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    // Returns true only if the errors object is empty
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Lift the "Draft" state to the Parent (App.tsx)
      onUserCreated?.({ ...formData });
      onClose(); // Triggers focus-return in the parent
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="form-stack"
        aria-labelledby="add-user-modal-heading"
        id="add-user-form"
      >
        {/* Name Field */}
        <div className="form-field">
          <label htmlFor="add-name" className="form-label">
            Full Name
          </label>
          <input
            id="add-name"
            className={`form-input ${errors.name ? 'input-error' : ''}`}
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            required
          />
          {errors.name && (
            <span className="error-text" id="name-error" role="alert">
              {errors.name}
            </span>
          )}
        </div>

        {/* Username Field */}
        <div className="form-field">
          <label htmlFor="add-username" className="form-label">
            Username
          </label>
          <input
            id="add-username"
            className={`form-input ${errors.username ? 'input-error' : ''}`}
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            aria-invalid={!!errors.username}
            aria-describedby={errors.username ? 'username-error' : undefined}
            required
          />
          {errors.username && (
            <span
              className="error-text"
              id="username-error"
              role="alert"
              aria-live="polite"
            >
              {errors.username}
            </span>
          )}
        </div>

        {/* Email Field */}
        <div className="form-field">
          <label htmlFor="add-email" className="form-label">
            Email Address
          </label>
          <input
            id="add-email"
            className={`form-input ${errors.email ? 'input-error' : ''}`}
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            required
          />
          {errors.email && (
            <span
              className="error-text"
              id="email-error"
              role="alert"
              aria-live="polite"
            >
              {errors.email}
            </span>
          )}
        </div>

        {/* Phone Field - NEW */}
        <div className="form-field">
          <label htmlFor="add-phone" className="form-label">
            Phone Number
          </label>
          <input
            id="add-phone"
            className={`form-input ${errors.phone ? 'input-error' : ''}`}
            type="tel" // type="tel" for mobile keyboard optimization
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            required
          />
          {errors.phone && (
            <span className="error-text" id="phone-error" role="alert">
              {errors.phone}
            </span>
          )}
        </div>
      </form>
      <div className="form-footer">
        <button type="button" onClick={onClose} className="btn-secondary">
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary"
          aria-label="Add new user"
          form="add-user-form"
        >
          Create User
        </button>
      </div>
    </>
  );
};

export default UserForm;
