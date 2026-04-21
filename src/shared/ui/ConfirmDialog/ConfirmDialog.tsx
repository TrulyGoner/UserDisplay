import { useEffect, useRef } from 'react';
import './ConfirmDialog.css';

interface Props {
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmDialog({ message, confirmLabel = 'Delete', onConfirm, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    return () => { if (dialog.open) dialog.close(); };
  }, []);

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) onClose();
  }

  return (
    <dialog ref={dialogRef} className="cd-dialog" onCancel={onClose} onClick={handleBackdropClick}>
      <div className="cd-content">
        <p className="cd-message">{message}</p>
        <div className="cd-actions">
          <button className="cd-btn cd-btn--secondary" onClick={onClose}>Cancel</button>
          <button className="cd-btn cd-btn--danger" autoFocus onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </dialog>
  );
}
