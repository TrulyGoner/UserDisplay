import { useStore } from '../../store/useStore';
import { toastStore, dismissToast } from '../../store/toastStore';
import './Toast.css';

export function Toast() {
  const items = useStore(toastStore, (s) => s.items);

  if (!items.length) return null;

  return (
    <div className="toast-container" role="region" aria-live="polite" aria-label="Notifications">
      {items.map((toast) => (
        <div key={toast.id} className="toast">
          <span className="toast__message">{toast.message}</span>
          <div className="toast__actions">
            {toast.onUndo && (
              <button
                className="toast__undo"
                onClick={() => {
                  toast.onUndo!();
                  dismissToast(toast.id);
                }}
              >
                Undo
              </button>
            )}
            <button
              className="toast__close"
              aria-label="Dismiss notification"
              onClick={() => dismissToast(toast.id)}
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
