import { useEffect, useRef, useState } from 'react';
import type { User } from '../../../entities/user';
import './UserDialog.css';

interface Props {
  user: User;
  onSave: (updated: User) => void;
  onClose: () => void;
}

export function UserDialog({ user, onSave, onClose }: Props) {
  const [address, setAddress] = useState(user.address);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  function handleSave() {
    onSave({ ...user, address });
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) {
      onClose();
    }
  }

  return (
    <dialog ref={dialogRef} className="ud-dialog" onCancel={onClose} onClick={handleBackdropClick}>
      <div className="ud-content">
        <button className="ud-close" aria-label="Close" onClick={onClose}>
          ✕
        </button>
        <h2 className="ud-title">User Info</h2>

        <div className="ud-fields">
          <div className="ud-field">
            <span className="ud-label">Username</span>
            <span className="ud-value">{user.username || '—'}</span>
          </div>
          <div className="ud-field">
            <span className="ud-label">Name</span>
            <span className="ud-value">{user.name || '—'}</span>
          </div>
          <div className="ud-field">
            <span className="ud-label">Sex</span>
            <span className="ud-value">{user.sex || '—'}</span>
          </div>
          <div className="ud-field">
            <span className="ud-label">Birthday</span>
            <span className="ud-value">{user.birthday || '—'}</span>
          </div>
          <div className="ud-field">
            <span className="ud-label">Email</span>
            <span className="ud-value">{user.email || '—'}</span>
          </div>
          <div className="ud-field">
            <label className="ud-label" htmlFor="ud-address">Address</label>
            <textarea
              id="ud-address"
              className="ud-address-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <div className="ud-actions">
          <button className="ud-btn ud-btn--secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="ud-btn ud-btn--primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
}
