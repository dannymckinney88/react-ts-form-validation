import { useEffect, useRef } from 'react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal = ({ onClose, children, title }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Collect all focusable elements inside the modal.
    // This selector covers all standard interactive elements
    // and any custom elements with a tabindex.
    const focusable = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const elements = Array.from(focusable || []) as HTMLElement[];
    const first = elements[0];
    const last = elements[elements.length - 1];

    // Move focus into the modal when it opens.
    // WCAG 2.1 SC 2.4.3 — Focus Order: focus must move to the dialog
    // so keyboard and screen reader users are not left on the page behind it.
    first?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        // Shift+Tab going backwards — wrap to last element
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab going forwards — wrap to first element
        // This creates the focus trap: keyboard users cannot
        // Tab out of the modal while it is open.
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    // WCAG 2.1 SC 2.1.2 — No Keyboard Trap (exception):
    // While focus IS intentionally trapped inside the modal,
    // Escape provides a clear, standard exit for keyboard users.
    // onClose triggers closeAndFocus in App.tsx which returns
    // focus to the trigger button that opened the modal.
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleTab);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleTab);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    // Clicking the overlay closes the modal for mouse users.
    // stopPropagation on the inner div prevents overlay click
    // from firing when clicking inside the modal content.
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        // role="dialog" identifies this as a dialog to assistive technology
        role="dialog"
        // aria-modal="true" tells screen readers to ignore content
        // outside the modal while it is open
        aria-modal="true"
        // aria-labelledby links the dialog to its visible heading,
        // so screen readers announce the title when the dialog opens
        aria-labelledby="add-user-modal-heading"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="add-user-modal-heading">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            // aria-label provides a descriptive name for the icon-only button.
            // Without this, screen readers would announce "×" which is meaningless.
            aria-label="Close modal"
            className="btn-close"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
