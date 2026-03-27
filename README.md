# React TypeScript User Management — Accessible Form Handling

A production-minded React + TypeScript demo focused on **accessible form validation**, **modal focus management**, and **WCAG 2.1 compliance**. Built to demonstrate real-world accessibility patterns that go beyond surface-level aria attributes.

Live Demo: https://react-ts-form-validation.vercel.app/

---

## Screenshots

### Main View

![User Management main view showing user cards in a grid layout](docs/screenshots/main-view.png)

### Add User Modal

![Add New User modal with form fields and close button](docs/screenshots/modal-form.png)

### Validation Errors

![Form showing inline validation error messages for all fields](docs/screenshots/validation-errors.png)

### Focus Management

![Close button with visible focus ring demonstrating keyboard navigation](docs/screenshots/focus-visible.png)

### Accessibility Audit — Zero Violations

![axe DevTools showing 0 accessibility violations](docs/screenshots/axe-zero-violations.png)

---

## What This Demonstrates

### Accessible Form Validation

- Controlled inputs with `aria-invalid` and `aria-describedby` wired to error messages
- `role="alert"` on error spans for immediate screen reader announcement
- `noValidate` with custom validation logic — full control over UX and error timing
- Email regex and phone format validation with clear, actionable error messages

### Modal Accessibility (WCAG 2.1 SC 2.1.2, 2.4.3)

- `role="dialog"` and `aria-modal="true"` for correct screen reader behavior
- `aria-labelledby` linking the dialog to its visible heading
- **Focus trap** — Tab and Shift+Tab cycle only through modal elements while open
- Focus moves into modal on open, returns to trigger button on close
- Escape key closes modal and returns focus — keyboard users never get stranded

### Screen Reader Support

- `role="status"` + `aria-live="polite"` success announcement after user creation
- `sr-only` utility class keeps announcement region in DOM without visual noise
- Loading and error states use appropriate live region roles
- All icon-only buttons have descriptive `aria-label` attributes
- Disabled Edit buttons include both `disabled` and `aria-disabled="true"`

### Semantic HTML

- `<article>` with `aria-labelledby` for each user card
- `<dl>`, `<dt>`, `<dd>` for structured user data — not just divs
- `<main>` landmark with `aria-labelledby` pointing to the page heading
- `<ul>` for the user list with proper list semantics

### Keyboard Navigation

- All interactive elements reachable and operable via keyboard
- `focus-visible` CSS — focus rings show for keyboard users, hidden for mouse
- Tab order follows visual layout

---

## Tech Stack

- React 18
- TypeScript
- Vite
- Vanilla CSS (no framework — intentional, to show CSS fundamentals)

---

## Project Structure

```
src/
  components/
    Modal.tsx        # Reusable accessible modal with focus trap
    FormField.tsx    # Reusable labeled input with error handling
    UserList.tsx     # User grid with empty state
    UserCard.tsx     # Individual user card with actions
    UserForm.tsx     # Controlled form with validation
  hooks/
    useFetchUsers.ts # Data fetching with loading/error states
  types/
    users.ts         # User, FormErrors interfaces
  App.tsx
  main.tsx
  index.css
```

---

## Accessibility Testing

Tested with:

- **axe DevTools** — 0 violations (WCAG 2.1 AA)
- **Lighthouse** — 100 accessibility score
- **NVDA screen reader** — full keyboard and announcement testing
- **Keyboard-only navigation** — all flows completable without a mouse

### Tested with my own Accessibility Audit Tool

![Accessibility Audit Tool showing zero violations on this project](docs/screenshots/audit-tool-zero.png)

Even Google.com has accessibility violations:
![Accessibility Audit Tool showing 4 violations on google.com](docs/screenshots/audit-tool-google.png)

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## Background

This project was built as part of an active reskilling effort into modern React and TypeScript after 5 years of enterprise fintech UI development. The accessibility patterns here reflect real production experience — including serving as the WCAG SME for a platform managing trillions in client assets and leading remediation of 900+ accessibility issues across 30+ pages.

The goal was to build something that demonstrates not just that I can write React, but that I understand _why_ the patterns matter.

```

---
```
