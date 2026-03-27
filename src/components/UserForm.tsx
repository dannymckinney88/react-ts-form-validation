import { useState } from 'react';
import type { User, FormErrors } from '../types/users';

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

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';

    // Basic email regex: ensures format of local@domain.tld
    // For production, consider a library like validator.js
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    // Phone regex: accepts common formats including international.
    // For production, consider libphonenumber for full locale support.
    else if (!/^\+?[\d\s\-().]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onUserCreated?.({ ...formData });
      onClose();
    } else {
      // Move focus to the first invalid field after failed submission.
      // This is a critical accessibility pattern — without it, keyboard
      // and screen reader users have no indication of where errors are.
      // WCAG 2.1 SC 3.3.1 — Error Identification
      setTimeout(() => {
        const firstError = document.querySelector(
          '[aria-invalid="true"]'
        ) as HTMLElement;
        firstError?.focus();
      }, 0);
    }
  };

  return (
    <>
      {/*
        noValidate disables native browser validation so we can
        control the validation UX and error announcements ourselves.
        aria-labelledby links the form to the modal heading.
      */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="form-stack"
        aria-labelledby="add-user-modal-heading"
        id="add-user-form"
      >
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
            // aria-invalid signals to screen readers that the field
            // has a validation error — works alongside the error message
            aria-invalid={!!errors.name}
            // aria-describedby links the input to its error message element.
            // Screen readers will announce the error text after the field label.
            aria-describedby={errors.name ? 'name-error' : undefined}
            required
          />
          {errors.name && (
            // role="alert" causes screen readers to announce this
            // immediately when it appears in the DOM
            <span className="error-text" id="name-error" role="alert">
              {errors.name}
            </span>
          )}
        </div>

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
            <span className="error-text" id="username-error" role="alert">
              {errors.username}
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="add-email" className="form-label">
            Email Address
          </label>
          {/*
    Helper text is part of the accessible description chain.
    It gives format guidance before validation fails,
    and composes with the error message via aria-describedby.
    Screen reader announces: label → helper text → error (if present)
  */}
          <p id="email-help" className="helper-text">
            Use the format name@example.com
            <span className="sr-only"> This field is required.</span>
          </p>
          <input
            id="add-email"
            className={`form-input ${errors.email ? 'input-error' : ''}`}
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            aria-invalid={!!errors.email}
            // Composing helper text and error together gives screen readers
            // full context: format guidance + validation feedback in correct order
            aria-describedby={`email-help${errors.email ? ' email-error' : ''}`}
            required
          />
          {errors.email && (
            <span className="error-text" id="email-error" role="alert">
              {errors.email}
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="add-phone" className="form-label">
            Phone Number
          </label>
          <input
            id="add-phone"
            className={`form-input ${errors.phone ? 'input-error' : ''}`}
            // type="tel" triggers the numeric keyboard on mobile devices
            type="tel"
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
        {/*
          form="add-user-form" connects this button to the form by ID.
          This is required because the button lives outside the <form> element
          in the modal footer, but still needs to trigger form submission.
        */}
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
