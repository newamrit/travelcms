import React from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#012871]/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} overflow-hidden`}>
        {/* Header */}
        <div 
          className="px-6 py-4 flex items-center justify-between"
          style={{ background: 'linear-gradient(135deg, #012871 0%, #011950 100%)' }}
        >
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

// Confirm Dialog with brand colors
interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: 'danger' | 'warning' | 'info';
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  type = 'danger',
  confirmText = 'Confirm',
  cancelText = 'Cancel'
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const typeStyles = {
    danger: {
      icon: <AlertCircle className="w-8 h-8 text-red-500" />,
      button: 'bg-red-600 hover:bg-red-700 text-white',
    },
    warning: {
      icon: <AlertTriangle className="w-8 h-8 text-[#f35500]" />,
      button: 'bg-[#f35500] hover:bg-[#c54300] text-white',
    },
    info: {
      icon: <Info className="w-8 h-8 text-[#012871]" />,
      button: 'bg-[#012871] hover:bg-[#011950] text-white',
    },
  };

  const styles = typeStyles[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-[#012871]/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-6 text-center">
          <div className="flex justify-center mb-4">
            {styles.icon}
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
          <p className="text-sm text-slate-600 mb-6">{message}</p>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border-2 border-slate-200 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              {cancelText}
            </button>
            <button 
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors ${styles.button}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Toast Notification with brand colors
interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  const typeStyles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      text: 'text-green-800',
      progress: 'bg-green-500',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: <AlertCircle className="w-5 h-5 text-red-600" />,
      text: 'text-red-800',
      progress: 'bg-red-500',
    },
    warning: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      icon: <AlertTriangle className="w-5 h-5 text-[#f35500]" />,
      text: 'text-orange-800',
      progress: 'bg-[#f35500]',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: <Info className="w-5 h-5 text-[#012871]" />,
      text: 'text-[#012871]',
      progress: 'bg-[#012871]',
    },
  };

  const styles = typeStyles[type];

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-4">
      <div className={`relative overflow-hidden rounded-xl border-2 ${styles.border} ${styles.bg} shadow-lg`}>
        <div className="flex items-center gap-3 p-4 pr-10">
          {styles.icon}
          <p className={`text-sm font-medium ${styles.text}`}>{message}</p>
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 p-1 rounded hover:bg-black/5"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/5">
          <div 
            className={`h-full ${styles.progress} animate-shrink`}
            style={{ animation: 'shrink 3s linear forwards' }}
          />
        </div>
      </div>
      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}
