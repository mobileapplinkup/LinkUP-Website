import { useEffect } from 'react';
import { X } from 'lucide-react';

/** Accessible modal shell: Esc to close, click backdrop to close, locks page scroll. */
export default function Modal({ open, onClose, title, children, wide = false }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={`card animate-fadeup relative max-h-[88vh] w-full overflow-y-auto p-6 sm:p-8 ${
          wide ? 'max-w-3xl' : 'max-w-md'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-linkup-muted hover:bg-white/5 hover:text-white"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        {title && <h3 className="mb-4 pr-8 text-2xl font-bold">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
